import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

const Checkout = () => {
  const [bill, setBill] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const location = useLocation();
  const checkoutData = location.state || {};
  console.log(checkoutData);

  useEffect(() => {
    if (checkoutData.items && checkoutData.totalCost) {
      setBill(checkoutData);
    } else {
      console.log("please get data first");
    }
  }, [checkoutData]);

  const handleCheckout = async () => {
    setIsCheckingOut(true);

    try {
      let res = await axios.post("https://bmi-api-wfcz.onrender.com/bills", {
        ...bill,
      });

      alert("Bill successfully");
    } catch (error) {
      console.error("An error occurred during checkout:", error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!bill) {
    return (
      <Box p={4}>
        <Heading size="lg" mb={4}>
          Checkout
        </Heading>
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Checkout
      </Heading>
      <Text>Date: {bill.date}</Text>
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Quantity</Th>
            <Th>Price ($)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bill.items.map((item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.price.toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Text mt={4}>
        Total Cost: ${calculateTotalCost(bill.items).toFixed(2)}
      </Text>
      <Button
        colorScheme="teal"
        mt={4}
        isLoading={isCheckingOut}
        onClick={handleCheckout}
        disabled={isCheckingOut}
      >
        Confirm Checkout
      </Button>
      <Button as={Link} to="/newbill" colorScheme="red" mt={2}>
        Cancel
      </Button>
    </Box>
  );
};

const calculateTotalCost = (items) => {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

export default Checkout;
