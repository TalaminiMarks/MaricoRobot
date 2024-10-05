const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('usuario')
		.setDescription('Entrega informações sobre o usuário'),
	async execute(interaction) {
		await interaction.reply(
			`Esse comando foi executado por ${interaction.user.username}, que entrou em ${interaction.member.joinedAt} no servidor.`,
		);
	},
};
