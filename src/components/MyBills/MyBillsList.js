import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

const MyBillsList = () => {
  const [bills, setBills] = useState([]);
  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`https://bmi-api-wfcz.onrender.com/bills/${id}`)
      .then((res) => {
        alert(`Item has been deleted successfully.`);
        fetchItem();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchItem = () => {
    axios
      .get("https://bmi-api-wfcz.onrender.com/bills")
      .then((data) => {
        setBills(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        My Bills
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Date</Th>
            <Th>Total Cost ($)</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bills.map((bill) => (
            <Tr key={bill.id}>
              <Td>{bill.id}</Td>
              <Td>{bill.date}</Td>
              <Td>{bill.totalCost}</Td>
              <Td>
                <Button
                  as={Link}
                  to={`/billdetails/${bill.id}`}
                  colorScheme="teal"
                  size="sm"
                  mr={2}
                >
                  Details
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(bill.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MyBillsList;
