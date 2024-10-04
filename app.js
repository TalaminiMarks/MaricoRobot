import 'dotenv/config';

import { Client, Events, GatewayIntentBits } from 'discord.js';

const app = new Client({ intents: [GatewayIntentBits.Guilds] });

app.once(Events.ClientReady, clientReady => {
	console.log('Ready! Logged as ' + clientReady.user.tag);
});

app.login(process.env.DISCORD_TOKEN);
