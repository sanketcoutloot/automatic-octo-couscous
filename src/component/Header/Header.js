import React from 'react';
import { Flex, Box, Spacer, Heading, Button } from '@chakra-ui/react';
import { FaPowerOff } from 'react-icons/fa';
const Header = () => (
    <Flex padding="4">
        <Box>
            <Heading textTransform="uppercase" colorScheme="red" size="md">
                coutloot
            </Heading>
        </Box>
        <Spacer />
        <Box>
            <Button colorScheme="red" leftIcon={<FaPowerOff />}>
                Logout
            </Button>
        </Box>
    </Flex>
);

export default Header;
