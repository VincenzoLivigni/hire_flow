const express = require("express")
const db = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const applicationsRoutes = require("./routes/applicationsRoutes")
const cors = require("cors")

const app = express()

app.use(cors())
// middleware per permettere al server di leggere JSON delle richieste
app.use(express.json())

// collegamento delle rotte API
app.use("/api/auth", authRoutes)
app.use("/api", applicationsRoutes)

// test server
app.get("/", (req, res) => {
    res.send("Hire flow backend attivo!")
})

// connessione al database MySQL
db.connect((err) => {
    if (err) {
        console.log("Connessione al database fallita!")
        return
    }
    console.log("Connessione al database riuscita!");
})

// avvio server su porta 3000
app.listen(3000, () => {
    console.log("Server attivo sulla porta: 3000");
})