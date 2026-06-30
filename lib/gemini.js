import { GoogleGenAI } from "@google/genai"
import config from "../config.js"

const ai = new GoogleGenAI({
    apiKey: config.geminiApiKey
})

const sessions = new Map()

export async function askGemini(sender, prompt, systemInstruction = "") {

    if (!sessions.has(sender)) {
        sessions.set(sender, [])
    }

    const history = sessions.get(sender)

    const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
            systemInstruction
        },
        history
    })

    const result = await chat.sendMessage({
        message: prompt
    })

    history.push(
        {
            role: "user",
            parts: [{ text: prompt }]
        },
        {
            role: "model",
            parts: [{ text: result.text }]
        }
    )

    return result.text

}