import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Center, useDisclosure } from "@chakra-ui/react";

import { Link as RouterLink, useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserDetails } from "./userDetailsSlice";
import SignUp from "./SignUp";
import { FaArrowRight } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import Players from "./PlayersList";

import { fetchPlayerList } from "../User/playerListSlice";

const UserDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const userDetails = useSelector((state) => state.users.userDetails);
  const userDetailsStatus = useSelector((state) => state.users.userDetailsStatus);
  const signupStatus = useSelector((state) => state.auth.signupStatus);
  useEffect(() => {
    dispatch(fetchUserDetails(id));
  }, []);

  useEffect(() => {
    if (signupStatus === "succeed") {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [signupStatus]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [pageNo, setPageNo] = useState(1);

  const playerList = useSelector((state) => state.player.playerList);

  const limit = 10;
  useEffect(() => {
    dispatch(fetchPlayerList({ pageNo, limit }));
  }, []);

  useEffect(() => {
    dispatch(fetchPlayerList({ pageNo, limit }));
  }, [pageNo]);

  return (
    <Box>
      {userDetails.length > 0 && (
        <Center>
          {userDetails[0].isSuperUser ? (
            <Box>
              <Box as="h1" fontSize="30px">
                Super User Dashboard
              </Box>
              <Button
                mt="5px"
                ml="322px"
                colorScheme="blue"
                onClick={() => onOpen()}
                rightIcon={<FaArrowRight />}
              >
                Add New User
              </Button>

              {playerList.length > 0 && (
                <Box>
                  {playerList.map(({ id, userId, firsetname, lastname }) => (
                    <li key={id}>
                      <Box>
                        User Id :{userId} FirstName :{firsetname} LastName:{lastname}
                      </Box>
                    </li>
                  ))}

                  <Button
                    onClick={() => {
                      if (pageNo > 0) setPageNo((pageNo) => pageNo - 1);
                    }}
                  >
                    Last Page
                  </Button>
                  <Button onClick={() => setPageNo((pageNo) => pageNo + 1)}>Next Page</Button>
                </Box>
              )}
            </Box>
          ) : (
            <Box as="h1" fontSize="30px">
              User Dashboard
            </Box>
          )}
        </Center>
      )}

      {userDetails.length > 0 && (
        <Box>
          {userDetails[0].isSuperUser ? (
            <SignUp /> //if super user other wise show payer list
          ) : (
            <Players />
          )}
        </Box>
      )}
      <Box h="100vh" display="grid" overflow="scroll">
        {userDetailsStatus === "loading" && (
          <Box style={{ placeSelf: "center" }} as="span">
            <CircularProgress isIndeterminate size="120px" color="red.300" />
          </Box>
        )}
      </Box>
      {isOpen && <SignUp isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
};

export default UserDetails;
