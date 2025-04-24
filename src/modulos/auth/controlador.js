const db = require('../../DB/mysql');
const bcrypt = require('bcrypt');
const auth = require('../../auth');

const TABLA = 'auth';
const inicio = 1;
const fin = 6;

module.exports = function (dbInyectada) {

    let db = dbInyectada;
    
    if (!db) {
        db = require('../../DB/mysql');
    }

    async function login(usuario, password) {
        const data = await db.query(TABLA, {usuario: usuario});

        return bcrypt.compare(password, data.password)
            .then((res) => {
                if (res) {
                    return auth.asignarToken(...data);
                } else {
                    throw new Error('Contraseña incorrecta');
                }
            })
            .catch((err) => {
                throw new Error('Error al comparar contraseñas: ' + err.message);
            });
    }
    
    async function agregar(data) {

        const authData = {
            id: data.id,
        }

        if(data.usuario){
            authData.usuario = data.usuario;
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password.toString(), 5);
        }

        return db.agregar(TABLA, authData);
    }

    return {
    agregar
    }
};