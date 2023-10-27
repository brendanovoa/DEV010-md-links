// Aquí se invoca a la función con la ruta que queremos probar
const index = require('./src/index');
const { mdLinks } = index;

mdLinks('prueba.md')
	.then((links) => {
		console.log(links);
	})
	.catch((error) => {
		console.error(error);
	});