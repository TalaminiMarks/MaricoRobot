const data = {
	dwarf: [
		{ value: 'anao da montanha', description: 'Raça Anão da Montanha', label: 'Anão da Montanha' },
		{ value: 'anao da colina', description: 'Raça Anão da Colina', label: 'Anão da Contanha' },
	],
	elf: [
		{ value: 'alto elfo', description: 'Raça Alto Elfo', label: 'Alto Elfo' },
		{ value: 'elfo da floresta', description: 'Raça Elfo da Floresta', label: 'Elfo da Floresta' },
		{ value: 'elfo negro', description: 'Raça Elfo Negro', label: 'Elfo Negro' },
	],
	halfling: [
		{ value: 'halfling pes leves', description: 'Raça Halfling Pes Leves', label: 'Halfling Pes Leves' },
		{ value: 'halfling robusto', description: 'Raça Halfling Robusto', label: 'Halfling Robusto' },
	],
	human: [
		{ value: 'calishita', description: 'Humano Calishita', label: 'Calishita' },
		{ value: 'chondathano', description: 'Humano Chondathano', label: 'Chondathano' },
		{ value: 'damarano', description: 'Humano Damarano', label: 'Damarano' },
		{ value: 'illuskano', description: 'Humano Illuskano', label: 'Illuskano' },
		{ value: 'mulano', description: 'Humano Mulano', label: 'Mulano' },
		{ value: 'rashemita', description: 'Humano Rashemita', label: 'Rashemita' },
		{ value: 'shou', description: 'Humano Shou', label: 'Shou' },
		{ value: 'tethyriano', description: 'Humano Tethyriano', label: 'Tethyriano' },
		{ value: 'turami', description: 'Humano Turami', label: 'Turami' },
	],
	dragonborn: [
		{ value: 'azul', description: 'Ancestral Dracônico Azul', label: 'Azul' },
		{ value: 'branco', description: 'Ancestral Dracônico Branco', label: 'Branco' },
		{ value: 'bronze', description: 'Ancestral Dracônico Bronze', label: 'Bronze' },
		{ value: 'cobre', description: 'Ancestral Dracônico Cobre', label: 'Cobre' },
		{ value: 'latao', description: 'Ancestral Dracônico Latão', label: 'Latão' },
		{ value: 'negro', description: 'Ancestral Dracônico Negro', label: 'Negro' },
		{ value: 'ouro', description: 'Ancestral Dracônico Ouro', label: 'Ouro' },
		{ value: 'prata', description: 'Ancestral Dracônico Prata', label: 'Prata' },
		{ value: 'verde', description: 'Ancestral Dracônico Verde', label: 'Verde' },
		{ value: 'vermelho', description: 'Ancestral Dracônico Vermelho', label: 'Vermelho' },
	],
	gnome: [
		{ value: 'gnomo da floresta', description: 'Raça Gnomo da Floresta', label: 'Gnomo da Floresta' },
		{ value: 'gnomo das rochas', description: 'Raça Gnomo das Rochas', label: 'Gnomo das Rochas' },
	],
	halfElf: [
		{ value: 'meio elfo', description: 'Raça Meio-Elfo', label: 'Meio-Elfo' },
	],
	halfOrc: [
		{ value: 'meio orc', description: 'Raça Meio-Orc', label: 'Meio-Orc' },
	],
	tiefling: [
		{ value: 'tiefling', description: 'Raça Tiefling', label: 'Tiefling' },
	],
};

module.exports = {
	getRacesData: (race) => {
		return data[race];
	},
};