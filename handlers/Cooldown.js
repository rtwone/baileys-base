const cooldown = new Map()

export default function checkCooldown(
    id,
    command,
    seconds = 3
) {
    const key = `${id}:${command}`
    const now = Date.now()
    if (cooldown.has(key)) {
        const expires = cooldown.get(key)
        if (now < expires) {
            return {
                status: false,
                remaining:
                    Math.ceil(
                        (expires - now) / 1000
                    )
            }
        }
    }

    cooldown.set(
        key,
        now + (seconds * 1000)
    )

    return {
        status: true
    }
}