let primerCuadro = null;
let turnos = 0;
let paresConseguidos = 0;
const start = Date.now();

randomizar();

function randomizar() {
    const colores = ['rojo', 'verde', 'amarillo', 'azul', 'blanco', 'negro'];
    const coloresRepetidos = colores.concat(colores);
    const coloresRandomizados = coloresRepetidos.sort(() => Math.random() - 0.5);

    const cuadros = document.getElementsByClassName('cuadro');
    for (let i = 0; i < cuadros.length; i++) {
        cuadros[i].classList.add(coloresRandomizados[i]);
    }
}

document.getElementById('tablero').onclick = function (e) {
    const evento = e.target;
    if (evento.classList.contains('cuadro')) {
        manejarJuego(evento);
    }
}

function manejarJuego(cuadro) {
    if (primerCuadro === null) {
        primerCuadro = cuadro;
        primerCuadro.style.opacity = 1;
    } else {
        if (primerCuadro === cuadro) {
            return;
        }
        
        turnos++;
        
        if (cuadrosIguales(primerCuadro, cuadro)) {
            eliminarCuadros(primerCuadro, cuadro)
            paresConseguidos++;
        } else {
            primerCuadro.style.opacity = 0;
        }

        primerCuadro = null;
        
    }
}

function cuadrosIguales(primerCuadro, cuadro) {
    return primerCuadro.className === cuadro.className; 
}

function eliminarCuadros(primerCuadro, cuadro) {
    cuadro.style.opacity = 1;
    setTimeout(function () {
        primerCuadro.parentElement.classList.add('gris');
        primerCuadro.remove();
        cuadro.parentElement.classList.add('gris');
        cuadro.remove();
    }, 1000);

    evaluarJuego();

}

function evaluarJuego() {
    const end = Date.now();
    setTimeout(function () {
        if (paresConseguidos === 6) {
            document.getElementById('tablero').classList.add('oculto');
            document.getElementById('fin').innerText = 'Terminaste en un total de ' + turnos + ' turnos con ' + Math.round((end - start) / 1000) + ' segundos';
        }
    }, 1000);
}
