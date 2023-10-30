const pathFunctions = require('./functions/pathFunctions');
const { typeofPath, transformPath, existingRoute, isMarkdown } = pathFunctions;

const fileFunctions = require('./functions/fileFunctions');
const { fileContent, linksArray, validateLinks } = fileFunctions;

// Crear función mdLinks(path)
function mdLinks(route, validate) {
	// Crear una promesa que resuelva un array con los links
	return new Promise((resolve, reject) => {
		// Revisar si la ruta es relativa o absoluta
		const absolutePath = typeofPath(route);
		let resolvedPath = '';
		if (!absolutePath) {
			// Convertir ruta relativa en absoluta
			resolvedPath = transformPath(route);
		} else {
			resolvedPath = route;
		}
		// Comprobar que la ruta exista
		existingRoute(resolvedPath)
			// Revisar si es un archivo Markdown
			.then(() => isMarkdown(resolvedPath))
			// Leer el archivo y retornar su contenido
			.then(() => fileContent(resolvedPath))
			// Encontrar links y retornarlos en un arreglo como resolución de la promesa
			.then((data) => {
				const links = linksArray(data, resolvedPath);
				if (validate) {
					// Validar links
					return validateLinks(links);
				} else {
					return links;
				}
			})
			// Resolver promesa
			.then((links) => {
				resolve(links);
			})
			// En caso de error rechazar la promesa
			.catch((error) => {
				reject(error);
			});
	});
}

module.exports = {
	mdLinks
};

/*
NOTAS:

const stats = fs.statSync('./prueba.md');

  stats.isFile(); //si es un fichero // isDirectory isSymbolicLink
  const filePath = path.join(file) // colocar las partes de la ruta relativa
  fs.stat(filePath)

// Función con calback
fs.readFile(path, 'utf-8', (err, text) => {
    console.group(text)
  })

// Leer directorios
fs.readdir('.', (err, files) => {
  if(err) {
    console.error('Error al leer directorio: ', err)
    return;
  }
  files.forEach(file => {
    console.log(file)
  })
})
*/
