const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	// Dados do comando com as suas opções de dados
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
	// Função pra executar no comando
	async execute(interaction) {
		// Função pra gerar um número aleatorio com base no valor do dado
		function roll(n) {
			return Math.floor(Math.random() * n) + 1;
		}
		// Retorna pro usuario da interação o número que foi gerado
		const output = roll(interaction.options.getInteger('input'));
		await interaction.reply(String(output));
	},
};