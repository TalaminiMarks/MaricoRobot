const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rolar-dado')
		.setDescription('Seleciona um dado para ser rolado')
		.addIntegerOption(option =>
			option
				.setName('input')
				.setDescription('tipo dos dados')
				.setRequired(true)
				.addChoices(
					{ name: 'D4', value: 4 },
					{ name: 'D6', value: 6 },
					{ name: 'D8', value: 8 },
					{ name: 'D12', value: 12 },
					{ name: 'D20', value: 20 },
					{ name: 'D100', value: 100 },
				),
		),
	/**
     * @param {import('discord.js').Interaction} interaction
     */
	async execute(interaction) {
		function roll(n) {
			return Math.floor(Math.random() * n) + 1;
		}
		const output = roll(interaction.options.getInteger('input'));
		await interaction.reply(String(output));
	},
};