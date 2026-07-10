const express = require("express")
const router = express.Router()

const authController = require("../controllers/authController")

// REGISTRAZIONE
router.post("/register", authController.register)

// ACCESSO
router.post("/login", authController.login)

module.exports = router