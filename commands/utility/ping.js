const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.name('ping')
		.setDescription('Replices with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong');
	},
};
