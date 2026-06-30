import { askGemini } from "../lib/gemini.js"
import fs from "fs"

const systemInstruction = fs.readFileSync(
    "./prompts/chatbot.txt",
    "utf8"
)

export default {
    name: "AI",
    priority: 100,
    enable: true,
    private: true,
    group: false,
    owner: false,

    async execute(m) {
        if (!m.body) return
        if (m.body.length < 2) return

        const answer = await askGemini(
            m.sender,
            m.body,
            systemInstruction + `Informasi pengguna:
- Nama WhatsApp: ${m.pushName}
- Nomor: ${m.sender}
- Chat: ${m.isGroup ? "Grup" : "Private"}
- Waktu: ${new Date().toLocaleString("id-ID")}`
        )

        await m.reply(answer)

        m.stop()
    }
}