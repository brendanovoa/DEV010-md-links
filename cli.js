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
	// stats: args.includes("--stats"),
};

//const path = process.argv[2]; // El argumento despues de "node md-links.js" es el path
//const validate = process.argv[3]; // El segundo argumento (opcional) será validate

if (route) {
	mdLinks(route, options.validate)
		.then((links) => {
			// Estructurar en tabla
			const table = new Table({
				head: [
					'Link'.magenta.bold,
					'Text'.magenta.bold,
					'File'.magenta.bold,
					'Status'.magenta.bold,
					'Message'.magenta.bold,
				],
				colWidths: [30, 30, 30, 15, 15],
				colAligns: ['left', 'left', 'left', 'center', 'center'],
			});
			// Aplicar colores a la salida
			links.forEach((link) => {
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
				/*
				console.log(`Link: ${link.href.magenta}`);
				console.log(`Text: ${link.text.brightBlue}`);
				console.log(`File: ${link.file.cyan}`);
				console.log(`Status: ${link.status[statusColor]}`);
				console.log(`Message: ${link.message[messageColor]}`);
				console.log('---');*/
			});
			console.log(table.toString());
		})
		.catch((error) => {
			console.error(`Error: ${error.message}`.red);
		});
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