let infos = Data.infos.group ??= {};
infos.settings = `Opsi yang tersedia:\n\n- <options>`
infos.kick_add = `*Sertakan nomor/Reply/tag target yang akan <cmd> dari group!*\n\nExample: \n\n*Cara #1* => Dengan reply pesan target\n - <prefix><cmd>\n\n*Cara #2* => Dengan tag target\n - <prefix><cmd> @ayaka \n\n*Cara #2* => Dengan nomor target\n - <prefix><cmd> +628xxx`
infos.on = (cmd, input) => `Berhasil ${cmd == "on" ? "mengaktifkan":"menonaktifkan"} *${input}* di group ini!`
infos.nallowPlayGame = "Bermain game tidak diizinkan disini!\nUntuk mengizinkan bisa dengan mengetik *.on playgame* (hanya boleh dilakukan oleh admin/owner)"