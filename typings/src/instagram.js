export default class Instagram {
constructor() {
this.data = {
avatar: null,
verified: false,
theme: "dark",
user: { username: null },
like: { likeCount: 0, likeText: "likes" },
image: null,
postDate: Date.now(),
isSaved: false,
isLiked: false,
story: false
}
}

setAvatar(image) {
this.data.avatar = image
return this
}

setUser({ username }) {
this.data.user.username = username
return this
}

setLike({ count, likeText }) {
this.data.like = { likeCount: count, likeText }
return this
}

setVerified(verified) {
if (typeof verified !== 'boolean') throw new Error("Verified must be a boolean")
this.data.verified = verified
return this
}

setStory(story) {
if (typeof story !== 'boolean') throw new Error("Story must be a boolean")
this.data.story = story
return this
}

setPostDate(date) {
this.data.postDate = date
return this
}

setPostImage(image) {
this.data.image = image
return this
}

setLiked(liked) {
if (typeof liked !== 'boolean') throw new Error("Liked must be a boolean")
this.data.isLiked = liked
return this
}

setSaved(saved) {
if (typeof saved !== 'boolean') throw new Error("Saved must be a boolean")
this.data.isSaved = saved
return this
}

setTheme(theme) {
if (!["dark", "light"].includes(theme)) throw new Error("Invalid theme")
this.data.theme = theme
return this
}

async build() {
throw new Error('Method build() belum diimplementasikan.')
}
}