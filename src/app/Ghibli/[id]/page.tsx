'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export async function generateStaticParams() {
  const res = await fetch('https://ghibliapi.vercel.app/films');
  const pelis = await res.json();

  return pelis.map((peli: any) => ({
    id: peli.id,
  }));
}

interface Props {
  params: {
    id: string;
  };
}

export default function PeliPage({ params }: Props) {
  const [peli, setPeli] = useState<any>(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const images: string[] = peli ? [peli.movie_banner, peli.image] : [];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://ghibliapi.vercel.app/films/${params.id}`);
      if (!res.ok) return notFound();
      const data = await res.json();
      setPeli(data);
      setIsLoading(false);
    };
    fetchData();
  }, [params.id]);

  if (isLoading || !peli) return <div className="text-center p-8">Cargando...</div>;

  const handlePrev = () => {
    setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {/* Carrusel */}
      <div className="relative w-full overflow-hidden rounded-t-lg flex justify-center items-center">
        <Image
          src={images[currentImg]}
          alt={`Imagen ${currentImg + 1} de ${peli.title}`}
          width={800}
          height={0}
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

      {/* Contenido */}
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {peli.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {peli.description}
        </p>
      </div>
    </div>
  );
}
