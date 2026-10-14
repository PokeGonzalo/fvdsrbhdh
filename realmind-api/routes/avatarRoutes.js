const express = require("express")

const router = express.Router()

const {
    getAvatar,
    createAvatar,
    updateAvatar
} = require("../controllers/avatarController")


router.get("/:idUsuario", getAvatar)

router.post("/", createAvatar)

router.put("/:idUsuario", updateAvatar)


module.exports = router