let { Presence } = require('@adiwajshing/baileys')
let util = require('util')
let fs = require('fs')
let { exec } = require('child_process')
let { green, blueBright, redBright } = require('chalk')
let moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = async (conn, m, _func, isGod, isOwner, isBlock, isAdmin, isBotAdmin) => {
	
	// console.log([ isOwner, isBlock, isAdmin, isBotAdmin ])
	// here you can make anything like auto download, auto response, etc.
	// and as an example I make the eval within switch case and if else condition
	if (typeof m.text == 'object') return
	let command, text
	let x = m.text.trim().split`\n`, y = ''
	command = x[0].split` `[0]
	y += x[0].split` `.slice`1`.join` `, y += x.slice`1`.join`\n`
	text = y.trim()
	// console.log([ command, text ])
	
	if (command == '>') {
		if (!isGod || !text) return
		await conn.updatePresence(m.chat, Presence.composing)
		try {
			evL = await eval(`(async () => { ${text} })()`)
			m.reply(util.format(evL))
		} catch (e) {
			m.reply(util.format(e))
		}
	} else if (command == '=>') {
		if (!isGod || !text) return
		await conn.updatePresence(m.chat, Presence.composing)
		try {
			evL = await eval(`(async () => { return ${text} })()`)
			m.reply(util.format(evL))
		} catch (e) {
			m.reply(util.format(e))
		}
	} else if (command == '$') {
		if (!isGod || !text) return
		await conn.updatePresence(m.chat, Presence.composing) 
		m.reply(`*executing . . .*`)
		exec(text, (err, stdout) => {	
			if (err) return m.reply(err.toString())
			if (stdout) return m.reply(stdout)
		})
	}
	// here your code . . . . :v
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(redBright.bold('[ UPDATE ]'), blueBright(moment(new Date() * 1).format('DD/MM/YY HH:mm:ss')), green.bold('~ customize.js'))
	delete require.cache[file]
	require(file)
})