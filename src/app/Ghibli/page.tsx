import { Pelis } from "../interfaces/pelis";
import { PeliGrid } from "../components/PeliGrind";
import { LoadMoreMovies } from "../components/LoadMoreMovies";

const API_URL = "https://ghibliapi.vercel.app/films";

// Genera las primeras 5 rutas estáticas
export async function generateStaticParams() {
    const data = await fetch(API_URL).then(resp => resp.json());
    return data.slice(0, 5).map((prod: { id: string }) => ({ id: prod.id }));
}

// Obtiene solo las primeras 5 películas para pre-renderización
const get_peli = async (): Promise<Pelis[]> => {
    const data = await fetch(API_URL).then(resp => resp.json());
    return data.slice(0, 5);
};

export default async function PelisPage() {
    const peli = await get_peli();

    return (
        <div className="flex flex-col bg-gray-800 items-center">
            <div className="flex items-center space-x-4 my-4">
                <img src="/totoro.png" alt="Totoro" className="w-20 h-auto my-4" />
                <span className="text-5xl my-2 text-white">Estudio Ghibli</span>
                <img src="/totoro.png" alt="Totoro" className="w-20 h-auto my-4" />
            </div>

            {/* Mostrar las primeras 5 películas de manera estática */}
            <PeliGrid pelis={peli} />

            {/* Cargar el resto dinámicamente después de 5 segundos (EXCLUYENDO las ya mostradas) */}
            <LoadMoreMovies excludedPelis={peli} />
        </div>
    );
}
