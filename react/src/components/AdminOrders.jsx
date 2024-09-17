import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, Text, Image, Stack, Divider } from '@chakra-ui/react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Autenticação inválida. Faça login novamente.');
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setOrders(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Token inválido ou expirado. Faça login novamente.');
        } else {
          setError('Erro ao carregar pedidos. Tente novamente mais tarde.');
        }
        console.error('Erro ao buscar pedidos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Text>Carregando...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <Box p={4} maxWidth="1200px" mx="auto">
      <Text fontSize="2xl" mb={4} fontWeight="bold" textAlign="center">Pedidos</Text>
      {orders.length === 0 ? (
        <Text fontSize="xl" textAlign="center">Nenhum pedido encontrado.</Text>
      ) : (
        orders.map((order) => (
          <Box key={order.id} mb={6} borderWidth="1px" borderRadius="md" p={4} width={500}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Text fontSize="lg" fontWeight="bold">Pedido de {order.userName || 'Usuário Desconhecido'}</Text>
              <Text fontSize="md">Data: {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'Data desconhecida'}</Text>
            </Flex>
            <Divider mb={4} />
            <Stack spacing={4}>
              {order.items && order.items.length > 0 ? (
                order.items.map((item) => (
                  <Flex key={item.idOrderProduct} alignItems="center" borderWidth="1px" borderRadius="md" p={4}>
                    {item.image ? (
                      <Image src={`http://localhost:5000/${item.image}`} boxSize="100px" objectFit="cover" alt={item.nameProduct || 'Produto'} />
                    ) : (
                      <Box boxSize="100px" bg="gray.100" display="flex" justifyContent="center" alignItems="center">Imagem indisponível</Box>
                    )}
                    <Box ml={4} flex="1">
                      <Text fontSize="lg" fontWeight="semibold">{item.name || 'Nome não disponível'}</Text>
                      <Text color="gray.500">Valor: R${item.price || 'N/A'}</Text>
                      <Text color="gray.500">Tamanho: {item.sizeOrder || 'N/A'}</Text>
                    </Box>
                  </Flex>
                ))
              ) : (
                <Text>Nenhum item encontrado para este pedido.</Text>
              )}
              <Flex justifyContent="end" alignItems="center">
                <Text fontSize="lg" fontWeight="bold">Total: R${order.total || 'N/A'}</Text>
              </Flex>
            </Stack>
          </Box>
        ))
      )}
    </Box>
  );
};

export default AdminOrders;
