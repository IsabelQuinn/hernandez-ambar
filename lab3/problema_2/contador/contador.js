const form = document.getElementById("form"); //form es el formulario

form.addEventListener('submit', handleForm);

// Funciones
function handleForm(event) { // Esto evita que el formulario refresque la página para no perder la respuesta
    event.preventDefault(); 
} 

function contar() {
    // Inicio del proceso
    var str = document.getElementById('word').value.toLowerCase();

    str = str.replace(/\s/g, "");

    let final = {}; // Donde guardamos los resultados

    for (let char of str) { // Tomamos cada carácter de la cadena
        if (final[char]) { // Si ya existe, simplemente aumentamos el contador
            final[char]++;
        } else { // Si no existe, lo inicializamos a 1
            final[char] = 1;
        }
    }

    // Creamos el HTML para mostrar visualmente la respuesta
    let tmp = `<h2>Letras:</h2>`;
    Object.keys(final).forEach(function(letra) {
        tmp += `<strong>${letra}</strong>: <strong>${final[letra]}</strong> <br>`;
    });

    // Agregamos la respuesta a index.html
    document.getElementById("respuesta").innerHTML = tmp;
    document.getElementById('btn-clear').style.visibility = 'visible';
}

function limpiar() {
    form.reset();
    document.getElementById("respuesta").innerHTML = "";
    document.getElementById('btn-clear').style.visibility = 'hidden';
}
