"use client";

import CharactersPanel from "@/app/components/CharactersPanel";
import Navigation from "@/app/components/Navigation";
import Relations from "@/app/components/Relations";
import useApiData from "@/app/hooks/useApiCall";
import useTypeWritter from "@/app/hooks/useTypeWritter";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function AnimePage() {
  //params nos trae la ruta dinamica
  //https://nextjs.org/docs/app/api-reference/functions/use-params
  const params = useParams();
  // console.log(params);
  const id = params.id;

  //estados de vista
  const [show, setShow] = useState(0);
  // traemos los datos haciendo endpoint a cada una de las siguientes rutas
  const { data, isLoading, isError } = useApiData({
    endpoint: `anime/${id}`,
  });
  const {
    data: character,
    isLoading: characterLoading,
    isError: characterError,
  } = useApiData({
    endpoint: `anime/${id}/characters`,
  });

  const {
    data: relations,
    isLoading: relationsLoading,
    isError: relationsError,
  } = useApiData({
    endpoint: `anime/${id}/relations`,
  });

  //typeWriter
  const textShow = useTypeWritter(data?.title_english, data?.title_japanese);

  //verificamos que se tena acceso a los datos
  if (isLoading || characterLoading || relationsLoading) {
    return <p>esta cargando</p>;
  }

  if (isError || relationsError || characterError) {
    return <p>ocurrio un error</p>;
  }
  if (!data || !character || !relations) {
    return <p>no hay datos</p>;
  }
  // console.log(relations);
  // console.log(data);
  return (
    <div className="place-items-center">
      <Navigation></Navigation>
      <div className="mt-12 flex flex-col place-items-center">
        {/* general */}
        <section className="flex flex-col place-items-center md:flex-row md:flex-wrap justify-center">
          {/* title + img */}
          <section className="place-items-center md:w-4/6">
            <p className="text-center h-15 mt-2 mb-3 content-center text-[25px] text-wrap">
              {textShow}
            </p>
            <img
              src={data.images.jpg.large_image_url}
              alt=""
              className=" bg-cream-100/10 p-2 rounded-2xl"
            />
          </section>

          <section className="place-items-center md:w-4/6">
            {/* genres */}
            <div className=" w-full m-2">
              <ul className="flex flex-wrap w-full justify-evenly p-1">
                {data.genres.map((g) => (
                  <li
                    key={g.mal_id}
                    className="font-sans cursor-default genre-hover"
                  >
                    <span>{g.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* stats */}
            <div className="w-full">
              <ul className="flex flex-wrap justify-evenly gap-1 p-2 cursor-default">
                <li className="stats-vfx">{data.type}</li>
                <li className="stats-vfx">Episodes: {data.episodes}</li>
                <li className="stats-vfx">⭐{data.score}</li>
                <li className="stats-vfx">🏆#{data.rank}</li>
                <li className="stats-vfx">
                  {data.season === "summer"
                    ? "☀️ Summer"
                    : data.season === "winter"
                      ? "❄️ Winter"
                      : data.season === "spring"
                        ? "🌸 Spring"
                        : "🍂 Fall"}
                </li>
                <li className="stats-vfx">{data.year}</li>
              </ul>
            </div>
          </section>

          <section className="place-items-center md:w-4/6 bg-purpleDark-600/60 text-cream-100 m-2 rounded-2xl">
            <h1 className="font-bold mt-2 text-center">Synopsis </h1>
            <p className="text-justify m-2 font-serif">{data.synopsis}</p>
          </section>
        </section>
      </div>
      {/* navegaion de todo el contenido del anime */}
      <nav className="place-items-center">
        <button
          className={`m-2 cursor-pointer rounded-2xl p-2 ${show === 0 ? "bg-pinkDark-700" : "bg-bluePastel-500/10"} hover:bg-bluePastel-800/50`}
          onClick={() => {
            setShow(0);
          }}
        >
          Characters&Artist
        </button>
        <button
          className={`m-2 cursor-pointer  rounded-2xl p-2 ${show === 1 ? "bg-pinkDark-700" : "bg-bluePastel-500/10"} hover:bg-bluePastel-800/50`}
          onClick={() => {
            setShow(1);
          }}
        >
          Staff
        </button>
        {/* <button className="m-2 cursor-pointer">More</button> */}
      </nav>
      <CharactersPanel
        onShow={show}
        character_data={character}
      ></CharactersPanel>
      <Relations onShow={show} relations_data={relations}></Relations>
    </div>
  );
}
