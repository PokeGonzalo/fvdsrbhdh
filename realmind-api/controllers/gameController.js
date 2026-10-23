const db = require("../config/db")

// ======================
// CREAR PARTIDA
// ======================

const createGame = (req, res) => {

    console.log(
        "CREAR PARTIDA",
        req.body
    )

    const {
        idUsuario,
        modoJuego
    } = req.body

    const query = `
        INSERT INTO Partida
        (
            idUsuario,
            fechaInicio,
            modoJuego,
            idEstadoPartida
        )

        VALUES
        (
            ?,
            NOW(),
            ?,
            1
        )
    `

    db.query(
        query,
        [idUsuario, modoJuego],
        (err, result) => {

            if (err) {

                console.log(err)

                return res
                    .status(500)
                    .json(err)
            }

            console.log(
                "PARTIDA GUARDADA:",
                result.insertId
            )

            res.json({

                message:
                    "Partida creada",

                idPartida:
                    result.insertId
            })
        }
    )
}

// ======================
// FINALIZAR PARTIDA
// ======================

const finishGame = (req, res) => {

    const {
        idPartida,
        puntajeTotal
    } = req.body

    const {
        checkAchievements
    } = require(
        "./achievementController"
    )

    const query = `
        UPDATE Partida

        SET
            fechaFin = NOW(),
            puntajeTotal = ?,
            idEstadoPartida = 2

        WHERE idPartida = ?
    `

    db.query(
        query,
        [puntajeTotal, idPartida],

        (err) => {

            if (err) {
                return res
                    .status(500)
                    .json(err)
            }

            const getUserQuery = `
                SELECT idUsuario
                FROM Partida
                WHERE idPartida = ?
            `

            db.query(
                getUserQuery,
                [idPartida],

                (
                    err,
                    userResult
                ) => {

                    if (
                        err ||
                        !userResult ||
                        userResult.length === 0
                    ) {

                        return res.json({
                            message:
                                "Partida finalizada"
                        })
                    }

                    const idUsuario =
                        userResult[0]
                            .idUsuario

                    const monedasGanadas =
                        puntajeTotal

                    // Sumar monedas

                    db.query(
                        `
                        UPDATE Usuario

                        SET monedas =
                            monedas + ?

                        WHERE idUsuario = ?
                        `,
                        [
                            monedasGanadas,
                            idUsuario
                        ]
                    )

                    // Registrar movimiento

                    db.query(
                        `
                        INSERT INTO MovimientoMoneda
                        (
                            idUsuario,
                            cantidad,
                            tipoMovimiento,
                            descripcion
                        )

                        VALUES
                        (
                            ?,
                            ?,
                            'RECOMPENSA',
                            'Partida completada'
                        )
                        `,
                        [
                            idUsuario,
                            monedasGanadas
                        ]
                    )

                    // Revisar logros

                    checkAchievements(
                        idUsuario
                    )

                    res.json({
                        message:
                            "Partida finalizada",
                        monedasGanadas
                    })
                }
            )
        }
    )
}

// ======================
// OBTENER PARTIDAS
// ======================

const getGames = (req, res) => {

    const query = `
        SELECT *
        FROM Partida
    `

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json(err)
        }

        res.json(result)
    })
}

const getDemoQuestions = (req, res) => {

    const query = `
        SELECT
            p.*,
            r.idRespuesta,
            r.textoRespuesta,
            r.idOpcionRespuesta
        FROM pregunta p
        LEFT JOIN Respuesta r
            ON p.idPregunta = r.idPregunta
        WHERE p.idPregunta IN
            (1, 22, 5, 6, 32)
        ORDER BY p.idPregunta
    `

    db.query(query, (err, result) => {

        if (err) {

            return res
                .status(500)
                .json(err)
        }

        const questions = []

        result.forEach(row => {

            let question =
                questions.find(
                    q =>
                        q.idPregunta ===
                        row.idPregunta
                )

            if (!question) {

                question = {

                    idPregunta:
                        row.idPregunta,

                    pregunta:
                        row.pregunta,

                    imagen:
                        row.imagen,

                    idTipoPregunta:
                        row.idTipoPregunta,

                    respuestaTexto:
                        row.respuestaTexto,

                    puntosBase:
                        row.puntosBase,

                    respuestas: []
                }

                questions.push(question)
            }

            if (row.idRespuesta) {

                question.respuestas.push({

                    idRespuesta:
                        row.idRespuesta,

                    textoRespuesta:
                        row.textoRespuesta,

                    correcta:
                        row.idOpcionRespuesta === 1
                })
            }
        })

        res.json(questions)
    })
}

module.exports = {
    createGame,
    finishGame,
    getGames,
    getDemoQuestions
}