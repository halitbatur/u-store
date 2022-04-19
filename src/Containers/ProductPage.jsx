import React from "react";
import { useParams } from "react-router";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { Spinner, Image, Button } from "react-bootstrap";

export default function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchProduct = () => {
    return axios
      .get(
        `https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/${id}`
      )
      .then((res) => res.data);
  };
  const deleteProductMutation = () => {
    return axios.delete(
      `https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/${id}`
    );
  };
  const deleteProduct = useMutation(deleteProductMutation, {
    onSuccess: () => {
      navigate("/");
    },
  });

  const { data, isLoading, isError } = useQuery(`product${id}`, fetchProduct);

  return (
    <>
      {isLoading ? (
        <Spinner
          animation="border"
          variant="primary"
          style={{
            position: "absolute",
            inset: "0px",
            margin: "auto",
          }}
        />
      ) : (
        <div className="container d-flex flex-column mt-5">
          <div className="d-flex" style={{ columnGap: "25px" }}>
            <Image
              src={data.avatar}
              style={{
                height: "250px",
                borderRadius: "10px",
                flexBasis: "40%",
              }}
            />
            <div className="d-flex flex-column justify-content-between">
              <h3>{data.name}</h3>
              <h5>{data.price + "$"}</h5>
            </div>
          </div>
          <hr style={{ height: "2px", color: "black" }}></hr>
          <h3>Description</h3>
          <p>{data.description}</p>
          <Button
            variant="danger"
            onClick={() => {
              deleteProduct.mutate();
            }}
            style={{ width: "25%", margin: "auto" }}
          >
            Delete
          </Button>
        </div>
      )}
    </>
  );
}
