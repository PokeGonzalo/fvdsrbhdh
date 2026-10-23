const db = require("../config/db")

const getStories = (req, res) => {

    const query = `
        SELECT *
        FROM Historia
        WHERE activa = 1
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

const getStoryQuestions =
(
    req,
    res
) => {

    const {
        idHistoria
    } = req.params

    const query = `
        SELECT
    p.*,

    hp.ordenPregunta,

    hp.descripcionCapitulo

FROM HistoriaPregunta hp

INNER JOIN pregunta p
    ON hp.idPregunta = p.idPregunta

WHERE hp.idHistoria = ?

ORDER BY hp.ordenPregunta
    `

    db.query(
        query,
        [idHistoria],

        (err, result) => {

            if (err)
                return res.status(500).json(err)

            res.json(result)
        }
    )
}

const getStoryProgress = (
    req,
    res
) => {

    const {
        idUsuario,
        idHistoria
    } = req.params

    const query = `
        SELECT *

        FROM UsuarioHistoria

        WHERE idUsuario = ?
        AND idHistoria = ?
    `

    db.query(
        query,
        [
            idUsuario,
            idHistoria
        ],

        (err, result) => {

            if (err)
                return res.status(500).json(err)

            if (result.length === 0) {

                return res.json({

                    ultimaPreguntaResuelta: 0,

                    completada: false
                })
            }

            res.json(result[0])
        }
    )
}

const saveStoryProgress = (
    req,
    res
) => {

    const {
        idUsuario,
        idHistoria,
        idPregunta
    } = req.body

    const query = `
        INSERT INTO UsuarioHistoriaPregunta
        (
            idUsuario,
            idHistoria,
            idPregunta,
            completada,
            fechaCompletada
        )

        VALUES
        (
            ?,
            ?,
            ?,
            1,
            NOW()
        )

        ON DUPLICATE KEY UPDATE

            completada = 1,
            fechaCompletada = NOW()
    `

    db.query(
        query,
        [
            idUsuario,
            idHistoria,
            idPregunta
        ],

        (err) => {

            if (err)
                return res.status(500).json(err)

            res.json({
                message:
                    "Progreso guardado"
            })
        }
    )
}

const completeStory = (
    req,
    res
) => {

    const {
        idUsuario,
        idHistoria
    } = req.body

    const query = `
        UPDATE UsuarioHistoria

        SET

            completada = 1,

            fechaCompletada = NOW()

        WHERE idUsuario = ?
        AND idHistoria = ?
    `

    db.query(
        query,
        [
            idUsuario,
            idHistoria
        ],

        (err) => {

            if (err)
                return res.status(500).json(err)

            res.json({
                message:
                    "Historia completada"
            })
        }
    )
}

const getStoryQuestion = (
    req,
    res
) => {

    const {
        idPregunta
    } = req.params

    const query = `
        SELECT *
        FROM pregunta
        WHERE idPregunta = ?
    `

    db.query(
        query,
        [idPregunta],
        (err, result) => {

            if (err)
                return res.status(500).json(err)

            res.json(result[0])
        }
    )
}

const getStoryAnswers = (
    req,
    res
) => {

    const { idPregunta } =
        req.params

    const query = `

    SELECT

        r.idRespuesta,
        r.textoRespuesta,

        CASE
            WHEN o.estadoRespuesta = 'CORRECTA'
            THEN true
            ELSE false
        END AS correcta

    FROM Respuesta r

    INNER JOIN OpcionRespuesta o
        ON r.idOpcionRespuesta =
           o.idOpcionRespuesta

    WHERE r.idPregunta = ?

    ORDER BY r.idRespuesta ASC

`

    db.query(
        query,
        [idPregunta],
        (err, result) => {

            if (err)
                return res.status(500).json(err)

            res.json(result)
        }
    )
}

const getCompletedQuestions = (
    req,
    res
) => {

    const {
        idUsuario,
        idHistoria
    } = req.params

    const query = `
        SELECT idPregunta

        FROM UsuarioHistoriaPregunta

        WHERE idUsuario = ?
        AND idHistoria = ?
        AND completada = 1
    `

    db.query(
        query,
        [
            idUsuario,
            idHistoria
        ],

        (err, result) => {

            if (err)
                return res.status(500).json(err)

            res.json(result)
        }
    )
}

module.exports = {

    getStories,

    getStoryQuestions,

    getStoryQuestion,

    getStoryProgress,

    saveStoryProgress,

    completeStory,

    getStoryAnswers,

    getCompletedQuestions
}