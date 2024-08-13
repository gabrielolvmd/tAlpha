import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../service/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
       

        const response = await api.get(`/api/products/get-product/${id}`);

        setFormData(response.data.data);

      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || 'Erro ao carregar os detalhes do produto.');
          console.error("Erro:", error.message);
        } else {
          toast.error('Erro inesperado ao carregar os detalhes do produto.');
          console.error("Erro desconhecido:", error);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    });
  };

  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.patch(`/api/products/update-product/${id}`, formData);

      toast.success("Produto atualizado com sucesso!");
      navigate("/ProductsList");

    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'Erro ao atualizar produto.');
        console.error("Erro:", error.message);
      } else {
        toast.error('Erro inesperado ao atualizar o produto.');
        console.error("Erro desconhecido:", error);
      }
    }
  };

  return (
    <div className="update-product-form">
      <h2>Atualizar Produto</h2>
      <form onSubmit={handleUpdateProduct}>
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
        <button type="submit">Atualizar Produto</button>
      </form>
    </div>
  );
};
