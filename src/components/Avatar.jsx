import Avatar from "@vierweb/avataaars"

function UserAvatar({

    topType = "ShortHairShortFlat",
    hairColor = "BrownDark",
    skinColor = "Light",
    eyeType = "Default",
    eyebrowType = "Default",
    mouthType = "Smile",
    clotheType = "Hoodie",
    clotheColor = "Blue03",
    accessoriesType = "Blank"

}) {

    return (

        <Avatar

            style={{
                width: "200px",
                height: "200px"
            }}

            avatarStyle="Transparent"

            topType={topType}

            accessoriesType={accessoriesType}

            hairColor={hairColor}

            facialHairType="Blank"

            clotheType={clotheType}

            clotheColor={clotheColor}

            eyeType={eyeType}

            eyebrowType={eyebrowType}

            mouthType={mouthType}

            skinColor={skinColor}

        />

    )
}

export default UserAvatar