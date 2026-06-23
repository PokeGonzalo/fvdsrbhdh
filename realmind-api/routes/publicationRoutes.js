const express = require("express")

const router = express.Router()

const {

    getPublications,

    createPublication,

    addLike,

    getUsers

} = require(
    "../controllers/publicationController"
)

router.get("/", getPublications)

router.post("/", createPublication)

router.put(
    "/like/:id",
    addLike
)

router.get(
    "/users",
    getUsers
)

module.exports = router