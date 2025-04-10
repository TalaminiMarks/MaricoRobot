import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Pong!');

/**
* @param {import('discord.js').Interaction} interaction
*/
export async function execute(interaction) {
	await interaction.reply('Pong');
}
