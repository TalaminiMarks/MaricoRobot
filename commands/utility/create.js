const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
	// Define nome, descrição, tamanho min e max, e se é obrigatório
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
	// Função de execução do comando
	async execute(interaction) {
		// Começa a interação com o bot mandando uma mensagem
		await interaction.reply({ content: 'Criando canal...', fetchReply: true });

		// Recupera o valor que foi informado pelo usuário
		const charName = interaction.options.getString('nome');
		// Define o nome da categoria para a criação de personagem
		const createCategory = '** Criando Personagem **';
		// Define uma variavel que vai guardar o ID da categoria de criação de personagem
		let categoryId = undefined;

		try {
			// Procura nos canais do servidor a categoria de criação de personagem e atribui na variavel categoryId
			await interaction.guild.channels.fetch()
				.then(channels => {
					// Função que retorna o id do canal definido no filtro
					categoryId = channels.findKey(channel => channel.name === createCategory);
				});

			// Se não existir a categoria vai criar a categoria e o canal pra criação do personagem e move o canal pra categoria
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
					});
			}
			// Se já existir a categoria, so vai criar o canal e mover ele pra categoria
			else {
				await interaction.guild.channels.create({
					name: charName,
					type: ChannelType.GuildText,
				})
					.then(channel => {
						channel.setParent(categoryId);
					});
			}
			// Edita a mensagem primeiramente enviada
			await interaction.editReply({ content:'Canal Criado!' });
		}
		// Pega algum erro, se acontecer e edita a mensagem do bot falando que deu algum erro
		catch (error) {
			console.log(error);
			await interaction.editReply({ content: 'Erro ao criar o canal' });
		}
	},
};