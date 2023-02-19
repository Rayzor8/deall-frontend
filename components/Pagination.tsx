import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface PaginationProps {
  total: number;
  perPage: number;
  prevPage: () => void;
  nextPage: () => void;
  loading: boolean;
  counter: number;
  skip: number;
}

const Pagination = ({
  total,
  prevPage,
  perPage,
  nextPage,
  loading,
  counter,
  skip,
}: PaginationProps) => {
  return (
    <Flex gap={2}>
      <Button
        colorScheme="gray"
        shadow="sm"
        onClick={prevPage}
        isDisabled={loading || skip === 0}
      >
        Prev
      </Button>

      <Text sx={{ margin: "auto 0" }} w="max-content" fontWeight="700">
        {counter} / {total / perPage}
      </Text>

      <Button
        colorScheme="gray"
        shadow="sm"
        onClick={nextPage}
        isDisabled={loading || total === skip + perPage}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
