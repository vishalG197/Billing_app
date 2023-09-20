// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Spacer, Button, Heading } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box bg="teal.500" p={4}>
      <Flex alignItems="center">
        <Heading size="md" color="white">
          Billing System
        </Heading>
        <Spacer />
        <Button colorScheme="teal" as={Link} to="/additem">
          AddItem
        </Button>
        <Button colorScheme="teal" as={Link} to="/newbill">
          New Bill
        </Button>
        <Button colorScheme="teal" as={Link} to="/itemlist">
          Item List
        </Button>
        <Button colorScheme="teal" as={Link} to="/mybills">
          My Bills
        </Button>
        <Button colorScheme="teal" as={Link} to="/saleslist">
          Sales
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
