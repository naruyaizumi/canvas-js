export default class Rank {
constructor() {
this.data = {
avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
overlay_opacity: 0.5,
background: { type: "color", background: "#23272a" },
bar: { color: "#ff000" },
username: { data: "fivesobes", color: "#fff", size: 28 },
level: { data: 1, display: false, text: "Level", text_color: "#fff", number_color: "#fff", size: 20, data_size: 40 },
rank: { data: 1, display: false, text: "Rank", text_color: "#fff", number_color: "#fff", size: 20, data_size: 40 },
current_xp: { data: 0, color: "#000" },
required_xp: { data: 0, color: "#000" },
status: null,
border: null
}
}

setUsername(name, color = "#fff") {
this.data.username.data = name
this.data.username.color = color
return this
}

setAvatar(data) {
this.data.avatar = data
return this
}

setBackground(type, value) {
this.data.background = { type, background: value }
return this
}

setBarColor(color = "#ff000") {
this.data.bar.color = color
return this
}

setBorder(color = "#fff") {
this.data.border = color
return this
}

setOverlayOpacity(opac = 0.5) {
this.data.overlay_opacity = opac
return this
}

setLevel(level, text = "Level") {
this.data.level.data = level
this.data.level.text = text
this.data.level.display = true
return this
}

setLevelColor(text = "#fff", number = "#fff") {
this.data.level.text_color = text
this.data.level.number_color = number
return this
}

setRank(rank, text = "Rank") {
this.data.rank.data = rank
this.data.rank.text = text
this.data.rank.display = true
return this
}

setRankColor(text = "#fff", number = "#fff") {
this.data.rank.text_color = text
this.data.rank.number_color = number
return this
}

setCurrentXp(xp, color = "#000") {
this.data.current_xp.data = xp
this.data.current_xp.color = color
return this
}

setRequiredXp(xp, color = "#000") {
this.data.required_xp.data = xp
this.data.required_xp.color = color
return this
}

setStatus(status) {
this.data.status = status
return this
}

setCustomStatus(color) {
this.data.status = { custom: true, color }
return this
}

async build() {
throw new Error("Method build() belum diimplementasikan.")
}
}