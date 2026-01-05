// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const ManageFeedbacks = () => {
//   const axiosSecure = useAxiosSecure();
//   const [filterRating, setFilterRating] = useState("all");
//   const [filterCondition, setFilterCondition] = useState("all");
//   const [searchRider, setSearchRider] = useState("");

//   const {
//     data: feedbacks = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["all-feedbacks"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/feedbacks");
//       return res.data;
//     },
//   });

//   // Filter feedbacks
//   const filteredFeedbacks = feedbacks.filter((feedback) => {
//     const matchesRating =
//       filterRating === "all" || feedback.rating === parseInt(filterRating);
//     const matchesCondition =
//       filterCondition === "all" || feedback.parcelCondition === filterCondition;
//     const matchesRider =
//       searchRider === "" ||
//       feedback.riderName.toLowerCase().includes(searchRider.toLowerCase()) ||
//       feedback.riderEmail.toLowerCase().includes(searchRider.toLowerCase());

//     return matchesRating && matchesCondition && matchesRider;
//   });

//   // Calculate stats
//   const totalFeedbacks = feedbacks.length;
//   const averageRating =
//     feedbacks.length > 0
//       ? (
//           feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
//         ).toFixed(2)
//       : 0;
//   const damagedCount = feedbacks.filter(
//     (f) =>
//       f.parcelCondition === "damaged" ||
//       f.parcelCondition === "partially_damaged"
//   ).length;

//   const StarDisplay = ({ rating }) => {
//     return (
//       <div className="flex gap-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <svg
//             key={star}
//             xmlns="http://www.w3.org/2000/svg"
//             fill={star <= rating ? "currentColor" : "none"}
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             className={`w-5 h-5 ${
//               star <= rating ? "text-warning" : "text-base-300"
//             }`}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//             />
//           </svg>
//         ))}
//       </div>
//     );
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
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

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-6">Manage Feedbacks</h1>

//       {/* Stats */}
//       <div className="stats stats-vertical lg:stats-horizontal shadow mb-6 w-full">
//         <div className="stat">
//           <div className="stat-title">Total Feedbacks</div>
//           <div className="stat-value text-primary">{totalFeedbacks}</div>
//           <div className="stat-desc">All time</div>
//         </div>
//         <div className="stat">
//           <div className="stat-title">Average Rating</div>
//           <div className="stat-value text-secondary">{averageRating}</div>
//           <div className="stat-desc">Out of 5 stars</div>
//         </div>
//         <div className="stat">
//           <div className="stat-title">Damaged Parcels</div>
//           <div className="stat-value text-error">{damagedCount}</div>
//           <div className="stat-desc">Reported issues</div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="card bg-base-100 shadow-xl mb-6">
//         <div className="card-body">
//           <h2 className="card-title mb-4">Filters</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* Search Rider */}
//             <div>
//               <label className="label">
//                 <span className="label-text">Search Rider</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Rider name or email..."
//                 className="input input-bordered w-full"
//                 value={searchRider}
//                 onChange={(e) => setSearchRider(e.target.value)}
//               />
//             </div>

//             {/* Filter by Rating */}
//             <div>
//               <label className="label">
//                 <span className="label-text">Rating</span>
//               </label>
//               <select
//                 className="select select-bordered w-full"
//                 value={filterRating}
//                 onChange={(e) => setFilterRating(e.target.value)}
//               >
//                 <option value="all">All Ratings</option>
//                 <option value="5">5 Stars</option>
//                 <option value="4">4 Stars</option>
//                 <option value="3">3 Stars</option>
//                 <option value="2">2 Stars</option>
//                 <option value="1">1 Star</option>
//               </select>
//             </div>

//             {/* Filter by Condition */}
//             <div>
//               <label className="label">
//                 <span className="label-text">Parcel Condition</span>
//               </label>
//               <select
//                 className="select select-bordered w-full"
//                 value={filterCondition}
//                 onChange={(e) => setFilterCondition(e.target.value)}
//               >
//                 <option value="all">All Conditions</option>
//                 <option value="good">Good</option>
//                 <option value="partially_damaged">Partially Damaged</option>
//                 <option value="damaged">Damaged</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Feedbacks List */}
//       {filteredFeedbacks.length === 0 ? (
//         <div className="text-center py-10">
//           <p className="text-lg text-base-content/70">No feedbacks found.</p>
//         </div>
//       ) : (
//         <div className="grid gap-4">
//           {filteredFeedbacks.map((feedback) => (
//             <div
//               key={feedback._id}
//               className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
//             >
//               <div className="card-body">
//                 {/* Header */}
//                 <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
//                   <div>
//                     <h3 className="card-title text-lg">
//                       {feedback.trackingId}
//                     </h3>
//                     <p className="text-sm text-base-content/70">
//                       {formatDate(feedback.createdAt)}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <StarDisplay rating={feedback.rating} />
//                     <p className="text-sm font-semibold mt-1">
//                       {feedback.rating}/5 Stars
//                     </p>
//                   </div>
//                 </div>

//                 {/* Rider & User Info */}
//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <div className="bg-base-200 p-4 rounded-lg">
//                     <h4 className="font-semibold text-sm mb-2">Rider</h4>
//                     <p className="font-semibold">{feedback.riderName}</p>
//                     <p className="text-sm text-base-content/70">
//                       {feedback.riderEmail}
//                     </p>
//                   </div>
//                   <div className="bg-base-200 p-4 rounded-lg">
//                     <h4 className="font-semibold text-sm mb-2">User</h4>
//                     <p className="font-semibold">{feedback.userName}</p>
//                     <p className="text-sm text-base-content/70">
//                       {feedback.userEmail}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Details */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
//                   <div>
//                     <p className="text-xs text-base-content/60">
//                       Parcel Condition
//                     </p>
//                     <div
//                       className={`badge mt-1 ${
//                         feedback.parcelCondition === "good"
//                           ? "badge-success"
//                           : feedback.parcelCondition === "partially_damaged"
//                           ? "badge-warning"
//                           : "badge-error"
//                       }`}
//                     >
//                       {feedback.parcelCondition.replace("_", " ")}
//                     </div>
//                   </div>
//                   {feedback.deliverySpeed > 0 && (
//                     <div>
//                       <p className="text-xs text-base-content/60">
//                         Delivery Speed
//                       </p>
//                       <p className="text-sm font-semibold">
//                         {feedback.deliverySpeed}/5
//                       </p>
//                     </div>
//                   )}
//                   {feedback.riderBehavior > 0 && (
//                     <div>
//                       <p className="text-xs text-base-content/60">
//                         Rider Behavior
//                       </p>
//                       <p className="text-sm font-semibold">
//                         {feedback.riderBehavior}/5
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Feedback Message */}
//                 {feedback.feedbackMessage && (
//                   <div className="bg-base-200 p-4 rounded-lg">
//                     <h4 className="font-semibold text-sm mb-2">Comments</h4>
//                     <p className="text-sm">{feedback.feedbackMessage}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageFeedbacks;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageFeedbacks = () => {
  const axiosSecure = useAxiosSecure();
  const [filterRating, setFilterRating] = useState("all");
  const [filterCondition, setFilterCondition] = useState("all");
  const [searchRider, setSearchRider] = useState("");

  const {
    data: feedbacks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-feedbacks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feedbacks");
      return res.data;
    },
  });

  // Filter feedbacks
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesRating =
      filterRating === "all" || feedback.rating === parseInt(filterRating);
    const matchesCondition =
      filterCondition === "all" || feedback.parcelCondition === filterCondition;
    const matchesRider =
      searchRider === "" ||
      feedback.riderName.toLowerCase().includes(searchRider.toLowerCase()) ||
      feedback.riderEmail.toLowerCase().includes(searchRider.toLowerCase());

    return matchesRating && matchesCondition && matchesRider;
  });

  // Calculate stats
  const totalFeedbacks = feedbacks.length;
  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
        ).toFixed(2)
      : 0;
  const damagedCount = feedbacks.filter(
    (f) =>
      f.parcelCondition === "damaged" ||
      f.parcelCondition === "partially_damaged"
  ).length;

  const StarDisplay = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            fill={star <= rating ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  return (
    <div className="p-4 bg-amber-50 min-h-screen">
      <h1 className="text-3xl font-black uppercase mb-6 border-b-4 border-black pb-2">
        Manage Feedbacks
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="text-sm font-bold uppercase tracking-wider mb-1">
            Total Feedbacks
          </div>
          <div className="text-4xl font-black">{totalFeedbacks}</div>
          <div className="text-sm font-semibold mt-1">All time</div>
        </div>
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="text-sm font-bold uppercase tracking-wider mb-1">
            Average Rating
          </div>
          <div className="text-4xl font-black">{averageRating}</div>
          <div className="text-sm font-semibold mt-1">Out of 5 stars</div>
        </div>
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="text-sm font-bold uppercase tracking-wider mb-1">
            Damaged Parcels
          </div>
          <div className="text-4xl font-black text-red-600">{damagedCount}</div>
          <div className="text-sm font-semibold mt-1">Reported issues</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
        <div className="p-6">
          <h2 className="text-xl font-black uppercase mb-4 border-b-4 border-black pb-2">
            Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Rider */}
            <div>
              <label className="block text-xs font-bold uppercase mb-1 tracking-wider">
                Search Rider
              </label>
              <input
                type="text"
                placeholder="Rider name or email..."
                className="w-full px-3 py-2 border-4 border-black font-mono text-sm focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                value={searchRider}
                onChange={(e) => setSearchRider(e.target.value)}
              />
            </div>

            {/* Filter by Rating */}
            <div>
              <label className="block text-xs font-bold uppercase mb-1 tracking-wider">
                Rating
              </label>
              <select
                className="w-full px-3 py-2 border-4 border-black font-mono text-sm focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            {/* Filter by Condition */}
            <div>
              <label className="block text-xs font-bold uppercase mb-1 tracking-wider">
                Parcel Condition
              </label>
              <select
                className="w-full px-3 py-2 border-4 border-black font-mono text-sm focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                value={filterCondition}
                onChange={(e) => setFilterCondition(e.target.value)}
              >
                <option value="all">All Conditions</option>
                <option value="good">Good</option>
                <option value="partially_damaged">Partially Damaged</option>
                <option value="damaged">Damaged</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Feedbacks List */}
      {filteredFeedbacks.length === 0 ? (
        <div className="text-center py-10">
          <div className="bg-yellow-100 border-4 border-black p-6 inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-lg font-bold uppercase">No feedbacks found.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredFeedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b-4 border-black">
                  <div>
                    <h3 className="text-lg font-black uppercase">
                      {feedback.trackingId}
                    </h3>
                    <p className="text-sm font-semibold">
                      {formatDate(feedback.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <StarDisplay rating={feedback.rating} />
                    <p className="text-sm font-bold mt-1">
                      {feedback.rating}/5 Stars
                    </p>
                  </div>
                </div>

                {/* Rider & User Info */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-100 border-2 border-black p-4">
                    <h4 className="font-black text-xs uppercase mb-2 tracking-wider">
                      Rider
                    </h4>
                    <p className="font-bold">{feedback.riderName}</p>
                    <p className="text-sm font-semibold">
                      {feedback.riderEmail}
                    </p>
                  </div>
                  <div className="bg-gray-100 border-2 border-black p-4">
                    <h4 className="font-black text-xs uppercase mb-2 tracking-wider">
                      User
                    </h4>
                    <p className="font-bold">{feedback.userName}</p>
                    <p className="text-sm font-semibold">
                      {feedback.userEmail}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1">
                      Parcel Condition
                    </p>
                    <div
                      className={`inline-block px-2 py-1 text-xs font-bold uppercase border-2 border-black ${
                        feedback.parcelCondition === "good"
                          ? "bg-green-400"
                          : feedback.parcelCondition === "partially_damaged"
                          ? "bg-yellow-400"
                          : "bg-red-400"
                      }`}
                    >
                      {feedback.parcelCondition.replace("_", " ")}
                    </div>
                  </div>
                  {feedback.deliverySpeed > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-1">
                        Delivery Speed
                      </p>
                      <p className="text-sm font-black">
                        {feedback.deliverySpeed}/5
                      </p>
                    </div>
                  )}
                  {feedback.riderBehavior > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-1">
                        Rider Behavior
                      </p>
                      <p className="text-sm font-black">
                        {feedback.riderBehavior}/5
                      </p>
                    </div>
                  )}
                </div>

                {/* Feedback Message */}
                {feedback.feedbackMessage && (
                  <div className="bg-gray-100 border-2 border-black p-4">
                    <h4 className="font-black text-xs uppercase mb-2 tracking-wider">
                      Comments
                    </h4>
                    <p className="text-sm font-semibold">
                      {feedback.feedbackMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageFeedbacks;
