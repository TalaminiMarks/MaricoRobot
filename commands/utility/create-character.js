const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const { getRandomEmoji, axios } = require('../../utils');

module.exports = {
	// Info basica do comando
	data: new SlashCommandBuilder()
		.setName('criar-personagem')
		.setDescription('Comando para criar o personagem no canal especifico usando o "/criar"'),

	/**
     * @param {import('discord.js').Interaction} interaction
     */
	// Função de execução do comando
	async execute(interaction) {
		// Dispara uma interação bem sucedida do discord
		await interaction.deferReply();

		// Objeto para cadastro no banco de dados
		const characterSchema = {};

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
			try {
				// Armazena um select menu e suas opções. São as classes
				let select = new StringSelectMenuBuilder()
					.setPlaceholder('Selecione a sua classe')
					.setCustomId('class')
					.addOptions(
						new StringSelectMenuOptionBuilder().setValue('guerreiro').setLabel('Guerreiro').setDescription('O Guerreiro combina uma alta força e destreza'),
						new StringSelectMenuOptionBuilder().setValue('cavaleiro').setLabel('Cavaleiro').setDescription('O Cavaleiro começa com maior vitalidade'),
						new StringSelectMenuOptionBuilder().setValue('andarilho').setLabel('Andarilho').setDescription('O Andarilho é focado em velocidade e evasão'),
						new StringSelectMenuOptionBuilder().setValue('ladrao').setLabel('Ladrão').setDescription('Os Ladrões tem alta chance de critico com adaga'),
						new StringSelectMenuOptionBuilder().setValue('bandido').setLabel('Bandido').setDescription('Os Bandidos são especializados em ataques fisicos fortes'),
						new StringSelectMenuOptionBuilder().setValue('cacador').setLabel('Caçador').setDescription('Os Caçadores são especialistas em arcos'),
						new StringSelectMenuOptionBuilder().setValue('feiticeiro').setLabel('Feiticeiro').setDescription('Os Feiticeiros são especialistas em magias'),
						new StringSelectMenuOptionBuilder().setValue('piromante').setLabel('Piromante').setDescription('Os Piromantes são especialistas em pirotecnias'),
						new StringSelectMenuOptionBuilder().setValue('clerigo').setLabel('Clérigo').setDescription('Os Clérigos usam os milagres a seu favor'),
						new StringSelectMenuOptionBuilder().setValue('depravado').setLabel('Depravado').setDescription('Os Depravados não possuem nada ao seu auxilio'),
					);

				// Cria uma linha com ação e recebe o select menu
				let row = new ActionRowBuilder().setComponents(select);

				// Envia uma pergunta e espera até o usuário mandar uma mensagem como resposta
				const characterRole = await interaction.followUp({ content: 'Qual será a sua classe?', components: [row] });

				// Cria um filtro que valida somente a escolha da pessoa que começou a interação
				const componentfilter = i => i.user.id === interaction.user.id;

				// Espera até o usuário fazer a sua escolha e response com uma mensagem qual classe ele escolheu
				const roleResponse = await characterRole.awaitMessageComponent({ filter: componentfilter, time: 10000 });
				await roleResponse.update({ content: `Você escolheu ${roleResponse.values} como classe`, components: [] });

				// Reutiliza a variavel das classes para criar um select menu com os itens inicial
				select = new StringSelectMenuBuilder()
					.setPlaceholder('Selecione a sua classe')
					.setCustomId('initial')
					.addOptions(
						new StringSelectMenuOptionBuilder().setValue('binoculos').setLabel('Binoculos').setDescription('Um Binoculos'),
						new StringSelectMenuOptionBuilder().setValue('bomba de fogo negra').setLabel('Bomba de fogo Negra').setDescription('Uma bomba negra que explode no impacto'),
						new StringSelectMenuOptionBuilder().setValue('bencao divina').setLabel('Benção Divina').setDescription('Uma água com a benção das divindades'),
						new StringSelectMenuOptionBuilder().setValue('chave mestra').setLabel('Chave Mestra').setDescription('Um molho de chaves'),
						new StringSelectMenuOptionBuilder().setValue('anel antigo da bruxa').setLabel('Anel antigo da Bruxa').setDescription('Um anel antigo, empoeirado e enferrujado'),
						new StringSelectMenuOptionBuilder().setValue('pingente').setLabel('Pingente').setDescription('Um pingente com uma figura desenhada'),
						new StringSelectMenuOptionBuilder().setValue('anel pequenino').setLabel('Anel Pequenino').setDescription('Um anel pequeno com uma joia vermelha'),
						new StringSelectMenuOptionBuilder().setValue('humanidade gemea').setLabel('Humanidade Gemea').setDescription('Duas humanidades interligadas'),
					);

				// Reutiliza a varivel da linha de ação e recebe o select dos itens
				row = new ActionRowBuilder().setComponents(select);

				// Envia uma pergunta e espera até o usuário selecionar a opção
				const initialItem = await interaction.followUp({ content: 'Qual será seu item inicial?', components: [row] });

				// Espera até o usuário fazer a sua escolha e response com uma mensagem qual classe ele escolheu
				const initialItemResponse = await initialItem.awaitMessageComponent({ filter: componentfilter, time: 10000 });
				await initialItemResponse.update({ content: `Você escolheu ${initialItemResponse.values} como item inicial`, components: [] });

				// Atribui os valores recebidos do usuário para o objeto characterSchema
				characterSchema.role = roleResponse.values[0];
				characterSchema.initial = initialItemResponse.values[0];

				// Envia o objeto do usuário para criar um registro no banco de dados.
				// Se bem sucedido, devolve uma mensagem que deu certo
				axios.post('personagem/criar', characterSchema)
					.then(res => interaction.followUp(res.data.message));
			}
			// Retorna para o usuário se der algum erro durante a execução do comando
			catch (error) {
				interaction.followUp(error.message);
			}
		};

	},
};