const dotenv = require('dotenv');
dotenv.config();

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

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

const eventsPath = path.join(__dirname, 'events');
const eventsFile = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventsFile) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {
		app.once(event.name, (...args) => event.execute(...args));
	}
	else {
		app.on(event.name, (...args) => event.execute(...args));
	}
}
app.login(process.env.DISCORD_TOKEN);
