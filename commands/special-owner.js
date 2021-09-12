let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['owner'],
	async : async (m, { conn }) => {
		await conn.updatePresence(m.chat, Presence.composing)
		conn.sendContact(m.chat, global.setting.owner[0], conn.getName(global.setting.owner[0] + '@s.whatsapp.net', true), m)
	},
	error: false
}