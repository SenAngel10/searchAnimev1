import { useRef, useState } from "react";

export default function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef(null);
  function manejarScroll() {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      //   console.log(scrollTop + " " + scrollHeight + " " + clientHeight + "");
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    }
  }

  return { progress, scrollRef, manejarScroll };
}
