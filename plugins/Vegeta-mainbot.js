//código creado x Fer 👑 
//no quiten créditos 
let handler = async (m, { conn, command }) => {
    // Lista de owners 
    const OWNERS = ['50432788804', '50432788804'];

   
    const senderNumber = m.sender.replace(/[^0-9]/g, '');

  
    if (!OWNERS.includes(senderNumber)) {
        return conn.sendMessage(m.chat, { text: '❌ Solo el owner puede usar este comando.' });
    }

    if (!global.mainBot) global.mainBot = null;
    if (!global.officialBots) global.officialBots = new Map();

    const isBotActive = (botConn) => botConn?.ws?.socket?.readyState === 1;

 
    const registerBot = (botConn, isMain = false) => {
        global.officialBots.set(botConn.user?.jid, { conn: botConn, active: true });
        if (isMain) global.mainBot = botConn;
    };

  
    const cleanupBots = () => {
        for (let [jid, bot] of global.officialBots) {
            if (!isBotActive(bot.conn)) {
                bot.active = false;
            }
        }
    };

    cleanupBots(); 

    if (command === 'promotebot') {
        if (!global.mainBot || !isBotActive(global.mainBot)) {
            registerBot(conn, true);
            await conn.sendMessage(m.chat, { text: '✅ Este sub-bot ahora es el BOT principal *𝙂𝙊𝙆𝙐-𝘽𝙇𝘼𝘾𝙆*.' });
        } else if (global.mainBot === conn) {
            await conn.sendMessage(m.chat, { text: '⚠️ Este bot ya es el principal.' });
        } else {
            registerBot(conn, false);
            await conn.sendMessage(m.chat, { text: '🤖 Este bot ha sido registrado como oficial pero no es el principal.' });
        }
    }

    if (command === 'mainbot') {
        
        if (global.mainBot && isBotActive(global.mainBot)) {
            await conn.sendMessage(m.chat, { text: '🤖 Bot principal activo y conectado.' });
        } else {
            
            let reassigned = false;
            for (let [jid, bot] of global.officialBots) {
                if (isBotActive(bot.conn)) {
                    global.mainBot = bot.conn;
                    reassigned = true;
                    await bot.conn.sendMessage(m.chat, { text: '⚠️ El bot principal anterior no estaba activo. Este bot ahora es el principal ⚡️.' });
                    break;
                }
            }

        
            if (!reassigned) {
                registerBot(conn, true);
                await conn.sendMessage(m.chat, { text: '⚠️ No había bot principal activo. Este bot ahora es el principal ✅️.' });
            }
        }
    }
};

handler.command = ['promotebot', 'mainbot'];
handler.tags = ['owner'];
handler.help = ['promotebot', 'mainbot'];
handler.estrellas = 9;

export default handler;