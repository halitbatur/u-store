import React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ name, avatar, price, id }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexBasis: "25%",
        cursor: "pointer",
      }}
      onClick={() => {
        navigate(`/product/${id}`);
      }}
    >
      <Image
        src={avatar}
        style={{ width: "200px", height: "200px", borderRadius: "10px" }}
      />
      <p style={{ justifySelf: "start" }}>
        {name.split(" ").slice(0, 3).join(" ")}
      </p>
      <p>{price + "$"}</p>
    </div>
  );
}
