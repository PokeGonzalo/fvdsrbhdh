const express = require("express")

const router = express.Router()

const {
    getQuestions,
    getQuestionsByCategory
} = require("../controllers/questionController")

router.get("/", getQuestions)

router.get("/:categoria",
    getQuestionsByCategory
)

module.exports = router