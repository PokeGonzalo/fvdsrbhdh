const express = require("express")

const router = express.Router()

const {
    getStoreItems,
    buyItem,
    getInventory,
    activateBooster,
    getActiveBooster
} = require(
    "../controllers/storeController"
)

router.get(
    "/",
    getStoreItems
)

router.post(
    "/buy",
    buyItem
)

router.get(
    "/inventory/:idUsuario",
    getInventory
)

router.put(
    "/activate",
    activateBooster
)

router.get(
    "/active-booster/:idUsuario",
    getActiveBooster
)

module.exports = router