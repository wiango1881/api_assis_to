const express = require('express');

const respuesta = require('../../red/respuestas');
const controlador = require('./index');

const router = express.Router();

async function login(req, res, next) {
    try {
        const token = await controlador.login(req.params.usuario, req.body.password);
        respuesta.success(req, res, token, 200); 
    }
    catch (err) {
        next(err);
    }
}

module.exports = router;