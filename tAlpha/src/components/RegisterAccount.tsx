import React, { useState } from 'react';
import { api } from '../service/api';
import { useNavigate } from 'react-router-dom';
import './RegisterAccount.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegisterAccount = () => {
  const [name, setName] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/register', {
        name,
        taxNumber,
        mail,
        phone,
        password,
      });
      console.log(response.data)
      toast.success('Conta registrada com sucesso!');
      navigate('/Home'); 
    } catch (error) {
      toast.error('Erro ao registrar a conta. Verifique os dados e tente novamente.');
      console.error("Erro:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="register-container">
      <form className="registerForm" onSubmit={handleRegister}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            value={taxNumber}
            onChange={(e) => setTaxNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Telefone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};
