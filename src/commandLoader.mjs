import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

function relativePath(path) {
	const __dirname = import.meta.dirname;
	return join(__dirname, path);
}

async function loadFolder(path) {
	const folderPath = relativePath(path);
	const files = await readdir(folderPath);

	const modules = files
		.filter(file => file.endsWith('.mjs'))
		.forEach(async file => {
			const command = await import(pathToFileURL(join(folderPath, file)));
			if ('data' in command && 'execute' in command) {
				return command;
			}
			else {
				console.log('Command is missing "data" or "execute" property at ' + file);
			}
		});

	return await Promise.all(modules);
}

export async function loadCommands() {
	return {
		slash: await loadFolder('./commands/slash'),
		context: await loadFolder('./commands/context'),
	};
}