import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "../styles/game.css"

function DemoGame() {

    const navigate = useNavigate()

    const [questions, setQuestions] =
        useState([])

    const [currentQuestion, setCurrentQuestion] =
        useState(0)

        const [textAnswer, setTextAnswer] =
    useState("")

const [selectedAnswer, setSelectedAnswer] =
    useState(null)

const [showFeedback, setShowFeedback] =
    useState(false)

    const [feedbackModal, setFeedbackModal] =
    useState(null)

    useEffect(() => {

        fetch(
            "http://localhost:3000/api/games/demo"
        )
        .then(res => res.json())
        .then(data => {

    console.log("DEMO:", data)

    setQuestions(data)
})

    }, [])

    if (questions.length === 0) {

        return <h1>Cargando...</h1>
    }

    const nextQuestion = () => {

        if (
            currentQuestion <
            questions.length - 1
        ) {

            setCurrentQuestion(
                currentQuestion + 1
            )

        } else {

            navigate("/demo-finish")
        }
    }

    const question =
        questions[currentQuestion]

        console.log("QUESTION ACTUAL:", question)

        console.log(
    "RESPUESTAS:",
    question.respuestas
)

const handleAnswer = (
    respuesta
) => {

    setSelectedAnswer(
        respuesta.idRespuesta
    )

    setShowFeedback(true)

    setFeedbackModal({

        text: respuesta.correcta
            ? "✅ CORRECTO"
            : "❌ INCORRECTO",

        type: respuesta.correcta
            ? "success"
            : "error"
    })

    setTimeout(() => {

        setSelectedAnswer(null)

        setShowFeedback(false)

        setFeedbackModal(null)

        nextQuestion()

    }, 1000)
}

const submitTextAnswer = () => {

    const question =
        questions[currentQuestion]

    const correct =
        textAnswer
            .trim()
            .toLowerCase() ===
        question.respuestaTexto
            ?.trim()
            .toLowerCase()

    setFeedbackModal({
        text: correct
            ? "✅ CORRECTO"
            : "❌ INCORRECTO",
        type: correct
            ? "success"
            : "error"
    })

    setTimeout(() => {

        setTextAnswer("")
        setFeedbackModal(null)
        nextQuestion()

    }, 1000)
}

    return (

        <div className="game-container">
            <div className="game-card">

            <h2 className="question">
                {question.pregunta}
            </h2>

            {
    question.imagen && (

        <img
            src={`/images/questions/${question.imagen}`}
            alt="Pregunta"
            className="question-image"
        />

    )
}

<div className="answers">
    {
    question.idTipoPregunta === 3 ||
    question.idTipoPregunta === 4 ? (

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

    ) : (

        (question.respuestas || []).map((respuesta) => (

            <button
                key={respuesta.idRespuesta}
                onClick={() =>
                    handleAnswer(respuesta)
                }
            >
                {respuesta.textoRespuesta}
            </button>

        ))

    )
}
</div>


    {
    feedbackModal && (

        <div className="feedback-overlay">

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

export default DemoGame