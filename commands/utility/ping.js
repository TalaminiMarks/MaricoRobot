const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	// Defini o nome e a descrição do comando
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responde com Pong!'),
	// Responde ao comando com um "Pong"
	async execute(interaction) {
		await interaction.reply('Pong');
	},
};
