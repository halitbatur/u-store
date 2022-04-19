import React from "react";
import { useParams } from "react-router";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import { Spinner, Image, Button } from "react-bootstrap";
import { fetchSingleProduct, deleteProduct } from "../utils/fetch";

export default function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const deleteProductMutation = useMutation(() => deleteProduct(id), {
    onSuccess: () => {
      navigate("/");
    },
  });

  const { data, isLoading, isError } = useQuery(`product${id}`, () =>
    fetchSingleProduct(id)
  );

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
              deleteProductMutation.mutate();
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
