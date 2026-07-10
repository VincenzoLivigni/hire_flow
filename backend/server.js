const express = require("express")
const db = require("./config/db")
const authRoutes = require("./routes/authRoutes")

const app = express()

// middleware per permettere al server di leggere JSON delle richieste
app.use(express.json())

// collegamento delle rotte di autenticazione
app.use("/api/auth", authRoutes)

// test server
app.get("/", (req, res) => {
    res.send("Hire flow backend attivo!")
})

// connessione al database MySQL
db.connect((err) => {
    if (err) {
        console.log("Connessione al databaseb fallita!")
        return
    }
    console.log("Connessione al database riuscita!");
})

// avvio server su porta 3000
app.listen(3000, () => {
    console.log("Server attivo sulla porta: 3000");
})