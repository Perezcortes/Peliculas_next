import { Pelis } from "../interfaces/pelis";
import { PeliGrid} from "../components/PeliGrind";

const get_peli = async (): Promise<Pelis[]> => {
     const data = await fetch(`https://ghibliapi.vercel.app/films`
     ).then(resp => resp.json());

     const peli = data.map( (prod: { id: number; title: string; original_title: string; image: string; movie_banner: string; description: string;}) => ({
        id: prod.id,
        title: prod.title,
        image: prod.image,
        movie_banner: prod.movie_banner,
        description: prod.description,
        original_title: prod.original_title,
     }));
    return peli;
};

export default async function PelisPage() {
    const peli: Pelis[] = await get_peli();

    return(
        <div className="flex flex-col bg-gray-800 items-center">
            <div className="flex items-center space-x-4 my-4">
            <img src="/totoro.png" alt="Totoro" className="w-20 h-auto my-4" />
             <span className="text-5xl my-2 text-white">Estudio Ghibli</span>
              <img src="/totoro.png" alt="Totoro" className="w-20 h-auto my-4" />
            </div>
    <PeliGrid pelis={peli} />
</div>

    );
    
}