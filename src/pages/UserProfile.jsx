import {
    useEffect,
    useState
} from "react"

import {
    useParams
} from "react-router-dom"

import "../styles/profile.css"
import Navbar from "../components/Navbar"
import UserAvatar from "../components/Avatar";

function UserProfile() {

    const [profile, setProfile] =
        useState(null)

    const [achievements, setAchievements] =
        useState([])

    const [avatar, setAvatar] =
        useState(null)

    const { idUsuario } = useParams()

    useEffect(() => {

    fetch(
        `https://realmind-api.onrender.com/api/users/${idUsuario}`
    )
    .then(res => res.json())
    .then(data => {

        console.log(
            "PERFIL:",
            data
        )

        setProfile(data)
    })


    fetch(
        `https://realmind-api.onrender.com/api/achievements/${idUsuario}`
    )
    .then(res => res.json())
    .then(data => setAchievements(data))


    fetch(
        `https://realmind-api.onrender.com/api/avatars/${idUsuario}`
    )
    .then(res => res.json())
    .then(data => {

        console.log(
            "AVATAR DEL USUARIO:",
            data
        )

        setAvatar(data)
    })
    .catch(error => {

        console.error(
            "Error cargando avatar:",
            error
        )

    })

}, [idUsuario])

    if (!profile) {

        return <h1>Cargando...</h1>
    }

    return (
        <>
            <Navbar />

            <h1 className="profile-title">
                Perfil de Usuario
            </h1>

            <div className="profile-header">

                <div className="profile-avatar-card">

                    {
    avatar && (


        <div className="avatar-placeholder">

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

</div>

    )
}

                    <div className="profile-names">

                        <h2>
                            {profile.nombre}
                        </h2>

                        <p>
                            {profile.apodoActivo || "Sin apodo"}
                        </p>

                    </div>

                </div>

                <div className="profile-stats">

                    <p>
                        <strong>
                            Partidas jugadas:
                        </strong>{" "}
                        {profile.partidasJugadas}
                    </p>

                    <p>
                        <strong>
                            Puntaje total:
                        </strong>{" "}
                        {profile.puntajeTotal}
                    </p>

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
                                key={
                                    achievement.idLogro
                                }
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

export default UserProfile