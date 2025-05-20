import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'

export class Tweet {
constructor(options) {
this.font = { name: options?.font?.name ?? "Chirp", path: options?.font?.path }
this.avatar = "https://cdn.discordapp.com/avatars/928259219038302258/299ebac2bc13f5a8f44d2dd1f0c9f856.png?size=1024"
this.comment = "This is a tweet card. You can customize it as you wish. Enjoy! #Canvafy"
this.verified = false
this.theme = "light"
this.user = { displayName: "Beş", username: "fivesobes" }
}
setAvatar(image) {
this.avatar = image
return this
}
setUser({ displayName, username }) {
this.user = { displayName, username }
return this
}
setComment(text) {
this.comment = text
return this
}
setTheme(theme) {
if (!["dark", "light", "dim"].includes(theme)) throw new Error("Invalid theme")
this.theme = theme
return this
}
setVerified(verified) {
if (typeof verified !== "boolean") throw new Error("Verified must be a boolean")
this.verified = verified
return this
}
async build() {
if (this.font.path) GlobalFonts.registerFromPath(this.font.path, this.font.name)
let canvas = createCanvas(968, 343)
let ctx = canvas.getContext("2d")
let totalHeight = calculateHeight(ctx, this.comment)
canvas = createCanvas(968, 343 + totalHeight)
ctx = canvas.getContext("2d")
ctx.fillStyle = this.theme === "dim" ? "#15202b" : this.theme == "light" ? "#fff" : "#000"
ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20)
ctx.fillStyle = this.theme === "dim" ? "#fff" : this.theme == "light" ? "#000" : "#fff"
ctx.textAlign = "left"
ctx.font = "25px Chirp"
ctx.fillText(this.user.displayName, 130, 70)
ctx.fillStyle = this.theme === "dim" ? "#8493a2" : this.theme == "light" ? "#000" : "#8493a2"
ctx.fillText("@" + this.user.username, 130, 100)
if (this.verified) {
let textLength = ctx.measureText(this.user.displayName).width
ctx.drawImage(await loadImage(new URL('../assets/images/twitter-verified.png', import.meta.url)), textLength + 140, 48, 30, 30)
}
writeComment(ctx, this.comment, this.theme)
try {
ctx.drawImage(await loadImage(new URL('../assets/images/reply.png', import.meta.url)), 186.6, canvas.height - 68, 45, 45)
ctx.drawImage(await loadImage(new URL('../assets/images/retweet.png', import.meta.url)), 384, canvas.height - 68, 45, 45)
ctx.drawImage(await loadImage(new URL('../assets/images/like.png', import.meta.url)), 577.8, canvas.height - 68, 45, 45)
ctx.drawImage(await loadImage(new URL('../assets/images/share.png', import.meta.url)), 771, canvas.height - 68, 45, 45)
ctx.drawImage(await loadImage(new URL('../assets/images/other.png', import.meta.url)), 900, 40, 35, 35)
} catch (err) {
console.error(err)
}
ctx.strokeStyle = "#8493a2"
ctx.lineWidth = 1
ctx.beginPath()
ctx.moveTo(50, canvas.height - 88)
ctx.lineTo(918, canvas.height - 88)
ctx.stroke()
ctx.beginPath()
ctx.arc(80, 75, 40, 0, Math.PI * 2)
ctx.closePath()
ctx.clip()
ctx.drawImage(await loadImage(this.avatar), 93 - 58, 28, 90, 90)
return canvas.toBuffer('image/png')
}
}

function writeComment(ctx, comment, theme) {
comment = comment.length > 2490 ? comment.slice(0, 2490) + "..." : comment
if (!comment.includes(" ")) {
comment.length > 57 ? comment = comment.slice(0, 57) + "..." : comment
ctx.fillStyle = theme === "light" ? "#000" : "#fff"
ctx.font = "25px Chirp"
ctx.fillText(comment, 85, 170)
return
}
const words = comment.split(' ')
let line = ''
let lineHeight = 40
let x = 85
let y = 170
for (let i = 0; i < words.length; i++) {
const testLine = line + words[i] + ' '
const metrics = ctx.measureText(testLine).width
if (metrics > 800) {
ctx.fillStyle = theme === "light" ? "#000" : "#fff"
ctx.font = "25px Chirp"
ctx.fillText(line, x, y)
line = words[i] + ' '
y += lineHeight
} else {
line = testLine
}
}
ctx.fillStyle = theme === "light" ? "#000" : "#fff"
ctx.fillText(line, x, y)
}

function calculateHeight(ctx, comment) {
comment = comment.length > 2490 ? comment.slice(0, 2490) + "..." : comment
if (!comment.includes(" ")) {
comment.length > 57 ? comment = comment.slice(0, 57) + "..." : comment
return 40
}
const words = comment.split(' ')
let line = ''
let lineHeight = 40
let totalHeight = 0
for (let i = 0; i < words.length; i++) {
const testLine = line + words[i] + ' '
const metrics = ctx.measureText(testLine).width
if (metrics > 800) {
line = words[i] + ' '
totalHeight += lineHeight * 2.2
} else {
line = testLine
}
}
totalHeight += lineHeight
return totalHeight
}