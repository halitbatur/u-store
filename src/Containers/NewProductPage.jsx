import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Form, Button, InputGroup } from "react-bootstrap";
import { API_URLS } from "../constants/apiUrls.js";

export default function NewProductPage() {
  const { data, isLoading, isError } = useQuery("categories", () =>
    axios.get(API_URLS.categories).then((res) => res.data)
  );

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "Categories",
    imgUrl: "",
    description: "",
  });

  const changeNewProduct = (value, key) => {
    setNewProduct({ ...newProduct, [key]: value });
  };

  const createProductMutation = () => {
    axios.post(API_URLS.products, newProduct);
  };

  const createProduct = useMutation(createProductMutation);
  // form to create new product
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      event.preventDefault();
      createProduct.mutate();
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }} className="mt-5">
        Create Product
      </h3>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        style={{
          width: "25%",
          margin: "auto",
          paddingTop: "50px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Form.Group md="4" controlId="validationCustom01" className="mb-3">
          <Form.Control
            required
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => {
              changeNewProduct(e.target.value, "name");
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="4" controlId="validationCustom02" className="mb-3">
          <Form.Control
            required
            type="text"
            as="textarea"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => {
              changeNewProduct(e.target.value, "description");
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please choose an Image URL.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          md="4"
          controlId="validationCustomImageURL"
          className="mb-3"
        >
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Image URL"
              required
              value={newProduct.imgUrl}
              onChange={(e) => {
                changeNewProduct(e.target.value, "imgUrl");
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please choose an Image URL.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group
          md="4"
          controlId="validationCustomCategory"
          className="mb-3"
        >
          <Form.Select
            aria-label="Default select example"
            value={newProduct.category}
            onChange={(e) => {
              changeNewProduct(e.target.value, "category");
            }}
          >
            <option>Categories</option>
            {data &&
              data.map(({ name, id }) => {
                return (
                  <option value={name} key={id}>
                    {name}
                  </option>
                );
              })}
          </Form.Select>
        </Form.Group>

        <Form.Group md="6" controlId="validationCustom03" className="mb-3">
          <Form.Control
            type="number"
            placeholder="Price"
            required
            value={newProduct.price}
            onChange={(e) => {
              changeNewProduct(e.target.value, "price");
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Price.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
    </div>
  );
}
