const {describe, it, expect } = require('@jest/globals');
const { typeofPath, transformPath, existingRoute, isMarkdown } = require('../src/functions/pathFunctions');

// Tipo de ruta
describe('typeofPath()', () => {
	it('debería retornar true si la ruta es absoluta', () => {
		const result = typeofPath('/Users/brenda/DEV010-md-links/prueba.md');
		expect(result).toBe(true);
	});
});

describe('typeofPath()', () => {
	it('debería retornar false si la ruta NO es absoluta', () => {
		const result = typeofPath('prueba.md');
		expect(result).toBe(false);
	});
});

// Transformar ruta
describe('transformPath()', () => {
	it('debería transformar una ruta relativa en absoluta', () => {
		const result = transformPath('prueba.md');
		expect(result).toEqual('/Users/brenda/DEV010-md-links/prueba.md');
	});
});

// ¿La ruta existe?
describe('existingRoute()', () => {
	it('debería retornar una promesa que resuelve si la ruta existe', () => {
		return existingRoute('/Users/brenda/DEV010-md-links/prueba.md')
			.then(() => {
				// La promesa se resuelve si la ruta existe
				expect(true).toBe(true);
			})
			.catch(() => {
				// La promesa se rechaza si la ruta no existe
				expect(false).toBe(true);
			});
	});
});

describe('existingRoute()', () => {
	it('debería enviar un error si la ruta no existe', () => {
		return existingRoute('prueba.js')
			.then(() => {
				expect(true).toBe(false);
			})
			.catch((error) => {
				// La promesa se rechazó debido a un error
				expect(error instanceof Error).toBe(true);
				expect(error.message).toBe('La ruta no existe');
			});
	});
});

// Revisar si es Markdown
describe('isMarkdown()', () => {
	it('debería retornar la ruta si el archivo es markdown', () => {
		const result = isMarkdown('/Users/brenda/DEV010-md-links/prueba.md');
		expect(result).toBe('/Users/brenda/DEV010-md-links/prueba.md');
	});
});

describe('isMarkdown()', () => {
	it('debería retornar un error si el archivo NO es markdown', () => {
		expect(() => {
			isMarkdown('prueba.js');
		}).toThrowError('La extensión no es markdown');
	});
});