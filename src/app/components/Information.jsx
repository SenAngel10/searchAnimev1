import { useState } from "react";
import Image from "next/image";
export default function Information() {
  return (
    <div className="fixed z-40 top-1/2 rounded-full p-1 border-2 right-0 m-1">
      <Image
        src={"/options.svg"}
        width={20}
        height={20}
        alt="iconOptions"
      ></Image>
    </div>
  );
}
