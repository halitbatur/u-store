import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const FETCH_INFO = {
  products: "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/",
  categories:
    "https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/",
};

export default function HomePage() {
  const fetchProducts = async () => {
    const requests = Object.values(FETCH_INFO).map((url) => axios.get(url));
    return Promise.all(requests).then((res) => res.map((r) => r.data));
  };

  const { data, isLoading, isError } = useQuery("homepage", fetchProducts);

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
    </div>
  );
}
