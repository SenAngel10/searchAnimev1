import { useEffect, useState } from "react";
import useApiData from "../hooks/useApiCall";
export default function DropDown({
  isActive,
  //recibnimos
  onChangeGenres, // functions
  isSelectedGenres, //arreglo
}) {
  const { data, next, isLoading, isError } = useApiData({
    endpoint: `genres/anime`,
  });

  //recibimos si es verdad que se selecciono entonces guardamos en un arerglo de objetos
  function hanldeSetSelected(id_genere, name_genere, checked) {
    if (checked) {
      //con esta funcion le decimos que vamos a hacer un arrelgo con todos los anterios pero con objetos id y nombre
      onChangeGenres([
        ...isSelectedGenres,
        { id: id_genere, name: name_genere },
      ]);
    } else {
      //si ya no esta entonces filtramos todos los que no sean el que se deselecciono
      onChangeGenres(isSelectedGenres.filter((g) => id_genere !== g.id));
    }
  }
  //actualizamos la function con los nuevos valores cuando se actualice los generos
  useEffect(() => {
    onChangeGenres(isSelectedGenres);
  }, [isSelectedGenres]);
  if (isLoading) {
    return <p>Cargando</p>;
  }

  if (isError) {
    return <p>Hay un error en los datos</p>;
  }

  if (!data) {
    return <p>no hay datos</p>;
  }

  if (!isActive) {
    return;
  }
  // console.log(data);
  return (
    <div className="absolute grid grid-cols-3 text-[14px] gap-1 z-50 top-full min-w-max bg-dropdown">
      {data.map((g) => (
        <label
          key={g.mal_id}
          className="selectionDrop hover:cursor-pointer transition-colors flex items-center"
        >
          <input
            className="ml-1"
            type="checkbox"
            checked={isSelectedGenres.some((c) => g.mal_id === c.id)}
            name={g.name}
            id={g.mal_id}
            //en un cambio enviamos el id, nombre y su estado
            onChange={(e) =>
              hanldeSetSelected(g.mal_id, g.name, e.target.checked)
            }
          />
          <span className="ml-1">{g.name}</span>
        </label>
      ))}
    </div>
  );
}
