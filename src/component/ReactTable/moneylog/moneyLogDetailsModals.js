import {
  Box,
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  ModalOverlay,
  Spacer,
  Stack,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

const moneyLogDetailsMoodal = ({ isOpen, onClose, moneyLogDetails }) => {
  return (
    <Box>
      {console.log("data in the modal")}
      <Modal isCentered size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex">
              <Stack direction="row" spacing={4} align="center">
                <Button colorScheme="teal" variant="outline">
                  Order ID:
                  <Box as="span" color="#F9BD65">
                    12344
                  </Box>
                </Button>
                <Button colorScheme="teal" variant="outline">
                  Product ID:
                  <Box color="#8504BE" as="span">
                    h9e879320
                  </Box>
                </Button>
              </Stack>
              <Spacer />

              <Button color="#17A823">{`- \u20B9 98393`}</Button>
            </Box>

            <Grid
              marginTop="10px"
              templateColumns="1fr 1fr 1fr"
              templateRows="repeat(5,1fr)"
              gap={2}
            >
              {/* row 1 */}
              <GridItem rowStart={1} rowEnd={2} colStart={1} colEnd={2}>
                <Flex justifyContent="space-between">
                  <Text fontSize="lg" color="gray.500">
                    Transaction ID{" "}
                  </Text>
                  <Text fontSize="lg">:</Text>
                </Flex>
              </GridItem>

              <GridItem rowStart={1} rowEnd={2} colStart={2} colEnd={4}>
                sanket singh
              </GridItem>

              {/* row 2 */}
              <GridItem rowStart={2} rowEnd={3} colStart={1} colEnd={2}>
                <Flex justifyContent="space-between">
                  <Text fontSize="lg" color="gray.500">
                    User Name{" "}
                  </Text>
                  <Text fontSize="lg">:</Text>
                </Flex>
              </GridItem>

              <GridItem rowStart={2} rowEnd={3} colStart={2} colEnd={4}>
                sanket singh
              </GridItem>
              {/* row 3 */}
              <GridItem rowStart={3} rowEnd={4} colStart={1} colEnd={2}>
                <Flex justifyContent="space-between">
                  <Text fontSize="lg" color="gray.500">
                    Trasnasaction Date & Time{" "}
                  </Text>
                  <Text fontSize="lg">:</Text>
                </Flex>
              </GridItem>

              <GridItem rowStart={3} rowEnd={4} colStart={2} colEnd={4}>
                sanket singh
              </GridItem>
              {/* row 4 */}
              <GridItem rowStart={4} rowEnd={5} colStart={1} colEnd={2}>
                <Flex justifyContent="space-between">
                  <Text fontSize="lg" color="gray.500">
                    Wallet Type{" "}
                  </Text>
                  <Text fontSize="lg">:</Text>
                </Flex>
              </GridItem>

              <GridItem rowStart={4} rowEnd={5} colStart={2} colEnd={4}>
                sanket singh
              </GridItem>
              {/* row 5 */}
              <GridItem rowStart={5} rowEnd={6} colStart={1} colEnd={2}>
                <Flex justifyContent="space-between">
                  <Text fontSize="lg" color="gray.500">
                    Type{" "}
                  </Text>
                  <Text fontSize="lg">:</Text>
                </Flex>
              </GridItem>

              <GridItem rowStart={5} rowEnd={6} colStart={2} colEnd={4}>
                sanket singh
              </GridItem>
            </Grid>

            <Flex>
              <Box
                py={3}
                px={3}
                my={4}
                mx={4}
                borderRadius={5}
                color="white"
                bg="#F41717"
              >
                Opening Balance : ₹2300
              </Box>
              <Box
                py={3}
                px={3}
                mx={4}
                my={4}
                borderRadius={6}
                color="white"
                bg="#4CBA2B"
              >
                Opening Balance : ₹2300
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default moneyLogDetailsMoodal;
