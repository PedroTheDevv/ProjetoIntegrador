import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/cadastroUsuario.css';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/cadastroUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, password }),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        setNome('');
        setPassword('');
        setEmail('');
      } else {
        alert(`Erro ao realizar o cadastro`);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao realizar o cadastro.');
    }
  };

  return (
    <div className="signup-container">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Cadastre-se</p>
        <div className="input-container">
          <input
            placeholder="Digite seu nome"
            type="text"
            id="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
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
            type={passwordShown ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </span>
        </div>
        <button className="submit" type="submit">
          Cadastrar-se
        </button>

        <p className="signup-link">
          Já tem uma conta?&nbsp;&nbsp;
          <Link to={'/loginUser'}>Entrar</Link>
        </p>
      </form>
    </div>
  );
}

export default CadastroUsuario;
