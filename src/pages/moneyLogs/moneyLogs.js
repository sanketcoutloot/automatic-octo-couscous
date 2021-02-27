import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Text,
  Icon,
  useDisclosure,
  CircularProgress,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
//react-router
import { Link } from "react-router-dom";

//components
import { ReactTable } from "../../component/ReactTable";

import { MoneyLogDetailsModals } from "../../component/ReactTable/moneylog";

import API from "../../config/API";
import { isEmptyObject } from "../../utils";
import { icons } from "react-icons/lib";

import { useDispatch, useSelector } from "react-redux";
import { moneyLogs as fetchMoneyLogs } from "./MoneyLogsSlice";
//utility functions
const renderWalletType = (props) => {
  let lowerCaseValue = props.value.toLowerCase().trim();

  switch (lowerCaseValue) {
    case "cashout":
      return (
        <Text
          align="center"
          fontWeight="bold"
          color="#89664C"
          casing="capitalize"
        >
          {lowerCaseValue}
        </Text>
      );

    case "credit":
      return (
        <Text
          align="center"
          fontWeight="bold"
          color="#F0AA28"
          casing="capitalize"
        >
          {lowerCaseValue}
        </Text>
      );

    case "referral":
      return (
        <Text
          align="center"
          fontWeight="bold"
          color="#4AAAF0"
          casing="capitalize"
        >
          {lowerCaseValue}
        </Text>
      );

    default:
      return (
        <Text
          align="center"
          fontWeight="bold"
          color="#89664C"
          casing="capitalize"
        >
          {lowerCaseValue}
        </Text>
      );
  }
};

const renderAmount = ({
  cell: {
    row: {
      original: { type, transactionAmount },
    },
  },
}) => {
  switch (type.toLowerCase().trim()) {
    case "cashout":
      return (
        <Text
          align="center"
          fontWeight="bold"
          color="#1FB241"
          casing="capitalize"
        >
          {`+ \u20B9${transactionAmount}`}
        </Text>
      );

    case "credit":
      return (
        <Text
          align="center"
          fontWeight="bold"
          color="#F4552F"
          casing="capitalize"
        >
          {`- \u20B9${transactionAmount}`}
        </Text>
      );

    case "referral":
      return (
        <Text
          align="center"
          fontWeight="bold"
          color="#1FB241"
          casing="capitalize"
        >
          {`+ \u20B9${transactionAmount}`}
        </Text>
      );

    default:
      return (
        <Text align="center" color="#89664C" casing="capitalize">
          {`- \u20B9${transactionAmount}`}
        </Text>
      );
  }
};

const MoneyLogs = () => {
  const [isError, setIsError] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  const [shouldFetchMoneyLog, setShouldFetchMoneyLog] = useState(false);
  const [moneyLogDetails, setMoneyLogDetails] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const moneyLogs = useSelector((state) => state.moneyLogs.moneyLogs);
  const moneyLogsStatus = useSelector(
    (state) => state.moneyLogs.moneyLogsStatus
  );
  useEffect(() => {
    dispatch(
      fetchMoneyLogs({
        searchText: 213660,
        searchType: "USERID",
        pageNo: pageNumber,
      })
    );
  }, []);

  useEffect(() => {
    if (isEmptyObject(moneyLogDetails) === false) {
      onOpen();
    }
  }, [moneyLogDetails]);

  useEffect(() => {
    if (isOpen === false) {
      setMoneyLogDetails({});
    }
  }, [isOpen]);

  const columns = [
    {
      Header: "Transaction Id",
      accessor: "transactionId",
      Cell: (props) => {
        return (
          <Text color="#6B46C1" fontWeight="bold">
            {props.value}
          </Text>
        );
      },
    },

    {
      Header: "Date",
      accessor: "transactionDate",
      Cell: ({ value }) => {
        return <Text fontWeight="bold"> {value} </Text>;
      },
    },
    {
      Header: "Wallet Type",
      accessor: "walletType",
      Cell: renderWalletType,
    },
    {
      Header: "Amount",
      accessor: "transactionAmount",
      Cell: renderAmount,
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
          <Box display="flex" justifyContent="center" justifyItems="center">
            <Box
              border="2px #D1D1D1 solid"
              borderRadius="50%"
              width="25px"
              height="25px"
              onClick={() => setMoneyLogDetails(original)}
            >
              <Icon color="#D1D1D1" as={FaGreaterThan} />
            </Box>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Box as="h1" fontSize="30px">
        Money Logs
      </Box>
      <Breadcrumb fontWeight="medium" fontSize="sm">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            <Text color="blue">Home</Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/addUser">
            <Text>About</Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>
            {" "}
            <Text>Contact </Text>{" "}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {moneyLogsStatus === "loading" ? (
        <Box style={{ placeSelf: "center" }} as="span">
          <CircularProgress isIndeterminate size="120px" color="red.300" />
        </Box>
      ) : (
        <ReactTable
          setSearchText={setSearchText}
          setShouldFetchMoneyLog={setShouldFetchMoneyLog}
          columns={columns}
          data={moneyLogs}
        />
      )}
      {isOpen && (
        <MoneyLogDetailsModals
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          setMoneyLogDetails={setMoneyLogDetails}
          moneyLogDetails={moneyLogDetails}
        />
      )}
    </Box>
  );
};

export default MoneyLogs;
