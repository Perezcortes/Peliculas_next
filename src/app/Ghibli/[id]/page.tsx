import Image from 'next/image';
import { notFound } from 'next/navigation';

// Solo 3 películas estáticas en el build
export async function generateStaticParams() {
  const res = await fetch('https://ghibliapi.vercel.app/films');
  const pelis = await res.json();

  return pelis.slice(0, 3).map((peli: any) => ({
    id: peli.id,
  }));
}

// Obtener una película por su ID
const getPeliById = async (id: string) => {
  try {
    const res = await fetch(`https://ghibliapi.vercel.app/films/${id}`, {
      next: { revalidate: 60 }, // Generación estática con revalidación (ISR)
    });

    if (!res.ok) throw new Error('Película no encontrada');
    return res.json();
  } catch (error) {
    console.error(error);
    notFound();
  }
};

interface Props {
  params: {
    id: string;
  };
}

export default async function PeliPage({ params }: Props) {
  const peli = await getPeliById(params.id);
  const images = [peli.movie_banner, peli.image];

  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mt-10">
      <div className="relative w-full overflow-hidden rounded-t-lg flex justify-center items-center">
        <Image
          src={images[0]}
          alt={`Imagen 1 de ${peli.title}`}
          width={800}
          height={0}
          className="rounded-t-lg h-auto w-auto max-w-full"
        />
      </div>

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
