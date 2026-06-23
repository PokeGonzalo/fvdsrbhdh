const express = require("express")

const router = express.Router()

const {
    createGame,
    finishGame,
    getDemoQuestions,
    getGames
} = require("../controllers/gameController")

router.post("/start", createGame)

router.put("/finish", finishGame)

router.get("/demo", getDemoQuestions)

router.get("/", getGames)

module.exports = router