import React, { useEffect, useState } from "react";
import { api } from "../service/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./ProductsList.css";

interface Product {
  id: number;
  name: string;
  price: number;
}

export const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const response = await api.get('/api/products/get-all-products');

        setProducts(response.data.data.products);

      } catch (error) {
        toast.error(error.response?.data?.message || 'Erro ao carregar produtos.');
        console.error("Erro:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdate = (id: number) => {
    navigate(`/UpdateProduct/${id}`);
  };

  const handleDelete = (id: number) => {
    navigate(`/DeleteProduct/${id}`);
  };

  const handleDetails = (id: number) => {
    navigate(`/ProductDetails/${id}`);
  };

  return (
    <div className="products-list-container">
      <h1>Lista de Produtos</h1>

      <Link to="/AddProduct" className="add-product-button">
        Cadastrar Novo Produto
      </Link>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="products-list">
          {products.length > 0 ? (
            products.map((product) => (
              <li key={product.id} className="product-item">
                <h2>{product.name}</h2>
                <p>Preço: R$ {product.price.toFixed(2)}</p>
                <div className="product-actions">
                  <button onClick={() => handleDetails(product.id)} className="details-product-button">
                    Mostrar Detalhes
                  </button>
                  <button onClick={() => handleUpdate(product.id)} className="update-product-button">
                    Atualizar Produto
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="delete-product-button">
                    Deletar Produto
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </ul>
      )}
    </div>
  );
};
