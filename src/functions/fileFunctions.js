// FUNCIONES QUE MANEJAN LOS ARCHIVOS //
const fs = require('node:fs/promises');
// const { marked } = require('marked');
const md = require('markdown-it')();

// Función para leer el contenido del archivo y retornar su contenido
// Módulo fs. Usar readFile, NO readFileSync
function fileContent(file) {
	console.log('Leyendo archivo...', file);
	return fs.readFile(file, 'utf-8')
		.then((data) => {
			console.log('El contenido del archivo es:', data);
			return data;
		})
		.catch((err) => {
			console.error('Error', err);
			throw err;
		});
}
/* return new Promise ((resolve, reject) => {
		console.log('Leyendo archivo...', file);
		fs.readFile(file, 'utf-8', (err, data) => {
			if (err) {
				console.log('Error', err);
				reject(err);
			} else {
				console.log('El contenido del archivo es: ', data);
				resolve(data);
			}
		});
	});
}*/

// Función para encontrar links y retornarlos en un arreglo
function linksArray(data, file) {
	const tokens = md.parse(data);
	// console.log(tokens);
	const links = [];

	tokens.map((token) => {
		if (token.type === 'inline' && !token.content.startsWith('!')) {
			const content = token.content;
			const linkMatch = content.match(/\[(.*?)\]\((.*?)\)/);
			if (linkMatch) {
				const text = linkMatch[1];
				const href = linkMatch[2];
				links.push({ href, text, file });
			}
		}
	});
	return links;
}

// Opcion con expresión regular
/* const urlRex = /https?:\/\/[^\s]+/g;
const links = data.match(urlRex);*/

/* console.log(token.content);
		if (token.type === 'link_open') {
			const href = arr[index + 1]?.content;
			const text = arr[index + 2]?.content;
			if (href && text) {
				links.push({ href, text, file });
			}
		}
	});
	return links;
}*/

module.exports = {
	fileContent, linksArray,
};

/*
[{ `href`: URL encontrada
`text`: Texto que aparecía dentro del link
`file`: Ruta del archivo donde se encontró el link }]
*/
