import React from "react";
import { useImmer } from "use-immer";

interface Artwork {
    name: string;
    title: string;
    city: string;
    image: string;
}
type ArtworkKey = keyof Artwork;

export default function Immer() {
    const [artwork, updateArtwork] = useImmer<Artwork>({
        name: "Niki de Saint Phalle",
        title: "Blue Nana",
        city: "Hamburg",
        image: "https://i.imgur.com/Sd1AgUOm.jpg",
    });

    function artworkHandler(key: ArtworkKey) {
        return ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
            updateArtwork((draft) => {
                draft[key] = value;
            });
    }

    return (
        <>
            <label>
                Name:
                <input value={artwork.name} onChange={artworkHandler("name")} />
            </label>
            <label>
                Title:
                <input
                    value={artwork.title}
                    onChange={artworkHandler("title")}
                />
            </label>
            <label>
                City:
                <input value={artwork.city} onChange={artworkHandler("city")} />
            </label>
            <label>
                Image:
                <input
                    value={artwork.image}
                    onChange={artworkHandler("image")}
                />
            </label>
            <p>
                <i>{artwork.title}</i>
                {" by "}
                {artwork.name}
                <br />
                (located in {artwork.city})
            </p>
            <img src={artwork.image} alt={artwork.title} />
        </>
    );
}
