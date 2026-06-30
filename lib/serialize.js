import config from "../config.js"
import attachSendMessage from "./sendMessage.js"

export default async function serialize(sock, msg) {

    if (!msg) return null

    const m = msg

    m.id = m.key.id
    m.from = m.key.remoteJid
    m.sender = m.key.participant || m.key.remoteJid
    m.fromMe = m.key.fromMe

    m.isGroup = m.from.endsWith("@g.us")
    m.groupMetadata = null
    m.participants = []
    m.admins = []
    m.groupName = ""
    m.groupOwner = ""
    m.isAdmin = false
    m.isBotAdmin = false
    if (m.isGroup) {

        try {
            const metadata = await sock.groupMetadata(m.from)
            m.groupMetadata = metadata
            m.groupName = metadata.subject
            m.groupOwner = metadata.owner
            m.participants = metadata.participants
            m.admins = metadata.participants
                .filter(v => v.admin)
                .map(v => v.id)
            m.isAdmin = m.admins.includes(m.sender)
            m.isBotAdmin = m.admins.includes(sock.user.id)
        } catch (err) {
            console.log(err)
        }

    }

    m.pushName = m.pushName || "Unknown"

    m.type = Object.keys(m.message || {})[0] || ""
    m.body =
        m.message?.conversation ||
        m.message?.extendedTextMessage?.text ||
        m.message?.imageMessage?.caption ||
        m.message?.videoMessage?.caption ||
        m.message?.documentMessage?.caption ||
        ""

    m.text = m.body
    m.prefix = config.prefix.find(v => m.body.startsWith(v)) || ""
    m.isCmd = !!m.prefix
    m.command = m.isCmd
        ? m.body
            .slice(m.prefix.length)
            .trim()
            .split(/ +/)
            .shift()
            .toLowerCase()
        : ""

    m.args = m.body
        .trim()
        .split(/ +/)
        .slice(1)

    m.text = m.args.join(" ")

    m.isOwner = config.owner.includes(
        m.sender.replace(/@.+/, "")
    )

    m.mentions = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || []

    m.reply = (text, options = {}) => {

        return sock.sendMessage(
            m.from,
            {
                text,
                ...options
            },
            {
                quoted: m
            }
        )

    }

    m.react = (emoji) => {

        return sock.sendMessage(m.from, {

            react: {

                text: emoji,

                key: m.key

            }

        })

    }

    m.download = async () => {

        const { downloadMediaMessage } = await import("@whiskeysockets/baileys")

        return downloadMediaMessage(
            m,
            "buffer",
            {},
            {
                logger: undefined,
                reuploadRequest: sock.updateMediaMessage
            }
        )

    }

    const context = m.message?.extendedTextMessage?.contextInfo

    if (context?.quotedMessage) {
        m.quoted = {
            id: context.stanzaId,
            sender: context.participant,
            message: context.quotedMessage,
            text:
                context.quotedMessage?.conversation ||
                context.quotedMessage?.extendedTextMessage?.text ||
                context.quotedMessage?.imageMessage?.caption ||
                context.quotedMessage?.videoMessage?.caption ||
                ""
        }
    }
    else {
        m.quoted = null
    }

    if (m.quoted) {
        m.quoted.download = async () => {
            const {
                downloadMediaMessage
            } = await import("@whiskeysockets/baileys")
            return downloadMediaMessage(
                {
                    message: m.quoted.message
                },
                "buffer",
                {},
                {
                    logger: undefined,
                    reuploadRequest: sock.updateMediaMessage
                }
            )
        }
    }

    m.stop = () => {
        m.__stop = true
    }

    attachSendMessage(sock, m)
    return m

}