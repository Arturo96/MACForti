let c = console.log,
    fs = require('fs');
    archivo = fs.readFileSync('MAC.txt', 'utf-8');

let archivo_aux = archivo.replace(/next/g, 'next;'),
    perfiles    = archivo_aux.split(';');
    perfiles.pop();

let arregloPerfiles = [];

perfiles.forEach((perfil, index) => {
    let lineas = perfil.split('\n');
    if(index != 0) {
        lineas.reverse();
        lineas.pop();
        lineas.reverse();
    }
    
    let nombre = lineas[0].substr(5);
    let MAC;
    
     lineas.forEach((linea, index) =>  {
         if(linea.includes(':')) MAC = linea.trim().substr(8);
          
     });

     c(`Nombre: ${nombre}`);
     c(`MAC: ${MAC}`);

     arregloPerfiles.push({nombre, MAC});
     
});

c(arregloPerfiles[2].MAC);

// fs.appendFile('MAC-result.txt', archivo.replace(/linea/gi, "prueba"), err => {
//     if (err) throw err;
//     c('Archivo creado satisfactoriamente');
// } );
// // c(archivo.replace(/linea/gi, "prueba"));


