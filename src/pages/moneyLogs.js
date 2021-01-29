import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Text,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
//react-router
import { Link } from "react-router-dom";

//redux
// import { fetchUsers, allUsers } from "./userSlice";
// import { useDispatch, useSelector } from "react-redux";

//components
import { ReactTable } from "../component/ReactTable";

import { MoneyLogDetailsModals } from "../component/ReactTable/moneylog";

import API from "../config/API";
import { isEmptyObject } from "../utils";
import { icons } from "react-icons/lib";

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
          align="left"
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
          align="left"
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
          align="left"
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
  const [moneyLogs, SetMoneyLogs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [shouldFetchMoneyLog, setShouldFetchMoneyLog] = useState(false);
  const [moneyLogDetails, setMoneyLogDetails] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // todo : comment the below line
    getMoneyLogs();
    if (shouldFetchMoneyLog) {
      getMoneyLogs();
    }
  }, [shouldFetchMoneyLog]);

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
      Header: "User",
      accessor: "userId",
      Cell: ({
        cell: {
          row: {
            original: { userName, userId },
          },
        },
      }) => (
        // <Text
        //   color="#000000"
        //   align="left"
        //   fontWeight="bold"
        // >{`${userName} (${userId})`}</Text>
        <Text
          color="#000000"
          align="center"
          fontWeight="bold"
        >{`${userId}`}</Text>
      ),
    },
    {
      Header: "Date",
      accessor: "transactionDate",
      Cell: ({ value }) => {
        console.log({ value });
        let date = new Date(Number(value) * 1000)
          .toLocaleString()
          .replaceAll("/", "-")
          .replaceAll(",", " ");
        return <Text fontWeight="bold"> {date} </Text>;
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

  async function getMoneyLogs() {
    try {
      let { data } = await API.post(`moneyLog/getMoneyLogs`, {
        searchText: "2237417",
        searchType: "USERID",
        pageNo: 0,
      });
      let { success, data: responseData } = data;
      if (success === 1) {
        if (!Array.isArray(responseData)) {
          responseData = new Array(responseData);
        }
        SetMoneyLogs(responseData);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  }

  return (
    <Box>
      {console.log("isOpen", isOpen)}
      {console.log("logDetails", moneyLogDetails)}

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
      <ReactTable
        setSearchText={setSearchText}
        setShouldFetchMoneyLog={setShouldFetchMoneyLog}
        columns={columns}
        data={moneyLogs}
      />
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
