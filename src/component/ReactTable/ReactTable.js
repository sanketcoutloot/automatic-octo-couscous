import React from 'react';
import styled from 'styled-components';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import {
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Flex,
    Box,
    Button,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
const Styles = styled.div`
    padding: 1rem;

    table {
        border-spacing: 0;
        border: 1px solid black;
        width: 100%;

        tr {
            :last-child {
                td {
                    border-bottom: 0;
                }
            }
        }

        th,
        td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: 1px solid black;

            :last-child {
                border-right: 0;
            }
        }
    }
`;

const TableHeader = styled.tr`
    border: black 1px solid;
    background-color: #e47297;
    color: white;
`;

function Dropdown() {
    return (
        <Select variant="outline" bgColor="white" placeholder="Select option">
            <option selected value="option1">
                Option 1
            </option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
        </Select>
    );
}
// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    // const onChange = useAsyncDebounce((value) => {
    //     setGlobalFilter(value || undefined);
    // }, 200);

    const onChange = (value) => {
        setGlobalFilter(value || undefined);
    };

    return (
        <Flex alignItems="center">
            <Input
                w="75%"
                size="md"
                value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                bg="white"
                border="none"
                placeholder={`${count} records...`}
            />
            <Box w="25%" bg="none">
                <Dropdown />
            </Box>
            <Button leftIcon={<FaSearch />} colorScheme="blue">
                Search
            </Button>
        </Flex>
    );
}

// Our table component
function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
        },
        useFilters, // useFilters!
        useGlobalFilter // useGlobalFilter!
    );

    return (
        <div>
            <Styles>
                <table {...getTableProps()}>
                    <thead>
                        {' '}
                        <tr>
                            <th
                                colSpan={visibleColumns.length}
                                style={{
                                    textAlign: 'right',
                                }}
                            >
                                <GlobalFilter
                                    preGlobalFilteredRows={
                                        preGlobalFilteredRows
                                    }
                                    globalFilter={state.globalFilter}
                                    setGlobalFilter={setGlobalFilter}
                                />
                            </th>
                        </tr>
                        {headerGroups.map((headerGroup) => (
                            <TableHeader {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </TableHeader>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Styles>
        </div>
    );
}

export default Table;
