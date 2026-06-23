const express = require("express")

const router =
    express.Router()

const db =
    require("../config/db")

router.get(
    "/:idUsuario",
    (req, res) => {

        const {
            idUsuario
        } = req.params

        const query = `

    SELECT

        l.idLogro,

        l.nombreLogro,

        l.descripcion,

        CASE

            WHEN ul.idUsuarioLogro IS NOT NULL

            THEN 1

            ELSE 0

        END AS obtenido

    FROM Logro l

    LEFT JOIN UsuarioLogro ul

        ON l.idLogro = ul.idLogro

        AND ul.idUsuario = ?
`

        db.query(
            query,
            [idUsuario],
            (
                err,
                result
            ) => {

                if (err)
                    return res
                        .status(500)
                        .json(err)

                res.json(result)
            }
        )
    }
)

module.exports = router