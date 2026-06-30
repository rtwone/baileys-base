import config from "../config.js"
import db from "../lib/database.js"
import * as functions from "../lib/functions.js"
import * as logger from "../lib/logger.js"

export default function createContext({
    sock,
    m,
    command
}) {
    return {
        sock,
        m,
        command,
        config,
        db,
        func: functions,
        logger
    }
}