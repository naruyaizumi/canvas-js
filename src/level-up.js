import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'

export default class LevelUp {
constructor(options) {
this.font = { name: options?.font?.name ?? "Poppins", path: options?.font?.path }
this.avatar = "https://cdn.discordapp.com/embed/avatars/0.png"
this.background = { type: "color", background: "#23272a" }
this.title = { data: "Welcome", color: "#fff", size: 36 }
this.description = { data: "Welcome to this server, go read the rules please!", color: "#a7b9c5", size: 26 }
this.overlay_opacity = 0
this.levels = { oldLevel: 0, newLevel: 1 }
this.border
this.avatar_border = "#2a2e35"
}
setAvatar(image) {
this.avatar = image
return this
}
setAvatarBorder(color) {
if (color) {
if (/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(color)) {
this.avatar_border = color
return this
} else {
throw new Error("Invalid color for the argument in the setBorder method. You must give a hexadecimal color.")
}
} else {
throw new Error("You must give a hexadecimal color as the argument of setBorder method.")
}
}
setBackground(type, value) {
if (type === 'color') {
if (value) {
if (/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(value)) {
this.background.type = "color"
this.background.background = value
return this
} else {
throw new Error("Invalid color for the second argument in setForeground method. You must give a hexadecimal color.")
}
} else {
throw new Error("You must give a hexadecimal color as a second argument of setBackground method.")
}
} else if (type === 'image') {
if (value) {
this.background.type = "image"
this.background.background = value
return this
} else {
throw new Error("You must give a background URL as a second argument.")
}
} else {
throw new Error("The first argument of setBackground must be 'color' or 'image'.")
}
}
setBorder(color) {
if (color) {
if (/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(color)) {
this.border = color
return this
} else {
throw new Error("Invalid color for the argument in the setBorder method. You must give a hexadecimal color.")
}
} else {
throw new Error("You must give a hexadecimal color as the argument of setBorder method.")
}
}
setLevels(oldLevel, newLevel) {
if (typeof oldLevel !== "number") throw new Error("The first argument of setLevels method is not a number.")
this.levels.oldLevel = oldLevel
if (typeof newLevel !== "number") throw new Error("The second argument of setLevels method is not a number.")
this.levels.newLevel = newLevel
return this
}
setOverlayOpacity(opacity = 0) {
if (opacity >= 0 && opacity <= 1) {
this.overlay_opacity = opacity
return this
} else {
throw new Error("The value of the opacity of setOverlayOpacity method must be between 0 and 1 (0 and 1 included).")
}
}
setUsername(text, color = "#fff") {
if (text) {
this.title.data = text
if (color && /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(color)) {
this.title.color = color
}
return this
} else {
throw new Error("You must give a text as the first argument of setUsername method.")
}
}
async build() {
if (this.font.path) GlobalFonts.registerFromPath(this.font.path, this.font.name)
const canvas = createCanvas(600, 150)
const ctx = canvas.getContext("2d")
const abbreviateNumber = (value) => {
var newValue = value
if (value >= 1000) {
var suffixes = ["", "K", "M", "B", "T"]
var suffixNum = Math.floor((value.toString().length) / 3)
var shortValue = ''
for (var precision = 2; precision >= 1; precision--) {
shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision))
var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '')
if (dotLessShortValue.length <= 2) break
}
if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1)
newValue = shortValue + suffixes[suffixNum]
}
return newValue
}
if(this.border){
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
ctx.beginPath()
ctx.fillStyle = this.background.background
ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20)
} else if (this.background.type === "image") {
try {
ctx.drawImage(await loadImage(this.background.background), 10, 10, canvas.width - 20, canvas.height - 20)
} catch {
throw new Error("The image given in the second parameter of the setBackground method is not valid or you are not connected to the internet.")
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
ctx.font = `${this.title.size}px ${this.font.name} Bold`
ctx.globalAlpha = 1
ctx.fillStyle = this.title.color
ctx.textAlign = "left"
ctx.fillText(this.title.data.length > 10 ? this.title.data.substring(0,10)+".." : this.title.data, 133, 85)
ctx.beginPath()
ctx.globalAlpha = 1
ctx.lineWidth = 5
ctx.strokeStyle = this.avatar_border
ctx.arc(80, 75, 46, 0, Math.PI * 2)
ctx.stroke()
ctx.closePath()
ctx.beginPath()
ctx.globalAlpha = 1
ctx.lineWidth = 5
ctx.shadowBlur = 9
ctx.shadowColor = this.avatar_border
ctx.shadowOffsetY = 0
ctx.shadowOffsetX = 0
ctx.strokeStyle = this.avatar_border
ctx.arc(410, 75, 30, 0, Math.PI * 2)
ctx.stroke()
ctx.closePath()
ctx.beginPath()
ctx.globalAlpha = 1
ctx.lineWidth = 5
ctx.shadowBlur = 9
ctx.shadowColor = this.avatar_border
ctx.shadowOffsetY = 0
ctx.shadowOffsetX = 0
ctx.strokeStyle = this.avatar_border
ctx.arc(520, 75, 30, 0, Math.PI * 2)
ctx.stroke()
ctx.closePath()
ctx.font = `60px ${this.font.name} Bold`
ctx.globalAlpha = 1
ctx.fillStyle = this.avatar_border
ctx.shadowBlur = 9
ctx.shadowColor = this.avatar_border
ctx.shadowOffsetY = 0
ctx.shadowOffsetX = 0
ctx.textAlign = "center"
ctx.fillText(">", 465, 95)
ctx.font = `30px ${this.font.name} Bold`
ctx.globalAlpha = 1
ctx.fillStyle = "#f0f0f0"
ctx.textAlign = "center"
ctx.fillText(`${abbreviateNumber(this.levels.oldLevel)}`, 410, 85)
ctx.font = `30px ${this.font.name} Bold`
ctx.globalAlpha = 1
ctx.fillStyle = "#f0f0f0"
ctx.textAlign = "center"
ctx.fillText(`${abbreviateNumber(this.levels.newLevel)}`, 520, 85)
ctx.beginPath()
ctx.arc(80, 75, 40, 0, Math.PI * 2)
ctx.closePath()
ctx.clip()
try {
ctx.drawImage(await loadImage(this.avatar), 93 - 60, 32, 90, 90)
} catch {
throw new Error("The image given in the argument of the setAvatar method is not valid or you are not connected to the internet.")
}
return canvas.toBuffer('image/png')
}
}