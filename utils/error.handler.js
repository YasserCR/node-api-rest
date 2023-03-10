const handleHttpError = (res, message = "Something is wrong", code = 403) => {
    res.status(code);
    res.send({ error: message })
}

module.exports = { handleHttpError }