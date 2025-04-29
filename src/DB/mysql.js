const mysql = require('mysql2');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig);
    conexion.connect((err) => {
        if (err) {
            console.log('[db err]', err);
            setTimeout(conMysql, 200);
        }else{
            console.log('Conexión establecida.');
        }        
    });
    conexion.on('error', (err) => {
        console.log('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql();
        } else {
            throw err;
        }
    })
}
conMysql();

function todos(tabla, inicio = 1, fin = 30) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} LIMIT ${inicio},${fin}`, (err, result) => {
            return err ? reject(err) : resolve(result);                resolve(result);                      
        })
    });
}

function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ${id}`, (err, result) => {
            return err ? reject(err) : resolve(result);            
        });
    });
}

function agregar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data,data], (err, result) => {
            return err ? reject(err) : resolve(result);            
        });
    });
}

function eliminar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, data.id, (err, result) => {
            return err ? reject(err) : resolve(result);          
        });
    });
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar
};