import axios from "axios";
import React from "react";
import { useMutation } from "react-query";

export default function NewProductPage() {
  const createProductMutation = () => {
    // use axios to post to the server
  };
  const createProduct = useMutation(createProductMutation);
  // form to create new product
  return <div>NewProductPage</div>;
}
