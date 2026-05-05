import { useState } from "react";
import Image from "next/image";
import { Code, NotebookText } from "lucide-react";
export default function Information() {
  const [active, setActive] = useState(false);
  return (
    <div className="fixed flex justify-center z-40 top-1/2 rounded-full p-1 right-0 m-1 transition-all">
      <button
        onClick={() => setActive(!active)}
        className={`z-50 relative cursor-pointer shadow-lg shadow-bluePastel-300/40 ${active ? "bg-pinkDark-500" : ""} rounded-full hover:bg-pinkDark-600 p-1`}
      >
        <Image
          src={"/options.svg"}
          width={30}
          height={30}
          alt="iconOptions"
          className="p-0 m-0"
        ></Image>
      </button>
      {/* dona medio circulo */}

      <div
        className={`absolute h-64 w-40 border-4 border-purpleDark-300 rounded-l-full border-r-0 z-0 -translate-y-1/2 top-1/2 bg-purpleDark-500/60 transition-all duration-700 ease-out ${active === true ? "opacity-100 scale-100 translate-x-0 pointer-events-auto" : "opacity-0 scale-90 translate-x-4 pointer-events-none"}`}
      >
        <a
          href="https://github.com/SenAngel10/searchAnimev1"
          className="absolute top-[15%] left-[35%] rounded-full p-2 hover:bg-bluePastel-400/40 transition-colors"
        >
          <Code width={20} height={20}></Code>
        </a>
        <a
          href="https://github.com/SenAngel10"
          className="absolute top-[30%] left-[10%] rounded-full p-2 hover:bg-bluePastel-400/40 transition-colors"
        >
          <Image
            alt="iconGitHub"
            src="/GitHub_Invertocat_White.svg"
            width={20}
            height={20}
          ></Image>
        </a>
        <a
          href="www.linkedin.com/in/brayanangelcast"
          className="absolute top-[55%] left-[10%] rounded-full p-2 hover:bg-bluePastel-400/40 transition-colors"
        >
          <Image
            alt="iconCode"
            src="/inBug-White.png"
            width={20}
            height={20}
          ></Image>
        </a>
        <a
          href="https://brayanangelcast.com/"
          className="absolute top-[75%] left-[35%] rounded-full p-2 hover:bg-bluePastel-400/40 transition-colors"
        >
          <NotebookText width={20} height={20}></NotebookText>
        </a>
      </div>
    </div>
  );
}
