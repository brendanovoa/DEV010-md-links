const {describe, it, expect } = require('@jest/globals');
const { fileContent, linksArray } = require('../src/functions/fileFunctions');

// Leer el contenido de archivo
describe('fileContent()', () => {
	it('debería retornar el contenido del archivo', () => {
		return fileContent('/Users/brenda/DEV010-md-links/prueba.md')
			.then(() => {
				expect(true).toBe(true);
			})
			.catch(() => {
				expect(false).toBe(true);
			});
	});
});

describe('fileContent()', () => {
	it('debería enviar un error si el contenido del archivo no se recibe', () => {
		return fileContent('/Users/brenda/DEV010-md-links/prueba.md')
			.then(() => {
				expect(true).toBe(false);
			})
			.catch((error) => {
				expect(error instanceof Error).toBe(true);
			});
	});
});

// Devolver un array de links
describe('linksArray()', () => {
	it('debería retornar un arreglo con 3 enlaces y sus propiedades', () => {
		const result = linksArray('/Users/brenda/DEV010-md-links/prueba.md');
		const data = `[
            {
              href: 'https://es.wikipedia.org/wiki/Markdown',
              text: 'Markdown',
              file: '/Users/brenda/DEV010-md-links/prueba.md'
            },
            {
              href: 'https://nodejs.org/',
              text: 'Node.js',
              file: '/Users/brenda/DEV010-md-links/prueba.md'
            },
            {
              href: 'https://www.npmjs.com/',
              text: 'Sitio oficial de npm (en inglés)',
              file: '/Users/brenda/DEV010-md-links/prueba.md'
            }
          ]`;
		expect(result).toHaveBeenCalledWith(data);
		expect(result).toContain('https://nodejs.org/');
		expect(result).arrayContaining(array);
		expect(result).toHaveLength(3);
	});
});

/* const file = '/Users/brenda/DEV010-md-links/prueba.md';
		const data = `## 1. Links
        [Markdown](https://es.wikipedia.org/wiki/Markdown) 
        [Node.js](https://nodejs.org/)
        [Sitio oficial de npm (en inglés)](https://www.npmjs.com/)
        ## 2. Imágenes
        ![md-links](https://github.com/Laboratoria/bootcamp/assets/12631491/fc6bc380-7824-4fab-ab8f-7ab53cd9d0e4)`;
		const result = linksArray(data, file);
		expect(result).toHaveLength(3);
		result.forEach((link) => {
			expect(link).toHaveProperty('text');
			expect(link).toHaveProperty('href');
			expect(link).toHaveProperty('file', file);
		});*/
