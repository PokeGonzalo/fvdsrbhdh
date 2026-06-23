const db = require("../config/db")

// ======================
// PERFIL USUARIO
// ======================

const getProfile = (req, res) => {

    const { id } = req.params

    const query = `
        SELECT

            u.nombre,
            u.email,
            u.monedas,
            u.apodoActivo,
            u.fotoPerfil,

            p.nombrePlan AS plan,

            COUNT(pa.idPartida)
                AS partidasJugadas,

            COALESCE(
                SUM(pa.puntajeTotal),
                0
            ) AS puntajeTotal,

            COALESCE(
                MAX(pa.puntajeTotal),
                0
            ) AS mejorPuntaje

        FROM Usuario u

        INNER JOIN planpago p
            ON u.idPlan = p.idPlan

        LEFT JOIN Partida pa
            ON u.idUsuario = pa.idUsuario

        WHERE u.idUsuario = ?

        GROUP BY u.idUsuario
    `

    db.query(query, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err)
        }

        res.json(result[0])
    })
}

const updateNickname = (req, res) => {

    const {
        idUsuario,
        apodo
    } = req.body

    const query = `
        UPDATE Usuario
        SET apodoActivo = ?
        WHERE idUsuario = ?
    `

    db.query(
        query,
        [apodo, idUsuario],
        (err) => {

            if (err)
                return res.status(500).json(err)

            res.json({

                message:
                    "Apodo equipado"
            })
        }
    )
}

const uploadPhoto = (req, res) => {

    const { idUsuario } = req.body

    const fotoPerfil =
        req.file.filename

    const query = `
        UPDATE Usuario
        SET fotoPerfil = ?
        WHERE idUsuario = ?
    `

    db.query(
        query,
        [fotoPerfil, idUsuario],
        (err) => {

            if (err) {

                return res
                    .status(500)
                    .json(err)
            }

            res.json({

                message:
                    "Foto actualizada",

                fotoPerfil
            })
            
        }
    )
}

module.exports = {
    getProfile,
    updateNickname,
    uploadPhoto
}