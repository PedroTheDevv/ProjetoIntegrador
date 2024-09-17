import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/loginUsuario.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token, data.username, data.isAdmin);
        alert('Login bem-sucedido!');
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Falha no login.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro ao fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Entre com a sua conta</p>
        <div className="input-container">
          <input
            placeholder="Digite seu email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Digite sua senha"
            type={passwordShown ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span>
            <input
              type="checkbox"
              id="input-checkbox"
              aria-label="Mostrar senha"
              checked={passwordShown}
              onChange={togglePasswordVisibility}
            />
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={togglePasswordVisibility}
              aria-hidden="true"
            >
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            </svg>
          </span>
        </div>
        <button className="submit" type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        {error && alert(error)}

        <p className="signup-link">
          Novo por aqui?&nbsp;&nbsp;
          <Link to={'/cadastroUser'}>Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
