import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/card.css';
import Pagination from './Pagination';

const CardProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 40;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/produtos');
        setData(response.data);
        setError(null);
      } catch (error) {
        setError('Erro ao buscar dados. Tente novamente mais tarde.');
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [value, setValue] = useState('1');

  if (loading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      <div className="container">
        <div className="topico">
          <p>Todos os Produtos</p>
        </div>
        <div className="rowcards">
          {currentProducts.length === 0 ? (
            <div className="no-products">Nenhum produto encontrado.</div>
          ) : (
            currentProducts.map(item => (
              <Link key={item.idProduct} to={`/produto/${item.idProduct}`} className="card-link">
                <div className="product-card">
                  <div className="product-image">
                    {item.imageProduct ? (
                      <img 
                        src={`http://localhost:5000/${item.imageProduct}`} 
                        alt={item.nameProduct} 
                      />
                    ) : (
                      <div className="no-image">Imagem não disponível</div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{item.nameProduct || 'Nome indisponível'}</h3>
                    <div className="product-price">
                      <span className="current-price">
                        {item.priceProduct ? `R$ ${item.priceProduct}` : 'Preço não disponível'}
                      </span>
                      <span className="installment">{item.descriptionProduct || 'Descrição não disponível'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={data.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default CardProduct;
