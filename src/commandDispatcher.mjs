import { loadCommands } from './commandLoader.mjs';
import { Collection } from 'discord.js';

function buildCommandCollection(commandList) {
	return new Collection(commandList.map(command => [command.data.name, command]));
}

let slashCommands;

(async () => {
	const commands = await loadCommands();
	slashCommands = buildCommandCollection(commands.slash);
})();

/**
 * @param {import('discord.js').Interaction} interaction
 */
async function respondInteractionWithError(interaction) {
	if (!interaction.replied) {
		await interaction.reply({
			content: 'There was an error while executing this command',
			ephemeral: true,
		});
	}
}

/**
 * @param {import('discord.js').CommandInteraction} interaction
 */
async function dispatchCommand(interaction) {
	const command = slashCommands.get(interaction.commandName);
	if (!command) {
		console.log('There was no command with this name');
		return;
	};

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await respondInteractionWithError(interaction);
	}
}

/**
 * @param {import('discord.js').CommandInteraction} interaction
 */
export async function dispatch(interaction) {
	return dispatchCommand(interaction);
}
