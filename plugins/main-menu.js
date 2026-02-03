import { xpRange } from '../lib/levelling.js'

import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'

import fetch from 'node-fetch'

const botname = global.botname || '🍫 Goku-Black 🍫'

const creador = '🍫 Fer 🍫'

const versionBot = '1.0.0'

// TODOS LOS TAGS

const tags = {

  serbot: '🤖 SUB-BOTS',

  info: '🌀 INFORMACIÓN',

  main: '📜 MENÚ',

  nable: '⚡ MODO AVANZADO',

  cmd: '📝 COMANDOS',

  advanced: '🌟 AVANZADO',

  game: '🎮 JUEGOS',

  rpg: '⚔️ RPG',

  group: '📚 GRUPOS',

  downloader: '📥 DESCARGAS',

  sticker: '🖼️ STICKERS',

  audio: '🔊 AUDIO',

  buscadores: '🔎 BUSCADORES',

  tools: '🧰 HERRAMIENTAS',

  fun: '🎉 DIVERSIÓN',

  gacha: '🧧 ANIME',

  nsfw: '🔞 NSFW',

  premium: '💎 PREMIUM',

  owner: '👑 OWNER',

  economy: '💰 ECONOMÍA',

  finance: '🏦 FINANZAS',

  education: '📘 EDUCACIÓN',

  health: '❤️ SALUD',

  entertainment: '📲 ENTRETENIMIENTO',

  sports: '⚽ DEPORTES',

  travel: '✈️ VIAJES',

  food: '🍔 COMIDA',

  shopping: '🛍️ COMPRAS',

  productivity: '📌 PRODUCTIVIDAD',

  social: '📸 REDES SOCIALES',

  security: '🔐 SEGURIDAD',

  custom: '⚙️ PERSONALIZADO'

}

let handler = async (m, { conn, usedPrefix: _p }) => {

  try {

    let userId = m.mentionedJid?.[0] || m.sender

    let user = global.db.data.users[userId] || { exp: 0, level: 1, premium: false }

    let { level } = user

    if (!global.db.data.users) global.db.data.users = {}

    let totalUsers = Object.values(global.db.data.users).filter(u => u.exp > 0).length

    let totalPremium = Object.values(global.db.data.users).filter(u => u.premium).length

    let { min, xp, max } = xpRange(level, global.multiplier || 1)

    // Plugins activos

    let help = Object.values(global.plugins || {})

      .filter(plugin => !plugin.disabled)

      .map(plugin => ({

        help: Array.isArray(plugin.help) ? plugin.help : (plugin.help ? [plugin.help] : []),

        tags: Array.isArray(plugin.tags) ? plugin.tags : (plugin.tags ? [plugin.tags] : []),

        limit: plugin.limit,

        premium: plugin.premium,

      }))

    let saludo = getSaludo()

    let uptime = clockString(process.uptime() * 1000)

    let modo = global.opts?.self ? "Ⓟⓥ Privado" : "Ⓟ Público"

    // Cabecera del menú

    let menuText = `

╭━━━〔 ⚡️ *Goku-Black-MENU* ⚡️ 〕━━━⬣

┃ ❒ *Nombre*: *${botname}*

┃ ❒ *Creador*: *${creador}*

┃ ❒ *Estado*: *${modo}*

┃ ❒ *Uptime*: *${uptime}*

┃ ❒ *Usuarios*: *${totalUsers}*

┃ ❒ *Premium*: *${totalPremium}*

┃ ❒ *Versión*: *${versionBot}*

╰━━━━━━━━━━━━━━━━━━━━━━⬣

`.trim()

    // Construcción de categorías y comandos

    for (const tag in tags) {

      const comandos = help.filter(menu => menu.tags.includes(tag))

      if (comandos.length === 0) continue

      menuText += `\n╭━━━〔 ${tags[tag]} 〕━━━⬣\n`

      for (const menu of comandos) {

        for (const cmd of menu.help) {

          let icon = ''

          if (menu.limit) icon += ' 🟡'

          if (menu.premium) icon += ' 🔒'

          menuText += `┃ ➟ ${_p}${cmd}${icon}\n`

        }

      }

      menuText += `╰━━━━━━━━━━━━━━━━━━━━━━⬣\n`

    }

    menuText += `\n> 👑 Powered by Fer 🥷🏽`

    await m.react('⚡️')

    await m.react('✅')

    const vidBuffer = await (await fetch('https://files.catbox.moe/83udnd.mp4')).buffer()

    const media = await prepareWAMessageMedia(

      { video: vidBuffer, gifPlayback: true },

      { upload: conn.waUploadToServer }

    )

    const msg = generateWAMessageFromContent(m.chat, {

      viewOnceMessage: {

        message: {

          videoMessage: {

            ...media.videoMessage,

            gifPlayback: true,

            caption: menuText,

            contextInfo: {

              isForwarded: true,

              forwardedNewsletterMessageInfo: {

                newsletterJid: '120363417252896376@newsletter',

                newsletterName: '𝗨𝗽𝗱𝗮𝘁𝗲 𝗚𝗼𝗸𝘂-𝗕𝗹𝗮𝗰𝗸 👑⚡',

                serverMessageId: 100

              }

            }

          }

        }

      }

    }, { userJid: m.sender, quoted: m })

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  } catch (e) {

    await conn.reply(m.chat, `✖️ Error al mostrar el menú.\n\n${e}`, m)

    console.error(e)

  }

}

handler.help = ['menu']

handler.tags = ['main']

handler.command = ['menu']

handler.register = true

export default handler

// ─── Funciones auxiliares ───

function clockString(ms) {

  let h = Math.floor(ms / 3600000)

  let m = Math.floor(ms / 60000) % 60

  let s = Math.floor(ms / 1000) % 60

  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')

}

function getSaludo() {

  const options = { timeZone: "America/Marigot", hour: "numeric", minute: "numeric", hour12: false }

  const date = new Date()

  const hora = date.toLocaleString("es-DO", options).split(':')[0] | 0

  let saludo = "🌙 Buenas noches"

  if (hora >= 5 && hora < 12) saludo = "🌅 Buenos días"

  else if (hora >= 12 && hora < 18) saludo = "☀️ Buenas tardes"

  return `${saludo} | 🕒 ${date.toLocaleTimeString("es-DO", { timeZone: "America/Marigot" })}`

}