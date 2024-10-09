const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('criar')
		.setDescription('comando para criar um personagem de RPG'),

	async execute(interaction) {
		interaction.reply('teste');
	},
};