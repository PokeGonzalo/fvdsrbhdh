const db = require("../config/db")

const getAvatar = (req, res) => {

    const { idUsuario } = req.params

    const query = `
        SELECT *
        FROM Avatar
        WHERE idUsuario = ?
    `

    db.query(
        query,
        [idUsuario],
        (err, result) => {

            if (err) {

                console.error(err)

                return res
                    .status(500)
                    .json({
                        error: "Error al obtener el avatar"
                    })
            }

            if (result.length === 0) {

                return res.json(null)
            }

            res.json(result[0])
        }
    )
}


const createAvatar = (req, res) => {

    const {
        idUsuario,
        peinado,
        colorPelo,
        colorPiel,
        ojos,
        cejas,
        boca,
        ropa,
        colorRopa,
        accesorio
    } = req.body


    const query = `
        INSERT INTO Avatar
        (
            idUsuario,
            peinado,
            colorPelo,
            colorPiel,
            ojos,
            cejas,
            boca,
            ropa,
            colorRopa,
            accesorio
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `


    db.query(
        query,
        [
            idUsuario,
            peinado,
            colorPelo,
            colorPiel,
            ojos,
            cejas,
            boca,
            ropa,
            colorRopa,
            accesorio
        ],
        (err, result) => {

            if (err) {

                console.error(err)

                return res
                    .status(500)
                    .json({
                        error: "Error al crear el avatar"
                    })
            }

            res.status(201).json({

                message: "Avatar creado correctamente",

                idAvatar:
                    result.insertId

            })
        }
    )
}

const updateAvatar = (req, res) => {

    const { idUsuario } = req.params

    const {
        peinado,
        colorPelo,
        colorPiel,
        ojos,
        cejas,
        boca,
        ropa,
        colorRopa,
        accesorio
    } = req.body


    const query = `
        UPDATE Avatar
        SET
            peinado = ?,
            colorPelo = ?,
            colorPiel = ?,
            ojos = ?,
            cejas = ?,
            boca = ?,
            ropa = ?,
            colorRopa = ?,
            accesorio = ?

        WHERE idUsuario = ?
    `


    db.query(
        query,
        [
            peinado,
            colorPelo,
            colorPiel,
            ojos,
            cejas,
            boca,
            ropa,
            colorRopa,
            accesorio,
            idUsuario
        ],
        (err, result) => {

            if (err) {

                console.error(err)

                return res
                    .status(500)
                    .json({
                        error: "Error al actualizar el avatar"
                    })
            }


            if (result.affectedRows === 0) {

                return res
                    .status(404)
                    .json({
                        error: "Avatar no encontrado"
                    })
            }


            res.json({

                message:
                    "Avatar actualizado correctamente"

            })

        }
    )
}


module.exports = {
    getAvatar,
    createAvatar,
    updateAvatar
}