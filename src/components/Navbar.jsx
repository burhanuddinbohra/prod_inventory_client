import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null); // Ensure user is set to null on error
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [localStorage.getItem("token")]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="p-4 text-black flex justify-between items-center">
      {/* Left section with Logo and navigation links */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img
            src="/logistics.png" // Make sure this path matches where the logo is in the public folder
            alt="Logo"
            className="size-10 block transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:bg-gray-300 duration-300 p-2 rounded">
            Home
          </Link>
          <Link
            to="/products"
            className="hover:bg-gray-300 duration-300 p-2 rounded"
          >
            Products
          </Link>
          <Link
            to="/products/new"
            className="hover:bg-gray-300 duration-300 p-2 rounded"
          >
            Add Product
          </Link>
        </div>
      </div>

      {/* Right section with Login/Register or User Info/Logout */}
      <div className="flex items-center space-x-4">
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <>
            <span>{user.username || user.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white p-2 rounded hover:bg-red-700 duration-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 text-white text-center  p-2 rounded w-20 h-auto hover:bg-blue-600 duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-white text-center p-2 rounded w-20 h-auto hover:bg-green-600 duration-300"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Navbar() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setUser(null);
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:5000/api/auth/user", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUser(res.data);
//       } catch (err) {
//         console.error("Error fetching user:", err);
//         setUser(null); // Ensure user is set to null on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [localStorage.getItem("token")]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login"); // Redirect to login page
//   };

//   return (
//     <nav className="p-4 text-black flex justify-between items-center">
//       {/* Left section with Home, Products, Add Product */}
//       <div className="space-x-4">
//         <Link to="/" className="hover:bg-gray-300 duration-300 p-2 rounded">
//           Home
//         </Link>
//         <Link
//           to="/products"
//           className="hover:bg-gray-300 duration-300 p-2 rounded"
//         >
//           Products
//         </Link>
//         <Link
//           to="/products/new"
//           className="hover:bg-gray-300 duration-300 p-2 rounded"
//         >
//           Add Product
//         </Link>
//       </div>

//       {/* Right section with Login/Register or User Info/Logout */}
//       <div className="flex items-center space-x-4">
//         {loading ? (
//           <p>Loading...</p>
//         ) : user ? (
//           <>
//             <span>{user.username || user.email}</span>
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 bg-red-500 text-white p-2 rounded hover:bg-red-700 duration-500"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="size-5"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
//                 />
//               </svg>
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="bg-blue-500 text-white text-center  p-2 rounded w-20 h-auto hover:bg-blue-600 duration-300"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="bg-green-500 text-white text-center p-2 rounded w-20 h-auto hover:bg-green-600 duration-300"
//             >
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
