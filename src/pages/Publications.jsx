import {
    useEffect,
    useState
} from "react"

import {
    useNavigate
} from "react-router-dom"

import "../styles/publications.css"
import Navbar from "../components/Navbar"

function Publications() {

    const [content, setContent] =
        useState("")

    const [publications, setPublications] =
    useState([])

    const [showModal, setShowModal] =
    useState(false)

    const [users, setUsers] =
    useState([])

    const navigate =
    useNavigate()

    const user =
        JSON.parse(
            localStorage.getItem("user")
        )

        


    useEffect(() => {

    loadPublications()

    fetch(
        "http://localhost:3000/api/users"
    )
    .then(res => res.json())
    .then(data =>
        setUsers(data)
    )

}, [])

    useEffect(() => {

    fetch(
        "http://localhost:3000/api/publications"
    )
    .then(res => res.json())
    .then(data =>
        setPublications(data)
    )

}, [])

const loadPublications = () => {

    fetch(
        "http://localhost:3000/api/publications"
    )
    .then(res => res.json())
    .then(data =>
        setPublications(data)
    )
}

    const createPublication = async () => {

    if (!content.trim()) return

    const response = await fetch(
        "http://localhost:3000/api/publications",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuario: user.idUsuario,
                contenido: content
            })
        }
    )

    if (!response.ok) {
        alert("Error al publicar")
        return
    } else {
        alert(
                "Publicacion exitosa"
            )
    }

    setContent("")

    await loadPublications()

    setShowModal(false)
}

    const likePost = async (id) => {

    const response = await fetch(

        `http://localhost:3000/api/publications/like/${id}`,

        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({

                idUsuario:
                    user.idUsuario
            })
        }
    )

    const data =
        await response.json()

    if (!response.ok) {

        alert(data.message)

        return
    }

    loadPublications()
}


const giveLike = async (idPublicacion) => {

    await fetch(
        `http://localhost:3000/api/publications/like/${idPublicacion}`,
        {
            method: "POST"
        }
    )

    loadPublications()
}

useEffect(() => {

    loadPublications()

}, [])

useEffect(() => {

    fetch(
        "http://localhost:3000/api/users"
    )
    .then(res => res.json())
    .then(data => {

        console.log(data)

        setUsers(data)

    })

}, [])



    return (
        <>
    <Navbar />

    <div className="publications-container">

        <div className="feed-container">

            {
                publications.map(publication => (

                    <div
                        key={publication.idPublicacion}
                        className="publication-card"
                    >

                        <div className="publication-header">

                            <h3>
                                {publication.nombre}
                            </h3>

                            <span>
                                {publication.fecha}
                            </span>

                        </div>

                        <div className="publication-content">

                            {publication.contenido}

                        </div>

                        <div className="publication-footer">

                        <button
                            className="like-btn"
                            onClick={() =>
                                likePost(
                                    publication.idPublicacion
                                )
                            }
                        >
                            ❤️ {publication.likes}
                        </button>

                        <span>
                            {publication.fecha}
                        </span>

                    </div>

                    </div>
                ))
            }

        </div>

        <div className="users-sidebar">

    <h2>
        Usuarios
    </h2>

    <div className="users-list">

        {users.map(user => (

            <div
                key={user.idUsuario}
                className="user-card"
            >

                <div>

                    <strong>
                        {user.nombre}
                    </strong>

                    {
                        user.apodoActivo && (

                            <p>
                                {user.apodoActivo}
                            </p>

                        )
                    }

                </div>

                <button
                    onClick={() =>
                    navigate(
                        `/user/${user.idUsuario}`
                        )
                    }
                >
                    Ver perfil
                </button>

            </div>

        ))}

    </div>

</div>

        <button
            className="create-post-btn"
            onClick={() =>
                setShowModal(true)
            }
        >
            ⬆
        </button>

        {
            showModal && (

                <div className="modal-overlay">

                    <div className="post-modal">

                        <h2>
                            ¿Qué estás pensando?
                        </h2>

                        <textarea
                            value={content}
                            onChange={(e) =>
                                setContent(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            onClick={
                                createPublication
                            }
                        >
                            Publicar
                        </button>

                    </div>

                </div>
            )
        }

    </div>

</>

        
    )
}

export default Publications