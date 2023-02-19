import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { CartsItem } from "../../types";

export const getStaticPaths = async () => {
  const { data } = await axios.get("https://dummyjson.com/carts");

  const paths = await data.carts.map((cart: CartsItem) => {
    return {
      params: {
        id: cart.id.toString(),
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id;
  const { data } = await axios.get(`https://dummyjson.com/carts/${id}`);
  return {
    props: { cart: data },
  };
};

const CartDetails = ({ cart }: { cart: CartsItem }) => {

  return (
    <Grid  gap="12" templateColumns="repeat(5, 1fr)">
      <GridItem colSpan={5}>
        <Heading as="h1" size="lg" noOfLines={1}>
          Cart {cart.id}
        </Heading>
      </GridItem>

      <GridItem colSpan={5}>
        <Flex gap={8} direction="column">
          <Heading as="h2" size="md" noOfLines={1}>
            Details
          </Heading>
          <Flex
            p="8"
            bg="gray.200"
            border="2px"
            borderColor="gray.300"
            gap={4}
            direction={{ base: "column", md: "row" }}
          >
            <Flex gap={4} direction="column" flex="1">
              <Text>User ID: {cart.userId}</Text>
              <Text>Total Quantity: {cart.totalQuantity}</Text>
            </Flex>
            <Flex gap={4} direction="column" flex="1">
              <Text># of Items: {cart.totalProducts}</Text>
              <Text>Total Ammount: $ {cart.total}</Text>
            </Flex>
          </Flex>
        </Flex>
      </GridItem>

      <GridItem colSpan={5}>
        <Flex gap={4} direction="column">
          <Heading as="h2" size="md" noOfLines={1}>
            Products
          </Heading>

          <TableContainer
            border="2px"
            borderColor="gray.300"
            rounded="sm"
            shadow="sm"
          >
            <Table variant="striped">
              <Thead borderBottom="2px" borderColor="gray.300">
                <Tr>
                  <Th>Product Name</Th>
                  <Th>Price</Th>
                  <Th>Quantity</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cart.products.map((product) => (
                  <Tr key={product.id}>
                    <Td>{product.title}</Td>
                    <Td>$ {product.price}</Td>
                    <Td>{product.quantity}</Td>
                    <Td>$ {product.total}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default CartDetails;
