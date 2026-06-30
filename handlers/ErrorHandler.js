export default async function handleError(
    err,
    m
) {
    console.log("")
    console.log("====================")
    console.log("ERROR")
    console.log("====================")
    console.error(err)
    console.log("====================")
    console.log("")

    if (m) {
        m.reply(
            "❌ Terjadi kesalahan pada command."
        )
    }
}