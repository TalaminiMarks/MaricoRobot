const { SlashCommandBuilder } = require('discord.js');
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
	async execute(interaction) {
		await interaction.deferReply();
		await scheduler.wait(1000);

		const choices = ['pedra', 'papel', 'tesoura'];
		const botChoice = Math.round((Math.random() * 100) % 2);

		await interaction.editReply({
			content: `<@${interaction.user.id}> tu escolheu ${capitalize(interaction.options.getString('input'))}, eu escolhi ${capitalize(choices[botChoice])}.`,
		});

		if (interaction.options.getString('input') === 'pedra' && choices[botChoice] === 'papel') {
			await interaction.followUp('Ganhei! ' + getRandomEmoji());
		}
		else if (interaction.options.getString('input') === 'papel' && choices[botChoice] === 'pedra') {
			await interaction.followUp('Tu ganhou! ' + '👹');
		}
		else if (interaction.options.getString('input') === 'tesoura' && choices[botChoice] === 'papel') {
			await interaction.followUp('Tu ganhou! ' + '👹');
		}
		else if (interaction.options.getString('input') === 'papel' && choices[botChoice] === 'tesoura') {
			await interaction.followUp('Ganhei! ' + getRandomEmoji());
		}
		else if (interaction.options.getString('input') === 'pedra' && choices[botChoice] === 'tesoura') {
			await interaction.followUp('Tu ganhou! ' + '👹');
		}
		else if (interaction.options.getString('input') === 'tesoura' && choices[botChoice] === 'pedra') {
			await interaction.followUp('Ganhei! ' + getRandomEmoji());
		}
		else {
			await interaction.followUp('Empate! ' + getRandomEmoji());
		}


	},
};