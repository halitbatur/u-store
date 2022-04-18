import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import HomePage from "./Containers/HomePage";
import NewProductPage from "./Containers/NewProductPage";
import ProductPage from "./Containers/ProductPage";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="App"
        style={{ background: "#ececec", minHeight: "100vh" }}
      >
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/create" element={<NewProductPage />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
