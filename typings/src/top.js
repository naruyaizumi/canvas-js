export default class Top {
constructor() {
this.data = {
usersData: [],
background: { type: "none", background: "none" },
abbreviateNumber: false,
opacity: 0,
scoreMessage: "",
colors: {
box: '#212121',
username: '#ffffff',
score: '#ffffff',
firstRank: '#f7c716',
secondRank: '#9e9e9e',
thirdRank: '#94610f'
}
}
}

setUsersData(usersData) {
this.data.usersData = usersData
return this
}

setScoreMessage(message) {
this.data.scoreMessage = message
return this
}

setColors(colors) {
this.data.colors = { ...this.data.colors, ...colors }
return this
}

setabbreviateNumber(bool) {
this.data.abbreviateNumber = !!bool
return this
}

setOpacity(opacity) {
this.data.opacity = opacity
return this
}

setBackground(type, value) {
this.data.background = { type, background: value }
return this
}

async build() {
throw new Error("Method build() belum diimplementasikan.")
}
}