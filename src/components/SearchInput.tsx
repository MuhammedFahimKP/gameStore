import { useRef } from "react";
import { FormEvent } from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (searchBoxRef.current) onSearch(searchBoxRef.current.value);
  };
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={searchBoxRef}
          borderRadius={20}
          placeholder="Search games..."
          variant={"filled"}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
