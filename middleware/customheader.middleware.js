const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key;
        if (apiKey === "public-api") {
            next();
        } else {
            res.status
            res.send({ error: "Incorrect api_key" });
        }
    } catch (e) {
        res.status(403);
        res.send({ error: "Something is wrong in the custom header" });
    }
}

module.exports = customHeader;