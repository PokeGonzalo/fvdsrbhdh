import {
    useEffect,
    useState
} from "react"

import {
    useParams,
    useNavigate
} from "react-router-dom"

import "../styles/story.css"
import Navbar from "../components/Navbar"

function StoryDetail() {

    const {
        idHistoria
    } = useParams()

    const navigate =
        useNavigate()

    const user =
        JSON.parse(
            localStorage.getItem("user")
        )

    const [
        questions,
        setQuestions
    ] = useState([])

    const [
        progress,
        setProgress
    ] = useState(null)

    const [
        completedQuestions,
        setCompletedQuestions
    ] = useState([])

    useEffect(() => {

        fetch(
            `http://localhost:3000/api/history/${idHistoria}/questions`
        )

        .then(res => res.json())

        .then(data =>
            setQuestions(data)
        )

        fetch(
            `http://localhost:3000/api/history/progress/${user.idUsuario}/${idHistoria}`
        )

        .then(res => res.json())

        .then(data =>
            setProgress(data)
        )

        fetch(
            `http://localhost:3000/api/history/completed/${user.idUsuario}/${idHistoria}`
        )

        .then(res => res.json())

        .then(data =>
            setCompletedQuestions(data)
        )

    }, [idHistoria])

    if (!progress) {

        return (
            <h1>
                Cargando...
            </h1>
        )
    }

    const completedIds =

        completedQuestions.map(
            q => q.idPregunta
        )

    return (

        <>

            <Navbar />

            <div
                style={{
                    maxWidth: "800px",
                    margin: "0 auto",
                    padding: "20px"
                }}
            >

                <h1>
                    Historia
                </h1>

                {
                    progress.completada && (

                        <div>

                            <h2>
                                ✅ Historia completada
                            </h2>

                            <p>
                                Puedes volver a jugar,
                                pero ya no recibirás
                                puntos ni monedas.
                            </p>

                        </div>
                    )
                }

                {
                    questions.map(
                        (
                            question,
                            index
                        ) => {

                            const completed =

                                completedIds.includes(
                                    question.idPregunta
                                )

                            const unlocked =

                                index === 0 ||

                                completedIds.includes(
                                    questions[
                                        index - 1
                                    ]?.idPregunta
                                )

                            return (

    <div
        key={question.idPregunta}
        className="chapter-card"
    >

        <div className="chapter-info">

            <h3>

                Capítulo {question.ordenPregunta}

            </h3>

            <p className="chapter-description">

                {
                    question.descripcionCapitulo
                }

            </p>

            <p className="chapter-status">

                {
                    completed
                        ? "✅ Completado"
                        : unlocked
                        ? "🔓 Disponible"
                        : "🔒 Bloqueado"
                }

            </p>

        </div>

        <div className="chapter-action">

            {
                unlocked && (

                    <button

                        className="chapter-btn"

                        onClick={() =>

                            navigate(
                                `/story-game/${idHistoria}/${question.idPregunta}`
                            )
                        }
                    >

                        {
                            completed
                                ? "Rejugar"
                                : "Jugar"
                        }

                    </button>

                )
            }

        </div>

    </div>
)
                        }
                    )
                }

            </div>

        </>
    )
}

export default StoryDetail