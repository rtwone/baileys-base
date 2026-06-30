export default class Collection extends Map {

    constructor(iterable) {
        super(iterable)
    }

    find(callback) {
        for (const value of this.values()) {
            if (callback(value)) return value
        }
        return undefined
    }

    filter(callback) {
        return [...this.values()].filter(callback)
    }

    map(callback) {
        return [...this.values()].map(callback)
    }

    random() {
        const values = [...this.values()]
        return values[
            Math.floor(Math.random() * values.length)
        ]
    }

    first() {
        return [...this.values()][0]
    }

    last() {
        const values = [...this.values()]
        return values[values.length - 1]
    }

    categories() {
        return [
            ...new Set(
                [...this.values()]
                    .map(cmd => cmd.category || "Other")
            )
        ]
    }
}