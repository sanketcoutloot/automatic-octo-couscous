import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Text,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

//react-router
import { Link } from "react-router-dom";

//factory function
import { MoneyLogFactory as MoneyLogsGenerator } from "../Factory";

//redux
// import { fetchUsers, allUsers } from "./userSlice";
// import { useDispatch, useSelector } from "react-redux";

//components
import { ReactTable } from "../component/ReactTable";

const renderWalletType = (props) => {
  let lowerCaseValue = props.value.toLowerCase().trim();

  switch (lowerCaseValue) {
    case "cashout":
      return (
        <Text
          align="left"
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
          align="left"
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
          align="left"
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
          align="left"
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
      original: { walletType, amount },
    },
  },
}) => {
  switch (walletType.toLowerCase().trim()) {
    case "cashout":
      return (
        <Text
          align="left"
          fontWeight="bold"
          color="#1FB241"
          casing="capitalize"
        >
          {`+ \u20B9${amount}`}
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
          {`+ \u20B9${amount}`}
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
          {`+ \u20B9${amount}`}
        </Text>
      );

    default:
      return (
        <Text align="left" color="#89664C" casing="capitalize">
          {amount}
        </Text>
      );
  }
};

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
    Header: "User Name",
    accessor: "userName",
    Cell: ({
      cell: {
        row: {
          original: { userName, userId },
        },
      },
    }) => (
      <Text
        color="#000000"
        align="left"
        fontWeight="bold"
      >{`${userName} (${userId})`}</Text>
    ),
  },
  {
    Header: "Date",
    accessor: "date",
    Cell: ({ value }) => {
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
    accessor: "amount",
    Cell: renderAmount,
  },
];

const UserList = () => {
  // const dispatch = useDispatch();
  // const users = useSelector(allUsers);
  const [moneyLogs, SetMoneyLogs] = useState([]);

  console.log(moneyLogs);

  useEffect(() => {
    console.log("rendering");
    //redux to fetch user
    // dispatch(fetchUsers());
    getMoneyLogs();
  }, []);

  function getMoneyLogs() {
    let logs = MoneyLogsGenerator(100);
    SetMoneyLogs(logs);
  }

  return (
    <Box>
      {" "}
      <Heading as="H1" size="lg">
        Money Logs
      </Heading>
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
      <ReactTable columns={columns} data={moneyLogs} />
    </Box>
  );
};

export default UserList;
