const db = require('../../DB/mysql');

const TABLA = 'usuarios';
const inicio = 1;
const fin = 6;

module.exports = function (dbInyectada) {

    let db = dbInyectada;
    
    if (!db) {
        db = require('../../DB/mysql');
    }

    function todos() {
        return db.todos(TABLA, inicio, fin);
    }
    
    function uno(id) {
        return db.uno(TABLA, id);
    }
    
    function agregar(body) {
        return db.agregar(TABLA, body);
    }
    
    function eliminar(body) {
        return db.eliminar(TABLA, body);
    }

    return {
    todos,
    uno,
    agregar,
    eliminar
    }
};