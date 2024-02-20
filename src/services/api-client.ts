import axios,{CanceledError,AxiosError} from "axios";


export default axios.create({

    baseURL:'https://api.rawg.io/api',
    params: {
        key: '3d5f2e475b294a829d22946f6813bc6e'
    }
})

export { CanceledError , AxiosError }