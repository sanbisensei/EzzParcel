// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import toast from "react-hot-toast";

// const CompletedDeliveries = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const queryClient = useQueryClient();
//   const [filterStatus, setFilterStatus] = useState("all");

//   const {
//     data: parcels = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["rider-completed-deliveries", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/parcels/rider/${user?.email}/completed`
//       );
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   // Mutation for cashout
//   const cashoutMutation = useMutation({
//     mutationFn: async (parcelId) => {
//       const res = await axiosSecure.patch(`/parcels/${parcelId}/cashout`);
//       return res.data;
//     },
//     onSuccess: () => {
//       toast.success("Cashout successful! 💰");
//       queryClient.invalidateQueries(["rider-completed-deliveries"]);
//     },
//     onError: (error) => {
//       toast.error(
//         error?.response?.data?.message || "Failed to process cashout"
//       );
//     },
//   });

//   const handleCashout = (parcelId) => {
//     cashoutMutation.mutate(parcelId);
//   };

//   // Filter parcels
//   const filteredParcels = parcels.filter((parcel) => {
//     if (filterStatus === "all") return true;
//     if (filterStatus === "pending") return parcel.cashoutStatus === "pending";
//     if (filterStatus === "completed")
//       return parcel.cashoutStatus === "completed";
//     return true;
//   });

//   // Calculate earnings
//   const totalEarnings = parcels.reduce(
//     (sum, parcel) => sum + (parcel.riderEarning || 0),
//     0
//   );
//   const pendingEarnings = parcels
//     .filter((p) => p.cashoutStatus === "pending")
//     .reduce((sum, parcel) => sum + (parcel.riderEarning || 0), 0);
//   const cashedOutEarnings = parcels
//     .filter((p) => p.cashoutStatus === "completed")
//     .reduce((sum, parcel) => sum + (parcel.riderEarning || 0), 0);

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Calculate delivery time
//   const calculateDeliveryTime = (startDate, endDate) => {
//     if (!startDate || !endDate) return "N/A";
//     const diff = new Date(endDate) - new Date(startDate);
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     return `${hours}h ${minutes}m`;
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
//           No completed deliveries yet.
//         </p>
//         <p className="text-sm text-base-content/50 mt-2">
//           Completed deliveries will appear here.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-6">Delivery History & Earnings</h1>

//       {/* Stats */}
//       <div className="stats stats-vertical lg:stats-horizontal shadow mb-6 w-full">
//         <div className="stat">
//           <div className="stat-figure text-primary">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               className="inline-block w-8 h-8 stroke-current"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M5 13l4 4L19 7"
//               ></path>
//             </svg>
//           </div>
//           <div className="stat-title">Total Deliveries</div>
//           <div className="stat-value text-primary">{parcels.length}</div>
//           <div className="stat-desc">Successfully completed</div>
//         </div>

//         <div className="stat">
//           <div className="stat-figure text-secondary">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               className="inline-block w-8 h-8 stroke-current"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//               ></path>
//             </svg>
//           </div>
//           <div className="stat-title">Total Earnings</div>
//           <div className="stat-value text-secondary">
//             ${totalEarnings.toFixed(2)}
//           </div>
//           <div className="stat-desc">From all deliveries</div>
//         </div>

//         <div className="stat">
//           <div className="stat-figure text-warning">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               className="inline-block w-8 h-8 stroke-current"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
//               ></path>
//             </svg>
//           </div>
//           <div className="stat-title">Pending Cashout</div>
//           <div className="stat-value text-warning">
//             ${pendingEarnings.toFixed(2)}
//           </div>
//           <div className="stat-desc">Available to cashout</div>
//         </div>

//         <div className="stat">
//           <div className="stat-figure text-success">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               className="inline-block w-8 h-8 stroke-current"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//               ></path>
//             </svg>
//           </div>
//           <div className="stat-title">Cashed Out</div>
//           <div className="stat-value text-success">
//             ${cashedOutEarnings.toFixed(2)}
//           </div>
//           <div className="stat-desc">Already withdrawn</div>
//         </div>
//       </div>

//       {/* Filter Tabs */}
//       <div className="tabs tabs-boxed mb-6 bg-base-200">
//         <button
//           className={`tab ${filterStatus === "all" ? "tab-active" : ""}`}
//           onClick={() => setFilterStatus("all")}
//         >
//           All ({parcels.length})
//         </button>
//         <button
//           className={`tab ${filterStatus === "pending" ? "tab-active" : ""}`}
//           onClick={() => setFilterStatus("pending")}
//         >
//           Pending Cashout (
//           {parcels.filter((p) => p.cashoutStatus === "pending").length})
//         </button>
//         <button
//           className={`tab ${filterStatus === "completed" ? "tab-active" : ""}`}
//           onClick={() => setFilterStatus("completed")}
//         >
//           Cashed Out (
//           {parcels.filter((p) => p.cashoutStatus === "completed").length})
//         </button>
//       </div>

//       {/* Delivery Cards */}
//       <div className="grid gap-4">
//         {filteredParcels.map((parcel) => (
//           <div
//             key={parcel._id}
//             className="card bg-base-100 shadow-lg border-l-4 border-success"
//           >
//             <div className="card-body">
//               {/* Header */}
//               <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
//                 <div className="flex-1">
//                   <h3 className="card-title text-lg flex items-center gap-2">
//                     {parcel.tracking_id}
//                     {parcel.isSameDistrict ? (
//                       <span className="badge badge-sm badge-primary">
//                         Same District
//                       </span>
//                     ) : (
//                       <span className="badge badge-sm badge-secondary">
//                         Cross District
//                       </span>
//                     )}
//                   </h3>
//                   <p className="text-sm text-base-content/70">
//                     {parcel.title || parcel.type}
//                   </p>
//                 </div>

//                 <div className="text-right">
//                   {parcel.cashoutStatus === "pending" ? (
//                     <div className="badge badge-warning badge-lg mb-2">
//                       Pending Cashout
//                     </div>
//                   ) : (
//                     <div className="badge badge-success badge-lg mb-2">
//                       Cashed Out
//                     </div>
//                   )}
//                   <p className="text-xs text-base-content/70">
//                     Delivered: {formatDate(parcel.deliveredAt)}
//                   </p>
//                 </div>
//               </div>

//               {/* Timeline */}
//               <div className="bg-base-200 p-4 rounded-lg mb-4">
//                 <h4 className="font-semibold text-sm mb-3">
//                   Delivery Timeline
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                   <div>
//                     <p className="text-xs text-base-content/60">Assigned</p>
//                     <p className="text-sm font-medium">
//                       {formatDate(parcel.assignedAt)}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-base-content/60">
//                       Started Delivery
//                     </p>
//                     <p className="text-sm font-medium">
//                       {formatDate(parcel.startedDeliveryAt)}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-base-content/60">Delivered</p>
//                     <p className="text-sm font-medium">
//                       {formatDate(parcel.deliveredAt)}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="mt-3 pt-3 border-t border-base-300">
//                   <p className="text-xs text-base-content/60">
//                     Total Delivery Time
//                   </p>
//                   <p className="text-sm font-semibold text-primary">
//                     {calculateDeliveryTime(
//                       parcel.startedDeliveryAt,
//                       parcel.deliveredAt
//                     )}
//                   </p>
//                 </div>
//               </div>

//               {/* Pickup & Delivery Info */}
//               <div className="grid md:grid-cols-2 gap-4 mb-4">
//                 <div className="bg-base-200 p-4 rounded-lg">
//                   <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
//                     📦 Picked Up From
//                   </h4>
//                   <p className="font-semibold">{parcel.senderName}</p>
//                   <p className="text-sm">{parcel.senderContact}</p>
//                   <p className="text-sm text-base-content/70 mt-1">
//                     {parcel.senderAddress}
//                   </p>
//                   <p className="text-sm font-medium mt-1">
//                     {parcel.senderService}, {parcel.senderDistrict}
//                   </p>
//                 </div>

//                 <div className="bg-base-200 p-4 rounded-lg">
//                   <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
//                     ✅ Delivered To
//                   </h4>
//                   <p className="font-semibold">{parcel.receiverName}</p>
//                   <p className="text-sm">{parcel.receiverContact}</p>
//                   <p className="text-sm text-base-content/70 mt-1">
//                     {parcel.receiverAddress}
//                   </p>
//                   <p className="text-sm font-medium mt-1">
//                     {parcel.receiverService}, {parcel.receiverDistrict}
//                   </p>
//                 </div>
//               </div>

//               {/* Earnings & Actions */}
//               <div className="divider my-2"></div>

//               <div className="flex flex-wrap justify-between items-center gap-4">
//                 <div className="flex flex-wrap gap-4 text-sm">
//                   <div>
//                     <span className="text-base-content/60">Weight:</span>
//                     <span className="font-semibold ml-1">
//                       {parcel.weight} kg
//                     </span>
//                   </div>
//                   <div>
//                     <span className="text-base-content/60">Parcel Cost:</span>
//                     <span className="font-semibold ml-1">${parcel.cost}</span>
//                   </div>
//                   <div>
//                     <span className="text-base-content/60">
//                       Your Earnings ({parcel.earningPercentage}%):
//                     </span>
//                     <span className="font-bold text-primary ml-1">
//                       ${parcel.riderEarning}
//                     </span>
//                   </div>
//                 </div>

//                 {parcel.cashoutStatus === "pending" ? (
//                   <button
//                     className="btn btn-warning btn-sm"
//                     onClick={() => handleCashout(parcel._id)}
//                     disabled={cashoutMutation.isPending}
//                   >
//                     {cashoutMutation.isPending ? (
//                       <span className="loading loading-spinner loading-xs"></span>
//                     ) : (
//                       "Cashout"
//                     )}
//                   </button>
//                 ) : (
//                   <div className="text-right">
//                     <div className="badge badge-success">Cashed Out</div>
//                     <p className="text-xs text-base-content/70 mt-1">
//                       {formatDate(parcel.cashedOutAt)}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredParcels.length === 0 && (
//         <div className="text-center py-10">
//           <p className="text-lg text-base-content/70">
//             No deliveries found for this filter.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompletedDeliveries;

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState("all");

  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["rider-completed-deliveries", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider/${user?.email}/completed`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation for cashout
  const cashoutMutation = useMutation({
    mutationFn: async (parcelId) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/cashout`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Cashout successful! 💰");
      queryClient.invalidateQueries(["rider-completed-deliveries"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to process cashout"
      );
    },
  });

  const handleCashout = (parcelId) => {
    cashoutMutation.mutate(parcelId);
  };

  // Filter parcels
  const filteredParcels = parcels.filter((parcel) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "pending") return parcel.cashoutStatus === "pending";
    if (filterStatus === "completed")
      return parcel.cashoutStatus === "completed";
    return true;
  });

  // Calculate earnings
  const totalEarnings = parcels.reduce(
    (sum, parcel) => sum + (parcel.riderEarning || 0),
    0
  );
  const pendingEarnings = parcels
    .filter((p) => p.cashoutStatus === "pending")
    .reduce((sum, parcel) => sum + (parcel.riderEarning || 0), 0);
  const cashedOutEarnings = parcels
    .filter((p) => p.cashoutStatus === "completed")
    .reduce((sum, parcel) => sum + (parcel.riderEarning || 0), 0);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate delivery time
  const calculateDeliveryTime = (startDate, endDate) => {
    if (!startDate || !endDate) return "N/A";
    const diff = new Date(endDate) - new Date(startDate);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
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
            No completed deliveries yet.
          </p>
          <p className="text-sm font-semibold">
            Completed deliveries will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-amber-50 min-h-screen">
      <h1 className="text-3xl font-black uppercase mb-6 border-b-4 border-black pb-2">
        Delivery History & Earnings
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-bold uppercase tracking-wider">
              Total Deliveries
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-8 h-8 stroke-current"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <div className="text-4xl font-black">{parcels.length}</div>
          <div className="text-sm font-semibold mt-1">
            Successfully completed
          </div>
        </div>

        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-bold uppercase tracking-wider">
              Total Earnings
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-8 h-8 stroke-current"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </div>
          <div className="text-4xl font-black">${totalEarnings.toFixed(2)}</div>
          <div className="text-sm font-semibold mt-1">From all deliveries</div>
        </div>

        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-bold uppercase tracking-wider">
              Pending Cashout
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-8 h-8 stroke-current text-yellow-600"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              ></path>
            </svg>
          </div>
          <div className="text-4xl font-black text-yellow-600">
            ${pendingEarnings.toFixed(2)}
          </div>
          <div className="text-sm font-semibold mt-1">Available to cashout</div>
        </div>

        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-bold uppercase tracking-wider">
              Cashed Out
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-8 h-8 stroke-current text-green-600"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="text-4xl font-black text-green-600">
            ${cashedOutEarnings.toFixed(2)}
          </div>
          <div className="text-sm font-semibold mt-1">Already withdrawn</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 bg-white border-4 border-black p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <button
          className={`flex-1 font-bold uppercase px-4 py-2 border-4 border-black transition-all ${
            filterStatus === "all"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
          onClick={() => setFilterStatus("all")}
        >
          All ({parcels.length})
        </button>
        <button
          className={`flex-1 font-bold uppercase px-4 py-2 border-4 border-black transition-all ${
            filterStatus === "pending"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
          onClick={() => setFilterStatus("pending")}
        >
          Pending Cashout (
          {parcels.filter((p) => p.cashoutStatus === "pending").length})
        </button>
        <button
          className={`flex-1 font-bold uppercase px-4 py-2 border-4 border-black transition-all ${
            filterStatus === "completed"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
          onClick={() => setFilterStatus("completed")}
        >
          Cashed Out (
          {parcels.filter((p) => p.cashoutStatus === "completed").length})
        </button>
      </div>

      {/* Delivery Cards */}
      <div className="grid gap-4">
        {filteredParcels.map((parcel) => (
          <div
            key={parcel._id}
            className="bg-white border-4 border-black border-l-8 border-l-green-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b-4 border-black">
                <div className="flex-1">
                  <h3 className="text-lg font-black uppercase flex items-center gap-2 flex-wrap">
                    {parcel.tracking_id}
                    {parcel.isSameDistrict ? (
                      <span className="bg-blue-400 border-2 border-black px-2 py-1 text-xs font-bold uppercase">
                        Same District
                      </span>
                    ) : (
                      <span className="bg-purple-400 border-2 border-black px-2 py-1 text-xs font-bold uppercase">
                        Cross District
                      </span>
                    )}
                  </h3>
                  <p className="text-sm font-semibold">
                    {parcel.title || parcel.type}
                  </p>
                </div>

                <div className="text-right">
                  {parcel.cashoutStatus === "pending" ? (
                    <div className="bg-yellow-400 border-2 border-black px-4 py-2 font-bold uppercase text-sm mb-2">
                      Pending Cashout
                    </div>
                  ) : (
                    <div className="bg-green-400 border-2 border-black px-4 py-2 font-bold uppercase text-sm mb-2">
                      Cashed Out
                    </div>
                  )}
                  <p className="text-xs font-semibold">
                    Delivered: {formatDate(parcel.deliveredAt)}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-100 border-4 border-black p-4 mb-4">
                <h4 className="font-black text-xs uppercase mb-3 tracking-wider border-b-2 border-black pb-1">
                  Delivery Timeline
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-white border-2 border-black p-2">
                    <p className="text-xs font-bold uppercase">Assigned</p>
                    <p className="text-sm font-semibold">
                      {formatDate(parcel.assignedAt)}
                    </p>
                  </div>
                  <div className="bg-white border-2 border-black p-2">
                    <p className="text-xs font-bold uppercase">
                      Started Delivery
                    </p>
                    <p className="text-sm font-semibold">
                      {formatDate(parcel.startedDeliveryAt)}
                    </p>
                  </div>
                  <div className="bg-white border-2 border-black p-2">
                    <p className="text-xs font-bold uppercase">Delivered</p>
                    <p className="text-sm font-semibold">
                      {formatDate(parcel.deliveredAt)}
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t-2 border-black">
                  <p className="text-xs font-bold uppercase">
                    Total Delivery Time
                  </p>
                  <p className="text-sm font-black">
                    {calculateDeliveryTime(
                      parcel.startedDeliveryAt,
                      parcel.deliveredAt
                    )}
                  </p>
                </div>
              </div>

              {/* Pickup & Delivery Info */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-100 border-4 border-black p-4">
                  <h4 className="font-black text-xs uppercase mb-2 tracking-wider border-b-2 border-black pb-1">
                    📦 Picked Up From
                  </h4>
                  <p className="font-bold">{parcel.senderName}</p>
                  <p className="text-sm font-semibold">
                    {parcel.senderContact}
                  </p>
                  <p className="text-sm mt-1">{parcel.senderAddress}</p>
                  <p className="text-sm font-bold mt-1">
                    {parcel.senderService}, {parcel.senderDistrict}
                  </p>
                </div>

                <div className="bg-gray-100 border-4 border-black p-4">
                  <h4 className="font-black text-xs uppercase mb-2 tracking-wider border-b-2 border-black pb-1">
                    ✅ Delivered To
                  </h4>
                  <p className="font-bold">{parcel.receiverName}</p>
                  <p className="text-sm font-semibold">
                    {parcel.receiverContact}
                  </p>
                  <p className="text-sm mt-1">{parcel.receiverAddress}</p>
                  <p className="text-sm font-bold mt-1">
                    {parcel.receiverService}, {parcel.receiverDistrict}
                  </p>
                </div>
              </div>

              {/* Earnings & Actions */}
              <div className="border-t-4 border-black pt-4"></div>

              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="font-bold uppercase text-xs">Weight:</span>
                    <span className="font-black ml-1">{parcel.weight} kg</span>
                  </div>
                  <div>
                    <span className="font-bold uppercase text-xs">
                      Parcel Cost:
                    </span>
                    <span className="font-black ml-1">${parcel.cost}</span>
                  </div>
                  <div>
                    <span className="font-bold uppercase text-xs">
                      Your Earnings ({parcel.earningPercentage}%):
                    </span>
                    <span className="font-black ml-1">
                      ${parcel.riderEarning}
                    </span>
                  </div>
                </div>

                {parcel.cashoutStatus === "pending" ? (
                  <button
                    className="bg-yellow-400 text-black font-bold uppercase px-6 py-2 border-4 border-black hover:bg-yellow-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none text-sm"
                    onClick={() => handleCashout(parcel._id)}
                    disabled={cashoutMutation.isPending}
                  >
                    {cashoutMutation.isPending ? (
                      <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full"></span>
                    ) : (
                      "Cashout"
                    )}
                  </button>
                ) : (
                  <div className="text-right">
                    <div className="bg-green-400 border-2 border-black px-3 py-1 font-bold uppercase text-xs">
                      Cashed Out
                    </div>
                    <p className="text-xs font-semibold mt-1">
                      {formatDate(parcel.cashedOutAt)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredParcels.length === 0 && (
        <div className="text-center py-10">
          <div className="bg-yellow-100 border-4 border-black p-6 inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-lg font-bold uppercase">
              No deliveries found for this filter.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletedDeliveries;
