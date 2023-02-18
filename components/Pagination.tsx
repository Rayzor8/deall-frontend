import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface PaginationProps {
  total: number;
  perPage: number;
  prevPage: () => void;
  nextPage: () => void;
}

const Pagination = ({
  total,
  prevPage,
  perPage,
  nextPage,
}: PaginationProps) => {
  const { loading, counter } = useSelector(
    (state: RootState) => state.products
  );
  return (
    <Flex gap={2}>
      <Button
        colorScheme="gray"
        shadow="sm"
        onClick={prevPage}
        isDisabled={loading}
      >
        Prev
      </Button>

      <Text sx={{ margin: "auto 0" }} w="20">
        {counter} / {total / perPage}
      </Text>

      <Button
        colorScheme="gray"
        shadow="sm"
        onClick={nextPage}
        isDisabled={loading}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
