const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Entrega informações sobre o servidor.'),
	async execute(interaction) {
		await interaction.reply(
			`Esse servidor é o ${interaction.guild.name} e tem ${interaction.guild.memberCount} membros.`,
		);
	},
};
