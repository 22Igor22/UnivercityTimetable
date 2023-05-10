exports.Error401 = (res) => {
    res.status(401).send("Not enough rights");
}

exports.Error404 = (res) => {
    res.status(404).send("Resource not found");
}

exports.Error405 = (res) => {
    res.status(405).send("Method not allowed");
}
exports.Error500 = (res, error) => {
    res.status(500).send(`Internal error server (${error.message})`);
}