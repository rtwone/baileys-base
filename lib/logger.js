import chalk from "chalk"

export function info(text) {
    console.log(
        chalk.blue("[INFO]"),
        text
    )
}

export function success(text) {
    console.log(
        chalk.green("[SUCCESS]"),
        text
    )
}

export function warning(text) {
    console.log(
        chalk.yellow("[WARNING]"),
        text
    )
}

export function error(text) {
    console.log(
        chalk.red("[ERROR]"),
        text
    )
}

export function logCommand(m) {
    if (!m.isGroup) {
        console.log(chalk.gray(`[${new Date().toLocaleTimeString()}]`), chalk.cyan(m.pushName), chalk.magenta(m.command))
    } else {
        console.log(chalk.gray(`[${new Date().toLocaleTimeString()}]`), chalk.cyan(m.pushName), chalk.magenta(m.command), chalk.green(m.groupName))
    }
}

export function logChat(m) {
    if (!m.isGroup) {
        console.log(chalk.gray(`[${new Date().toLocaleTimeString()}]`), chalk.cyan(m.pushName), chalk.magenta(m.body))
    } else {
        console.log(chalk.gray(`[${new Date().toLocaleTimeString()}]`), chalk.cyan(m.pushName), chalk.magenta(m.body), chalk.green(m.groupName))
    }
}