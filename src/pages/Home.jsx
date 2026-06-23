import { useState } from "react"

import {
    useNavigate
} from "react-router-dom"

import "../styles/home.css"
import Navbar from "../components/Navbar"

function Home() {

    const navigate = useNavigate()

    const [selectedCategory, setSelectedCategory] =
    useState(null)

    const [showModal, setShowModal] =
    useState(false)

    const categories = [

    "adivinanzas",

    "matematicos",

    "graficos",

    "historias"
]

const categoryInfo = {

    adivinanzas: {

        title: "Adivinanzas",

        description:
            "Pon a prueba tu ingenio resolviendo acertijos clásicos.",

        mode:
            "Lee la adivinanza y selecciona la respuesta correcta."
    },

    matematicos: {

        title: "Matemáticos",

        description:
            "Resuelve operaciones y problemas matemáticos.",

        mode:
            "Escribe la respuesta correcta en la caja de texto."
    },

    graficos: {

        title: "Gráficos",

        description:
            "Analiza imágenes y encuentra la solución.",

        mode:
            "Observa la imagen y escribe tu respuesta."
    },

    historias: {

        title: "Historias",

        description:
            "Avanza por capítulos resolviendo desafíos.",

        mode:
            "Cada capítulo desbloquea el siguiente al completarlo."
    }
}
    const selectCategory = (category) => {

    setSelectedCategory(category)

    setShowModal(true)
}

    return (

        <>

            <Navbar />

            <div className="home-container">

                <div className="home-card">

                    <h1 className="home-title">
                        REALMIND
                    </h1>

                    <p className="home-subtitle">
                        Elige una categoría
                    </p>

                    <div className="category-list">

                        {
                            categories.map((category) => (

                                <button

                                    key={category}

                                    className="category-btn"

                                    onClick={() =>
                                        selectCategory(category)
                                    }
                                >

                                    {category}

                                </button>
                            ))
                        }

                    </div>

                    {
    showModal && (

        <div className="modal-overlay">

            <div className="category-modal">

                <h2>

                    {
                        categoryInfo[selectedCategory]
                            ?.title
                    }

                </h2>

                <p>

                    {
                        categoryInfo[selectedCategory]
                            ?.description
                    }

                </p>

                <p>

                    <strong>
                        Cómo jugar:
                    </strong>

                    {" "}

                    {
                        categoryInfo[selectedCategory]
                            ?.mode
                    }

                </p>

                <div className="modal-buttons">

                    <button

    className="start-btn"

    onClick={() => {

        setShowModal(false)

        if (
            selectedCategory === "historias"
        ) {

            navigate("/stories")

        } else {

            navigate(
                `/game/${selectedCategory}`
            )
        }
    }}
>

    Empezar

</button>

                    <button

                        className="cancel-btn"

                        onClick={() =>
                            setShowModal(false)
                        }
                    >

                        Cancelar

                    </button>

                </div>

            </div>

        </div>
    )
}

                </div>

            </div>

        </>
    )
}

export default Home