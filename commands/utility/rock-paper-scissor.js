const { SlashCommandBuilder, userMention } = require('discord.js');
const { scheduler } = require('node:timers/promises');

const { capitalize, getRandomEmoji } = require('../../utils');

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
	/**
     * @param {import('discord.js').Interaction} interaction
     */
	async execute(interaction) {
		await interaction.deferReply();
		await scheduler.wait(1000);

		const choices = ['pedra', 'papel', 'tesoura'];
		const botChoice = Math.floor((Math.random() * 100) % 3);

		await interaction.editReply({
			content: `${userMention(interaction.user.id)} tu escolheu ${capitalize(interaction.options.getString('input'))}, eu escolhi ${capitalize(choices[botChoice])}.`,
		});

		const choicesObj = {
			'papel': async (bot) => {
				if (bot === 'pedra') {
					await interaction.followUp('Tu ganhou! ' + '👹');
				}
				else if (bot === 'tesoura') {
					await interaction.followUp('Ganhei! ' + getRandomEmoji());
				}
				else {
					await interaction.followUp('Empate! ' + getRandomEmoji());
				}
			},
			'pedra': async (bot) => {
				if (bot === 'papel') {
					await interaction.followUp('Ganhei! ' + getRandomEmoji());
				}
				else if (bot === 'tesoura') {
					await interaction.followUp('Tu ganhou! ' + '👹');
				}
				else {
					await interaction.followUp('Empate! ' + getRandomEmoji());
				}
			},
			'tesoura': async (bot) => {
				if (bot === 'papel') {
					await interaction.followUp('Tu ganhou! ' + '👹');
				}
				else if (bot === 'pedra') {
					await interaction.followUp('Ganhei! ' + getRandomEmoji());
				}
				else {
					await interaction.followUp('Empate! ' + getRandomEmoji());
				}
			},
		};

		const result = choicesObj[interaction.options.getString('input')];
		result(choices[botChoice]);
	},
};