import React, { useEffect, useState } from 'react';
import { allRequestFactory as AllRequestGenerator } from '../../Factory';
import BANK from '../../asset/bank.svg';
import PAYTM from '../../asset/paytm.png';
import UPI from '../../asset/upi.png';
import { Box, Button, Image, Text } from '@chakra-ui/react';
import { ReactTable } from '../ReactTable';

const renderPaymentMode = (props) => {
    let lowerCaseValue = props.value.toLowerCase().trim();

    switch (lowerCaseValue) {
        case 'paytm':
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

        case 'upi':
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

        case 'bank':
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
                    {lowerCaseValue}
                </Text>
            );
    }
};

const cashoutRequestTable = () => {
    const [allRequests, SetAllRequest] = useState([]);
    useEffect(() => {
        getMoneyLogs();
    }, []);

    function getMoneyLogs() {
        let requests = AllRequestGenerator(100);
        SetAllRequest(requests);
    }

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
            accessor: 'paymentMode',
            Cell: renderPaymentMode,
        },
        {
            Header: 'Status',
            accessor: 'status',
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
    ];
    return <ReactTable columns={columns} data={allRequests} />;
};

export default cashoutRequestTable;
