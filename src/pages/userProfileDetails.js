import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Text,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Image,
    Button,
    Link,
    Flex,
    Grid,
    GridItem,
    Input,
} from '@chakra-ui/react';

import BANK from '../asset/bank.svg';

import { CashoutRequestTable } from '../component/UserProfileUtilsComponents';
import { FaPen } from 'react-icons/fa';

const userProfileDetails = () => {
    const { state } = useLocation();
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        setUserId(() => state.userId);
        setUserName(() => state.requestedBy);
    }, [location]);

    return (
        <Box>
            {' '}
            <Box as="h1" fontSize="30px">
                {`${userName} (${userId})`}
            </Box>
            <Breadcrumb fontWeight="medium" fontSize="sm">
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to="/">
                        <Text color="blue">Cashout Panel</Text>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to="/">
                        <Text color="blue">Cashout Requests </Text>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>
                        {' '}
                        <Text>{`${userName} (${userId})`} </Text>{' '}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            {/* tabs and thgere respective data table  */}
            <Tabs height="60vh" mt="1.5rem" variant="soft-rounded" isLazy>
                <TabList bgColor="white" p="0.8rem" display="flex" rounded="md">
                    <Tab
                        _selected={{
                            color: '#E47297',
                            bg: 'white',
                            border: '2px #E47297 solid',
                        }}
                    >
                        Cashout Request
                    </Tab>
                    <Tab
                        _selected={{
                            color: '#E47297',
                            bg: 'white',
                            border: '2px #E47297 solid',
                        }}
                    >
                        My Money Transactions
                    </Tab>
                    <Tab
                        _selected={{
                            color: '#E47297',
                            bg: 'white',
                            border: '2px #E47297 solid',
                        }}
                    >
                        Saved Bank Accounts
                    </Tab>
                </TabList>
                <TabPanels overflowY="scroll" h="80%" bgColor="blue">
                    <TabPanel>
                        <CashoutRequestTable />
                    </TabPanel>
                    <TabPanel>
                        <CashoutRequestTable />
                    </TabPanel>
                    <TabPanel>
                        <CashoutRequestTable />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            {/* user details  */}
            <Flex height="23vh" w="100%">
                <Box
                    height="100%"
                    margin="0.5rem 0.5rem 0rem 0rem"
                    width="50%"
                    bgColor="white"
                    color="#6C757D"
                    p={2}
                >
                    <Flex justify="space-between" align="center">
                        <Text>User Details :</Text>
                    </Flex>
                    <Grid
                        h="100%"
                        templateRows="repeat(4, 1fr)"
                        templateColumns="repeat(6, 1fr)"
                        gap={1}
                        alignItems="center"
                    >
                        <GridItem gridRow="1/2" gridColumn="1/4">
                            <Flex>
                                <Text>Request Id :</Text>
                                <Text color="#000000">834936</Text>
                            </Flex>
                        </GridItem>

                        <GridItem gridRow="1/2" gridColumn="4/7">
                            <Flex>
                                <Text noOfLines={1}>Requested Amt :</Text>

                                <Text
                                    rounded="md"
                                    border="2px solid #CCC7C7"
                                    color="#177CE6"
                                    padding="0.1rem"
                                >
                                    {` \u20B9 45765`}
                                </Text>
                            </Flex>
                        </GridItem>

                        <GridItem gridRow="2/3" gridColumn="1/4">
                            <Flex>
                                <Text>Cashout Bal :</Text>
                                <Text color="#000000">{` \u20B9 8336`}</Text>
                            </Flex>
                        </GridItem>

                        <GridItem gridRow="2/3" gridColumn="4/7">
                            <Flex>
                                <Text>Requested Mode :</Text>
                                <Image
                                    src={BANK}
                                    width="70px"
                                    objectFit="contain"
                                />
                            </Flex>
                        </GridItem>

                        <GridItem gridRow="3/4" gridColumn="1/-1">
                            <Flex>
                                <Text>Requested Mode :</Text>

                                <Text color="#000000">
                                    Wed Nov 25 2020 12:36:24
                                </Text>
                            </Flex>
                        </GridItem>

                        <GridItem gridRow="4/5" gridColumn="1/-1">
                            <Flex>
                                <Text>Locked In Amt :</Text>

                                <Text
                                    rounded="md"
                                    border="2px solid #CCC7C7"
                                    color="#177CE6"
                                    padding="0.1rem"
                                >
                                    {` \u20B9 4565`}
                                </Text>
                            </Flex>
                        </GridItem>
                    </Grid>
                </Box>
                <Box
                    height="100%"
                    margin="0.5rem 0.5rem 0rem 0rem"
                    width="50%"
                    bgColor="white"
                    color="#6C757D"
                    p={2}
                >
                    <Flex justify="space-between" align="center">
                        <Text>Bank Details :</Text>
                        <Button
                            colorScheme="blue"
                            leftIcon={<FaPen />}
                            variant="outline"
                            borderRadius="2rem"
                            size="sm"
                        >
                            Edit
                        </Button>
                    </Flex>
                    <Grid
                        h="100%"
                        templateRows="repeat(4, 1fr)"
                        templateColumns="repeat(6, 1fr)"
                        gap={1}
                        alignItems="center"
                    >
                        <GridItem gridRow="1/2" gridColumn="1/-1">
                            <Flex>
                                <Text>Acc. Holder Name :</Text>
                                <Text color="#000000">sanket ding </Text>
                            </Flex>
                        </GridItem>

                        <GridItem gridRow="2/3" gridColumn="1/-1">
                            <Flex>
                                <Text>Acc. Number :</Text>
                                <Text color="#000000">745985859847487</Text>
                            </Flex>
                        </GridItem>

                        <GridItem gridRow="3/4" gridColumn="1/-1">
                            <Flex>
                                <Text>Acc. Type :</Text>

                                <Text color="#000000">Savibg</Text>
                            </Flex>
                        </GridItem>

                        <GridItem gridRow="4/5" gridColumn="1/5">
                            <Flex>
                                <Text noOfLines={1}>Bank :</Text>

                                <Text isTruncated color="#000000">
                                    saome random bank sanke
                                </Text>
                            </Flex>
                        </GridItem>

                        <GridItem gridRow="4/5" gridColumn="4/7">
                            <Flex>
                                <Text>IFSC CODE :</Text>

                                <Text color="#000000" casing="uppercase">
                                    icicic94375405
                                </Text>
                            </Flex>
                        </GridItem>
                    </Grid>
                </Box>
            </Flex>
        </Box>
    );
};

export default userProfileDetails;
