// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import toast from "react-hot-toast";

// const AssignRider = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();
//   const [selectedParcel, setSelectedParcel] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const {
//     data: parcels = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["parcels-to-assign"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/parcels");
//       return res.data.filter(
//         (parcel) =>
//           parcel.payment_status === "paid" &&
//           parcel.delivery_status === "not collected"
//       );
//     },
//   });

//   // Fetch riders by district
//   const {
//     data: riders = [],
//     isLoading: isLoadingRiders,
//     isError: isRidersError,
//   } = useQuery({
//     queryKey: ["riders-by-district", selectedParcel?.senderDistrict],
//     queryFn: async () => {
//       if (!selectedParcel?.senderDistrict) return [];
//       const res = await axiosSecure.get(
//         `/riders/by-district/${selectedParcel.senderDistrict}`
//       );
//       return res.data;
//     },
//     enabled: !!selectedParcel?.senderDistrict && isModalOpen,
//   });

//   // Mutation to assign rider
//   const assignRiderMutation = useMutation({
//     mutationFn: async ({ parcelId, rider }) => {
//       const res = await axiosSecure.patch(`/parcels/${parcelId}/assign-rider`, {
//         riderId: rider._id,
//         riderName: rider.fullName || rider.name,
//         riderEmail: rider.email,
//       });
//       return res.data;
//     },
//     onSuccess: () => {
//       toast.success("Rider assigned successfully!");
//       queryClient.invalidateQueries(["parcels-to-assign"]);
//       setIsModalOpen(false);
//       setSelectedParcel(null);
//     },
//     onError: (error) => {
//       toast.error(error?.response?.data?.message || "Failed to assign rider");
//     },
//   });

//   const handleOpenModal = (parcel) => {
//     setSelectedParcel(parcel);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedParcel(null);
//   };

//   const handleAssignRider = (rider) => {
//     if (!selectedParcel) return;
//     assignRiderMutation.mutate({
//       parcelId: selectedParcel._id,
//       rider: rider,
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="alert alert-error">
//         <span>Error: {error.message}</span>
//       </div>
//     );
//   }

//   if (parcels.length === 0) {
//     return (
//       <div className="text-center py-10">
//         <p className="text-lg text-base-content/70">
//           No parcels available for rider assignment.
//         </p>
//         <p className="text-sm text-base-content/50 mt-2">
//           Parcels must be paid and not collected to assign a rider.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-6">Assign Rider to Parcels</h1>

//       <div className="stats shadow mb-6">
//         <div className="stat">
//           <div className="stat-title">Parcels Awaiting Assignment</div>
//           <div className="stat-value text-primary">{parcels.length}</div>
//           <div className="stat-desc">Paid and ready for pickup</div>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table table-zebra bg-base-100">
//           <thead>
//             <tr className="bg-base-200">
//               <th>Tracking ID</th>
//               <th>Sender</th>
//               <th>Receiver</th>
//               <th>Delivery Address</th>
//               <th>Weight (kg)</th>
//               <th>Price</th>
//               <th>Payment Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {parcels.map((parcel) => (
//               <tr key={parcel._id}>
//                 <td>
//                   <span className="font-mono text-sm">
//                     {parcel.tracking_id}
//                   </span>
//                 </td>
//                 <td>
//                   <div>
//                     <div className="font-semibold">{parcel.senderName}</div>
//                     <div className="text-sm text-base-content/70">
//                       {parcel.senderContact}
//                     </div>
//                   </div>
//                 </td>
//                 <td>
//                   <div>
//                     <div className="font-semibold">{parcel.receiverName}</div>
//                     <div className="text-sm text-base-content/70">
//                       {parcel.receiverContact}
//                     </div>
//                   </div>
//                 </td>
//                 <td>
//                   <div className="max-w-xs">
//                     <div className="text-sm">{parcel.receiverAddress}</div>
//                     <div className="text-xs text-base-content/70">
//                       {parcel.receiverDistrict}, {parcel.receiverRegion}
//                     </div>
//                   </div>
//                 </td>
//                 <td>{parcel.weight}</td>
//                 <td>
//                   <span className="font-semibold">${parcel.cost}</span>
//                 </td>
//                 <td>
//                   <span className="badge badge-success badge-sm">
//                     {parcel.payment_status}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-primary btn-sm"
//                     onClick={() => handleOpenModal(parcel)}
//                   >
//                     Assign Rider
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="modal modal-open">
//           <div className="modal-box max-w-2xl">
//             <h3 className="font-bold text-lg mb-4">
//               Assign Rider - {selectedParcel?.tracking_id}
//             </h3>

//             <div className="mb-4 p-4 bg-base-200 rounded-lg">
//               <p className="text-sm">
//                 <span className="font-semibold">Pickup District:</span>{" "}
//                 {selectedParcel?.senderDistrict}
//               </p>
//               <p className="text-sm">
//                 <span className="font-semibold">Sender:</span>{" "}
//                 {selectedParcel?.senderName}
//               </p>
//             </div>

//             {isLoadingRiders ? (
//               <div className="flex justify-center py-8">
//                 <span className="loading loading-spinner loading-lg"></span>
//               </div>
//             ) : isRidersError ? (
//               <div className="alert alert-error">
//                 <span>Error loading riders. Please try again.</span>
//               </div>
//             ) : riders.length === 0 ? (
//               <div className="alert alert-warning">
//                 <span>
//                   No available riders found in {selectedParcel?.senderDistrict}{" "}
//                   district.
//                 </span>
//               </div>
//             ) : (
//               <div className="space-y-3 max-h-96 overflow-y-auto">
//                 {riders.map((rider) => (
//                   <div
//                     key={rider._id}
//                     className="card bg-base-100 shadow-sm border border-base-300"
//                   >
//                     <div className="card-body p-4">
//                       <div className="flex justify-between items-start">
//                         <div className="flex-1">
//                           <h4 className="font-semibold text-lg">
//                             {rider.fullName || rider.name}
//                           </h4>
//                           <p className="text-sm text-base-content/70">
//                             {rider.email}
//                           </p>
//                           <p className="text-sm text-base-content/70">
//                             📱 {rider.phone || rider.contact}
//                           </p>
//                           <div className="flex gap-2 mt-2">
//                             <span className="badge badge-sm badge-outline">
//                               {rider.district}
//                             </span>
//                             {rider.vehicleType && (
//                               <span className="badge badge-sm badge-primary">
//                                 {rider.vehicleType}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                         <button
//                           className="btn btn-primary btn-sm"
//                           onClick={() => handleAssignRider(rider)}
//                           disabled={assignRiderMutation.isPending}
//                         >
//                           {assignRiderMutation.isPending
//                             ? "Assigning..."
//                             : "Assign"}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="modal-action">
//               <button
//                 className="btn"
//                 onClick={handleCloseModal}
//                 disabled={assignRiderMutation.isPending}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//           <div className="modal-backdrop" onClick={handleCloseModal}></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignRider;

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["parcels-to-assign"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      return res.data.filter(
        (parcel) =>
          parcel.payment_status === "paid" &&
          parcel.delivery_status === "not collected"
      );
    },
  });

  // Fetch riders by district
  const {
    data: riders = [],
    isLoading: isLoadingRiders,
    isError: isRidersError,
  } = useQuery({
    queryKey: ["riders-by-district", selectedParcel?.senderDistrict],
    queryFn: async () => {
      if (!selectedParcel?.senderDistrict) return [];
      const res = await axiosSecure.get(
        `/riders/by-district/${selectedParcel.senderDistrict}`
      );
      return res.data;
    },
    enabled: !!selectedParcel?.senderDistrict && isModalOpen,
  });

  // Mutation to assign rider
  const assignRiderMutation = useMutation({
    mutationFn: async ({ parcelId, rider }) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/assign-rider`, {
        riderId: rider._id,
        riderName: rider.fullName || rider.name,
        riderEmail: rider.email,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Rider assigned successfully!");
      queryClient.invalidateQueries(["parcels-to-assign"]);
      setIsModalOpen(false);
      setSelectedParcel(null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to assign rider");
    },
  });

  const handleOpenModal = (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedParcel(null);
  };

  const handleAssignRider = (rider) => {
    if (!selectedParcel) return;
    assignRiderMutation.mutate({
      parcelId: selectedParcel._id,
      rider: rider,
    });
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

  if (parcels.length === 0) {
    return (
      <div className="text-center py-10 px-4">
        <div className="bg-yellow-100 border-4 border-black p-6 inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-lg font-bold uppercase mb-2">
            No parcels available for rider assignment.
          </p>
          <p className="text-sm font-semibold">
            Parcels must be paid and not collected to assign a rider.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-amber-50 min-h-screen">
      <h1 className="text-3xl font-black uppercase mb-6 border-b-4 border-black pb-2">
        Assign Rider to Parcels
      </h1>

      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
        <div className="text-sm font-bold uppercase tracking-wider mb-1">
          Parcels Awaiting Assignment
        </div>
        <div className="text-4xl font-black">{parcels.length}</div>
        <div className="text-sm font-semibold mt-1">
          Paid and ready for pickup
        </div>
      </div>

      <div className="overflow-x-auto bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <table className="w-full">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-4 py-3 text-left font-black uppercase text-xs tracking-wider">
                Tracking ID
              </th>
              <th className="px-4 py-3 text-left font-black uppercase text-xs tracking-wider">
                Sender
              </th>
              <th className="px-4 py-3 text-left font-black uppercase text-xs tracking-wider">
                Receiver
              </th>
              <th className="px-4 py-3 text-left font-black uppercase text-xs tracking-wider">
                Delivery Address
              </th>
              <th className="px-4 py-3 text-left font-black uppercase text-xs tracking-wider">
                Weight (kg)
              </th>
              <th className="px-4 py-3 text-left font-black uppercase text-xs tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left font-black uppercase text-xs tracking-wider">
                Payment Status
              </th>
              <th className="px-4 py-3 text-left font-black uppercase text-xs tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="px-4 py-3 border-t-2 border-black">
                  <span className="font-mono text-sm font-bold">
                    {parcel.tracking_id}
                  </span>
                </td>
                <td className="px-4 py-3 border-t-2 border-black">
                  <div>
                    <div className="font-bold">{parcel.senderName}</div>
                    <div className="text-sm">{parcel.senderContact}</div>
                  </div>
                </td>
                <td className="px-4 py-3 border-t-2 border-black">
                  <div>
                    <div className="font-bold">{parcel.receiverName}</div>
                    <div className="text-sm">{parcel.receiverContact}</div>
                  </div>
                </td>
                <td className="px-4 py-3 border-t-2 border-black">
                  <div className="max-w-xs">
                    <div className="text-sm">{parcel.receiverAddress}</div>
                    <div className="text-xs font-semibold">
                      {parcel.receiverDistrict}, {parcel.receiverRegion}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 border-t-2 border-black font-bold">
                  {parcel.weight}
                </td>
                <td className="px-4 py-3 border-t-2 border-black">
                  <span className="font-black">${parcel.cost}</span>
                </td>
                <td className="px-4 py-3 border-t-2 border-black">
                  <span className="bg-green-400 border-2 border-black px-2 py-1 text-xs font-bold uppercase">
                    {parcel.payment_status}
                  </span>
                </td>
                <td className="px-4 py-3 border-t-2 border-black">
                  <button
                    className="bg-black text-white font-bold uppercase px-4 py-2 border-4 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none text-xs"
                    onClick={() => handleOpenModal(parcel)}
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="font-black text-2xl mb-4 uppercase border-b-4 border-black pb-2">
                Assign Rider - {selectedParcel?.tracking_id}
              </h3>

              <div className="mb-4 p-4 bg-yellow-100 border-4 border-black">
                <p className="text-sm font-bold">
                  <span className="font-black uppercase">Pickup District:</span>{" "}
                  {selectedParcel?.senderDistrict}
                </p>
                <p className="text-sm font-bold">
                  <span className="font-black uppercase">Sender:</span>{" "}
                  {selectedParcel?.senderName}
                </p>
              </div>

              {isLoadingRiders ? (
                <div className="flex justify-center py-8">
                  <div className="w-16 h-16 border-8 border-black border-t-transparent animate-spin"></div>
                </div>
              ) : isRidersError ? (
                <div className="p-4 bg-red-100 border-4 border-red-600">
                  <span className="font-bold uppercase text-red-600">
                    Error loading riders. Please try again.
                  </span>
                </div>
              ) : riders.length === 0 ? (
                <div className="p-4 bg-yellow-100 border-4 border-yellow-600">
                  <span className="font-bold uppercase text-yellow-800">
                    No available riders found in{" "}
                    {selectedParcel?.senderDistrict} district.
                  </span>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {riders.map((rider) => (
                    <div
                      key={rider._id}
                      className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-black text-lg uppercase">
                              {rider.fullName || rider.name}
                            </h4>
                            <p className="text-sm font-semibold">
                              {rider.email}
                            </p>
                            <p className="text-sm font-semibold">
                              📱 {rider.phone || rider.contact}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="bg-white border-2 border-black px-2 py-1 text-xs font-bold uppercase">
                                {rider.district}
                              </span>
                              {rider.vehicleType && (
                                <span className="bg-black text-white border-2 border-black px-2 py-1 text-xs font-bold uppercase">
                                  {rider.vehicleType}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            className="bg-black text-white font-bold uppercase px-4 py-2 border-4 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none text-xs ml-4"
                            onClick={() => handleAssignRider(rider)}
                            disabled={assignRiderMutation.isPending}
                          >
                            {assignRiderMutation.isPending
                              ? "Assigning..."
                              : "Assign"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-4 border-t-4 border-black flex justify-end">
                <button
                  className="bg-white text-black font-bold uppercase px-6 py-3 border-4 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                  onClick={handleCloseModal}
                  disabled={assignRiderMutation.isPending}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
