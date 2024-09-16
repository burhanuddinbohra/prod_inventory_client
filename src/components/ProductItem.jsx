import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function ProductItem({ product }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false); // State to check if the user is the owner

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // If no token, don't make the request
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Check if the logged-in user is the owner of the product
        setIsOwner(res.data._id === product.createdBy);
      } catch (err) {
        console.error("Error fetching user:", err);
        setIsOwner(false);
      }
    };

    fetchUser();
  }, [product.createdBy]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/products/${product._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Optionally use a callback to remove the product from the list in parent component
      window.location.reload(); // Refresh to reflect changes
    } catch (err) {
      setError("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 border rounded mb-4 shadow">
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-gray-800">Price: ₹{product.price}</p>
      <p className="text-gray-800">Description: {product.description}</p>
      <p className="text-gray-600">Category: {product.category}</p>
      <p className="text-gray-600">Stock: {product.stock}</p>
      <div className="mt-4 flex space-x-4">
        {isOwner && (
          <>
            <Link
              to={`/products/edit/${product._id}`}
              className="flex items-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
              </svg>
              Edit
            </Link>

            <button
              onClick={handleDelete}
              className={`flex items-center bg-red-500 text-white p-2 rounded  ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600 duration-300"
              }`}
              disabled={loading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>

              {loading ? "Deleting..." : "Delete"}
            </button>
          </>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default ProductItem;
