// FUNCIONES QUE MANEJAN LOS ARCHIVOS //
const fs = require('node:fs/promises');
const { marked } = require('marked');
const md = require('markdown-it')();

// Función para leer el contenido del archivo y retornar su contenido
// Módulo fs. Usar readFile, NO readFileSync
function fileContent(file) {
  console.log('Leyendo archivo...');
  const content = fs.readFile(file, 'utf-8');
  console.log('El contenido del archivo es: ', content);
  return content;
}

// Función para encontrar links y retornarlos en un arreglo
function linksArray(content, file) {
  const tokens = md.parse(content);
  const links = [];

  tokens.map((token, index, arr) => {
    if (token.type === 'link_open') {
      const href = arr[index + 1]?.content;
      const text = arr[index + 2]?.content;
      if (href && text) {
        links.push({ href, text, file });
      }
    }
  });

  return links;
}

module.exports = {
  fileContent, linksArray,
};

/*
[{ `href`: URL encontrada
`text`: Texto que aparecía dentro del link
`file`: Ruta del archivo donde se encontró el link }]
*/
