import { Box, HStack, VStack } from "@chakra-ui/layout";
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
import { signup } from "./loginSlice";
const SignUpForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [fastName, setFastName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [addr1, setAddr1] = useState("");
  const [pin, setPin] = useState("");

  const dispatch = useDispatch();

  const handleImageUpload = () => {
    const { files } = document.querySelector('input[type="file"]');

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "unsignedUploads");

    const options = {
      method: "POST",
      body: formData,
    };

    fetch("https://api.cloudinary.com/v1_1/daze4hie5/image/upload", options)
      .then((res) => res.json())
      .then((res) => {
        setImageUrl(res.secure_url);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let body = {
      fastName,
      lastName,
      email,
      password,
      age,
      phone,
      profilePic: imageUrl,
      address: {
        addr1,
        pin,
      },
    };
    dispatch(signup(body));
  };

  return (
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
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
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
              <NumberInputField value={phone} name="phone" onChange={(e) => setPhone(e.target.value)} />
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

        <FormControl id="profilePic" isRequired>
          <FormLabel>Add Profile Pic </FormLabel>
          <HStack>
            <Input type="file" placeholder="Add profile Pic" variant="filled" a />
            <Button
              leftIcon={<FaCloudUploadAlt />}
              colorScheme="blue"
              variant="outline"
              onClick={() => handleImageUpload()}
            >
              Upload
            </Button>
          </HStack>
        </FormControl>

        <Button type="submit" isDisabled={imageUrl ? null : true} colorScheme="blue">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
