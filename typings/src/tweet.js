export default class Tweet {
constructor() {
this.data = {
avatar: 'https://cdn.discordapp.com/avatars/928259219038302258/299ebac2bc13f5a8f44d2dd1f0c9f856.png?size=1024',
comment: 'This is a tweet card. You can customize it as you wish. Enjoy! #Canvafy',
verified: false,
client: null,
theme: 'light',
user: {
displayName: 'Beş',
username: 'fivesobes'
}
}
}

setAvatar(image) {
this.data.avatar = image
return this
}

setUser({ displayName, username }) {
this.data.user = { displayName, username }
return this
}

setComment(text) {
this.data.comment = text
return this
}

setTheme(theme) {
if (!['light', 'dark', 'dim'].includes(theme))
throw new Error('Invalid theme. Gunakan "light", "dark", atau "dim"')
this.data.theme = theme
return this
}

setVerified(verified) {
if (typeof verified !== 'boolean')
throw new Error('Verified harus boolean')
this.data.verified = verified
return this
}

async build() {
throw new Error('Method build() belum diimplementasikan.')
}
}