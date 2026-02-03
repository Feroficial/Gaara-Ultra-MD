let handler = async (m, { conn }) => {
if (!(m.chat in global.db.data.chats)) return conn.reply(m.chat, '🔥 *¡Este chat no está registrado!*', m, fake)
let chat = global.db.data.chats[m.chat]
if (!chat.isBanned) return conn.reply(m.chat, '👑 *¡Goku-Black ɴᴏ ᴇsᴛᴀ ʙᴀɴᴇᴀᴅᴏ ᴇɴ ᴇsᴛᴇ ᴄʜᴀᴛ!*', m, fake)
chat.isBanned = false
await conn.reply(m.chat, '⚡ *¡Goku-Black ʏᴀ ғᴜᴇ ᴅᴇsʙᴀɴᴇᴀᴅᴏ ᴇɴ ᴇsᴛᴇ ᴄʜᴀᴛ!*', m, fake)
}
handler.help = ['unbanchat'];
handler.tags = ['group'];
handler.command = ['unbanchat']
handler.admin = true 
handler.botadmin = true
handler.group = true

export default handler