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
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import BANK from "../../asset/bank.svg";
import PAYTM from "../../asset/paytm.png";
import UPI from "../../asset/upi.png";

// axios
import axios from "../../config/API";
//react-router
import { Link as RouterLink, useRouteMatch } from "react-router-dom";

//components
import { ReactTable } from "../../component/ReactTable";
import { useDispatch, useSelector } from "react-redux";

import { fetchAutoPayHistory } from "./autopaySlice";

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

const renderRequestStatus = ({ value }) => {
  switch (value) {
    case "COMPLETE":
      return (
        <Text
          py={1}
          borderRadius="5px"
          px={2}
          width="7rem"
          align="center"
          bg="#28A74526"
          color="#28A745"
          marginLeft="auto"
          marginRight="auto"
          textTransform="capitalize"
          fontSize="small"
        >
          {value}
        </Text>
      );

    case "PROCESSING":
      return (
        <Text
          py={1}
          px={2}
          borderRadius="5px"
          width="7rem"
          color="#F8832D"
          bg="#F8832D26"
          align="center"
          marginLeft="auto"
          marginRight="auto"
          textTransform="capitalize"
          fontSize="small"
        >
          {value}
        </Text>
      );

    case "FAILED":
      return (
        <Text
          py={1}
          px={2}
          borderRadius="5px"
          align="center"
          width="7rem"
          marginLeft="auto"
          marginRight="auto"
          bg="#F4171726"
          color="#F41717"
          textTransform="capitalize"
          fontSize="small"
        >
          {value}
        </Text>
      );

    default:
      return (
        <Text
          py={1}
          px={2}
          borderRadius="5px"
          border="1px green solid"
          width="7rem"
          align="center"
          marginLeft="auto"
          marginRight="auto"
          textTransform="capitalize"
          fontSize="small"
        >
          {value}
        </Text>
      );
  }
};

const AutopayHistory = () => {
  const [pageNumber, changePageNumber] = useState(0);

  const dispatch = useDispatch();

  const autoPayHistory = useSelector((state) => state.autoPay.autoPayHistory);
  const autoPayHistoryStatus = useSelector(
    (state) => state.autoPay.autoPayHistoryStatus
  );

  useEffect(() => {
    //dispatch all requests
    // if (autoPayHistory.length === 0) {
    dispatch(fetchAutoPayHistory(0));
    // }
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Request ID",
        accessor: "requestId",
        Cell: ({ value }) => {
          return (
            <Text color="#6B46C1" fontWeight="bold">
              {value}
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
              original: { requestedName, requestedBy },
            },
          },
        }) => (
          <Text
            color="#000000"
            align="center"
            fontWeight="bold"
          >{`${requestedName} (${requestedBy})`}</Text>
        ),
      },
      {
        Header: "Payment Mode",
        accessor: "requestMode",
        Cell: renderPaymentMode,
      },
      {
        Header: "Requested Amount",
        accessor: "requestedAmount",
        Cell: ({
          cell: {
            row: {
              original: { requestedAmount },
            },
          },
        }) => (
          <Text
            align="center"
            fontWeight="bold"
            color="#00000"
            casing="capitalize"
          >
            {` \u20B9${requestedAmount}`}
          </Text>
        ),
      },
      {
        Header: "Transferable Amount",
        accessor: "transferableAmount",
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
        Header: "Approved By",
        accessor: "approvedBy",
        Cell: ({ value }) => {
          return <Text fontWeight="bold"> {value} </Text>;
        },
      },
      {
        Header: "Approved On",
        accessor: "approvedOn",
        Cell: ({ value }) => {
          return <Text fontWeight="bold"> {value} </Text>;
        },
      },

      {
        Header: "Status",
        accessor: "requestStatus",
        Cell: renderRequestStatus,
      },
    ],
    []
  );

  const data = React.useMemo(() => autoPayHistory, []);

  return (
    <Box>
      {" "}
      <Box as="h1" fontSize="30px">
        Auto-Pay History
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
        {autoPayHistoryStatus === "loading" ? (
          <Box style={{ placeSelf: "center" }} as="span">
            <CircularProgress isIndeterminate size="120px" color="red.300" />
          </Box>
        ) : (
          <ReactTable columns={columns} data={autoPayHistory} />
        )}
      </Box>
    </Box>
  );
};

export default AutopayHistory;
