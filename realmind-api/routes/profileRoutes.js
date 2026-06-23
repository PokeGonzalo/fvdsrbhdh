const express = require("express")

const router = express.Router()

const {
    getProfile,
    updateNickname,
    uploadPhoto
} = require(
    "../controllers/profileController"
)

const upload =
    require("../middlewares/upload")

router.get("/:id", getProfile)

router.put(
    "/apodo",
    updateNickname
)

router.post(
    "/photo",
    upload.single("foto"),
    uploadPhoto
)

module.exports = router