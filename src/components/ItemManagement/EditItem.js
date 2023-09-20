import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const EditItem = () => {
  const { itemId } = useParams();
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchItem = () => {
    axios
      .get(`https://bmi-api-wfcz.onrender.com/items/${itemId}`)
      .then((data) => {
        setItemName(data.data.name);
        setItemPrice(data.data.price.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchItem();
  }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!itemName.trim() || parseFloat(itemPrice) <= 0) {
      setError("Please provide a valid item name and price.");
      setIsSubmitting(false);
      return;
    }

    try {
      setError("");
      setIsSubmitting(false);
    } catch (err) {
      setError("An error occurred while updating the item.");
      setIsSubmitting(false);
    }
  };

  const handleUpdate = (itemId) => {
    axios
      .patch(`https://bmi-api-wfcz.onrender.com/items/${itemId}`, {
        name: itemName,
        price: itemPrice,
      })
      .then((res) => {
        alert("Item has been updated successfully.");

        navigate("/itemlist");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Edit Item
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
        <Button
          colorScheme="teal"
          type="submit"
          isLoading={isSubmitting}
          onClick={() => {
            handleUpdate(itemId);
          }}
        >
          Update Item
        </Button>
      </form>
    </Box>
  );
};

export default EditItem;
