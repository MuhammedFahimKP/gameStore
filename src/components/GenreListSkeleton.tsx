import { Box, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const GenreListSkeleton = () => {
  return (
    <Box
      display={"flex"}
      flexDir={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <SkeletonCircle borderRadius={"10px"} />
      <Box flex={1}>
        <Skeleton flex={1} marginLeft={"10px"} height={"10px"} />
      </Box>
    </Box>
  );
};

export default GenreListSkeleton;
