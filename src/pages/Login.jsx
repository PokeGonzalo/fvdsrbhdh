import { useState } from "react"

import {
    Link,
    useNavigate
} from "react-router-dom"

import { loginUser } from "../services/api"

function Login() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async () => {

        const data =
            await loginUser(formData)

        if (data.token) {

            localStorage.setItem(
                "token",
                data.token
            )

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            )

            navigate("/home")

        } else {

            alert(data.message)

        }
    }

    return (
        <div className="app">

            <div className="login-container">

                <h1>REALMIND</h1>

                <p className="subtitle">
                    Desafía tu mente
                </p>

                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                />

                <button onClick={handleLogin}>
                    Iniciar Sesión
                </button>

                <Link to="/register">
                    <button className="register-btn">
                        Registrarse
                    </button>
                </Link>

            </div>

        </div>
    )
}

export default Login