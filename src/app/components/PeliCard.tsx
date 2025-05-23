import Image from "next/image";
import Link from "next/link";

export interface Pelis {
  id: number;
  title: string;
  original_title: string;
  image: string;
  movie_banner: string;
  description: string;
}

interface Props {
  peli: Pelis;
}

export const PeliCard = ({ peli }: Props) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/peliculas/${peli.id}`}>
        <Image
          src={peli.image}
          alt={peli.title}
          width={400}
          height={225}
          className="rounded-t-lg w-full h-auto"
        />
      </Link>
      <div className="p-5">
        <Link href={`/peliculas/${peli.id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {peli.title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {peli.description.substring(0, 100)}...
        </p>
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

/** 
export const PeliCard = ({ peli }: Props) => {
  return (
    <Link
      href={`/peliculas/${peli.id}`}
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <Image
        src={peli.image}
        alt={peli.title}
        width={192}
        height={288}
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {peli.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {peli.description.substring(0, 100)}...
        </p>
      </div>
    </Link>
  );
};
**/