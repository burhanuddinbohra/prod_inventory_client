import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ProductItem from "../components/ProductItem";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalStock, setTotalStock] = useState(0); // State to store total stock
  const [currentPage, setCurrentPage] = useState(0); // Page index starts from 0
  const productsPerPage = 2;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : {}; // No headers if no token

        const res = await axios.get(
          "http://localhost:5000/api/products",
          config
        );
        setProducts(res.data);
        // Calculate total stock
        const total = res.data.reduce((acc, product) => acc + product.stock, 0);
        setTotalStock((prevtotal) => total);
      } catch (err) {
        console.error("Error fetching products:", err);
        // If token-based fetch fails, navigate to home
        if (err.response?.status === 400) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [navigate]);

  // Pagination calculation
  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <div className="text-right">
          <p className="text-gray-700 font-bold">Total Stock: {totalStock}</p>{" "}
        </div>
      </div>

      <div className="mt-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No products found</p>
        )}
      </div>
      <Link
        to="/products/new"
        className="bg-blue-500 text-center text-white p-2 rounded-md w-full block hover:bg-blue-600 duration-300"
      >
        Add Product
      </Link>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(products.length / productsPerPage)}
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
    </div>
  );
}

export default ProductList;
