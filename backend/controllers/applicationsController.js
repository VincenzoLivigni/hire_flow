const db = require("../config/db")

// CREO UNA NUOVA APPLICATION
exports.create = (req, res) => {
    const userId = req.user.id
    const { company_name, role, location, notes, link_job } = req.body

    if (!company_name || !role) {
        return res.status(400).json({ message: "Company e role sono richiesti!" })
    }

    // salvo la candidatura collegandola all'utente tramite user_id
    const sql = "INSERT INTO applications (user_id, company_name, role, location, notes, link_job) VALUES (?,?,?,?,?,?)"

    db.query(
        sql,
        [userId, company_name, role, location, notes, link_job],
        (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: "Errore server" })
            }
            res.status(201).json({
                message: "Application creata",
                id: result.insertId
            })
        }
    )
}

// RECUPERO TUTTE LE APPLICATION DELL'UTENTE
exports.getAll = (req, res) => {
    const userId = req.user.id

    db.query(
        "SELECT * FROM applications WHERE user_id = ? ORDER BY created_at DESC",
        [userId],
        (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: "Errore server" })
            }
            res.json(result)
        }
    )
}

// MODIFICA DI UNA APPLICATION
exports.update = (req, res) => {
    const { id } = req.params
    // dati modificabili
    const { company_name, role, location, notes, link_job, status } = req.body

    // stati dell'application
    const allowed = ["applied", "interview", "offer", "rejected"]

    if (!company_name || !role) {
        return res.status(400).json({ message: "Company e role sono richiesti!" })
    }

    if (!allowed.includes(status)) {
        return res.status(400).json({ message: "Status non valido" })
    }

    db.query(
        "UPDATE applications SET company_name = ?, role = ?, location = ?, notes = ?, link_job = ?, status = ? WHERE id = ? AND user_id = ? ",
        [company_name, role, location, notes, link_job, status, id],
        (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: "Errore server" })
            }
            res.json({ message: "Application modificata" })
        }
    )
}

// ELIMINO UNA APPLICATION
exports.delete = (req, res) => {
    const { id } = req.params

    db.query(
        "DELETE FROM applications WHERE id = ? AND user_id = ?",
        [id],
        (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: "Errore server" })
            }
            res.json({ message: "Application eliminata" })
        }
    )
}