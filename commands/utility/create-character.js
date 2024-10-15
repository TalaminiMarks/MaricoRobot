// eslint-disable-next-line no-unused-vars
const { Interaction, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('criar-personagem')
		.setDescription('Comando para criar o personagem no canal especifico usando o "/criar"'),

	/**
     * @param {Interaction} interaction
     */
	async execute(interaction) {
		await interaction.reply('perguntas para criar o personagem');
	},
};