// eslint-disable-next-line no-unused-vars
const { Interaction, SlashCommandBuilder } = require('discord.js');
const z = require('zod');
const { getRandomEmoji } = require('../../utils');

module.exports = {
	// Info basica do comando
	data: new SlashCommandBuilder()
		.setName('criar-personagem')
		.setDescription('Comando para criar o personagem no canal especifico usando o "/criar"'),

	/**
     * @param {Interaction} interaction
     */
	// Função de execução do comando
	async execute(interaction) {
		// Dispara uma interação bem sucedida do discord
		await interaction.deferReply();

		// Objeto para cadastro no banco de dados
		const characterSchema = {};

		// Schema para validação dos dados
		const schema = z.object({
			id: z.string(),
			name: z.string(),
		});

		// Variavel para armazenar se o canal da interação e cargo do usuário tem o mesmo nome
		let validation = false;

		// Busca o nos membros do server, pelo id do usuario da interação
		// Se o cargo do membro tem o mesmo nome do canal de interação
		await interaction.guild.members.fetch(interaction.user.id)
			.then(member => {
				member.roles.cache.filter(role => {
					if (role.name.toLowerCase() === interaction.channel.name) {
						validation = true;
						characterSchema.id = role.id;
						characterSchema.name = role.name;
					}
				});
			});

		// Se o nome for diferente, vai dispara uma mensagem com as orientações para usuário
		if (!validation) {
			await interaction.editReply('Você precisa executar o comando /criar com o nome do personagem antes ' + getRandomEmoji());
		}

		else {
			// Define o filtro para as respostas das perguntas
			const messageFilter = m => m.author.id === interaction.user.id;
			// Define o Obj com as opções da função awaitMessages
			const awaitObj = { filter: messageFilter, max: 1, time: 5000, errors: ['time'] };

			try {
				// Envia uma pergunta e espera até o usuário mandar uma mensagem como resposta
				await interaction.followUp({ content: 'Qual seu nome?' })
					.then(async () => {
						await interaction.channel.awaitMessages(awaitObj)
							.then(collected => {
								// characterSchema.other = collected.first().content;
							})
							.catch(() => {
								throw new Error('Tempo do comando espirado, execute o comando novamente');
							});
					});
				// Envia uma pergunta e espera até o usuário mandar uma mensagem como resposta
				await interaction.followUp('Qual sua idade?')
					.then(async () => {
						await interaction.channel.awaitMessages(awaitObj)
							.then(collected => {
								characterSchema.age = Number(collected.first().content);
							})
							.catch(() => {
								throw new Error('Tempo do comando espirado, execute o comando novamente');
							});
					});
				const data = schema.parse(characterSchema);

				await fetch('http://127.0.0.1:3333/personagem/criar', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}).then(res => {
					res.json().then(
						content => {
							console.log(content);
						},
					);
				});
			}
			// Retorna para o usuário se der algum erro durante a execução do comando
			catch (error) {
				interaction.followUp(error.message);
			}
		};

	},
};