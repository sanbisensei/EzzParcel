// import { useState } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const ActiveRiders = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedRider, setSelectedRider] = useState(null);

//   const {
//     data: activeRiders = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["active-riders"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/riders/active");
//       return res.data;
//     },
//   });

//   // Filter riders based on search term
//   const filteredRiders = activeRiders.filter((rider) => {
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       rider.name.toLowerCase().includes(searchLower) ||
//       rider.nationalId.toLowerCase().includes(searchLower) ||
//       rider.email.toLowerCase().includes(searchLower)
//     );
//   });

//   const handleViewDetails = (rider) => {
//     setSelectedRider(rider);
//     document.getElementById("rider_detail_modal").showModal();
//   };

//   const handleDeactivate = async (riderId) => {
//     const result = await Swal.fire({
//       title: "Deactivate this rider?",
//       text: "This rider will no longer be able to accept deliveries.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: "Yes, Deactivate",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axiosSecure.patch(`/riders/${riderId}/deactivate`);
//         Swal.fire("Deactivated!", "Rider has been deactivated.", "success");
//         queryClient.invalidateQueries(["active-riders"]);
//         document.getElementById("rider_detail_modal")?.close();
//       } catch (error) {
//         Swal.fire(
//           "Error!",
//           error.response?.data?.message || "Failed to deactivate rider.",
//           "error"
//         );
//       }
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center p-10">Loading active riders...</div>;
//   }

//   if (isError) {
//     return (
//       <div className="text-center p-10 text-red-500">
//         Error: {error.message}
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Active Riders</h1>
//         <div className="badge badge-success badge-lg">
//           Total: {activeRiders.length}
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by name, email, or national ID..."
//           className="input input-bordered w-full max-w-md"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {filteredRiders.length === 0 ? (
//         <div className="text-center text-gray-500 py-10">
//           {searchTerm
//             ? "No riders found matching your search."
//             : "No active riders."}
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table w-full">
//             <thead>
//               <tr className="bg-base-200">
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Region</th>
//                 <th>District</th>
//                 <th>Bike Brand</th>
//                 <th>National ID</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredRiders.map((rider) => (
//                 <tr key={rider._id} className="hover">
//                   <td>{rider.name}</td>
//                   <td>{rider.email}</td>
//                   <td>{rider.phoneNumber}</td>
//                   <td>{rider.region}</td>
//                   <td>{rider.district}</td>
//                   <td>{rider.bikeBrand}</td>
//                   <td>{rider.nationalId}</td>
//                   <td className="space-x-2">
//                     <button
//                       className="btn btn-sm btn-info"
//                       onClick={() => handleViewDetails(rider)}
//                     >
//                       View
//                     </button>
//                     <button
//                       className="btn btn-sm btn-error"
//                       onClick={() => handleDeactivate(rider._id)}
//                     >
//                       Deactivate
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* View Details Modal */}
//       <dialog id="rider_detail_modal" className="modal">
//         <div className="modal-box max-w-2xl">
//           <form method="dialog">
//             <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
//               ✕
//             </button>
//           </form>

//           {selectedRider && (
//             <div>
//               <h3 className="font-bold text-2xl mb-4">Rider Details</h3>

//               {/* Personal Information */}
//               <div className="mb-4">
//                 <h4 className="font-semibold text-lg mb-2 text-primary">
//                   Personal Information
//                 </h4>
//                 <div className="grid grid-cols-2 gap-3 text-sm">
//                   <div>
//                     <span className="font-medium">Name:</span>{" "}
//                     {selectedRider.name}
//                   </div>
//                   <div>
//                     <span className="font-medium">Email:</span>{" "}
//                     {selectedRider.email}
//                   </div>
//                   <div>
//                     <span className="font-medium">Age:</span>{" "}
//                     {selectedRider.age} years
//                   </div>
//                   <div>
//                     <span className="font-medium">Phone:</span>{" "}
//                     {selectedRider.phoneNumber}
//                   </div>
//                   <div>
//                     <span className="font-medium">National ID:</span>{" "}
//                     {selectedRider.nationalId}
//                   </div>
//                   <div>
//                     <span className="font-medium">License:</span>{" "}
//                     {selectedRider.licenseNumber}
//                   </div>
//                 </div>
//               </div>

//               {/* Location Information */}
//               <div className="mb-4">
//                 <h4 className="font-semibold text-lg mb-2 text-primary">
//                   Location
//                 </h4>
//                 <div className="grid grid-cols-2 gap-3 text-sm">
//                   <div>
//                     <span className="font-medium">Region:</span>{" "}
//                     {selectedRider.region}
//                   </div>
//                   <div>
//                     <span className="font-medium">District:</span>{" "}
//                     {selectedRider.district}
//                   </div>
//                 </div>
//               </div>

//               {/* Bike Information */}
//               <div className="mb-4">
//                 <h4 className="font-semibold text-lg mb-2 text-primary">
//                   Bike Information
//                 </h4>
//                 <div className="grid grid-cols-2 gap-3 text-sm">
//                   <div>
//                     <span className="font-medium">Bike Brand:</span>{" "}
//                     {selectedRider.bikeBrand}
//                   </div>
//                   <div>
//                     <span className="font-medium">Registration:</span>{" "}
//                     {selectedRider.bikeRegistration}
//                   </div>
//                   <div>
//                     <span className="font-medium">Experience:</span>{" "}
//                     {selectedRider.experience} years
//                   </div>
//                 </div>
//               </div>

//               {/* Status */}
//               <div className="mb-4">
//                 <h4 className="font-semibold text-lg mb-2 text-primary">
//                   Status
//                 </h4>
//                 <div className="text-sm">
//                   <div>
//                     <span className="font-medium">Status:</span>{" "}
//                     <span className="badge badge-success">
//                       {selectedRider.status}
//                     </span>
//                   </div>
//                   <div className="mt-2">
//                     <span className="font-medium">Approved At:</span>{" "}
//                     {new Date(selectedRider.approvedAt).toLocaleString()}
//                   </div>
//                 </div>
//               </div>

//               {/* Action Button */}
//               <div className="flex justify-end mt-6">
//                 <button
//                   className="btn btn-error"
//                   onClick={() => handleDeactivate(selectedRider._id)}
//                 >
//                   Deactivate Rider
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default ActiveRiders;

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRider, setSelectedRider] = useState(null);

  const {
    data: activeRiders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["active-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  const filteredRiders = activeRiders.filter((rider) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      rider.name.toLowerCase().includes(searchLower) ||
      rider.nationalId.toLowerCase().includes(searchLower) ||
      rider.email.toLowerCase().includes(searchLower)
    );
  });

  const handleViewDetails = (rider) => {
    setSelectedRider(rider);
    document.getElementById("rider_detail_modal").showModal();
  };

  const closeModal = () => {
    document.getElementById("rider_detail_modal")?.close();
  };

  const handleDeactivate = async (riderId) => {
    const result = await Swal.fire({
      title: "Deactivate this rider?",
      text: "This rider will no longer be able to accept deliveries.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Deactivate",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/${riderId}/deactivate`);
        Swal.fire("Deactivated!", "Rider has been deactivated.", "success");
        queryClient.invalidateQueries(["active-riders"]);
        closeModal();
      } catch (error) {
        Swal.fire(
          "Error!",
          error.response?.data?.message || "Failed to deactivate rider.",
          "error"
        );
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-error text-error-content border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="text-xl font-black">ERROR!</div>
        <div className="mt-2">{error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-300 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="text-4xl font-black uppercase">Active Riders</h1>
            <p className="text-lg font-bold mt-1">Manage your delivery team</p>
          </div>
          <div className="bg-primary text-primary-content border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-sm font-black uppercase">Total Active</div>
            <div className="text-5xl font-black">{activeRiders.length}</div>
            <div className="text-sm font-bold">Riders available</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="SEARCH BY NAME, EMAIL, OR NATIONAL ID..."
            className="input w-full text-lg font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Riders Grid */}
        {filteredRiders.length === 0 ? (
          <div className="bg-white border-4 border-black p-16 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            <div className="text-6xl font-black mb-4">:(</div>
            <h3 className="text-3xl font-black uppercase mb-2">
              {searchTerm ? "No riders found" : "No active riders"}
            </h3>
            <p className="text-lg font-bold">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Active riders will appear here"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRiders.map((rider) => (
              <div
                key={rider._id}
                className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-200"
              >
                <div className="p-6">
                  {/* Rider Name & Status */}
                  <div className="mb-4 pb-4 border-b-4 border-black">
                    <h2 className="text-2xl font-black uppercase mb-2">
                      {rider.name}
                    </h2>
                    <div className="inline-block bg-success text-success-content px-3 py-1 border-2 border-black font-black uppercase text-sm">
                      ACTIVE
                    </div>
                  </div>

                  {/* Rider Info */}
                  <div className="space-y-3 text-sm font-bold mb-6">
                    <div className="bg-blue-200 border-2 border-black p-2">
                      <div className="text-xs font-black uppercase opacity-60">
                        Email
                      </div>
                      <div className="truncate">{rider.email}</div>
                    </div>
                    <div className="bg-green-200 border-2 border-black p-2">
                      <div className="text-xs font-black uppercase opacity-60">
                        Phone
                      </div>
                      <div>{rider.phoneNumber}</div>
                    </div>
                    <div className="bg-yellow-200 border-2 border-black p-2">
                      <div className="text-xs font-black uppercase opacity-60">
                        Location
                      </div>
                      <div>
                        {rider.district}, {rider.region}
                      </div>
                    </div>
                    <div className="bg-pink-200 border-2 border-black p-2">
                      <div className="text-xs font-black uppercase opacity-60">
                        Bike
                      </div>
                      <div>{rider.bikeBrand}</div>
                    </div>
                    <div className="bg-purple-200 border-2 border-black p-2">
                      <div className="text-xs font-black uppercase opacity-60">
                        National ID
                      </div>
                      <div className="truncate">{rider.nationalId}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      className="flex-1 btn btn-info border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] font-black uppercase"
                      onClick={() => handleViewDetails(rider)}
                    >
                      View
                    </button>
                    <button
                      className="flex-1 btn btn-error border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] font-black uppercase"
                      onClick={() => handleDeactivate(rider._id)}
                    >
                      Deactivate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Details Modal */}
      <dialog id="rider_detail_modal" className="modal">
        <div className="modal-box max-w-4xl bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-0">
          <button
            className="btn btn-sm btn-circle absolute right-4 top-4 border-2 border-black font-black"
            onClick={closeModal}
          >
            ✕
          </button>

          {selectedRider && (
            <div className="p-8">
              <div className="mb-6 pb-6 border-b-4 border-black">
                <h3 className="text-4xl font-black uppercase mb-2">
                  {selectedRider.name}
                </h3>
                <div className="inline-block bg-success text-success-content px-4 py-2 border-2 border-black font-black uppercase">
                  ACTIVE RIDER
                </div>
              </div>

              {/* Personal Information */}
              <div className="mb-6">
                <h4 className="text-2xl font-black uppercase mb-4 bg-blue-300 inline-block px-4 py-2 border-2 border-black">
                  Personal Info
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-100 border-2 border-black p-4">
                    <span className="text-xs font-black uppercase opacity-60">
                      Email
                    </span>
                    <p className="font-bold text-lg">{selectedRider.email}</p>
                  </div>
                  <div className="bg-green-100 border-2 border-black p-4">
                    <span className="text-xs font-black uppercase opacity-60">
                      Phone
                    </span>
                    <p className="font-bold text-lg">
                      {selectedRider.phoneNumber}
                    </p>
                  </div>
                  <div className="bg-yellow-100 border-2 border-black p-4">
                    <span className="text-xs font-black uppercase opacity-60">
                      Age
                    </span>
                    <p className="font-bold text-lg">
                      {selectedRider.age} years
                    </p>
                  </div>
                  <div className="bg-pink-100 border-2 border-black p-4">
                    <span className="text-xs font-black uppercase opacity-60">
                      National ID
                    </span>
                    <p className="font-bold text-lg">
                      {selectedRider.nationalId}
                    </p>
                  </div>
                  <div className="bg-purple-100 border-2 border-black p-4 md:col-span-2">
                    <span className="text-xs font-black uppercase opacity-60">
                      License Number
                    </span>
                    <p className="font-bold text-lg">
                      {selectedRider.licenseNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="mb-6">
                <h4 className="text-2xl font-black uppercase mb-4 bg-green-300 inline-block px-4 py-2 border-2 border-black">
                  Location
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-green-100 border-2 border-black p-4">
                    <span className="text-xs font-black uppercase opacity-60">
                      Region
                    </span>
                    <p className="font-bold text-lg">{selectedRider.region}</p>
                  </div>
                  <div className="bg-blue-100 border-2 border-black p-4">
                    <span className="text-xs font-black uppercase opacity-60">
                      District
                    </span>
                    <p className="font-bold text-lg">
                      {selectedRider.district}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bike Information */}
              <div className="mb-6">
                <h4 className="text-2xl font-black uppercase mb-4 bg-yellow-300 inline-block px-4 py-2 border-2 border-black">
                  Bike Info
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-yellow-100 border-2 border-black p-4">
                    <span className="text-xs font-black uppercase opacity-60">
                      Bike Brand
                    </span>
                    <p className="font-bold text-lg">
                      {selectedRider.bikeBrand}
                    </p>
                  </div>
                  <div className="bg-pink-100 border-2 border-black p-4">
                    <span className="text-xs font-black uppercase opacity-60">
                      Registration
                    </span>
                    <p className="font-bold text-lg">
                      {selectedRider.bikeRegistration}
                    </p>
                  </div>
                  <div className="bg-purple-100 border-2 border-black p-4 md:col-span-2">
                    <span className="text-xs font-black uppercase opacity-60">
                      Experience
                    </span>
                    <p className="font-bold text-lg">
                      {selectedRider.experience} years
                    </p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="mb-6">
                <h4 className="text-2xl font-black uppercase mb-4 bg-pink-300 inline-block px-4 py-2 border-2 border-black">
                  Status
                </h4>
                <div className="bg-gray-100 border-2 border-black p-4 mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-black uppercase">
                      Current Status:
                    </span>
                    <span className="bg-success text-success-content px-3 py-1 border-2 border-black font-black uppercase">
                      {selectedRider.status}
                    </span>
                  </div>
                  <div className="h-1 bg-black mb-3"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black uppercase">
                      Approved At:
                    </span>
                    <span className="font-bold">
                      {new Date(selectedRider.approvedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t-4 border-black">
                <button
                  className="btn btn-ghost border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] font-black uppercase"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  className="btn btn-error border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] font-black uppercase"
                  onClick={() => handleDeactivate(selectedRider._id)}
                >
                  Deactivate Rider
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="modal-backdrop" onClick={closeModal}></div>
      </dialog>
    </div>
  );
};

export default ActiveRiders;
