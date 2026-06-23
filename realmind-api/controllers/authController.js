const db = require("../config/db")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

// ======================
// REGISTER
// ======================

const register = async (req, res) => {

    const {
        nombre,
        email,
        password
    } = req.body

    try {

        // Verificar email existente
        const checkQuery =
            "SELECT * FROM Usuario WHERE email = ?"

        db.query(checkQuery, [email], async (err, result) => {

            if (result.length > 0) {
                return res.status(400).json({
                    message: "El email ya existe"
                })
            }

            // Encriptar contraseña
            const hashedPassword =
                await bcrypt.hash(password, 10)

            // Insertar usuario
            const insertQuery = `
                INSERT INTO Usuario
                (nombre, email, passwordHash, idRol, idPlan)
                VALUES (?, ?, ?, 2, 1)
            `

            db.query(
                insertQuery,
                [nombre, email, hashedPassword],
                (err, result) => {

                    if (err) {
                        return res.status(500).json(err)
                    }

                    res.status(201).json({
                        message: "Usuario registrado"
                    })
                }
            )
        })

    } catch (error) {

        res.status(500).json(error)

    }
}

// ======================
// LOGIN
// ======================

const login = (req, res) => {

    const {
        email,
        password
    } = req.body

    const query =
        "SELECT * FROM Usuario WHERE email = ?"

    db.query(query, [email], async (err, result) => {

        if (err) {
            return res.status(500).json(err)
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            })
        }

        const user = result[0]

        const validPassword =
            await bcrypt.compare(
                password,
                user.passwordHash
            )

        if (!validPassword) {
            return res.status(401).json({
                message: "Contraseña incorrecta"
            })
        }

        // TOKEN
        const token = jwt.sign(
            {
                id: user.idUsuario,
                email: user.email
            },
            "REALMIND_SECRET",
            {
                expiresIn: "24h"
            }
        )

        res.json({
            message: "Login exitoso",
            token,
            user
        })
    })
}

module.exports = {
    register,
    login
}