import { Box, Center, HStack, VStack } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberDecrementStepper,
  Textarea,
  Button,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../Auth/loginSlice";
const SignUpForm = () => {
  const [fastName, setFastName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [addr1, setAddr1] = useState("");
  const [pin, setPin] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let body = {
      fastName,
      lastName,
      email,
      password,
      age,
      phone,
      address: {
        addr1,
        pin,
      },
    };
    dispatch(signup(body));
  };

  return (
    <Center>
      <Box>
        <form onSubmit={(event) => handleSubmit(event)}>
          <HStack>
            <FormControl id="fastName" isRequired>
              <FormLabel>Firstname </FormLabel>
              <Input
                value={fastName}
                onChange={(e) => setFastName(e.target.value)}
                name="fastName"
                type="text"
              />
            </FormControl>

            <FormControl id="lastName" isRequired>
              <FormLabel>Lastname </FormLabel>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                name="lastName"
              />
            </FormControl>
          </HStack>

          <HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email </FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
              <FormHelperText>This email is used for login</FormHelperText>
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password </FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
              <FormHelperText>Do not share password with anyone</FormHelperText>
            </FormControl>
          </HStack>

          <HStack>
            <FormControl id="age" isRequired>
              <FormLabel>Age </FormLabel>
              <NumberInput inputMode="numeric" max="100">
                <NumberInputField value={age} onChange={(e) => setAge(e.target.value)} name="age" />
              </NumberInput>
            </FormControl>

            <FormControl id="phone" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <NumberInput
                inputMode="tel"
                max="9999999999"
                value={phone}
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
              >
                <NumberInputField
                  value={phone}
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </NumberInput>
            </FormControl>
          </HStack>

          <HStack>
            <FormControl id="age" isRequired>
              <FormLabel>Address </FormLabel>
              <Textarea
                placeholder="Please add your Address."
                size="xs"
                value={addr1}
                name="addr1"
                onChange={(e) => setAddr1(e.target.value)}
              />
            </FormControl>

            <FormControl id="pin" isRequired>
              <FormLabel>Pin</FormLabel>
              <NumberInput>
                <NumberInputField value={pin} name="pin" onChange={(e) => setPin(e.target.value)} />
              </NumberInput>
            </FormControl>
          </HStack>

          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default SignUpForm;
