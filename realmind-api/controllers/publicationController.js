const db = require("../config/db")

// ======================
// OBTENER PUBLICACIONES
// ======================

const getPublications = (req, res) => {

    const query = `
        SELECT

            p.idPublicacion,

            p.contenido,

            p.fechaPublicacion,

            p.likes,

            u.nombre,
            
            u.apodoActivo

        FROM Publicacion p

        INNER JOIN Usuario u
            ON p.idUsuario = u.idUsuario

        ORDER BY
            p.fechaPublicacion DESC
    `

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json(err)
        }

        res.json(result)
    })
}

// ======================
// CREAR PUBLICACION
// ======================

const createPublication = (req, res) => {

    const {
        idUsuario,
        contenido
    } = req.body

    const query = `
        INSERT INTO Publicacion
        (
            idUsuario,
            contenido
        )
        VALUES (?, ?)
    `

    db.query(
        query,
        [idUsuario, contenido],
        (err, result) => {

            if (err) {
                return res.status(500).json(err)
            }

            res.json({
                message:
                    "Publicación creada"
            })
        }
    )
}

// ======================
// LIKE
// ======================

const addLike = (req, res) => {

    const { id } = req.params

    const { idUsuario } = req.body

    const checkQuery = `
        SELECT *
        FROM LikePublicacion
        WHERE idUsuario = ?
        AND idPublicacion = ?
    `

    db.query(
        checkQuery,
        [idUsuario, id],

        (err, result) => {

            if (err) {
                return res.status(500).json(err)
            }

            if (result.length > 0) {

                return res.status(400).json({
                    message:
                        "Ya diste like"
                })
            }

            const insertLike = `
                INSERT INTO LikePublicacion
                (
                    idUsuario,
                    idPublicacion
                )
                VALUES (?, ?)
            `

            db.query(
                insertLike,
                [idUsuario, id],

                (err) => {

                    if (err) {
                        return res.status(500).json(err)
                    }

                    const updateLikes = `
                        UPDATE Publicacion
                        SET likes = likes + 1
                        WHERE idPublicacion = ?
                    `

                    db.query(
                        updateLikes,
                        [id],

                        (err) => {

                            if (err) {
                                return res.status(500).json(err)
                            }

                            res.json({
                                message:
                                    "Like agregado"
                            })
                        }
                    )
                }
            )
        }
    )
}

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

module.exports = {

    getPublications,

    createPublication,

    addLike,

    getUsers
}