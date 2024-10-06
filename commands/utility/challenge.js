const { SlashCommandBuilder } = require('discord.js');
const { scheduler } = require('node:timers/promises');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pedra-papel-tesoura')
		.setDescription('Joga Pedra Papel Tesoura com o bot'),
	async execute(interaction) {
	    await interaction.deferReply();
		await scheduler.wait(1000);
		await interaction.followUp('Pong Again!');
		await scheduler.wait(1000);
		const teste = await interaction.fetchReply();
		console.log(teste.interaction);
	},
};