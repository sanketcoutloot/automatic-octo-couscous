import { Box, Checkbox } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

//factory function
import { MoneyLogFactory as MoneyLogsGenerator } from '../../Factory';

//redux
import { fetchUsers, allUsers } from './userSlice';
import { useDispatch, useSelector } from 'react-redux';

//components
import { ReactTable } from '../../component/ReactTable';

const columns = [
    {
        Header: 'Transaction Id',
        accessor: 'transactionId',
    },
    {
        Header: 'User Name',
        accessor: 'userName',
    },
    {
        Header: 'Date',
        accessor: 'date',
    },
    {
        Header: 'Wallet Type',
        accessor: 'walletType',
    },
    {
        Header: 'User Id',
        accessor: 'userId',
    },
    {
        Header: 'Amount',
        accessor: 'amount',
    },
];

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(allUsers);
    const [moneyLogs, SetMoneyLogs] = useState([]);
    useEffect(() => {
        console.log('rendering');
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
            {' '}
            <h1>User List</h1>
            <ReactTable columns={columns} data={moneyLogs} />
        </Box>
    );
};

export default UserList;
