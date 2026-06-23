const express = require("express")

const router = express.Router()

const {
    updatePlan
} = require("../controllers/planController")

router.put("/update", updatePlan)

module.exports = router