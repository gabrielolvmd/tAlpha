import React, { useState } from "react";
import { api } from "../service/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    });
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post('/api/products/create-product', formData);

      toast.success("Produto cadastrado com sucesso!");
      navigate('/ProductsList');

      setFormData({
        name: '',
        description: '',
        price: 0,
        stock: 0
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'Erro ao cadastrar produto.');
        console.error("Erro:", error.message);
      } else {
        toast.error('Erro inesperado ao cadastrar produto.');
        console.error("Erro desconhecido:", error);
      }
    }
  };

  return (
    <div className="add-product-form">
      <h2>Cadastrar Novo Produto</h2>
      <form onSubmit={handleAddProduct}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Descrição</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Preço</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label>Quantidade em Estoque</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
            min="0"
          />
        </div>
        <button type="submit">Cadastrar Produto</button>
      </form>
    </div>
  );
};
