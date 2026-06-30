import fs from "fs"
import path from "path"

const DATABASE_PATH = path.join(
    process.cwd(),
    "database",
    "database.json"
)

class Database {
    constructor() {
        this.data = {}
        this.load()
    }

    load() {
        try {
            if (!fs.existsSync(DATABASE_PATH)) {

                fs.mkdirSync(
                    path.dirname(DATABASE_PATH),
                    { recursive: true }
                )

                fs.writeFileSync(
                    DATABASE_PATH,
                    JSON.stringify({
                        users: {},
                        groups: {},
                        settings: {}
                    }, null, 2)
                )

            }

            this.data = JSON.parse(
                fs.readFileSync(DATABASE_PATH)
            )
        } catch {
            this.data = {
                users: {},
                groups: {},
                settings: {}
            }
        }
    }

    save() {
        fs.writeFileSync(
            DATABASE_PATH,
            JSON.stringify(this.data, null, 2)
        )
    }

    getUser(id) {
        if (!this.data.users[id]) {
            this.data.users[id] = {
                id,
                name: "",
                premium: false,
                limit: 0
            }

            this.save()
        }

        return this.data.users[id]
    }

    getGroup(id) {
        if (!this.data.groups[id]) {
            this.data.groups[id] = {
                id,
                welcome: false,
                antiLink: false
            }
            this.save()
        }

        return this.data.groups[id]
    }
}

const db = new Database()
export default db