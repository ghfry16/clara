let infos = Data.infos.owner ??= {}; 
infos.succesSetLang = `Berhasil merubah bahasa default ke bahasa: *<lang>*`
infos.lockedPrem =  "Dapatkan akses premium untuk membuka fitur² terkunci"
infos.unBannedSuccess = `*Berhasil, user @<sender> telah dihapus di hapus dari banned`
infos.delBanned = `Anda telah dihapus dari daftar banned!\n_Sekarang anda telah diizinkan kembali mengunakan bot_!`
infos.bannedSuccess = `*Berhasil membanned user!*\n ▪︎ User:\n- @<sender>\n ▪︎ Waktu ditambahkan: \n- <days> hari <hours> jam <minutes> menit <seconds>detik <milliseconds>ms\n\n`
infos.addBanned = `Anda telah diblokir dari bot!\nWaktu: <days> hari <hours> jam <minutes> menit <seconds> detik <milliseconds> ms`
infos.successSetVoice = `Sukses ✅️\n\n- Voice: <voice>`
infos.successSetLogic = `Sukses mengubah logic ai chat ✅️\nNew Logic: <logic>`
infos.userNotfound = "Nomor salah atau user tidak terdaftar!"
infos.wrongFormat = "*Format salah, silahkan periksa kembali*"
infos.successDelBadword = `Berhasil menghapus <input> kedalam list badword!`
infos.successSetThumb = "Berhasil mengganti thumbnail menu!"
infos.successAddBadword = `Berhasil menambahkan <input> kedalam list badword!`
infos.isModeOn = `Maaf, <mode> sudah dalam mode on!`
infos.isModeOff = `Maaf, <mode> sudah dalam mode off!`
infos.isModeOnSuccess = `Sukses mengaktifkan <mode>`
infos.isModeOffSuccess = `Sukses menonaktifkan <mode>`
infos.badword = `Mau add, delete atau lihat list?\nContoh: <cmd> add|tobrut`
infos.badwordAddNotfound = `Action mungkin tidak ada dalam list!\n*List Action*: add, delete, list\n\nContoh: <cmd> add|tobrut`
infos.listSetmenu = `List type menu yang tersedia:\n\n- <list>`
infos.successSetMenu = `Berhasil mengganti menu ke <menu>`
infos.audiolist = `Sukses menambahkan audio ke dalam list <list> ✅️\n\nAudio: <url>\n> Untuk melihat list silahkan ketik *.getdata audio <list>*`
infos.menuLiveLocationInfo = "_Menu liveLocation tidak dapat terlihat di private chat. Harap pertimbangkan kembali untuk menggunakan menu ini_"
infos.checkJson = `Harap periksa kembali JSON Object anda!\n\nTypeError:\n<rm>\n> <e>`
infos.set = `
*⚙️ Pengaturan Bot*

- public <on/off>
- autotyping <on/off>
- autoreadsw <on/off>
- autoreadpc <on/off>
- autoreadgc <on/of>
- similarCmd <on/off>
- premium_mode <on/of>
- editmsg <on/off>
- fquoted <name> <object or quoted>
- welcome <type>
- logic <logic>
- lang <Country Code>
- voice <modelname>
- menu <type>
- call <off or action>
- autoreactsw <off or emojis>
- checkpoint <checkpoint_id>
- lora <lora_id>
- apikey <apikey>
- antitagowner <(on/off) or reply message>
- keyChecker <on/off>
`
infos.premium_add = `
*Panduan untuk menambahkan/mengurangi waktu premium (Hanya bisa digunakan oleh owner!)*

*Opsi terdiri dari:*
- addprem (menambahkan waktu)
- kurangprem (mengurangi waktu)
- delprem (menghapus premium user)

Bagaimana cara menggunakannya?
> Sertakan nomor/Reply/tag user target

Example: 
 - *#1* => Dengan reply pesan target
- .addprem 1d
- .kurangprem 1d
- .delprem

 - *#2* => Dengan tag target
- .kurangprem @tag|1d
- .addprem @tag|1d
- .delprem @tag|1d
 
 - *#2* => Dengan nomor target
- .addprem +628xxx|1d
- .kurangprem +628xxx|1d
- .delprem +628xxx|1d

*Unit Waktu yang Didukung:*
- s, second, seconds, detik
- m, minute, minutes, menit
- h, hour, hours, jam
- d, day, days, hari
- w, week, weeks, minggu

*Contoh lain terkait cara menggunakan dengan unit waktu yang berbeda:*
- .addprem @tag|30 detik 
    ➡️ Menambahkan 30 detik.
- .addprem @tag|1 menit 
    ➡️ Menambahkan 1 menit.
- .addprem @tag|1 jam 15 detik 
    ➡️ Menambahkan 1 jam 15 detik.
- .addprem @tag|2 hari 4 jam 
    ➡️ Menambahkan 2 hari 4 jam.
- .addprem @tag|1 minggu 
    ➡️ Menambahkan 1 minggu.
- .addprem @tag|1w 2d 3h 
    ➡️ Menambahkan 1 minggu 2 hari 3 jam.
- .addprem @tag|1d 2h 30m 15s 
    ➡️ Menambahkan 1 hari 2 jam 30 menit 15 detik.

*Semoga panduan ini dibaca dengan teiti agar tidak lagi menanyakan kepada admin terkait cara penggunaanya, terimakasih*
`
infos.setCall = `
*Cara Penggunaan:*
 ▪︎ .set call <off or action>
- Contoh: .set call reject

Anda juga bisa menambahkan action lain dengan cara memberi tanda *+*

Contoh: .set call reject+block

*List Action*
- reject (menolak panggilan)
- block (memblokir pemanggil)
`
infos.successSetCall = "Berhasil mengatur anti call!\nAction: <action>"
infos.successOffCall = "Berhasil menonaktifkan anti call!"
infos.setAutoreactSw = `
*Cara Penggunaan:*
 ▪︎ .set autoreactsw <off or emojis>
- Contoh: .set autoreactsw 😀😂🤣😭😘🥰😍🤩🥳🤢🤮

Anda bisa menambahkan emoji sebanyak-banyaknya
`
infos.successSetAutoreactSw = "Berhasil mengatur autoreactsw dengan emoji: <action>"
infos.successOffAutoreactSw = "Berhasil menonaktifkan autoreactsw!"
infos.setHadiah = `
*Cara Penggunaan:*
 ▪︎ .set hadiah <Game> <Energy>
- Contoh: .set hadiah tebakgambar 60

*List Game:*
<game>
`
infos.setFquoted = `
*Contoh penggunaan:*

- *Cara 1*
   ~ Reply pesan dengan mengirimkan perintah *.set fquoted <name>*
     *Contoh*:
     - .set fquoted welcome

- *Cara 2*
   ~ Kirimkan pesan dengan perintah *.set fquoted <name> <objek quoted>*
     *Contoh:*
     - .set fquoted welcome {
    "key": {
      "fromMe": false,
      "participant": "0@whatsapp.net"
    },
    "message": {
      "conversation": "Termai"
    }
  }
`
infos.setAudio = `
*Contoh penggunaan:*

- *Cara 1*
   ~ Reply pesan dengan mengirimkan perintah *.set audio <name>*
     *Contoh:*
     - .setdata audio welcome

- *Cara 2*
   ~ Kirimkan pesan dengan perintah *.set audio <name> <url>*
     *Contoh*:
     - .setdata audio welcome <Url Audio>
`
infos.delAudio = `
  ~ Kirimkan pesan dengan perintah *.deldata audio <name> <url>*
   Contoh:
   - .deldata audio welcome <Url Audio>
`
infos.setLogic = `*Untuk mengubah logic:*

Kirimkan perintah *<cmd> logic* dengan format seperti berikut:

<cmd> logic 
Nickainame: <your ai name>
Fullainame: <your nick ai name>
Profile: <Your Logic Here>

*Logic saat ini:*
Fullainame: <botfullname>
Nickainame: <botnickname>
Profile: <logic>`
infos.banned = `*Panduan untuk melakukan banned user dengan jangka waktu tertentu (Hanya bisa digunakan oleh owner!)*

*Opsi:*
- banned (untuk banned user dengan durasi tertentu)
- unbanned (untuk menghapus banned user, tidak memerlukan durasi)

Bagaimana cara menggunakannya?
> Sertakan nomor/Reply/tag user target

Contoh:
 - *#1* => Dengan reply pesan target
- .banned 1d
- .unbanned

 - *#2* => Dengan tag target
- .banned @tag|1d
- .unbanned @tag

 - *#3* => Dengan nomor target
- .banned +628xxx|1d
- .unbanned +628xxx

*Unit Waktu yang Didukung:*
- s, second, seconds, detik
- m, minute, minutes, menit
- h, hour, hours, jam
- d, day, days, hari
- w, week, weeks, minggu

*Contoh lain terkait cara menggunakan dengan unit waktu yang berbeda:*
- .banned @tag|30 detik 
    ➡️ Melakukan banned selama 30 detik.
- .banned @tag|1 menit 
    ➡️ Melakukan banned selama 1 menit.
- .banned @tag|1 jam 15 detik 
    ➡️ Melakukan banned selama 1 jam 15 detik.
- .banned @tag|2 hari 4 jam 
    ➡️ Melakukan banned selama 2 hari 4 jam.
- .banned @tag|1 minggu 
    ➡️ Melakukan banned selama 1 minggu.
- .banned @tag|1w 2d 3h 
    ➡️ Melakukan banned selama 1 minggu 2 hari 3 jam.
- .banned @tag|1d 2h 30m 15s 
    ➡️ Melakukan banned selama 1 hari 2 jam 30 menit 15 detik.

*Pastikan membaca panduan ini dengan teliti agar tidak perlu bertanya lebih lanjut kepada admin terkait cara penggunaannya. Terima kasih.*`
infos.setRole = `*Panduan untuk mengubah role user (Hanya bisa digunakan oleh owner!)*

Bagaimana cara menggunakannya?
> Sertakan nomor/Reply/tag user target

Contoh:
 - *#1* => Dengan reply pesan target
- .setrole <Role>

 - *#2* => Dengan tag target
- .setrole @tag|<Role>

 - *#3* => Dengan nomor target
- .setrole +628xxx|<Role>

*List Role:*
<role>

*Pastikan membaca panduan ini dengan teliti agar tidak perlu bertanya lebih lanjut kepada admin terkait cara penggunaannya. Terima kasih.*`
infos.setAntiTagOwner = `*📌 Panduan Antitag Owner!*

• *Aktifkan fitur:*
Ketik .set antitagowner on

• *Nonaktifkan fitur:* 
Ketik .set antitagowner off

• *Atur respon saat owner di-tag:*
Balas pesan yang ingin dijadikan respon, lalu ketik:  
.set antitagowner
`