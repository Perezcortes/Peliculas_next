import { Pelis } from "../interfaces/pelis";
import { PeliCard } from "./PeliCard";

interface Props {
  pelis: Pelis[];
}

export const PeliGrid = ({ pelis }: Props) => {
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
      {pelis.map((peli) => (
        <PeliCard key={peli.id} peli={peli} />
      ))}
    </div>
  );
};
