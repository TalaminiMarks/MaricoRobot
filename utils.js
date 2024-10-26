const axios = require('axios');

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
};
