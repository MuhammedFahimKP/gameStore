
import useData from "./useData";
import { Genre } from "../types";







const useGenres = () => useData<Genre>('\genres');

export default useGenres;