import useGenres from "../hooks/useGenres";
import { Genre } from "../types";
import { List, Heading, HStack, Image, Button } from "@chakra-ui/react";
import getCroppedImageUrl from "../services/image-urls";
import GenreListSkeleton from "./GenreListSkeleton";
import GenreListContainer from "./GenreListContainer";

interface Props {
  onSelectedGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectedGenre, selectedGenre }: Props) => {
  const skeletons = [
    1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const { data, isLoading, error } = useGenres();

  if (error) return null;

  return (
    <>
      <Heading fontSize={"2xl"} marginBottom={3}>
        Genres
      </Heading>
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
                  objectFit={"cover"}
                  src={getCroppedImageUrl(genre.image_background)}
                />
                <Button
                  whiteSpace={"pre-line"}
                  textAlign={"left"}
                  fontSize={"lg"}
                  variant={"link"}
                  onClick={() => onSelectedGenre(genre)}
                  fontWeight={
                    genre.id === selectedGenre?.id ? "bold" : "normal"
                  }
                >
                  {genre.name}
                </Button>
              </HStack>
            </GenreListContainer>
          ))}
      </List>
    </>
  );
};

export default GenreList;
