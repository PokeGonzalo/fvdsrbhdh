const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

    cb(
        null,
        path.join(
            __dirname,
            "../../public/images/perfiles"
        )
    )
},

    filename: (req, file, cb) => {

        const extension =
            path.extname(file.originalname)

        cb(
            null,
            Date.now() + extension
        )
    }
})

module.exports =
    multer({ storage })