import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { API_URLS } from "../constants/apiUrls.js";

export default function HomePage() {
  const navigate = useNavigate();
  const fetchProductsWithCategories = async () => {
    console.log("IS FETCHING");
    const requests = Object.values(API_URLS).map((url) => axios.get(url));
    return Promise.all(requests).then((res) => res.map((r) => r.data));
  };
  console.log("hello there");
  const { data, isLoading, isError, isStale } = useQuery(
    "homepage",
    fetchProductsWithCategories
  );
  console.log(isStale);
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <div> loadings</div>
      ) : (
        <div>
          {data[0].map((product) => (
            <Link to={`/product/${product.id}`}>
              <div>{product.name}</div>
            </Link>
          ))}
        </div>
      )}
      <Button variant="dark" size="lg" onClick={() => navigate("/create")}>
        ADD ITEM
      </Button>
    </div>
  );
}
