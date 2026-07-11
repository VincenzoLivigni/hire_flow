const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    // recupero il token dall'header Authorization
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "token inesistente" })
    }

    // estraggo il token dal formato Berer TOKEN e verifico che sia valido
    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "token non valido!" })
    }

    try {
        // verifico che il token sia valido e recupero i dati utente
        const userDecoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = userDecoded
        next()
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({ message: "token non valido oppure scaduto" })
    }
}

module.exports = authMiddleware