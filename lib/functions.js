import fs from "fs"
import path from "path"

export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const runtime = (seconds) => {

    seconds = Number(seconds)

    const d = Math.floor(seconds / (3600 * 24))
    const h = Math.floor(seconds % (3600 * 24) / 3600)
    const m = Math.floor(seconds % 3600 / 60)
    const s = Math.floor(seconds % 60)

    return [
        d ? `${d} Day` : "",
        h ? `${h} Hour` : "",
        m ? `${m} Minute` : "",
        s ? `${s} Second` : ""
    ].filter(Boolean).join(" ")
}

export const clockString = (ms) => {

    const h = isNaN(ms) ? "--" : Math.floor(ms / 3600000)
    const m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    const s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60

    return [
        h,
        m,
        s
    ].map(v => v.toString().padStart(2, "0")).join(":")
}

export const formatBytes = (bytes) => {

    if (bytes === 0) return "0 B"

    const k = 1024

    const sizes = [
        "B",
        "KB",
        "MB",
        "GB",
        "TB"
    ]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]

}

export const pickRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

export const getRandom = (ext = "") => {
    return `${Date.now()}${ext}`
}

export const isUrl = (text) => {
    return /^https?:\/\/.+/i.test(text)
}

export async function fetchJson(url, options = {}) {
    const response = await fetch(url, options)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}

export async function fetchBuffer(url) {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return Buffer.from(await response.arrayBuffer())
}

export function ensureFolder(folder) {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, {
            recursive: true
        })
    }
}

export function readJSON(file, defaultValue = {}) {
    try {
        if (!fs.existsSync(file)) {
            fs.writeFileSync(
                file,
                JSON.stringify(defaultValue, null, 2)
            )
            return defaultValue
        }

        return JSON.parse(
            fs.readFileSync(file)
        )
    } catch {
        return defaultValue
    }
}

export function writeJSON(file, data) {
    fs.writeFileSync(
        file,
        JSON.stringify(data, null, 2)
    )
}