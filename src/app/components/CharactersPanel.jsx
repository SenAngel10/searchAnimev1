import useScrollProgress from "../hooks/useScrollProgess";

export default function CharactersPanel({ onShow, character_data }) {
  if (onShow !== 0) {
    return;
  }
  //llamamos a nuestro hook personalizado de croll rprogess
  const { progress, scrollRef, manejarScroll } = useScrollProgress();
  return (
    <div className="p-2 md:w-4/6">
      <span
        className="shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] shadow-pinkDark-200  z-10 h-1 rounded-full bg-pinkDark-500/80 w-full block"
        style={{ width: `${progress}%` }}
      ></span>

      <div
        //llebamos todas las propiedades del div a nuestro scroll ref
        ref={scrollRef}
        //si hace un scroll entonces llama a a la funcoin manejarScroll
        onScroll={manejarScroll}
        className="grid grid-cols-1 mt-1 overflow-auto h-150 no-scrollbar"
      >
        {character_data.map((p) => (
          <div
            key={p.character.mal_id}
            className="grid grid-cols-2 mb-2 bg-purpleDark-200/10 p-2 rounded-2xl items-center backdrop-blur-2xl even:bg-purpleDark-200/20"
          >
            <section>
              <label>{p.character.name}</label>
              <img
                className="rounded-2xl"
                src={p.character.images.jpg.image_url}
                alt=""
                width={90}
                height={80}
                loading="lazy"
              />
            </section>

            <section className="flex flex-col justify-end">
              {p.voice_actors
                .filter((l) => l.language === "Japanese")
                .map((a) => (
                  <div
                    className="flex flex-col items-end"
                    key={a.person.mal_id}
                  >
                    <label>{a.person.name}</label>
                    <img
                      className="rounded-2xl"
                      src={a.person.images.jpg.image_url}
                      alt=""
                      width={90}
                      height={80}
                      loading="lazy"
                    />
                  </div>
                ))}
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}
