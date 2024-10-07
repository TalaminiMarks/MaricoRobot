const { SlashCommandBuilder } = require('discord.js');
const { scheduler } = require('node:timers/promises');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pedra-papel-tesoura')
		.setDescription('Joga Pedra Papel Tesoura com o bot')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('Sua escolha')
				.setRequired(true)
				.addChoices(
					{ name: 'Pedra', value: 'pedra' },
					{ name: 'Papel', value: 'papel' },
					{ name: 'Tesoura', value: 'tesoura' },
				),
		),
	async execute(interaction) {
		await interaction.deferReply();
		await scheduler.wait(1000);

		const choices = ['pedra', 'papel', 'tesoura'];
		const botChoice = Math.round((Math.random() * 100) % 2);

		await interaction.editReply({ content: `<@${interaction.user.id}> foi ${interaction.options.getString('input')} contra ${choices[botChoice]}` });

	},
};