import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Image,
  Button,
  Link,
  CircularProgress,
  useToken,
} from "@chakra-ui/react";

import { Link as RouterLink, useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserDetails } from "./userDetailsSlice";
import Details from "./Details";

const UserDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.users.userDetails);
  const userDetailsStatus = useSelector((state) => state.users.userDetailsStatus);

  useEffect(() => {
    dispatch(fetchUserDetails(id));
  }, []);

  return (
    <Box>
      <Box as="h1" fontSize="30px">
        User Details
      </Box>
      <Box h="100vh" display="grid" overflow="scroll">
        {userDetailsStatus === "loading" && (
          <Box style={{ placeSelf: "center" }} as="span">
            <CircularProgress isIndeterminate size="120px" color="red.300" />
          </Box>
        )}

        {userDetails.length > 0 && (
          <Box>
            <Details userDetails={userDetails} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserDetails;
