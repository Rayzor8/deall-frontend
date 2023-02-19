import { Grid, GridItem } from "@chakra-ui/react";
import { ReactNode } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Grid templateColumns="repeat(6,1fr)">
      <GridItem
        borderRight="2px"
        borderColor="gray.400"
        as="aside"
        bg="gray.300"
        minHeight={{ lg: "100vh" }}
        colSpan={{ base: 6, lg: 2, xl: 1 }}
        p={{base:'20px',md:'40px'}}
      >
        <Sidebar />
      </GridItem>
      <GridItem colSpan={{ base: 6, lg: 4, xl: 5 }} as="main" p={{base:'20px',md:'40px'}}>
        <section>{children}</section>
      </GridItem>
    </Grid>
  );
}
