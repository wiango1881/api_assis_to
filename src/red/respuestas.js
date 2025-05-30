exports.success = (req, res, message, status) => {
    if (status === undefined) {
        status = 200;
    }
    res.status(status).send({
        error: false,
        status: status,
        body: message
    });
}

exports.error = (req, res, message, status) => {
    if (status === undefined) {
        status = 500;
    }
    res.status(status).send({
        error: true,
        status: status,
        body: message
    });
}