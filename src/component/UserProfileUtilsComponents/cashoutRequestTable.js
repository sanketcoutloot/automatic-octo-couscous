import React, { useEffect, useState } from "react";
import { allRequestFactory as AllRequestGenerator } from "../../Factory";
import BANK from "../../asset/bank.svg";
import PAYTM from "../../asset/paytm.png";
import UPI from "../../asset/upi.png";
import { Box, Button, Image, Text, useDisclosure } from "@chakra-ui/react";
import { ReactTable } from "../ReactTable";
import { FaPen } from "react-icons/fa";

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

const isEmptyObject = (value) => {
  return (
    value && Object.keys(value).length === 0 && value.constructor === Object
  );
};

const cashoutRequestTable = ({
  tableData,
  tab,
  openEditBankDetailsModal = null,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bankDetails, setBankdetails] = useState({});

  useEffect(() => {
    if (isEmptyObject(bankDetails) === false) {
      onOpen();
    }

    if (isOpen === true && isEmptyObject(bankDetails) === false) {
      openEditBankDetailsModal(isOpen, bankDetails.cell.row.original);
    }

    // console.log({ isOpen });
    // console.log("bank details ", bankDetails);
  }, [isOpen, bankDetails]);

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
        >{`${requestedBy}`}</Text>
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
        return <Text fontWeight="bold"> {value} </Text>;
      },
    },
  ];

  const tab_2_columns = [
    {
      Header: "Request ID",
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
      Header: "Type",
      accessor: "type",
      Cell: ({ value }) => (
        <Text
          color="#000000"
          align="center"
          fontWeight="bold"
          casing="capitalize"
        >{`${value}`}</Text>
      ),
    },

    {
      Header: "Transaction",
      accessor: "requestStatus",
      Cell: ({
        cell: {
          row: {
            original: {
              transactionData: { comments },
            },
          },
        },
      }) => <Text casing="capitalize">{comments}</Text>,
    },

    {
      Header: "Amount",
      accessor: "transactionAmount",
      Cell: ({
        cell: {
          row: {
            original: { transactionAmount, type },
          },
        },
      }) => {
        let color = type === "DEBIT" ? "#F05E4B" : "#28A745";
        let symbol = type === "DEBIT" ? "-" : "+";
        return (
          <Text
            align="center"
            fontWeight="bold"
            color={color}
            casing="capitalize"
          >
            {symbol}
            {` \u20B9${transactionAmount}`}
          </Text>
        );
      },
    },
    {
      Header: "Date",
      accessor: "transactionDate",
      Cell: ({ value }) => {
        let date = new Date(Number(value) * 1000)
          .toLocaleString()
          .replaceAll("/", "-")
          .replaceAll(",", " ");
        return <Text fontWeight="bold"> {date} </Text>;
      },
    },
  ];

  const tab_3_columns = [
    {
      Header: "Bank Name",
      accessor: "bankName",
      Cell: (props) => {
        return (
          <Text color="#6B46C1" fontWeight="bold">
            {props.value}
          </Text>
        );
      },
    },

    {
      Header: "Acc Number",
      accessor: "accountNumber",
      Cell: ({ value }) => (
        <Text
          color="#000000"
          align="center"
          fontWeight="bold"
        >{`${value}`}</Text>
      ),
    },

    {
      Header: "Account Type",
      accessor: "accountType",
      Cell: ({ value }) => (
        <Text color="#000000" align="center" fontWeight="bold">
          {value}
        </Text>
      ),
    },

    {
      Header: "IFSC Code",
      accessor: "ifscCode",
      Cell: ({ value }) => {
        return (
          <Text align="center" fontWeight="bold" color="#000000">
            {value}
          </Text>
        );
      },
    },
    {
      Header: "action",
      accessor: "",
      Cell: (props) => {
        return (
          <Button
            onClick={() => setBankdetails(props)}
            leftIcon={<FaPen />}
            colorScheme="blue"
            variant="outline"
            borderRadius="2rem"
            size="sm"
          >
            Edit
          </Button>
        );
      },
    },
  ];

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
