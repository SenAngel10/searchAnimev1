import { useEffect, useState } from "react";
export default function useApiData({ endpoint }) {
  const [data, setData] = useState(null);
  const [next, setNext] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function conexion() {
      setIsLoading(true);
      const url = `/api/`;

      try {
        const response = await fetch(`${url}${endpoint}`);
        if (!response.ok) {
          throw new Error(`Response Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.data);
        if (result.next) {
          setNext(result.next);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    conexion();
  }, [endpoint]);

  return { data, next, isLoading, isError };
}
