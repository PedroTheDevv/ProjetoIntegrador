import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import '../styles/carrinho.css';
import { Box, Flex, Image, Text, Button, IconButton, Stack } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const Carrinho = () => {
  const { removeFromCart, clearCart } = useContext(CartContext);
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartResponse = await axios.get('http://localhost:5000/cart', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setData(cartResponse.data);

        const ordersResponse = await axios.get('http://localhost:5000/user/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setOrders(ordersResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [token]);

  const handleRemove = (idCart) => {
    removeFromCart(idCart);
    setData(prevData => prevData.filter(item => item.idCart !== idCart));
  };

  const handleClearCart = () => {
    clearCart();
    setData([]);
  };

  const handleCheckout = () => {
    axios.post('http://localhost:5000/orders', {
      items: data,
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => {
        console.log('Encomenda realizada com sucesso:', response.data);
        handleClearCart();
      })
      .catch(error => console.error('Erro ao realizar encomenda:', error));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box p={4} mx="auto" display='flex' justifyContent='space-evenly' flexDirection="row" width='100%'>
      <Flex flexDirection='column' maxWidth='40%'>
        <Text fontSize="26px" mb={4} fontWeight="bold" textAlign="center">Carrinho de Compras</Text>

        {data.length === 0 ? (
          <Flex alignItems="center" justifyContent="center" p={4} borderWidth="1px" borderRadius="md" mb={6}>
            <Text fontSize="xl" textAlign='center'>Seu carrinho está vazio.</Text>
          </Flex>
        ) : (
          <Stack spacing={4}>
            {data.map((item) => (
              <Flex key={item.idCart} alignItems="center" justifyContent="space-between" p={4} borderWidth="1px" borderRadius="md">
                <Image src={`http://localhost:5000/${item.imageProduct}`} boxSize="100px" objectFit="cover" alt={item.nameProduct} />
                <Box ml={4} flex="1">
                  <Text fontSize="lg" fontWeight="semibold">{item.nameProduct}</Text>
                  <Text color="gray.500">R${item.priceProduct}</Text>
                </Box>
                <IconButton
                  icon={<FaTrash />}
                  colorScheme="red"
                  variant="outline"
                  onClick={() => handleRemove(item.idCart)}
                  aria-label="Remover item"
                  ml={4}
                />
              </Flex>
            ))}
          </Stack>
        )}

        {data.length > 0 && (
          <Box mt={8} mb={6}>
            <Flex justifyContent="space-between" alignItems="center">
              <Button colorScheme="red" onClick={handleClearCart}>
                Limpar Carrinho
              </Button>
              <Button colorScheme="teal" onClick={handleCheckout}>
                Fazer Encomenda
              </Button>
            </Flex>
          </Box>
        )}
      </Flex>

      <Flex flexDirection='column' maxWidth='40%'>
        <Text fontSize="26px" textAlign='center' fontWeight="bold" mb={4}>Seus Pedidos</Text>
        {orders.map((order) => (
          <Stack key={order.id} mb={4}>
            <Box borderWidth="1px" borderRadius="md" p={4}>
              <Text fontSize="lg" fontWeight="semibold">Pedido ID: {order.id}</Text>
              <Text color="gray.500">Data: {new Date(order.orderDate).toLocaleDateString()}</Text>
              <Stack spacing={4} mt={4}>
                {order.items.map((item) => (
                  <Flex key={item.idOrderProduct} alignItems="center" justifyContent="space-between" p={4} borderWidth="1px" borderRadius="md" width={400}>
                    <Image src={`http://localhost:5000/${item.image}`} boxSize="100px" objectFit="cover" alt={item.name} />
                    <Box ml={4} flex="1">
                      <Text fontSize="lg" fontWeight="semibold">{item.name}</Text>
                      <Text color="gray.500">R${item.price}</Text>
                      <Text color="gray.500">Tamanho: {item.sizeOrder}</Text>
                    </Box>
                  </Flex>
                ))}
              </Stack>
              <Flex justifyContent="end" alignItems="center">
                <Text fontSize="lg" fontWeight="bold" mt={4}>Total: R${order.total}</Text>
              </Flex>
            </Box>
          </Stack>
        ))
        }
      </Flex>
    </Box>
  );
};

export default Carrinho;
