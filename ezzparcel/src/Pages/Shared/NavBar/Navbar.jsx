// import { Link, NavLink } from "react-router";
// import { useState, useEffect } from "react";
// import EzzParcelLogo from "../EzzParcelLogo/EzzParcelLogo";
// import useAuth from "../../../hooks/useAuth";
// import defaultCat from "../../../assets/default-cat.png";

// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") || "fantasy"
//   );

//   const themes = [
//     "light",
//     "dark",
//     "cupcake",
//     "bumblebee",
//     "emerald",
//     "corporate",
//     "synthwave",
//     "retro",
//     "cyberpunk",
//     "valentine",
//     "halloween",
//     "garden",
//     "forest",
//     "aqua",
//     "lofi",
//     "pastel",
//     "fantasy",
//     "wireframe",
//     "black",
//     "luxury",
//     "dracula",
//     "cmyk",
//     "autumn",
//     "business",
//     "acid",
//     "lemonade",
//     "night",
//     "coffee",
//     "winter",
//     "dim",
//     "nord",
//     "sunset",
//   ];

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const handleThemeChange = (selectedTheme) => {
//     setTheme(selectedTheme);
//   };

//   const handleLogOut = () => {
//     logOut()
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const navItems = (
//     <>
//       <li>
//         <NavLink to="/" className="hover:text-primary transition-colors">
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/coverage"
//           className="hover:text-primary transition-colors"
//         >
//           Coverage
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/sendParcel"
//           className="hover:text-primary transition-colors"
//         >
//           Send a Parcel
//         </NavLink>
//       </li>
//       {user && (
//         <>
//           <li>
//             <NavLink
//               to="/dashboard"
//               className="hover:text-primary transition-colors"
//             >
//               Dashboard
//             </NavLink>
//           </li>
//         </>
//       )}
//       <li>
//         <NavLink
//           to="/BeARider"
//           className="hover:text-primary transition-colors"
//         >
//           Be A Rider
//         </NavLink>
//       </li>
//       <li>
//         <NavLink to="/">About Us</NavLink>
//       </li>
//     </>
//   );

//   return (
//     <div className="bg-base-100 shadow-md sticky top-0 z-50 rounded-3xl">
//       <div className="navbar max-w-7xl mx-auto px-4">
//         <div className="navbar-start">
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h8m-8 6h16"
//                 />
//               </svg>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl"
//             >
//               {navItems}
//             </ul>
//           </div>
//           <EzzParcelLogo></EzzParcelLogo>
//         </div>
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1 gap-1 font-medium">
//             {navItems}
//           </ul>
//         </div>
//         <div className="navbar-end flex gap-2">
//           {/* Theme Changer Dropdown */}
//           <div className="dropdown dropdown-end">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
//                 />
//               </svg>
//             </div>
//             <ul
//               tabIndex={0}
//               className="dropdown-content z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52 max-h-96 overflow-y-auto mt-3"
//             >
//               {themes.map((themeName) => (
//                 <li key={themeName}>
//                   <button
//                     onClick={() => handleThemeChange(themeName)}
//                     className={`w-full text-left px-4 py-2 hover:bg-base-200 rounded capitalize ${
//                       theme === themeName
//                         ? "bg-primary text-primary-content"
//                         : ""
//                     }`}
//                   >
//                     {themeName}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* pic */}
//           {user && (
//             <img
//               src={user?.photoURL ? user.photoURL : defaultCat}
//               alt="Profile"
//               className="w-14 h-14 rounded-full border-4 border-primary shadow-md object-cover"
//             />
//           )}

//           {/* pic */}

//           <div onClick={handleLogOut}>
//             {user ? (
//               <button className="btn btn-primary hover:btn-accent transition-all ease-in-out duration-500">
//                 Log Out
//               </button>
//             ) : (
//               <Link
//                 to="/login"
//                 className="btn btn-primary hover:btn-accent transition-all ease-in-out duration-500"
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { Link, NavLink } from "react-router";
import { useState, useEffect } from "react";
import EzzParcelLogo from "../EzzParcelLogo/EzzParcelLogo";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import defaultCat from "../../../assets/default-cat.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "fantasy"
  );
  const { role } = useUserRole();

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className="hover:text-primary transition-colors font-bold"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage"
          className="hover:text-primary transition-colors font-bold"
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/sendParcel"
          className="hover:text-primary transition-colors font-bold"
        >
          Send a Parcel
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard"
              className="hover:text-primary transition-colors font-bold"
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
      {role !== "admin" && (
        <li>
          <NavLink
            to="/BeARider"
            className="hover:text-primary transition-colors font-bold"
          >
            Be A Rider
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/aboutus" className="font-bold">
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden border-2 border-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-[3]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 z-[1] mt-3 w-52 p-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              {navItems}
            </ul>
          </div>
          <EzzParcelLogo></EzzParcelLogo>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1 font-black">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end flex gap-2">
          {/* Theme Changer Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-[3]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] p-2 bg-base-100 w-52 max-h-96 overflow-y-auto mt-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              {themes.map((themeName) => (
                <li key={themeName}>
                  <button
                    onClick={() => handleThemeChange(themeName)}
                    className={`w-full text-left px-4 py-2 hover:bg-base-200 capitalize font-bold ${
                      theme === themeName
                        ? "bg-primary text-primary-content border-2 border-black"
                        : ""
                    }`}
                  >
                    {themeName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* pic */}
          {user && (
            <img
              src={user?.photoURL ? user.photoURL : defaultCat}
              alt="Profile"
              className="w-14 h-14 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] object-cover"
            />
          )}

          {/* pic */}

          <div onClick={handleLogOut}>
            {user ? (
              <button className="btn btn-primary border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all font-black uppercase">
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all font-black uppercase"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
