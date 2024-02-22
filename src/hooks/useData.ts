import { useEffect,useState } from "react";
import apiClient ,{CanceledError,AxiosError }  from "../services/api-client";
import { AxiosRequestConfig } from "axios";




interface FetchRespones<T>{

    count:number;
    results:T[];

}


const useData = <T>(endpoint:string,requestConfig ?:AxiosRequestConfig,deps?:any[]) =>{

    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading,setLoading] = useState(false);
    
    useEffect(() => {
        
        
        const controller = new AbortController();
        
        setLoading(true)
       
        apiClient
        .get<FetchRespones<T>>(endpoint, { signal : controller.signal,...requestConfig })
          .then((res) => { setData(res.data.results)
            setLoading(false)
            
        })
          .catch((err) => {
            if (err instanceof CanceledError) return;
            setError((err as AxiosError).message)
            setLoading(false)
          });
          
        
        return  () => controller.abort();

      },deps ? [...deps] : []);

    return { data , error , isLoading}
    
}

export default useData;