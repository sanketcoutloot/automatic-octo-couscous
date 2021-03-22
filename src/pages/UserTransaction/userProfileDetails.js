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
import PAYTM from "../../asset/paytm.png";
import UPI from "../../asset/upi.png";
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
  setUserTransactionToInitialSlice,
  verifyBankDetails,
  addBankDetailToEdit,
} from "./userTransactionSlice";

import {
  addRequestToAutoPayQueue,
  setAutoPayStatusToIdle,
} from "../AutoPay/autopaySlice";
import { isEmptyObject } from "../../utils";

const renderPaymentMode = (requestMode) => {
  let paymentModeValue = parseInt(requestMode.trim());
  switch (paymentModeValue) {
    case 1:
      return (
        <Box>
          <Image
            mx="auto"
            boxSize="50px"
            objectFit="contain"
            src={PAYTM}
            alt="PAYTM"
          />
        </Box>
      );

    case 2:
      return (
        <Box>
          <Image
            boxSize="50px"
            mx="auto"
            objectFit="contain"
            src={UPI}
            alt="UPI"
          />
        </Box>
      );

    case 0:
      return (
        <Box>
          <Image
            mx="auto"
            boxSize="60px"
            objectFit="contain"
            src={BANK}
            alt="BANK"
          />
        </Box>
      );

    default:
      return (
        <Text
          align="left"
          fontWeight="bold"
          color="#89664C"
          casing="capitalize"
        >
          {paymentModeValue}
        </Text>
      );
  }
};

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

  const addRequestToAutoPayQueueStatus = useSelector(
    (state) => state.autoPay.addRequestToAutoPayQueueStatus
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

  const currentCashoutBankDetails = useSelector(
    (state) => state.userTransactions.currentCashoutBankDetails
  );

  const bankDetailsToEdit = useSelector(
    (state) => state.userTransactions.bankDetailToEdit
  );

  const markCashoutRequestCompleteStatus = useSelector(
    (state) => state.userTransactions.markCashoutRequestCompleteStatus
  );

  const markCashoutRequestCompleteError = useSelector(
    (state) => state.userTransactions.markCashoutRequestCompleteError
  );

  //show error
  useEffect(() => {
    return () => {
      dispatch(setUserTransactionToInitialSlice());
      dispatch(setAutoPayStatusToIdle());
    };
  }, []);

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
  }, [moneyLogsStatus]);

  useEffect(() => {
    if (isEmptyObject(bankDetailsToEdit) === false) {
      onOpen();
    }
  }, [bankDetailsToEdit]);
  console.log({ bankDetailsToEdit });

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
  }, [bankAccountsStatus]);

  useEffect(() => {
    setTransferableFromInput(currentCashoutRequest.transferableAmt);
  }, [currentCashoutRequest]);

  useEffect(() => {
    if (userCashoutRequests.length > 0) {
      setBankToTransfer(userCashoutRequests[0].requestData);
    }
  }, [userCashoutRequests]);

  useEffect(() => {
    if (markCashoutRequestCompleteStatus === "failed") {
      toast({
        title: "Error: unable to process the request",
        description: markCashoutRequestCompleteError,
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    } else if (markCashoutRequestCompleteStatus === "succeeded") {
      toast({
        title: "Request completed.",
        description: markCashoutRequestCompleteError,
        status: "success",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [markCashoutRequestCompleteStatus]);

  useEffect(() => {
    if (addRequestToAutoPayQueueStatus === "failed") {
      toast({
        title: "Error: unable to process the request",
        description: markCashoutRequestCompleteError,
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    } else if (addRequestToAutoPayQueueStatus === "succeeded") {
      toast({
        title: "Request Added to AutoPay Queue.",
        description: markCashoutRequestCompleteError,
        status: "success",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [addRequestToAutoPayQueueStatus]);

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
      console.log("Clean Up Details ");
      // cleanUpAction();
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
        transactionType: "MANUAL",
      })
    );
  };

  const addRequestToQueue = () => {
    const {
      requestId,
      transferableAmt,
      requestMode,
      requestedBy: userId,
    } = currentCashoutRequest;

    dispatch(
      addRequestToAutoPayQueue({
        requestId,
        userId,
        transferableAmt,
        requestMode,
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
      {currentCashoutStatus === "succeeded" &&
        addRequestToAutoPayQueueStatus === "idle" && (
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
                    <Text color="#000000">
                      {currentCashoutRequest.requestId}
                    </Text>
                  </Flex>
                </GridItem>

                <GridItem gridRow="1/2" gridColumn="4/7">
                  <Flex>
                    <Text width="160px" noOfLines={1}>
                      Transferable Amt :
                    </Text>

                    <InputGroup width="50%">
                      <InputLeftAddon children={` \u20B9 `} />

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
                    <Text>Requested Amt :</Text>
                    <Text color="#000000">{` \u20B9 ${currentCashoutRequest.requestedAmount}`}</Text>
                  </Flex>
                </GridItem>

                <GridItem gridRow="3/4" gridColumn="1/4">
                  <Flex>
                    <Text>Requested Date :</Text>

                    <Text color="#000000">
                      {currentCashoutRequest.requestDate}
                    </Text>
                  </Flex>
                </GridItem>
                <GridItem gridRow="3/4" gridColumn="4/7">
                  <Flex alignItems="center">
                    <Text>Requested Mode :</Text>
                    {renderPaymentMode(currentCashoutRequest.requestMode)}
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

                <Button
                  ml="auto"
                  onClick={() => {
                    dispatch(
                      addBankDetailToEdit({
                        editCurrentRequestBankDetails: true,
                      })
                    );
                  }}
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
                        {currentCashoutBankDetails.accountHolderName}{" "}
                      </Text>
                    </Flex>
                  </GridItem>

                  <GridItem gridRow="2/3" gridColumn="1/-1">
                    <Flex>
                      <Text>Acc. Number :</Text>
                      <Text color="#000000">
                        {currentCashoutBankDetails.accountNumber}
                      </Text>
                    </Flex>
                  </GridItem>

                  <GridItem gridRow="3/4" gridColumn="1/-1">
                    <Flex>
                      <Text>Acc. Type :</Text>

                      <Text color="#000000">
                        {currentCashoutBankDetails.accountType}
                      </Text>
                    </Flex>
                  </GridItem>

                  <GridItem gridRow="4/5" gridColumn="1/5">
                    <Flex>
                      <Text noOfLines={1}>Bank :</Text>

                      <Text isTruncated color="#000000">
                        {currentCashoutBankDetails.bankName}
                      </Text>
                    </Flex>
                  </GridItem>

                  <GridItem gridRow="4/5" gridColumn="4/7">
                    <Flex>
                      <Text>IFSC CODE :</Text>

                      <Text color="#000000" casing="uppercase">
                        {currentCashoutBankDetails.ifscCode}
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
                        isDisabled={
                          markCashoutRequestCompleteStatus === "succeeded"
                            ? true
                            : false
                        }
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
                        isDisabled={
                          markCashoutRequestCompleteStatus === "succeeded"
                            ? true
                            : false
                        }
                        borderColor="gray.500"
                        onClick={() => addRequestToQueue()}
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
