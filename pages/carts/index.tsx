import {
  Grid,
  GridItem,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination";
import SkeletonLoader from "../../components/SkeletonLoader";
import {
  counterDecrement,
  counterIncrement,
  fetchCarts,
} from "../../redux/slices/cartSlice";
import { RootState, AppDispatch } from "../../redux/store";

const Carts = () => {
  const {
    data,
    loading,
    page: { skip, limit, total },
    counter,
  } = useSelector((state: RootState) => state.carts);
  const dispatch = useDispatch<AppDispatch>();

  const perPage = 10;
  const maxPage = total - perPage;

  useEffect(() => {
    dispatch(fetchCarts({ skip: skip, limit: limit }));
  }, [dispatch, limit, skip]);

  function prevPage() {
    if (skip !== 0) {
      dispatch(fetchCarts({ skip: skip - perPage, limit: limit }));
      dispatch(counterDecrement());
    }
  }

  function nextPage() {
    if (skip !== maxPage) {
      dispatch(fetchCarts({ skip: skip + perPage, limit: limit }));
      dispatch(counterIncrement());
    }
  }

  return (
    <Grid as="main" gap="4" templateColumns="repeat(5, 1fr)">
      <GridItem colSpan={5}>
        <Heading as="h1" size="lg" noOfLines={1}>
          Cart List Page
        </Heading>
      </GridItem>

      <GridItem colSpan={5}>
        {!loading ? (
          <TableContainer
            border="2px"
            borderColor="gray.300"
            rounded="sm"
            shadow="sm"
          >
            <Table variant="simple">
              <Thead borderBottom="2px" borderColor="gray.300">
                <Tr>
                  <Th>User Id</Th>
                  <Th>Total Products</Th>
                  <Th>Total Quantity</Th>
                  <Th>Total Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.carts?.map((cart) => (
                  <Tr key={cart.id} cursor="pointer" _hover={{bg:'gray.200'}}>
                    <Td>{cart.userId}</Td>
                    <Td>{cart.totalProducts}</Td>
                    <Td>{cart.totalQuantity}</Td>
                    <Td>$ {cart.total}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <SkeletonLoader length={12} width="full" />
        )}
      </GridItem>

      <GridItem colStart={5}>
        <Pagination
          loading={loading}
          counter={counter}
          total={total}
          perPage={perPage}
          prevPage={prevPage}
          nextPage={nextPage}
          skip={skip}
        />
      </GridItem>
    </Grid>
  );
};

export default Carts;
