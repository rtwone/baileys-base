import fs from "fs"
import path from "path"
import { pathToFileURL } from "url"

export async function loadEvents(sock, startBot) {
    const eventFolder = path.join(process.cwd(), "events")
    const files = fs.readdirSync(eventFolder)

    for (const file of files) {
        if (!file.endsWith(".js")) continue

        try {
            const event = (
                await import(
                    `${pathToFileURL(path.join(eventFolder, file)).href}?update=${Date.now()}`
                )
            ).default

            if (!event) continue
            event(sock, startBot)
            console.log(`✓ Event Loaded : ${file}`)
        } catch (err) {
            console.error(`✗ Failed Load ${file}`)
            console.error(err)
        }
    }
}