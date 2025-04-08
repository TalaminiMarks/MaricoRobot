const { SlashCommandBuilder, ChannelType, userMention, resolveColor } = require('discord.js');
const { sendMessage, getRandomEmoji, capitalize } = require('../../utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('criar-canal')
		.setDescription('comando para criar um canal para a criação do personagem de RPG')
		.addStringOption(option =>
			option
				.setName('nome')
				.setDescription('Nome do personagem')
				.setRequired(true)
				.setMinLength(1)
				.setMaxLength(99),
		),

	/**
     * @param {import('discord.js').Interaction} interaction
     */
	async execute(interaction) {
		await interaction.reply({ content: 'Criando canal...' });

		const charName = interaction.options.getString('nome');
		const createCategory = '** Criacao de personagem **';
		let categoryId = undefined;
		let newChannelId = 0;

		try {
			await interaction.guild.channels.fetch()
				.then(channels => {
					categoryId = channels.findKey(channel => channel.name === createCategory);
				});

			const role = await interaction.guild.roles.create({ name: capitalize(charName), color: resolveColor('Random') });

			if (!categoryId) {
				const category = await interaction.guild.channels.create({
					name: createCategory,
					type: ChannelType.GuildCategory,
				});

				await interaction.guild.channels.create({
					name: charName,
					type: ChannelType.GuildText,
				})
					.then(channel => {
						channel.setParent(category.id);
						channel.permissionOverwrites.edit(interaction.client.user.id, { ViewChannel: true });
						channel.permissionOverwrites.edit(role.id, { ViewChannel: true });
						channel.permissionOverwrites.edit(channel.guild.id, { ViewChannel: false });
						newChannelId = channel.id;
					});
			}
			else {
				await interaction.guild.channels.create({
					name: charName,
					type: ChannelType.GuildText,
				})
					.then(channel => {
						channel.setParent(categoryId);
						channel.permissionOverwrites.edit(interaction.client.user.id, { ViewChannel: true });
						channel.permissionOverwrites.edit(role.id, { ViewChannel: true });
						channel.permissionOverwrites.edit(channel.guild.id, { ViewChannel: false });
						newChannelId = channel.id;
					});
			}
			await interaction.guild.members.fetch(interaction.user.id)
				.then(member => member.roles.add(role));
			await interaction.editReply({ content:'Canal Criado! Execute o comando /criar-personagem lá ' + getRandomEmoji() });
			await sendMessage(interaction, newChannelId, `${userMention(interaction.user.id)} Execute o comando /criar-personagem nesse canal para começar o processo ${getRandomEmoji()}`);
		}
		catch (error) {
			console.log(error);
			await interaction.editReply({ content: 'Erro ao criar o canal' });
		}
	},
};