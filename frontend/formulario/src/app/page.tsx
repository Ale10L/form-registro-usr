import Genero from "../Componentes/Genero/listado-genero";
import Pais from "../Componentes/Pais/listado-pais";
import Usuario from "@/Componentes/Usuario/listado-usuario";

export default function Home() {
  return (
    <div>
      <Genero></Genero>
      <Pais></Pais>
      <Usuario></Usuario>
    </div>
  );
}
