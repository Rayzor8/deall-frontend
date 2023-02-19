import { Input } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/slices/productSlice";
import { AppDispatch, RootState } from "../redux/store";

const InputSearch = () => {
  const { searchQuery } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Input
      placeholder="Search Product"
      maxW="500px"
      border="2px"
      borderColor="gray.300"
      shadow="sm"
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      value={searchQuery}
      type="search"
    />
  );
};

export default InputSearch;
