import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Containers/HomePage";
import NewProductPage from "./Containers/NewProductPage";
import ProductPage from "./Containers/ProductPage";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
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
