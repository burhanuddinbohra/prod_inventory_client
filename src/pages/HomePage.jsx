import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Pagination state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const productsPerPage = 8; // 8 products (4 per row in 2 rows)

  useEffect(() => {
    // Fetch all products
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false); // Mark loading as complete
      }
    };
    fetchProducts();
  }, []);

  const toggleAccordion = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculation
  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Show loading state while fetching products
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name or category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 pl-10 w-full"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500">No products available</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded shadow-md transition-all duration-500 ease-in-out"
              >
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-gray-700">Price: ₹{product.price}</p>

                <div
                  className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                    expandedProduct === product._id ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="border-t-2 mt-3 text-gray-600">
                    Category: {product.category}
                  </p>
                  <p className="mt-1 text-gray-600">
                    Description: {product.description}
                  </p>
                  <p className="mt-1 text-gray-600">Stock: {product.stock}</p>
                </div>

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  onClick={() => toggleAccordion(product._id)}
                >
                  {expandedProduct === product._id ? "Less" : "More"}
                </button>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={"flex justify-center mt-4"}
            pageClassName={"mx-1"}
            pageLinkClassName={
              "px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 duration-300"
            }
            previousClassName={"mx-1"}
            previousLinkClassName={
              "px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 duration-300"
            }
            nextClassName={"mx-1"}
            nextLinkClassName={
              "px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 duration-300"
            }
            breakClassName={"mx-1"}
            breakLinkClassName={"px-3 py-1 bg-gray-200 rounded-md"}
            activeClassName={"bg-blue-500 text-white"}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
