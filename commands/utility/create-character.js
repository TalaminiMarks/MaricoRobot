const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, bold } = require('discord.js');
const { getRandomEmoji, axios, formatChannelName } = require('../../utils');

function subRaceSelector(race) {
	const avalibleRace = {
		anao: () => {
			return [
				new StringSelectMenuOptionBuilder().setValue('anao da montanha').setDescription('raça Anão da Montanha').setLabel('Anão da Montanha'),
				new StringSelectMenuOptionBuilder().setValue('anao da colina').setDescription('raça Anão da Colina').setLabel('Anão da Colina'),
			];
		},
		elfo: () => {
			return [
				new StringSelectMenuOptionBuilder().setValue('alto elfo').setDescription('raça Alto Elfo').setLabel('Alto Elfo'),
				new StringSelectMenuOptionBuilder().setValue('elfo da floresta').setDescription('raça Elfo da Floresta').setLabel('Elfo da Floresta'),
				new StringSelectMenuOptionBuilder().setValue('elfo negro').setDescription('raça Elfo Negro').setLabel('Elfo Negro'),
			];
		},
		halfling: () => {
			return [
				new StringSelectMenuOptionBuilder().setValue('halfling pes leves').setDescription('raça Halfling Pes Leves').setLabel('Halfling Pes Leves'),
				new StringSelectMenuOptionBuilder().setValue('halfling robusto').setDescription('raça Halfling Robusto').setLabel('Halfling Robusto'),
			];
		},
		humano: () => {
			return [
				new StringSelectMenuOptionBuilder().setValue('calishita').setDescription('Humano Calishita').setLabel('Calishita'),
				new StringSelectMenuOptionBuilder().setValue('chondathano').setDescription('Humano Chondathano').setLabel('Chondathano'),
				new StringSelectMenuOptionBuilder().setValue('damarano').setDescription('Humano Damarano').setLabel('Damarano'),
				new StringSelectMenuOptionBuilder().setValue('illuskano').setDescription('Humano Illuskano').setLabel('Illuskano'),
				new StringSelectMenuOptionBuilder().setValue('mulano').setDescription('Humano Mulano').setLabel('Mulano'),
				new StringSelectMenuOptionBuilder().setValue('rashemita').setDescription('Humano Rashemita').setLabel('Rashemita'),
				new StringSelectMenuOptionBuilder().setValue('shou').setDescription('Humano Shou').setLabel('Shou'),
				new StringSelectMenuOptionBuilder().setValue('tethyriano').setDescription('Humano Tethyriano').setLabel('Tethyriano'),
				new StringSelectMenuOptionBuilder().setValue('turami').setDescription('Humano Turami').setLabel('Turami'),
			];
		},
		draconato: () => {
			return [
				new StringSelectMenuOptionBuilder().setValue('azul').setDescription('Ancestral Dracônico Azul').setLabel('Azul'),
				new StringSelectMenuOptionBuilder().setValue('branco').setDescription('Ancestral Dracônico Branco').setLabel('Branco'),
				new StringSelectMenuOptionBuilder().setValue('Bronze').setDescription('Ancestral Dracônico Bronze').setLabel('Bronze'),
				new StringSelectMenuOptionBuilder().setValue('cobre').setDescription('Ancestral Dracônico Cobre').setLabel('Cobre'),
				new StringSelectMenuOptionBuilder().setValue('latao').setDescription('Ancestral Dracônico Latao').setLabel('Latao'),
				new StringSelectMenuOptionBuilder().setValue('negro').setDescription('Ancestral Dracônico Negro').setLabel('Negro'),
				new StringSelectMenuOptionBuilder().setValue('ouro').setDescription('Ancestral Dracônico Ouro').setLabel('Ouro'),
				new StringSelectMenuOptionBuilder().setValue('prata').setDescription('Ancestral Dracônico Prata').setLabel('Prata'),
				new StringSelectMenuOptionBuilder().setValue('verde').setDescription('Ancestral Dracônico Verde').setLabel('Verde'),
				new StringSelectMenuOptionBuilder().setValue('vermelho').setDescription('Ancestral Dracônico Vermelho').setLabel('Vermelho'),
			];
		},
		gnomo: () => {
			return [
				new StringSelectMenuOptionBuilder().setValue('gnomo da floresta').setDescription('raça Gnomo da Floresta').setLabel('Gnomo da Floresta'),
				new StringSelectMenuOptionBuilder().setValue('gnomo das rochas').setDescription('raça Gnomo das Rochas').setLabel('Gnomo das Rochas'),
			];
		},
		meioElfo: () => {
			return new StringSelectMenuOptionBuilder().setValue('meioElfo').setDescription('raça Meio-Elfo').setLabel('Meio-Elfo');
		},
		meioOrc: () => {
			return new StringSelectMenuOptionBuilder().setValue('meioOrc').setDescription('raça Meio-Orc').setLabel('Meio-Orc');
		},
		tiefling: () => {
			return new StringSelectMenuOptionBuilder().setValue('tiefling').setDescription('raça Tiefling').setLabel('Tiefling');
		},
	};
	const getRaces = avalibleRace[race];
	return getRaces();
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('criar-personagem')
		.setDescription('Comando para criar o personagem no canal especifico usando o "/criar-canal"'),

	/**
     * @param {import('discord.js').Interaction} interaction
     */
	async execute(interaction) {
		await interaction.deferReply();

		const character = {};
		const RESPONSE_TIME = 10000;

		let validation = false;


		await interaction.guild.members.fetch(interaction.user.id)
			.then(member => {
				member.roles.cache.filter(role => {
					if (role.name.toLowerCase() === formatChannelName(interaction.channel.name)) {
						validation = true;
						character.id = role.id;
						character.name = role.name;
					}
				});
			});

		if (!validation) {
			interaction.editReply('Você precisa executar o comando /criar com o nome do personagem antes ' + getRandomEmoji());
		}

		else {
			await interaction.editReply(`O seu personagem se chama ${bold(character.name)}`);

			const filter = m => m.author.id === interaction.user.id;

			await interaction.followUp({
				content: 'Qual a idade do personagem?',
				withResponse: true,
			})
				.then(async message => {
					await message.channel.awaitMessages({ filter: filter, max: 1, time: RESPONSE_TIME, errors: ['time'] })
						.then(async collected => {
							character.age = collected.first().content;
							await message.delete();
							await collected.first().delete();
						})
						.catch(() => {
							interaction.channel.send('Não foi respondida a pergunta');
						});
				});

			const baseRace = new StringSelectMenuBuilder()
				.setPlaceholder('Selecione sua raça')
				.setCustomId('baseRace')
				.addOptions([
					new StringSelectMenuOptionBuilder().setValue('anao').setDescription('raça Anão').setLabel('Anão'),
					new StringSelectMenuOptionBuilder().setValue('elfo').setDescription('raça Elfo').setLabel('Elfo'),
					new StringSelectMenuOptionBuilder().setValue('halfling').setDescription('raça Halfling').setLabel('Halfling'),
					new StringSelectMenuOptionBuilder().setValue('humano').setDescription('raça Humano').setLabel('Humano'),
					new StringSelectMenuOptionBuilder().setValue('draconato').setDescription('raça Draconato').setLabel('Draconato'),
					new StringSelectMenuOptionBuilder().setValue('gnomo').setDescription('raça Gnomo').setLabel('Gnomo'),
					new StringSelectMenuOptionBuilder().setValue('meioElfo').setDescription('raça Meio-Elfo').setLabel('Meio-elfo'),
					new StringSelectMenuOptionBuilder().setValue('meioOrc').setDescription('raça Meio-Orc').setLabel('Meio-Orc'),
					new StringSelectMenuOptionBuilder().setValue('tiefling').setDescription('raça Tiefling').setLabel('Tiefling'),

				]);

			const baseRaceRow = new ActionRowBuilder().addComponents(baseRace);

			let selectedBaseRace = '';

			const componentfilter = i => i.user.id === interaction.user.id;

			await interaction.followUp({
				content: 'Qual sua raça base?',
				withResponse: true,
				components: [baseRaceRow],
			})
				.then(async message => {
					await message.awaitMessageComponent({ filter: componentfilter, time: RESPONSE_TIME, errors: ['time'] })
						.then(async collected => {
							selectedBaseRace = collected.values.toString();
							character.baseRace = selectedBaseRace;
							await message.delete();
						})
						.catch(() => {
							interaction.channel.send('erro na resposta');
						});
				});

			const subRace = new StringSelectMenuBuilder()
				.setPlaceholder('Selecione sua sub-raça')
				.setCustomId('subRace')
				.addOptions(subRaceSelector(selectedBaseRace));

			const subRaceRow = new ActionRowBuilder().addComponents(subRace);

			await interaction.followUp({
				content: 'Qual sua sub raça?',
				withResponse: true,
				components: [subRaceRow],
			})
				.then(async message => {
					await message.awaitMessageComponent({ filter: componentfilter, time: RESPONSE_TIME, errors:['time'] })
						.then(async collected => {
							character.subRace = collected.values.toString();
							await message.delete();
						})
						.catch(() => {
							interaction.channel.send('erro na resposta');
						});
				});

			const role = new StringSelectMenuBuilder()
				.setPlaceholder('Selecione a sua classe')
				.setCustomId('role')
				.addOptions([
					new StringSelectMenuOptionBuilder()
						.setValue('barbaro')
						.setLabel('Barbaro')
						.setDescription('Um feroz guerreiro de origem primitiva.'),
					new StringSelectMenuOptionBuilder()
						.setValue('bardo')
						.setLabel('Bardo')
						.setDescription('Um místico que possui poderes que ecoam a música da criação.'),
					new StringSelectMenuOptionBuilder()
						.setValue('bruxo')
						.setLabel('Bruxo')
						.setDescription('Um portador de magia derivada de barganha.'),
					new StringSelectMenuOptionBuilder()
						.setValue('clerigo')
						.setLabel('Clerigo')
						.setDescription('Um campeão sacerdotal que empunha magia divina.'),
					new StringSelectMenuOptionBuilder()
						.setValue('druida')
						.setLabel('Druida')
						.setDescription('Detentor dos poderes da natureza e capaz de adotar formas animais.'),
					new StringSelectMenuOptionBuilder()
						.setValue('feiticeiro')
						.setLabel('Feiticeiro')
						.setDescription('Um conjurador que possui magia latente.'),
					new StringSelectMenuOptionBuilder()
						.setValue('guerreiro')
						.setLabel('Guerreiro')
						.setDescription('Um perito em uma vasta gama de armas e armaduras.'),
					new StringSelectMenuOptionBuilder()
						.setValue('ladino')
						.setLabel('Ladino')
						.setDescription('Um trapaceiro que utiliza de furtividade e astúcia.'),
					new StringSelectMenuOptionBuilder()
						.setValue('mago')
						.setLabel('Mago')
						.setDescription('Um usuário de magia capaz de manipular as estruturas da realidade.'),
					new StringSelectMenuOptionBuilder()
						.setValue('monge')
						.setLabel('Monge')
						.setDescription('Um mestre das artes marciais.'),
					new StringSelectMenuOptionBuilder()
						.setValue('paladino')
						.setLabel('Paladino')
						.setDescription('Um guerreiro divino vinculado a um juramento sagrado.'),
					new StringSelectMenuOptionBuilder()
						.setValue('patrulheiro')
						.setLabel('Patrulheiro')
						.setDescription('Um guerreiro que utiliza de poderio marcial e magia natural.'),
				]);

			const roleRow = new ActionRowBuilder().addComponents(role);

			await interaction.followUp({
				content: 'Qual a sua classe?',
				withResponse: true,
				components: [roleRow],
			})
				.then(async message => {
					await message.awaitMessageComponent({ filter: componentfilter, time: RESPONSE_TIME, errors: ['time'] })
						.then(async collected => {
							character.role = collected.values.toString();
							await message.delete();
						});
				});

			character.userId = interaction.user.id;

			const { data } = await axios.post(
				'/personagem/criar',
				character,
			);

			interaction.channel.send(data.message);
		};
	},
};