import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'

export default class Top {
constructor(options) {
this.font = { name: options?.font?.name ?? "Poppins", path: options?.font?.path }
this.usersData = options?.usersData || [
{ top: 1, avatar: "https://i.pinimg.com/736x/c6/a8/5f/c6a85f7dbcbf367d5dc1baa2aaa19a73.jpg", tag: "Beş#0005", score: 5 },
{ top: 2, avatar: "https://i.pinimg.com/736x/c6/a8/5f/c6a85f7dbcbf367d5dc1baa2aaa19a73.jpg", tag: "Beş#0005", score: 5 },
{ top: 3, avatar: "https://i.pinimg.com/736x/c6/a8/5f/c6a85f7dbcbf367d5dc1baa2aaa19a73.jpg", tag: "Beş#0005", score: 5 }
]
this.background = { type: "none", background: "none" }
this.abbreviateNumber = false
this.opacity = 0
this.scoreMessage = ""
this.colors = options?.colors || {
box: '#212121',
username: '#ffffff',
score: '#ffffff',
firstRank: '#f7c716',
secondRank: '#9e9e9e',
thirdRank: '#94610f'
}
}
setUsersData(usersData) {
if (usersData.length > 10) throw new Error("setUsersData values cannot be greater than 10.")
this.usersData = usersData
return this
}
setScoreMessage(message) {
this.scoreMessage = message
return this
}
setColors(colors) {
this.colors = colors
return this
}
setabbreviateNumber(bool) {
if (typeof bool !== "boolean") throw new Error("You must provide a boolean.")
this.abbreviateNumber = bool
return this
}
setOpacity(opacity = 0) {
if (typeof opacity !== "number" || opacity < 0 || opacity > 1) throw new Error("Opacity must be between 0 and 1.")
this.opacity = opacity
return this
}
setBackground(type, value) {
if (type === 'color') {
if (!/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(value)) throw new Error("Invalid hex color.")
this.background = { type, background: value }
return this
}
if (type === 'image') {
if (!value) throw new Error("You must provide an image URL.")
this.background = { type, background: value }
return this
}
throw new Error("The first argument of setBackground must be 'color' or 'image'.")
}
async build() {
if (this.font.path) GlobalFonts.registerFromPath(this.font.path, this.font.name)

const fillRoundRect = (ctx, x, y, w, h, r, f, s) => {
if (typeof r === "number") r = { tl: r, tr: r, br: r, bl: r }
else {
let defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 }
for (let side in defaultRadius) r[side] = r[side] || defaultRadius[side]
}
ctx.beginPath()
ctx.moveTo(x + r.tl, y)
ctx.lineTo(x + w - r.tr, y)
ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr)
ctx.lineTo(x + w, y + h - r.br)
ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h)
ctx.lineTo(x + r.bl, y + h)
ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl)
ctx.lineTo(x, y + r.tl)
ctx.quadraticCurveTo(x, y, x + r.tl, y)
ctx.closePath()
if (f) ctx.fill()
if (s) ctx.stroke()
}

const abbreviateNumber = (value) => {
if (value < 1000) return value
const suffixes = ["", "K", "M", "B", "T"]
const suffixNum = Math.floor((`${value}`).length / 3)
let shortValue = ''
for (let precision = 2; precision >= 1; precision--) {
shortValue = parseFloat((value / Math.pow(1000, suffixNum)).toPrecision(precision))
if ((`${shortValue}`).replace(/[^a-zA-Z0-9]+/g, '').length <= 2) break
}
return shortValue % 1 !== 0 ? shortValue.toFixed(1) + suffixes[suffixNum] : shortValue + suffixes[suffixNum]
}

const height = this.usersData.length * 74.5
const canvas = createCanvas(680, height)
const ctx = canvas.getContext('2d')
ctx.globalAlpha = 1

if (this.background.type === "color") {
ctx.fillStyle = this.background.background
ctx.fillRect(0, 0, canvas.width, canvas.height)
} else if (this.background.type === "image") {
try {
ctx.drawImage(await loadImage(this.background.background), 0, 0, canvas.width, canvas.height)
} catch {
throw new Error("The image given in the setBackground method is not valid or not reachable.")
}
}

let Box_Y = 0, Avatar_Y = 0, Tag_Y = 45, XP_Y = 45, Rank_Y = 45

if (this.usersData && this.usersData.length > 0) {
for (let i = 0; i < this.usersData.length; i++) {
ctx.save()
ctx.fillStyle = this.colors.box
ctx.globalAlpha = this.opacity
fillRoundRect(ctx, 0, Box_Y, canvas.width, 70, 15, true, false)
ctx.globalAlpha = 1

const avatar = await loadImage(this.usersData[i].avatar)
ctx.clip()
ctx.drawImage(avatar, 0, Avatar_Y, 70, 70)
ctx.shadowBlur = 10
ctx.shadowOffsetX = 8
ctx.shadowOffsetY = 6
ctx.shadowColor = "#0a0a0a"

ctx.fillStyle = this.colors.username
ctx.font = `bold 25px ${this.font.name}`
ctx.textAlign = 'left'
ctx.fillText(this.usersData[i].tag, 80, Tag_Y, 260)

ctx.fillStyle = this.colors.score
ctx.font = `bold 20px ${this.font.name}`
ctx.textAlign = 'right'
const scoreVal = this.abbreviateNumber ? abbreviateNumber(this.usersData[i].score) : this.usersData[i].score
ctx.fillText(`${this.scoreMessage} ${scoreVal}`, 560, XP_Y, 200)

if (this.usersData[i].top === 1) ctx.fillStyle = this.colors.firstRank
else if (this.usersData[i].top === 2) ctx.fillStyle = this.colors.secondRank
else if (this.usersData[i].top === 3) ctx.fillStyle = this.colors.thirdRank

ctx.font = `bold 30px ${this.font.name}`
ctx.textAlign = 'right'
ctx.fillText(`#${this.usersData[i].top}`, 660, Rank_Y, 75)

Box_Y += 75
Avatar_Y += 75
Tag_Y += 75
XP_Y += 75
Rank_Y += 75
ctx.restore()
}
} else {
ctx.font = `bold 40px ${this.font.name}`
ctx.fillStyle = '#ffffff'
ctx.textAlign = 'center'
ctx.shadowBlur = 10
ctx.shadowOffsetX = 8
ctx.shadowOffsetY = 6
ctx.shadowColor = "#0a0a0a"
ctx.fillText('Not found!', 340, 370, 500)
}

return canvas.toBuffer('image/png')
}
}