const dotenv = require('dotenv');
dotenv.config();
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

// Cria um vetor para os comandos
const commands = [];

// Caminho da pasta dos comandos
const folderPath = path.join(__dirname, 'commands');
const commandFolder = fs.readdirSync(folderPath);

// Carrega os comandos para dentro do vetor commands em formato de JSON
for (const folder of commandFolder) {
	const commandPath = path.join(folderPath, folder);
	const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}

}

// Instancia aplicação REST para carregar os comandos pro discord
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// Joga os comandos para dentro da URL do bot
(async () => {
	try {
		console.log(`Started refleshing ${commands.length} application (/) commands.`);
		const data = await rest.put(
			Routes.applicationCommands(process.env.APP_ID),
			{ body: commands },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		console.log(error);
	}
})();
