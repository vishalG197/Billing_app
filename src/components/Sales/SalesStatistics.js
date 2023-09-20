import React, { useState, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import axios from "axios";

const SalesStatistics = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchItem = () => {
    axios
      .get("https://bmi-api-wfcz.onrender.com/bills")
      .then((data) => {
        const revenue = data.data.reduce(
          (total, bill) => total + +bill.totalCost,
          0
        );
        setTotalRevenue(revenue);
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
        Sales Statistics
      </Heading>
      <Text>Total Revenue: ${totalRevenue}</Text>
    </Box>
  );
};

export default SalesStatistics;
