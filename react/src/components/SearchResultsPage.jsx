import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import '../styles/card.css';

const SearchResultsPage = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query') || '';

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:5000/api/search?query=${encodeURIComponent(searchQuery)}`);
                setResults(response.data);
            } catch (error) {
                console.error('Erro ao buscar resultados:', error);
                setError('Erro ao buscar resultados. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        if (searchQuery) {
            fetchResults();
        } else {
            setResults([]);
            setLoading(false);
        }
    }, [searchQuery]);

    if (loading) return <p>Carregando...</p>;

    return (
        <div className="container">
            <div className="topico">
                <p>Resultados para '{searchQuery}'</p>
            </div>
            <div className="rowcards">
                {error ? (
                    <p>{error}</p>
                ) : results.length > 0 ? (
                    results.map(item => (
                        <Link key={item.idProduct} to={`/produto/${item.idProduct}`} className="card-link">
                            <div className="product-card">
                                <div className="product-image">
                                    <img src={`http://localhost:5000/${item.imageProduct}`} alt={item.nameProduct} />
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
                ) : (
                    <p>Nenhum resultado encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResultsPage;
