export default {
    name: "ping",
    aliases: ["p"],
    category: "main",
    cooldown: 3,

    async execute({ m, sock }) {
        return m.reply("Pong!")
    }
}