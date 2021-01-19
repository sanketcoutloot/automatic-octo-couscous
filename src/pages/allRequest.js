import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Image,
  Button,
  Link,
} from "@chakra-ui/react";

import React, { useEffect, useRef, useState } from "react";
import BANK from "../asset/bank.svg";
import PAYTM from "../asset/paytm.png";
import UPI from "../asset/upi.png";

// axios
import axios from "../config/API";
//react-router
import {
  Link as RouterLink,
  useRouteMatch,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

//components
import { ReactTable } from "../component/ReactTable";

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

const AllRequests = () => {
  const [allRequests, SetAllRequests] = useState([]);
  const [pageNumber, changePageNumber] = useState(0);
  const [isError, setIsError] = useState(false);

  let { path, url } = useRouteMatch();

  console.log({ url });

  async function fetchAllRequests() {
    try {
      console.log("INSIDE fetch function");
      let { data } = await axios.get(
        `cahsout/getCashoutRequests/${pageNumber}`
      );
      let { success, data: responseData } = data;
      if (success === 1) {
        SetAllRequests(responseData);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  }

  useEffect(() => {
    console.log("calling the API ");
    fetchAllRequests();
    console.log("api called ");
  }, []);

  const columns = [
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
    {
      Header: "Action",
      accessor: "",
      Cell: ({
        cell: {
          row: {
            original: { requestedName, requestedBy: userId },
          },
        },
      }) => {
        return (
          <Link
            size="sm"
            as={RouterLink}
            style={{
              backgroundColor: "red",
              padding: "0.5rem",
              color: "white",
              borderRadius: "5px",
            }}
            to={{
              pathname: `${url}/${userId}`,
              state: { userId, requestedName },
            }}
          >
            Process
          </Link>
        );
      },
    },
  ];

  return (
    <Box>
      {" "}
      <Box as="h1" fontSize="30px">
        All Requests
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
            <Text>Cashout Requests </Text>{" "}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {allRequests.length === 0 ? (
        <h1 m="auto">Loading </h1>
      ) : (
        <ReactTable columns={columns} data={allRequests} />
      )}
    </Box>
  );
};

export default AllRequests;
