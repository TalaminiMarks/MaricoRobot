import dotenv from 'dotenv';
dotenv.config();

import { REST, Routes } from 'discord.js';
import { loadCommands } from '../commandLoader.mjs';

const commandsData = [];

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		const commands = await loadCommands();
		const slashCommands = commands.slash;

		slashCommands.forEach((command) => {
			commandsData.push(command.data.toJSON());
		});


		console.log(`Started refleshing ${commandsData.length} application (/) commands.`);
		const data = await rest.put(
			Routes.applicationCommands(process.env.APP_ID),
			{ body: commandsData },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		console.log(error);
	}
})();
