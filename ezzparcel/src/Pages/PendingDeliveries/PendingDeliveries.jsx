// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import toast from "react-hot-toast";

// const PendingDeliveries = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const queryClient = useQueryClient();

//   const {
//     data: parcels = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["rider-pending-deliveries", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/parcels/rider/${user?.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   // Mutation to update delivery status
//   const updateStatusMutation = useMutation({
//     mutationFn: async ({ parcelId, delivery_status }) => {
//       const res = await axiosSecure.patch(
//         `/parcels/${parcelId}/update-status`,
//         {
//           delivery_status,
//         }
//       );
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["rider-pending-deliveries"]);
//     },
//     onError: (error) => {
//       toast.error(error?.response?.data?.message || "Failed to update status");
//     },
//   });

//   const handleStartDelivery = (parcelId) => {
//     toast.promise(
//       updateStatusMutation.mutateAsync({
//         parcelId,
//         delivery_status: "in-transit",
//       }),
//       {
//         loading: "Starting delivery...",
//         success: "Delivery started! Parcel is now in transit.",
//         error: "Failed to start delivery",
//       }
//     );
//   };

//   const handleCompleteDelivery = (parcelId) => {
//     toast.promise(
//       updateStatusMutation.mutateAsync({
//         parcelId,
//         delivery_status: "delivered",
//       }),
//       {
//         loading: "Marking as delivered...",
//         success: "Delivery completed successfully! 🎉",
//         error: "Failed to complete delivery",
//       }
//     );
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
//           No pending deliveries at the moment.
//         </p>
//         <p className="text-sm text-base-content/50 mt-2">
//           New delivery assignments will appear here.
//         </p>
//       </div>
//     );
//   }

//   // Separate parcels by status
//   const assignedParcels = parcels.filter(
//     (p) => p.delivery_status === "assigned"
//   );
//   const inTransitParcels = parcels.filter(
//     (p) => p.delivery_status === "in-transit"
//   );

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-6">My Pending Deliveries</h1>

//       <div className="stats shadow mb-6 w-full">
//         <div className="stat">
//           <div className="stat-title">Assigned</div>
//           <div className="stat-value text-warning">
//             {assignedParcels.length}
//           </div>
//           <div className="stat-desc">Ready to pick up</div>
//         </div>
//         <div className="stat">
//           <div className="stat-title">In Transit</div>
//           <div className="stat-value text-info">{inTransitParcels.length}</div>
//           <div className="stat-desc">On the way</div>
//         </div>
//         <div className="stat">
//           <div className="stat-title">Total</div>
//           <div className="stat-value text-primary">{parcels.length}</div>
//           <div className="stat-desc">Active deliveries</div>
//         </div>
//       </div>

//       {/* Assigned Parcels */}
//       {assignedParcels.length > 0 && (
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//             <span className="badge badge-warning">Assigned</span>
//             Ready for Pickup
//           </h2>
//           <div className="grid gap-4">
//             {assignedParcels.map((parcel) => (
//               <div
//                 key={parcel._id}
//                 className="card bg-base-100 shadow-lg border-l-4 border-warning"
//               >
//                 <div className="card-body">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h3 className="card-title text-lg">
//                         {parcel.tracking_id}
//                       </h3>
//                       <p className="text-sm text-base-content/70">
//                         {parcel.title || parcel.type}
//                       </p>
//                     </div>
//                     <div className="badge badge-warning badge-lg">Assigned</div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-4">
//                     {/* Pickup Info */}
//                     <div className="bg-base-200 p-4 rounded-lg">
//                       <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
//                         📦 Pickup From
//                       </h4>
//                       <p className="font-semibold">{parcel.senderName}</p>
//                       <p className="text-sm">{parcel.senderContact}</p>
//                       <p className="text-sm text-base-content/70 mt-1">
//                         {parcel.senderAddress}
//                       </p>
//                       <p className="text-sm font-medium mt-1">
//                         {parcel.senderService}, {parcel.senderDistrict}
//                       </p>
//                       {parcel.pickupInstruction && (
//                         <p className="text-xs text-info mt-2">
//                           📝 {parcel.pickupInstruction}
//                         </p>
//                       )}
//                     </div>

//                     {/* Delivery Info */}
//                     <div className="bg-base-200 p-4 rounded-lg">
//                       <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
//                         🏠 Deliver To
//                       </h4>
//                       <p className="font-semibold">{parcel.receiverName}</p>
//                       <p className="text-sm">{parcel.receiverContact}</p>
//                       <p className="text-sm text-base-content/70 mt-1">
//                         {parcel.receiverAddress}
//                       </p>
//                       <p className="text-sm font-medium mt-1">
//                         {parcel.receiverService}, {parcel.receiverDistrict}
//                       </p>
//                       {parcel.deliveryInstruction && (
//                         <p className="text-xs text-info mt-2">
//                           📝 {parcel.deliveryInstruction}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex justify-between items-center mt-4">
//                     <div className="flex gap-4 text-sm">
//                       <span className="font-semibold">
//                         Weight: {parcel.weight} kg
//                       </span>
//                       <span className="font-semibold">
//                         Cost: ${parcel.cost}
//                       </span>
//                     </div>
//                     <button
//                       className="btn btn-warning btn-sm"
//                       onClick={() => handleStartDelivery(parcel._id)}
//                     >
//                       Start Delivery
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* In Transit Parcels */}
//       {inTransitParcels.length > 0 && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//             <span className="badge badge-info">In Transit</span>
//             On the Way
//           </h2>
//           <div className="grid gap-4">
//             {inTransitParcels.map((parcel) => (
//               <div
//                 key={parcel._id}
//                 className="card bg-base-100 shadow-lg border-l-4 border-info"
//               >
//                 <div className="card-body">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h3 className="card-title text-lg">
//                         {parcel.tracking_id}
//                       </h3>
//                       <p className="text-sm text-base-content/70">
//                         {parcel.title || parcel.type}
//                       </p>
//                     </div>
//                     <div className="badge badge-info badge-lg">In Transit</div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-4">
//                     {/* Pickup Info */}
//                     <div className="bg-base-200 p-4 rounded-lg opacity-70">
//                       <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
//                         ✅ Picked Up From
//                       </h4>
//                       <p className="font-semibold">{parcel.senderName}</p>
//                       <p className="text-sm">{parcel.senderContact}</p>
//                       <p className="text-sm font-medium mt-1">
//                         {parcel.senderService}, {parcel.senderDistrict}
//                       </p>
//                     </div>

//                     {/* Delivery Info */}
//                     <div className="bg-base-200 p-4 rounded-lg">
//                       <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
//                         🏠 Deliver To
//                       </h4>
//                       <p className="font-semibold">{parcel.receiverName}</p>
//                       <p className="text-sm">{parcel.receiverContact}</p>
//                       <p className="text-sm text-base-content/70 mt-1">
//                         {parcel.receiverAddress}
//                       </p>
//                       <p className="text-sm font-medium mt-1">
//                         {parcel.receiverService}, {parcel.receiverDistrict}
//                       </p>
//                       {parcel.deliveryInstruction && (
//                         <p className="text-xs text-info mt-2">
//                           📝 {parcel.deliveryInstruction}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex justify-between items-center mt-4">
//                     <div className="flex gap-4 text-sm">
//                       <span className="font-semibold">
//                         Weight: {parcel.weight} kg
//                       </span>
//                       <span className="font-semibold">
//                         Cost: ${parcel.cost}
//                       </span>
//                     </div>
//                     <button
//                       className="btn btn-success btn-sm"
//                       onClick={() => handleCompleteDelivery(parcel._id)}
//                     >
//                       Mark as Delivered
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PendingDeliveries;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["rider-pending-deliveries", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/rider/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation to update delivery status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ parcelId, delivery_status }) => {
      const res = await axiosSecure.patch(
        `/parcels/${parcelId}/update-status`,
        {
          delivery_status,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["rider-pending-deliveries"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update status");
    },
  });

  const handleStartDelivery = (parcelId) => {
    toast.promise(
      updateStatusMutation.mutateAsync({
        parcelId,
        delivery_status: "in-transit",
      }),
      {
        loading: "Starting delivery...",
        success: "Delivery started! Parcel is now in transit.",
        error: "Failed to start delivery",
      }
    );
  };

  const handleCompleteDelivery = (parcelId) => {
    toast.promise(
      updateStatusMutation.mutateAsync({
        parcelId,
        delivery_status: "delivered",
      }),
      {
        loading: "Marking as delivered...",
        success: "Delivery completed successfully! 🎉",
        error: "Failed to complete delivery",
      }
    );
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
            No pending deliveries at the moment.
          </p>
          <p className="text-sm font-semibold">
            New delivery assignments will appear here.
          </p>
        </div>
      </div>
    );
  }

  // Separate parcels by status
  const assignedParcels = parcels.filter(
    (p) => p.delivery_status === "assigned"
  );
  const inTransitParcels = parcels.filter(
    (p) => p.delivery_status === "in-transit"
  );

  return (
    <div className="p-4 bg-amber-50 min-h-screen">
      <h1 className="text-3xl font-black uppercase mb-6 border-b-4 border-black pb-2">
        My Pending Deliveries
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="text-sm font-bold uppercase tracking-wider mb-1">
            Assigned
          </div>
          <div className="text-4xl font-black text-yellow-600">
            {assignedParcels.length}
          </div>
          <div className="text-sm font-semibold mt-1">Ready to pick up</div>
        </div>
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="text-sm font-bold uppercase tracking-wider mb-1">
            In Transit
          </div>
          <div className="text-4xl font-black text-blue-600">
            {inTransitParcels.length}
          </div>
          <div className="text-sm font-semibold mt-1">On the way</div>
        </div>
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="text-sm font-bold uppercase tracking-wider mb-1">
            Total
          </div>
          <div className="text-4xl font-black">{parcels.length}</div>
          <div className="text-sm font-semibold mt-1">Active deliveries</div>
        </div>
      </div>

      {/* Assigned Parcels */}
      {assignedParcels.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-2 border-b-4 border-black pb-2">
            <span className="bg-yellow-400 border-2 border-black px-3 py-1 text-xs font-bold uppercase">
              Assigned
            </span>
            Ready for Pickup
          </h2>
          <div className="grid gap-4">
            {assignedParcels.map((parcel) => (
              <div
                key={parcel._id}
                className="bg-white border-4 border-black border-l-8 border-l-yellow-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4 pb-4 border-b-4 border-black">
                    <div>
                      <h3 className="text-lg font-black uppercase">
                        {parcel.tracking_id}
                      </h3>
                      <p className="text-sm font-semibold">
                        {parcel.title || parcel.type}
                      </p>
                    </div>
                    <div className="bg-yellow-400 border-2 border-black px-4 py-2 font-bold uppercase text-sm">
                      Assigned
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Pickup Info */}
                    <div className="bg-gray-100 border-4 border-black p-4">
                      <h4 className="font-black text-xs uppercase mb-2 tracking-wider border-b-2 border-black pb-1">
                        📦 Pickup From
                      </h4>
                      <p className="font-bold">{parcel.senderName}</p>
                      <p className="text-sm font-semibold">
                        {parcel.senderContact}
                      </p>
                      <p className="text-sm mt-1">{parcel.senderAddress}</p>
                      <p className="text-sm font-bold mt-1">
                        {parcel.senderService}, {parcel.senderDistrict}
                      </p>
                      {parcel.pickupInstruction && (
                        <p className="text-xs font-semibold mt-2 bg-blue-100 border-2 border-blue-600 p-2">
                          📝 {parcel.pickupInstruction}
                        </p>
                      )}
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-gray-100 border-4 border-black p-4">
                      <h4 className="font-black text-xs uppercase mb-2 tracking-wider border-b-2 border-black pb-1">
                        🏠 Deliver To
                      </h4>
                      <p className="font-bold">{parcel.receiverName}</p>
                      <p className="text-sm font-semibold">
                        {parcel.receiverContact}
                      </p>
                      <p className="text-sm mt-1">{parcel.receiverAddress}</p>
                      <p className="text-sm font-bold mt-1">
                        {parcel.receiverService}, {parcel.receiverDistrict}
                      </p>
                      {parcel.deliveryInstruction && (
                        <p className="text-xs font-semibold mt-2 bg-blue-100 border-2 border-blue-600 p-2">
                          📝 {parcel.deliveryInstruction}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t-4 border-black">
                    <div className="flex gap-4 text-sm">
                      <span className="font-black">
                        Weight: {parcel.weight} kg
                      </span>
                      <span className="font-black">Cost: ${parcel.cost}</span>
                    </div>
                    <button
                      className="bg-yellow-400 text-black font-bold uppercase px-6 py-2 border-4 border-black hover:bg-yellow-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none text-sm"
                      onClick={() => handleStartDelivery(parcel._id)}
                    >
                      Start Delivery
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In Transit Parcels */}
      {inTransitParcels.length > 0 && (
        <div>
          <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-2 border-b-4 border-black pb-2">
            <span className="bg-blue-400 border-2 border-black px-3 py-1 text-xs font-bold uppercase">
              In Transit
            </span>
            On the Way
          </h2>
          <div className="grid gap-4">
            {inTransitParcels.map((parcel) => (
              <div
                key={parcel._id}
                className="bg-white border-4 border-black border-l-8 border-l-blue-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4 pb-4 border-b-4 border-black">
                    <div>
                      <h3 className="text-lg font-black uppercase">
                        {parcel.tracking_id}
                      </h3>
                      <p className="text-sm font-semibold">
                        {parcel.title || parcel.type}
                      </p>
                    </div>
                    <div className="bg-blue-400 border-2 border-black px-4 py-2 font-bold uppercase text-sm">
                      In Transit
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Pickup Info */}
                    <div className="bg-gray-100 border-4 border-black p-4 opacity-70">
                      <h4 className="font-black text-xs uppercase mb-2 tracking-wider border-b-2 border-black pb-1">
                        ✅ Picked Up From
                      </h4>
                      <p className="font-bold">{parcel.senderName}</p>
                      <p className="text-sm font-semibold">
                        {parcel.senderContact}
                      </p>
                      <p className="text-sm font-bold mt-1">
                        {parcel.senderService}, {parcel.senderDistrict}
                      </p>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-gray-100 border-4 border-black p-4">
                      <h4 className="font-black text-xs uppercase mb-2 tracking-wider border-b-2 border-black pb-1">
                        🏠 Deliver To
                      </h4>
                      <p className="font-bold">{parcel.receiverName}</p>
                      <p className="text-sm font-semibold">
                        {parcel.receiverContact}
                      </p>
                      <p className="text-sm mt-1">{parcel.receiverAddress}</p>
                      <p className="text-sm font-bold mt-1">
                        {parcel.receiverService}, {parcel.receiverDistrict}
                      </p>
                      {parcel.deliveryInstruction && (
                        <p className="text-xs font-semibold mt-2 bg-blue-100 border-2 border-blue-600 p-2">
                          📝 {parcel.deliveryInstruction}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t-4 border-black">
                    <div className="flex gap-4 text-sm">
                      <span className="font-black">
                        Weight: {parcel.weight} kg
                      </span>
                      <span className="font-black">Cost: ${parcel.cost}</span>
                    </div>
                    <button
                      className="bg-green-400 text-black font-bold uppercase px-6 py-2 border-4 border-black hover:bg-green-600 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none text-sm"
                      onClick={() => handleCompleteDelivery(parcel._id)}
                    >
                      Mark as Delivered
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingDeliveries;
