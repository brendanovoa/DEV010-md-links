# Markdown Links
## Analizador de enlaces en archivos Markdown

### Índice
1. Introducción
2. Características
3. Instalación
4. Uso
5. Desarrollo del proyecto
6. Estructura del código
7. Pruebas Unitarias
8. Desarrollado con
9. Autora

[========]

### Introducción
MD-Links es una librería de Node.js y una herramienta de línea de comandos que te permite analizar archivos tipo markdown para extraer y mostrar información sobre los enlaces presentes en ellos.

Esta herramienta es útil para verificar la integridad de los enlaces en este tipo de documentos, identificar enlaces rotos y obtener información sobre ellos como su estado y texto anclado.

Permite analizar archivos con las siguientes extensiones: .md, .mkd, .mdwn, .mdown, .mdtxt, .mdtext, .markdown, .text.

[========]

### Características
**Extracción de Enlaces:** Obtén una lista de enlaces con información como el enlace en sí, el texto descriptivo y el archivo de origen.

**Estadísticas de Enlaces: **Con la opción `--stats`, puedes obtener estadísticas sobre la cantidad total de enlaces, enlaces válidos y enlaces rotos.
[![Ejemplo de estadísticas](https://imgur.com/bbx6Nlv "Ejemplo de estadísticas")](https://imgur.com/bbx6Nlv "Ejemplo de estadísticas")

**Validación de Enlaces:** Utilizando la opción `--validate`, MD-Links verifica el estado de cada enlace haciendo una solicitud HTTP y muestra el código de status de las llamadas junto con un mensaje indicando si la solicitud fue exitosa o falló.
[![Ejemplo Validación de enlaces](https://imgur.com/E4bHkn4 "Ejemplo Validación de enlaces")](https://imgur.com/E4bHkn4 "Ejemplo Validación de enlaces")

[========]

### Instalación
Para utilizar MD-Links, primero, instala la herramienta globalmente con npm en tu terminal:

`npm install -g https://github.com/brendanovoa/md-links.git`

[========]

### Uso
#### Comando Básico

`md-links@brendanovoa ruta/al/archivo.md`

Esto mostrará una tabla con la información básica de los enlaces encontrados.

#### Estadísticas de Enlaces

`md-links@brendanovoa ruta/al/archivo.md --stats`

Obtén estadísticas sobre la cantidad total de enlaces, enlaces válidos y enlaces rotos.

#### Validación de Enlaces

`md-links@brendanovoa ruta/al/archivo.md --validate`

Además de la información básica, muestra el estado de cada enlace y un mensaje de éxito o falla.

[========]

### Desarrollo del proyecto

**Diagrama de Flujo**
Antes de iniciar el desarrollo, se creó un diagrama de flujo que detalla la lógica de la aplicación. Este diagrama describe el proceso que sigue la herramienta desde la recepción de una ruta hasta la extracción y análisis de los enlaces contenidos en un archivo Markdown.

[![Diagrama de flujo](https://imgur.com/gzs66pr "Diagrama de flujo")](https://imgur.com/gzs66pr "Diagrama de flujo")

A continuación, se presenta un desglose paso a paso:

**Entrada de Ruta: **La herramienta recibe una ruta como entrada, ya sea relativa o absoluta, proporcionada por el usuario.
**Verificación de Ruta Absoluta: **Se verifica si la ruta proporcionada es una ruta absoluta utilizando la función typeofPath con el método path.isAbsolute.
**Transformación de Ruta: **Si la ruta no es absoluta, se transforma en una ruta absoluta utilizando la función transformPath con el método path.resolve.
**Verificación de Existencia de Ruta:** Se utiliza la función existingRoute para verificar que la ruta exista en el sistema de archivos mediante fs.access.
**Verificación de Extensión Markdown: **Se emplea la función isMarkdown para asegurarse de que el archivo en la ruta proporcionada sea un archivo Markdown mediante el método path.extname. La función verifica la extensión del archivo y acepta diversas extensiones como .md, .mkd, .mdwn, .mdown, .mdtxt, .mdtext, .markdown, y .text.
**Lectura de Contenido del Archivo: **Se utiliza la función fileContent para leer el contenido del archivo Markdown de manera asíncrona utilizando fs.readFile. Este contenido se almacenará para el siguiente paso.
**Extracción de Enlaces: **Se aplica la función linksArray para analizar el contenido del archivo y extraer todos los enlaces encontrados utilizando expresiones regulares. Cada enlace se representa como un objeto con propiedades como href (URL del enlace), text (texto descriptivo) y file (ruta del archivo de origen).
**Opción --validate: **Si se proporciona la opción --validate, se ejecuta la función validateLinks para validar cada enlace utilizando la información proporcionada por la respuesta HTTP del enlace obtenida mediante node-fetch. Se añaden las propiedades status y message a cada objeto de enlace.
**Resultados Finales:** Los enlaces extraídos, ya sea con o sin validación, se devuelven como un array de objetos. Este resultado es el que se utilizará para generar la salida final.

Este diagrama de flujo proporciona una visión detallada del proceso de la herramienta. Cada función cumple un papel crucial en la ejecución fluida de la herramienta, garantizando una experiencia consistente y fiable para el usuario.

Este enfoque modular y detallado es esencial para comprender cómo la herramienta aborda cada paso del procesamiento de archivos Markdown y la manipulación de enlaces.

[========]

### Estructura del código

El código se ha organizado en módulos para mejorar la legibilidad y la mantenibilidad. Aquí hay un resumen de los módulos clave:

**pathFunctions.js:** Contiene funciones relacionadas con el manejo de rutas, como typeofPath, transformPath, existingRoute y isMarkdown.

**fileFunctions.js: **Agrupa funciones encargadas de la lectura de archivos y el procesamiento de su contenido, como fileContent, linksArray, y validateLinks.

**index.js: **Integra todas las funciones para crear la función principal mdLinks.

**cli.js:** Gestiona la ejecución de la función mdLinks desde la línea de comandos, manejando opciones como `--validate` y `--stats`. También formatea y muestra la salida utilizando las bibliotecas `cli-table3` y `colors.js`.

[========]

### Pruebas Unitarias
El proyecto cuenta con un conjunto sólido de pruebas unitarias implementadas con Jest. Estas pruebas cubren escenarios clave para garantizar la estabilidad y confiabilidad del código.

Se testearon las funcionesde ruta (pathFunctions) y de manejo de archivo (file Functions). También se testeo la función validateLinks que verifica las llamadas HTTP status code utilizando mocks de node-fetch para las promesas obtenidas.

Se obtuvieron los siguientes resultados:

[![Pruebas unitarias](https://imgur.com/mvXpXoc "Pruebas unitarias")](https://imgur.com/mvXpXoc "Pruebas unitarias")

[========]

### Desarrollado con
Node.js, CommonJS y JavaScript Vainilla

[========]

### Autora
Brenda Gisel Hernández Novoa
https://github.com/brendanovoa/md-links.git

https://www.laboratoria.la/
