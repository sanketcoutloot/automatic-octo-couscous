import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Image,
  Button,
  Link,
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Divider,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Lorem,
  Heading,
  HStack,
  PinInputField,
  PinInput,
  BeatLoader,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import BANK from "../../asset/bank.svg";
import PAYTM from "../../asset/paytm.png";
import UPI from "../../asset/upi.png";

//react-router
import { Link as RouterLink, useRouteMatch } from "react-router-dom";

//components
import { ReactTable } from "../../component/ReactTable";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAllQueuedRequests,
  sendOtpToSignedInUser,
  verifyOTP,
  transferMoney,
} from "./autopaySlice";

import { isEmptyObject } from "../../utils";

const renderPaymentMode = (props) => {
  let paymentModeValue = parseInt(props.value.trim());

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

const AutopayQueue = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  // State
  const [pageNumber, changePageNumber] = useState(0);
  const [isError, setIsError] = useState(false);
  const [autoPayRequestDetails, setAutoPayRequestDetails] = useState({});
  const [seconds, setSeconds] = React.useState(30);
  const [value, setValue] = React.useState(null);

  //Even Handlers + helper functions
  const handleChange = (event) => setValue(event.target.value);

  // redux selectors

  //@DESC get queued cashout request
  const allQueuedRequests = useSelector(
    (state) => state.autoPay.allQueuedRequests
  );

  //@DESC status of allQueuedRequests
  const allQueuedRequestsStatus = useSelector(
    (state) => state.autoPay.allQueuedRequestsStatus
  );

  //@desc status of verifyOtp
  const verifyOTPStatus = useSelector((state) => state.autoPay.verifyOTPStatus);

  //SIDE - EFFECTS
  //@desc fetch all queued requests
  useEffect(() => {
    //dispatch all requests
    if (allQueuedRequests.length === 0) {
      dispatch(fetchAllQueuedRequests(0));
    }
  }, [allQueuedRequests]);

  //@desc send otp to signed in user
  useEffect(() => {
    if (!isEmptyObject(autoPayRequestDetails) && isOpen === true) {
      dispatch(sendOtpToSignedInUser());
    }
  }, [autoPayRequestDetails, isOpen]);

  //@desc validate OTP
  const validateOTPAndSendBankData = () => {
    dispatch(verifyOTP(value));
  };

  // @desc if verify otp is success
  useEffect(() => {
    if (verifyOTPStatus === "succeeded") {
      const {
        requestId,
        requestMode,
        requestData,
        autoPay: { transferableAmount: amount },
      } = autoPayRequestDetails;

      dispatch(transferMoney({ requestId, requestMode, requestData, amount }));
    }
  }, [verifyOTPStatus]);

  //REACT-DEBATABLE
  //@desc react-table column
  const columns = React.useMemo(
    () => [
      {
        Header: "Request ID",
        accessor: "requestId",
        Cell: (props) => {
          return (
            <Text color="#6B46C1" fontWeight="bold">
              {props.value}
            </Text>
          );
        },
      },
      {
        Header: "Requested By",
        accessor: (d) => `${d.requestedBy} ${d.requestedName}`,
        Cell: ({
          cell: {
            row: {
              original: { requestedBy, requestedName },
            },
          },
        }) => (
          <Text
            color="#000000"
            align="center"
            fontWeight="bold"
          >{`${requestedName}(${requestedBy})`}</Text>
        ),
      },
      {
        Header: "Payment Mode",
        accessor: "requestMode",
        Cell: renderPaymentMode,
      },
      {
        Header: "Amount",
        accessor: "requestedAmount",
        Cell: ({
          cell: {
            row: {
              original: { transferableAmount },
            },
          },
        }) => (
          <Text
            align="center"
            fontWeight="bold"
            color="#00000"
            casing="capitalize"
          >
            {` \u20B9${transferableAmount}`}
          </Text>
        ),
      },
      {
        Header: "Date",
        accessor: "requestDate",
        Cell: ({ value }) => {
          return <Text fontWeight="bold"> {value} </Text>;
        },
      },
      {
        Header: "Action",
        accessor: "",
        Cell: ({
          cell: {
            row: { original },
          },
        }) => {
          return (
            <Box
              size="sm"
              as={RouterLink}
              style={{
                backgroundColor: "#28A745",
                padding: "0.5rem",
                color: "white",
                borderRadius: "5px",
              }}
              onClick={() => setAutoPayRequestDetails(original)}
            >
              Process
            </Box>
          );
        },
      },
    ],
    []
  );

  //@desc data for datatable
  const data = React.useMemo(() => allQueuedRequests, []);

  return (
    <Box>
      {" "}
      <Box as="h1" fontSize="30px">
        Autopay Pending Requests
        <Button onClick={onOpen}>Open Modal</Button>
      </Box>
      <Breadcrumb fontWeight="medium" fontSize="sm">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            <Text color="blue">Cashout Panel</Text>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>
            {" "}
            <Text> AutoPay Queue</Text>{" "}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box h="85vh" display="grid" overflow="scroll">
        {allQueuedRequestsStatus === "loading" ? (
          <Box style={{ placeSelf: "center" }} as="span">
            <CircularProgress isIndeterminate size="120px" color="red.300" />
          </Box>
        ) : (
          <ReactTable columns={columns} data={allQueuedRequests} />
        )}
      </Box>
      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size="5xl"
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent padding={5}>
          <ModalHeader>Verify OTP</ModalHeader>
          <ModalCloseButton />
          <Divider color="teal" size="md" />
          <ModalBody p={4}>
            <Box textAlign="center">
              <Text mt={4} fontSize="3xl" fontWeight="700">
                Please Enter the one-Time Password (OTP) to verify your account.
              </Text>

              <Text mt={4} fontSize="xl" color="#726D6D">
                Please Enter the one-Time Password (OTP) to verify your account.
              </Text>

              <PinInput
                manageFocus
                colorScheme="teal"
                type="number"
                otp
                size="lg"
                onChange={(value) => setValue(value)}
              >
                <PinInputField m={2} size="lg" />
                <PinInputField m={2} size="lg" />
                <PinInputField m={2} size="lg" />
                <PinInputField m={2} size="lg" />
                <PinInputField m={2} size="lg" />
              </PinInput>

              <Text mt={4} fontSize="xl" fontWeight="700" color="blue.500">
                Check your registered phone number For OTP
              </Text>

              <Text mt={4} fontSize="xl" fontWeight="700" color="#DD611F">
                OTP doesn’t match .... Please try again.
              </Text>

              <Text mt={4} fontSize="xl" fontWeight="700" color="blue.500">
                OTP Verified
              </Text>

              <Text mt={4} fontSize="xl" fontWeight="700" color="green.500">
                Send Bank Details for Transfer
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              onClick={() => {
                validateOTPAndSendBankData();
              }}
              colorScheme="blue"
              size="lg"
              w="16rem"
            >
              Validate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AutopayQueue;
