import React, { useEffect, useState } from "react";
import { Box, Center, HStack, VStack } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayerList } from "./playerListSlice";
import { Button } from "@chakra-ui/button";

const Details = () => {
  const dispatch = useDispatch();

  const [pageNo, setPageNo] = useState(1);

  const playerList = useSelector((state) => state.player.playerList);

  const limit = 50;
  useEffect(() => {
    dispatch(fetchPlayerList({ pageNo, limit }));
  }, []);

  useEffect(() => {
    dispatch(fetchPlayerList({ pageNo, limit }));
  }, [pageNo]);

  return (
    <Box>
      <h1>Player List </h1>
      <Center>
        <ul>
          {playerList.length > 0 ? (
            playerList.map(({ id, userId, firsetname, lastname }) => (
              <li key={id}>
                <Box>
                  User Id :{userId} FirstName :{firsetname} LastName:{lastname}
                </Box>
              </li>
            ))
          ) : (
            <h1>No player found on this Page .</h1>
          )}
        </ul>
        <br></br>
        <Box>
          <Button
            onClick={() => {
              if (pageNo > 0) setPageNo((pageNo) => pageNo - 1);
            }}
          >
            Last Page
          </Button>
          <Button onClick={() => setPageNo((pageNo) => pageNo + 1)}>Next Page</Button>
        </Box>
      </Center>
    </Box>
  );
};

export default Details;
