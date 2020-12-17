import { Box, Checkbox } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';

//redux
import { fetchUsers, allUsers } from './userSlice';
import { useDispatch, useSelector } from 'react-redux';

//components
import { ReactTable } from '../../component/ReactTable';

const customStyles = {
    header: {
        style: {
            minHeight: '56px',
        },
    },
    headRow: {
        style: {
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            backgroundColor: '#E47297',
            color: 'White',
            fontWeight: 'bolder',
        },
    },
    TableCol: {
        style: {
            color: 'white',
        },
    },
};

const data = [
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
    {
        firstName: 'jane',
        lastName: 'doe',
        age: 20,
        summary:
            'Orphaned boy Conan is enslaved after his village is destroyed...',
    },
    { firstName: 'john', lastName: 'smith', age: 21 },
];

const columns = [
    {
        name: 'First Name',
        selector: 'firstName',
        sortable: true,
        cell: (row) => {
            if (row.summary) {
                return (
                    <div>
                        <div style={{ fontWeight: 'bold' }}>
                            {row.firstName}
                        </div>
                        <div>{row.summary}</div>
                    </div>
                );
            } else {
                return (
                    <div
                        style={{
                            backgroundColor: 'red',
                            fontWeight: 'bolder',
                            color: 'white',
                        }}
                    >
                        {row.firstName}
                        Summery id missing{' '}
                    </div>
                );
            }
        },
    },
    {
        name: 'Last Name',
        selector: 'firstName',
        sortable: true,
        right: true,
    },
    {
        name: 'Age',
        selector: 'age',
        sortable: true,
        right: true,
    },
];

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(allUsers);

    useEffect(() => {
        console.log('rendering');
        dispatch(fetchUsers());
    }, []);

    const handleChange = (state) => {
        // You can use setState or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', state.selectedRows);
    };
    const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

    return (
        <Box>
            {' '}
            <h1>User List</h1>
            <DataTable
                customStyles={customStyles}
                title="Arnold Movies"
                columns={columns}
                data={data}
            />
        </Box>
    );
};

export default UserList;
