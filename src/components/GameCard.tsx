import { Game } from "../types";
import { Card, CardBody, Image, Heading, Flex } from "@chakra-ui/react";
import getCroppedImageUrl from "../services/image-urls";
import PlatFormIconList from "./PlatFormIconList";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card>
      <Image src={getCroppedImageUrl(game.background_image)} />
      <CardBody>
        <Heading fontSize={"2xl"}>
          {game.name} <Emoji rating={game.rating_top} />
        </Heading>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <PlatFormIconList
            platforms={game.parent_platforms?.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </Flex>
      </CardBody>
    </Card>
  );
};

export default GameCard;
