import { Skeleton, Stack } from "@chakra-ui/react";

interface SkeletonLoader {
  length: number;
  width: number | string;
}
const SkeletonLoader = ({ length, width }: SkeletonLoader) => {
  const skelArr = [...Array(length).keys()];
  return (
    <Stack w={{ base: "full", md: width }}>
      {skelArr.map((_, index) => (
        <Skeleton height="40px" key={index} />
      ))}
    </Stack>
  );
};

export default SkeletonLoader;
