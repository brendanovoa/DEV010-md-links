const {describe, it, expect, afterEach } = require('@jest/globals');
const { fileContent, linksArray, validateLinks } = require('../src/functions/fileFunctions');
// const fetch = require('node-fetch');
// const jest = require('jest');
// const { mock, resetAllMocks, fn } = jest;

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
	it('debería lanzar un error si ocurre un error inesperado', () => {
		// Proporciona una ruta a un archivo que probablemente cause un error
		const invalidFilePath = '/ruta/invalida/pruebaFALSA.md';
	
		return fileContent(invalidFilePath)
			.then(() => {
			// Si la promesa se resuelve, la prueba fallará
				expect(true).toBe(false);
			})
			.catch((error) => {
				expect(error instanceof Error).toBe(true);
			});
	});

	it('debería enviar un error si el contenido del archivo no se recibe', () => {
		return fileContent('/Users/brenda/DEV010-md-links/pruebaFALSA.md')
			.then(() => {
				expect(true).toBe(false);
			})
			.catch((error) => {
				//console.log('Error:', error);
				//console.log('Tipo de error:', typeof error, error.constructor.name);
				expect(error instanceof Error).toBe(true);
			});
	});
});

// Devolver un array de links
describe('linksArray()', () => {
	it('debería extraer los enlaces de un archivo Markdown y devolver un array de objetos', () => {
		const data = `## 1. Links

		[Markdown](https://es.wikipedia.org/wiki/Markdown) 
		
		[Node.js](https://nodejs.org/)
		
		[Sitio oficial de npm (en inglés)](https://www.npmjs.com/)
		
		## 2. Imágenes
		
		![md-links](https://github.com/Laboratoria/bootcamp/assets/12631491/fc6bc380-7824-4fab-ab8f-7ab53cd9d0e4)`;
		const file = '/Users/brenda/DEV010-md-links/prueba.md';
		const result = linksArray(data, file);

		// Verifica la longitud del resultado
		expect(result.length).toBe(4);

		// Verifica que cada objeto tenga las propiedades correctas
		result.forEach((link) => {
			expect(link).toHaveProperty('href');
			expect(link).toHaveProperty('text');
			expect(link).toHaveProperty('file', file);
		});

		// Verifica los valores de los enlaces específicos
		expect(result[0]).toMatchObject({ href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown' });
		expect(result[1]).toMatchObject({ href: 'https://nodejs.org/', text: 'Node.js' });
		expect(result[2]).toMatchObject({ href: 'https://www.npmjs.com/', text: 'Sitio oficial de npm (en inglés)' });
	});
});

// Devolver status de links validados
describe('validateLinks(links)', () => {
	// Mock para fetch
	jest.mock('node-fetch');
	// const mockedFetch = fetch;
	
	// Restaura fetch después de cada prueba
	afterEach(() => {
		jest.resetAllMocks();
	});

	const links = [{
		href: 'https://es.wikipedia.org/wiki/Markdown',
		text: 'Markdown',
		file: '/Users/brenda/DEV010-md-links/prueba.md'
	}];

	it('debería validar los links y retornar su status y mensaje', async () => {
		jest.spyOn(global, 'fetch').mockImplementation(()=>Promise.resolve({
			ok: true,
			status: 200,
			text: jest.fn().mockResolvedValueOnce(''),
		}));
		// Mock de fetch para simular una respuesta exitosa
		/*fetch.mockResolvedValueOnce({
			ok: true,
			status: 200,
			text: jest.fn().mockResolvedValueOnce(''),
		});*/
		
		const result = await validateLinks(links);

		// Verifica que el resultado sea un array
		expect(Array.isArray(result)).toBe(true);

		// Verifica que cada enlace tenga las propiedades status y message
		result.forEach((link) => {
			expect(link).toHaveProperty('status');
			expect(link).toHaveProperty('message');
		});

		// Verifica que el enlace tenga el status y message correctos para respuestas exitosas
		expect(result[0]).toEqual({
			href: 'https://es.wikipedia.org/wiki/Markdown',
			text: 'Markdown',
			file: '/Users/brenda/DEV010-md-links/prueba.md',
			status: '200',
			message: 'OK',
		});
	});

	it('debería manejar enlaces con respuestas no exitosas', async () => {
		jest.spyOn(global, 'fetch').mockImplementation(()=>Promise.resolve({
			ok: false,
			status: 404,
		}));
		/*fetch.mockResolvedValueOnce({
			ok: false,
			status: 404,
		});*/
	
		const result = await validateLinks(links);
	
		// Verifica que el enlace tenga el status y message correctos para respuestas no exitosas
		expect(result[0]).toEqual({
			href: 'https://es.wikipedia.org/wiki/Markdown',
			text: 'Markdown',
			file: '/Users/brenda/DEV010-md-links/prueba.md',
			status: '404',
			message: 'FAIL',
		});
	});

	it('debería manejar enlaces con errores en fetch', async () => {
		jest.spyOn(global, 'fetch').mockImplementation(()=>Promise.reject(new Error('Fetch error')));
		//fetch.mockRejectedValueOnce(new Error('Fetch error'));
	
		const result = await validateLinks(links);
	
		// Verifica que el enlace tenga el status y message correctos para errores en fetch
		expect(result[0]).toEqual({
			href: 'https://es.wikipedia.org/wiki/Markdown',
			text: 'Markdown',
			file: '/Users/brenda/DEV010-md-links/prueba.md',
			status: 'ERROR',
			message: 'Fetch error',
		});
	});
});
