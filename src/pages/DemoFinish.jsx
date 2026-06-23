import { useNavigate } from "react-router-dom"

function DemoFinish() {

    const navigate = useNavigate()

    return (

        <div>

            <h1>
                🎉 ¡Felicidades!
            </h1>

            <p>
                Completaste la demostración
                de RealMind.
            </p>

            <button
                onClick={() =>
                    navigate("/")
                }
            >
                Volver al inicio
            </button>

        </div>
    )
}

export default DemoFinish