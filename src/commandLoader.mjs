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
		.map(file => import(pathToFileURL(join(folderPath, file))));

	return await Promise.all(modules);
}

export async function loadCommands() {
	return {
		slash: await loadFolder('./commands/slash'),
		context: await loadFolder('./commands/context'),
	};
}