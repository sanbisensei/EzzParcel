// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import {
//   FiPackage,
//   FiCheckCircle,
//   FiClock,
//   FiTruck,
//   FiMapPin,
// } from "react-icons/fi";

// const TrackParcel = () => {
//   const [trackingId, setTrackingId] = useState("");
//   const [searchedId, setSearchedId] = useState("");
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: trackingData,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["tracking", searchedId],
//     queryFn: async () => {
//       if (!searchedId) return null;
//       const res = await axiosSecure.get(`/tracking/${searchedId}`);
//       return res.data;
//     },
//     enabled: !!searchedId,
//     retry: false,
//   });

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (trackingId.trim()) {
//       setSearchedId(trackingId.trim().toUpperCase());
//     }
//   };

//   const getStatusIcon = (status, completed) => {
//     if (completed) {
//       return <FiCheckCircle className="text-success text-2xl" />;
//     }
//     return <FiClock className="text-base-content/30 text-2xl" />;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "Pending";
//     const date = new Date(dateString);
//     return date.toLocaleString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getDeliveryStatusBadge = (status) => {
//     const statusMap = {
//       "not collected": { color: "badge-warning", text: "Not Collected" },
//       assigned: { color: "badge-info", text: "Rider Assigned" },
//       "in-transit": { color: "badge-primary", text: "In Transit" },
//       delivered: { color: "badge-success", text: "Delivered" },
//     };
//     const statusInfo = statusMap[status] || {
//       color: "badge-ghost",
//       text: status,
//     };
//     return (
//       <span className={`badge ${statusInfo.color}`}>{statusInfo.text}</span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-base-200 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold mb-2">Track Your Parcel</h1>
//           <p className="text-base-content/70">
//             Enter your tracking ID to see real-time delivery status
//           </p>
//         </div>

//         {/* Search Form */}
//         <div className="card bg-base-100 shadow-xl mb-6">
//           <div className="card-body">
//             <form onSubmit={handleSearch} className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Enter Tracking ID (e.g., TRK-XXX-XXX)"
//                 className="input input-bordered flex-1 text-lg"
//                 value={trackingId}
//                 onChange={(e) => setTrackingId(e.target.value)}
//                 required
//               />
//               <button type="submit" className="btn btn-primary btn-lg">
//                 <FiPackage className="mr-2" />
//                 Track
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="flex justify-center items-center py-20">
//             <span className="loading loading-spinner loading-lg text-primary"></span>
//           </div>
//         )}

//         {/* Error State */}
//         {isError && (
//           <div className="alert alert-error shadow-lg">
//             <div>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="stroke-current flex-shrink-0 h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <span>
//                 {error?.response?.data?.message ||
//                   "Tracking ID not found. Please check and try again."}
//               </span>
//             </div>
//           </div>
//         )}

//         {/* Tracking Results */}
//         {trackingData && trackingData.success && (
//           <div className="space-y-6">
//             {/* Parcel Info Card */}
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h2 className="text-2xl font-bold mb-1">
//                       {trackingData.parcel.title || "Parcel"}
//                     </h2>
//                     <p className="font-mono text-lg text-primary">
//                       {trackingData.parcel.tracking_id}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     {getDeliveryStatusBadge(
//                       trackingData.parcel.delivery_status
//                     )}
//                     <div className="mt-2">
//                       {trackingData.parcel.payment_status === "paid" ? (
//                         <span className="badge badge-success">Paid</span>
//                       ) : (
//                         <span className="badge badge-error">Unpaid</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="divider"></div>

//                 {/* Parcel Details Grid */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   {/* Sender Info */}
//                   <div className="space-y-2">
//                     <h3 className="font-semibold text-lg flex items-center gap-2">
//                       <FiMapPin className="text-primary" />
//                       From
//                     </h3>
//                     <div className="bg-base-200 p-4 rounded-lg">
//                       <p className="font-semibold">
//                         {trackingData.parcel.sender.name}
//                       </p>
//                       <p className="text-sm text-base-content/70">
//                         {trackingData.parcel.sender.service}
//                       </p>
//                       <p className="text-sm">
//                         {trackingData.parcel.sender.district},{" "}
//                         {trackingData.parcel.sender.region}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Receiver Info */}
//                   <div className="space-y-2">
//                     <h3 className="font-semibold text-lg flex items-center gap-2">
//                       <FiMapPin className="text-success" />
//                       To
//                     </h3>
//                     <div className="bg-base-200 p-4 rounded-lg">
//                       <p className="font-semibold">
//                         {trackingData.parcel.receiver.name}
//                       </p>
//                       <p className="text-sm text-base-content/70">
//                         {trackingData.parcel.receiver.service}
//                       </p>
//                       <p className="text-sm">
//                         {trackingData.parcel.receiver.district},{" "}
//                         {trackingData.parcel.receiver.region}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Additional Info */}
//                 <div className="flex flex-wrap gap-4 mt-4">
//                   <div className="stat bg-base-200 rounded-lg flex-1 min-w-[150px]">
//                     <div className="stat-title">Type</div>
//                     <div className="stat-value text-2xl capitalize">
//                       {trackingData.parcel.type}
//                     </div>
//                   </div>
//                   {trackingData.parcel.weight && (
//                     <div className="stat bg-base-200 rounded-lg flex-1 min-w-[150px]">
//                       <div className="stat-title">Weight</div>
//                       <div className="stat-value text-2xl">
//                         {trackingData.parcel.weight} kg
//                       </div>
//                     </div>
//                   )}
//                   <div className="stat bg-base-200 rounded-lg flex-1 min-w-[150px]">
//                     <div className="stat-title">Cost</div>
//                     <div className="stat-value text-2xl">
//                       ৳{trackingData.parcel.cost}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Rider Info (if assigned) */}
//                 {trackingData.parcel.rider && (
//                   <div className="alert alert-info mt-4">
//                     <FiTruck className="text-xl" />
//                     <div>
//                       <h3 className="font-bold">Rider Assigned</h3>
//                       <div className="text-sm">
//                         {trackingData.parcel.rider.name} -{" "}
//                         {trackingData.parcel.rider.email}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Timeline Card */}
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <h2 className="card-title text-2xl mb-6">Delivery Timeline</h2>

//                 <ul className="timeline timeline-vertical">
//                   {trackingData.timeline.map((item, index) => (
//                     <li key={index}>
//                       {index !== 0 && (
//                         <hr className={item.completed ? "bg-success" : ""} />
//                       )}
//                       <div className="timeline-start text-sm text-base-content/70">
//                         {formatDate(item.timestamp)}
//                       </div>
//                       <div className="timeline-middle">
//                         {getStatusIcon(item.status, item.completed)}
//                       </div>
//                       <div
//                         className={`timeline-end timeline-box ${
//                           item.current ? "border-2 border-primary" : ""
//                         } ${!item.completed ? "opacity-50" : ""}`}
//                       >
//                         <div className="font-bold text-lg">{item.title}</div>
//                         <p className="text-sm text-base-content/70">
//                           {item.description}
//                         </p>
//                         {item.current && (
//                           <div className="badge badge-primary badge-sm mt-2">
//                             Current Status
//                           </div>
//                         )}
//                       </div>
//                       {index !== trackingData.timeline.length - 1 && (
//                         <hr
//                           className={
//                             trackingData.timeline[index + 1].completed
//                               ? "bg-success"
//                               : ""
//                           }
//                         />
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Refresh Button */}
//             <div className="text-center">
//               <button
//                 onClick={() => refetch()}
//                 className="btn btn-outline btn-primary"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <span className="loading loading-spinner"></span>
//                 ) : (
//                   "Refresh Status"
//                 )}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Initial State - No Search Yet */}
//         {!searchedId && !isLoading && (
//           <div className="text-center py-20">
//             <FiPackage className="text-6xl text-base-content/30 mx-auto mb-4" />
//             <p className="text-xl text-base-content/70">
//               Enter a tracking ID above to start tracking your parcel
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TrackParcel;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiMapPin,
} from "react-icons/fi";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [searchedId, setSearchedId] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    data: trackingData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tracking", searchedId],
    queryFn: async () => {
      if (!searchedId) return null;
      const res = await axiosSecure.get(`/tracking/${searchedId}`);
      return res.data;
    },
    enabled: !!searchedId,
    retry: false,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      setSearchedId(trackingId.trim().toUpperCase());
    }
  };

  const getStatusIcon = (status, completed) => {
    if (completed) {
      return <FiCheckCircle className="text-green-500 text-2xl" />;
    }
    return <FiClock className="text-gray-400 text-2xl" />;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Pending";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDeliveryStatusBadge = (status) => {
    const statusMap = {
      "not collected": { color: "bg-yellow-400", text: "Not Collected" },
      assigned: { color: "bg-cyan-400", text: "Rider Assigned" },
      "in-transit": { color: "bg-blue-400", text: "In Transit" },
      delivered: { color: "bg-green-400", text: "Delivered" },
    };
    const statusInfo = statusMap[status] || {
      color: "bg-gray-300",
      text: status,
    };
    return (
      <span
        className={`inline-block px-4 py-2 ${statusInfo.color} border-2 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
      >
        {statusInfo.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase bg-[#FF6E6C] border-4 border-black p-4 inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            Track Your Parcel
          </h1>
          <p className="text-lg font-bold mt-6">
            Enter your tracking ID to see real-time delivery status
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-cyan-400 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-6">
          <div className="p-6">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-4"
            >
              <input
                type="text"
                placeholder="Enter Tracking ID (e.g., TRK-XXX-XXX)"
                className="flex-1 text-lg px-4 py-3 border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#FF6E6C] border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <FiPackage />
                Track
              </button>
            </form>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-4xl font-black uppercase animate-pulse">
              Loading...
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-bold text-lg">
                {error?.response?.data?.message ||
                  "Tracking ID not found. Please check and try again."}
              </span>
            </div>
          </div>
        )}

        {/* Tracking Results */}
        {trackingData && trackingData.success && (
          <div className="space-y-6">
            {/* Parcel Info Card */}
            <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                  <div>
                    <h2 className="text-3xl font-black mb-2 uppercase">
                      {trackingData.parcel.title || "Parcel"}
                    </h2>
                    <p className="font-mono text-xl font-bold bg-cyan-400 border-2 border-black px-3 py-1 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {trackingData.parcel.tracking_id}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    {getDeliveryStatusBadge(
                      trackingData.parcel.delivery_status
                    )}
                    <div>
                      {trackingData.parcel.payment_status === "paid" ? (
                        <span className="inline-block px-3 py-1 bg-green-400 border-2 border-black font-bold uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          Paid
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 bg-red-400 border-2 border-black font-bold uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          Unpaid
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t-4 border-black my-6"></div>

                {/* Parcel Details Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Sender Info */}
                  <div className="space-y-2">
                    <h3 className="font-black text-xl flex items-center gap-2 uppercase">
                      <FiMapPin className="text-[#FF6E6C]" />
                      From
                    </h3>
                    <div className="bg-yellow-200 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <p className="font-bold text-lg">
                        {trackingData.parcel.sender.name}
                      </p>
                      <p className="text-sm font-semibold">
                        {trackingData.parcel.sender.service}
                      </p>
                      <p className="text-sm font-semibold">
                        {trackingData.parcel.sender.district},{" "}
                        {trackingData.parcel.sender.region}
                      </p>
                    </div>
                  </div>

                  {/* Receiver Info */}
                  <div className="space-y-2">
                    <h3 className="font-black text-xl flex items-center gap-2 uppercase">
                      <FiMapPin className="text-green-500" />
                      To
                    </h3>
                    <div className="bg-green-200 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <p className="font-bold text-lg">
                        {trackingData.parcel.receiver.name}
                      </p>
                      <p className="text-sm font-semibold">
                        {trackingData.parcel.receiver.service}
                      </p>
                      <p className="text-sm font-semibold">
                        {trackingData.parcel.receiver.district},{" "}
                        {trackingData.parcel.receiver.region}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="bg-blue-200 border-4 border-black p-4 flex-1 min-w-[150px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-sm font-bold uppercase mb-1">Type</div>
                    <div className="text-2xl font-black capitalize">
                      {trackingData.parcel.type}
                    </div>
                  </div>
                  {trackingData.parcel.weight && (
                    <div className="bg-purple-200 border-4 border-black p-4 flex-1 min-w-[150px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="text-sm font-bold uppercase mb-1">
                        Weight
                      </div>
                      <div className="text-2xl font-black">
                        {trackingData.parcel.weight} kg
                      </div>
                    </div>
                  )}
                  <div className="bg-pink-200 border-4 border-black p-4 flex-1 min-w-[150px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-sm font-bold uppercase mb-1">Cost</div>
                    <div className="text-2xl font-black">
                      ৳{trackingData.parcel.cost}
                    </div>
                  </div>
                </div>

                {/* Rider Info (if assigned) */}
                {trackingData.parcel.rider && (
                  <div className="bg-cyan-300 border-4 border-black p-4 mt-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-4">
                      <FiTruck className="text-3xl" />
                      <div>
                        <h3 className="font-black uppercase text-lg">
                          Rider Assigned
                        </h3>
                        <div className="text-sm font-bold">
                          {trackingData.parcel.rider.name} -{" "}
                          {trackingData.parcel.rider.email}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline Card */}
            <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="p-6">
                <h2 className="text-3xl font-black mb-6 uppercase bg-[#FF6E6C] border-2 border-black p-3 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  Delivery Timeline
                </h2>

                <ul className="timeline timeline-vertical mt-8">
                  {trackingData.timeline.map((item, index) => (
                    <li key={index}>
                      {index !== 0 && (
                        <hr
                          className={
                            item.completed
                              ? "bg-green-500 h-1"
                              : "bg-gray-300 h-1"
                          }
                        />
                      )}
                      <div className="timeline-start text-sm font-bold">
                        {formatDate(item.timestamp)}
                      </div>
                      <div className="timeline-middle">
                        {getStatusIcon(item.status, item.completed)}
                      </div>
                      <div
                        className={`timeline-end bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                          item.current ? "bg-yellow-100" : ""
                        } ${!item.completed ? "opacity-50" : ""}`}
                      >
                        <div className="font-black text-lg uppercase">
                          {item.title}
                        </div>
                        <p className="text-sm font-semibold mt-1">
                          {item.description}
                        </p>
                        {item.current && (
                          <div className="inline-block px-2 py-1 bg-blue-400 border-2 border-black font-bold uppercase text-xs mt-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            Current Status
                          </div>
                        )}
                      </div>
                      {index !== trackingData.timeline.length - 1 && (
                        <hr
                          className={
                            trackingData.timeline[index + 1].completed
                              ? "bg-green-500 h-1"
                              : "bg-gray-300 h-1"
                          }
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Refresh Button */}
            <div className="text-center">
              <button
                onClick={() => refetch()}
                className="px-8 py-3 bg-cyan-400 border-4 border-black font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Refresh Status"}
              </button>
            </div>
          </div>
        )}

        {/* Initial State - No Search Yet */}
        {!searchedId && !isLoading && (
          <div className="text-center py-20 border-4 border-black bg-gray-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <FiPackage className="text-8xl mx-auto mb-6" />
            <p className="text-2xl font-black uppercase">
              Enter a tracking ID above to start tracking your parcel
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackParcel;
