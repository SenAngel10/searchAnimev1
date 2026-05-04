import { useEffect, useState } from "react";

export default function useTypeWritter(titleEN, titleJPN) {
  const [char, setChar] = useState(0); //caracteres a mostrar
  const [status, setStatus] = useState("write"); // estado escribiendo o borrando
  const [language, setLanguage] = useState("EN"); // alternar entre EN o JPN
  //importante verficiar si vienen vacios los datos o no la base de este hook
  const txt = language === "JPN" ? titleJPN : language === "EN" ? titleEN : "";
  //animacion
  useEffect(() => {
    if (!txt) {
      return;
    }
    const animation = setTimeout(() => {
      if (status === "write") {
        if (char === txt.length) {
          setStatus("erase");
        } else {
          setChar((c) => c + 1);
        }
      } else if (status === "erase") {
        if (char === 0) {
          setStatus("write");
          setLanguage((l) => (l === "JPN" ? "EN" : "JPN"));
        } else {
          setChar((c) => c - 1);
        }
      }
    }, 100);

    return () => clearTimeout(animation);
  }, [char, status, txt, titleEN, titleJPN]);
  return txt ? txt.slice(0, char) : "";
}
