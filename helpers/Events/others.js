const fs = "fs".import()
const { downloadContentFromMessage } = "baileys".import()
export default async function on({ cht, Exp, store, ev, is }) {
    const { id } = cht
    const { func } = Exp
    let infos = Data.infos
    ev.on({ 
        cmd: ['menu'],
        listmenu: ['menu'],
        tag: 'other' 
    }, async () => {
        let hit = func.getTotalCmd()
        let topcmd =  func.topCmd(2)
        let totalCmd = Object.keys(Data.events).length
        let head = `*Hallo kak👋🏻* `+ cht.pushName + `
        
╔┈┈「 *Info Bot* 」
╎❏ Nama Bot: Clara - MD
╎❏ Total User: 584
╎❏ Platform: Linux
╎❏ Baileys: Multi Device
╎❏ Prefix: [ . ]
╚┈┈┈┈┈┈┈┈┈❖
${Data.infos.others.readMore}\n\n`
        let text = head + func.menuFormatter(Data.events, { ...cfg.menu, ...cht })
        let menu = {}
        if(cfg?.menu_type == "text"){
          menu.text = text
          await Exp.sendMessage(id, menu, { quoted: cht })
        } else if(cfg?.menu_type == "image" ){
          menu.image = fs.readFileSync(fol[3] + "bell.jpg")
          menu.caption = text
          await Exp.sendMessage(id, menu, { quoted: cht })
        } else if(cfg?.menu_type == "liveLocation"){
           await Exp.relayMessage(cht.id, {
	         liveLocationMessage: {
	            degreesLatitude: -76.01801,
	            degreesLongitude: 22.662851,
	            caption: text,
                contextInfo: { participant: cht.sender, quotedMessage: cht.message }
	         }
	       }, {})
        } else if(cfg?.menu_type == "order"){
          await Exp.relayMessage(cht.id, {
           "orderMessage": {
             "orderId": "530240676665078",
             "status": "INQUIRY",
             "surface": "CATALOG",
             "ItemCount": 0,
             "message": text,
             "sellerJid": "6281374955605@s.whatsapp.net",
             "token": "AR6oiV5cQjZsGfjvfDwl0DXfnAE+OPRkWAQtFDaB9wxPlQ==",
             "thumbnail": (await fs.readFileSync(fol[3] + "bell.jpg")).toString("base64"),
           }
         },{})
        } else {
          menu = {
            text,
            contextInfo: { 
                externalAdReply: {
                    title: "Clara - MD",
                    body: "",
                    thumbnail: fs.readFileSync(fol[3] + "bell.jpg"),
                    sourceUrl: "",
                    mediaUrl: `http://ẉa.me/6283110928302/${Math.floor(Math.random() * 100000000000000000)}`,
                    renderLargerThumbnail: true,
                    mediaType: "IMAGE",
                    sourceType: "ad",
                    sourceId: "1",
                    sourceUrl: "https://vynzzhost.cloud"
                },
                forwardingScore: 0,
                isForwarded: false,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363301254798220@newsletter",
                    newslettedName: "Termai",
                    serverMessageId: 152
                }
            }
          }
          await Exp.sendMessage(id, menu, { quoted: cht })
        }
        Data.audio?.menu?.length > 0 && Exp.sendMessage(cht.id, { audio: { url: Data.audio.menu.getRandom() }, mimetype: "audio/mpeg" }, { quoted: cht })
    })
    ev.on({ 
        cmd: ['reaction','menureaction','reactionmenu'],
        listmenu: ['reactionmenu'],
        tag: 'other' 
    }, () => {
        cht.reply(infos.reaction.menu)
    })
    ev.on({ 
        cmd: ['rvo','getviewonce'],
        listmenu: ['getviewonce'],
        tag: 'baileys',
        premium: true,
        isAdmin: true,
        isMention: true,
        energy: 25
    }, async() => {
      try {
        let isV1 = ["image","audio","video","viewOnce"].includes(cht.quoted.type)
        let ab = isV1
          ? [
          {
            message: cht.quoted, 
            key: {
              remoteJid: cht.id,
              fromMe: cht.quoted.sender == cht.id,
              id: cht.quoted.stanzaId,
              participant: cht.quoted.sender
            } 
          }
        ]
        : store.messages[id].array.filter(a => a.key.participant.includes(cht.mention[0]) && (a.message?.viewOnceMessageV2 || a.message?.viewOnceMessageV2Extension))
        if(ab.length == 0) return cht.reply(infos.others.noDetectViewOnce)
        for(let aa of ab){
            let thay = {
                msg: aa.message.viewOnceMessageV2?.message?.imageMessage || aa.message.viewOnceMessageV2?.message?.videoMessage || aa.message.viewOnceMessageV2Extension?.message?.audioMessage,
                type: isV1 ? cht.quoted.type : aa.message.viewOnceMessageV2?.message?.imageMessage ? "image" : aa.message.viewOnceMessageV2?.message?.videoMessage ? "video" : "audio"
            }
            let buffer;
            if(isV1){
              buffer = await cht.quoted.download()
            } else {
              let stream = await downloadContentFromMessage(thay.msg,thay.type)
                buffer = Buffer.from([])
              for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
              }
            }
            let mssg = {}
            if(cht.quoted.text) mssg.caption = cht.quoted.text || undefined 
            thay.type == "audio" && (mssg.ptt = true)
            await Exp.sendMessage(id, {  [thay.type]: buffer, ...mssg }, { quoted:aa })
        }
      } catch (e) { 
        console.error(e)
        cht.reply(infos.others.noDetectViewOnce)
      }
    })
    ev.on({ 
        cmd: ['d','del','delete'],
        listmenu: ['delete'],
        tag: 'other',
        isQuoted: true
    }, async() => {
      try {
        if(cht.quoted.sender !== Exp.number && !is.groupAdmins && !is.owner) return cht.reply(infos.messages.isAdmin)
        if(!is.groupAdmins && !is.owner){
          let qsender = (await store.loadMessage(cht.id,cht.quoted.stanzaId))?.message?.extendedTextMessage?.contextInfo.quotedMessage?.sender
          if(qsender && qsender !== cht.sender) return cht.reply(`*Anda tidak diizinkan menghapus pesan itu!*
*Sebab:*
${infos.others.readMore}
- Quoted pesan tersebut bukan berasal dari anda
- Anda bukan owner atau admin untuk mendapatkan izin khusus`)
        }
           cht.quoted.delete()
        } catch {
           cht.reply(infos.messages.failed)
        }
    })
    ev.on({ 
        cmd: ['statistic','stats'],
        listmenu: ['stats'],
        tag: 'other'
    }, async() => {
    const { cpuUsage, memoryUsage, processStats } = await func.getSystemStats()
    const runtimeText = processStats.runtime;
    const txt = cpuUsage.map(cpu => 
        `💻 *CPU ${cpu.cpu + 1}*\n` 
      + `   Model: ${cpu.model}\n`
      + `   Usage: ${cpu.usage}\n`
    ).join('\n')
        + `🧠 *Memory Usage*\n` 
        + `   Total: ${memoryUsage.totalMemory}\n` 
        + `   Free: ${memoryUsage.freeMemory}\n` 
        + `   Used: ${memoryUsage.usedMemory}\n` 
        + `📊 *Process Memory Usage*\n` 
        + `   RSS: ${processStats.memoryUsage.rss}\n` 
        + `   Heap Total: ${processStats.memoryUsage.heapTotal}\n` 
        + `   Heap Used: ${processStats.memoryUsage.heapUsed}\n` 
        + `   External: ${processStats.memoryUsage.external}\n` 
        + `🚀 *Speed*: ${processStats.speed}\n` 
        + `🕒 *Runtime*\n` 
        + `   ${runtimeText.days}d ${runtimeText.hours}h ${runtimeText.minutes}m ${runtimeText.seconds}s ${runtimeText.milliseconds}ms\n` 
        + `🔧 *Process Info*\n` 
        + `   PID: ${processStats.pid}\n` 
        + `   Title: ${processStats.title}\n` 
        + `   Exec Path: ${processStats.execPath}`;
        return cht.reply(txt)
    })
    ev.on({
    cmd: ['ping'],
    listmenu: ['ping'],
    tag: 'other'
    }, async() => {
    const { cpuUsage, memoryUsage, processStats } = await func.getSystemStats()
    const txt = `*⚡ Kecepatan Respon:* ${processStats.speed}`
    return cht.reply(txt)
    })
    ev.on({
    cmd: ['owner'],
    listmenu: ['owner'],
    tags: 'other'
    }, async() => {
    const ktl = `Ingin berteman, atau bertanya tanya ke Owner? bisa kok😁\nini nomor Owner bot nya kak\n+6281575074898`
    return cht.reply(ktl)
    })
}