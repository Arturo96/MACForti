let c = console.log,
    fs = require('fs');
archivo = fs.readFileSync('MAC.txt', 'utf-8'); // Guardamos en la vble archivo todo el contenido del texto

let archivo_aux = archivo.replace(/next/g, 'next;'), // Le agregamos punto y coma a los next para despues crear un arreglo con los objetos
    perfiles = archivo_aux.split(';');
perfiles.pop(); // La ultima posicion del arreglo quedaba vacia, esto es para eliminarla

let arregloPerfiles = []; // Arreglo de objetos tipo Perfil que va a contener el nombre y la MAC

perfiles.forEach((perfil, index) => {
    let lineas = perfil.split('\n'); // Obtenemos las lineas de cada perfil en un arreglo

    let num_spaces = 0; // Vble para contar el numero de espacios que haya entre cada perfil, esto para validar los espacios

    lineas.forEach((linea, index) => { // Recorremos las lineas de cada perfil y si hay espacios entre perfiles los contamos
        if (linea.length == 1) num_spaces++;
    });

    lineas.splice(0, num_spaces); //Eliminamos los espacios que hayan entre perfiles

    let nombre = lineas[0].trim().substr(5); // Obtenemos el nombre del perfil y le quitamos los espacios que habian antes del edit para empezar en la pos 5
    let MAC;

    lineas.forEach((linea, index) => { // Si la linea incluye : es por que ahi está la MAC
        if (linea.includes(':')) {
            MAC = linea.trim().substr(8)
        }
    })
    // c(`Nombre: ${nombre}`);
    // c(`MAC: ${MAC}`);

    arregloPerfiles.push({ nombre, MAC }); // Agregamos al arreglo de objetos cada objeto Perfil con su estructura

});

// Pasar en un texto los objetos con las instrucciones de MAC y el nombre

let texto = 'config firewall address\n';

arregloPerfiles.forEach(perfil => {
    let plantilla = `edit ${perfil.nombre}
     set type mac
     set start-mac ${perfil.MAC}
     set end-mac ${perfil.MAC}
     set color 2
next\n`;
    texto += plantilla;
});


// Crear o sobreescribir el archivo MAC-result.txt con los objetos de perfiles ya organizados

fs.writeFile('MAC-result.txt', texto, err => {
    if (err) throw err;
    c('Archivo creado satisfactoriamente');
});


