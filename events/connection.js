import {
    DisconnectReason
} from "@whiskeysockets/baileys"
import qrcode from "qrcode-terminal"

export default function connection(sock, startBot) {
    sock.ev.on("connection.update", async (update) => {
        console.log(update)
        const {
            connection,
            lastDisconnect,
            qr
        } = update

        if (connection === "connecting") {
            console.clear()
            console.log("==============================")
            console.log("🔄 Connecting to WhatsApp...")
            console.log("==============================")
        }

        if (qr) {
            qrcode.generate(qr, {
                small: true
            })
        }

        if (connection === "open") {
            console.clear()
            console.log("==============================")
            console.log("✅ Bot Connected")
            console.log("==============================")
            console.log(`Bot : ${sock.user.name}`)
            console.log(`ID  : ${sock.user.id}`)
            console.log("==============================")
        }

        if (connection === "close") {
            const reason = lastDisconnect?.error?.output?.statusCode

            console.log("")
            console.log("❌ Connection Closed")
            console.log("Reason :", reason)
            console.log("")

            switch (reason) {
                case DisconnectReason.badSession:
                    console.log("Bad Session")
                    process.exit()
                    break
                case DisconnectReason.connectionClosed:
                case DisconnectReason.connectionLost:
                case DisconnectReason.restartRequired:
                case DisconnectReason.timedOut:
                    console.log("Reconnecting...\n")
                    startBot()
                    break
                case DisconnectReason.loggedOut:
                    console.log("Session Logged Out")
                    process.exit()
                    break
                default:
                    console.log("Unknown Disconnect")
                    startBot()
            }
        }
    })
}