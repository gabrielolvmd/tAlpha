
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../service/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const DeleteProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleDeleteProduct = async () => {
    try {
      await api.delete(`/api/products/delete-product/${id}`);

      toast.success("Produto deletado com sucesso!");
      navigate("/ProductsList");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'Erro ao deletar produto.');
        console.error("Erro:", error.message);
      } else {
        toast.error('Erro inesperado ao deletar produto.');
        console.error("Erro desconhecido:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate("/ProductsList");
  };

  return (
    <div className="delete-product-container">
      <h2>Deletar Produto</h2>
      <p>Você tem certeza que deseja deletar este produto?</p>
      <button onClick={handleDeleteProduct} className="confirm-delete-button">
        Confirmar
      </button>
      <button onClick={handleCancel} className="cancel-delete-button">
        Cancelar
      </button>
    </div>
  );
};
