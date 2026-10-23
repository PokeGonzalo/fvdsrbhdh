import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "../styles/market.css"
import Navbar from "../components/Navbar"

function Market() {

    const navigate = useNavigate()

    const user =
        JSON.parse(
            localStorage.getItem("user")
        )

    const [selectedPlan, setSelectedPlan] =
        useState(user.idPlan)

    const plans = [

        {
            id: 1,
            nombre: "GRATIS",
            descripcion:
                "3 vidas"
        },

        {
            id: 2,
            nombre: "BÁSICO",
            descripcion:
                "5 vidas"
        },

        {
            id: 3,
            nombre: "PREMIUM",
            descripcion:
                "vidas infinitas"
        }
    ]

    const changePlan = async () => {

        const response = await fetch(
            "https://realmind-api.onrender.com/api/plans/update",
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    idUsuario:
                        user.idUsuario,

                    idPlan:
                        selectedPlan
                })
            }
        )

        if (response.ok) {

            user.idPlan =
                selectedPlan

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            )

            alert(
                "Plan actualizado correctamente"
            )

        }
    }

    const [profile, setProfile] =
    useState(null)

    const [items, setItems] =
    useState([])

    useEffect(() => {

    fetch(
        `https://realmind-api.onrender.com/api/profile/${user.idUsuario}`
    )
    .then(res => res.json())
    .then(data => setProfile(data))

    fetch(
        "https://realmind-api.onrender.com/api/store"
    )
    .then(res => res.json())
    .then(data => setItems(data))

}, [])

const buyItem = async (idItem) => {

    const response = await fetch(
        "https://realmind-api.onrender.com/api/store/buy",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({

                idUsuario:
                    user.idUsuario,

                idItem
            })
        }
    )

    const data =
        await response.json()

    if (response.ok) {

        alert(
            "Compra realizada"
        )

        setProfile({

            ...profile,

            monedas:
                data.monedasRestantes
        })

    } else {

        alert(data.message)
    }
}

    return (
        <>
    <Navbar />

    <div className="market-container">

        <div className="market-card">

            <h1 className="market-title">
                Mercado
            </h1>

            <h2 className="coins">
                💲 {profile?.monedas || 0}
            </h2>

            {/* PLANES */}

            <div className="plans-section">

                <h2>
                    Planes
                </h2>

                <div className="plans-grid">

                    {plans.map(plan => (

                        <div
                            key={plan.id}
                            className={`plan-box ${
                                selectedPlan === plan.id
                                    ? "selected"
                                    : ""
                            }`}
                        >

                            <h3>
                                {plan.nombre}
                            </h3>

                            <p>
                                {plan.descripcion}
                            </p>

                            <p className="plan-price">

                                {plan.id === 1 && "$0"}

                                {plan.id === 2 && "$4.99"}

                                {plan.id === 3 && "$9.99"}

                            </p>

                            <input
                                type="radio"
                                checked={
                                    selectedPlan === plan.id
                                }
                                onChange={() =>
                                    setSelectedPlan(plan.id)
                                }
                            />

                        </div>

                    ))}

                </div>

                <button
                    className="change-plan-btn"
                    onClick={changePlan}
                >
                    Cambiar plan
                </button>

            </div>

            {/* INVENTARIO */}

            <div className="market-bottom">

                {/* BOOSTERS */}

                <div className="market-section">

                    <h2>
                        Potenciadores
                    </h2>

                    {
                        items
                        .filter(
                            item =>
                                item.tipoItem === "BOOSTER"
                        )
                        .map(item => (

                            <div
                                key={item.idItem}
                                className="shop-row"
                            >

                                <div>

                                    <h3>
                                        {item.nombreItem}
                                    </h3>

                                    <p>
                                        {item.descripcion}
                                    </p>

                                    <p>
                                       💲{item.precioMonedas}
                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        buyItem(item.idItem)
                                    }
                                >
                                    Comprar
                                </button>

                            </div>

                        ))
                    }

                </div>

                {/* APODOS */}

                <div className="market-section">

                    <h2>
                        Apodos
                    </h2>

                    {
                        items
                        .filter(
                            item =>
                                item.tipoItem === "APODO" ||
                                item.tipoItem === "APODO_LOGRO"
                        )
                        .map(item => (

                            <div
                                key={item.idItem}
                                className="shop-row"
                            >

                                <div>

                                    <h3>
                                        {item.nombreItem}
                                    </h3>

                                    <p>
                                        {item.descripcion}
                                    </p>
                                    
                                    <p>
                                       💲{item.precioMonedas}
                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        buyItem(item.idItem)
                                    }
                                >
                                    Comprar
                                </button>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    </div>

</>

        
    )
}

export default Market