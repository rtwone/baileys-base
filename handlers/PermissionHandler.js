export default async function permissionHandler(command, m) {

    if (command.owner && !m.isOwner) {
        return {
            status: false,
            message: "❌ Command ini hanya untuk Owner."
        }
    }

    if (command.group && !m.isGroup) {
        return {
            status: false,
            message: "❌ Command ini hanya bisa digunakan di Group."
        }
    }

    if (command.private && m.isGroup) {
        return {
            status: false,
            message: "❌ Command ini hanya bisa digunakan di Private Chat."
        }
    }

    if (command.admin && !m.isAdmin) {
        return {
            status: false,
            message: "❌ Kamu bukan Admin."
        }
    }

    if (command.botAdmin && !m.isBotAdmin) {
        return {
            status: false,
            message: "❌ Bot harus menjadi Admin."
        }
    }

    return {
        status: true
    }
}