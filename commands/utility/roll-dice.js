const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rolar-dado')
		.setDescription('Seleciona um dado para ser rolado')
		.addStringOption(option =>
			option
				.setName('input')
				.setDescription('tipo dos dados')
				.setRequired(true)
				.addChoices(
					{ name: 'D4', value: 'd4' },
					{ name: 'D6', value: 'd6' },
					{ name: 'D8', value: 'd8' },
					{ name: 'D12', value: 'd12' },
					{ name: 'D20', value: 'd20' },
					{ name: 'D100', value: 'd100' },
					{ name: 'tem dado em casa?', value: 'casa' },
				),
		),
	/**
     * @param {import('discord.js').Interaction} interaction
     */
	async execute(interaction) {
		interaction.reply('alo');
	},
};