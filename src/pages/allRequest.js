import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Text,
    Image,
    Button,
    Link,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import BANK from '../asset/bank.svg';
import PAYTM from '../asset/paytm.png';
import UPI from '../asset/upi.png';

// axios
import API from '../config/API';
//react-router
import {
    Link as RouterLink,
    useRouteMatch,
    Switch,
    Route,
    useParams,
} from 'react-router-dom';

//factory function
import { allRequestFactory as AllRequestGenerator } from '../Factory';

//components
import { ReactTable } from '../component/ReactTable';

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
                        alt="Segun Adebayo"
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
    const [allRequests, SetAllRequest] = useState([]);
    let { path, url } = useRouteMatch();

    async function fetchAllRequests() {
        fetch('http://localhost:3000/cashout/getCashoutRequests?pageNo=0')
            .then((res) => res.json())
            .then((resjson) => SetAllRequest(resjson))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchAllRequests();
    }, [allRequests]);

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            Cell: (props) => {
                return (
                    <Text color="#6B46C1" fontWeight="bold">
                        {props.value}
                    </Text>
                );
            },
        },
        {
            Header: 'Requested By',
            accessor: 'requestedBy',
            Cell: ({
                cell: {
                    row: {
                        original: { requestedBy, userId },
                    },
                },
            }) => (
                <Text
                    color="#000000"
                    align="center"
                    fontWeight="bold"
                >{`${requestedBy} (${userId})`}</Text>
            ),
        },

        {
            Header: 'Payment Mode',
            accessor: 'requestMode',
            Cell: renderPaymentMode,
        },
        {
            Header: 'Status',
            accessor: 'requestStatus',
            Cell: ({ value }) => (
                <Button
                    colorScheme={
                        value.toLowerCase() === 'active' ? 'green' : 'orange'
                    }
                    variant="outline"
                    size="sm"
                    width="5rem"
                >
                    <Text casing="capitalize">{value}</Text>
                </Button>
            ),
        },
        {
            Header: 'Amount',
            accessor: 'amount',
            Cell: ({
                cell: {
                    row: {
                        original: { amount },
                    },
                },
            }) => (
                <Text
                    align="center"
                    fontWeight="bold"
                    color="#00000"
                    casing="capitalize"
                >
                    {` \u20B9${amount}`}
                </Text>
            ),
        },
        {
            Header: 'Date',
            accessor: 'date',
            Cell: ({ value }) => {
                let date = new Date(Number(value) * 1000)
                    .toLocaleString()
                    .replaceAll('/', '-')
                    .replaceAll(',', ' ');
                return <Text fontWeight="bold"> {date} </Text>;
            },
        },
        {
            Header: 'Action',
            accessor: 'userId',
            Cell: ({
                cell: {
                    row: {
                        original: { userId, requestedBy },
                    },
                },
            }) => {
                return (
                    <Link
                        size="sm"
                        as={RouterLink}
                        style={{
                            backgroundColor: 'red',
                            padding: '0.5rem',
                            color: 'white',
                            borderRadius: '5px',
                        }}
                        to={{
                            pathname: `${url}/${userId}`,
                            state: { userId, requestedBy },
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
            {' '}
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
                        {' '}
                        <Text>Cashout Requests </Text>{' '}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <ReactTable columns={columns} data={allRequests} />
        </Box>
    );
};

export default AllRequests;
