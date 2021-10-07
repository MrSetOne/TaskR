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

//La lista de las tareas de prueba
let TaskList = [
    {done: false, description: 'tuputamadre'},
    {done: false, description: 'esunaguarra'},
    {done: true, description: 'eso'},
    {done: true, description: 'tafeo'},
    {done: false, description: 'esunaguarra'},
    {done: true, description: 'eso'},
    {done: false, description: 'esunaguarra'},
    {done: false, description: 'eso'},
    {done: true, description: 'esunaguarra'},
    {done: true, description: 'eso'},
];

//Imprimir en pantalla las tareas
function printTaskList (){
    console.log ('La lista de tareas actual es: ');
    for(i = 0; i<TaskList.length; i++){
        if (TaskList[i].done){
            console.log (i, TaskOK, TaskList[i].description);
        } else {
            console.log(i, TaskKo, TaskList[i].description);
        }
    }
}

//Marcado de check
function checker(){
    console.log ("La mision de esto es ver si puedo tachar esta mierda");
    printTaskList();
    rl.question("indica el numero de lo que quieres tachar", function (indice) {
        TaskList[indice].done = true;
        checker();
    }
)};




//Borrar tareas realizadas
function clearCheckeds(){
    console.log('Vamos a probar si se pueden borrar las tareas realizadas...');
    printTaskList();
    rl.question('¿Seguro de borrar las tareas realizadas?', function (respuesta){
        if (respuesta === 's'){
            for (i = 0; i < TaskList.length; i++){
                if (TaskList[i].done){
                    TaskList.splice(i, 1);
                    i --;
                }
            }
        }printTaskList();
    });
};

clearCheckeds();
