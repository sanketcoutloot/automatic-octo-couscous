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
import { allRequestFactory as AllRequestGenerator } from "../Factory";

//components
import { ReactTable } from "../component/ReactTable";

const renderPaymentMode = (props) => {
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
    Header: "ID",
    accessor: "id",
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
    accessor: "requestedBy",
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
    Header: "Payment Mode",
    accessor: "paymentMode",
    Cell: renderPaymentMode,
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => <Text>{value}</Text>,
  },
  {
    Header: "Amount",
    accessor: "amount",
    Cell: renderAmount,
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
  //   render action button
];

const UserList = () => {
  const [allRequests, SetAllRequest] = useState([]);

  useEffect(() => {
    console.log("rendering all request ");
    getMoneyLogs();
  }, []);

  function getMoneyLogs() {
    let requests = AllRequestGenerator(100);
    SetAllRequest(requests);
  }

  return (
    <Box>
      {" "}
      <Heading as="H1" size="lg">
        All Requests
      </Heading>
      <Breadcrumb fontWeight="medium" fontSize="sm">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            <Text color="blue">Cashout Panel</Text>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>
            {" "}
            <Text>Cashout Requests </Text>{" "}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <ReactTable columns={columns} data={allRequests} />
    </Box>
  );
};

export default UserList;
