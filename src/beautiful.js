import { createCanvas, loadImage } from '@napi-rs/canvas'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default async (template_image) => {
let image
try {
image = await loadImage(template_image)
} catch {
throw new Error('The image given in the argument of the beautiful method is not valid or you are not connected to the internet.')
}
const background = await loadImage(join(__dirname, '../assets/images/beautiful.png'))
const canvas = createCanvas(background.width, background.height)
const ctx = canvas.getContext('2d')
ctx.drawImage(background, 0, 0)
ctx.drawImage(image, 258, 28, 84, 95)
ctx.drawImage(image, 258, 229, 84, 95)
return canvas.toBuffer('image/png')
}