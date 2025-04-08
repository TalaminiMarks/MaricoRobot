const { Events } = require('discord.js');

// Evento quando o cliente está 'ready'
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! logged in as ${client.user.tag}`);
	},
};