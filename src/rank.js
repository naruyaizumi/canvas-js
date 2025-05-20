import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'

export default class Rank {
constructor(options) {
this.font = { name: options?.font?.name ?? "Manrope", path: options?.font?.path }
this.avatar = "https://cdn.discordapp.com/embed/avatars/0.png"
this.overlay_opacity = 0.5
this.background = { type: "color", background: "#23272a" }
this.bar = { color: "#ff000" }
this.discriminator = { data: "0000", color: "#23272a", display: false, size: 35 }
this.username = { data: "fivesobes", color: "#fff", size: 28 }
this.level = { data: 1, display: false, text: "Level", text_color: "#fff", number_color: "#fff", size: 20, data_size: 40 }
this.rank = { data: 1, display: false, text: "Rank", text_color: "#fff", number_color: "#fff", size: 20, data_size: 40 }
this.current_xp = { data: 0, color: "#000" }
this.required_xp = { data: 0, color: "#000" }
this.status = null
this.border = null
}

setAvatar(image) {
if (!image) throw new Error("The argument of setAvatar method is not an image or URL.")
this.avatar = image
return this
}

setBackground(type, value) {
if (type === 'color' && /^#([a-fA-F0-9]{3,6})$/.test(value)) {
this.background = { type, background: value }
return this
}
if (type === 'image' && value) {
this.background = { type, background: value }
return this
}
throw new Error("Invalid background type or value.")
}

setBarColor(color) {
if (!/^#([a-fA-F0-9]{3,6})$/.test(color)) throw new Error("Invalid bar color.")
this.bar.color = color
return this
}

setBorder(color) {
if (!/^#([a-fA-F0-9]{3,6})$/.test(color)) throw new Error("Invalid border color.")
this.border = color
return this
}

setOverlayOpacity(opacity = 0.5) {
if (typeof opacity !== "number" || opacity < 0 || opacity > 1) throw new Error("Overlay opacity must be between 0 and 1.")
this.overlay_opacity = opacity
return this
}

setLevel(data, text) {
if (typeof data !== "number") throw new Error("Invalid level data.")
this.level.data = data
if (text) {
if (typeof text !== "string") throw new Error("Level text must be a string.")
this.level.text = text
}
this.level.display = true
return this
}

setLevelColor({ text = "#fff", number = "#fff" }) {
if (!/^#([a-fA-F0-9]{3,6})$/.test(text) || !/^#([a-fA-F0-9]{3,6})$/.test(number)) throw new Error("Invalid color in setLevelColor.")
this.level.text_color = text
this.level.number_color = number
return this
}

setRank(data, text) {
if (typeof data !== "number") throw new Error("Invalid rank data.")
this.rank.data = data
if (text) {
if (typeof text !== "string") throw new Error("Rank text must be a string.")
this.rank.text = text
}
this.rank.display = true
return this
}

setRankColor({ text = "#fff", number = "#fff" }) {
if (!/^#([a-fA-F0-9]{3,6})$/.test(text) || !/^#([a-fA-F0-9]{3,6})$/.test(number)) throw new Error("Invalid color in setRankColor.")
this.rank.text_color = text
this.rank.number_color = number
return this
}

setCurrentXp(xp, color = "#000") {
if (typeof xp !== "number" || !/^#([a-fA-F0-9]{3,6})$/.test(color)) throw new Error("Invalid current XP value or color.")
this.current_xp.data = xp
this.current_xp.color = color
return this
}

setRequiredXp(xp, color = "#000") {
if (typeof xp !== "number" || !/^#([a-fA-F0-9]{3,6})$/.test(color)) throw new Error("Invalid required XP value or color.")
this.required_xp.data = xp
this.required_xp.color = color
return this
}

setUsername(username, color = "#fff") {
if (typeof username !== "string" || !/^#([a-fA-F0-9]{3,6})$/.test(color)) throw new Error("Invalid username or color.")
this.username.data = username
this.username.color = color
return this
}

setStatus(status) {
const statuses = {
online: "#3ba55c",
idle: "#faa61a",
dnd: "#ed4245",
stream: "#593695",
offline: "#747f8e"
}
if (!statuses[status]) throw new Error("Invalid status value.")
this.status = statuses[status]
return this
}

setCustomStatus(color) {
if (!/^#([a-fA-F0-9]{3,6})$/.test(color)) throw new Error("Invalid status color.")
this.status = color
return this
}
async build() {
if (this.font.path) GlobalFonts.registerFromPath(this.font.path, this.font.name)
const max_xp_bar_width = 500
const xp_bar = Math.floor(this.current_xp.data / this.required_xp.data * max_xp_bar_width)
const canvas = createCanvas(850, 300)
const ctx = canvas.getContext("2d")
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
ctx.beginPath()
ctx.fillStyle = this.background.background
ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20)
} else if (this.background.type === "image") {
try {
ctx.drawImage(await loadImage(this.background.background), 10, 10, canvas.width - 20, canvas.height - 20)
} catch {
throw new Error("The image given in setBackground is not valid or unreachable.")
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
ctx.font = `${this.username.size}px ${this.font.name} Bold`
ctx.fillStyle = this.username.color
ctx.textAlign = "start"
const username = this.username.data.length > 15 ? this.username.data.slice(0, 15) + '...' : this.username.data
ctx.fillText(username, 258, 125)
let level_text_width = 0
let level_width = 0
if (this.level.display) {
ctx.textAlign = "end"
ctx.fillStyle = this.level.text_color
ctx.font = `${this.level.data_size}px ${this.font.name} Bold`
ctx.fillText(this.level.data.toString().toUpperCase(), 250 + max_xp_bar_width, 90)
level_width = ctx.measureText(this.level.data.toString()).width + 5
ctx.fillStyle = this.level.number_color
ctx.font = `${this.level.size}px ${this.font.name} Bold`
ctx.fillText(this.level.text.toUpperCase(), 250 + max_xp_bar_width - level_width, 90)
level_text_width = ctx.measureText(this.level.text).width + 30
}
if (this.rank.display) {
ctx.textAlign = "end"
ctx.fillStyle = this.rank.text_color
ctx.font = `${this.rank.data_size}px ${this.font.name} Bold`
ctx.fillText(this.rank.data.toString().toUpperCase(), 200 + max_xp_bar_width - level_text_width - level_width, 90)
const rank_width = ctx.measureText(this.rank.data.toString().toUpperCase()).width + 5
ctx.fillStyle = this.rank.number_color
ctx.font = `${this.rank.size}px ${this.font.name} Bold`
ctx.fillText(this.rank.text.toUpperCase(), 200 + max_xp_bar_width - level_text_width - level_width - rank_width, 90)
}
ctx.beginPath()
ctx.globalAlpha = 1
ctx.lineWidth = 2
ctx.fillStyle = "#efeded"
ctx.moveTo(220, 135)
ctx.lineTo(200 + max_xp_bar_width, 135)
ctx.quadraticCurveTo(220 + max_xp_bar_width, 135, 220 + max_xp_bar_width, 152.5)
ctx.quadraticCurveTo(220 + max_xp_bar_width, 170, 200 + max_xp_bar_width, 170)
ctx.lineTo(220, 170)
ctx.lineTo(220, 135)
ctx.fill()
ctx.closePath()
ctx.beginPath()
ctx.fillStyle = this.bar.color
ctx.moveTo(220, 135)
ctx.lineTo(200 + xp_bar, 135)
ctx.quadraticCurveTo(220 + xp_bar, 135, 220 + xp_bar, 152.5)
ctx.quadraticCurveTo(220 + xp_bar, 170, 200 + xp_bar, 170)
ctx.lineTo(220, 170)
ctx.lineTo(220, 135)
ctx.fill()
ctx.textAlign = "start"
ctx.font = `23px ${this.font.name} Bold`
ctx.fillStyle = this.current_xp.color
ctx.fillText(`${this.current_xp.data}`, 590, 162)
ctx.fillStyle = this.required_xp.color
ctx.fillText(` / ${this.required_xp.data}`, 590 + ctx.measureText(this.current_xp.data.toString()).width, 162)
ctx.closePath()
if (this.status) {
ctx.beginPath()
ctx.arc(150, 150, 95, 0, Math.PI * 2)
ctx.fillStyle = this.status
ctx.fill()
ctx.closePath()
}
ctx.beginPath()
ctx.arc(150, 150, this.status ? 90 : 95, 0, Math.PI * 2)
ctx.closePath()
ctx.clip()
try {
const avatar = await loadImage(this.avatar)
ctx.drawImage(avatar, this.status ? 60 : 55, this.status ? 60 : 55, this.status ? 180 : 190, this.status ? 180 : 190)
} catch {
throw new Error("Avatar image invalid or unreachable.")
}
return canvas.toBuffer('image/png')
}
}