const pathFunctions = require('./functions/pathFunctions');

const {
  typeofPath, transformPath, existingRoute, isMarkdown,
} = pathFunctions;

const fileFunctions = require('./functions/fileFunctions');

const { fileContent, linksArray } = fileFunctions;

// Crear función mdLinks(path)
function mdLinks(route) {
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
      .then((content) => {
        const links = linksArray(content, resolvedPath);
        // Resolver promesa
        resolve(links);
      })
      // En caso de error rechazar la promesa
      .catch((error) => {
        reject(error);
      });
  });
}
mdLinks('prueba.md')
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });

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
