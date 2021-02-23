import {
  Box,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  PinInput,
  PinInputField,
  Stack,
  Icon,
  Button,
  VStack,
  
} from "@chakra-ui/react";

import React, { useState } from "react";
import { FaPhone, FaKey, FaMailBulk } from "react-icons/fa";
import loginImage from "../../asset/signin.svg";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [OTP, setOtp] = useState(null);
  const [isHidden, setIsHidden] = useState(false);

  const sendOTP = () =>{
    if(email && phoneNumber){
      //save teh details in local storage 
      //send data in to the think APi 
      // on response save the "OTP token" 


    }
  }

  return (
    <Box
      h="100vh"
      border="1px red solid"
      display="grid"
      justifyContent="center"
      alignContent="center"
    >
      <Box display="flex" justifyContent="space-around" width="100vw">
        <Box width="500px" margin="auto 0">
          <Stack spacing={4}>
            <form>
            {isHidden === false ? (
              <VStack>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={FaMailBulk} />}
                  />
                  <Input
                    type="tel"
                    value={email}
                    isRequired
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement
                  
                    pointerEvents="none"
                    children={<Icon as={FaPhone} />}
                  />
                  <Input
                    type="number"
                    isRequired
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone number"
                  />
                </InputGroup>
              </VStack>
            ) : (
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={FaKey} />}
                />
                <Input
                  type="number"
                  value={OTP}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                />
              </InputGroup>
            )}

            {isHidden === false ? (
              <Button mt="5px" ml="322px" colorScheme="blue" type="submit" onClick = {()=>sendOTP()}  >Submit Credentials</Button>
            ) : (
              <Button colorScheme="blue">Submit OTP</Button>
            )}
            </form>
          </Stack>
        </Box>
        <Box>
          <Image src={loginImage} boxSize="500px" />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
