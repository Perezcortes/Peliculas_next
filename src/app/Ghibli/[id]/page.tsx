"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Pelis } from "../../interfaces/pelis";

const API_URL = "https://ghibliapi.vercel.app/films";

export async function generateStaticParams() {
  const res = await fetch("https://ghibliapi.vercel.app/films");
  if (!res.ok) throw new Error("Error al obtener películas.");
  const pelis = await res.json();

  return pelis.slice(0, 5).map((peli: { id: string }) => ({ id: peli.id }));
}

interface Props {
    params: {
        id: string;
    };
}

export default function PeliPage({ params }: Props) {
    const [peli, setPeli] = useState<Pelis | null>(null);
    const [currentImg, setCurrentImg] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}/${params.id}`);
                if (!res.ok) return notFound();
                const data: Pelis = await res.json();
                setPeli(data);
            } catch (error) {
                console.error("Error al cargar película:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [params.id]);

    if (isLoading || !peli) return <div className="text-center p-8">Cargando...</div>;

    const images: string[] = [peli.movie_banner, peli.image];

    const handlePrev = () => {
        setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            {/* Carrusel de imágenes */}
            <div className="relative w-full overflow-hidden rounded-t-lg flex justify-center items-center">
                <Image
                    src={images[currentImg]}
                    alt={`Imagen ${currentImg + 1} de ${peli.title}`}
                    width={800}
                    height={500}
                    className="rounded-t-lg h-auto w-auto max-w-full"
                />
                <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
                >
                    ‹
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
                >
                    ›
                </button>
            </div>

            {/* Detalles de la película */}
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {peli.title} ({peli.original_title})
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{peli.description}</p>
            </div>
        </div>
    );
}
