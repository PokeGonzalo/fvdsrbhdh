const db = require("../config/db")

// ======================
// OBTENER ITEMS
// ======================

const getStoreItems = (req, res) => {

    const query = `
    SELECT *
    FROM ItemTienda
    WHERE activo = TRUE
    AND tipoItem != 'APODO_LOGRO'
`

    db.query(
        query,
        (err, result) => {

            if (err) {
                return res
                    .status(500)
                    .json(err)
            }

            res.json(result)
        }
    )
}

// ======================
// COMPRAR ITEM
// ======================

const buyItem = (req, res) => {

    const {
        idUsuario,
        idItem
    } = req.body

    const itemQuery = `
        SELECT *
        FROM ItemTienda
        WHERE idItem = ?
    `

    db.query(
        itemQuery,
        [idItem],

        (err, itemResult) => {

            if (
                err ||
                itemResult.length === 0
            ) {
                return res
                    .status(404)
                    .json({
                        message:
                            "Item no encontrado"
                    })
            }

            const item =
                itemResult[0]

            const userQuery = `
                SELECT monedas
                FROM Usuario
                WHERE idUsuario = ?
            `

            db.query(
                userQuery,
                [idUsuario],

                (
                    err,
                    userResult
                ) => {

                    if (
                        err ||
                        userResult.length === 0
                    ) {
                        return res
                            .status(404)
                            .json({
                                message:
                                    "Usuario no encontrado"
                            })
                    }

                    const monedas =
                        userResult[0]
                            .monedas

                    if (
                        monedas <
                        item.precioMonedas
                    ) {
                        return res
                            .status(400)
                            .json({
                                message:
                                    "Monedas insuficientes"
                            })
                    }

                    // ======================
                    // FUNCIÓN DE COMPRA
                    // ======================

                    const realizarCompra = () => {

                        // Descontar monedas

                        db.query(
                            `
                            UPDATE Usuario
                            SET monedas = monedas - ?
                            WHERE idUsuario = ?
                            `,
                            [
                                item.precioMonedas,
                                idUsuario
                            ]
                        )

                        // Inventario

                        if (
                            item.tipoItem ===
                            "APODO"
                        ) {

                            db.query(
                                `
                                INSERT INTO UsuarioItem
                                (
                                    idUsuario,
                                    idItem,
                                    cantidad
                                )
                                VALUES
                                (
                                    ?,
                                    ?,
                                    1
                                )
                                `,
                                [
                                    idUsuario,
                                    idItem
                                ]
                            )

                        } else {

                            db.query(
                                `
                                INSERT INTO UsuarioItem
                                (
                                    idUsuario,
                                    idItem,
                                    cantidad
                                )
                                VALUES
                                (
                                    ?,
                                    ?,
                                    1
                                )
                                ON DUPLICATE KEY UPDATE
                                cantidad =
                                    cantidad + 1
                                `,
                                [
                                    idUsuario,
                                    idItem
                                ]
                            )
                        }

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
                                'COMPRA',
                                ?
                            )
                            `,
                            [
                                idUsuario,
                                -item.precioMonedas,
                                item.nombreItem
                            ]
                        )

                        return res.json({

                            message:
                                "Compra realizada",

                            monedasRestantes:
                                monedas -
                                item.precioMonedas
                        })
                    }

                    // ======================
                    // VALIDAR APODOS
                    // ======================

                    if (
                        item.tipoItem ===
                        "APODO"
                    ) {

                        db.query(
                            `
                            SELECT *
                            FROM UsuarioItem
                            WHERE idUsuario = ?
                            AND idItem = ?
                            `,
                            [
                                idUsuario,
                                idItem
                            ],

                            (
                                err,
                                existing
                            ) => {

                                if (err) {
                                    return res
                                        .status(500)
                                        .json(err)
                                }

                                if (
                                    existing.length > 0
                                ) {

                                    return res
                                        .status(400)
                                        .json({
                                            message:
                                                "Ya tienes este apodo"
                                        })
                                }

                                realizarCompra()
                            }
                        )

                    } else {

                        realizarCompra()
                    }
                }
            )
        }
    )
}

const activateBooster = (req, res) => {

    const {
        idUsuario,
        idItem
    } = req.body

    const checkActiveQuery = `
        SELECT *
        FROM usuarioboosteractivo
        WHERE idUsuario = ?
        AND activo = 1
        AND fechaExpiracion > NOW()
    `

    db.query(
        checkActiveQuery,
        [idUsuario],
        (err, activeResult) => {

            if (err)
                return res.status(500).json(err)

            if (activeResult.length > 0) {

                return res.json({
                    message:
                        "Ya tienes un booster activo"
                })
            }

            const getItemQuery = `
                SELECT valorItem
                FROM ItemTienda
                WHERE idItem = ?
            `

            db.query(
                getItemQuery,
                [idItem],
                (err, itemResult) => {

                    if (err)
                        return res.status(500).json(err)

                    const multiplicador =
                        itemResult[0].valorItem

                    const checkInventoryQuery = `
                        SELECT cantidad
                        FROM UsuarioItem
                        WHERE idUsuario = ?
                        AND idItem = ?
                    `

                    db.query(
    checkInventoryQuery,
    [idUsuario, idItem],
    (err, inventoryResult) => {

        if (err)
            return res.status(500).json(err)

        if (
            inventoryResult.length === 0 ||
            inventoryResult[0].cantidad <= 0
        ) {

            return res.json({
                message:
                    "No tienes unidades disponibles"
            })
        }

                    // continuar activación
                }
            )

                    const insertQuery = `
            INSERT INTO usuarioboosteractivo
            (
                idUsuario,
                idItem,
                multiplicador,
                activo,
                fechaExpiracion
            )
            VALUES
            (
                ?,
                ?,
                ?,
                1,
                DATE_ADD(NOW(), INTERVAL 5 MINUTE)
            )
        `

                   db.query(
            insertQuery,
            [
                idUsuario,
                idItem,
                multiplicador
            ],
            (err) => {

                if (err)
                    return res.status(500).json(err)

                const discountQuery = `
                    UPDATE UsuarioItem
                    SET cantidad = cantidad - 1
                    WHERE idUsuario = ?
                    AND idItem = ?
                `

                db.query(
                    discountQuery,
                    [idUsuario, idItem],
                    (err) => {

                        if (err)
                            return res.status(500).json(err)

                        res.json({
                            message:
                                "Booster activado durante 5 minutos"
                        })
                    }
                )
            }
        )
    }
)
        }
    )
}

const getInventory = (req, res) => {

    const { idUsuario } = req.params

    const query = `

        SELECT

    i.idItem,
    i.nombreItem,
    i.descripcion,
    i.tipoItem,

    ui.cantidad

FROM UsuarioItem ui

INNER JOIN ItemTienda i
    ON ui.idItem = i.idItem

WHERE ui.idUsuario = ?
    `

    db.query(
        query,
        [idUsuario],

        (err, result) => {

            if (err) {
                return res
                    .status(500)
                    .json(err)
            }

            res.json(result)
        }
    )
}

const getActiveBooster = (req, res) => {

    const { idUsuario } = req.params

    const query = `
        SELECT
            multiplicador,
            fechaExpiracion
        FROM usuarioboosteractivo
        WHERE idUsuario = ?
        AND activo = 1
        AND fechaExpiracion > NOW()
        LIMIT 1
    `

    db.query(
        query,
        [idUsuario],
        (err, result) => {

            if (err)
                return res.status(500).json(err)

            if (result.length === 0) {

                return res.json({
                    multiplicador: 1,
                    activo: false
                })
            }

            res.json({
                activo: true,
                multiplicador:
                    result[0].multiplicador,
                fechaExpiracion:
                    result[0].fechaExpiracion
            })
        }
    )
}

module.exports = {
    getStoreItems,
    buyItem,
    getInventory,
    activateBooster,
    getActiveBooster
}