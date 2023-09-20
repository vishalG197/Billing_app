import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";

const AddItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!itemName.trim() || parseFloat(itemPrice) <= 0) {
      setError("Please provide a valid item name and price.");
      setIsSubmitting(false);
      return;
    }

    try {
      let res = await axios.post("https://bmi-api-wfcz.onrender.com/items", {
        name: itemName,
        price: itemPrice,
      });

      alert(`Item has been added. ${res.data}`);

      setItemName("");
      setItemPrice("");
      setError("");
      setIsSubmitting(false);
    } catch (err) {
      setError("An error occurred while adding the item.");
      setIsSubmitting(false);
      console.log(err);
    }
  };

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Add Item
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired isInvalid={error}>
          <FormLabel>Item Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={error}>
          <FormLabel>Item Price ($)</FormLabel>
          <Input
            type="number"
            step="0.01"
            placeholder="Enter item price"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
        <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
          Add Item
        </Button>
      </form>
    </Box>
  );
};

export default AddItem;
