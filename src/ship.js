import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'

export default class Ship {
constructor(options) {
this.font = { name: options?.font?.name ?? "Poppins", path: options?.font?.path }
this.avatar = "https://cdn.discordapp.com/embed/avatars/0.png"
this.avatar2 = "https://cdn.discordapp.com/embed/avatars/0.png"
this.number = Math.floor(Math.random() * 101)
this.background = { type: "color", background: "#23272a" }
this.overlay_opacity = 0
this.border = undefined
}
setAvatars(image, image2) {
this.avatar = image
this.avatar2 = image2
return this
}
setBackground(type, value) {
if (type === 'color' && /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(value)) {
this.background = { type, background: value }
return this
}
if (type === 'image' && value) {
this.background = { type, background: value }
return this
}
throw new Error("Invalid background type or value.")
}
setBorder(color) {
if (!color || !/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(color)) throw new Error("Invalid border color.")
this.border = color
return this
}
setOverlayOpacity(opacity = 0) {
if (opacity < 0 || opacity > 1) throw new Error("Overlay opacity must be between 0 and 1.")
this.overlay_opacity = opacity
return this
}
setCustomNumber(num) {
if (num < 0 || num > 100) throw new Error("setCustomNumber must be between 0 and 100.")
this.number = num
return this
}
async build() {
if (this.font.path) GlobalFonts.registerFromPath(this.font.path, this.font.name)
const canvas = createCanvas(700, 350)
const ctx = canvas.getContext("2d")
const val = this.number

if (this.border) {
ctx.beginPath()
ctx.lineWidth = 8
ctx.strokeStyle = this.border
ctx.moveTo(55, 15)
ctx.lineTo(canvas.width - 55, 15)
ctx.quadraticCurveTo(canvas.width - 20, 20, canvas.width - 15, 55)
ctx.lineTo(canvas.width - 15, canvas.height - 55)
ctx.quadraticCurveTo(canvas.width - 20, canvas.height - 20, canvas.width - 55, canvas.height - 15)
ctx.lineTo(55, canvas.height - 15)
ctx.quadraticCurveTo(20, canvas.height - 20, 15, canvas.height - 55)
ctx.lineTo(15, 55)
ctx.quadraticCurveTo(20, 20, 55, 15)
ctx.lineTo(56, 15)
ctx.stroke()
ctx.closePath()
}

ctx.beginPath()
ctx.moveTo(65, 25)
ctx.lineTo(canvas.width - 65, 25)
ctx.quadraticCurveTo(canvas.width - 25, 25, canvas.width - 25, 65)
ctx.lineTo(canvas.width - 25, canvas.height - 65)
ctx.quadraticCurveTo(canvas.width - 25, canvas.height - 25, canvas.width - 65, canvas.height - 25)
ctx.lineTo(65, canvas.height - 25)
ctx.quadraticCurveTo(25, canvas.height - 25, 25, canvas.height - 65)
ctx.lineTo(25, 65)
ctx.quadraticCurveTo(25, 25, 65, 25)
ctx.lineTo(66, 25)
ctx.closePath()
ctx.clip()

if (this.background.type === "color") {
ctx.fillStyle = this.background.background
ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20)
} else {
try {
ctx.drawImage(await loadImage(this.background.background), 10, 10, canvas.width - 20, canvas.height - 20)
} catch {
throw new Error("Invalid or unreachable background image.")
}
}

ctx.beginPath()
ctx.globalAlpha = this.overlay_opacity
ctx.fillStyle = "#000"
ctx.moveTo(75, 45)
ctx.lineTo(canvas.width - 75, 45)
ctx.quadraticCurveTo(canvas.width - 45, 45, canvas.width - 45, 75)
ctx.lineTo(canvas.width - 45, canvas.height - 75)
ctx.quadraticCurveTo(canvas.width - 45, canvas.height - 45, canvas.width - 75, canvas.height - 45)
ctx.lineTo(75, canvas.height - 45)
ctx.quadraticCurveTo(45, canvas.height - 45, 45, canvas.height - 75)
ctx.lineTo(45, 75)
ctx.quadraticCurveTo(45, 45, 75, 45)
ctx.fill()
ctx.closePath()

ctx.globalAlpha = 1
ctx.beginPath()
ctx.moveTo(350, 130)
ctx.bezierCurveTo(305, 100, 275, 130, 275, 175)
ctx.bezierCurveTo(275, 220, 350, 250, 350, 250)
ctx.bezierCurveTo(350, 250, 425, 220, 425, 175)
ctx.bezierCurveTo(425, 130, 395, 100, 350, 130)
ctx.closePath()
ctx.strokeStyle = "black"
ctx.lineWidth = 2
ctx.stroke()

let doluluk = 399
if (val >= 100) doluluk = 101
else if (val >= 90) doluluk = 130
else if (val >= 80) doluluk = 160
else if (val >= 70) doluluk = 190
else if (val >= 60) doluluk = 220
else if (val >= 50) doluluk = 250
else if (val >= 40) doluluk = 280
else if (val >= 30) doluluk = 310
else if (val >= 20) doluluk = 340
else if (val >= 10) doluluk = 370
else if (val >= 5) doluluk = 385

ctx.globalAlpha = 0.6
const gradient = ctx.createLinearGradient(0, 100, 0, doluluk)
gradient.addColorStop(0, "#ffffff")
gradient.addColorStop(0.5, "#ffffff")
gradient.addColorStop(0.5, "#ff0000")
gradient.addColorStop(0.1, "#ff0000")
ctx.fillStyle = gradient
ctx.shadowBlur = 9
ctx.shadowColor = "#ff0000"
ctx.shadowOffsetY = 0
ctx.shadowOffsetX = 0
ctx.fill()

ctx.fillStyle = "WHITE"
ctx.font = `bold 36px ${this.font.name}`
ctx.shadowBlur = 9
ctx.shadowColor = "#0a0a0a"
ctx.shadowOffsetY = 8
ctx.shadowOffsetX = -6
ctx.globalAlpha = 1
ctx.textAlign = "center"
ctx.fillText(`%${val}`, 350, 190)

try {
const avatar1 = await loadImage(this.avatar)
const avatar2 = await loadImage(this.avatar2)
ctx.globalAlpha = 1
ctx.beginPath()
ctx.arc(160, 175, 90, 0, 2 * Math.PI)
ctx.arc(540, 175, 90, 0, 2 * Math.PI)
ctx.clip()
ctx.drawImage(avatar1, 60, 75, 200, 200)
ctx.drawImage(avatar2, 440, 75, 200, 200)
} catch {
throw new Error("One of the avatars is invalid or unreachable.")
}

return canvas.toBuffer('image/png')
}
}