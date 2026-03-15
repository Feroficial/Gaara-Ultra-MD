let handler = async (m, { conn, args }) => {
  try {
    // Validamos que haya un mensaje citado
    if (!m.quoted) return m.reply('❌ Responde al mensaje que quieres reenviar con el comando .reenvio')

    // Si se coloca un número o JID, se usa como destino
    let destino = m.chat
    if (args[0]) {
      // Acepta número simple o JID completo
      let id = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
      destino = args[0].includes('@') ? args[0] : id
    }

    // Obtenemos el mensaje completo original
    let mensaje = m.quoted.fakeObj ? m.quoted.fakeObj : m.quoted

    // Enviamos el mensaje tal cual al destino
    await conn.copyNForward(destino, mensaje, true)

    if (destino !== m.chat) m.reply(`✅ Mensaje reenviado a: ${destino}`)
  } catch (e) {
    console.error(e)
    m.reply('⚠️ Error al reenviar el mensaje.')
  }
}

handler.help = ['reenvio [jid|número]']
handler.tags = ['owner']
handler.command = ['reenvio','reenvío'
handler.rowner

export default handler