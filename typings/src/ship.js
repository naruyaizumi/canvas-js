export default class Ship {
constructor() {
this.data = {
avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
avatar2: "https://cdn.discordapp.com/embed/avatars/0.png",
number: null,
background: { type: "color", background: "#23272a" },
overlay_opacity: 0,
border: null
}
}

setAvatars(image, image2) {
this.data.avatar = image
this.data.avatar2 = image2
return this
}

setBackground(type, value) {
this.data.background = { type, background: value }
return this
}

setBorder(color) {
this.data.border = color
return this
}

setOverlayOpacity(opacity) {
this.data.overlay_opacity = opacity
return this
}

setCustomNumber(num) {
this.data.number = num
return this
}

async build() {
throw new Error("Method build() belum diimplementasikan.")
}
}