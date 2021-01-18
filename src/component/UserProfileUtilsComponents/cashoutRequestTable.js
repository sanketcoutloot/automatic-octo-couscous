import React, { useEffect, useState } from "react";
import { allRequestFactory as AllRequestGenerator } from "../../Factory";
import BANK from "../../asset/bank.svg";
import PAYTM from "../../asset/paytm.png";
import UPI from "../../asset/upi.png";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { ReactTable } from "../ReactTable";

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

const cashoutRequestTable = ({ tableData, tab }) => {
  console.log("this is my data table ", tableData);
  console.log("this is my tab ", tab);

  //columon value if the tab === 1

  // requestId:62301
  // requestMode:"0"
  // requestedBy:800100
  // requestedAmount:35
  // accountId:"123abc"
  // requestStatus:"ACTIVE"
  // requestDate:1609942401

  const tab_1_columns = [
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
      accessor: "requestedBy",
      Cell: ({
        cell: {
          row: {
            original: { requestedBy, userId },
          },
        },
      }) => (
        // <Text
        //   color="#000000"
        //   align="center"
        //   fontWeight="bold"
        // >{`${requestedBy} (${userId})`}</Text>
        <Text
          color="#000000"
          align="center"
          fontWeight="bold"
        >{`(${requestedBy})`}</Text>
      ),
    },

    {
      Header: "Payment Mode",
      accessor: "requestMode",
      Cell: renderPaymentMode,
    },
    {
      Header: "Status",
      accessor: "requestStatus",
      Cell: ({ value }) => (
        <Button
          colorScheme={value.toLowerCase() === "active" ? "green" : "orange"}
          variant="outline"
          _hover={{ cursor: "initial" }}
          size="sm"
          width="5rem"
        >
          <Text casing="capitalize">{value}</Text>
        </Button>
      ),
    },
    {
      Header: "Amount",
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
      Header: "Date",
      accessor: "requestDate",
      Cell: ({ value }) => {
        let date = new Date(Number(value) * 1000)
          .toLocaleString()
          .replaceAll("/", "-")
          .replaceAll(",", " ");
        return <Text fontWeight="bold"> {date} </Text>;
      },
    },
  ];

  const tab_2_columns = [];

  const tab_3_columns = [];

  //use props.tab value to choose between doffrent tab value
  let columns = null;

  switch (tab) {
    case 1:
      columns = tab_1_columns;
      break;
    case 2:
      columns = tab_2_columns;
      break;
    case 3:
      columns = tab_3_columns;
      break;
    default:
      columns = tab_1_columns;
      break;
  }

  return <ReactTable columns={columns} data={tableData} />;
};

export default cashoutRequestTable;
