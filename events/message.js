"use strict";
import fs from "fs"
import path from "path"
import config from "../config.js"
import { getCommand } from "../handlers/Loader.js"
import serialize from "../lib/serialize.js"
import permissionHandler from "../handlers/PermissionHandler.js"
import { logCommand, logChat } from "../lib/logger.js"
import checkCooldown from "../handlers/Cooldown.js"
import handleError from "../handlers/ErrorHandler.js"
import createContext from "../handlers/Context.js"
import { emitChat } from "../handlers/ChatLoader.js"

export default function message(sock) {
    sock.ev.on("messages.upsert", async ({ messages, type }) => {
        try {
            if (type !== "notify") return

            let m = await serialize(sock, messages[0])
            if (!m) return
            if (!m.message) return

            if (m.key.fromMe && !config.self) {
                // tetap diproses
            }

            if (m.key.remoteJid === "status@broadcast") return
            if (config.self && !m.isOwner) return

            if (m.isCmd) {
                const cmd = getCommand(m.command)
                if (!cmd) return

                logCommand(m) // log command
                const ctx = createContext({
                    sock,
                    m,
                    command: cmd
                })

                const permission = await permissionHandler(cmd, m)
                if (!permission.status) {
                    return m.reply(permission.message)
                }

                const cd = checkCooldown(
                    m.sender,
                    cmd.name,
                    cmd.cooldown || 3
                )

                if (!cd.status) {
                    return m.reply(
                        `⏳ Tunggu ${cd.remaining}s lagi.`
                    )
                }

                await cmd.execute(ctx)
            } else {
                logChat(m)
                await emitChat(m)
            }
        } catch (err) {
            await handleError(err)
        }
    })
}