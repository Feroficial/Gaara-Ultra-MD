import fetch from 'node-fetch'

const API_KEY = 'AdonixKeyrku1g92356'

const SEARCH_URL = 'https://api-adonix.ultraplus.click/search/spotify'

const DOWNLOAD_URL = 'https://api-adonix.ultraplus.click/download/spotify'

async function downloadSpotify(url) {

  try {

    let res = await fetch(

      `${DOWNLOAD_URL}?apikey=${API_KEY}&url=${encodeURIComponent(url)}`

    )

    return await res.json()

  } catch {

    return null

  }

}

let handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text) {

    return m.reply(`❌ Escribe el nombre de una canción\n\nEjemplo:\n${usedPrefix}spotify nena maldicion`)

  }

  // 1️⃣ BUSCANDO

  await conn.reply(m.chat, '🔎 Buscando música en Spotify...', m)

  let res = await fetch(

    `${SEARCH_URL}?apikey=${API_KEY}&query=${encodeURIComponent(text)}`

  )

  let json = await res.json()

  if (!json?.status || !json?.result?.results?.length) {

    return m.reply('❌ No se encontraron resultados.')

  }

  // 2️⃣ TOMAMOS EL PRIMER RESULTADO

  let song = json.result.results[0]

  // 3️⃣ INFO

  await conn.sendMessage(m.chat, {

    image: { url: song.image },

    caption:

`🎧 *SPOTIFY*

🎵 *${song.title}*

👤 Artista: ${song.artist}

💿 Álbum: ${song.album}

⏱ Duración: ${song.duration}

⏳ Descargando automáticamente...`

  }, { quoted: m })

  // 4️⃣ DESCARGA AUTOMÁTICA

  let data = await downloadSpotify(song.link)

  if (!data || !data.status) {

    return m.reply('❌ Error al descargar la música.')

  }

  let r = data.result

  // 5️⃣ ENVÍO DEL MP3

  await conn.sendMessage(m.chat, {

    audio: { url: r.url },

    mimetype: 'audio/mpeg',

    fileName: `${r.title}.mp3`

  }, { quoted: m })

}

handler.command = ['spotify']

handler.tags = ['downloader']

handler.help = ['spotify']

handler.register = false

export default handler