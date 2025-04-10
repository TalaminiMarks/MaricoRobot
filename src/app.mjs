import dotenv from 'dotenv';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { dispatch } from './commandDispatcher.mjs';

dotenv.config();
const app = new Client({ intents: [GatewayIntentBits.Guilds] });

app.once(Events.ClientReady, () => {
	console.log(`Logged in as ${app.user.tag}`);
});

app.on(Events.InteractionCreate, async interaction => {
	await dispatch(interaction);
});

app.login(process.env.DISCORD_TOKEN);
