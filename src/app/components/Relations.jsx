import Link from "next/link";

export default function Relations({ onShow, relations_data }) {
  if (onShow !== 1) {
    return;
  }
  // console.log(relations_data);
  return (
    <div className="md:w-4/6">
      {relations_data.map((r) => (
        <div
          className="flex flex-col m-4 odd:bg-amber-50/10 even:bg-amber-50/20 rounded-2xl transition-colors"
          key={r.entry.mal_id}
        >
          {r.entry.map((a) => (
            <div
              key={a.mal_id}
              className="m-2 hover:bg-amber-50/10 transition-colors rounded-2xl p-1"
            >
              <Link href={`/anime/${a.mal_id}`}>
                <div className="hover:text-bluePastel-300 cursor-pointer ">
                  <h1>{a.name}</h1>
                  <p>
                    Type: {a.type}, {r.relation}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
