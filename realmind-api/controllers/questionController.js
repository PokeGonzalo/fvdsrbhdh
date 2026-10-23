const db = require("../config/db")

// ======================
// TODAS LAS PREGUNTAS
// ======================

const getQuestions = (req, res) => {

    const query = `
        SELECT
            p.idPregunta,
            p.pregunta,

            r.idRespuesta,
            r.textoRespuesta,

            o.estadoRespuesta

        FROM pregunta p

        INNER JOIN respuesta r
            ON p.idPregunta = r.idPregunta

        INNER JOIN opcionrespuesta o
            ON r.idOpcionRespuesta =
               o.idOpcionRespuesta
    `

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json(err)
        }

        const groupedQuestions = {}

        result.forEach((row) => {

            if (!groupedQuestions[row.idPregunta]) {

                groupedQuestions[row.idPregunta] = {

                    idPregunta: row.idPregunta,

                    pregunta: row.pregunta,

                    respuestas: []
                }
            }

            groupedQuestions[row.idPregunta]
                .respuestas
                .push({

                    idRespuesta:
                        row.idRespuesta,

                    textoRespuesta:
                        row.textoRespuesta,

                    correcta:
                        row.estadoRespuesta
                        === "CORRECTA"
                })
        })

        res.json(
            Object.values(groupedQuestions)
        )
    })
}

// ======================
// PREGUNTAS POR CATEGORIA
// ======================

const getQuestionsByCategory = (req, res) => {

    const { categoria } = req.params

   const query = `
    SELECT
        p.idPregunta,
        p.pregunta,
        p.imagen,
        p.idTipoPregunta,
        p.respuestaTexto,
        p.puntosBase,

        r.idRespuesta,
        r.textoRespuesta,

        o.estadoRespuesta,

        c.nombreCategoria

    FROM pregunta p

    INNER JOIN categoria c
        ON p.idCategoria = c.idCategoria

    LEFT JOIN respuesta r
        ON p.idPregunta = r.idPregunta

    LEFT JOIN opcionrespuesta o
        ON r.idOpcionRespuesta =
           o.idOpcionRespuesta

    WHERE c.nombreCategoria = ?
`

    db.query(query, [categoria], (err, result) => {

        if (err) {
            return res.status(500).json(err)
        }

        const groupedQuestions = {}

        result.forEach((row) => {

            if (!groupedQuestions[row.idPregunta]) {

    groupedQuestions[row.idPregunta] = {

        idPregunta: row.idPregunta,

        pregunta: row.pregunta,

        imagen: row.imagen,

        categoria: row.nombreCategoria,

        idTipoPregunta:
            row.idTipoPregunta,

        respuestaTexto:
            row.respuestaTexto,

        puntosBase:
            row.puntosBase,

        respuestas: []
    }
}

            if (row.idRespuesta) {

    groupedQuestions[row.idPregunta]
        .respuestas
        .push({

            idRespuesta:
                row.idRespuesta,

            textoRespuesta:
                row.textoRespuesta,

            correcta:
                row.estadoRespuesta
                === "CORRECTA"
        })
}
        })

        res.json(
            Object.values(groupedQuestions)
        )
    })
}

module.exports = {
    getQuestions,
    getQuestionsByCategory
}