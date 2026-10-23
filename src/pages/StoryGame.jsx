import {
    useEffect,
    useState
} from "react"

import {
    useParams,
    useNavigate
} from "react-router-dom"

import Navbar from "../components/Navbar"

function StoryGame() {

    const {
        idHistoria,
        idPregunta
    } = useParams()

    const navigate =
        useNavigate()

    const user =
        JSON.parse(
            localStorage.getItem("user")
        )

    const [question, setQuestion] =
        useState(null)

    const [answers, setAnswers] =
        useState([])

    const [timeLeft, setTimeLeft] =
        useState(300)

    const [loading, setLoading] =
        useState(true)

    const [answered, setAnswered] =
        useState(false)

    const [textAnswer, setTextAnswer] =
        useState("")
    
    const [feedback, setFeedback] =
        useState(null)

    useEffect(() => {

        fetch(
            `https://realmind-api.onrender.com/api/history/question/${idPregunta}`
        )
        .then(res => res.json())
        .then(data => {

    console.log(data)

    setQuestion(data)

    setLoading(false)

    console.log(answers)

})

        fetch(
            `https://realmind-api.onrender.com/api/history/answers/${idPregunta}`
        )
        .then(res => res.json())
        .then(data =>
            setAnswers(data)
        )

    }, [idPregunta])

    useEffect(() => {

        const interval = setInterval(() => {

            setTimeLeft(prev => {

                if (prev <= 1) {

                    clearInterval(interval)

                    alert(
                        "Tiempo agotado"
                    )

                    navigate(
                        `/story/${idHistoria}`
                    )

                    return 0
                }

                return prev - 1

            })

        }, 1000)

        return () =>
            clearInterval(interval)

    }, [])

    const answerQuestion =
    async (answer) => {

        if (answered)
            return

        setAnswered(true)

        setFeedback({
    text: "✅ CORRECTO",
    type: "success"
})

        if (!answer.correcta) {

    setFeedback({
        text: "❌ INCORRECTO",
        type: "error"
    })

    setTimeout(() => {

        setFeedback(null)

        setAnswered(false)

    }, 1000)

    return
}

        try {

            await fetch(
                "https://realmind-api.onrender.com/api/history/progress",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        idUsuario:
                            user.idUsuario,

                        idHistoria,

                        idPregunta
                    })
                }
            )

            navigate(
                `/story/${idHistoria}`
            )

        } catch (error) {

            console.error(error)

            alert(
                "Error guardando progreso"
            )
        }
    }

    const submitTextAnswer =
async () => {

    if (answered)
        return

    const correct =

        textAnswer
            .trim()
            .toLowerCase()

        ===

        question.respuestaTexto
            .trim()
            .toLowerCase()

    if (!correct) {

        setFeedback({
    text: "❌ INCORRECTO",
    type: "error"
})

        setTimeout(() => {

            setFeedback(null)

        }, 1000)

        return
    }

    setFeedback({
    text: "✅ CORRECTO",
    type: "success"
})

    setAnswered(true)

    setTimeout(async () => {

        await fetch(
            "https://realmind-api.onrender.com/api/history/progress",
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    idUsuario:
                        user.idUsuario,

                    idHistoria,

                    idPregunta
                })
            }
        )

        navigate(
            `/story/${idHistoria}`
        )

    }, 1000)
}

    if (loading) {

        return (
            <h1>
                Cargando...
            </h1>
        )
    }

    const minutes =
        Math.floor(
            timeLeft / 60
        )

    const seconds =
        timeLeft % 60

    return (

        <>

            <Navbar />

            <div className="game-container">

    <div className="game-card">

        <h1>
            Historia
        </h1>

        <h2>
            Tiempo: {minutes}:{seconds
                .toString()
                .padStart(2, "0")}
        </h2>

        <h1 className="question">
            {question.pregunta}
        </h1>

        {
            question.imagen && (

                <img
                    src={`/images/questions/${question.imagen}`}
                    alt="Capítulo"
                    className="story-image"
                />

            )
        }

        {
            question.descripcionCapitulo && (

                <p className="story-description">

                    {
                        question.descripcionCapitulo
                    }

                </p>

            )
        }

        <div className="answers-container">

            {
                question.idTipoPregunta === 3

                ? (

                    <>
                        <input
                            type="text"
                            value={textAnswer}
                            onChange={(e) =>
                                setTextAnswer(
                                    e.target.value
                                )
                            }
                            placeholder="Tu respuesta"
                            className="story-input"
                        />

                        <button
                            onClick={
                                submitTextAnswer
                            }
                            className="story-button"
                        >
                            Responder
                        </button>
                    </>
                )

                : (

                    answers.map(
                        answer => (

                            <button
                                key={
                                    answer.idRespuesta
                                }
                                className="story-button"
                                onClick={() =>
                                    answerQuestion(
                                        answer
                                    )
                                }
                            >
                                {
                                    answer.textoRespuesta
                                }
                            </button>
                        )
                    )
                )
            }

        </div>

       {
    feedback && (

        <div className="feedback-overlay">

            <div
                className={`feedback-box ${feedback.type}`}
            >

                {feedback.text}

            </div>

        </div>

    )
}

    </div>

</div>

        </>
    )
}

export default StoryGame