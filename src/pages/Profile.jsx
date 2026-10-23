import {
    useEffect,
    useState
} from "react"

import { useNavigate } from "react-router-dom"

import "../styles/profile.css"
import Navbar from "../components/Navbar"
import UserAvatar from "../components/Avatar"

function Profile() {

    const [profile, setProfile] =
        useState(null)

    const user =
        JSON.parse(
            localStorage.getItem("user")
        )

    const [achievements, setAchievements] =
    useState([])

    const [inventory, setInventory] =
    useState([])

    const [selectedPhoto, setSelectedPhoto] =
    useState(null)

    const [avatar, setAvatar] = useState(null)

    const navigate = useNavigate()

    const activateItem = async (idItem) => {

    const response = await fetch(
        "https://realmind-api.onrender.com/api/store/activate",
        {
            method: "PUT",

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

    alert(data.message)
}
const equipNickname = async (apodo) => {

    const response = await fetch(
        "https://realmind-api.onrender.com/api/profile/apodo",
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({

                idUsuario:
                    user.idUsuario,

                apodo
            })
        }
    )

    const data =
        await response.json()

    alert(data.message)

    window.location.reload()
}

const uploadPhoto = async () => {

    if (!selectedPhoto) {

        alert("Seleccione una foto")
        return
    }

    const formData =
        new FormData()

    formData.append(
        "foto",
        selectedPhoto
    )

    formData.append(
        "idUsuario",
        user.idUsuario
    )

    const response =
        await fetch(
            "https://realmind-api.onrender.com/api/profile/photo",
            {
                method: "POST",
                body: formData
            }
        )

    const data =
        await response.json()

    if (response.ok) {

        setProfile({

            ...profile,

            fotoPerfil:
                data.fotoPerfil
        })

        alert(
            "Foto actualizada"
        )
    }
}

    useEffect(() => {

        if (!user) {
        return
    }

    fetch(
        `https://realmind-api.onrender.com/api/avatars/${user.idUsuario}`
    )
        .then(res => res.json())
        .then(data => {

            console.log(
                "AVATAR DEL PERFIL:",
                data
            )

            setAvatar(data)

        })
        .catch(error => {

            console.error(
                "Error al cargar avatar:",
                error
            )

        })

        fetch(
        `https://realmind-api.onrender.com/api/profile/${user.idUsuario}`
    )

    .then((response) =>
        response.json()
    )

    .then((data) => {

        console.log(data)
    console.log(data.fotoPerfil)
    
        setProfile(data)
    })

    // Logros

    fetch(
        `https://realmind-api.onrender.com/api/achievements/${user.idUsuario}`
    )

    .then((response) =>
        response.json()
    )

    .then((data) => {

        setAchievements(data)
    })

    fetch(
    `https://realmind-api.onrender.com/api/store/inventory/${user.idUsuario}`
)
.then(res => res.json())
.then(data => setInventory(data))

}, [])



    if (!profile) {

        return <h1>Cargando...</h1>
    }

    return (
        <>
    <Navbar />

    <h1 className="profile-title">
    Perfil
</h1>

<div className="profile-header">

    <div className="profile-avatar-card">

        <div className="avatar-placeholder">

    {
        avatar
            ? (

                <div className="profile-avatar-container">

    <UserAvatar
        topType={avatar.peinado}
        hairColor={avatar.colorPelo}
        skinColor={avatar.colorPiel}
        eyeType={avatar.ojos}
        eyebrowType={avatar.cejas}
        mouthType={avatar.boca}
        clotheType={avatar.ropa}
        clotheColor={avatar.colorRopa}
        accessoriesType={avatar.accesorio}
    />

</div>

            )
            : (
                <p>
                    Todavía no tenés un avatar
                </p>
            )

    }

</div>

<button
    onClick={() => navigate("/avatar-editor")}
    className="edit-avatar-btn"
>
    Editar avatar
</button>



        <div className="profile-names">

            <h2>{profile.nombre}</h2>

            <p>
                {profile.apodoActivo || "Sin apodo"}
            </p>

        </div>

    </div>

    <div className="profile-stats">

        <p>
            <strong>Email:</strong>
            {" "}
            {profile.email}
        </p>

        <p>
            <strong>Plan:</strong>
            {" "}
            {profile.plan}
        </p>

        <p>
            <strong>Partidas jugadas:</strong>
            {" "}
            {profile.partidasJugadas}
        </p>

        <p>
            <strong>Puntaje total:</strong>
            {" "}
            {profile.puntajeTotal}
        </p>

        <p>
            <strong>Monedas:</strong>
            {" "}
            💲{profile.monedas}
        </p>

    </div>

</div>

<h2 className="section-title">
    Inventario
</h2>

<div className="inventory-section">

    <div className="inventory-column">

        <h3>Potenciadores</h3>

        {
            inventory
                .filter(
                    item =>
                        item.tipoItem ===
                        "BOOSTER"
                )
                .map(item => (

                    <div
                        key={item.idItem}
                        className="inventory-item"
                    >

                        <div>

                            <strong>
                                {item.nombreItem}
                            </strong>

                            <p>
                                {item.descripcion}
                            </p>

                            <p>
                                Cantidad:
                                {" "}
                                {item.cantidad}
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                activateItem(
                                    item.idItem
                                )
                            }
                        >
                            Activar
                        </button>

                    </div>

                ))
        }

    </div>

    <div className="inventory-column">

        <h3>Apodos</h3>

        {
            inventory
                .filter(
                    item =>
                        item.tipoItem ===
                            "APODO" ||

                        item.tipoItem ===
                            "APODO_LOGRO"
                )
                .map(item => (

                    <div
                        key={item.idItem}
                        className="inventory-card"
                    >

                        <div>

                            <strong>
                                {item.nombreItem}
                            </strong>

                        </div>

                        <button
                            onClick={() =>
                                equipNickname(
                                    item.nombreItem
                                )
                            }
                        >
                            Equipar
                        </button>

                    </div>

                ))
        }

    </div>

</div>

<h2 className="section-title">
    Logros
</h2>

<div className="achievements-container">

    {
        achievements.map(
            achievement => (

                <div
    key={achievement.idLogro}
    className={
        achievement.obtenido
        ? "achievement unlocked"
        : "achievement locked"
    }
>

    <div className="achievement-header">

        <span className="achievement-icon">

            {
                achievement.obtenido
                ? "🏆"
                : "🔒"
            }

        </span>

        <span className="achievement-name">

            {
                achievement.nombreLogro
            }

        </span>

        <p>
                        {
                            achievement.descripcion
                        }
                    </p>

    </div>

</div>

            )
        )
    }

</div>


</>

        
    )
}

export default Profile