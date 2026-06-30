import fs from "fs"
import path from "path"
import { pathToFileURL } from "url"
import Collection from "../lib/Collection.js"

const commands = new Collection()

async function loadCommands(folder = "commands") {
    commands.clear()

    const root = path.join(process.cwd(), folder)

    async function read(dir) {
        const files = fs.readdirSync(dir)
        for (const file of files) {
            const full = path.join(dir, file)
            if (fs.statSync(full).isDirectory()) {
                await read(full)
                continue
            }

            if (!file.endsWith(".js")) continue

            try {
                const command = (
                    await import(
                        `${pathToFileURL(full).href}?update=${Date.now()}`
                    )
                ).default

                if (!command?.name) continue

                commands.set(command.name.toLowerCase(), command)

                if (Array.isArray(command.aliases)) {
                    for (const alias of command.aliases) {
                        commands.set(alias.toLowerCase(), command)
                    }
                }
            } catch (err) {
                console.error(`Failed to load ${file}`)
                console.error(err)
            }
        }
    }

    await read(root)
    console.log(`Loaded ${commands.size} command(s).`)
}

function getCommand(name) {
    if (typeof name !== "string") {
        console.error("getCommand() menerima:", name)
        return null
    }

    return commands.get(name.toLowerCase())
}

export {
    commands,
    loadCommands,
    getCommand
}