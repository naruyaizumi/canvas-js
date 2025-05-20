import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
dayjs.extend(duration)

export default class Util {
constructor() {
}
static format_time(time) {
if (!time) return "00:00"
const format = dayjs.duration(time).format("DD:HH:mm:ss")
const chunks = format.split(":").filter(c => c !== "00")
if (chunks.length < 2) chunks.unshift("00")
return chunks.join(":")
}

static rgbToHex(r, g, b) {
return "#" + this.#componentToHex(r) + this.#componentToHex(g) + this.#componentToHex(b)
}

static captchaKey(length = 8) {
if (length < 6) {
length = 6
console.error("[Canvafy] captcha key length must be at least 6, length set to 6.")
} else if (length > 20) {
length = 20
console.error("[Canvafy] captcha key length must not exceed 20, length set to 20.")
}
let result = ''
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
while (result.length < length) {
result += chars.charAt(Math.floor(Math.random() * chars.length))
}
return result
}

static #componentToHex(c) {
const hex = c.toString(16)
return hex.length == 1 ? "0" + hex : hex
}
}