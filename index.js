import { GlobalFonts } from '@napi-rs/canvas'
import path from 'path'
import { fileURLToPath } from 'url'
const pkg = await import('./package.json', { assert: { type: 'json' } })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
GlobalFonts.registerFromPath(`${__dirname}/assets/fonts/Poppins/Poppins-Regular.ttf`, "Poppins")
GlobalFonts.registerFromPath(`${__dirname}/assets/fonts/Poppins/Poppins-Bold.ttf`, "Poppins Bold")
GlobalFonts.registerFromPath(`${__dirname}/assets/fonts/Manrope/Manrope-Regular.ttf`, "Manrope")
GlobalFonts.registerFromPath(`${__dirname}/assets/fonts/Manrope/Manrope-Bold.ttf`, "Manrope Bold")
GlobalFonts.registerFromPath(`${__dirname}/assets/fonts/Others/AbyssinicaSIL-Regular.ttf`, "Abyss")
GlobalFonts.registerFromPath(`${__dirname}/assets/fonts/Others/ChirpRegular.ttf`, "Chirp")
const { emitWarning } = process
process.emitWarning = (warning, ...args) => {
if (args[0] === 'ExperimentalWarning') return
if (args[0]?.type === 'ExperimentalWarning') return
emitWarning(warning, ...args)
}
export const Image = {
affect: (await import('./src/affect.js')).default,
batslap: (await import('./src/batslap.js')).default,
beautiful: (await import('./src/beautiful.js')).default,
darkness: (await import('./src/darkness.js')).default,
delete: (await import('./src/delete.js')).default,
gay: (await import('./src/gay.js')).default,
greyscale: (await import('./src/greyscale.js')).default,
invert: (await import('./src/invert.js')).default,
kiss: (await import('./src/kiss.js')).default
}
export const oldRank = (await import('./src/oldrank.js')).default
export const Rank = (await import('./src/rank.js')).default
export const oldSpotify = (await import('./src/oldspotify.js')).default
export const Spotify = (await import('./src/spotify.js')).default
export const Util = (await import('./plugins/Util.js')).default
export const WelcomeLeave = (await import('./src/welcome-leave.js')).default
export const Ship = (await import('./src/ship.js')).default
export const Top = (await import('./src/top.js')).default
export const LevelUp = (await import('./src/level-up.js')).default
export const Profile = (await import('./src/profile.js')).default
export const Security = (await import('./src/security.js')).default
export const Captcha = (await import('./src/captcha.js')).default
export const Tweet = (await import('./src/tweet.js')).default
export const Instagram = (await import('./src/instagram.js')).default
export const author = "Naruya-Izumi"
export const version = pkg.default.version