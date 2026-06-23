import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { registerUser } from "../services/api"

function Register() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = async () => {

        const data =
            await registerUser(formData)

        alert(data.message)

        if (data.message === "Usuario registrado") {
            navigate("/")
        }
    }

    return (
        <div className="app">

            <div className="login-container">

                <h1>Crear Cuenta</h1>

                <p className="subtitle">
                    Únete a REALMIND
                </p>

                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    onChange={handleChange}
                />

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

                <button onClick={handleRegister}>
                    Registrarse
                </button>

            </div>

        </div>
    )
}

export default Register