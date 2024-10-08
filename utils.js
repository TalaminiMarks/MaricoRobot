module.exports = {
	capitalize: (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	getRandomEmoji: () => {
		const emojiList = ['😭', '😄', '😌', '🤓', '😎', '😤', '🤖', '😶‍🌫️', '🌏', '📸', '💿', '👋', '🌊', '✨'];
		return emojiList[Math.floor(Math.random() * emojiList.length)];
	},
};
