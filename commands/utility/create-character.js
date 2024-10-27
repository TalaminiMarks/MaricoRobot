// eslint-disable-next-line no-unused-vars
const { Interaction, SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const { getRandomEmoji, axios } = require('../../utils');

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
				let select = new StringSelectMenuBuilder()
					.setPlaceholder('Selecione a sua classe')
					.setCustomId('class')
					.addOptions(
						new StringSelectMenuOptionBuilder().setValue('warrior').setLabel('Guerreiro').setDescription('O Guerreiro combina uma alta força e destreza'),
						new StringSelectMenuOptionBuilder().setValue('knight').setLabel('Cavaleiro').setDescription('O Cavaleiro começa com maior vitalidade'),
						new StringSelectMenuOptionBuilder().setValue('wanderer').setLabel('Andarilho').setDescription('O Andarilho é focado em velocidade e evasão'),
						new StringSelectMenuOptionBuilder().setValue('thief').setLabel('Ladrão').setDescription('Os Ladrões tem alta chance de critico com adaga'),
						new StringSelectMenuOptionBuilder().setValue('bandit').setLabel('Bandido').setDescription('Os Bandidos são especializados em ataques fisicos fortes'),
						new StringSelectMenuOptionBuilder().setValue('hunter').setLabel('Caçador').setDescription('Os Caçadores são especialistas em arcos'),
						new StringSelectMenuOptionBuilder().setValue('sorcerer').setLabel('Feiticeiro').setDescription('Os Feiticeiros são especialistas em magias'),
						new StringSelectMenuOptionBuilder().setValue('pyromancer').setLabel('Piromante').setDescription('Os Piromantes são especialistas em pirotecnias'),
						new StringSelectMenuOptionBuilder().setValue('cleric').setLabel('Clérigo').setDescription('Os Clérigos usam os milagres a seu favor'),
						new StringSelectMenuOptionBuilder().setValue('deprived').setLabel('Depravado').setDescription('Os Depravados não possuem nada ao seu auxilio'),
					);
				let row = new ActionRowBuilder().setComponents(select);
				// Envia uma pergunta e espera até o usuário mandar uma mensagem como resposta
				await interaction.followUp({ content: 'Qual será a sua classe?', components: [row] });

				select = new StringSelectMenuBuilder()
					.setPlaceholder('Selecione a sua classe')
					.setCustomId('class')
					.addOptions(
						new StringSelectMenuOptionBuilder().setValue('binoculars').setLabel('Binoculos').setDescription('Um Binoculos'),
						new StringSelectMenuOptionBuilder().setValue('black firebomb').setLabel('Bomba de fogo Negra').setDescription('Uma bomba negra que explode no impacto'),
						new StringSelectMenuOptionBuilder().setValue('divine blessing').setLabel('Benção Divina').setDescription('Uma água com a benção das divindades'),
						new StringSelectMenuOptionBuilder().setValue('master key').setLabel('Chave Mestra').setDescription('Um molho de chaves'),
						new StringSelectMenuOptionBuilder().setValue('old witchs ring').setLabel('Anel antigo da Bruxa').setDescription('Um anel antigo, empoeirado e enferrujado'),
						new StringSelectMenuOptionBuilder().setValue('pendant').setLabel('Pingente').setDescription('Um pingente com uma figura desenhada'),
						new StringSelectMenuOptionBuilder().setValue('tiny beings ring').setLabel('Anel Pequenino').setDescription('Um anel pequeno com uma joia vermelha'),
						new StringSelectMenuOptionBuilder().setValue('twin humanities').setLabel('Humanidade Gemea').setDescription('Duas humanidades interligadas'),
					);

				row = new ActionRowBuilder().setComponents(select);

				// Envia uma pergunta e espera até o usuário mandar uma mensagem como resposta
				await interaction.followUp({ content: 'Qual será seu item inicial?', components: [row] });

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