import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../service/api";
import "./Home.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Home = () => {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/login", {
        taxNumber: cpf,
        password: password,
      });
      
      const token = response.data.data.token;

      if (!token) {
        throw new Error("Token não encontrado na resposta da API.");
      }
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      toast.success("Login realizado com sucesso!");
      navigate("/ProductsList");
    } catch (error) {
      toast.error('Erro ao tentar realizar login.');
    }
  };

  return (
    <div className="home-container">
      <form className="loginForm" onSubmit={handleLogin}>
        <div>
          <label>CPF</label>
          <input
            id="cpf"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            id="senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Entrar</button>
        <button
          type="button"
          onClick={() => {
            navigate("RegisterAccount");
          }}
        >
          Criar conta
        </button>
      </form>
    </div>
  );
};
