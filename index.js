//Librerias que se van a usar
const moment = require('moment');
const readline = require('readline');

//Interfaz de readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Mascas de si las tareas estan realizadas
const TaskOK = "[X]"
const TaskKo ='[ ]'

//La lista de las tareas
let TaskList =[]


/*DECLARACION DE FUNCIONES*/


//Imprimir en pantalla las tareas
function printTaskList (){
    if (TaskList.length == 0){
        console.log ('\n\n\n-------------------------------');
        console.log ('La lista de tareas esta vacia');
        console.log ('-------------------------------\n\n');
        MaimMenu();
    }else{
        console.log ('\n\n\n\n-------------------------------');
        console.log ('La lista de tareas actual es: ');
        console.log ('-------------------------------');
        for(i = 0; i<TaskList.length; i++){
            if (TaskList[i].done){
                console.log ((i + 1), TaskOK, TaskList[i].description);
            } else {
                console.log((i + 1), TaskKo, TaskList[i].description);
            }
        }
    }
    
};

//Añadir tarea (Se añade a base de datos)
function addTask (TaskList, taskDescription){
    TaskList.push ({done: false, description: taskDescription});
};

//Seguir añadiendo tareas
function moreTask (){
    rl.question ('¿Quieres añadir mas tareas? (s/n)', function(seguirAñadiendo) {
        if (seguirAñadiendo === 's' || seguirAñadiendo === 'S'){
            askForTasks(TaskList);
        }else if (seguirAñadiendo === 'n' || seguirAñadiendo === 'N'){
            MaimMenu();
        }else{
            console.log('\n\nDisculpa, no has añadido un valor valido.\n-Selecciona (s) en caso de (si)\n-Selecciona (n) en caso de (no)');
            moreTask();
        }
    });
}

//Añadir tarea con Readline
function askForTasks(TaskList){
    console.log ('Para volver al menu principal escribe back');
    rl.question('Añade la nueva tarea: ', function(taskdesc) {
        if (taskdesc === 'back'){
            MaimMenu();
        }else{
            addTask(TaskList, taskdesc);
            console.log('La lista de tareas actual es: ');
            printTaskList(TaskList);
            moreTask();
        }       
    });
};

//Sistema de Check
function checker() {
    printTaskList();
    console.log("Back para volver");
    rl.question ("Selecciona la tarea que quieres marcar como realizada: ", function (index) {
        if (index >= 1 && index < (TaskList.length + 1) ){
            TaskList[(index - 1)].done = true;
            checker();
        }else if(index == 'back'){
            MaimMenu();
        }else{
            console.log("El numero que indicas no es valido");
            checker();
        }
    });
};

//Sistema de exit
function exitting(){
    rl.question('¿Seguro de que quieres salir? (s/n): ', function (sureExit){
        if (sureExit === 's' || sureExit === 'S'){
            rl.close();
            console.log('\nMuchas gracias por probar mi programa, sé que es muy feo pero lo he hecho con todo mi corazón, GG :)\n');
        } else if (sureExit === 'n' || sureExit === 'N'){
            MaimMenu();
        } else {
            console.log ('\nDisculpa, no has añadido un valor valido.\n-Selecciona (s) en caso de (si)\n-Selecciona (n) en caso de (no)\n');
            exitting();
        };
    });    
};

//Menú principal
console.log('\nBienvenido BetaTasker, un programa desarrollado por Michael Lara, gracias a los cursos de mastermind.\n')
function MaimMenu (){
    console.log ('\n---------------');
    console.log ('MENU PRINCIPAL');
    console.log ('---------------\n');
    console.log ('1.Ver la lista de tareas\n2.Añadir nueva tarea\n3.Dale check a las tareas ralizadas\n4.Limpiar tareas ralizadas\n5.Salir');
    rl.question('Seleccione una opcion: ', function (modo){
        switch(modo){
            case '1':
                printTaskList();
                MaimMenu();
                break;
            case '2':
                askForTasks(TaskList);
                break;
            case '3':
                checker();
                break;
            case '4':
                console.log('De momento este modo no está listo, en breves lo estará.');
                MaimMenu();
                break;         
            case '5':
                exitting();           
                break;
            default:
                console.log('\nLo siento, el numero que indicas no figura en el menú.');
                MaimMenu();
        }
    
    });
}

MaimMenu();


/*Cosas que mejorar:

[X] 1.Hacer que en la funcion de marcar se marque el numero que indicas, es decir, al numero que introduces restarle 1
[X] 2.Hacer un default y arreglar el exit, quitar el 99
[ ] 3.Hacerlo mas bonito en general
[X] 4.GG bro.
[ ] 5.Investigar si se pueden borrar datos de los arrays
    [ ] 5.1. https://love2dev.com/blog/javascript-remove-from-array/#remove-from-array-splice-value
    [ ] 5.2. Con eso puede hace un if y si la condicion de done es true borrarlo
[X] 7.Añadir la opcion de back en "añadir nueva tarea"
[X] 8.Mejorar la opcion de "seguir añadiendo nuevas tareas", para al meter algo que no sea n/s te vuelva a preguntar
[ ] 9.Hacer que cada "seccion" tenga como standard 3 /n
[ ] 10.Pregunta si esta seguro de salir antes de que cierre la app
[X] 11.Generar una funcion para "Seguir añadiendo tareas", para poder hacer back en caso de que se introduzca un valor erroneo.

*/
