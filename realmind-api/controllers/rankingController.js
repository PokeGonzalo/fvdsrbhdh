const db = require("../config/db")

// ======================
// RANKING GLOBAL
// ======================

const getRanking = (req, res) => {

    const query = `
    SELECT

        u.nombre,

        SUM(p.puntajeTotal)
            AS puntajeTotal

    FROM Partida p

    INNER JOIN usuario u
        ON p.idUsuario = u.idUsuario

    WHERE p.idEstadoPartida = 2

    GROUP BY u.idUsuario

    ORDER BY puntajeTotal DESC

    LIMIT 10
`

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json(err)
        }

        res.json(result)
    })
}

module.exports = {
    getRanking
}