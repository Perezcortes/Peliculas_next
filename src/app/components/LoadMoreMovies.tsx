"use client";
import { useEffect, useState } from "react";
import { PeliGrid } from "../components/PeliGrind";
import { Pelis } from "../interfaces/pelis";

const API_URL = "https://ghibliapi.vercel.app/films";

export function LoadMoreMovies({ excludedPelis }: { excludedPelis: Pelis[] }) {
    const [peliculas, setPeliculas] = useState<Pelis[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(async () => {
            const data = await fetch(API_URL).then(resp => resp.json());

            // Filtrar las películas ya mostradas en la página inicial
            const idsExcluidos = new Set(excludedPelis.map(peli => peli.id));
            const restantes = data.filter((peli: Pelis) => !idsExcluidos.has(peli.id));

            setPeliculas(restantes);
            setLoading(false);
        }, 5000);
    }, [excludedPelis]);

    return (
        <div>
            {loading ? (
                <p className="text-white text-xl mt-4">Cargando más películas...</p>
            ) : (
                <PeliGrid pelis={peliculas} />
            )}
        </div>
    );
}
