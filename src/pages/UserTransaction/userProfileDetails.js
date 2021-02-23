import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  Flex,
  Grid,
  GridItem,
  useDisclosure,
  CircularProgress,
  Center,
  Input,
  InputLeftAddon,
  InputGroup,
  useToast,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

import BANK from "../../asset/bank.svg";
import { Link } from "react-router-dom";
import {
  CashoutRequestTable,
  EditBankDetailsModal,
} from "../../component/UserProfileUtilsComponents";
import { FaPen, FaMoneyBillWave, FaLandmark, FaRedo } from "react-icons/fa";

// REDUX
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMoneyLogs,
  fetchCashoutRequests,
  fetchBankAccounts,
  fetchCurrentCashoutRequest,
  markCashoutRequestComplete,
  clearCurrentCashoutRequest,
  setStatusToIdle,
  verifyBankDetails,
} from "./userTransactionSlice";
import { addRequestToAutoPayQueue } from "../AutoPay/autopaySlice";

const userProfileDetails = () => {
  const { state } = useLocation();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const [bankToTransfer, setBankToTransfer] = useState(null);
  const [isError, setIsError] = useState(false);

  //transferable amount can be changed while
  //giving cashout, latedst value must be fetched from here
  const [transferableFromInput, setTransferableFromInput] = useState([]);

  // modal control
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const toast = useToast();

  //fetching status from the redux-state
  const cashoutRequestsStatus = useSelector(
    (state) => state.userTransactions.cashoutRequestsStatus
  );

  const moneyLogsStatus = useSelector(
    (state) => state.userTransactions.moneyLogsStatus
  );

  const bankAccountsStatus = useSelector(
    (state) => state.userTransactions.bankAccountsStatus
  );

  const currentCashoutStatus = useSelector(
    (state) => state.userTransactions.currentCashoutStatus
  );

  // Fetching error state from the redux-state
  const currentCashoutError = useSelector(
    (state) => state.userTransactions.currentCashoutError
  );

  const error = useSelector((state) => state.userTransactions.error);

  //fetching data from the redux state
  const userCashoutRequests = useSelector(
    (state) => state.userTransactions.cashoutRequests
  );

  const myTransactionLogs = useSelector(
    (state) => state.userTransactions.moneyLogs
  );

  const savedBankDetails = useSelector(
    (state) => state.userTransactions.bankAccounts
  );

  const currentCashoutRequest = useSelector(
    (state) => state.userTransactions.currentCashoutRequest
  );

  //show error

  useEffect(() => {
    if (currentCashoutStatus === "failed") {
      toast({
        title: "Current Cashout Request Failed.",
        description: currentCashoutError,
        status: "error",
        position: "top-right",
        duration: 10000,
        isClosable: true,
      });
    }
  }, [currentCashoutStatus]);

  useEffect(() => {
    if (cashoutRequestsStatus === "failed") {
      toast({
        title: "Cashout request Failed.",
        description: JSON.stringify(error, null, 2),
        status: "error",
        position: "top-right",
        duration: 10000,
        isClosable: true,
      });
    }

    return () => {
      setStatusToIdle("cashoutRequestsStatus");
    };
  }, [cashoutRequestsStatus]);

  useEffect(() => {
    if (moneyLogsStatus === "failed") {
      toast({
        title: "Unable to fetch money logs.",
        description: JSON.stringify(error, null, 2),
        status: "error",
        position: "top-right",
        duration: 10000,
        isClosable: true,
      });
    }

    return () => {
      setStatusToIdle();
    };
  }, [moneyLogsStatus]);

  useEffect(() => {
    if (bankAccountsStatus === "failed") {
      toast({
        title: "Unable to fetch user's bank details.",
        description: JSON.stringify(error, null, 2),
        status: "error",
        position: "top-right",
        duration: 10000,
        isClosable: true,
      });
    }

    return () => {
      setStatusToIdle();
    };
  }, [bankAccountsStatus]);

  useEffect(() => {
    setTransferableFromInput(currentCashoutRequest.transferableAmt);
  }, [currentCashoutRequest]);

  useEffect(() => {
    if (userCashoutRequests.length > 0) {
      setBankToTransfer(userCashoutRequests[0].requestData);
    }
  }, [userCashoutRequests]);

  const openEditBankDetailsModal = (isOpenValue, bankDetails) => {
    setBankToTransfer(bankDetails);
    if (isOpenValue === true) {
      onOpen();
    }
  };

  // get value of userID  from location state
  useEffect(() => {
    setUserId(state.userId);
    setUserName(() => state.requestedName);
  }, []);

  // fetch cashout requests for users ID on page load
  useEffect(() => {
    if (userId) {
      dispatch(fetchCashoutRequests(userId));
      dispatch(fetchCurrentCashoutRequest(userId));
    }
  }, [userId]);

  useEffect(() => {
    return () => {
      clearCurrentUserTransactionDetails();
    };
  }, []);

  const fetchMyTransactionLogs = () => {
    dispatch(fetchMoneyLogs(userId));
  };

  const fetchSavedBankDetails = () => {
    if (userId) {
      dispatch(fetchBankAccounts(userId));
    }
  };

  const clearCurrentUserTransactionDetails = () => {
    dispatch(clearCurrentCashoutRequest());
  };

  const markCashoutRequest = () => {
    const {
      requestId,
      requestedBy,
      requestMode,
      cashoutBal: cashoutBalance,
      requestedAmount: requestedAmt,
    } = currentCashoutRequest;
    dispatch(
      markCashoutRequestComplete({
        requestId,
        requestedAmt,
        cashoutBalance,
        requestedBy,
        requestMode,
        transferableAmt: parseInt(transferableFromInput),
      })
    );
  };

  const verifyAccount = () => {
    const {
      requestData: {
        accountNumber: beneficiaryAccount,
        ifscCode: beneficiaryIFSC,
      },
      requestId,
    } = currentCashoutRequest;
    dispatch(
      verifyBankDetails({
        beneficiaryAccount,
        beneficiaryIFSC,
        requestId,
        accountId: "1er18s8ai",
      })
    );
  };

  const addRequestToQueue = () => {
    const {
      requestId,
      transferableAmt,
      requestedBy: userId,
    } = currentCashoutRequest;

    dispatch(
      addRequestToAutoPayQueue({
        requestId,
        userId,
        transferableAmt,
      })
    );
  };

  return (
    <Box>
      {" "}
      <Box as="h1" fontSize="30px">
        {`${userName} (${userId})`}
      </Box>
      <Breadcrumb fontWeight="medium" fontSize="sm">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="#">
            <Text color="blue">Cashout Panel</Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/allRequests">
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
            onClick={fetchSavedBankDetails}
          >
            Saved Bank Accounts
          </Tab>
        </TabList>

        <TabPanels overflowY="scroll" h="80%" bgColor="blue">
          <TabPanel>
            {cashoutRequestsStatus === "loading" ? (
              <Center marginTop="10%">
                <CircularProgress
                  isIndeterminate
                  size="120px"
                  color="red.500"
                />
              </Center>
            ) : (
              <CashoutRequestTable tab={1} tableData={userCashoutRequests} />
            )}
          </TabPanel>
          <TabPanel>
            {moneyLogsStatus === "loading" ? (
              <Center marginTop="10%">
                <CircularProgress
                  isIndeterminate
                  size="120px"
                  color="red.500"
                />
              </Center>
            ) : (
              <CashoutRequestTable tab={2} tableData={myTransactionLogs} />
            )}
          </TabPanel>
          <TabPanel>
            {bankAccountsStatus === "loading" ? (
              <Center marginTop="10%">
                <CircularProgress
                  isIndeterminate
                  size="120px"
                  color="red.500"
                />
              </Center>
            ) : (
              <CashoutRequestTable
                openEditBankDetailsModal={openEditBankDetailsModal}
                tab={3}
                tableData={savedBankDetails}
              />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* user details  */}
      {currentCashoutStatus === "loading" && (
        <Center marginTop="5%">
          <CircularProgress isIndeterminate size="120px" color="red.500" />
        </Center>
      )}
      {currentCashoutStatus === "succeeded" && (
        <Flex height="23vh" w="100%">
          <Box
            height="100%"
            margin="0.5rem 0.5rem 0rem 0rem"
            width="50%"
            bgColor="white"
            color="#6C757D"
            p={2}
          >
            <Flex height="32px" justify="space-between" align="center">
              <Text>User Details :</Text>
            </Flex>
            <Grid
              h="100%"
              templateRows="repeat(5, 1fr)"
              templateColumns="repeat(6, 1fr)"
              gap={1}
              alignItems="center"
            >
              <GridItem gridRow="1/2" gridColumn="1/4">
                <Flex>
                  <Text>Request Id :</Text>
                  <Text color="#000000">{currentCashoutRequest.requestId}</Text>
                </Flex>
              </GridItem>

              <GridItem gridRow="1/2" gridColumn="4/7">
                <Flex>
                  <Text width="160px" noOfLines={1}>
                    Transferable Amt :
                  </Text>

                  <InputGroup width="50%">
                    <InputLeftAddon children={` \u20B9 `} />

                    {/* <Input
                      rounded="md"
                      border="2px solid #CCC7C7"
                      color="#177CE6"
                      padding="0.1rem"
                      type="number"
                      max={`${currentCashoutRequest.transferableAmt}`}
                      value={`${transferableFromInput}`}
                      onChange={(event) =>
                        setTransferableFromInput(event.target.value)
                      }
                    /> */}
                    <NumberInput
                      max={`${currentCashoutRequest.transferableAmt}`}
                      value={`${transferableFromInput}`}
                      inputMode="numeric"
                      max={`${currentCashoutRequest.transferableAmt}`}
                      min={`0`}
                      onChange={(value) => setTransferableFromInput(value)}
                    >
                      <NumberInputField />
                    </NumberInput>
                  </InputGroup>
                </Flex>
              </GridItem>

              <GridItem gridRow="2/3" gridColumn="1/4">
                <Flex>
                  <Text>Cashout Bal :</Text>
                  <Text color="#000000">{` \u20B9 ${currentCashoutRequest.cashoutBal}`}</Text>
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
                  <Text>Requested Date :</Text>

                  <Text color="#000000">
                    {currentCashoutRequest.requestDate}
                  </Text>
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
                    {` \u20B9 N/A`}
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
            <Flex align="center">
              <Text mr={4}>Bank Details :</Text>

              {currentCashoutRequest.bankVerificationStatus === "VERIFIED" && (
                <Box
                  as="span"
                  as="span"
                  border="1px #52D676 solid"
                  borderRadius="50px"
                  bg="#E5FDEC"
                  color="#52D676"
                  padding="0.1rem 0.5rem"
                >
                  {" "}
                  Verified
                </Box>
              )}
              {currentCashoutRequest.bankVerificationStatus ===
                "NOT_VERIFIED" && (
                <Box
                  as="span"
                  border="1px #F41717 solid"
                  borderRadius="50px"
                  bg="#FFEFEF"
                  color="#F41717"
                  padding="0.1rem 0.5rem"
                >
                  Not Verified
                </Box>
              )}

              {currentCashoutRequest.bankVerificationStatus === "PENDING" && (
                <Box
                  as="span"
                  border="1px #FCA847 solid"
                  borderRadius="50px"
                  bg="#F7AC551D"
                  color="#FCA847"
                  padding="0.1rem 0.5rem"
                >
                  Pending
                </Box>
              )}

              {currentCashoutRequest.bankVerificationStatus === "FAILED" && (
                <Box
                  as="span"
                  as="span"
                  border="2px red solid"
                  borderRadius="50px"
                  bg="red.100"
                  color="red.600"
                  padding="0.1rem 0.5rem"
                >
                  Failed
                </Box>
              )}
              <Button
                ml="auto"
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
            {currentCashoutRequest.requestData && (
              <Grid
                h="100%"
                templateRows="repeat(5, 1fr)"
                templateColumns="repeat(6, 1fr)"
                gap={1}
                alignItems="center"
              >
                <GridItem gridRow="1/2" gridColumn="1/-1">
                  <Flex>
                    <Text>Acc. Holder Name :</Text>
                    <Text color="#000000">
                      {currentCashoutRequest.requestData.accountHolderName}{" "}
                    </Text>
                  </Flex>
                </GridItem>

                <GridItem gridRow="2/3" gridColumn="1/-1">
                  <Flex>
                    <Text>Acc. Number :</Text>
                    <Text color="#000000">
                      {currentCashoutRequest.requestData.accountNumber}
                    </Text>
                  </Flex>
                </GridItem>

                <GridItem gridRow="3/4" gridColumn="1/-1">
                  <Flex>
                    <Text>Acc. Type :</Text>

                    <Text color="#000000">
                      {currentCashoutRequest.requestData.accountType}
                    </Text>
                  </Flex>
                </GridItem>

                <GridItem gridRow="4/5" gridColumn="1/5">
                  <Flex>
                    <Text noOfLines={1}>Bank :</Text>

                    <Text isTruncated color="#000000">
                      {currentCashoutRequest.requestData.bankName}
                    </Text>
                  </Flex>
                </GridItem>

                <GridItem gridRow="4/5" gridColumn="4/7">
                  <Flex>
                    <Text>IFSC CODE :</Text>

                    <Text color="#000000" casing="uppercase">
                      {currentCashoutRequest.requestData.ifscCode}
                    </Text>
                  </Flex>
                </GridItem>
                <GridItem gridRow="5/6" gridColumn="1/7">
                  <Flex justifyContent="space-evenly">
                    <Button
                      leftIcon={<FaMoneyBillWave />}
                      size="lg"
                      height="48px"
                      width="200px"
                      border="2px"
                      bg="#28A745"
                      color="white"
                      fontWeight="700"
                      _hover={{
                        transform: "scale(1.20)",
                      }}
                      onClick={markCashoutRequest}
                    >
                      Manual Pay
                    </Button>
                    <Button
                      leftIcon={<FaLandmark />}
                      size="lg"
                      bg="white"
                      color="blue.500"
                      height="48px"
                      width="200px"
                      border="2px"
                      isDisabled={
                        currentCashoutRequest.bankVerificationStatus ===
                        "NOT_VERIFIED"
                          ? false
                          : true
                      }
                      _hover={{
                        transform: "scale(1.20)",
                      }}
                      onClick={verifyAccount}
                      borderColor="blue.500"
                    >
                      Verify Account{" "}
                    </Button>
                    <Button
                      leftIcon={<FaRedo />}
                      size="lg"
                      bg="white"
                      color="gray.500"
                      height="48px"
                      width="200px"
                      border="2px"
                      _hover={{
                        transform: "scale(1.20)",
                      }}
                      borderColor="gray.500"
                      onClick={() => addRequestToQueue()}
                      isDisabled={
                        currentCashoutRequest.bankVerificationStatus ===
                        "VERIFIED"
                          ? false
                          : true
                      }
                    >
                      Auto Pay
                    </Button>
                  </Flex>
                </GridItem>
              </Grid>
            )}
          </Box>
        </Flex>
      )}
      {currentCashoutStatus === "failed" && (
        <Center marginTop="5%">
          <Text fontSize="lg">No Request Found </Text>
        </Center>
      )}
      {/* Edit modal code  */}
      {isOpen && (
        <EditBankDetailsModal
          bankDetails={bankToTransfer}
          updateBankDetails={setBankToTransfer}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
      )}
    </Box>
  );
};

export default userProfileDetails;
