const { SlashCommandBuilder, userMention } = require('discord.js');
const { scheduler } = require('node:timers/promises');

const { capitalize, getRandomEmoji } = require('../../scripts/utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jokenpo')
		.setDescription('Challenge the bot for a rock paper scissor match')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('Your choice:')
				.setRequired(true)
				.addChoices(
					{ name: 'Rock', value: 'rock' },
					{ name: 'Paper', value: 'paper' },
					{ name: 'Scissor', value: 'scissor' },
				),
		),
	/**
     * @param {import('discord.js').Interaction} interaction
     */
	async execute(interaction) {
		await interaction.deferReply();
		await scheduler.wait(1000);

		const choices = ['rock', 'paper', 'scissor'];
		const botChoice = Math.floor(Math.random() * choices.length);
		const userChoice = interaction.options.getString('input');

		await interaction.editReply({
			content: `${userMention(interaction.user.id)} your choice was ${capitalize(userChoice)}, i chose ${capitalize(choices[botChoice])}.`,
		});

		const choicesObj = {
			'paper': async (bot) => {
				if (bot === 'rock') {
					await interaction.followUp('You won! ' + '👹');
				}
				else if (bot === 'scissor') {
					await interaction.followUp('You lost ' + getRandomEmoji());
				}
				else {
					await interaction.followUp('Tie! ' + getRandomEmoji());
				}
			},
			'rock': async (bot) => {
				if (bot === 'paper') {
					await interaction.followUp('You lost ' + getRandomEmoji());
				}
				else if (bot === 'scissor') {
					await interaction.followUp('You won! ' + '👹');
				}
				else {
					await interaction.followUp('Tie! ' + getRandomEmoji());
				}
			},
			'scissor': async (bot) => {
				if (bot === 'paper') {
					await interaction.followUp('You won! ' + '👹');
				}
				else if (bot === 'rock') {
					await interaction.followUp('You lost ' + getRandomEmoji());
				}
				else {
					await interaction.followUp('Tie! ' + getRandomEmoji());
				}
			},
		};

		const result = choicesObj[userChoice];
		result(choices[botChoice]);
	},
};