import { useState, useEffect } from "react"

import {
    Link,
    useNavigate
} from "react-router-dom"

import "../styles/navbar.css"

function Navbar() {

    const navigate = useNavigate()

    const [booster, setBooster] = useState(null)

    const [timeLeft, setTimeLeft] =
    useState("")

    const user =
    JSON.parse(
        localStorage.getItem("user")
    )

    const logout = () => {

        localStorage.removeItem("user")

        navigate("/")
    }

    useEffect(() => {

    if (!user)
        return

    fetch(
        `https://realmind-api.onrender.com/api/store/active-booster/${user.idUsuario}`
    )

    .then(res => res.json())

    .then(data => {

        if (data.activo) {

            setBooster(data)
        }
    })

}, [])

useEffect(() => {

    if (!booster)
        return

    const interval = setInterval(() => {

        const now =
            new Date()

        const expiration =
            new Date(
                booster.fechaExpiracion
            )

        const diff =
            expiration - now

        if (diff <= 0) {

            setTimeLeft("")

            setBooster(null)

            clearInterval(interval)

            return
        }

        const minutes =
            Math.floor(
                diff / 60000
            )

        const seconds =
            Math.floor(
                (diff % 60000) / 1000
            )

        setTimeLeft(
            `${minutes}m ${seconds}s`
        )

    }, 1000)

    return () =>
        clearInterval(interval)

}, [booster])

    return (

        <nav className="navbar">

            <div className="navbar-logo">
                RealMind
            </div>

            <div className="navbar-links">

                <Link to="/home">
                    Acertijos
                </Link>

                <Link to="/ranking">
                    Ranking
                </Link>

                <Link to="/profile">
                    Perfil
                </Link>

                <Link to="/market">
                    Mercado
                </Link>

                <Link to="/publications">
                    Publicaciones
                </Link>

            </div>

            {
    booster && (

        <div className="booster-info">

             x{booster.multiplicador}

            {" "}

            ({timeLeft})

        </div>

    )
}

            <button
                className="logout-btn-navbar"
                onClick={logout}
            >
                Cerrar sesión
            </button>

        </nav>
    )
}

export default Navbar