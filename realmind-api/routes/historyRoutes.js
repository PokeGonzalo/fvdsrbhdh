const express = require("express")

const router = express.Router()

const {
    getStories,
    getStoryQuestions,
    getStoryProgress,
    saveStoryProgress,
    completeStory,
    getStoryQuestion,
    getStoryAnswers,
    getCompletedQuestions
} = require("../controllers/historyController")

router.get(
    "/",
    getStories
)

router.get(
    "/:idHistoria/questions",
    getStoryQuestions
)

router.get(
    "/progress/:idUsuario/:idHistoria",
    getStoryProgress
)

router.put(
    "/progress",
    saveStoryProgress
)

router.put(
    "/complete",
    completeStory
)

router.get(
    "/question/:idPregunta",
    getStoryQuestion
)

router.get(
    "/answers/:idPregunta",
    getStoryAnswers
)

router.get(
    "/completed/:idUsuario/:idHistoria",
    getCompletedQuestions
)
module.exports = router