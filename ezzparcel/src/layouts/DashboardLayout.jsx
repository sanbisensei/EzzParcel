// import { NavLink, Outlet } from "react-router";
// import EzzParcelLogo from "../Pages/Shared/EzzParcelLogo/EzzParcelLogo";
// import useUserRole from "../hooks/useUserRole";

// const DashboardLayout = () => {
//   // Shared styling for links to keep code dry and consistent
//   const navLinkClasses = ({ isActive }) =>
//     `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
//       isActive
//         ? "bg-primary text-primary-content shadow-md"
//         : "text-base-content hover:bg-base-200"
//     }`;

//   const { role, isLoading } = useUserRole();

//   // Show loading spinner while fetching role
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="drawer lg:drawer-open font-sans bg-base-200 min-h-screen">
//       <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

//       {/* --- Main Content Area --- */}
//       <div className="drawer-content flex flex-col">
//         {/* Mobile Navbar (Hidden on LG) */}
//         <div className="w-full navbar bg-base-100 sticky top-0 z-30 lg:hidden shadow-md">
//           <div className="flex-none">
//             <label
//               htmlFor="dashboard-drawer"
//               aria-label="open sidebar"
//               className="btn btn-square btn-ghost"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 className="inline-block w-6 h-6 stroke-current"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 ></path>
//               </svg>
//             </label>
//           </div>
//           <div className="flex-1 px-2 mx-2 font-semibold text-lg">
//             Dashboard
//           </div>
//           <div className="flex-none">
//             <span className="badge badge-primary badge-sm">{role}</span>
//           </div>
//         </div>

//         {/* Dynamic Page Content */}
//         <main className="flex-1 p-6 md:p-10">
//           <Outlet />
//         </main>
//       </div>

//       {/* --- Sidebar --- */}
//       <div className="drawer-side z-40">
//         <label
//           htmlFor="dashboard-drawer"
//           aria-label="close sidebar"
//           className="drawer-overlay"
//         ></label>

//         <aside className="menu p-6 w-72 min-h-full bg-base-100 text-base-content flex flex-col shadow-xl">
//           {/* Logo Section */}
//           <div className="mb-8 pl-2">
//             <EzzParcelLogo />
//           </div>

//           {/* Role Badge */}
//           <div className="mb-4 pl-2">
//             <span className="badge badge-primary">{role || "user"}</span>
//           </div>

//           {/* Navigation Menu */}
//           <ul className="space-y-2 flex-1">
//             <li>
//               <NavLink to="/" className={navLinkClasses}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                   />
//                 </svg>
//                 Home
//               </NavLink>
//             </li>

//             {/* My Parcels - User & Admin */}
//             {(role === "user" || role === "admin" || !role) && (
//               <li>
//                 <NavLink to="/dashboard/myparcels" className={navLinkClasses}>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
//                     />
//                   </svg>
//                   My Parcels
//                 </NavLink>
//               </li>
//             )}

//             {/* Payment History - User only */}
//             {(role === "user" || !role) && (
//               <li>
//                 <NavLink
//                   to="/dashboard/paymentHistory"
//                   className={navLinkClasses}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   Payment History
//                 </NavLink>
//               </li>
//             )}

//             {/* Track Parcel - User only */}
//             {(role === "user" || !role) && (
//               <li>
//                 <NavLink to="/dashboard/TrackParcel" className={navLinkClasses}>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13v-6m0-4V3m0 4l5.447 2.724A1 1 0 0015 16.382V5.618a1 1 0 00-1.447-.894L9 7m0 0l6 3m-6-3L3 4m6 3l6 3"
//                     />
//                   </svg>
//                   Track a package
//                 </NavLink>
//               </li>
//             )}

//             {/* Update Profile - All roles */}
//             <li>
//               <NavLink to="/dashboard/profile" className={navLinkClasses}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                   />
//                 </svg>
//                 Update Profile
//               </NavLink>
//             </li>

//             {/* Active Riders - Admin only */}
//             {role === "admin" && (
//               <li>
//                 <NavLink
//                   to="/dashboard/ActiveRiders"
//                   className={navLinkClasses}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   Active Riders
//                 </NavLink>
//               </li>
//             )}

//             {/* Pending Riders - Admin only */}
//             {role === "admin" && (
//               <li>
//                 <NavLink
//                   to="/dashboard/PendingRiders"
//                   className={navLinkClasses}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                     />
//                   </svg>
//                   Pending Riders
//                 </NavLink>
//               </li>
//             )}

//             {/* Assign Rider - Admin only */}
//             {role === "admin" && (
//               <li>
//                 <NavLink to="/dashboard/assignrider" className={navLinkClasses}>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
//                     />
//                   </svg>
//                   Assign Rider
//                 </NavLink>
//               </li>
//             )}

//             {/* Manage Admins - Admin only */}
//             {role === "admin" && (
//               <li>
//                 <NavLink
//                   to="/dashboard/ManageAdmins"
//                   className={navLinkClasses}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   Manage Admins
//                 </NavLink>
//               </li>
//             )}
//           </ul>

//           {/* Footer */}
//           <div className="mt-auto border-t border-base-300 pt-4 text-xs text-base-content/50 text-center">
//             &copy; 2025 EzzParcel
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import { NavLink, Outlet } from "react-router";
import EzzParcelLogo from "../Pages/Shared/EzzParcelLogo/EzzParcelLogo";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  // Neo Brutalism styling for links
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 transition-all duration-200 font-black uppercase border-2 border-black ${
      isActive
        ? "bg-primary text-primary-content shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
        : "bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
    }`;

  const { role, isLoading } = useUserRole();

  // Show loading spinner while fetching role
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-yellow-300">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open font-sans min-h-screen bg-yellow-300">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* --- Main Content Area --- */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar (Hidden on LG) */}
        <div className="w-full navbar bg-white border-b-4 border-black sticky top-0 z-30 lg:hidden shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost border-2 border-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-black text-lg uppercase">
            Dashboard
          </div>
          <div className="flex-none">
            <span className="badge badge-primary border-2 border-black font-black uppercase">
              {role}
            </span>
          </div>
        </div>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 md:p-10">
          <Outlet />
        </main>
      </div>

      {/* --- Sidebar --- */}
      <div className="drawer-side z-40">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <aside className="menu p-6 w-72 min-h-full bg-white text-black flex flex-col border-r-4 border-black">
          {/* Logo Section */}
          <div className="mb-8 pl-2">
            <EzzParcelLogo />
          </div>

          {/* Role Badge */}
          <div className="mb-4 pl-2">
            <span className="badge badge-primary border-2 border-black font-black uppercase">
              {role || "user"}
            </span>
          </div>

          {/* Navigation Menu */}
          <ul className="space-y-3 flex-1">
            <li>
              <NavLink to="/" className={navLinkClasses}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </NavLink>
            </li>

            {/* My Parcels - User & Admin */}
            {(role === "user" || role === "admin" || !role) && (
              <li>
                <NavLink to="/dashboard/myparcels" className={navLinkClasses}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  My Parcels
                </NavLink>
              </li>
            )}

            {/* Payment History - User only */}
            {(role === "user" || !role) && (
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={navLinkClasses}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Payment History
                </NavLink>
              </li>
            )}

            {/* Track Parcel - All roles */}
            <li>
              <NavLink to="/dashboard/TrackParcel" className={navLinkClasses}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13v-6m0-4V3m0 4l5.447 2.724A1 1 0 0015 16.382V5.618a1 1 0 00-1.447-.894L9 7m0 0l6 3m-6-3L3 4m6 3l6 3"
                  />
                </svg>
                Track a package
              </NavLink>
            </li>

            {/* Update Profile - All roles */}
            {/* <li>
              <NavLink to="/dashboard/profile" className={navLinkClasses}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Update Profile
              </NavLink>
            </li> */}

            {/* Pending Deliveries - Rider only */}
            {role === "rider" && (
              <li>
                <NavLink
                  to="/dashboard/PendingDeliveries"
                  className={navLinkClasses}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                  Pending Deliveries
                </NavLink>
              </li>
            )}

            {/* Completed Deliveries - Rider*/}
            {role === "rider" && (
              <li>
                <NavLink
                  to="/dashboard/CompletedDeliveries"
                  className={navLinkClasses}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Completed Deliveries
                </NavLink>
              </li>
            )}

            {/* My Earnings - Rider only */}
            {role === "rider" && (
              <li>
                <NavLink to="/dashboard/myEarnings" className={navLinkClasses}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                  My Earnings
                </NavLink>
              </li>
            )}

            {/* Active Riders - Admin only */}
            {role === "admin" && (
              <li>
                <NavLink
                  to="/dashboard/ActiveRiders"
                  className={navLinkClasses}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Active Riders
                </NavLink>
              </li>
            )}

            {/* Pending Riders - Admin only */}
            {role === "admin" && (
              <li>
                <NavLink
                  to="/dashboard/PendingRiders"
                  className={navLinkClasses}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Pending Riders
                </NavLink>
              </li>
            )}

            {/* Assign Rider - Admin only */}
            {role === "admin" && (
              <li>
                <NavLink to="/dashboard/assignrider" className={navLinkClasses}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  Assign Rider
                </NavLink>
              </li>
            )}

            {/* Manage Admins - Admin only */}
            {role === "admin" && (
              <li>
                <NavLink
                  to="/dashboard/ManageAdmins"
                  className={navLinkClasses}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Manage Admins
                </NavLink>
              </li>
            )}

            {/* User Feedback - User only */}
            {(role === "user" || !role) && (
              <li>
                <NavLink
                  to="/dashboard/userfeedback"
                  className={navLinkClasses}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  User Feedback
                </NavLink>
              </li>
            )}

            {/* Chat with Admin - User only */}
            {(role === "user" || !role) && (
              <li>
                <NavLink to="/dashboard/chatuser" className={navLinkClasses}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Chat with Admin
                </NavLink>
              </li>
            )}

            {/* Manage Feedback - Admin only */}
            {role === "admin" && (
              <li>
                <NavLink
                  to="/dashboard/managefeedback"
                  className={navLinkClasses}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2m6-4v4m0 0l-2-2m2 2l2-2"
                    />
                  </svg>
                  Manage Feedback
                </NavLink>
              </li>
            )}

            {/* Chat Admin - Admin only */}
            {role === "admin" && (
              <li>
                <NavLink to="/dashboard/chatadmin" className={navLinkClasses}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2m6-4v4m0 0l-2-2m2 2l2-2"
                    />
                  </svg>
                  Chat With User
                </NavLink>
              </li>
            )}

            {/* My Ratings - Rider only */}
            {role === "rider" && (
              <li>
                <NavLink to="/dashboard/myratings" className={navLinkClasses}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  My Ratings
                </NavLink>
              </li>
            )}
          </ul>

          {/* Footer */}
          <div className="mt-auto border-t-4 border-black pt-4 text-xs font-black uppercase text-center">
            &copy; 2025 EzzParcel
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
