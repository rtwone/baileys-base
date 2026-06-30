import fs from "fs"

export default function attachSendMessage(sock, m) {

    /**
     * Reply Text
     */
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

    /**
     * React
     */
    m.react = (emoji) => {

        return sock.sendMessage(m.from, {
            react: {
                text: emoji,
                key: m.key
            }
        })

    }

    /**
     * Image
     */
    m.sendImage = (image, caption = "") => {

        return sock.sendMessage(
            m.from,
            {
                image,
                caption
            },
            {
                quoted: m
            }
        )

    }

    /**
     * Video
     */
    m.sendVideo = (video, caption = "") => {

        return sock.sendMessage(
            m.from,
            {
                video,
                caption
            },
            {
                quoted: m
            }
        )

    }

    /**
     * Audio
     */
    m.sendAudio = (audio, ptt = false) => {

        return sock.sendMessage(
            m.from,
            {
                audio,
                ptt
            },
            {
                quoted: m
            }
        )

    }

    /**
     * Sticker
     */
    m.sendSticker = (sticker) => {

        return sock.sendMessage(
            m.from,
            {
                sticker
            },
            {
                quoted: m
            }
        )

    }

    /**
     * Document
     */
    m.sendDocument = (
        document,
        fileName = "file",
        mimetype = "application/octet-stream"
    ) => {

        return sock.sendMessage(
            m.from,
            {
                document,
                fileName,
                mimetype
            },
            {
                quoted: m
            }
        )

    }

    /**
     * Poll
     */
    m.sendPoll = (
        name,
        values = [],
        selectableCount = 1
    ) => {

        return sock.sendMessage(
            m.from,
            {
                poll: {
                    name,
                    values,
                    selectableCount
                }
            }
        )

    }

    /**
     * Contact
     */
    m.sendContact = (
        number,
        name
    ) => {

        const vcard =
            `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL;type=CELL;type=VOICE;waid=${number}:${number}
END:VCARD`

        return sock.sendMessage(
            m.from,
            {
                contacts: {
                    displayName: name,
                    contacts: [{
                        vcard
                    }]
                }
            },
            {
                quoted: m
            }
        )

    }

    /**
     * Location
     */
    m.sendLocation = (
        degreesLatitude,
        degreesLongitude
    ) => {

        return sock.sendMessage(
            m.from,
            {
                location: {
                    degreesLatitude,
                    degreesLongitude
                }
            },
            {
                quoted: m
            }
        )

    }

    /**
     * File
     */
    m.sendFile = (
        buffer,
        fileName,
        mimetype
    ) => {

        return sock.sendMessage(
            m.from,
            {
                document: buffer,
                fileName,
                mimetype
            },
            {
                quoted: m
            }
        )

    }
}