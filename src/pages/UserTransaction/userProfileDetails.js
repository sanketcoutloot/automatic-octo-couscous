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
} from "@chakra-ui/react";

import BANK from "../../asset/bank.svg";
import { Link } from "react-router-dom";
import {
  CashoutRequestTable,
  EditBankDetailsModal,
} from "../../component/UserProfileUtilsComponents";
import { FaPen } from "react-icons/fa";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoneyLogs,
  fetchCashoutRequests,
  fetchBankAccounts,
} from "./userTransactionSlice";
const userProfileDetails = () => {
  const { state } = useLocation();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const [bankToTransfer, setBankToTransfer] = useState([]);
  const [isError, setIsError] = useState(false);

  // modal control
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const userCashoutRequests = useSelector(
    (state) => state.userTransactions.cashoutRequests
  );

  const myTransactionLogs = useSelector(
    (state) => state.userTransactions.moneyLogs
  );

  const savedBankDetails = useSelector(
    (state) => state.userTransactions.bankAccounts
  );

  // useEffect(() => {
  //   if (userCashoutRequests.length === 0) {
  //     setBankToTransfer(userCashoutRequests[0].requestData);
  //   }
  // }, [userCashoutRequests]);

  const openEditBankDetailsModal = (isOpenValue, bankDetails) => {
    setBankToTransfer(bankDetails);
    if (isOpenValue === true) {
      onOpen();
    }
  };

  useEffect(() => {
    setUserId(state.userId);
    setUserName(() => state.requestedName);
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCashoutRequests(userId));
    }
  }, [userId]);

  const fetchMyTransactionLogs = () => {
    dispatch(fetchMoneyLogs(userId));
  };

  const fetchSavedBankDetails = () => {
    if (userId) {
      dispatch(fetchBankAccounts(userId));
    }
    // try {
    //   if (savedBankDetails.length > 0) {
    //     return;
    //   }
    //   let { data } = await API.post(`cahsout/getUserBankDetails`, {
    //     userId,
    //   });
    //   let { success, data: responseData } = data;
    //   if (success === 1) {
    //     if (!Array.isArray(responseData)) {
    //       responseData = [responseData];
    //     }
    //     setSavedBankDetails(responseData);
    //   } else {
    //     setIsError(true);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   setIsError(true);
    // }
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
            {savedBankDetails.length > 0 ? (
              <CashoutRequestTable
                openEditBankDetailsModal={openEditBankDetailsModal}
                tab={3}
                tableData={savedBankDetails}
              />
            ) : (
              <h1>LOADING</h1>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* user details  */}
      {userCashoutRequests.length > 0 && (
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
                  <Text color="#000000">
                    {userCashoutRequests[0].requestId}
                  </Text>
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
                    {` \u20B9  ${userCashoutRequests[0].requestedAmount}`}
                  </Text>
                </Flex>
              </GridItem>

              <GridItem gridRow="2/3" gridColumn="1/4">
                <Flex>
                  <Text>Cashout Bal :</Text>
                  <Text color="#000000">{` \u20B9 N/A`}</Text>
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
                    {userCashoutRequests[0].requestDate}
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
            {userCashoutRequests[0].requestData && (
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
                    <Text color="#000000">
                      {userCashoutRequests[0].requestData.accountHolderName}{" "}
                    </Text>
                  </Flex>
                </GridItem>

                <GridItem gridRow="2/3" gridColumn="1/-1">
                  <Flex>
                    <Text>Acc. Number :</Text>
                    <Text color="#000000">
                      {userCashoutRequests[0].requestData.accountNumber}
                    </Text>
                  </Flex>
                </GridItem>

                <GridItem gridRow="3/4" gridColumn="1/-1">
                  <Flex>
                    <Text>Acc. Type :</Text>

                    <Text color="#000000">
                      {userCashoutRequests[0].requestData.accountType}
                    </Text>
                  </Flex>
                </GridItem>

                <GridItem gridRow="4/5" gridColumn="1/5">
                  <Flex>
                    <Text noOfLines={1}>Bank :</Text>

                    <Text isTruncated color="#000000">
                      {userCashoutRequests[0].requestData.bankName}
                    </Text>
                  </Flex>
                </GridItem>

                <GridItem gridRow="4/5" gridColumn="4/7">
                  <Flex>
                    <Text>IFSC CODE :</Text>

                    <Text color="#000000" casing="uppercase">
                      {userCashoutRequests[0].requestData.ifscCode}
                    </Text>
                  </Flex>
                </GridItem>
              </Grid>
            )}
          </Box>
        </Flex>
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
