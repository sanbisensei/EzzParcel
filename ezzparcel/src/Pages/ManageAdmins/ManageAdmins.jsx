// import { useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const ManageAdmins = () => {
//   const axiosSecure = useAxiosSecure();
//   const [searchEmail, setSearchEmail] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isSearching, setIsSearching] = useState(false);

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     if (!searchEmail.trim()) {
//       Swal.fire("Error", "Please enter an email to search", "error");
//       return;
//     }

//     setIsSearching(true);
//     try {
//       const res = await axiosSecure.get(`/users/search?email=${searchEmail}`);
//       setSearchResults(res.data);

//       if (res.data.length === 0) {
//         Swal.fire("No Results", "No users found with that email", "info");
//       }
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || "Failed to search users",
//         "error"
//       );
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handleMakeAdmin = async (email, currentRole) => {
//     if (currentRole === "admin") {
//       Swal.fire("Already Admin", "This user is already an admin", "info");
//       return;
//     }

//     if (currentRole === "rider") {
//       Swal.fire({
//         title: "Cannot Promote Rider",
//         text: "Riders cannot be promoted to admin due to security and role conflict. Please remove rider status first if you want to make this user an admin.",
//         icon: "error",
//         confirmButtonColor: "#3b82f6",
//       });
//       return;
//     }

//     const result = await Swal.fire({
//       title: "Make Admin?",
//       text: `Promote ${email} to admin role?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3b82f6",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: "Yes, Make Admin",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axiosSecure.patch(`/users/${email}/make-admin`);
//         Swal.fire("Success!", "User promoted to admin", "success");

//         // Refresh search results
//         handleSearch({ preventDefault: () => {} });
//       } catch (error) {
//         Swal.fire(
//           "Error!",
//           error.response?.data?.message || "Failed to make user admin",
//           "error"
//         );
//       }
//     }
//   };

//   const handleRemoveAdmin = async (email, currentRole) => {
//     if (currentRole !== "admin") {
//       Swal.fire("Not Admin", "This user is not an admin", "info");
//       return;
//     }

//     const result = await Swal.fire({
//       title: "Remove Admin?",
//       text: `Remove admin role from ${email}?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: "Yes, Remove Admin",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axiosSecure.patch(`/users/${email}/remove-admin`);
//         Swal.fire("Success!", "Admin role removed", "success");

//         // Refresh search results
//         handleSearch({ preventDefault: () => {} });
//       } catch (error) {
//         Swal.fire(
//           "Error!",
//           error.response?.data?.message || "Failed to remove admin role",
//           "error"
//         );
//       }
//     }
//   };

//   const handleViewDetails = (user) => {
//     setSelectedUser(user);
//     document.getElementById("user_detail_modal").showModal();
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-6">Manage Admins</h1>

//       {/* Search Form */}
//       <form onSubmit={handleSearch} className="mb-6">
//         <div className="flex gap-2 max-w-md">
//           <input
//             type="email"
//             placeholder="Search by email..."
//             className="input input-bordered flex-1"
//             value={searchEmail}
//             onChange={(e) => setSearchEmail(e.target.value)}
//           />
//           <button
//             type="submit"
//             className="btn btn-primary"
//             disabled={isSearching}
//           >
//             {isSearching ? "Searching..." : "Search"}
//           </button>
//         </div>
//       </form>

//       {/* Search Results */}
//       {searchResults.length > 0 && (
//         <div className="overflow-x-auto">
//           <table className="table w-full">
//             <thead>
//               <tr className="bg-base-200">
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Created At</th>
//                 <th>Last Login</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {searchResults.map((user) => (
//                 <tr key={user._id} className="hover">
//                   <td>{user.email}</td>
//                   <td>
//                     <span
//                       className={`badge ${
//                         user.role === "admin"
//                           ? "badge-primary"
//                           : user.role === "rider"
//                           ? "badge-info"
//                           : "badge-ghost"
//                       }`}
//                     >
//                       {user.role || "user"}
//                     </span>
//                   </td>
//                   <td>
//                     {user.created_at
//                       ? new Date(user.created_at).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                   <td>
//                     {user.last_login
//                       ? new Date(user.last_login).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                   <td className="space-x-2">
//                     <button
//                       className="btn btn-sm btn-info"
//                       onClick={() => handleViewDetails(user)}
//                     >
//                       View
//                     </button>
//                     {user.role === "rider" ? (
//                       <button
//                         className="btn btn-sm btn-disabled"
//                         disabled
//                         title="Riders cannot be admins"
//                       >
//                         Cannot Promote
//                       </button>
//                     ) : user.role !== "admin" ? (
//                       <button
//                         className="btn btn-sm btn-primary"
//                         onClick={() => handleMakeAdmin(user.email, user.role)}
//                       >
//                         Make Admin
//                       </button>
//                     ) : (
//                       <button
//                         className="btn btn-sm btn-error"
//                         onClick={() => handleRemoveAdmin(user.email, user.role)}
//                       >
//                         Remove Admin
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* User Details Modal */}
//       <dialog id="user_detail_modal" className="modal">
//         <div className="modal-box">
//           <form method="dialog">
//             <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
//               ✕
//             </button>
//           </form>

//           {selectedUser && (
//             <div>
//               <h3 className="font-bold text-2xl mb-4">User Details</h3>

//               <div className="space-y-3">
//                 <div>
//                   <span className="font-medium">Email:</span>{" "}
//                   {selectedUser.email}
//                 </div>
//                 <div>
//                   <span className="font-medium">Role:</span>{" "}
//                   <span
//                     className={`badge ${
//                       selectedUser.role === "admin"
//                         ? "badge-primary"
//                         : selectedUser.role === "rider"
//                         ? "badge-info"
//                         : "badge-ghost"
//                     }`}
//                   >
//                     {selectedUser.role || "user"}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="font-medium">Created At:</span>{" "}
//                   {selectedUser.created_at
//                     ? new Date(selectedUser.created_at).toLocaleString()
//                     : "N/A"}
//                 </div>
//                 <div>
//                   <span className="font-medium">Last Login:</span>{" "}
//                   {selectedUser.last_login
//                     ? new Date(selectedUser.last_login).toLocaleString()
//                     : "N/A"}
//                 </div>
//                 {selectedUser.madeAdminAt && (
//                   <div>
//                     <span className="font-medium">Made Admin At:</span>{" "}
//                     {new Date(selectedUser.madeAdminAt).toLocaleString()}
//                   </div>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div className="flex justify-end gap-2 mt-6">
//                 {selectedUser.role === "rider" ? (
//                   <button className="btn btn-disabled" disabled>
//                     Riders Cannot Be Admins
//                   </button>
//                 ) : selectedUser.role !== "admin" ? (
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => {
//                       handleMakeAdmin(selectedUser.email, selectedUser.role);
//                       document.getElementById("user_detail_modal").close();
//                     }}
//                   >
//                     Make Admin
//                   </button>
//                 ) : (
//                   <button
//                     className="btn btn-error"
//                     onClick={() => {
//                       handleRemoveAdmin(selectedUser.email, selectedUser.role);
//                       document.getElementById("user_detail_modal").close();
//                     }}
//                   >
//                     Remove Admin
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default ManageAdmins;

import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageAdmins = () => {
  const axiosSecure = useAxiosSecure();
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchEmail.trim()) {
      Swal.fire("Error", "Please enter an email to search", "error");
      return;
    }

    setIsSearching(true);
    try {
      const res = await axiosSecure.get(`/users/search?email=${searchEmail}`);
      setSearchResults(res.data);

      if (res.data.length === 0) {
        Swal.fire("No Results", "No users found with that email", "info");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to search users",
        "error"
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleMakeAdmin = async (email, currentRole) => {
    if (currentRole === "admin") {
      Swal.fire("Already Admin", "This user is already an admin", "info");
      return;
    }

    if (currentRole === "rider") {
      Swal.fire({
        title: "Cannot Promote Rider",
        text: "Riders cannot be promoted to admin due to security and role conflict. Please remove rider status first if you want to make this user an admin.",
        icon: "error",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Make Admin?",
      text: `Promote ${email} to admin role?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Make Admin",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/${email}/make-admin`);
        Swal.fire("Success!", "User promoted to admin", "success");

        // Refresh search results
        handleSearch({ preventDefault: () => {} });
      } catch (error) {
        Swal.fire(
          "Error!",
          error.response?.data?.message || "Failed to make user admin",
          "error"
        );
      }
    }
  };

  const handleRemoveAdmin = async (email, currentRole) => {
    if (currentRole !== "admin") {
      Swal.fire("Not Admin", "This user is not an admin", "info");
      return;
    }

    const result = await Swal.fire({
      title: "Remove Admin?",
      text: `Remove admin role from ${email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Remove Admin",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/${email}/remove-admin`);
        Swal.fire("Success!", "Admin role removed", "success");

        // Refresh search results
        handleSearch({ preventDefault: () => {} });
      } catch (error) {
        Swal.fire(
          "Error!",
          error.response?.data?.message || "Failed to remove admin role",
          "error"
        );
      }
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    document.getElementById("user_detail_modal").showModal();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(e);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 border-4 border-black bg-purple-300 p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block">
        Manage Admins
      </h1>

      {/* Search Form */}
      <div className="mb-6">
        <div className="flex gap-2 max-w-md">
          <input
            type="email"
            placeholder="Search by email..."
            className="flex-1 px-4 py-2 border-4 border-black font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit(e);
              }
            }}
          />
          <button
            onClick={handleSearchSubmit}
            className="px-6 py-2 bg-blue-400 border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSearching}
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
            <thead>
              <tr className="bg-yellow-300 border-b-4 border-black">
                <th className="border-r-4 border-black p-4 text-left font-bold">
                  Email
                </th>
                <th className="border-r-4 border-black p-4 text-left font-bold">
                  Role
                </th>
                <th className="border-r-4 border-black p-4 text-left font-bold">
                  Created At
                </th>
                <th className="border-r-4 border-black p-4 text-left font-bold">
                  Last Login
                </th>
                <th className="p-4 text-left font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((user) => (
                <tr
                  key={user._id}
                  className="border-b-4 border-black hover:bg-blue-50 transition-colors"
                >
                  <td className="border-r-4 border-black p-4 font-semibold">
                    {user.email}
                  </td>
                  <td className="border-r-4 border-black p-4">
                    <span
                      className={`px-3 py-1 text-xs font-bold border-2 border-black inline-block ${
                        user.role === "admin"
                          ? "bg-blue-300"
                          : user.role === "rider"
                          ? "bg-cyan-300"
                          : "bg-gray-200"
                      }`}
                    >
                      {user.role || "USER"}
                    </span>
                  </td>
                  <td className="border-r-4 border-black p-4">
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="border-r-4 border-black p-4">
                    {user.last_login
                      ? new Date(user.last_login).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-cyan-300 border-2 border-black font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-none active:translate-x-0 active:translate-y-0 transition-all"
                        onClick={() => handleViewDetails(user)}
                      >
                        View
                      </button>
                      {user.role === "rider" ? (
                        <button
                          className="px-3 py-1 bg-gray-300 border-2 border-black font-bold text-sm opacity-50 cursor-not-allowed"
                          disabled
                          title="Riders cannot be admins"
                        >
                          Cannot Promote
                        </button>
                      ) : user.role !== "admin" ? (
                        <button
                          className="px-3 py-1 bg-blue-400 border-2 border-black font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-none active:translate-x-0 active:translate-y-0 transition-all"
                          onClick={() => handleMakeAdmin(user.email, user.role)}
                        >
                          Make Admin
                        </button>
                      ) : (
                        <button
                          className="px-3 py-1 bg-red-400 border-2 border-black font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-none active:translate-x-0 active:translate-y-0 transition-all"
                          onClick={() =>
                            handleRemoveAdmin(user.email, user.role)
                          }
                        >
                          Remove Admin
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* User Details Modal */}
      <dialog id="user_detail_modal" className="modal">
        <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full p-0">
          <button
            className="absolute right-4 top-4 w-8 h-8 bg-red-400 border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            onClick={() => document.getElementById("user_detail_modal").close()}
          >
            ✕
          </button>

          {selectedUser && (
            <div className="p-6">
              <h3 className="font-bold text-2xl mb-4 border-b-4 border-black pb-2">
                User Details
              </h3>

              <div className="space-y-3 mb-6">
                <div className="bg-blue-50 border-2 border-black p-3">
                  <span className="font-bold">Email:</span> {selectedUser.email}
                </div>
                <div className="bg-pink-50 border-2 border-black p-3">
                  <span className="font-bold">Role:</span>{" "}
                  <span
                    className={`px-2 py-1 text-xs font-bold border-2 border-black ml-2 ${
                      selectedUser.role === "admin"
                        ? "bg-blue-300"
                        : selectedUser.role === "rider"
                        ? "bg-cyan-300"
                        : "bg-gray-200"
                    }`}
                  >
                    {selectedUser.role || "USER"}
                  </span>
                </div>
                <div className="bg-green-50 border-2 border-black p-3">
                  <span className="font-bold">Created At:</span>{" "}
                  {selectedUser.created_at
                    ? new Date(selectedUser.created_at).toLocaleString()
                    : "N/A"}
                </div>
                <div className="bg-yellow-50 border-2 border-black p-3">
                  <span className="font-bold">Last Login:</span>{" "}
                  {selectedUser.last_login
                    ? new Date(selectedUser.last_login).toLocaleString()
                    : "N/A"}
                </div>
                {selectedUser.madeAdminAt && (
                  <div className="bg-purple-50 border-2 border-black p-3">
                    <span className="font-bold">Made Admin At:</span>{" "}
                    {new Date(selectedUser.madeAdminAt).toLocaleString()}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                {selectedUser.role === "rider" ? (
                  <button
                    className="px-4 py-2 bg-gray-300 border-2 border-black font-bold opacity-50 cursor-not-allowed"
                    disabled
                  >
                    Riders Cannot Be Admins
                  </button>
                ) : selectedUser.role !== "admin" ? (
                  <button
                    className="px-4 py-2 bg-blue-400 border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
                    onClick={() => {
                      handleMakeAdmin(selectedUser.email, selectedUser.role);
                      document.getElementById("user_detail_modal").close();
                    }}
                  >
                    Make Admin
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-red-400 border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
                    onClick={() => {
                      handleRemoveAdmin(selectedUser.email, selectedUser.role);
                      document.getElementById("user_detail_modal").close();
                    }}
                  >
                    Remove Admin
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ManageAdmins;
