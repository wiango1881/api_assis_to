const respuesta = require('./respuestas');

function errors(err, req, res, next) {
    console.error('Error:', err);

    const message = err.message || 'Internal Server Error';
    const status = err.statusCode || 500;

    respuesta.error(req, res, message, status);
}

module.exports = errors;