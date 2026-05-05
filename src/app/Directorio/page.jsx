"use client";
import Navigation from "../components/Navigation";
import useApiData from "../hooks/useApiCall";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import DropDown from "../components/DropDownFilter";
import Image from "next/image";
import { SelectFilter } from "../components/SelectFilter";
import { status, types } from "./constants";

export default function Directorio() {
  //cambio de pagina
  const [page, setPage] = useState(1);
  //dropDown mostar
  const [active, setActive] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [isOpenType, setIsOpenType] = useState(false);

  //arreglo de los generos
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
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
    let endpoint = `anime?page=1`;
    if (idGenres) {
      endpoint += `&genres=${idGenres}`;
    }
    if (selectedType) {
      endpoint += `&type=${selectedType}`;
    }
    if (selectedStatus) {
      endpoint += `&status=${selectedStatus}`;
    }
    setStrEnpoint(endpoint);
    //cerramos el dropdown
    setActive(false);
    setIsOpenStatus(false);
    setIsOpenType(false);
    //posicionamos page en 1
    setPage(1);
  }

  function aplplySearch(input) {
    const idGenres = selectedGenres.map((g) => g.id).join(",");
    let endpoint = `anime?page=1&q=${input}`;
    if (idGenres) {
      endpoint += `&genres=${idGenres}`;
    }
    if (selectedType) {
      endpoint += `&type=${selectedType}`;
    }
    if (selectedStatus) {
      endpoint += `&status=${selectedStatus}`;
    }
    setStrEnpoint(endpoint);
    setInput("");
    setPage(1);
  }
  useEffect(() => {
    const idGenres = selectedGenres.map((g) => g.id).join(",");
    let endpoint = `anime?page=${page}`;
    if (idGenres) {
      endpoint += `&genres=${idGenres}`;
    }
    if (selectedType) {
      endpoint += `&type=${selectedType}`;
    }
    if (selectedStatus) {
      endpoint += `&status=${selectedStatus}`;
    }
    //hacemos un endpoint diferente cuando cambioamos de pagina
    setStrEnpoint(endpoint);

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
        <div className="flex justify-between  w-full border-b-bluePastel-500/20 border-b-[1] rounded-b-sm  p-2 md:justify-evenly">
          <div className="relative">
            <button
              className="  p-1 cursor-pointer flex btnFilters-vfx"
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

            <DropDown
              isActive={active}
              //pasamos en el setSelectedGenres(function) y el selectedGenres en []
              //paso dos regresa
              onChangeGenres={setSelectedGenres}
              isSelectedGenres={selectedGenres}
            ></DropDown>
          </div>

          {/* botonnes a agregar funcionalidades*/}
          <div className="relative">
            <button
              onClick={() => setIsOpenStatus(!isOpenStatus)}
              className="  p-1 cursor-pointer flex btnFilters-vfx"
            >
              {selectedStatus || "Status"}
              <Image
                src="/dropDown.svg"
                width={20}
                height={20}
                alt="iconDropDown"
              ></Image>
            </button>
            <SelectFilter
              isOpen={isOpenStatus}
              datos={status}
              onSelected={(item) => {
                setSelectedStatus(item);
                setIsOpenStatus(false);
              }}
            ></SelectFilter>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsOpenType(!isOpenType)}
              className=" p-1 cursor-pointer flex btnFilters-vfx"
            >
              {selectedType || "Type"}

              <Image
                src="/dropDown.svg"
                width={20}
                height={20}
                alt="iconDropDown"
              ></Image>
            </button>
            <SelectFilter
              isOpen={isOpenType}
              datos={types}
              onSelected={(item) => {
                setSelectedType(item);
                setIsOpenType(false);
              }}
            ></SelectFilter>
          </div>

          <button
            className="  p-1 cursor-pointer flex btnFilters-vfx"
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
