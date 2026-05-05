import Link from "next/link";
import { useState } from "react";

export default function Card({
  title_anime,
  img_anime,
  id_anime,
  genres_anime,
  source,
  score,
}) {
  const [isHover, setisHover] = useState(false);
  return (
    <div
      key={id_anime}
      className="relative flex flex-col justify-end rounded-4xl bg-cream-500 h-[530] w-[380] border-4 border-white/30 text-center p-6 m-2 text-sm text-shadow-cream-800/70 text-shadow-sm overflow-hidden shadow-2xl"
      style={{
        backgroundImage: `url(${img_anime})`,
        backgroundPosition: "center",
        backgroundSize: `${isHover ? "110%" : "100%"}`,
        transition: "background-size 0.5s ease-out",
      }}
      onMouseEnter={() => setisHover(true)}
      onMouseLeave={() => setisHover(false)}
    >
      <span
        className={`absolute top-4 right-5 border-2 border-bluePastel-100/10 rounded-full p-1 backdrop-blur-sm ${isHover ? "opacity-100" : "opacity-0"} transition-all`}
        onMouseEnter={() => setisHover(true)}
        onMouseLeave={() => setisHover(false)}
      >
        🌟{score}
      </span>

      <div className=" absolute inset-0 backdrop-blur-xl bg-black/10 mask-to-top"></div>
      <div className="relative z-10 bg-white/20 rounded-3xl p-3">
        <Link href={`anime/${id_anime}`}>
          <h1 className="hover:text-bluePastel-300 cursor-pointer text-2xl font-bold">
            {title_anime}
          </h1>
        </Link>
        <ul className="flex flex-wrap justify-center m-1">
          {genres_anime.map((g) => (
            <li
              key={g.mal_id}
              className="m-1 p-1 border-2 border-cream-300/60 rounded-md bg-black/30"
            >
              {g.name}
            </li>
          ))}
        </ul>
        <span>Source: {source}</span>
      </div>
    </div>
  );
}
