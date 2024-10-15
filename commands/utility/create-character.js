// eslint-disable-next-line no-unused-vars
const { Interaction, SlashCommandBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js');
const { getRandomEmoji } = require('../../utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('criar-personagem')
		.setDescription('Comando para criar o personagem no canal especifico usando o "/criar"'),

	/**
     * @param {Interaction} interaction
     */
	async execute(interaction) {
		await interaction.deferReply();

		let validation = false;
		await interaction.guild.members.fetch(interaction.user.id)
			.then(member => {
				validation = member.roles.cache.some(role => role.name.toLowerCase() === interaction.channel.name);
			});

		if (!validation) {
			await interaction.editReply('Você precisa executar o comando /criar com o nome do personagem antes ' + getRandomEmoji());
		}
		else {
			await interaction.editReply('passow');
		}
	},
};