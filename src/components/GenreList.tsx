import useGenres from "../hooks/useGenres";
import { List, HStack, Image, Text } from "@chakra-ui/react";
import getCroppedImageUrl from "../services/image-urls";
import GenreListSkeleton from "./GenreListSkeleton";
import GenreListContainer from "./GenreListContainer";

const GenreList = () => {
  const skeletons = [
    1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const { data, isLoading } = useGenres();

  return (
    <List>
      {isLoading &&
        skeletons.map((skeleton) => (
          <GenreListContainer key={skeleton}>
            <GenreListSkeleton />
          </GenreListContainer>
        ))}

      {data &&
        data.map((genre) => (
          <GenreListContainer key={genre.name}>
            <HStack>
              <Image
                boxSize={"32px"}
                borderRadius={8}
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Text fontSize={"lg"}>{genre.name}</Text>
            </HStack>
          </GenreListContainer>
        ))}
    </List>
  );
};

export default GenreList;
