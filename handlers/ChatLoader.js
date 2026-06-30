import fs from "fs"
import path from "path"
import { pathToFileURL } from "url"

const chats = []

export async function loadChats() {
    chats.length = 0

    const folder = path.join(process.cwd(), "chats")

    if (!fs.existsSync(folder)) {
        console.log("[Loader] No chats folder found.")
        return
    }

    const files = fs
        .readdirSync(folder)
        .filter(file => file.endsWith(".js"))

    for (const file of files) {
        try {
            const chat = (
                await import(
                    pathToFileURL(path.join(folder, file)).href +
                    `?update=${Date.now()}`
                )
            ).default

            if (!chat?.execute) {
                console.warn(`[ChatLoader] ${file} tidak memiliki execute().`)
                continue
            }

            chats.push({
                name: file,
                priority: 100,
                enable: true,
                private: false,
                group: true,
                owner: false,
                ...chat
            })

        } catch (err) {
            console.error(`[ChatLoader] Gagal load ${file}`)
            console.error(err)
        }
    }

    chats.sort((a, b) => a.priority - b.priority)

    console.log(`Loaded ${chats.length} chat event(s).`)
}

export async function emitChat(m) {
    m.__stop = false
    for (const chat of chats) {
        if (m.__stop) break
        if (!chat.enable) continue
        if (chat.owner && !m.isOwner) continue
        if (chat.private && m.isGroup) continue
        if (chat.group === false && m.isGroup) continue

        try {
            await chat.execute(m)
        } catch (err) {
            console.error(`[${chat.name}]`, err)
        }
    }
}