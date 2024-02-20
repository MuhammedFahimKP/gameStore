import { useEffect,useState } from "react";
import apiClient,{AxiosError, CanceledError} from "../services/api-client";

interface Game {
    id: number;
    name: string;
}
  
interface FetchGamesRespones {
    count: number;
    results: Game[];
}

const useGames = () => {

    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");
    
    useEffect(() => {
        
        
        const controller = new AbortController();
        apiClient
        .get<FetchGamesRespones>("/games", { signal : controller.signal })
          .then((res) => setGames(res.data.results))
          .catch((err) => {
            if (err instanceof CanceledError) return;
            setError((err as AxiosError).message)
          });
        
        return  () => controller.abort();

      }, []);

    return { games , error}  
}


export default useGames