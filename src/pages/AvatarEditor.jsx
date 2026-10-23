import {
    useState,
    useEffect
} from "react"

import {
    useNavigate
} from "react-router-dom"

import "../styles/avatarEditor.css"

import UserAvatar from "../components/Avatar"

const user =
    JSON.parse(
        localStorage.getItem("user")
    )



const hairstyles = [

    "ShortHairShortFlat",
    "ShortHairShortRound",
    "ShortHairShortWaved",
    "ShortHairShaggy",
    "LongHairBob",
    "LongHairCurly"

]

const hairstyleNames = [

    "Pelo corto liso",
    "Pelo corto redondo",
    "Pelo corto ondulado",
    "Pelo corto despeinado",
    "Pelo largo bob",
    "Pelo largo rizado"

]

function AvatarEditor() {

    const [hairIndex, setHairIndex] =
    useState(0)

    const hairColors = [

    "BrownDark",
    "Brown",
    "Auburn",
    "Black",
    "Blonde",
    "PastelPink"

]

const hairColorNames = [

    "Castaño oscuro",
    "Castaño",
    "Cobrizo",
    "Negro",
    "Rubio",
    "Rosa pastel"

]

const skinColors = [

    "Light",
    "Tanned",
    "Yellow",
    "Pale",
    "Brown",
    "DarkBrown",
    "Black"

]

const skinColorNames = [

    "Claro",
    "Bronceado",
    "Amarillo",
    "Pálido",
    "Marrón",
    "Marrón oscuro",
    "Oscuro"

]

const eyeTypes = [

    "Default",
    "Close",
    "Cry",
    "Dizzy",
    "EyeRoll",
    "Happy",
    "Hearts",
    "Side",
    "Squint",
    "Surprised",
    "Wink",
    "WinkWacky"

]

const eyeNames = [

    "Normal",
    "Cerrados",
    "Llorando",
    "Mareados",
    "Mirando hacia arriba",
    "Felices",
    "Corazones",
    "De costado",
    "Entrecerrados",
    "Sorprendidos",
    "Guiño",
    "Guiño divertido"

]

const eyebrowTypes = [

    "Default",
    "DefaultNatural",
    "Angry",
    "AngryNatural",
    "FlatNatural",
    "RaisedExcited",
    "RaisedExcitedNatural",
    "SadConcerned",
    "SadConcernedNatural",
    "UnibrowNatural",
    "UpDown",
    "UpDownNatural"

]

const eyebrowNames = [

    "Normal",
    "Naturales",
    "Enojadas",
    "Enojadas naturales",
    "Planos naturales",
    "Levantadas",
    "Levantadas naturales",
    "Tristes",
    "Tristes naturales",
    "Uniceja",
    "Arriba y abajo",
    "Arriba y abajo naturales"

]

const mouthTypes = [

    "Default",
    "Concerned",
    "Disbelief",
    "Eating",
    "Grimace",
    "Sad",
    "ScreamOpen",
    "Serious",
    "Smile",
    "Tongue",
    "Twinkle",
    "Vomit"

]

const mouthNames = [

    "Normal",
    "Preocupada",
    "Incrédula",
    "Comiendo",
    "Mueca",
    "Triste",
    "Grito",
    "Seria",
    "Sonrisa",
    "Lengua",
    "Brillante",
    "Vómito"

]

const clotheTypes = [

    "BlazerShirt",
    "BlazerSweater",
    "CollarSweater",
    "GraphicShirt",
    "Hoodie",
    "Overall",
    "ShirtCrewNeck",
    "ShirtScoopNeck",
    "ShirtVNeck"

]

const clotheNames = [

    "Camisa con blazer",
    "Blazer con sweater",
    "Sweater con cuello",
    "Remera estampada",
    "Hoodie",
    "Overol",
    "Remera cuello redondo",
    "Remera cuello abierto",
    "Remera cuello V"

]

const clotheColors = [

    "Black",
    "Blue01",
    "Blue02",
    "Blue03",
    "Gray01",
    "Gray02",
    "Heather",
    "PastelBlue",
    "PastelGreen",
    "PastelOrange",
    "PastelRed",
    "PastelYellow",
    "Pink",
    "Red",
    "White"

]

const clotheColorNames = [

    "Negro",
    "Azul 1",
    "Azul 2",
    "Azul 3",
    "Gris 1",
    "Gris 2",
    "Gris jaspeado",
    "Azul pastel",
    "Verde pastel",
    "Naranja pastel",
    "Rojo pastel",
    "Amarillo pastel",
    "Rosa",
    "Rojo",
    "Blanco"

]

const accessoryTypes = [

    "Blank",
    "Kurt",
    "Prescription01",
    "Prescription02",
    "Round",
    "Sunglasses",
    "Wayfarers"

]

const accessoryNames = [

    "Sin accesorios",
    "Kurt",
    "Anteojos 1",
    "Anteojos 2",
    "Anteojos redondos",
    "Lentes de sol",
    "Wayfarers"

]

    const [hairColorIndex, setHairColorIndex] =
    useState(0)

    const [skinColorIndex, setSkinColorIndex] =
    useState(0)

    const [eyeIndex, setEyeIndex] =
    useState(0)

    const [eyebrowIndex, setEyebrowIndex] =
    useState(0)

    const [mouthIndex, setMouthIndex] =
    useState(0)

    const [clotheIndex, setClotheIndex] =
    useState(0)

    const [clotheColorIndex, setClotheColorIndex] =
    useState(0)

    const [accessoryIndex, setAccessoryIndex] =
    useState(0)

    const [activeTab, setActiveTab] =
    useState("appearance")

    

    const navigate = useNavigate()

    useEffect(() => {

    if (!user) {
        return
    }

    fetch(
        `1. https://realmind-api.onrender.com/api/avatars/${user.idUsuario}`
    )
        .then(res => res.json())
        .then(data => {

            console.log(
                "AVATAR GUARDADO:",
                data
            )

            if (!data) {

                setAvatarExists(false)

                return
            }

            setAvatarExists(true)


            // PELO
            const savedHairIndex =
                hairstyles.indexOf(data.peinado)

            if (savedHairIndex !== -1) {

                setHairIndex(savedHairIndex)

            }


            // COLOR DE PELO
            const savedHairColorIndex =
                hairColors.indexOf(data.colorPelo)

            if (savedHairColorIndex !== -1) {

                setHairColorIndex(
                    savedHairColorIndex
                )

            }


            // COLOR DE PIEL
            const savedSkinColorIndex =
                skinColors.indexOf(data.colorPiel)

            if (savedSkinColorIndex !== -1) {

                setSkinColorIndex(
                    savedSkinColorIndex
                )

            }


            // OJOS
            const savedEyeIndex =
                eyeTypes.indexOf(data.ojos)

            if (savedEyeIndex !== -1) {

                setEyeIndex(
                    savedEyeIndex
                )

            }


            // CEJAS
            const savedEyebrowIndex =
                eyebrowTypes.indexOf(data.cejas)

            if (savedEyebrowIndex !== -1) {

                setEyebrowIndex(
                    savedEyebrowIndex
                )

            }


            // BOCA
            const savedMouthIndex =
                mouthTypes.indexOf(data.boca)

            if (savedMouthIndex !== -1) {

                setMouthIndex(
                    savedMouthIndex
                )

            }


            // ROPA
            const savedClotheIndex =
                clotheTypes.indexOf(data.ropa)

            if (savedClotheIndex !== -1) {

                setClotheIndex(
                    savedClotheIndex
                )

            }


            // COLOR DE ROPA
            const savedClotheColorIndex =
                clotheColors.indexOf(
                    data.colorRopa
                )

            if (savedClotheColorIndex !== -1) {

                setClotheColorIndex(
                    savedClotheColorIndex
                )

            }


            // ACCESORIO
            const savedAccessoryIndex =
                accessoryTypes.indexOf(
                    data.accesorio
                )

            if (savedAccessoryIndex !== -1) {

                setAccessoryIndex(
                    savedAccessoryIndex
                )

            }

        })
        .catch(error => {

            console.error(
                "Error al cargar avatar:",
                error
            )

        })

}, [])

const saveAvatar = () => {

    if (!user) {
        return
    }

    setSaving(true)

    setSaveMessage("")


    const avatarData = {

        idUsuario: user.idUsuario,

        peinado:
            hairstyles[hairIndex],

        colorPelo:
            hairColors[hairColorIndex],

        colorPiel:
            skinColors[skinColorIndex],

        ojos:
            eyeTypes[eyeIndex],

        cejas:
            eyebrowTypes[eyebrowIndex],

        boca:
            mouthTypes[mouthIndex],

        ropa:
            clotheTypes[clotheIndex],

        colorRopa:
            clotheColors[clotheColorIndex],

        accesorio:
            accessoryTypes[accessoryIndex]

    }


    const url = avatarExists

        ? `1. https://realmind-api.onrender.com/api/avatars/${user.idUsuario}`

        : "1. https://realmind-api.onrender.com/api/avatars"


    const method = avatarExists
        ? "PUT"
        : "POST"


    fetch(
        url,
        {
            method: method,

            headers: {
                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify(avatarData)
        }
    )
        .then(async res => {

            const data =
                await res.json()

            if (!res.ok) {

                throw new Error(
                    data.error ||
                    "No se pudo guardar el avatar"
                )

            }

            return data

        })
        .then(data => {

            console.log(
                "RESPUESTA:",
                data
            )

            setAvatarExists(true)

            setSaveMessage(
                "¡Avatar guardado correctamente!"
            )

        })
        .catch(error => {

            console.error(
                "Error al guardar avatar:",
                error
            )

            setSaveMessage(
                "No se pudo guardar el avatar."
            )

        })
        .finally(() => {

            setSaving(false)

        })

}

const [avatarExists, setAvatarExists] =
    useState(false)

const [saving, setSaving] = useState(false)

const [saveMessage, setSaveMessage] = useState("")

    return (

        <div className="avatar-editor-page">

            <h1>
                Personalizar Avatar
            </h1>

            <div className="avatar-editor-container">

                <div className="avatar-preview">

                    <h2>
                        Tu Avatar
                    </h2>

                    {/* Acá vamos a colocar el avatar después */}

                    <div className="avatar-preview-avatar">
                        <UserAvatar

    topType={
        hairstyles[hairIndex]
    }

    hairColor={
        hairColors[hairColorIndex]
    }

    skinColor={
        skinColors[skinColorIndex]
    }

    eyeType={
        eyeTypes[eyeIndex]
    }

    eyebrowType={
        eyebrowTypes[eyebrowIndex]
    }

    mouthType={
    mouthTypes[mouthIndex]
    }  

    clotheType={
    clotheTypes[clotheIndex]
    }

    clotheColor={
    clotheColors[clotheColorIndex]
    }

    accessoriesType={
    accessoryTypes[accessoryIndex]
    }

/>
                    </div>

                </div>

                <div className="avatar-options">

    <h2>
        Personalización
    </h2>

    <div className="avatar-tabs">

    <button
        className={
            activeTab === "appearance"
                ? "active"
                : ""
        }
        onClick={() =>
            setActiveTab("appearance")
        }
    >
        Apariencia
    </button>

    <button
        className={
            activeTab === "clothes"
                ? "active"
                : ""
        }
        onClick={() =>
            setActiveTab("clothes")
        }
    >
        Ropa
    </button>

    <button
        className={
            activeTab === "accessories"
                ? "active"
                : ""
        }
        onClick={() =>
            setActiveTab("accessories")
        }
    >
        Accesorios
    </button>

</div>

{
    activeTab === "appearance" && (

        <div>

            {/* PELO */}

    <h3>
        Pelo
    </h3>

    <div className="avatar-option-controls">

        <button
            onClick={() => {

                setHairIndex(
                    (hairIndex - 1 + hairstyles.length)
                    % hairstyles.length
                )

            }}
        >
            ←
        </button>

        <span>
            {hairstyleNames[hairIndex]}
        </span>

        <button
            onClick={() => {

                setHairIndex(
                    (hairIndex + 1)
                    % hairstyles.length
                )

            }}
        >
            →
        </button>

    </div>


            {/* COLOR DE PELO */}

    <h3>
        Color de pelo
    </h3>

    <div className="avatar-option-controls">

        <button
            onClick={() => {

                setHairColorIndex(
                    (hairColorIndex - 1 + hairColors.length)
                    % hairColors.length
                )

            }}
        >
            ←
        </button>

        <span>
            {hairColorNames[hairColorIndex]}
        </span>

        <button
            onClick={() => {

                setHairColorIndex(
                    (hairColorIndex + 1)
                    % hairColors.length
                )

            }}
        >
            →
        </button>

    </div>


            <h3>
    Color de piel
</h3>

<div className="avatar-option-controls">

    <button
        onClick={() => {

            setSkinColorIndex(
                (skinColorIndex - 1 + skinColors.length)
                % skinColors.length
            )

        }}
    >
        ←
    </button>

    <span>
        {skinColorNames[skinColorIndex]}
    </span>

    <button
        onClick={() => {

            setSkinColorIndex(
                (skinColorIndex + 1)
                % skinColors.length
            )

        }}
    >
        →
    </button>

</div>


            <h3>
    Ojos
</h3>

<div className="avatar-option-controls">

    <button
        onClick={() => {

            setEyeIndex(
                (eyeIndex - 1 + eyeTypes.length)
                % eyeTypes.length
            )

        }}
    >
        ←
    </button>

    <span>
    {eyeNames[eyeIndex]}
    </span>

    <button
        onClick={() => {

            setEyeIndex(
                (eyeIndex + 1)
                % eyeTypes.length
            )

        }}
    >
        →
    </button>

</div>


            <h3>
    Cejas
</h3>

<div className="avatar-option-controls">

    <button
        onClick={() => {

            setEyebrowIndex(
                (eyebrowIndex - 1 + eyebrowTypes.length)
                % eyebrowTypes.length
            )

        }}
    >
        ←
    </button>

    <span>
        {eyebrowNames[eyebrowIndex]}
    </span>

    <button
        onClick={() => {

            setEyebrowIndex(
                (eyebrowIndex + 1)
                % eyebrowTypes.length
            )

        }}
    >
        →
    </button>

</div>


            <h3>
    Boca
</h3>

<div className="avatar-option-controls">

    <button
        onClick={() => {

            setMouthIndex(
                (mouthIndex - 1 + mouthTypes.length)
                % mouthTypes.length
            )

        }}
    >
        ←
    </button>

    <span>
        {mouthNames[mouthIndex]}
    </span>

    <button
        onClick={() => {

            setMouthIndex(
                (mouthIndex + 1)
                % mouthTypes.length
            )

        }}
    >
        →
    </button>

</div>

        </div>

    )
}

{
    activeTab === "clothes" && (

        <div>

           <h3>
    Ropa
</h3>

<div className="avatar-option-controls">

    <button
        onClick={() => {

            setClotheIndex(
                (clotheIndex - 1 + clotheTypes.length)
                % clotheTypes.length
            )

        }}
    >
        ←
    </button>

    <span>
        {clotheNames[clotheIndex]}
    </span>

    <button
        onClick={() => {

            setClotheIndex(
                (clotheIndex + 1)
                % clotheTypes.length
            )

        }}
    >
        →
    </button>

</div>


           <h3>
    Color de ropa
</h3>

<div className="avatar-option-controls">

    <button
        onClick={() => {

            setClotheColorIndex(
                (clotheColorIndex - 1 + clotheColors.length)
                % clotheColors.length
            )

        }}
    >
        ←
    </button>

    <span>
        {clotheColorNames[clotheColorIndex]}
    </span>

    <button
        onClick={() => {

            setClotheColorIndex(
                (clotheColorIndex + 1)
                % clotheColors.length
            )

        }}
    >
        →
    </button>

</div>

        </div>

    )
}

{
    activeTab === "accessories" && (

        <div>

            <h3>
    Accesorios
</h3>

<div className="avatar-option-controls">

    <button
        onClick={() => {

            setAccessoryIndex(
                (accessoryIndex - 1 + accessoryTypes.length)
                % accessoryTypes.length
            )

        }}
    >
        ←
    </button>

    <span>
        {accessoryNames[accessoryIndex]}
    </span>

    <button
        onClick={() => {

            setAccessoryIndex(
                (accessoryIndex + 1)
                % accessoryTypes.length
            )

        }}
    >
        →
    </button>

</div>

        </div>

    )
}



</div>

            </div>

            <div className="avatar-editor-buttons">

                <button
                    onClick={() =>
                        navigate("/profile")
                    }
                >
                    Volver
                </button>

                <button
                    onClick={saveAvatar}
                    className="save-avatar-btn"
                    disabled={saving}
                >
                    {
                        saving
                            ? "Guardando..."
                            : "Guardar avatar"
                    }
                </button>

                {
    saveMessage && (

        <p className="avatar-save-message">
            {saveMessage}
        </p>

    )
}

            </div>

        </div>
    )
}

export default AvatarEditor