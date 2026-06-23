import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "../styles/story.css"
import Navbar from "../components/Navbar"

function Stories() {

    const [stories, setStories] =
        useState([])

    const navigate =
        useNavigate()

    useEffect(() => {

        fetch(
            "http://localhost:3000/api/history"
        )

        .then(res => res.json())

        .then(data =>
            setStories(data)
        )

    }, [])

    

    return (
    <>
    
        <Navbar />
        

        <div className="stories-container">

            <h1 className="stories-title">
                Historias Cortas
            </h1>

            {
                stories.map(story => (

                    <div
                        key={story.idHistoria}
                        className="story-card"
                    >

                        <div className="story-info">

                            <h2>
                                {story.titulo}
                            </h2>

                            <p>
                                {story.descripcion}
                            </p>

                        </div>

                        <button
                            className="story-play-btn"
                            onClick={() =>
                                navigate(
                                    `/story/${story.idHistoria}`
                                )
                            }
                        >
                            Jugar
                        </button>

                    </div>

                ))
            }

        </div>
    </>
)
}

export default Stories