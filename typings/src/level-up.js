export default class LevelUp {
constructor() {
this.data = {
avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
background: {
type: "color",
background: "#23272a"
},
title: {
data: "Welcome",
color: "#fff",
size: 36
},
description: {
data: "Welcome to this server, go read the rules please!",
color: "#a7b9c5",
size: 26
},
overlay_opacity: 0,
levels: {
oldLevel: 0,
newLevel: 1
},
border: null,
avatar_border: "#2a2e35"
}
}

setAvatar(image) {
this.data.avatar = image
return this
}

setAvatarBorder(color) {
this.data.avatar_border = color
return this
}

setBackground(type, value) {
this.data.background = {
type,
background: value
}
return this
}

setBorder(color) {
this.data.border = color
return this
}

setLevels(oldLevel, newLevel) {
this.data.levels = {
oldLevel,
newLevel
}
return this
}

setOverlayOpacity(opacity) {
this.data.overlay_opacity = opacity
return this
}

setUsername(text, color) {
this.data.title.data = text
if (color) this.data.title.color = color
return this
}

async build() {
throw new Error("Method build() belum diimplementasikan.")
}
}