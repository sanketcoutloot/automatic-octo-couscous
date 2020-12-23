import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";

import { Navbar } from "../Navbar";
import { Main } from "../Main";

const Layout = ({ children }) => {
  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      p={2}
      gap={2}
      style={{ boxSizing: "border-box" }}
    >
      {/* side navigation  */}
      <GridItem
        border="1px"
        borderColor="blue"
        // rowStart={2}
        // rowEnd={-1}
        colStart={1}
        colEnd={2}
        style={{ height: "calc(100vh - 1rem)" }}
        overflowY="hidden"
        _hover={{
          overflowY: "scroll",
        }}
      >
        <Navbar />
      </GridItem>

      {/* main content */}

      <GridItem
        bg="rgba(245,245,245,1)"
        borderColor="white"
        boxShadow="lg"
        p={4}
        rounded="lg"
        colStart={2}
        colEnd={-1}
        style={{ height: "calc(100vh - 1rem)", boxSizing: "border-box" }}
      >
        <Main>{children}</Main>
      </GridItem>
    </Grid>
  );
};

export default Layout;
