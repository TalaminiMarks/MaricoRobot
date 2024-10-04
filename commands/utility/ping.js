const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replices with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong');
	},
};
