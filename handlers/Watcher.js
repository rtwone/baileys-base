import fs from "fs"
import path from "path"

export default function watchCommands(loadCommands) {

    const folder = path.join(process.cwd(), "commands")

    fs.watch(folder, {
        recursive: true
    }, async (_, filename) => {

        if (!filename) return

        if (!filename.endsWith(".js")) return

        console.clear()

        console.log("===================================")
        console.log("♻ Reload Command")
        console.log(filename)
        console.log("===================================")

        await loadCommands()

    })

}