// créditos by xzzys26 Para Gaara-Ultra-MD 

async function handler(m, { conn, usedPrefix }) {
  try {
    await m.react('👨🏻‍💻')

    const imageUrl = 'https://i.postimg.cc/sgmrRHY6/1000102278.jpg'

    let messageText = `
🤖 *Goku-Black*
👤 *Creador:* Fer
📱 *Número:* +50432788805
🌐 *Dashboard:* https://dash.deluxehost.cl
💻 *GitHub:* https://github.com/Feroficial
`

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: messageText,
      footer: '*⚡ Servicios Privado Con Alta Calidad*',
      buttons: [
        {
          buttonId: `${usedPrefix}code`,
          buttonText: { displayText: "🤖 𝗖𝗼𝗱𝗲" },
          type: 1,
        },
        {
          buttonId: `${usedPrefix}menu`,
          buttonText: { displayText: "📜 𝗠𝗲𝗻𝘂" },
          type: 1,
        },
      ],
      headerType: 4
    }, { quoted: m })

  } catch (error) {
    console.error('Error:', error)
    await conn.sendMessage(m.chat, { 
      text: '🤖 *Goku-Black*\n👤 *Creador:* Fer\n📱 *Número:* +50432788804\n🌐 *Dashboard:* https://dash.deluxehost.cl\n💻 *GitHub:* https://github.com/Feroficial\n\n*⚡ Servicios Privado Con Alta Calidad*'
    }, { quoted: m })
  }
}

handler.help = ['creador']
handler.tags = ['info']
handler.command = ['owner', 'creator', 'creador', 'dueño']

export default handler