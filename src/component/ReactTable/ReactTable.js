import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
} from "react-table";

import {
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Flex,
  Box,
  Button,
  Icon,
} from "@chakra-ui/react";

import {
  FaSearch,
  FaSort,
  FaSortAmountDownAlt,
  FaSortAmountUpAlt,
} from "react-icons/fa";

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 15px;
  font-size: 14px;
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
      <option defaultValue value="option1">
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
  setSearchText,
  setShouldFetchMoneyLog,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);

  const onChange = (value) => {
    //money log search function
    // setSearchText(value);

    setGlobalFilter(value || undefined);
  };

  return (
    <Flex align="center" justify="space-between">
      <Box width="87%" borderRadius="none">
        <Flex border="1px solid black">
          <Input
            w="70%"
            size="md"
            value={value || ""}
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
        onClick={() => setShouldFetchMoneyLog(true)}
      >
        Search
      </Button>
    </Flex>
  );
}

// Our table component
function ReactTable({
  columns,
  data,
  setSearchText = undefined,
  setShouldFetchMoneyLog = undefined,
  fetchData,
  pageCount: controlledPageCount,
}) {
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
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 50 },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy, // useGlobalFilter!,
    usePagination
  );

  useEffect(() => {
    console.log("STATE", { fetchData, pageIndex, pageSize });
    fetchData(pageIndex);
  }, [fetchData, pageIndex]);

  return (
    <Box>
      {console.log("rendering react datatable")}
      {console.log({ data })}
      {/* {console.log({})} */}

      <Table {...getTableProps()}>
        <thead>
          <tr
            style={{
              marginBottom: "5px",
            }}
          >
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "right",
                padding: "0px",
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
                setSearchText={setSearchText}
                setShouldFetchMoneyLog={setShouldFetchMoneyLog}
              />
            </th>
          </tr>
          {headerGroups.map((headerGroup) => (
            <TableHeader {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : null}
                    {/* //todo : renderinf icon */}
                    {/* todo : render only for default and not for others  */}
                    {/* {column.isSorted ? (
                      column.isSortedDesc ? (
                        <Icon size="lg">
                          {" "}
                          <FaSortAmountUpAlt />{" "}
                        </Icon>
                      ) : (
                        <Icon size="lg">
                          {" "}
                          <FaSortAmountDownAlt />{" "}
                        </Icon>
                      )
                    ) : (
                      <Icon size="lg">
                        <FaSort />
                      </Icon>
                    )} */}
                  </span>
                </th>
              ))}
            </TableHeader>
          ))}
        </thead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {`Previous Page `}
        </Button>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {`Next page   `}
        </Button>
      </div>
    </Box>
  );
}

export default ReactTable;
