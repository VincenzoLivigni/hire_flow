const express = require("express")
const router = express.Router()

const authMiddleware = require("../middlewares/authMiddleware")
const applicationsController = require("../controllers/applicationsController")

// CREO UNA NUOVA APPLICATION
router.post("/applications", authMiddleware, applicationsController.create)

// RECUPERO LE APPLICATIONS
router.get("/applications", authMiddleware, applicationsController.getAll)

// MODIFICA UNA APPLICATION
router.put("/applications/:id", authMiddleware, applicationsController.update)

// ELIMINA UNA APPLICATION
router.delete("/applications/:id", authMiddleware, applicationsController.delete)

module.exports = router