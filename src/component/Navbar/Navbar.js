import {
  Box,
  ListItem,
  UnorderedList,
  Link,
  Image,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";
import React from "react";

import { FaBars, FaGreaterThan, FaHome, FaUserAlt } from "react-icons/fa";

import Logo from "../../asset/cl-logo.png";
const ActiveLinkStyle = {
  fontWeight: "bold",
  color: "blue",
};

const Navbar = () => (
  <Box as="nav" bg="teal" position="relative">
    <Box as="div" position="sticky" top="0" backgroundColor="white">
      <Box display="flex" m={3} justifyContent="space-around">
        <Icon as={FaBars} color="gray.500" h={6} w={6} />
        <img
          src={Logo}
          style={{
            height: "1.7rem",
            width: "9rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </Box>

      <Box
        display="flex"
        m={2}
        alignItems="center"
        justifyContent="space-around"
      >
        <Box borderRadius="md" border="grey 2px solid" bgColor="white" p={1}>
          <Icon as={FaUserAlt} w={6} h={6} />
        </Box>
        <Box textAlign="center">
          <Box> Mahima </Box>
          <Box fontSize="xs"> co-founder </Box>
        </Box>
      </Box>
    </Box>

    <hr style={{ margin: "1.1rem" }} />

    <UnorderedList listStyleType="none" margin="none">
      <ListItem
        display="flex"
        alignItems="center"
        // justifyContent="space-between"
        m={2}
      >
        <Icon boxSize={3} mr={6} as={FaHome} />
        <Link
          as={RouterLink}
          to="/allRequests"
          activeStyle={{ ...ActiveLinkStyle }}
        >
          All Request
        </Link>
        <Icon
          ml="auto"
          mr="2.5rem"
          boxSize={3}
          color="gray.500"
          as={FaGreaterThan}
        />
      </ListItem>

      <ListItem
        display="flex"
        alignItems="center"
        // justifyContent="space-between"
        m={2}
      >
        <Icon boxSize={3} mr={6} as={FaHome} />
        <Link
          as={RouterLink}
          to="/moneyLogs"
          activeStyle={{ ...ActiveLinkStyle }}
        >
          Money Logs
        </Link>
        <Icon
          ml="auto"
          mr="2.5rem"
          boxSize={3}
          color="gray.500"
          as={FaGreaterThan}
        />
      </ListItem>
    </UnorderedList>
  </Box>
);

export default Navbar;
