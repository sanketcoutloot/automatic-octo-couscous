import React from 'react';
import styled from 'styled-components';
import {
    useTable,
    useFilters,
    useGlobalFilter,
    usePagination,
    useSortBy,
} from 'react-table';
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
const Table = styled.table`
    margin: 1rem;
    border-collapse: separate;
    border-spacing: 0 15px;
    width: 100%;
    text-align: center;
`;

const TableBody = styled.tbody``;

const TableHeader = styled.tr`
    background-color: #e47297;
    border-radius: 5%;
    height: 3rem;
    color: white;
`;

const TableRow = styled.tr`
    background-color: #ffffff;
    border-radius: 5px;
    height: 3rem;
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
        <Flex align="center" justify="space-between">
            <Box width="87%">
                <Flex border="1px solid black">
                    <Input
                        w="70%"
                        size="md"
                        value={value || ''}
                        onChange={(e) => {
                            setValue(e.target.value);
                            onChange(e.target.value);
                        }}
                        bg="white"
                        border="none"
                        placeholder="Search Here"
                    />
                    <Box w="30%" bg="none">
                        <Dropdown />
                    </Box>
                </Flex>
            </Box>

            <Button
                w="12%"
                bgColor="#177CE6"
                borderRadius={2}
                leftIcon={<FaSearch />}
                colorScheme="blue"
            >
                Search
            </Button>
        </Flex>
    );
}

// Our table component
function ReactTable({ columns, data }) {
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
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 2 },
        },
        useFilters, // useFilters!
        useGlobalFilter,
        useSortBy, // useGlobalFilter!,
        usePagination
    );

    let { pageIndex, pageSize } = state;
    return (
        <Box>
            <Table {...getTableProps()}>
                <thead>
                    {' '}
                    <tr
                        style={{
                            marginBottom: '5px',
                        }}
                    >
                        <th
                            colSpan={visibleColumns.length}
                            style={{
                                textAlign: 'right',
                                padding: '0px',
                            }}
                        >
                            <GlobalFilter
                                preGlobalFilteredRows={preGlobalFilteredRows}
                                globalFilter={state.globalFilter}
                                setGlobalFilter={setGlobalFilter}
                            />
                        </th>
                    </tr>
                    {headerGroups.map((headerGroup) => (
                        <TableHeader {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </TableHeader>
                    ))}
                </thead>{' '}
                <TableBody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            gotoPage(page);
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </Box>
    );
}

export default ReactTable;
