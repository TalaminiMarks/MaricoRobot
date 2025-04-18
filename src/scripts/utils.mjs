import axios from 'axios';
import { StringSelectMenuOptionBuilder } from 'discord.js';

export function	capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getRandomEmoji() {
	const emojiList = ['😭', '😄', '😌', '🤓', '😎', '😤', '🤖', '😶‍🌫️', '🌏', '📸', '💿', '👋', '🌊', '✨'];
	return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export async function sendMessage(interaction, channelId, string) {
	await interaction.client.channels.cache.get(channelId).send(string);
}

export const api = axios.create({
	baseURL: 'http://127.0.0.1:3333/',
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 5000,
});

export function formatChannelName(s) {
	let formatString = '';
	const strArr = s.split('-');
	for (let i = 0; i < strArr.length; i++) {
		formatString += strArr[i] + ' ';
	}
	return formatString.trim();
}

export function getSelectOption(value, desctiption, label) {
	return new StringSelectMenuOptionBuilder().setValue(value).setDescription(desctiption).setLabel(label);
}
