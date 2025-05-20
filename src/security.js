import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'

export default class Security {
constructor(options) {
this.font = { name: options?.font?.name ?? "Poppins", path: options?.font?.path }
this.avatar = "https://cdn.discordapp.com/embed/avatars/0.png"
this.userid = undefined
this.control = undefined
this.locale = "en"
this.createdtime = undefined
this.suspecttime = undefined
this.background = { type: "color", background: "#23272a" }
this.overlay_opacity = 0
this.border = undefined
this.avatar_border = "#2a2e35"
}
setAvatar(image) {
this.avatar = image
return this
}
setAvatarBorder(color) {
if (color && /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(color)) {
this.avatar_border = color
return this
} else {
throw new Error("Invalid color for the argument in the setBorder method. You must give a hexadecimal color.")
}
}
setLocale(lang) {
if (!lang || typeof lang !== "string") throw new Error("The setLocale parameter must be a string and cannot be blank.")
this.locale = lang
return this
}
setCreatedTimestamp(time) {
if (!time || typeof time !== "number") throw new Error("Invalid or missing created timestamp.")
this.createdtime = time
return this
}
setSuspectTimestamp(time) {
if (!time || typeof time !== "number") throw new Error("Invalid or missing suspect timestamp.")
this.suspecttime = time
return this
}
setBackground(type, value) {
if (type === "color" && /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(value)) {
this.background = { type, background: value }
return this
}
if (type === "image" && value) {
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
async build() {
if (this.font.path) GlobalFonts.registerFromPath(this.font.path, this.font.name)
const canvas = createCanvas(600, 150)
const ctx = canvas.getContext("2d")
const kontrol = (Date.now() - this.createdtime) >= this.suspecttime
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
ctx.globalAlpha = 1
if (this.background.type === "color") {
ctx.fillStyle = this.background.background
ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20)
} else {
try {
ctx.drawImage(await loadImage(this.background.background), 10, 10, canvas.width - 20, canvas.height - 20)
} catch {
throw new Error("The background image is invalid or not reachable.")
}
}
ctx.beginPath()
ctx.globalAlpha = this.overlay_opacity
ctx.fillStyle = "#000"
ctx.moveTo(65, 35)
ctx.lineTo(canvas.width - 65, 35)
ctx.quadraticCurveTo(canvas.width - 35, 35, canvas.width - 35, 65)
ctx.lineTo(canvas.width - 35, canvas.height - 65)
ctx.quadraticCurveTo(canvas.width - 35, canvas.height - 35, canvas.width - 65, canvas.height - 35)
ctx.lineTo(65, canvas.height - 35)
ctx.quadraticCurveTo(35, canvas.height - 35, 35, canvas.height - 65)
ctx.lineTo(35, 65)
ctx.quadraticCurveTo(35, 35, 65, 35)
ctx.fill()
ctx.closePath()
const color = kontrol ? "#00ff00" : "#fc9c25"
ctx.beginPath()
ctx.globalAlpha = 1
ctx.lineWidth = 5
ctx.shadowBlur = 9
ctx.shadowColor = color
ctx.shadowOffsetY = 0
ctx.shadowOffsetX = 0
ctx.strokeStyle = color
ctx.arc(465, 75, 30, 0, Math.PI * 2)
ctx.stroke()
ctx.closePath()
ctx.font = `35px Abyss`
ctx.fillStyle = color
ctx.fillText(kontrol ? "✓" : "!", kontrol ? 450 : 457, 90)
const createdDateString = new Date(this.createdtime).toLocaleDateString(this.locale, { month: "long", day: "numeric", year: "numeric" })
ctx.font = `15px ${this.font.name} Bold`
ctx.fillStyle = this.avatar_border
ctx.fillText(createdDateString, 90, 80)
ctx.beginPath()
ctx.lineWidth = 5
ctx.strokeStyle = this.avatar_border
ctx.arc(300, 75, 46, 0, Math.PI * 2)
ctx.stroke()
ctx.beginPath()
ctx.arc(300, 75, 40, 0, Math.PI * 2)
ctx.closePath()
ctx.clip()
try {
ctx.drawImage(await loadImage(this.avatar), 255, 32, 90, 90)
} catch {
throw new Error("The avatar image is invalid or not reachable.")
}
return canvas.toBuffer("image/png")
}
}