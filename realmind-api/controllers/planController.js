const db = require("../config/db")

const updatePlan = (req, res) => {

    const { idUsuario, idPlan } = req.body

    const query = `
        UPDATE Usuario
        SET idPlan = ?
        WHERE idUsuario = ?
    `

    db.query(
        query,
        [idPlan, idUsuario],
        (err, result) => {

            if (err) {
                return res.status(500).json(err)
            }

            res.json({
                message: "Plan actualizado"
            })
        }
    )
}

module.exports = {
    updatePlan
}