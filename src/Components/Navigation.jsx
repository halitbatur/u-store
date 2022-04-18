import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <Navbar>
      <Container
        style={{
          backgroundColor: "#FEFEFE",
          borderRadius: "10px",
          boxShadow: "0px 2px 10px 1px rgba(0,0,0,.8)",
        }}
      >
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{ cursor: "pointer", fontStyle: "italic" }}
        >
          UPayments Store
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Register</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
