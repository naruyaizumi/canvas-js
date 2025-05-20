import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'

export default class WelcomeLeave {
constructor(options) {
this.font = { name: options?.font?.name ?? "Poppins", path: options?.font?.path }
this.avatar = "https://cdn.discordapp.com/embed/avatars/0.png"
this.background = { type: "color", background: "#23272a" }
this.title = { data: "Welcome", color: "#fff", size: 36 }
this.description = { data: "Welcome to this server, go read the rules please!", color: "#a7b9c5", size: 26 }
this.overlay_opacity = 0
this.border = undefined
this.avatar_border = "#2a2e35"
}
setAvatar(image) {
this.avatar = image
return this
}
setAvatarBorder(color) {
if (!color || !/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(color)) throw new Error("Invalid avatar border color.")
this.avatar_border = color
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
setDescription(text, color = "#a7b9c5") {
if (!text || text.length > 80) throw new Error("Description must be max 80 characters.")
this.description.data = text
if (/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(color)) this.description.color = color
return this
}
setOverlayOpacity(opacity = 0) {
if (opacity < 0 || opacity > 1) throw new Error("Overlay opacity must be between 0 and 1.")
this.overlay_opacity = opacity
return this
}
setTitle(text, color = "#fff") {
if (!text || text.length > 20) throw new Error("Title must be max 20 characters.")
this.title.data = text
if (/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(color)) this.title.color = color
return this
}
async build() {
if (this.font.path) GlobalFonts.registerFromPath(this.font.path, this.font.name)
const canvas = createCanvas(700, 350)
const ctx = canvas.getContext("2d")
if (this.border) {
ctx.beginPath()
ctx.lineWidth = 8
ctx.strokeStyle = this.border
ctx.moveTo(55, 15)
ctx.lineTo(645, 15)
ctx.quadraticCurveTo(680, 20, 685, 55)
ctx.lineTo(685, 295)
ctx.quadraticCurveTo(680, 330, 645, 335)
ctx.lineTo(55, 335)
ctx.quadraticCurveTo(20, 330, 15, 295)
ctx.lineTo(15, 55)
ctx.quadraticCurveTo(20, 20, 55, 15)
ctx.lineTo(56, 15)
ctx.stroke()
ctx.closePath()
}
ctx.beginPath()
ctx.moveTo(65, 25)
ctx.lineTo(635, 25)
ctx.quadraticCurveTo(675, 25, 675, 65)
ctx.lineTo(675, 285)
ctx.quadraticCurveTo(675, 325, 635, 325)
ctx.lineTo(65, 325)
ctx.quadraticCurveTo(25, 325, 25, 285)
ctx.lineTo(25, 65)
ctx.quadraticCurveTo(25, 25, 65, 25)
ctx.lineTo(66, 25)
ctx.closePath()
ctx.clip()
ctx.globalAlpha = 1
if (this.background.type === "color") {
ctx.fillStyle = this.background.background
ctx.fillRect(10, 10, 680, 330)
} else {
try {
ctx.drawImage(await loadImage(this.background.background), 10, 10, 680, 330)
} catch {
throw new Error("Background image invalid or unreachable.")
}
}
ctx.beginPath()
ctx.globalAlpha = this.overlay_opacity
ctx.fillStyle = "#000"
ctx.moveTo(75, 45)
ctx.lineTo(625, 45)
ctx.quadraticCurveTo(655, 45, 655, 75)
ctx.lineTo(655, 275)
ctx.quadraticCurveTo(655, 305, 625, 305)
ctx.lineTo(75, 305)
ctx.quadraticCurveTo(45, 305, 45, 275)
ctx.lineTo(45, 75)
ctx.quadraticCurveTo(45, 45, 75, 45)
ctx.fill()
ctx.closePath()
ctx.font = `bold ${this.title.size}px ${this.font.name}`
ctx.globalAlpha = 1
ctx.fillStyle = this.title.color
ctx.textAlign = "center"
ctx.fillText(this.title.data, 350, 225)
ctx.font = `regular ${this.description.size}px ${this.font.name}`
ctx.fillStyle = this.description.color
ctx.textAlign = "center"
if (this.description.data.length > 35) {
const words = this.description.data.split(" ")
let line2 = []
while (words.join(" ").length > 35) line2.unshift(words.pop())
ctx.fillText(words.join(" "), 350, 260)
ctx.fillText(line2.join(" "), 350, 295)
} else {
ctx.fillText(this.description.data, 350, 260)
}
ctx.beginPath()
ctx.globalAlpha = 1
ctx.lineWidth = 5
ctx.strokeStyle = this.avatar_border
ctx.arc(350, 125, 66, 0, Math.PI * 2)
ctx.stroke()
ctx.closePath()
ctx.beginPath()
ctx.arc(350, 125, 60, 0, Math.PI * 2)
ctx.closePath()
ctx.clip()
try {
ctx.drawImage(await loadImage(this.avatar), 290, 65, 120, 120)
} catch {
throw new Error("Avatar image invalid or unreachable.")
}
return canvas.toBuffer('image/png')
}
}