import { GlobalFonts } from '@napi-rs/canvas'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

const pkg = JSON.parse(await fs.readFile(new URL('./package.json', import.meta.url)))
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

GlobalFonts.registerFromPath(`${__dirname}/assets/fonts/Poppins/Poppins-Regular.ttf`, "Poppins")
GlobalFonts.registerFromPath(`${__dirname}/assets/fonts/Poppins/Poppins-Bold.ttf`, "Poppins Bold")
GlobalFonts.registerFromPath(`${__dirname}/assets/fonts/Manrope/Manrope-Regular.ttf`, "Manrope")
GlobalFonts.registerFromPath(`${__dirname}/assets/fonts/Manrope/Manrope-Bold.ttf`, "Manrope Bold")
GlobalFonts.registerFromPath(`${__dirname}/assets/fonts/Others/AbyssinicaSIL-Regular.ttf`, "Abyss")
GlobalFonts.registerFromPath(`${__dirname}/assets/fonts/Others/ChirpRegular.ttf`, "Chirp")

import Affect from './src/affect.js'
import Batslap from './src/batslap.js'
import Beautiful from './src/beautiful.js'
import Darkness from './src/darkness.js'
import Delete from './src/delete.js'
import Gay from './src/gay.js'
import Greyscale from './src/greyscale.js'
import Invert from './src/invert.js'
import Kiss from './src/kiss.js'
import OldRank from './src/oldrank.js'
import Rank from './src/rank.js'
import OldSpotify from './src/oldspotify.js'
import Spotify from './src/spotify.js'
import WelcomeLeave from './src/welcome-leave.js'
import Ship from './src/ship.js'
import Top from './src/top.js'
import LevelUp from './src/level-up.js'
import Profile from './src/profile.js'
import Security from './src/security.js'
import Captcha from './src/captcha.js'
import Tweet from './src/tweet.js'
import Instagram from './src/instagram.js'
import Util from './plugins/Util.js'

const { emitWarning } = process
process.emitWarning = (warning, ...args) => {
if (args[0] === 'ExperimentalWarning') return
if (args[0]?.type === 'ExperimentalWarning') return
emitWarning(warning, ...args)
}

export const Image = {
affect: Affect,
batslap: Batslap,
beautiful: Beautiful,
darkness: Darkness,
delete: Delete,
gay: Gay,
greyscale: Greyscale,
invert: Invert,
kiss: Kiss
}

export {
OldRank,
Rank,
OldSpotify,
Spotify,
Util,
WelcomeLeave,
Ship,
Top,
LevelUp,
Profile,
Security,
Captcha,
Tweet,
Instagram
}

export const author = "Naruya-Izumi"
export const version = pkg.version