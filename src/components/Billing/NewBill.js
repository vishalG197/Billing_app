import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Select,
  Input,
  VStack,
  HStack,
  Spacer,
  StackDivider,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Routes/AuthContext";

const NewBill = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemQuantity, setItemQuantity] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [items, setItem] = useState([]);
  const { login } = useAuth();

  const navigate = useNavigate();

  const fetchItem = () => {
    axios
      .get(`https://bmi-api-wfcz.onrender.com/items`)
      .then((data) => {
        setItem(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchItem();
  }, []);

  useEffect(() => {
    let cost = 0;
    selectedItems.forEach((item) => {
      cost += item.price * (itemQuantity[item.id] || 0);
    });
    setTotalCost(cost);
  }, [selectedItems, itemQuantity]);

  const handleItemChange = (e) => {
    const itemId = parseInt(e.target.value);
    const item = items.find((item) => item.id === itemId);

    console.log(item);
    if (item) {
      setSelectedItems([...selectedItems, item]);
      setItemQuantity({ ...itemQuantity, ...item });
    }
  };
  console.log(itemQuantity);

  const handleQuantityChange = (itemId, quantity) => {
    setItemQuantity({ ...itemQuantity, [itemId]: quantity });
  };

  const handleCheckout = () => {
    const selectedItemsWithQuantity = selectedItems.map((item) => ({
      ...item,
      quantity: itemQuantity[item.id] || 0,
    }));
    var formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const checkoutData = {
      items: selectedItemsWithQuantity,
      totalCost: totalCost.toFixed(2),

      date: formatDate(new Date()),
    };

    navigate("/checkout", { state: checkoutData });
  };

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        New Bill
      </Heading>
      <VStack
        align="stretch"
        spacing={4}
        divider={<StackDivider borderColor="gray.200" />}
      >
        <HStack>
          <Select placeholder="Select an item" onChange={handleItemChange}>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} - ${item.price}
              </option>
            ))}
          </Select>
          <Spacer />
          <Text>Total Cost: ${totalCost.toFixed(2)}</Text>
        </HStack>
        {selectedItems.map((item) => (
          <HStack key={item.id}>
            <Text>{item.name}</Text>
            <Input
              type="number"
              value={itemQuantity[item.id] || ""}
              onChange={(e) =>
                handleQuantityChange(item.id, parseInt(e.target.value) || 0)
              }
              min={0}
            />
            <Spacer />
            <Text>
              ${(item.price * (itemQuantity[item.id] || 0)).toFixed(2)}
            </Text>
          </HStack>
        ))}
        <Button
          colorScheme="teal"
          onClick={handleCheckout}
          isDisabled={selectedItems.length === 0}
        >
          Checkout
        </Button>
      </VStack>
    </Box>
  );
};

export default NewBill;
