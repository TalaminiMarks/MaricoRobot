const dotenv = require('dotenv');
dotenv.config();

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');

// Instancia da aplicação. As Intents são um teste
const app = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
],
});

// Cria uma coleção na aplicação
app.commands = new Collection();

// Caminho para a pasta dos comandos
const commandPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandPath);

// Carrega os commandos dinamicamente para dentro do app.commands
for (const folder of commandFolders) {
	const utilityPath = path.join(commandPath, folder);
	const utilityFiles = fs.readdirSync(utilityPath).filter(file => file.endsWith('.js'));
	for (const file of utilityFiles) {
		const filePath = path.join(utilityPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			app.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}

	}
}

// Caminho para a pasta dos eventos
const eventsPath = path.join(__dirname, 'events');
const eventsFile = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// Carrega os eventos dinamicamente
for (const file of eventsFile) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	// O event.once executa somente uma vez, que é quando o client está pronto para ser executado
	if (event.once) {
		app.once(event.name, (...args) => event.execute(...args));
	}
	else {
		app.on(event.name, (...args) => event.execute(...args));
	}
}

// Lugar de teste
// app.once(Events.ClientReady, readyClient => {
// 	console.log(`Ready! logged in as ${readyClient.user.tag}`);
// });

// app.on(Events.InteractionCreate, interaction => {
// 	if (!interaction.isChatInputCommand()) return;

// 	const command = interaction.client.commands.get(interaction.commandName);
// 	console.log(interaction.client);
// });

// Login do bot
app.login(process.env.DISCORD_TOKEN);
