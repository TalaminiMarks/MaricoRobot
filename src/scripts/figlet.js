import figletModule from 'figlet';

export async function getFontsFiglet() {
	new Promise((resolve, reject) => {
		figletModule.fonts((error, fontList) => {
			if (error) {
				console.error('something went wrong');
				reject(error);
				return;
			}
			resolve(fontList);
		});
	});
}

export async function figlet(text, options) {
	new Promise((resolve, reject) => {
		figletModule(text, options, (error, result) => {
			if (error) {
				console.error('Something went wrong');
				reject(error);
				return;
			}
			resolve(result);
		});
	});
}