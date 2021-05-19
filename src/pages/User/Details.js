import React from "react";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";

const Details = ({ userDetails }) => {
  console.log("userDetails => => => ", userDetails);
  const {
    profilePic,
    address: { addr1, pin },
    email,
    fastName,
    phone,
    lastName,
    age,
  } = userDetails[0];

  return (
    <Box>
      <HStack>
        <VStack>
          <Image borderRadius="full" boxSize="150px" src={profilePic} alt="profile Pic" />
          <FormControl id="age" isRequired>
            <FormLabel>Age </FormLabel>
            <Input type="text" value={age} isReadOnly />
          </FormControl>
        </VStack>
        <Box>
          <VStack>
            <HStack>
              <FormControl id="fastName" isRequired>
                <FormLabel>First name </FormLabel>
                <Input value={fastName} isReadOnly />
              </FormControl>

              <FormControl id="lastName" isRequired>
                <FormLabel>Last name </FormLabel>
                <Input type="text" value={lastName} isReadOnly />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email </FormLabel>
                <Input value={email} isReadOnly />
              </FormControl>

              <FormControl id="phone" isRequired>
                <FormLabel>Mobile </FormLabel>
                <Input type="text" value={phone} isReadOnly />
              </FormControl>
            </HStack>
            <FormControl id="addr" isRequired>
              <FormLabel>Address </FormLabel>
              <Input type="text" value={addr1} isReadOnly />
            </FormControl>
            <FormControl id="pin" isRequired>
              <FormLabel>Pin </FormLabel>
              <Input type="text" value={pin} isReadOnly />
            </FormControl>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default Details;
