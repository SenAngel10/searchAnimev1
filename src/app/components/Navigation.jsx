import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-80 bg-cream-500/10 border-white/30 z-20 text-bluePastel-100 backdrop-blur-xl inset-shadow-sm inset-shadow-bluePastel-300/20 rounded-2xl mt-2 md:w-120">
      <ul className="flex border-[1] border-cream-100/50 shadow w-full justify-evenly rounded-2xl p-1.5 ">
        <li className=" hover:text-bluePastel-500 w-1/2 text-center transition-colors ease-in duration-300 border-[1] rounded-2xl border-transparent hover:backdrop-blur-2xl hover:backdrop-opacity-55  ">
          <Link href="/">Home</Link>
        </li>
        <li className=" hover:text-bluePastel-500 w-1/2 text-center transition-colors ease-in duration-300 border-[1] rounded-2xl border-transparent hover:backdrop-blur-2xl hover:backdrop-opacity-55 ">
          <Link href="/Directorio">Search</Link>
        </li>
      </ul>
    </nav>
  );
}
