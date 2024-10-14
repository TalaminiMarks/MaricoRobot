module.exports = {
	capitalize: (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	getRandomEmoji: () => {
		const emojiList = ['😭', '😄', '😌', '🤓', '😎', '😤', '🤖', '😶‍🌫️', '🌏', '📸', '💿', '👋', '🌊', '✨'];
		return emojiList[Math.floor(Math.random() * emojiList.length)];
	},
	async sendMessage(interaction, channelId, string) {
		await interaction.client.channels.cache.get(channelId).send(string);
	},
};
