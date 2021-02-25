import { Box, Center, Container, Image, Text } from "@chakra-ui/react";
import React from "react";

import errorImage from "../asset/4o4.svg";
const ErrorPage = () => {
  return (
    <Container>
      <Box marginTop="23vh">
        <Text color="red.600" fontWeight="700" fontSize="50px">
          Aw, Snap
        </Text>
        <Image src={errorImage} />
        <Text color="red.300" as="h4" fontWeight="600">
          Right Now,Our Developers are centering the element inside Div <br />
          They will get to Shit this later.
        </Text>
      </Box>
    </Container>
  );
};

export default ErrorPage;
