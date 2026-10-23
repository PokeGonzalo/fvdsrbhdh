import { useEffect, useState } from "react"

import {
    useParams,
    useNavigate
} from "react-router-dom"

import "../styles/game.css"

function Game() {

    const { categoria } = useParams()

    const navigate = useNavigate()

    const [questions, setQuestions] =
        useState([])

    const [currentQuestion, setCurrentQuestion] =
        useState(0)

    const [score, setScore] =
        useState(0)

    const [timeLeft, setTimeLeft] =
    useState(60)

    const [selectedAnswer, setSelectedAnswer] =
        useState(null)

    const [textAnswer, setTextAnswer] =
        useState("")

    const [textFeedback, setTextFeedback] =
        useState("")

    const [showFeedback, setShowFeedback] =
        useState(false)

    const [feedbackModal,setFeedbackModal] =
        useState(null)

    const [gameId, setGameId] =
        useState(null)

    const [gameFinished, setGameFinished] =
        useState(false)

    const [multiplier, setMultiplier] =
        useState(1)

        const [lives, setLives] =
    useState(3)

    const [gameLost, setGameLost] =
    useState(false)

const [infiniteLives, setInfiniteLives] =
    useState(false)

    const user =
        JSON.parse(
            localStorage.getItem("user")
        )

    // ======================
    // INICIAR PARTIDA
    // ======================

    useEffect(() => {

    setQuestions([])

    setCurrentQuestion(0)

    setScore(0)

    setTimeLeft(60)

    setGameFinished(false)

    setGameLost(false)

    // Crear partida

    fetch(
        "https://realmind-api.onrender.com/api/games/start",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({

                idUsuario:
                    user.idUsuario,

                modoJuego:
                    categoria
            })
        }
    )

    .then((response) =>
        response.json()
    )

    .then((data) => {

        console.log(
            "ID PARTIDA:",
            data.idPartida
        )

        setGameId(
            data.idPartida
        )
    })

    // Obtener booster activo

    fetch(
        `https://realmind-api.onrender.com/api/store/active-booster/${user.idUsuario}`
    )

    .then((response) =>
        response.json()
    )

    .then((data) => {

        console.log(
            "BOOSTER:",
            data
        )

        setMultiplier(
            data.multiplicador || 1
        )
    })

    // Cargar preguntas

    fetch(
        `https://realmind-api.onrender.com/api/questions/${categoria}`
    )

    .then(async (response) => {

    console.log(
        "STATUS:",
        response.status
    )

    const text =
        await response.text()

    console.log(
        "RESPUESTA:",
        text
    )

    return JSON.parse(text)

})

.then((data) => {

    console.log(
        "DATA:",
        data
    )

    const randomQuestions =
        [...data]

            .sort(() =>
                Math.random() - 0.5
            )

            .slice(0, 5)

        setQuestions(
            randomQuestions
        )
    })

    if (user.idPlan === 1) {

    setLives(3)

}

if (user.idPlan === 2) {

    setLives(5)

}

if (user.idPlan === 3) {

    setInfiniteLives(true)

}

}, [categoria])

    // ======================
    // TIMER
    // ======================

    useEffect(() => {

    if (
        gameFinished ||
        currentQuestion >= questions.length
    ) {
        return
    }

    const timer =
        setInterval(async () => {

            setTimeLeft((prev) => {

                if (prev <= 1) {

                    finishGame(score)

                    setCurrentQuestion(
                        questions.length
                    )

                    return 0
                }

                return prev - 1
            })

        }, 1000)

    return () =>
        clearInterval(timer)

}, [
    gameFinished,
    currentQuestion,
    questions,
    score
])

    // ======================
    // FINALIZAR PARTIDA
    // ======================

    const finishGame =
        async (finalScore) => {

        if (
            gameFinished ||
            !gameId
        ) {
            return
        }

        setGameFinished(true)

        console.log(
            "FINALIZANDO PARTIDA:",
            gameId
        )

        await fetch(
            "https://realmind-api.onrender.com/api/games/finish",
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    idPartida:
                        gameId,

                    puntajeTotal:
                        finalScore
                })
            }
        )
    }

    // ======================
    // RESPONDER
    // ======================

    const handleAnswer = async (respuesta) => {

        if (showFeedback)
            return

        setSelectedAnswer(
            respuesta.idRespuesta
        )

        setShowFeedback(true)

        let newScore = score

        if (respuesta.correcta) {

    newScore += 10 * multiplier

    setScore(newScore)

} else {

    if (!infiniteLives) {

        const remainingLives =
            lives - 1

        setLives(
            remainingLives
        )

        if (
            remainingLives <= 0
        ) {

            setGameLost(true)

            await finishGame(0)

            setCurrentQuestion(
                questions.length
            )

            return
        }
    }

    // Mostrar respuesta incorrecta durante 1 segundo

    setTimeout(() => {

        setSelectedAnswer(
            null
        )

        setShowFeedback(
            false
        )

    }, 1000)

    return
}

        setTimeout(
            async () => {

                if (
                    currentQuestion + 1 >=
                    questions.length
                ) {

                    await finishGame(
                        newScore
                    )
                }

                setCurrentQuestion(
                    currentQuestion + 1
                )

                setSelectedAnswer(
                    null
                )

                setShowFeedback(
                    false
                )

            },
            1000
        )
    }
    const submitTextAnswer = async () => {

    const question =
        questions[currentQuestion]

    const correct =
        textAnswer
            .trim()
            .toLowerCase()
        ===
        question
            .respuestaTexto
            .trim()
            .toLowerCase()

    let newScore = score

    if (correct) {

        setFeedbackModal({
            text: "✅ CORRECTO",
            type: "success"
        })

        newScore +=
            question.puntosBase *
            multiplier

        setScore(newScore)

        setTimeout(
            async () => {

                setTextAnswer("")

                if (
                    currentQuestion + 1 >=
                    questions.length
                ) {

                    await finishGame(
                        newScore
                    )

                    setCurrentQuestion(
                        questions.length
                    )

                    setFeedbackModal(
                        null
                    )

                    return
                }

                setCurrentQuestion(
                    currentQuestion + 1
                )

                setFeedbackModal(
                    null
                )

            },
            1000
        )

        return

    } else {

        setFeedbackModal({
            text: "❌ INCORRECTO",
            type: "error"
        })

        if (!infiniteLives) {

            const remainingLives =
                lives - 1

            setLives(
                remainingLives
            )

            if (
                remainingLives <= 0
            ) {

                setGameLost(true)

                await finishGame(0)

                setCurrentQuestion(
                    questions.length
                )

                return
            }
        }

        
}

    setTimeout(() => {

    setFeedbackModal(
        null
    )

}, 1000)

    return
}

    // ======================
    // CARGANDO
    // ======================

    if (
        questions.length === 0
    ) {

        return (
            <h1>
                Cargando...
            </h1>
        )
    }

    const question = questions[currentQuestion]

    // ======================
    // FIN DEL JUEGO
    // ======================

    if (
    currentQuestion >=
    questions.length
) {

    return (

        <div className="game-container">

            <div className="game-card">

                <h1 className="end-title">

                    {
                        gameLost
                        ? "Has perdido"
                        : "Juego terminado"
                    }

                </h1>

                <h2 className="final-score">

                    {
                        gameLost
                        ? "Te quedaste sin vidas"
                        : `Puntaje: ${score}`
                    }

                </h2>

                <button
                    className="answer-btn"
                    onClick={() =>
                        navigate("/home")
                    }
                >
                    Volver al menú
                </button>

            </div>

        </div>
    )
}

    

    return (

        <div className="game-container">

            <div className="game-card">

                <div className="timer">

    {
        Math.floor(timeLeft / 60)
    }

    :

    {
        String(
            timeLeft % 60
        ).padStart(2, "0")
    }

</div>

                <div className="score">
                    Puntaje:
                    {" "}
                    {score}
                </div>


<div className="lives">

    {
        infiniteLives

        ? "❤️Vidas Infinitas"

        : `❤️ ${lives}`
    }

</div>

{
    question.imagen && (

        <img

            src={`/images/questions/${question.imagen}`}

            alt="Acertijo gráfico"

            className="question-image"
        />
    )
}

                <div className="category">
                    {
                        categoria
                            .toUpperCase()
                    }
                </div>

                <h1 className="question">
                    {
                        question.pregunta
                    }
                </h1>

                <div className="answers">

    {
        question.idTipoPregunta === 3 ||
        question.idTipoPregunta === 4
        ? (
            <div>
                <input
    type="text"
    value={textAnswer}
    onChange={(e) =>
        setTextAnswer(e.target.value)
    }
    placeholder="Escribe tu respuesta"
/>

<button onClick={submitTextAnswer}>
    Responder
</button>
            </div>
        )
        : (
            (question.respuestas || []).map((respuesta) => (
                <button
                    key={respuesta.idRespuesta}
                    className={`
                        answer-btn
                        ${
                            showFeedback && respuesta.correcta
                                ? "correct"
                                : ""
                        }
                        ${
                            showFeedback &&
                            selectedAnswer === respuesta.idRespuesta &&
                            !respuesta.correcta
                                ? "wrong"
                                : ""
                        }
                    `}
                    disabled={showFeedback}
                    onClick={() => handleAnswer(respuesta)}
                >
                    {respuesta.textoRespuesta}
                </button>
            ))
        )
    }

</div>

{
    feedbackModal && (

        <div
            className="feedback-overlay"
        >

            <div
                className={`feedback-box ${feedbackModal.type}`}
            >

                {feedbackModal.text}

            </div>

        </div>

    )
}

            </div>

        </div>
    )
}

export default Game