import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../service/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import "./ProductDetails.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/products/get-one-product/${id}`);
        setProduct(response.data.data.product);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || 'Erro ao carregar os detalhes do produto.');
          console.error("Erro:", error.message);
        } else {
          toast.error('Erro inesperado ao carregar os detalhes do produto.');
          console.error("Erro desconhecido:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div className="product-details-container">
      <h2>Detalhes do Produto</h2>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Preço: R$ {product.price.toFixed(2)}</p>
      <p>Quantidade em Estoque: {product.stock}</p>
    </div>
  );
};
