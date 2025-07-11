const chokidar = "chokidar".import()
const chalk = "chalk".import()
const path = "path".import()
const fs = "fs".import()
let { JadwalSholat } = await (fol[2] + 'jadwalsholat.js').r()
const conf = fol[3] + 'config.json'
const db = fol[5]
let config = JSON.parse(fs.readFileSync(conf))
let keys = Object.keys(config)
let onreload = false;
Data.notify = Data.notify || { every: 60, h: 0, first: !1 }
export default
async function detector({ Exp, store }) {
    const { func } = Exp
    const reloadData = async (files) => {
        try {
            for (const [key, filePath] of Object.entries(files)) {
                Data[key] = (await filePath.r()).default;
            }
            Data.initialize({ Exp, store })
            console.log(chalk.green(`Helpers reloaded successfully!`))
        } catch (error) {
            console.error(chalk.red('Error reloading helpers:', error))
        }
    }
    const setupWatcher = (path, delay, onChangeCallback, onUnlinkCallback) => {
        const watcher = chokidar.watch(path, { ignored: /(^|[\/\\])\../, persistent: true })
        watcher.on('change', async (filePath) => {
            if (onreload) return;
            onreload = true;
            console.log(chalk.yellow(`File changed: ${filePath}`))
            setTimeout(async () => {
                await onChangeCallback(filePath)
                onreload = false;
            }, delay)
        })
        if (onUnlinkCallback) {
            watcher.on('unlink', async (filePath) => {
                console.log(chalk.yellow(`File deleted: ${filePath}`))
                await onUnlinkCallback(filePath)
            })
        }
    };
    setupWatcher(fol[1] + '**/*.js', 1000, async (filePath) => {
        const files = {
            helper: `${fol[1]}client.js`,
            In: `${fol[1]}interactive.js`,
            utils: `${fol[1]}utils.js`,
            reaction: `${fol[1]}reaction.js`,
            EventEmitter: `${fol[1]}events.js`,
            stubTypeMsg: `${fol[1]}stubTypeMsg.js`,
            eventGame: `${fol[1]}eventGame.js`,
            initialize: `${fol[1]}initialize.js`,
        };
        await reloadData(files)
    })
    setupWatcher(fol[7], 2000, async () => {
        try {
            await Data?.ev?.reloadEventHandlers()
            console.log(chalk.green('Event handlers reloaded successfully!'))
        } catch (error) {
            console.error(chalk.red('Error reloading event handlers:', error))
        }
    }, async (filePath) => {
        const fileName = path.basename(filePath)
        const eventKeys = Object.keys(Data.events)
        for (const key of eventKeys) {
            const { eventFile } = Data.events[key];
            if (eventFile.includes(fileName)) {
                delete Data.events[key];
                console.log(chalk.red(`[ EVENT DELETED ] => ${key}`))
            }
        }
    })
    setupWatcher(fol[9] + locale + '/**/*.js', 500, async (filePath) => {
        await filePath.r()
        console.log(chalk.yellow(`Locale file reloaded: ${filePath}`))
    })
    setupWatcher(fol[0] + '**/*.js', 1000, async (filePath) => {
        try {
            Exp.func = new (await `${fol[0]}func.js`.r()).func({ Exp, store })
            console.log(chalk.green('Toolkit reloaded successfully!'))
        } catch (error) {
            console.error(chalk.red('Error reloading toolkit:', error))
        }
    })
    async function keyChecker(url,key){
      try {
        Data.notify.h++
        if(Data.notify.h == 1 && Exp.authState){
          let own = owner[0].split("@")[0]+from.sender
          let res = await fetch(`${api.xterm.url}/api/tools/key-checker?key=${api.xterm.key}`)
          let inf= '\n\n> _Jika ini dirasa mengganggu, anda bisa menonaktifkan dengan mengetik *.set keyChecker off*_'
          if(!res.ok) return Exp.sendMessage(own, { text: `*[❗Notice ]*\n\`SERVER API ERROR\`\n Response status: ${res.status}${inf}` })
          let { status, data, msg } = await res.json()
          if(!status) {
           await Exp.sendMessage(own, { text: `*[❗Notice ]*\n\`API KEY STATUS IS FALSE\`\n\n*Key*: ${api.xterm.key}\nMsg: ${msg}${inf}` })
          } else {
            let { limit, usage, totalHit, remaining, resetEvery, reset, expired, isExpired, features } = data
            let interval = resetEvery.hours > 0 ?  (String(new Date().getHours()) == String(Data.notify.reset)) : (String(new Date().getDate()) == String(Data.notify.reset))
            if(usage >= limit && (!Data.notify?.reset||interval)) {
              Data.notify.reset = resetEvery.hours > 0 ? reset.split(' ')[1]?.split(':')[0] : reset.split('/')[0] 
              await Exp.sendMessage(own, { text: `*[❗Notice ]*\n\`LIMIT GLOBAL HARIAN API KEY TELAH TERCAPAI\`\n\n*Today:* ${usage}\n*Total Hit*: ${totalHit}\n\n*Reset*: ${reset}${inf}` })
            } else if(isExpired){
              await Exp.sendMessage(own, { text: `*[❗Notice ]*\n\`API KEY EXPIRED\`\n\n*Key*: ${api.xterm.key}\n*Expired on*: ${expired}${inf}` }) 
            } else { 
              let kfeatures = Object.keys(features)
              for(let i of kfeatures){
                let { ms, max, use, hit, lastReset } = features[i]
                if(use >= max && (!Data.notify?.[i]||Date.now() >= Data.notify[i])){
                  Data.notify[i] = lastReset ? parseInt(lastReset) + parseInt(ms) : Date.now() + parseInt(ms)
                  let msg = i.includes('elevenlabs') ? '> _Fitur text2speech *.elevenlabs* tidak dapat digunakan sebelum limit di reset!_'
                    :i.includes('filters') ? '> _Fitur *.filters* seperti *.toanime* dan *.toreal* tidak dapat digunakan sebelum limit di reset!_'
                    :i.includes('luma') ? '> _Fitur *.i2v* atau *.img2video* tidak dapat digunakan sebelum limit di reset!_'
                    :i.includes('logic-bell') ? '_Auto ai chat tidak akan merespon/tidak dapat digunakan sebelum limit di reset!_'
                    :i.includes('enlarger') ? '_Fitur *.enlarger* tidak dapat digunakan sebelum limit di reset!_'
                    :''
                  await Exp.sendMessage(own, { text: `*[❗Notice ]*\n\`LIMIT FEATURE API KEY TELAH TERCAPAI\`\n\n*Feature*: \`${i.slice(1)}\`\n*Now*: ${use}\n*Max*: ${max}\n*Reset*: ${func.dateFormatter(Data.notify[i], 'Asia/Jakarta')}\n\n${msg}${inf}` })
                  await sleep(3000+Math.floor(Math.random() * 2000))
                }
              }
            }
            
          }
        } else
        if(Data.notify.h >= Data.notify.every){
          Data.notify.h = 0
        }
      } catch (e) { 
       console.error("Error in key checker", e)
     }
    }
    async function schedule(){
      try {
        let chatDb = Object.entries(Data.preferences).filter(([a,b]) => a.endsWith(from.group) && b.schedules?.length > 0)
        for(let [id,b] of chatDb){
          let d;
          let n = b.schedules.findIndex(a => {
            let { h, min, d:D } = func.formatDateTimeParts(new Date(), a.timeZone)
            d = D
            let [sh, sm] = a.time.split(':').map(Number)
            return sh == h && (parseInt(min)-sm) <= 10 && parseInt(min) >= sm && (!a.now || a.now !== d)
          })
          if(n >= 0){
            let s = b.schedules[n] 
            if(!s.now || s.now !== d){
              b.schedules[n].now = d
              await Exp.relayMessage(id, {
                viewOnceMessage: {
                  message: {
                    interactiveMessage: {
                      footer: {
                        text: s.msg
                      },
                      carouselMessage:{}
                    }
                  }
                }
              },{})
              await sleep(2000+Math.floor(Math.random() * 1000))
              s.action !== '-' && await Exp.groupSettingUpdate(id, s.action)
            }
          }
        }
      } catch(e) {
        console.error("Error in schedule", e)
      }
    }
    async function sholat(){
     try { 
      let chatDb = Object.entries(Data.preferences).filter(([a,b]) => a.endsWith(from.group) && b.jadwalsholat)
      for(let [id,b] of chatDb){
        if(!(id in jadwal.groups)) await jadwal.init(id, b.jadwalsholat.v)
        let { status, data, db } = await jadwal.now(id)
        
        let { ramadhan, tutup } = b.jadwalsholat
        
        let w = '5 menit'
          if(data.now && !data.hasNotice){
            let { participants, subject }  = await func.getGroupMetadata(id,Exp)
            let groupAdmins = func.getGroupAdmins(participants)
            let isBotAdmin = groupAdmins.includes(Exp.number)
            let emoji = ({
              imsak: "🌄",
              subuh: "🌅",
              dzuhur: "☀️",
              ashar: "⏳",
              maghrib: "🌇",
              isya: "🌙"
            })[data.now]||''
          let text = (data.now == 'magrib' && ramadhan)
            ? `*Hai seluruh umat Muslim yang berada di grup ${subject}!*\n\nSelamat berbuka puasa 🍽️! Semoga puasanya diterima oleh Allah SWT.\nWaktu sholat *${data.now}${emoji}* di daerah ${b.jadwalsholat.v} sudah masuk! Jangan lupa menunaikan shalat tepat waktu.\n\n*"Allahumma laka shumtu wa bika aamantu wa ‘ala rizq-ika aftartu, bi rahmatika ya arhamar rahimin."*  \n(Ya Allah, kepada-Mu aku berpuasa, kepada-Mu aku beriman, dan dengan rezeki-Mu aku berbuka. Dengan rahmat-Mu, wahai Tuhan yang Maha Pengasih).  \n\nSemoga Allah menerima ibadah kita semua. Aamiin.`
            : (data.now == 'isya' && ramadhan)
            ? `*Hai seluruh umat Muslim yang berada di grup ${subject}!*\n\nWaktu sholat *${data.now}${emoji}* di wilayah ${b.jadwalsholat.v} telah masuk. Mari kita laksanakan sholat fardhu tepat waktu.\n\nBagi yang memiliki kesempatan, jangan lupa menunaikan sholat sunnah Tarawih.\n\nSemoga Allah SWT menerima amal ibadah kita semua. Aamiin.`
            : data.now == 'imsak' 
            ? `*Hai seluruh umat Muslim yang berada di grup ${subject}!*\n\nWaktu *imsak* di daerah ${b.jadwalsholat.v} telah tiba!\nSilakan menyelesaikan santap sahurnya, dan bersiap untuk menunaikan ibadah puasa.`
            : `*Hai seluruh umat muslim yang berada di group ${subject}!*\n\nWaktu sholat *${data.now}${emoji}* di daerah ${b.jadwalsholat.v} sudah masuk!`
          await Exp.relayMessage(id, {
            viewOnceMessage: {
              message: {
                interactiveMessage: {
                  body: {
                    text
                  },
                  footer: {
                    text: data.now == 'imsak' ?
                    `*"Nawaitu shauma ghadin an adā’i fardhi syahri ramadhāna hadzihis sanati lillāhi ta‘ālā."*  
(Aku niat berpuasa esok hari untuk menunaikan kewajiban di bulan Ramadan tahun ini karena Allah Ta’ala).  

Semoga puasa kita diterima Allah dan diberikan kekuatan serta kelancaran sepanjang hari. Aamiin.`
                  : `Buat semua yang ada di daerah ${b.jadwalsholat.v}, yuk segera tunaikan sholat!${(isBotAdmin && tutup) ? `\n\n_Group akan ditutup selama ${w}_`: ''}`
                  },
                  ...(['magrib'].includes(data.now) ? { contextIntfo: { 
                    mentionedJid: participants
                  } } : {}),
                  carouselMessage:{}
                }
              }
            }
          },{})
          if(isBotAdmin && tutup && data.now !== 'imsak' ){
            await Exp.groupSettingUpdate(id, "announcement")
            setTimeout(()=> Exp.groupSettingUpdate(id, "not_announcement"), func.parseTimeString(w))
          }
          data.now !== 'imsak' && await Exp.sendMessage(id, { audio: { url: data.adzan }, mimetype: "audio/mpeg", ptt: true })
          Data.preferences[id].jadwalsholat = db
        }
        await sleep(2000+Math.floor(Math.random() * 1000))
      }
      for(let i of Object.keys(jadwal.groups)){
        if(!chatDb.map(a => a[0]).includes(i)) delete jadwal.groups[i]
      }
     } catch (e) { 
       console.error("Error in jadwal sholat", e)
     }
    }
    let jdwl = {}
    Object.entries(Data.preferences).filter(([a,b]) => a.endsWith(from.group) && b.jadwalsholat).forEach(([a,b])=> {
      jdwl[a] = b.jadwalsholat
    });
    global.jadwal = new JadwalSholat(jdwl)
    cfg.keyChecker ??= true
    keys["detector"] = setInterval(async () => {
      await sholat()
      await schedule()
      cfg.keyChecker && await keyChecker()
      for (let i of keys) {
        config[i] = global[i];
      }
     const files = [
        { path: conf, data: config },
        { path: fol[6] + 'users.json', data: Data.users },
        { path: db + 'preferences.json', data: Data.preferences },
        { path: db + 'badwords.json', data: Data.badwords },
        { path: db + 'links.json', data: Data.links },
        { path: db + 'audio.json', data: Data.audio },
        { path: db + 'fquoted.json', data: Data.fquoted },
        { path: db + 'setCmd.json', data: Data.setCmd },
        { path: db + 'response.json', data: Data.response }
      ];
      try {
        for(let i of keys){
          config[i] = global[i]
        }
        for (const file of files) {
          await fs.writeFileSync(file.path, JSON.stringify(file.data, null, 2))
          await sleep(300)
        }
      } catch (error) {
        console.error("Terjadi kesalahan dalam penulisan file atau keyChecker:", error.message);
      }
    }, 20000);

}