export default class Util {
static format_time(time) {
let seconds = Math.floor((time / 1000) % 60)
let minutes = Math.floor((time / (1000 * 60)) % 60)
let hours = Math.floor((time / (1000 * 60 * 60)) % 24)
let days = Math.floor(time / (1000 * 60 * 60 * 24))
return `${days}d ${hours}h ${minutes}m ${seconds}s`
}

static rgbToHex(r, g, b) {
r = parseInt(r).toString(16).padStart(2, '0')
g = parseInt(g).toString(16).padStart(2, '0')
b = parseInt(b).toString(16).padStart(2, '0')
return `#${r}${g}${b}`
}

static captchaKey(length = 8) {
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
let result = ''
for (let i = 0; i < length; i++) {
result += chars.charAt(Math.floor(Math.random() * chars.length))
}
return result
}
}