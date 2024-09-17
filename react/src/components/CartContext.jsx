import React, { createContext, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = async (product, size) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para adicionar itens ao carrinho.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/addCart', 
        { productId: product.idProduct, size },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setCart(prevCart => {
          // Verifica se o produto já existe no carrinho (busca por ID).
          const existingProduct = prevCart.find(item => item.idProduct === product.idProduct);
          // Se o produto já estiver no carrinho, atualiza o tamanho (size) do produto correspondente.
          const updatedCart = existingProduct
            ? prevCart.map(item =>
                item.idProduct === product.idProduct
                  ? { ...item, size }
                  : item
              )
            : [...prevCart, { ...product, size }];

          localStorage.setItem('cart', JSON.stringify(updatedCart));
          return updatedCart;
        });
        alert('Produto adicionado ao carrinho!');
      } else {
        alert('Erro ao adicionar produto ao carrinho.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao adicionar produto ao carrinho.');
    }
  };

  const removeFromCart = async (idCart) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/removeCart/${idCart}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setCart(prevCart => prevCart.filter(item => item.idCart !== idCart));
      localStorage.setItem('cart', JSON.stringify(prevCart.filter(item => item.idCart !== idCart)));
      alert('Item removido do carrinho com sucesso!');
    } catch (error) {
      console.error('Erro ao remover produto do carrinho:', error);
      alert('Erro ao remover produto do carrinho.');
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete('http://localhost:5000/clearCart', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setCart([]);
      localStorage.removeItem('cart');
      alert('Carrinho limpo com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar o carrinho:', error);
      alert('Erro ao limpar o carrinho.');
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};