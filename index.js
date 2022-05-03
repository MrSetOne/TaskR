//Librerias que se van a usar
const readline = require('readline');

//Interfaz de readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Mascas de si las tareas estan realizadas
const TaskOK = "[X]"
const TaskKo = '[ ]'

//La lista de las tareas
let TaskList = []


/*DECLARACION DE FUNCIONES*/


//Imprimir en pantalla las tareas
function printTaskList(feedback) {
    function hayFeedback(feedback) {
        if (feedback == false) {
            askMaimMenu();
        }
    };
    console.clear();
    if (TaskList.length == 0) {
        console.log('-------------------------------');
        console.log('La lista de tareas esta vacia');
        console.log('-------------------------------');
        hayFeedback(feedback);
    } else {
        console.log('-------------------------------');
        console.log('La lista de tareas actual es: ');
        console.log('-------------------------------');
        for (i = 0; i < TaskList.length; i++) {
            if (TaskList[i].done) {
                console.log((i + 1), TaskOK, TaskList[i].description);
            } else {
                console.log((i + 1), TaskKo, TaskList[i].description);
            }
        }
        hayFeedback(feedback);
    }

};

//Añadir tarea (Se añade a base de datos)
function addTask(TaskList, taskDescription) {
    TaskList.push({ done: false, description: taskDescription });
};

//Seguir añadiendo tareas
function moreTask() {
    rl.question('¿Quieres añadir mas tareas? (s/n)', function(seguirAñadiendo) {
        if (seguirAñadiendo === 's' || seguirAñadiendo === 'S') {
            askForTasks(TaskList);
        } else if (seguirAñadiendo === 'n' || seguirAñadiendo === 'N') {
            MaimMenu();
        } else {
            console.log('\n\nDisculpa, no has añadido un valor valido.\n-Selecciona (s) en caso de (si)\n-Selecciona (n) en caso de (no)');
            moreTask();
        }
    });
}

//Añadir tarea con Readline
function askForTasks(TaskList) {
    console.clear();
    if (TaskList.length == 0) {
        console.log('-------------------------------');
        console.log('La lista de tareas esta vacia');
        console.log('-------------------------------');
    } else {
        printTaskList(true);
    }
    console.log('Para volver al menu principal escribe back');
    rl.question('Añade la nueva tarea: ', function(taskdesc) {
        if (taskdesc === 'back') {
            MaimMenu();
        } else {
            addTask(TaskList, taskdesc);
            console.log('La lista de tareas actual es: ');
            printTaskList(true);
            moreTask();
        }
    });
};

//Sistema de Check
function checker() {
    printTaskList();
    console.log("Back para volver");
    rl.question("Selecciona la tarea que quieres marcar como realizada: ", function(index) {
        if (index >= 1 && index < (TaskList.length + 1)) {
            TaskList[(index - 1)].done = true;
            checker();
        } else if (index == 'back') {
            MaimMenu();
        } else {
            console.log("El numero que indicas no es valido");
            checker();
        }
    });
};

//Sistema de exit
function exitting() {
    console.clear();
    rl.question('¿Seguro de que quieres salir? (s/n): ', function(sureExit) {
        if (sureExit === 's' || sureExit === 'S') {
            rl.close();
            console.clear();
            console.log('\nMuchas gracias por probar mi programa, sé que es muy feo pero lo he hecho con todo mi corazón. \n\n:)\n\n');
        } else if (sureExit === 'n' || sureExit === 'N') {
            MaimMenu();
        } else {
            console.log('\nDisculpa, no has añadido un valor valido.\n-Selecciona (s) en caso de (si)\n-Selecciona (n) en caso de (no)\n');
            exitting();
        };
    });
};

//Borrar tareas realizadas
function clearCheckeds() {
    printTaskList();
    rl.question('¿Seguro de borrar las tareas realizadas? (s/n)', function(respuesta) {
        if (respuesta === 's' || respuesta === 'S') {
            for (i = 0; i < TaskList.length; i++) {
                if (TaskList[i].done) {
                    TaskList.splice(i, 1);
                    i--;
                }
            }
            MaimMenu();
        } else if (respuesta === 'n' || respuesta === 'N') {
            MaimMenu();
        } else {
            ('\n\nDisculpa, no has añadido un valor valido.\n-Selecciona (s) en caso de (si)\n-Selecciona (n) en caso de (no)');
            clearCheckeds(); // Esto hace como si no pasara nada, porque vuelves a donde estabas y te borra lo que tenias porque printtasklist lo borra todo
        }
    });
};

//Starter
function Starter() {
    console.clear();
    console.log('\nBienvenido BetaTasker, un programa desarrollado por Michael Lara, gracias a los cursos de mastermind.\n')
    rl.question("Pulsa enter para empezar", function(PrimeraPregunta) {
        if (PrimeraPregunta !== 'patatapodridaqueflipas') {
            MaimMenu();
        }
    });
};

//Consulta de volver al menú
function askMaimMenu() {
    rl.question('Pulsa enter para volver al menu principal', function(Enter) {
        if (Enter !== 'patataasada') {
            MaimMenu();
        }
    })
}

//Menú principal
function MaimMenu() {
    console.clear();
    console.log('---------------');
    console.log('MENU PRINCIPAL');
    console.log('---------------');
    console.log('1.Ver la lista de tareas\n2.Añadir nueva tarea\n3.Dale check a las tareas realizadas\n4.Limpiar tareas ralizadas\n5.Salir');
    rl.question('Seleccione una opcion: ', function(modo) {
        switch (modo) {
            case '1':
                printTaskList(false);
                break;
            case '2':
                askForTasks(TaskList);
                break;
            case '3':
                checker();
                break;
            case '4':
                clearCheckeds();
                break;
            case '5':
                exitting();
                break;
            default:
                console.log('\nLo siento, el numero que indicas no figura en el menú.');
                MaimMenu();
        }

    });
};

Starter();


/*Hoja de ruta:

[X]ver 1.0
    [X] 1.Hacer que en la funcion de marcar se marque el numero que indicas, es decir, al numero que introduces restarle 1
    [X] 2.Hacer un default y arreglar el exit, quitar el 99
    [X] 3.Hacerlo mas bonito en general
    [X] 4.GG bro.
    [X] 5.Investigar si se pueden borrar datos de los arrays
        [X] 5.1. https://love2dev.com/blog/javascript-remove-from-array/#remove-from-array-splice-value
        [X] 5.2. Con eso puede hace un if y si la condicion de done es true borrarlo
    [X] 7.Añadir la opcion de back en "añadir nueva tarea"
    [X] 8.Mejorar la opcion de "seguir añadiendo nuevas tareas", para al meter algo que no sea n/s te vuelva a preguntar
    [X] 9.Hacer que cada "seccion" tenga como standard 3 /n
    [X] 10.Pregunta si esta seguro de salir antes de que cierre la app
    [X] 11.Generar una funcion para "Seguir añadiendo tareas", para poder hacer back en caso de que se introduzca un valor erroneo.

[ ] ver 1.0.1
    [ ] 1.Hacer un booleano en las funciones que tengas preguntas de "sure?" en caso de ser necesario, revisar el caso concreto de "clearchecked"
          (Ej: la solucion que he obtenido para solucionar el "printTaskList")

[ ] ver 1.1
    [ ] 1.Generar una libreria con todas las funciones con la finalidad de simplificar el codigo enhormemente
    [ ] 2.Generar un login (Simple) para que cada usuario tenga su rutina predefinida

[ ] ver 1.2
    [ ] 1.Investigar como hacer un archivo a modo de base de datos para que se puedan almacenar la informacion de los usuarios sin ser necesario entrar al codigo directamente
    [ ] 2.Generar un sistema que permita crear usuarios nuevos
    [ ] 3.Dar al usuario la oportunidad de poder generar y modificar sus propias rutinas, incluso darle la oportunidad de reordenarlas usando es splice explicado en 
        en el punto 5 de la version 1.0

[ ] ver 2.0
    [ ] 1.Dotar al programa de interfaz visual via internet para hacerlo accesible desde cualquier lado

*/