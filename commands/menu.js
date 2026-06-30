export default {
    name: "menu",
    aliases: ["help"],
    category: "main",
    cooldown: 3,

    async execute({ m, sock }) {
        return m.reply("tes")
    }
}