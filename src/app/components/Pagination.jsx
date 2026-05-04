import Image from "next/image";
export default function Pagination({
  currret_page,
  on_page_change,
  data_next,
}) {
  //current_page -> setPage
  //data_next -> current_page: int, has_next_page : boolean
  if (!data_next.has_next_page) {
    return <div>no hay mas datos</div>;
  }
  return (
    <div className=" fixed flex w-80 place-content-between top-[95%] z-10 ">
      <button
        className="cursor-pointer pagination-vfx rounded-full"
        onClick={() => {
          on_page_change(currret_page - 1);
        }}
      >
        <Image
          src="/leftArrow.svg"
          width={25}
          height={25}
          alt="iconArrow"
        ></Image>
      </button>

      <span className="pagination-vfx rounded-2xl">
        {currret_page} of {data_next.last_visible_page}
      </span>

      <button
        className="cursor-pointer pagination-vfx rounded-full"
        onClick={() => {
          on_page_change(currret_page + 1);
        }}
      >
        <Image
          src="/rigthArrow.svg"
          width={25}
          height={25}
          alt="iconArrow"
        ></Image>
      </button>
    </div>
  );
}
