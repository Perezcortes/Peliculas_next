import Image from "next/image";
import Link from "next/link";
import { Pelis } from "../interfaces/pelis";

interface Props {
  peli: Pelis;
}

export const PeliCard = ({ peli }: Props) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {/* Imagen clickeable */}
      <Link href={`/Ghibli/${peli.id}`}>
        <Image
          src={peli.image}
          alt={peli.title}
          width={400}
          height={225}
          className="rounded-t-lg w-full h-auto"
        />
      </Link>

      {/* Contenido de la tarjeta */}
      <div className="p-5">
        <Link href={`/Ghibli/${peli.id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {peli.title} ({peli.original_title})
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {peli.description.substring(0, 100)}...
        </p>

        {/* Botón "Leer más" */}
        <Link
          href={`/Ghibli/${peli.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Leer más
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
