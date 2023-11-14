#!/usr/bin/env node
// Establececr este archivo como el ejecutable

// Aquí se invoca a la función con la ruta que queremos probar
const index = require('./src/index');
const { mdLinks } = index;

const process = require('node:process');

const Table = require('cli-table3');
const colors = require('colors');
colors.enable();

// const args = process.argv.slice(2); // Elimina los primeros dos argumentos que son "node" y el nombre del script
const route = process.argv[2]; //Extraer el primer argumento
const options = {
	validate: process.argv.includes('--validate'),
	stats: process.argv.includes('--stats'),
};

//const path = process.argv[2]; // El argumento despues de "node md-links.js" es el path
//const validate = process.argv[3]; // El segundo argumento (opcional) será validate

// Comprobar si se ingreso una ruta
if (!route) {
	console.error('Ingresa una ruta valida');
	process.exit(1); // Salir del programa  ERROR
}

if (route) {
	mdLinks(route, options)
		.then((links) => {
			// Mostrar estadísticas
			if (options.stats) {
				displayStats(links);
			} else {
			// Estructurar en tabla
				const table = new Table({
					head: options.validate
						?[
							'Link'.magenta.bold,
							'Text'.magenta.bold,
							'File'.magenta.bold,
							'Status'.magenta.bold,
							'Message'.magenta.bold,
						]
						:[
							'Link'.magenta.bold,
							'Text'.magenta.bold,
							'File'.magenta.bold,
						],
					colWidths: [30, 30, 30, 15, 15],
					colAligns: ['left', 'left', 'left', 'center', 'center'],
				});
				// Aplicar colores a la salida
				links.forEach((link) => {
					if (options.validate) {
						const statusColor = link.status === 'OK' ? 'green' : (link.status === 'ERROR' ? 'red' : 'yellow');
						const messageColor = link.message === 'OK' ? 'green' : (link.message === 'FAIL' ? 'red' : 'yellow');
						// Agregar filas a la tabla con colores
						table.push([
							link.href.brightBlue,
							link.text.cyan,
							link.file.white,
							link.status[statusColor],
							link.message[messageColor],
						]);
					} else {
						table.push([
							link.href.brightBlue,
							link.text.cyan,
							link.file.white,
						]);
					}
				});
				console.log(table.toString());
			}
		})
		.catch((error) => {
			console.error(`Error: ${error.message}`.red);
		});
}

// Función para mostrar estadísticas
function displayStats(links) {
	const validLinks = links.filter((link) => link.message === 'OK'); 
	const brokenLinks = links.filter((link) => link.message === 'FAIL' || link.status === 'ERROR');
	console.log('Cantidad de links:'.brightBlue, links.length);
	console.log('Enlaces válidos:'.green, validLinks.length);
	console.log('Enlaces rotos:'.red, brokenLinks.length);
}

/*
mdLinks('prueba.md')
	.then((links) => {
		console.log(links);
	})
	.catch((error) => {
		console.error(error);
	});
*/