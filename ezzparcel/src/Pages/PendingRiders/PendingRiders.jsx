// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import { useQueryClient } from "@tanstack/react-query";

// const PendingRiders = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();
//   const [selectedRider, setSelectedRider] = useState(null);

//   const {
//     data: pendingRiders = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["pending-riders"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/riders/pending");
//       return res.data;
//     },
//   });

//   const handleViewDetails = (rider) => {
//     setSelectedRider(rider);
//     document.getElementById("rider_detail_modal").showModal();
//   };

//   const handleApprove = async (riderId) => {
//     const result = await Swal.fire({
//       title: "Approve this rider?",
//       text: "This rider will be able to accept deliveries.",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#10b981",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: "Yes, Approve",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axiosSecure.patch(`/riders/${riderId}/approve`);
//         Swal.fire("Approved!", "Rider has been approved.", "success");
//         queryClient.invalidateQueries(["pending-riders"]);
//         document.getElementById("rider_detail_modal").close();
//       } catch (error) {
//         Swal.fire(
//           "Error!",
//           error.response?.data?.message || "Failed to approve rider.",
//           "error"
//         );
//       }
//     }
//   };

//   const handleReject = async (riderId) => {
//     const result = await Swal.fire({
//       title: "Reject this rider?",
//       text: "This action can be reversed later if needed.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: "Yes, Reject",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axiosSecure.patch(`/riders/${riderId}/reject`);
//         Swal.fire(
//           "Rejected!",
//           "Rider application has been rejected.",
//           "success"
//         );
//         queryClient.invalidateQueries(["pending-riders"]);
//         document.getElementById("rider_detail_modal").close();
//       } catch (error) {
//         Swal.fire(
//           "Error!",
//           error.response?.data?.message || "Failed to reject rider.",
//           "error"
//         );
//       }
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center p-10">Loading pending riders...</div>;
//   }

//   if (isError) {
//     return (
//       <div className="text-center p-10 text-red-500">
//         Error: {error.message}
//       </div>
//     );
//   }

//   if (pendingRiders.length === 0) {
//     return (
//       <div className="text-center text-gray-500 py-10">
//         No pending rider applications.
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Pending Rider Applications</h1>

//       <div className="overflow-x-auto">
//         <table className="table w-full">
//           <thead>
//             <tr className="bg-base-200">
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Region</th>
//               <th>District</th>
//               <th>Bike Brand</th>
//               <th>Applied At</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pendingRiders.map((rider) => (
//               <tr key={rider._id} className="hover">
//                 <td>{rider.name}</td>
//                 <td>{rider.email}</td>
//                 <td>{rider.phoneNumber}</td>
//                 <td>{rider.region}</td>
//                 <td>{rider.district}</td>
//                 <td>{rider.bikeBrand}</td>
//                 <td>{new Date(rider.appliedAt).toLocaleDateString()}</td>
//                 <td className="space-x-2">
//                   <button
//                     className="btn btn-sm btn-info"
//                     onClick={() => handleViewDetails(rider)}
//                   >
//                     View
//                   </button>
//                   <button
//                     className="btn btn-sm btn-success"
//                     onClick={() => handleApprove(rider._id)}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     className="btn btn-sm btn-error"
//                     onClick={() => handleReject(rider._id)}
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

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
//               <h3 className="font-bold text-2xl mb-4">
//                 Rider Application Details
//               </h3>

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

//               {/* Application Status */}
//               <div className="mb-4">
//                 <h4 className="font-semibold text-lg mb-2 text-primary">
//                   Application Status
//                 </h4>
//                 <div className="text-sm">
//                   <div>
//                     <span className="font-medium">Status:</span>{" "}
//                     <span className="badge badge-warning">
//                       {selectedRider.status}
//                     </span>
//                   </div>
//                   <div className="mt-2">
//                     <span className="font-medium">Applied At:</span>{" "}
//                     {new Date(selectedRider.appliedAt).toLocaleString()}
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex justify-end gap-2 mt-6">
//                 <button
//                   className="btn btn-success"
//                   onClick={() => handleApprove(selectedRider._id)}
//                 >
//                   Approve
//                 </button>
//                 <button
//                   className="btn btn-error"
//                   onClick={() => handleReject(selectedRider._id)}
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default PendingRiders;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedRider, setSelectedRider] = useState(null);

  const {
    data: pendingRiders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  const handleViewDetails = (rider) => {
    setSelectedRider(rider);
    document.getElementById("rider_detail_modal").showModal();
  };

  const handleApprove = async (riderId) => {
    const result = await Swal.fire({
      title: "Approve this rider?",
      text: "This rider will be able to accept deliveries.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Approve",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/${riderId}/approve`);
        Swal.fire("Approved!", "Rider has been approved.", "success");
        queryClient.invalidateQueries(["pending-riders"]);
        document.getElementById("rider_detail_modal").close();
      } catch (error) {
        Swal.fire(
          "Error!",
          error.response?.data?.message || "Failed to approve rider.",
          "error"
        );
      }
    }
  };

  const handleReject = async (riderId) => {
    const result = await Swal.fire({
      title: "Reject this rider?",
      text: "This action can be reversed later if needed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Reject",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/${riderId}/reject`);
        Swal.fire(
          "Rejected!",
          "Rider application has been rejected.",
          "success"
        );
        queryClient.invalidateQueries(["pending-riders"]);
        document.getElementById("rider_detail_modal").close();
      } catch (error) {
        Swal.fire(
          "Error!",
          error.response?.data?.message || "Failed to reject rider.",
          "error"
        );
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-8 border-black border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-4 p-4 bg-red-100 border-4 border-red-600">
        <span className="font-bold uppercase text-red-600">
          Error: {error.message}
        </span>
      </div>
    );
  }

  if (pendingRiders.length === 0) {
    return (
      <div className="text-center py-10 px-4">
        <div className="bg-yellow-100 border-4 border-black p-6 inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-lg font-bold uppercase">
            No pending rider applications.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-amber-50 min-h-screen">
      <h1 className="text-3xl font-black uppercase mb-6 border-b-4 border-black pb-2">
        Pending Rider Applications
      </h1>

      <div className="overflow-x-auto bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <table className="w-full">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-4 py-3 text-left font-black uppercase text-xs tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left font-black uppercase text-xs tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left font-black uppercase text-xs tracking-wider">
                Phone
              </th>
              <th className="px-4 py-3 text-left font-black uppercase text-xs tracking-wider">
                Region
              </th>
              <th className="px-4 py-3 text-left font-black uppercase text-xs tracking-wider">
                District
              </th>
              <th className="px-4 py-3 text-left font-black uppercase text-xs tracking-wider">
                Bike Brand
              </th>
              <th className="px-4 py-3 text-left font-black uppercase text-xs tracking-wider">
                Applied At
              </th>
              <th className="px-4 py-3 text-left font-black uppercase text-xs tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pendingRiders.map((rider, index) => (
              <tr
                key={rider._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="px-4 py-3 border-t-2 border-black font-bold">
                  {rider.name}
                </td>
                <td className="px-4 py-3 border-t-2 border-black font-semibold">
                  {rider.email}
                </td>
                <td className="px-4 py-3 border-t-2 border-black font-semibold">
                  {rider.phoneNumber}
                </td>
                <td className="px-4 py-3 border-t-2 border-black font-semibold">
                  {rider.region}
                </td>
                <td className="px-4 py-3 border-t-2 border-black font-semibold">
                  {rider.district}
                </td>
                <td className="px-4 py-3 border-t-2 border-black font-semibold">
                  {rider.bikeBrand}
                </td>
                <td className="px-4 py-3 border-t-2 border-black font-semibold">
                  {new Date(rider.appliedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border-t-2 border-black">
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-400 text-black font-bold uppercase px-3 py-1 border-2 border-black hover:bg-blue-600 hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none text-xs"
                      onClick={() => handleViewDetails(rider)}
                    >
                      View
                    </button>
                    <button
                      className="bg-green-400 text-black font-bold uppercase px-3 py-1 border-2 border-black hover:bg-green-600 hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none text-xs"
                      onClick={() => handleApprove(rider._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-400 text-black font-bold uppercase px-3 py-1 border-2 border-black hover:bg-red-600 hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none text-xs"
                      onClick={() => handleReject(rider._id)}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      <dialog id="rider_detail_modal" className="modal">
        <div className="modal-box max-w-2xl bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-0">
          <button
            onClick={() =>
              document.getElementById("rider_detail_modal").close()
            }
            className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center bg-red-400 border-2 border-black font-black hover:bg-red-600 hover:text-white transition-all"
          >
            ✕
          </button>

          {selectedRider && (
            <div className="p-6">
              <h3 className="font-black text-2xl mb-6 uppercase border-b-4 border-black pb-2">
                Rider Application Details
              </h3>

              {/* Personal Information */}
              <div className="mb-4">
                <h4 className="font-black text-sm mb-3 uppercase tracking-wider border-b-2 border-black pb-1">
                  Personal Information
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-100 border-2 border-black p-2">
                    <span className="font-black uppercase text-xs">Name:</span>{" "}
                    <span className="font-semibold">{selectedRider.name}</span>
                  </div>
                  <div className="bg-gray-100 border-2 border-black p-2">
                    <span className="font-black uppercase text-xs">Email:</span>{" "}
                    <span className="font-semibold">{selectedRider.email}</span>
                  </div>
                  <div className="bg-gray-100 border-2 border-black p-2">
                    <span className="font-black uppercase text-xs">Age:</span>{" "}
                    <span className="font-semibold">
                      {selectedRider.age} years
                    </span>
                  </div>
                  <div className="bg-gray-100 border-2 border-black p-2">
                    <span className="font-black uppercase text-xs">Phone:</span>{" "}
                    <span className="font-semibold">
                      {selectedRider.phoneNumber}
                    </span>
                  </div>
                  <div className="bg-gray-100 border-2 border-black p-2">
                    <span className="font-black uppercase text-xs">
                      National ID:
                    </span>{" "}
                    <span className="font-semibold">
                      {selectedRider.nationalId}
                    </span>
                  </div>
                  <div className="bg-gray-100 border-2 border-black p-2">
                    <span className="font-black uppercase text-xs">
                      License:
                    </span>{" "}
                    <span className="font-semibold">
                      {selectedRider.licenseNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="mb-4">
                <h4 className="font-black text-sm mb-3 uppercase tracking-wider border-b-2 border-black pb-1">
                  Location
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-100 border-2 border-black p-2">
                    <span className="font-black uppercase text-xs">
                      Region:
                    </span>{" "}
                    <span className="font-semibold">
                      {selectedRider.region}
                    </span>
                  </div>
                  <div className="bg-gray-100 border-2 border-black p-2">
                    <span className="font-black uppercase text-xs">
                      District:
                    </span>{" "}
                    <span className="font-semibold">
                      {selectedRider.district}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bike Information */}
              <div className="mb-4">
                <h4 className="font-black text-sm mb-3 uppercase tracking-wider border-b-2 border-black pb-1">
                  Bike Information
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-100 border-2 border-black p-2">
                    <span className="font-black uppercase text-xs">
                      Bike Brand:
                    </span>{" "}
                    <span className="font-semibold">
                      {selectedRider.bikeBrand}
                    </span>
                  </div>
                  <div className="bg-gray-100 border-2 border-black p-2">
                    <span className="font-black uppercase text-xs">
                      Registration:
                    </span>{" "}
                    <span className="font-semibold">
                      {selectedRider.bikeRegistration}
                    </span>
                  </div>
                  <div className="bg-gray-100 border-2 border-black p-2">
                    <span className="font-black uppercase text-xs">
                      Experience:
                    </span>{" "}
                    <span className="font-semibold">
                      {selectedRider.experience} years
                    </span>
                  </div>
                </div>
              </div>

              {/* Application Status */}
              <div className="mb-4">
                <h4 className="font-black text-sm mb-3 uppercase tracking-wider border-b-2 border-black pb-1">
                  Application Status
                </h4>
                <div className="text-sm">
                  <div className="bg-gray-100 border-2 border-black p-2 mb-2">
                    <span className="font-black uppercase text-xs">
                      Status:
                    </span>{" "}
                    <span className="bg-yellow-400 border-2 border-black px-2 py-1 text-xs font-bold uppercase ml-2">
                      {selectedRider.status}
                    </span>
                  </div>
                  <div className="bg-gray-100 border-2 border-black p-2">
                    <span className="font-black uppercase text-xs">
                      Applied At:
                    </span>{" "}
                    <span className="font-semibold">
                      {new Date(selectedRider.appliedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t-4 border-black">
                <button
                  className="bg-green-400 text-black font-bold uppercase px-6 py-3 border-4 border-black hover:bg-green-600 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                  onClick={() => handleApprove(selectedRider._id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-400 text-black font-bold uppercase px-6 py-3 border-4 border-black hover:bg-red-600 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                  onClick={() => handleReject(selectedRider._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default PendingRiders;
