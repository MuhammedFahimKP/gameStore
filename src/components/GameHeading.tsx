import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../types";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const heading = `${gameQuery.platform?.name || ""} ${
    gameQuery.genre?.name || ""
  }`;
  return (
    <Heading marginY={5} as={"h1"} fontSize={"5xl"}>
      {heading}
    </Heading>
  );
};

export default GameHeading;
