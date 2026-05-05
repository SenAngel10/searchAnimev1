"use client";
import Navigation from "../components/Navigation";
import useApiData from "../hooks/useApiCall";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import DropDown from "../components/DropDownFilter";
import Image from "next/image";
import { types } from "./constants";

export default function Directorio() {
  //cambio de pagina
  const [page, setPage] = useState(1);
  //dropDown mostar
  const [active, setActive] = useState(false);
  //arreglo de los generos
  const [selectedGenres, setSelectedGenres] = useState([]);
  //estado de contruccion del expoint
  const [strEndpoint, setStrEnpoint] = useState(`anime?page=${page}`);
  //cargamos directamente todos los animes
  const { data, next, isLoading, isError } = useApiData({
    endpoint: strEndpoint,
  });
  //input
  const [input, setInput] = useState("");
  //aplicarfiltro con los gfeneros seleccionados, sepradaos con ","
  function applyFilter() {
    //obtenemos solos los id [1,3]
    const idGenres = selectedGenres.map((g) => g.id).join(",");
    //aplicamos un nuevo endpoitn renderiza pero hardodeado en 1
    setStrEnpoint(`anime?page=1&genres=${idGenres}`);
    //cerramos el dropdown
    setActive(false);
    //posicionamos page en 1
    setPage(1);
  }

  function aplplySearch(input) {
    const idGenres = selectedGenres.map((g) => g.id).join(",");
    setStrEnpoint(`anime?page=1&genres=${idGenres}&q=${input}`);
    setInput("");
    setPage(1);
  }
  useEffect(() => {
    const idGenres = selectedGenres.map((g) => g.id).join(",");
    //hacemos un endpoint diferente cuando cambioamos de pagina
    setStrEnpoint(`anime?page=${page}&genres=${idGenres}`);

    //dependencia sera apge
  }, [page]);
  if (isLoading) {
    return <p>Cargando</p>;
  }

  if (isError) {
    return <p>Hay un error en los datos</p>;
  }

  if (!data || !next) {
    return <p>no hay datos</p>;
  }
  // console.log(data);
  // console.log("genres");
  // console.log(selectedGenres);
  return (
    <div className="place-items-center">
      <Navigation></Navigation>
      <div className="mt-12 mb-12 relative grid grid-cols-1 place-items-center ">
        {/* barra de busqeuda */}
        <div className="flex m-2 bg-cream-500/10  z-12 text-bluePastel-100 backdrop-blur-xl inset-shadow-bluePastel-300/20 rounded-full p-1 ">
          <Image
            src="/search.svg"
            width={20}
            height={20}
            alt="iconSearch"
            className="m-1 opacity-20 rounded-full"
          ></Image>
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            className="outline-0 w-80 md:w-100"
          />
          <button
            className="cursor-pointer p-1 m-1 opacity-20 rounded-full hover:opacity-100 transition-all "
            onClick={() => {
              aplplySearch(input);
            }}
          >
            <Image
              src="/arrow.svg"
              width={25}
              height={25}
              alt="iconArrow"
            ></Image>
          </button>
        </div>

        {/* filtros btones */}
        <div className="relative flex justify-between  w-full border-b-bluePastel-500/20 border-b-[1] rounded-b-sm  p-2 md:justify-evenly">
          <button
            className=" border-[1] p-0.5 cursor-pointer flex"
            onClick={() => setActive(!active)}
          >
            Genero
            <Image
              src="/dropDown.svg"
              width={20}
              height={20}
              alt="iconDropDown"
            ></Image>
          </button>
          {/* botonnes a agregar funcionalidades*/}
          <button className=" border-[1] p-0.5 cursor-pointer flex opacity-20">
            Status
            <Image
              src="/dropDown.svg"
              width={20}
              height={20}
              alt="iconDropDown"
            ></Image>
          </button>

          <button className=" border-[1] p-0.5 cursor-pointer flex opacity-20">
            Type
            <Image
              src="/dropDown.svg"
              width={20}
              height={20}
              alt="iconDropDown"
            ></Image>
          </button>
          <DropDown
            isActive={active}
            //pasamos en el setSelectedGenres(function) y el selectedGenres en []
            //paso dos regresa
            onChangeGenres={setSelectedGenres}
            isSelectedGenres={selectedGenres}
          ></DropDown>
          <button
            className=" border-[1] p-0.5 cursor-pointer flex"
            onClick={() => applyFilter()}
          >
            Filtar
            <Image
              src="/filter.svg"
              width={20}
              height={20}
              alt="iconFilter"
            ></Image>
          </button>
        </div>

        {/* cards */}
        <section className="md:flex md:flex-wrap md:justify-center">
          {data.map((a) => {
            return (
              <Card
                key={a.mal_id}
                title_anime={a.title}
                img_anime={a.images.jpg.image_url}
                id_anime={a.mal_id}
                genres_anime={a.genres} // array
                source={a.source}
                score={a.score}
              ></Card>
            );
          })}
        </section>
      </div>

      <Pagination
        currret_page={page}
        on_page_change={setPage}
        data_next={next}
      ></Pagination>
    </div>
  );
}
