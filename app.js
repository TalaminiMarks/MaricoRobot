const dotenv = require('dotenv');
dotenv.config();

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const app = new Client({ intents: [GatewayIntentBits.Guilds] });

app.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			app.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}

	}
}

app.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.log(`No command matching ${interaction.commandName} was found`);
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.log(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		else {
			await interaction.repliy({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

app.once(Events.ClientReady, clientReady => {
	console.log('Ready! Logged as ' + clientReady.user.tag);
});

app.login(process.env.DISCORD_TOKEN);
