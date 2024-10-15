// eslint-disable-next-line no-unused-vars
const { Interaction, SlashCommandBuilder, ChannelType, userMention, resolveColor } = require('discord.js');
const { sendMessage, getRandomEmoji, capitalize } = require('../../utils');

module.exports = {
	// Define nome, descrição, tamanho min e max, e se é obrigatório
	data: new SlashCommandBuilder()
		.setName('criar')
		.setDescription('comando para criar um canal para a criação do personagem de RPG')
		.addStringOption(option =>
			option
				.setName('nome')
				.setDescription('Nome do personagem')
				.setRequired(true)
				.setMinLength(1)
				.setMaxLength(99),
		),
	// Função de execução do comando

	/**
	 * @param {Interaction} interaction
	 */

	async execute(interaction) {
		// Começa a interação com o bot mandando uma mensagem
		await interaction.reply({ content: 'Criando canal...' });

		// Recupera o valor que foi informado pelo usuário
		const charName = interaction.options.getString('nome');
		// Define o nome da categoria para a criação de personagem
		const createCategory = '** Criando Personagem **';
		// Define uma variavel que vai guardar o ID da categoria de criação de personagem
		let categoryId = undefined;
		// Armazena o id do canal recem criado
		let newChannelId = 0;

		try {
			// Procura nos canais do servidor a categoria de criação de personagem e atribui na variavel categoryId
			await interaction.guild.channels.fetch()
				.then(channels => {
					// Função que retorna o id do canal definido no filtro
					categoryId = channels.findKey(channel => channel.name === createCategory);
				});

			// Cria um cargo com o nome do personagem
			const role = await interaction.guild.roles.create({ name: capitalize(charName), color: resolveColor('Random') });

			// Se não existir a categoria vai criar a categoria e o canal pra criação do personagem e move o canal pra categoria
			if (!categoryId) {
				// Cria a categoria
				const category = await interaction.guild.channels.create({
					name: createCategory,
					type: ChannelType.GuildCategory,
				});

				// Cria o canal com o nome do personagem
				await interaction.guild.channels.create({
					name: charName,
					type: ChannelType.GuildText,
				})
					.then(channel => {
						// Move o canal para a categoria criada
						channel.setParent(category.id);
						// Atribui no canal criado o cargo criado para criar o personagem
						channel.permissionOverwrites.edit(interaction.client.user.id, { ViewChannel: true });
						channel.permissionOverwrites.edit(role.id, { ViewChannel: true });
						channel.permissionOverwrites.edit(channel.guild.id, { ViewChannel: false });
						newChannelId = channel.id;
					});
			}
			// Se já existir a categoria, so vai criar o canal e mover ele pra categoria
			else {
				// Cria o canal com o nome do personagem
				await interaction.guild.channels.create({
					name: charName,
					type: ChannelType.GuildText,
				})
					.then(channel => {
						// Move o canal para a categoria de criação de personagem
						channel.setParent(categoryId);
						// Atribui no canal criado o cargo criado para criar o personagem
						channel.permissionOverwrites.edit(interaction.client.user.id, { ViewChannel: true });
						channel.permissionOverwrites.edit(role.id, { ViewChannel: true });
						channel.permissionOverwrites.edit(channel.guild.id, { ViewChannel: false });
						newChannelId = channel.id;
					});
			}
			// Atribui o cargo ao usuário da interação
			await interaction.guild.members.fetch(interaction.user.id)
				.then(member => member.roles.add(role));
			// Edita a mensagem primeiramente enviada
			await interaction.editReply({ content:'Canal Criado! Execute o comando /criar-personagem lá ' + getRandomEmoji() });
			// Função para enviar uma mensagem simples em um canal pelo ID
			await sendMessage(interaction, newChannelId, `${userMention(interaction.user.id)} Execute o comando /criar-personagem nesse canal para começar o processo ${getRandomEmoji()}`);
		}
		// Pega algum erro, se acontecer e edita a mensagem do bot falando que deu algum erro na criação do canal
		catch (error) {
			console.log(error);
			await interaction.editReply({ content: 'Erro ao criar o canal' });
		}
	},
};