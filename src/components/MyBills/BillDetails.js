import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
} from "@chakra-ui/react";
import axios from "axios";

const BillDetails = () => {
  const { billId } = useParams();
  const [bill, setBill] = useState(null);

  const fetchItem = () => {
    axios
      .get(`https://bmi-api-wfcz.onrender.com/bills/${billId}`)
      .then((data) => {
        setBill(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchItem();
  }, [billId]);

  if (!bill) {
    return (
      <Box p={4}>
        <Heading size="lg" mb={4}>
          Bill Details
        </Heading>
        <Text>Loading...</Text>
      </Box>
    );
  }

  console.log(bill);
  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Bill Details
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
              <Td>{item.price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Text mt={4}>
        Total Cost: ${calculateTotalCost(bill.items).toFixed(2)}
      </Text>
    </Box>
  );
};

const calculateTotalCost = (items) => {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

export default BillDetails;
