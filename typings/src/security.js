export default class Security {
constructor() {
this.data = {
avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
userid: null,
control: null,
locale: "en",
createdtime: null,
suspecttime: null,
background: { type: "color", background: "#23272a" },
overlay_opacity: 0,
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

setLocale(lang) {
this.data.locale = lang
return this
}

setCreatedTimestamp(time) {
this.data.createdtime = time
return this
}

setSuspectTimestamp(time) {
this.data.suspecttime = time
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

async build() {
throw new Error("Method build() belum diimplementasikan.")
}
}