import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form/dist/index.ie11";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Button,
  Link,
  Flex,
  Grid,
  GridItem,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  Select,
} from "@chakra-ui/react";

import BANK from "../asset/bank.svg";

import { CashoutRequestTable } from "../component/UserProfileUtilsComponents";
import { FaPen } from "react-icons/fa";
import API from "../config/API";

const userProfileDetails = () => {
  const { state } = useLocation();
  console.log("initila state ,", state);
  const [userId, setUserId] = useState("");
  const [myTransactionLogs, setMyTransactionLogs] = useState([]);

  const [userCashoutRequests, setUserCashoutRequest] = useState([]);
  const [userName, setUserName] = useState("");
  const [isError, setIsError] = useState(false);

  let requestedBankDetails = {
    accountHolderName: "Umesh Singh",
    accountNumber: "00762121033878",
    accountType: "Saving Account",
    bankName: "Punjab National Bank",
    ifscCode: "PUNB0007610",
  };
  // modal control
  const { isOpen, onOpen, onClose } = useDisclosure();

  //    fom controls
  const { handleSubmit, errors, register, formState, getValues } = useForm({
    defaultValues: {
      ...requestedBankDetails,
    },
  });

  function onSubmit() {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(getValues(), null, 2));
        resolve();
      }, 3000);
    });
  }

  const fetchMyTransactionLogs = async () => {
    //will fetch  the data from pthe url

    try {
      let { data } = await API.post(`moneyLog/getMoneyLogs`, {
        searchText: userId,
        searchType: "USERID",
      });
      let { success, data: responseData } = data;
      if (success === 1) {
        if (!Array.isArray(responseData)) {
          responseData = [responseData];
        }
        setMyTransactionLogs(responseData);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  const getUserCashoutRequests = async () => {
    try {
      let { data } = await API.post(`cahsout/getUserCashoutRequests`, {
        userId,
      });
      let { success, data: responseData } = data;
      if (success === 1) {
        setUserCashoutRequest(responseData);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  useEffect(() => {
    setUserId(state.userId);
    setUserName(() => state.requestedBy);
  }, []);

  useEffect(() => {
    console.log("once ", { userId });
    getUserCashoutRequests();
  }, [userId]);

  return (
    <Box>
      {" "}
      <Box as="h1" fontSize="30px">
        {`${userName} (${userId})`}
      </Box>
      <Breadcrumb fontWeight="medium" fontSize="sm">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            <Text color="blue">Cashout Panel</Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            <Text color="blue">Cashout Requests </Text>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>
            {" "}
            <Text>{`${userName} (${userId})`} </Text>{" "}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {/* tabs and thgere respective data table  */}
      <Tabs height="60vh" mt="1.5rem" variant="soft-rounded" isLazy>
        <TabList bgColor="white" p="0.8rem" display="flex" rounded="md">
          <Tab
            _selected={{
              color: "#E47297",
              bg: "white",
              border: "2px #E47297 solid",
            }}
          >
            Cashout Request
          </Tab>
          <Tab
            _selected={{
              color: "#E47297",
              bg: "white",
              border: "2px #E47297 solid",
            }}
            onClick={fetchMyTransactionLogs}
          >
            My Money Transactions
          </Tab>
          <Tab
            _selected={{
              color: "#E47297",
              bg: "white",
              border: "2px #E47297 solid",
            }}
          >
            Saved Bank Accounts
          </Tab>
        </TabList>
        <TabPanels overflowY="scroll" h="80%" bgColor="blue">
          <TabPanel>
            {userCashoutRequests.length > 0 ? (
              <CashoutRequestTable tab={1} tableData={userCashoutRequests} />
            ) : (
              <h1>LOADING</h1>
            )}
          </TabPanel>
          <TabPanel>
            {myTransactionLogs.length > 0 ? (
              <CashoutRequestTable tab={2} tableData={myTransactionLogs} />
            ) : (
              <h1>LOADING</h1>
            )}
          </TabPanel>
          <TabPanel>
            <CashoutRequestTable tab={3} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* user details  */}
      <Flex height="23vh" w="100%">
        <Box
          height="100%"
          margin="0.5rem 0.5rem 0rem 0rem"
          width="50%"
          bgColor="white"
          color="#6C757D"
          p={2}
        >
          <Flex justify="space-between" align="center">
            <Text>User Details :</Text>
          </Flex>
          <Grid
            h="100%"
            templateRows="repeat(4, 1fr)"
            templateColumns="repeat(6, 1fr)"
            gap={1}
            alignItems="center"
          >
            <GridItem gridRow="1/2" gridColumn="1/4">
              <Flex>
                <Text>Request Id :</Text>
                <Text color="#000000">834936</Text>
              </Flex>
            </GridItem>

            <GridItem gridRow="1/2" gridColumn="4/7">
              <Flex>
                <Text noOfLines={1}>Requested Amt :</Text>

                <Text
                  rounded="md"
                  border="2px solid #CCC7C7"
                  color="#177CE6"
                  padding="0.1rem"
                >
                  {` \u20B9 45765`}
                </Text>
              </Flex>
            </GridItem>

            <GridItem gridRow="2/3" gridColumn="1/4">
              <Flex>
                <Text>Cashout Bal :</Text>
                <Text color="#000000">{` \u20B9 8336`}</Text>
              </Flex>
            </GridItem>

            <GridItem gridRow="2/3" gridColumn="4/7">
              <Flex>
                <Text>Requested Mode :</Text>
                <Image src={BANK} width="70px" objectFit="contain" />
              </Flex>
            </GridItem>

            <GridItem gridRow="3/4" gridColumn="1/-1">
              <Flex>
                <Text>Requested Mode :</Text>

                <Text color="#000000">Wed Nov 25 2020 12:36:24</Text>
              </Flex>
            </GridItem>

            <GridItem gridRow="4/5" gridColumn="1/-1">
              <Flex>
                <Text>Locked In Amt :</Text>

                <Text
                  rounded="md"
                  border="2px solid #CCC7C7"
                  color="#177CE6"
                  padding="0.1rem"
                >
                  {` \u20B9 4565`}
                </Text>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
        <Box
          height="100%"
          margin="0.5rem 0.5rem 0rem 0rem"
          width="50%"
          bgColor="white"
          color="#6C757D"
          p={2}
        >
          <Flex justify="space-between" align="center">
            <Text>Bank Details :</Text>
            <Button
              onClick={onOpen}
              colorScheme="blue"
              leftIcon={<FaPen />}
              variant="outline"
              borderRadius="2rem"
              size="sm"
            >
              Edit
            </Button>
          </Flex>
          <Grid
            h="100%"
            templateRows="repeat(4, 1fr)"
            templateColumns="repeat(6, 1fr)"
            gap={1}
            alignItems="center"
          >
            <GridItem gridRow="1/2" gridColumn="1/-1">
              <Flex>
                <Text>Acc. Holder Name :</Text>
                <Text color="#000000">sanket ding </Text>
              </Flex>
            </GridItem>

            <GridItem gridRow="2/3" gridColumn="1/-1">
              <Flex>
                <Text>Acc. Number :</Text>
                <Text color="#000000">745985859847487</Text>
              </Flex>
            </GridItem>

            <GridItem gridRow="3/4" gridColumn="1/-1">
              <Flex>
                <Text>Acc. Type :</Text>

                <Text color="#000000">Savibg</Text>
              </Flex>
            </GridItem>

            <GridItem gridRow="4/5" gridColumn="1/5">
              <Flex>
                <Text noOfLines={1}>Bank :</Text>

                <Text isTruncated color="#000000">
                  saome random bank sanke
                </Text>
              </Flex>
            </GridItem>

            <GridItem gridRow="4/5" gridColumn="4/7">
              <Flex>
                <Text>IFSC CODE :</Text>

                <Text color="#000000" casing="uppercase">
                  icicic94375405
                </Text>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </Flex>
      {/* Edit modal code  */}
      <Modal
        isCentered
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Bank Details </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Account Holder name  */}
              <FormControl isRequired isInvalid={errors.name}>
                <FormLabel htmlFor="accountHolderName">
                  Account Holder Name
                </FormLabel>
                <Input
                  name="accountHolderName"
                  placeholder="Account Holder Name "
                  ref={register({
                    required: true, // JS only: <p>error message</p> TS only support string
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              {/* Account Number  */}
              <FormControl isRequired isInvalid={errors.name}>
                <FormLabel htmlFor="accountNumber">Account Number</FormLabel>
                <NumberInput name="accountNumber">
                  <NumberInputField
                    placeholder="Account Number"
                    ref={register({
                      required: true,
                    })}
                  />
                </NumberInput>
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              {/* Accoubt Type */}
              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="accountType">Account Type</FormLabel>
                <Select
                  name="accountType"
                  placeholder="Account Type"
                  ref={register({
                    required: true,
                  })}
                >
                  <option value="Saving Account">Saving Account</option>
                  <option value="Current Account">Current Account</option>
                  <option value="UPI">UPI</option>
                </Select>

                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              {/* Bank Name  */}
              <FormControl isRequired isInvalid={errors.name}>
                <FormLabel htmlFor="bankName">Bank Name</FormLabel>
                <Input
                  name="bankName"
                  placeholder="Account Holder Name "
                  ref={register({
                    required: true,
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              {/* IFSC CODE  */}
              <FormControl isRequired isInvalid={errors.name}>
                <FormLabel htmlFor="ifscCode">IFSC code</FormLabel>
                <Input
                  name="ifscCode"
                  placeholder="Account Holder Name "
                  ref={register({
                    required: true,
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={formState.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default userProfileDetails;
