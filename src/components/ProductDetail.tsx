import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(
    () => {
      const fetchProduct = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:4000/api/product/${productId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          setProduct(response.data.product);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      fetchProduct();
    },
    [productId]
  );

  if (!product) {
    return <p>Loading product details...</p>;
  }

  // Check if 'product' is not 'never' type
  if (typeof product !== "object") {
    return <p>Error: Invalid product details.</p>;
  }

  return (
    <div>
      <h2>
        {product.title}
      </h2>
      <p>
        Description: {product.description}
      </p>
      <p>
        Price: {product.price}
      </p>
    </div>
  );
};

export default ProductDetail;
