export default class Spotify {
constructor() {
this.data = {
album: null,
artist: null,
border: null,
_bar_width: 1400,
end: null,
overlay_opacity: null,
image: null,
blur: 3,
title: null,
start: null,
randomColors: ['#0c0c0c', '#121212', '#282828', '#1c1c1c', '#244c66'],
spotifyLogo: true
}
}

setAlbum(name) {
this.data.album = name
return this
}

setAuthor(name) {
this.data.artist = name
return this
}

setBorder(color) {
this.data.border = color
return this
}

setOverlayOpacity(opac = 0.5) {
this.data.overlay_opacity = Math.max(0, Math.min(1, opac))
return this
}

setBlur(blur = 3) {
this.data.blur = Math.min(15, Math.max(0, blur))
return this
}

setImage(image) {
this.data.image = image
return this
}

setTitle(title) {
this.data.title = title
return this
}

setSpotifyLogo(bool = true) {
this.data.spotifyLogo = Boolean(bool)
return this
}

setTimestamp(start, end) {
this.data.start = start
this.data.end = end
return this
}

async build() {
throw new Error('Method build() belum diimplementasikan. Tambahkan logika rendering Canva di sini.')
}
}