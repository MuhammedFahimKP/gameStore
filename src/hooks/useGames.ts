import useData from "./useData";
import useInfinitScrolleData from "./useInfinitScrolleData";
import { Game, GameQuery } from "../types";

const gameUrl = "/games";

const useGames = (gameQuery: GameQuery) =>
  useData<Game>(
    gameUrl,
    {
      params: {
        genres: gameQuery.genre?.id,
        platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText,
      },
    },
    [gameQuery]
  );

export const useInfinitScrollGame = (
  gameQuery: GameQuery,
  limit: number,
  delay: number
) =>
  useInfinitScrolleData<Game>(gameUrl, limit, delay, {
    params: {
      genres: gameQuery.genre?.id,
      platforms: gameQuery.platform?.id,
      ordering: gameQuery.sortOrder,
      search: gameQuery.searchText,
    },
  });

export default useGames;
