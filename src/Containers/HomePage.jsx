import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import {
  Button,
  Form,
  InputGroup,
  FormControl,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { API_URLS } from "../constants/apiUrls.js";
import ProductCard from "../Components/ProductCard.jsx";
import { FaPlusCircle } from "react-icons/fa";
export default function HomePage() {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState("Categories");
  const [searchBarValue, setSearchBarValue] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const changeSearchValue = (value) => {
    setSearchBarValue(value);
  };

  React.useEffect(() => {
    const delaySearchResults = setTimeout(() => {
      setSearchValue(searchBarValue);
    }, 1000);

    return () => clearTimeout(delaySearchResults);
  }, [searchBarValue]);

  const fetchProductsWithCategories = async () => {
    const requests = Object.values(API_URLS).map((url) => axios.get(url));
    return Promise.all(requests).then((res) => res.map((r) => r.data));
  };

  const { data, isLoading } = useQuery(
    "productsWithCategories",
    fetchProductsWithCategories
  );

  return (
    <div>
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
        <div>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="container mt-5"
          >
            <InputGroup className="mb-3" style={{ width: "25%" }}>
              <FormControl
                placeholder="Search for a character"
                aria-label="Chracter Name"
                aria-describedby="basic-addon2"
                value={searchBarValue}
                onChange={(e) => changeSearchValue(e.target.value)}
              />
            </InputGroup>

            <Form.Select
              className="mb-3"
              style={{ width: "25%" }}
              aria-label="Default select example"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>Categories</option>
              {data &&
                data[1].map(({ name, id }) => {
                  return (
                    <option value={name} key={id}>
                      {name}
                    </option>
                  );
                })}
            </Form.Select>
          </div>
          <div className="d-flex container justify-content-center flex-wrap flex-row mt-5">
            {data[0]
              .filter((product) => {
                if (
                  !product.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                ) {
                  return false;
                }
                if (product.category !== filter && filter !== "Categories") {
                  return false;
                }
                return true;
              })
              .map((product) => (
                <ProductCard {...product} key={product.id} />
              ))}
          </div>
        </div>
      )}

      <FaPlusCircle
        size="1.5em"
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          fontSize: "50px",
          borderRadius: "60%",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={() => navigate("/create")}
      />
    </div>
  );
}
