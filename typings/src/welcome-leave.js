export default class WelcomeLeave {
constructor() {
this.data = {
avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
background: {
type: 'color',
background: '#23272a'
},
title: {
data: 'Welcome',
color: '#fff',
size: 36
},
description: {
data: 'Welcome to this server, go read the rules please!',
color: '#a7b9c5',
size: 26
},
overlay_opacity: 0,
border: null,
avatar_border: '#2a2e35'
}
}

setAvatarBorder(color) {
this.data.avatar_border = color
return this
}

setUsername(name, color) {
this.data.username = { data: name, color: color || '#fff' }
return this
}

setAvatar(image) {
this.data.avatar = image
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

setOverlayOpacity(opac) {
this.data.overlay_opacity = opac
return this
}

setDescription(text, color) {
this.data.description = {
data: text,
color: color || '#a7b9c5',
size: 26
}
return this
}

setTitle(text, color) {
this.data.title = {
data: text,
color: color || '#fff',
size: 36
}
return this
}

async build() {
throw new Error('Method build() belum diimplementasikan.')
}
}