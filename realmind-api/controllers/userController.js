const db =
    require("../config/db")

const getUsers = (req, res) => {

    const query = `
        SELECT
            idUsuario,
            nombre,
            apodoActivo
        FROM Usuario
    `

    db.query(
        query,
        (err, result) => {

            if (err)
                return res.status(500).json(err)

            res.json(result)
        }
    )
}

const getUserById = (req, res) => {

    const { idUsuario } = req.params

    const query = `
        SELECT

            u.idUsuario,
            u.nombre,
            fotoPerfil,
            u.apodoActivo,

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

        LEFT JOIN Partida pa
            ON u.idUsuario = pa.idUsuario

        WHERE u.idUsuario = ?

        GROUP BY u.idUsuario
    `

    db.query(
        query,
        [idUsuario],
        (err, result) => {

            if (err)
                return res.status(500).json(err)

            res.json(result[0])
        }
    )
}
module.exports = {

    getUsers,
    getUserById
}