const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responde com Pong!'),
	/**
	* @param {import('discord.js').Interaction} interaction
	*/
	async execute(interaction) {
		await interaction.reply('Pong');
	},
};
