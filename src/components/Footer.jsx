// src/components/Footer.js

import React from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="teal.500" p={4}>
      <Flex alignItems="center">
        <Text color="white" fontSize="sm">
          &copy; {new Date().getFullYear()} Billing System
        </Text>
        <Box ml="auto">
          <Link color="white" fontSize="sm" href="#">
            Privacy Policy
          </Link>
          <Link color="white" fontSize="sm" ml={4} href="#">
            Terms of Service
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
