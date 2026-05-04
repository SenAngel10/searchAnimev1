"use client";
import { useState } from "react";
import useApiData from "./hooks/useApiCall";
import Pagination from "./components/Pagination";
import Card from "./components/Card";
import Navigation from "./components/Navigation";
export default function Home() {
  const [page, setPage] = useState(1);
  const { data, next, isLoading, isError } = useApiData({
    endpoint: `top/anime?page=${page}`,
  });

  if (isLoading) {
    return <p>esta cargando</p>;
  }

  if (isError) {
    return <p>ocurrio un error</p>;
  }
  if (!data || !next) {
    return <p>no hay datos</p>;
  }
  console.log(data);
  console.log(next);
  return (
    <div>
      <main className="grid grid-cols-1 place-items-center">
        <Navigation></Navigation>
        <section className="mt-12 mb-12 relative p-1 md:flex md:flex-wrap md:justify-center">
          {data.map((a) => {
            return (
              <Card
                key={a.mal_id}
                title_anime={a.title}
                img_anime={a.images.jpg.large_image_url}
                id_anime={a.mal_id}
                genres_anime={a.genres} // array
                source={a.source}
                score={a.score}
              ></Card>
            );
          })}
        </section>

        <Pagination
          currret_page={page}
          on_page_change={setPage}
          data_next={next}
        ></Pagination>
      </main>
    </div>
  );
}
