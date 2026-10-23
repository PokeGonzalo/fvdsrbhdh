require("dotenv").config()
require("./config/db")

const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors({
    origin: "https://fvdsrbhdh.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.json())

const authRoutes =
    require("./routes/authRoutes")

const questionRoutes =
    require("./routes/questionRoutes")

const gameRoutes =
    require("./routes/gameRoutes")

const rankingRoutes =
    require("./routes/rankingRoutes")

const profileRoutes =
    require("./routes/profileRoutes")

const planRoutes =
    require("./routes/planRoutes")

const storeRoutes =
    require("./routes/storeRoutes")

const achievementRoutes =
    require(
        "./routes/achievementRoutes"
    )

const publicationRoutes =
    require(
        "./routes/publicationRoutes"
    )

const historyRoutes =
    require(
        "./routes/historyRoutes"
    )
const userRoutes =
    require("./routes/userRoutes"
    )

const avatarRoutes = 
    require("./routes/avatarRoutes"
    )

const path =
    require("path")


app.use("/api/auth", authRoutes)

app.use("/api/questions", questionRoutes)

app.use("/api/games", gameRoutes)

app.use("/api/ranking", rankingRoutes)

app.use("/api/profile", profileRoutes)

app.use("/api/plans", planRoutes)

app.use("/api/publications", publicationRoutes)

app.use("/api/achievements", achievementRoutes)

app.use("/api/store", storeRoutes)

app.use("/api/history",historyRoutes)

app.use("/api",userRoutes)

app.use("/api/avatars", avatarRoutes)

app.use(
    "/images",
    express.static(
        path.join(
            __dirname,
            "../public/images"
        )
    )
)

app.get("/", (req, res) => {
    res.send("API REALMIND funcionando")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})

const db = require("./config/db")

app.get("/usuarios", (req, res) => {

    const query = "SELECT * FROM usuario"

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json(err)
        }

        res.json(result)
    })
})