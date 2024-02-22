import { SimpleGrid } from "@chakra-ui/react";

import { Genre, Platform } from "../types";
import useGames from "../hooks/useGames";

import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";

interface Props {
  selectedGenre: Genre | null;
  selectedPlateform: Platform | null;
}

const GamesGrid = ({ selectedGenre, selectedPlateform }: Props) => {
  const { error, data, isLoading } = useGames(selectedGenre, selectedPlateform);
  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <h1>{error}</h1>;
  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3 }}
        padding={"10px"}
        spacing={3}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {data.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GamesGrid;
