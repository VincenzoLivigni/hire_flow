const express = require("express")

const app = express()

app.use = (express.json())

app.get("/", (req, res) => {
    res.send("Hire flow backend attivo!")
})

app.listen(3000, () => {
    console.log("Server attivo sulla porta: 3000");
})