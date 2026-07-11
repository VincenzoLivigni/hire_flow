const jwt = require("jsonwebtoken")
const db = require("../config/db")
const bcrypt = require("bcryptjs")

// REGISTRAZIONE
exports.register = (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Email e password sono requisiti richiesti!" })
    }

    // creo un hash della password per non salvarla in chiaro nel db
    const hashedPassword = bcrypt.hashSync(password, 12)

    // salvo il nuovo utente nel db
    db.query(
        "INSERT INTO users (email, password) VALUES (?,?)",
        [email, hashedPassword],
        (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: "Errore server" })
            }

            res.status(201).json({
                message: "Registrazione effettuata con successo!",
                id: result.insertId
            })
        }
    )
}

// ACCESSO
exports.login = (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Email e password sono richiesti!" })
    }

    // cerco l'utente dal db tramite email
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: "Errore server" })
            }

            if (result.length === 0) {
                return res.status(400).json({ message: "Utente non trovato!" })
            }

            const user = result[0]

            // confronto la password con quella salvata come hash nel db
            const passwordMatched = bcrypt.compareSync(password, user.password)
            if (!passwordMatched) {
                return res.status(400).json({ message: "Password errata!" })
            }

            // creo token jwt per permettere all'utente di accedere alle rotte protette
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                // tempistica validità token
                { expiresIn: "12h" }
            )

            // invio il token al frontend
            res.status(200).json({
                message: "Login effettuato con successo!",
                token
            })
        }
    )
}