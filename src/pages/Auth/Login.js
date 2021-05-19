import {
  Box,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Icon,
  useToast,
  Button,
  VStack,
  FormLabel,
  useDisclosure,
  InputRightElement,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { FaPhone, FaKey, FaArrowRight, FaMailBulk } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import loginImage from "../../asset/signin.svg";
import SignUpForm from "./SignUp";
import { login } from "./loginSlice";
//redux
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  //state value from redux
  const user = useSelector((state) => state.auth.userDetails);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (user) {
      history.push(`/userDetails/${user._id}`);
    }
  }, [user]);

  return (
    <Box h="100vh" border="1px red solid" display="grid" justifyContent="center" alignContent="center">
      <Box display="flex" justifyContent="space-around" width="100vw">
        <Box width="500px" margin="auto 0">
          <Stack spacing={4}>
            <form>
              <VStack>
                <InputGroup isRequired>
                  <InputLeftElement pointerEvents="none" children={<Icon as={FaMailBulk} />} />
                  <Input
                    type="email"
                    value={email}
                    isRequired
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<Icon as={RiLockPasswordFill} />} />
                  <Input
                    type={show ? "text" : "password"}
                    isRequired
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </VStack>
              <HStack>
                <Button
                  mt="5px"
                  ml="322px"
                  colorScheme="blue"
                  type="submit"
                  variant="outline"
                  onClick={(event) => loginHandler(event)}
                >
                  Login
                </Button>

                <Button
                  mt="5px"
                  ml="322px"
                  colorScheme="blue"
                  onClick={() => onOpen()}
                  rightIcon={<FaArrowRight />}
                  // onClick={(event) => verifyOTP(event)}
                >
                  Sign Up
                </Button>
              </HStack>
            </form>
          </Stack>
        </Box>
        <Box>
          <Image src={loginImage} boxSize="500px" />
        </Box>
      </Box>
      {isOpen && <SignUpForm isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
};

export default Login;
