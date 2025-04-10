import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('roll-dice')
	.setDescription('Select dice you want to roll')
	.addIntegerOption(option =>
		option
			.setName('input')
			.setDescription('dice types')
			.setRequired(true)
			.addChoices(
				{ name: 'D4', value: 4 },
				{ name: 'D6', value: 6 },
				{ name: 'D8', value: 8 },
				{ name: 'D12', value: 12 },
				{ name: 'D20', value: 20 },
				{ name: 'D100', value: 100 },
			),
	);
/**
 * @param {import('discord.js').Interaction} interaction
 */
export async function execute(interaction) {
	function roll(n) {
		return Math.floor(Math.random() * n) + 1;
	}
	const output = roll(interaction.options.getInteger('input'));
	await interaction.reply(String(output));
}