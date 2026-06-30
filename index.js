import "dotenv/config"
import makeWASocket, {
    DisconnectReason,
    fetchLatestBaileysVersion,
    useMultiFileAuthState,
    makeCacheableSignalKeyStore
} from "@whiskeysockets/baileys"

import P from "pino"
import fs from "fs"
import config from "./config.js"
import { loadEvents } from "./handlers/EventHandler.js"
import { loadCommands } from "./handlers/Loader.js"
import { loadChats } from "./handlers/ChatLoader.js"
import watchCommands from "./handlers/Watcher.js"

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(config.sessionName)
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        logger: P({
            level: "silent"
        }),
        printQRInTerminal: !config.pairing,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(
                state.keys,
                P({
                    level: "silent"
                })
            )
        },

        browser: [
            "Ubuntu",
            "Chrome",
            "22.04"
        ],

        syncFullHistory: false,
        markOnlineOnConnect: true
    })

    // save session
    sock.ev.on("creds.update", saveCreds)

    await loadCommands()
    watchCommands(loadCommands)

    await loadChats()
    await loadEvents(sock, startBot)

    // Pairing Code
    if (config.pairing && !sock.authState.creds.registered) {
        const code = await sock.requestPairingCode(config.pairingNumber)

        console.log("")
        console.log("==============================")
        console.log("PAIRING CODE")
        console.log(code)
        console.log("==============================")
        console.log("")
    }
}

startBot()