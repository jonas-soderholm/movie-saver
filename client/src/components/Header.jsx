// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../utils/AuthContext";

// function Header() {
//   const { authTokens, logoutUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const logoutHandler = () => {
//     logoutUser();
//     navigate("/login");
//   };

//   return (
//     <header className="dark:bg-neutral-800 text-white sticky top-0 z-50">
//       <div className="p-3 flex justify-between mx-1">
//         <div className="flex items-center">
//           <a href="/" className="md:text-2xl text-1xl text-slate-200">
//             Saveer
//           </a>
//         </div>
//         <div className="flex items-center md:gap-10 gap-4">
//           <a href="/profile" className="md:text-1xl text-1xl text-slate-200">
//             My Profile
//           </a>
//           {authTokens ? (
//             <>
//               <a onClick={logoutHandler} className="md:text-1xl text-1xl text-slate-200 cursor-pointer">
//                 Logout
//               </a>
//             </>
//           ) : (
//             <>
//               <a href="/login" className="md:text-1xl text-1xl text-slate-200">
//                 Login
//               </a>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

function Header() {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (accessToken && refreshToken) {
      setTokens({ access: accessToken, refresh: refreshToken });
    } else {
      setTokens(null);
    }
  }, [authTokens]);

  const logoutHandler = () => {
    logoutUser();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setTokens(null);
    navigate("/login");
  };

  return (
    <header className="dark:bg-neutral-800 text-white sticky top-0 z-50">
      <div className="p-3 flex justify-between mx-1">
        <div className="flex items-center">
          <a href="/" className="md:text-2xl text-1xl text-slate-200">
            Saveer
          </a>
        </div>
        <div className="flex items-center md:gap-10 gap-4">
          <a href="/profile" className="md:text-1xl text-1xl text-slate-200">
            My Profile
          </a>
          {tokens ? (
            <>
              <a onClick={logoutHandler} className="md:text-1xl text-1xl text-slate-200 cursor-pointer">
                Logout
              </a>
            </>
          ) : (
            <>
              <a href="/login" className="md:text-1xl text-1xl text-slate-200">
                Login
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
