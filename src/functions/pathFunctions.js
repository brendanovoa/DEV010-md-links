// FUNCIONES QUE MANEJAN LAS RUTAS //
const path = require('node:path');
const fs = require('node:fs/promises');

// Función para revisar si la ruta es relativa o absoluta
function typeofPath(route) {
	const absolutePath = path.isAbsolute(route);
	console.log('¿La ruta es absoluta? ', absolutePath);
	return absolutePath;
}

// Función para transformar ruta relativa a absoluta
function transformPath(route) {
	console.log('Transformando ruta relativa en absoluta');
	const absolutePath = path.resolve(route);
	console.log('Ruta absoluta: ', absolutePath);
	return absolutePath;
}

// Función para verificar que la ruta existe
function existingRoute(route) {
	return fs.access(route)
		.then(() => true) // La ruta existe
		.catch(() => {
			throw new Error('La ruta no existe');
		});
}
/* const routeExists = fs.access(route);
if (!routeExists) throw new Error('La ruta no existe');
console.log('¿La ruta existe? ', routeExists);
return routeExists; */

// Función para verificar si son archivos markdown
function isMarkdown(route) {
	const markdownExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
	const extension = path.extname(route);
	console.log('La extensión es: ', extension);
	if (markdownExtensions.includes(extension)) {
		return route;
	}
	throw new Error('La extensión no es markdown');
}

module.exports = {
	typeofPath, transformPath, existingRoute, isMarkdown,
};
