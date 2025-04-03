const data = {
	dwarf: [
		{ value: 'anao da montanha', description: 'Raça Anão da Montanha' },
		{ value: 'anao da colina', description: 'Raça Anão da Colina' },
	],
	elf: [
		{ value: 'alto elfo', description: 'Raça Alto Elfo' },
		{ value: 'elfo da floresta', description: 'Raça Elfo da Floresta' },
		{ value: 'elfo negro', description: 'Raça Elfo Negro' },
	],
	halfling: [
		{ value: 'halfling pes leves', description: 'Raça Halfling Pes Leves' },
		{ value: 'halfling robusto', description: 'Raça Halfling Robusto' },
	],
	human: [
		{ value: 'calishita', description: 'Humano Calishita' },
		{ value: 'chondathano', description: 'Humano Chondathano' },
		{ value: 'damarano', description: 'Humano Damarano' },
		{ value: 'illuskano', description: 'Humano Illuskano' },
		{ value: 'mulano', description: 'Humano Mulano' },
		{ value: 'rashemita', description: 'Humano Rashemita' },
		{ value: 'shou', description: 'Humano Shou' },
		{ value: 'tethyriano', description: 'Humano Tethyriano' },
		{ value: 'turami', description: 'Humano Turami' },
	],
	dragonborn: [
		{ value: 'azul', description: 'Ancestral Dracônico Azul' },
		{ value: 'branco', description: 'Ancestral Dracônico Branco' },
		{ value: 'bronze', description: 'Ancestral Dracônico Bronze' },
		{ value: 'cobre', description: 'Ancestral Dracônico Cobre' },
		{ value: 'latao', description: 'Ancestral Dracônico Latão' },
		{ value: 'negro', description: 'Ancestral Dracônico Negro' },
		{ value: 'ouro', description: 'Ancestral Dracônico Ouro' },
		{ value: 'prata', description: 'Ancestral Dracônico Prata' },
		{ value: 'verde', description: 'Ancestral Dracônico Verde' },
		{ value: 'vermelho', description: 'Ancestral Dracônico Vermelho' },
	],
	gnome: [
		{ value: 'gnomo da floresta', description: 'Raça Gnomo da Floresta' },
		{ value: 'gnomo das rochas', description: 'Raça Gnomo das Rochas' },
	],
	halfElf: [
		{ value: 'meio elfo', description: 'Raça Meio-Elfo' },
	],
	halfOrc: [
		{ value: 'meio orc', description: 'Raça Meio-Orc' },
	],
	tiefling: [
		{ value: 'tiefling', description: 'Raça Tiefling' },
	],
};

module.exports = {
	getRacesData: (race) => {
		return data[race];
	},
};