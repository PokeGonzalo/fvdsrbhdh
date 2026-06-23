import { useNavigate } from "react-router-dom"

import "../styles/landing.css"

function LandingPage() {

    const navigate = useNavigate()

    return (

        <div className="landing-container">

            <div className="landing-card">

                <h1 className="landing-title">
                    REALMIND
                </h1>

                <h2 className="landing-subtitle">
                    Desafía tu mente. Supera tus límites.
                </h2>

                <p className="landing-description">

                    RealMind es una plataforma de acertijos y desafíos
                    mentales diseñada para poner a prueba tus habilidades
                    de lógica, razonamiento y creatividad.

                </p>

                <p className="landing-description">

                    Podrás competir con otros jugadores, resolver una gran variedad de acertijos, conseguir apodos exclusivos e interctuar con otras personas.

                </p>

                <div className="landing-features">

                    <div className="feature">
                        Adivinanzas
                        <br />
                        Acertijos clásicos que pondrán a prueba tu creatividad e imaginación.
                    </div>

                    <div className="feature">
                        Matematicos
                        <br />
                        Resuelve problemas numéricos, patrones y desafíos de cálculo.
                    </div>

                    <div className="feature">
                        Graficos
                        <br />
                        Interpreta imágenes, figuras y pistas visuales para resolver acertijos.
                    </div>

                    <div className="feature">
                        Historias Cortas
                        <br />
                        Lee una breve historia y encuentra la respuesta oculta entre las pistas.
                    </div>

                </div>

                <button
                    className="landing-btn"
                    onClick={() => navigate("/login")}
                >
                    Comenzar
                </button>

                 <button
                    className="landing-btn"
                    onClick={() => navigate("/demo")}
                >
                    Probar gratis
                </button>

            </div>

        </div>
    )
}

export default LandingPage