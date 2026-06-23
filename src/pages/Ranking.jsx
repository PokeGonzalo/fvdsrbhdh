import { useEffect, useState } from "react"

import "../styles/ranking.css"
import Navbar from "../components/Navbar"

function Ranking() {

    const [ranking, setRanking] =
        useState([])

    useEffect(() => {

        fetch(
            "http://localhost:3000/api/ranking"
        )

        .then((response) =>
            response.json()
        )

        .then((data) => {

            setRanking(data)
        })

    }, [])

    return (
        <>
    <Navbar />

    <div className="ranking-container">

            <div className="ranking-card">

                <h1 className="ranking-title">
                    Ranking Global
                </h1>

                {
                    ranking.map((player, index) => (

                        <div
                            key={index}

                            className="ranking-item"
                        >

                            <div>
                                #{index + 1}
                            </div>

                            <div>
                                {player.nombre}
                            </div>

                            <div>
                                {player.puntajeTotal} pts
                            </div>

                            

                        </div>
                    ))
                }

            </div>

        </div>
</>

        
    )
}

export default Ranking