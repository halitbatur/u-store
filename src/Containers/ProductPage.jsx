import React from "react";
import { useParams } from "react-router";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router";

export default function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const deleteProductMutation = () => {
    axios.delete(
      `https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/${id}`
    );
  };
  const deleteProduct = useMutation(deleteProductMutation, {
    onSuccess: () => {
      navigate("/");
    },
  });
  return (
    <div>
      ProductPage {id}
      <button
        onClick={() => {
          deleteProduct.mutate();
        }}
      >
        Delete
      </button>
    </div>
  );
}
