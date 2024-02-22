import { Game } from "../types";
import { Card, CardBody, Image, Heading, HStack } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import getCroppedImageUrl from "../services/image-urls";
import PlatFormIconList from "./PlatFormIconList";
import CriticScore from "./CriticScore";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card>
      <Image
        src={
          game?.background_image
            ? getCroppedImageUrl(game.background_image)
            : logo
        }
      />
      <CardBody>
        <Heading fontSize={"2xl"}>{game.name}</Heading>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <PlatFormIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
