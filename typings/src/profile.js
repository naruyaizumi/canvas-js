export default class Profile {
constructor() {
this.data = {
userid: "928259219038302258",
activity: {},
border: null
}
}

setBorder(color) {
this.data.border = color
return this
}

setActivity({ activity = {}, largeImage = {} }) {
this.data.activity = {
...activity,
largeImage
}
return this
}

setUser(id) {
this.data.userid = id
return this
}

async build() {
throw new Error("Method build() belum diimplementasikan.")
}
}