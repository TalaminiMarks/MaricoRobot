const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('criar')
		.setDescription('comando para criar um personagem de RPG')
		.addStringOption(option =>
			option
				.setName('nome')
				.setDescription('Nome do personagem')
				.setRequired(true)
				.setMinLength(1)
				.setMaxLength(99),
		),
	async execute(interaction) {
		await interaction.reply({ content: 'Criando canal...', fetchReply: true });

		const charName = interaction.options.getString('nome');
		let categoryId = undefined;

		try {
			await interaction.guild.channels.fetch()
				.then(channels => {
					categoryId = channels.findKey(channel => channel.name === '*Criando Personagem*');
				});

			if (!categoryId) {
				const category = await interaction.guild.channels.create({
					name: '*Criando Personagem*',
					type: ChannelType.GuildCategory,
				});

				await interaction.guild.channels.create({
					name: charName,
					type: ChannelType.GuildText,
				})
					.then(channel => {
						channel.setParent(category.id);
					});
			}

			else {
				await interaction.guild.channels.create({
					name: charName,
					type: ChannelType.GuildText,
				})
					.then(channel => {
						channel.setParent(categoryId);
					});
			}

			await interaction.editReply({ content:'Canal Criado!' });
		}

		catch (error) {
			console.log(error);
			await interaction.editReply({ content: 'Erro ao criar o canal' });
		}
	},
};