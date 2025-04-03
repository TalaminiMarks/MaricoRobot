const axios = require('axios');
const { StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
	capitalize: (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	getRandomEmoji: () => {
		const emojiList = ['😭', '😄', '😌', '🤓', '😎', '😤', '🤖', '😶‍🌫️', '🌏', '📸', '💿', '👋', '🌊', '✨'];
		return emojiList[Math.floor(Math.random() * emojiList.length)];
	},
	sendMessage: async function(interaction, channelId, string) {
		await interaction.client.channels.cache.get(channelId).send(string);
	},
	axios: axios.create({
		baseURL: 'http://127.0.0.1:3333/',
		headers: {
			'Content-Type': 'application/json',
		},
		timeout: 5000,
	}),
	formatChannelName: (s) => {
		let formatString = '';
		const strArr = s.split('-');
		for (let i = 0; i < strArr.length; i++) {
			formatString += strArr[i] + ' ';
		}
		return formatString.trim();
	},
	getSelectOption: (value, desctiption) => {
		return new StringSelectMenuOptionBuilder().setValue(value).setDescription(desctiption).setLabel(value);
	},
};
