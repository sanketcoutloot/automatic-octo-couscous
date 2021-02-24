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

import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { FaPhone, FaKey, FaMailBulk } from "react-icons/fa";
import loginImage from "../../asset/signin.svg";

//redux
import { useDispatch, useSelector } from "react-redux";

import {
  verifyOTP as verifyOTPThunk,
  sendOTP as sendOTPThunk,
} from "../Login/loginSlice";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [OTP, setOtp] = useState(null);
  const [isHidden, setIsHidden] = useState(false);

  const dispatch = useDispatch();

  //state value from redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const sendOTP = (e) => {
    e.preventDefault();
    if (email && mobile) {
      localStorage.setItem("email", email);
      localStorage.setItem("mobile", mobile);
      setIsHidden(!isHidden);
      dispatch(sendOTPThunk({ email, mobile }));
    }
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    if (OTP) {
      dispatch(verifyOTPThunk(OTP));
    }
  };

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
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
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
                <Button
                  mt="5px"
                  ml="322px"
                  colorScheme="blue"
                  type="submit"
                  onClick={(event) => sendOTP(event)}
                >
                  Submit Credentials
                </Button>
              ) : (
                <Button
                  mt="5px"
                  ml="378px"
                  colorScheme="blue"
                  type="submit"
                  onClick={(event) => verifyOTP(event)}
                >
                  Submit OTP
                </Button>
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
