import { ListItem } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GenreListContainer = ({ children }: Props) => {
  return <ListItem paddingY={"5px"}>{children}</ListItem>;
};

export default GenreListContainer;
