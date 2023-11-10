// FUNCIONES QUE MANEJAN LOS ARCHIVOS //
const fs = require('node:fs/promises');
// const { marked } = require('marked');
// const md = require('markdown-it')();

// Función para leer el contenido del archivo y retornar su contenido
// Módulo fs. Usar readFile, NO readFileSync
function fileContent(file) {
	// console.log('Leyendo archivo...', file);
	return fs.readFile(file, 'utf-8')
		.then((data) => {
			// console.log('El contenido del archivo es:', data);
			return data;
		})
		.catch((err) => {
			// console.error('Error', err);
			if (err.code === 'ENOENT') {
				throw new Error(`El archivo no existe: ${file}`);
			} else {
				throw err;
			}
		});
}

// Función para encontrar links y retornarlos en un arreglo
function linksArray(data, file) {
	// console.log(data);
	const links = [];
	const urlRex = /\[([^\]]*)\]\(([^)]*)\)(?:\s*\{([^}]*)\})?/g;

	let linkMatch;
	while ((linkMatch = urlRex.exec(data))) {
		const text = linkMatch[1];
		const href = linkMatch[2];
		links.push({ href, text, file });
	}
	// console.log(links);
	return links;
}

// const linkMatch = data.match(urlRex);
// linkMatch.forEach(console.log);

//const tokens = md.parse(data, {references: {}}); 
//const links = [];
//console.log(tokens);
//console.log(tokens[0].children[4]);
// tokens.map((token) => {
// 	if (token.type === 'inline' && !token.content.startsWith('!')) {
// 		const content = token.content;
// 		const urlRex = /\[(.*?)\]\((.*?)\)/; /\[([^\]]+)\]\((https[^\s)]+)\)/g
// 		const linkMatch = content.match(urlRex);
// 		if (linkMatch) {
// 			const text = linkMatch[1];
// 			const href = linkMatch[2];
// 			// const file = clc.magentaBright(file);
// 			links.push({ href, text, file });
// 		}
//	}
//});
//return links;


// Función para validar links
function validateLinks(links) {
	// console.log('Validando links...');
	return Promise.all(links.map((link) => {
		return fetch(link.href)
			.then((response) => {
				if (response.ok) {
					return response.text()
						.then(() => {
							return {
								...link,
								status: response.status.toString(),
								message: 'OK',
							};
						});
				} else {
					return {
						...link,
						status: response.status.toString(),
						message: 'FAIL',
					};
				}
			})
			.catch((err) => {
				return {
					...link,
					status: 'ERROR',
					message: err.message,
				};
			});
	}));
}

module.exports = {
	fileContent, linksArray, validateLinks,
};


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

/*
[{ `href`: URL encontrada
`text`: Texto que aparecía dentro del link
`file`: Ruta del archivo donde se encontró el link }]
*/

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