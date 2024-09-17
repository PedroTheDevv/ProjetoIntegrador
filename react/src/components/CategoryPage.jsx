import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 40;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/produtos?category=${categoryName}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="container">
      <div className="topico">
        <p>{categoryName}</p>
      </div>
      <div className="rowcards">
        {currentProducts.length === 0 ? (
          <p>Nenhum produto encontrado na categoria "{categoryName}".</p>
        ) : (
          currentProducts.map(item => (
            <Link key={item.idProduct} to={`/produto/${item.idProduct}`} className="card-link">
              <div className="product-card">
                <div className="product-image">
                  <img src={`http://localhost:5000/${item.imageProduct}`} alt={`Imagem do produto ${item.nameProduct}`} />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{item.nameProduct}</h3>
                  <div className="product-price">
                    <span className="current-price">R$ {item.priceProduct}</span>
                    <span className="installment">{item.descriptionProduct}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default CategoryPage;
