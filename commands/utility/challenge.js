const { SlashCommandBuilder } = require('discord.js');
// const { scheduler } = require('node:timers/promises');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pedra-papel-tesoura')
		.setDescription('Joga Pedra Papel Tesoura com o bot')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('test string option')
				.setRequired(true)
				.addChoices(
					{ name: 'Pedra', value: '1' },
				),
		),
	async execute(interaction) {
	    await interaction.reply('teste');
		console.log(interaction);
	},
};