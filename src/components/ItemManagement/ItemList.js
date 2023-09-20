
import React, { useState, useEffect } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);

 
const fetchItem=()=>{
   axios.get("https://bmi-api-wfcz.onrender.com/items")
   .then((data)=>{
      console.log(data.data)
      setItems(data.data);
   })
   .catch((err)=>{
   console.log(err)
   })

}

  useEffect(() => {
    fetchItem()
  },[]);

  const handleDelete=(id)=>{
   console.log(id)
   axios.delete(`https://bmi-api-wfcz.onrender.com/items/${id}`)
   .then((res)=>{
      console.log(res.data)
      alert(`Item has been deleted successfully.`)
      fetchItem()
   })
     .catch((err)=>{
      console.log(err)
     })

  }

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Item List
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Price ($)</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.price}</Td>
              <Td>
                <Button as={Link} to={`/edititem/${item.id}`} colorScheme="teal" size="sm" mr={2}>
                  Edit
                </Button>
                <Button colorScheme="red" size="sm" onClick={()=>{handleDelete(item.id)}}>
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

export default ItemList;
