const { SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
// const { scheduler } = require('node:timers/promises');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pedra-papel-tesoura')
		.setDescription('Joga Pedra Papel Tesoura com o bot'),
	async execute(interaction) {
		const component = 'teste';
	    const row = new ActionRowBuilder().addComponents(component);
		await interaction.reply({ components: [row] });
	},
};