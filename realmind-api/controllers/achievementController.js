const db = require("../config/db")

const checkAchievements = (idUsuario) => {

    const statsQuery = `

        SELECT

            COUNT(*) AS partidas,

            COALESCE(
                SUM(puntajeTotal),
                0
            ) AS puntos

        FROM Partida

        WHERE idUsuario = ?

        AND idEstadoPartida = 2
    `

    db.query(
        statsQuery,
        [idUsuario],
        (err, statsResult) => {

            if (err) return

            const partidas =
                statsResult[0].partidas

            const puntos =
                statsResult[0].puntos

            const achievementsQuery = `
                SELECT *
                FROM Logro
            `

            db.query(
                achievementsQuery,
                (err, achievements) => {

                    if (err) return

                    achievements.forEach(
                        (achievement) => {

                            let unlocked = false

                            // PUNTOS

                            if (
                                achievement.idTipoLogro === 1 &&
                                puntos >= achievement.puntosRequeridos
                            ) {
                                unlocked = true
                            }

                            // PARTIDAS

                            if (
                                achievement.idTipoLogro === 2 &&
                                partidas >= achievement.puntosRequeridos
                            ) {
                                unlocked = true
                            }

                            if (!unlocked) return

                            const existsQuery = `

                                SELECT *

                                FROM UsuarioLogro

                                WHERE idUsuario = ?

                                AND idLogro = ?
                            `

                            db.query(
                                existsQuery,
                                [
                                    idUsuario,
                                    achievement.idLogro
                                ],
                                (
                                    err,
                                    exists
                                ) => {

                                    if (
                                        exists.length > 0
                                    )
                                        return

                                    const insertQuery = `

                                        INSERT INTO UsuarioLogro

                                        (
                                            idUsuario,
                                            idLogro
                                        )

                                        VALUES (?, ?)
                                    `

                                    db.query(
                                        insertQuery,
                                        [
                                            idUsuario,
                                            achievement.idLogro
                                        ]
                                    )
                                }
                            )
                        }
                    )
                }
            )
        }
    )
}

module.exports = {
    checkAchievements
}