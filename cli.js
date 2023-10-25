// Aquí se invoca a la función con la ruta que queremos probar
const mdLinks = require('./src/index');

mdLinks('prueba.md', true)
  .then((links) => {
    console.log(links);
  });
  .catch((error) => {
    console.error(error);
  });
