import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './styles/header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './components/AuthContext';

const Header = () => {
    const { isAuthenticated, isAdmin, username, logout } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setQuery('');
        const token = localStorage.getItem('token');
        if (isAuthenticated) {
            axios.get('http://localhost:5000/cart', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => setCartItems(response.data))
            .catch(error => console.error('Erro ao buscar dados:', error));
        }
    }, [isAuthenticated, isAdmin, cartItems]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') 
            handleSearch();
    };

    const handleSearch = () => {
        navigate(`/search?query=${encodeURIComponent(query)}`);
    };

    const handleClickQueryUpdate = () => {
        setQuery('')
    }

    return (
        <header className="header">
            <div className="containerr">
                <div className="logo">
                    <Link to={'/'} onClick={handleClickQueryUpdate}><img src="logo.png" alt="Logo" /></Link>
                </div>
                <nav className="nav-links">
                    <Link to={'/categoria/Vestido'} onClick={handleClickQueryUpdate}>Vestidos</Link>
                    <Link to={'/categoria/Calca'} onClick={handleClickQueryUpdate}>Calças</Link>
                    <Link to={'/categoria/Camisa'} onClick={handleClickQueryUpdate}>Camisas</Link>
                    <Link to={'/categoria/Macacao'} onClick={handleClickQueryUpdate}>Macacões</Link>
                </nav>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="O que você procura?"
                        className="search-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}/>
                    <button className="search-button" onClick={handleSearch}>🔍</button>
                </div>
                <a className='swagger' href='http://localhost:5000/api-docs'>Swagger</a>
                <div className="icons">
                    {isAuthenticated ? (
                        <>
                            {isAdmin == 'true' ? (
                                <>
                                    <Link to={'/adminProducts'} className='adminsitracao'>ADMINISTRAÇÃO</Link>
                                </>
                            ) : (
                                <>
                                    <p>👤{username}</p>
                                    <Link to="/carrinho">🛒({cartItems.length})</Link>
                                </>
                            )}
                            <button onClick={logout}>Sair</button>
                        </>
                    ) : (
                        <>
                            <Link to={`/loginUser`} className="card-link">
                                <button className='button-sign'>
                                    Entrar
                                    <div className="arrow-wrapper">
                                        <div className="arrow"></div>
                                    </div>
                                </button>
                            </Link>
                            <Link to={'/cadastroUser'} className="card-link">
                                <button className='button-sign'>
                                    Cadastrar-se
                                    <div className="arrow-wrapper">
                                        <div className="arrow"></div>
                                    </div>
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
