import { createCanvas, loadImage } from '@napi-rs/canvas'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default async (template_image1, template_image2) => {
let image1
let image2
try {
image1 = await loadImage(template_image1)
image2 = await loadImage(template_image2)
} catch {
throw new Error('The image given in the argument of the batslap method is not valid or you are not connected to the internet.')
}
const background = await loadImage(join(__dirname, '../assets/images/batslap.png'))
const canvas = createCanvas(background.width, background.height)
const ctx = canvas.getContext('2d')
ctx.drawImage(background, 0, 0)
ctx.drawImage(image1, 470, 100, 290, 290)
ctx.drawImage(image2, 820, 350, 270, 270)
return canvas.toBuffer('image/png')
}