export default class Captcha {
constructor() {
this.data = {
code: null,
color: "#f0f0f0",
background: {
type: "color",
background: "#23272a"
},
overlay_opacity: 0,
border: null
}
}

setCaptchaKey(code) {
this.data.code = code
return this
}

setBackground(type, value) {
if (!["image", "color"].includes(type)) throw new Error("Background type must be 'image' or 'color'")
this.data.background = { type, background: value }
return this
}

setBorder(color) {
this.data.border = color
return this
}

setOverlayOpacity(opacity) {
this.data.overlay_opacity = Math.max(0, Math.min(1, opacity))
return this
}

async build() {
throw new Error('Method build() belum diimplementasikan. Tambahkan logika Canvas di sini.')
}
}