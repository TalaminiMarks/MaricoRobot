const { Events } = require('discord.js');

// Evento de interação com o bot
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
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
	},
};