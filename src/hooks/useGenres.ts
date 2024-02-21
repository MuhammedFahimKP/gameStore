import { useEffect,useState } from "react";
import apiClient ,{CanceledError,AxiosError }  from "../services/api-client";

interface Genre{

    id:number;
    name:string;

}


interface FetchGenresRespones{

    count:number;
    results:Genre[];

}


const useGenres = () =>{

    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState("");
    const [isLoading,setLoading] = useState(false);
    
    useEffect(() => {
        
        
        const controller = new AbortController();
        
        setLoading(true)
       
        apiClient
        .get<FetchGenresRespones>("/genres", { signal : controller.signal })
          .then((res) => { setGenres(res.data.results)
            setLoading(false)
            
        })
          .catch((err) => {
            if (err instanceof CanceledError) return;
            setError((err as AxiosError).message)
            setLoading(false)
          });
          
        
        return  () => controller.abort();

      }, []);

    return { genres , error , isLoading}
    
}

export default useGenres;