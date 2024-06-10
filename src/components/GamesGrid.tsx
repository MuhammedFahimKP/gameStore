import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useInfinitScrollGame } from "../hooks/useGames";
import { GameQuery } from "../types";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { useEffect } from "react";

interface Props {
  gameQuery: GameQuery;
}

const GamesGrid = ({ gameQuery }: Props) => {
  const {
    error,
    data,
    loading: isLoading,
    elementRef,
    updateFilters,
  } = useInfinitScrollGame(gameQuery, 6, 1000);

  useEffect(() => {
    updateFilters(gameQuery);
  }, [gameQuery]);

  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <Text>{error}</Text>;
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} padding={"10px"} spacing={6}>
      {data.map((game) => (
        <GameCardContainer key={game.id}>
          <GameCard game={game} />
        </GameCardContainer>
      ))}
      {isLoading &&
        skeletons.map((skeleton) => (
          <GameCardContainer key={skeleton}>
            <GameCardSkeleton />
          </GameCardContainer>
        ))}
      <VStack width="40vh" height={"20px"} ref={elementRef}></VStack>
    </SimpleGrid>
  );
};

export default GamesGrid;
