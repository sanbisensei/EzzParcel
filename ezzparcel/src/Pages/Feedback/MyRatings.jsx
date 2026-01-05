// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";

// const MyRatings = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   // Fetch rider's rating stats
//   const { data: stats, isLoading: isLoadingStats } = useQuery({
//     queryKey: ["rider-rating-stats", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/riders/${user?.email}/rating-stats`);
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   // Fetch rider's feedbacks
//   const { data: feedbacks = [], isLoading: isLoadingFeedbacks } = useQuery({
//     queryKey: ["rider-feedbacks", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/feedbacks/rider/${user?.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   const isLoading = isLoadingStats || isLoadingFeedbacks;

//   const StarDisplay = ({ rating, size = "w-5 h-5" }) => {
//     return (
//       <div className="flex gap-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <svg
//             key={star}
//             xmlns="http://www.w3.org/2000/svg"
//             fill={star <= rating ? "currentColor" : "none"}
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             className={`${size} ${
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

//   if (!stats || stats.totalFeedbacks === 0) {
//     return (
//       <div className="text-center py-10">
//         <p className="text-lg text-base-content/70">No ratings yet.</p>
//         <p className="text-sm text-base-content/50 mt-2">
//           Complete more deliveries to receive ratings from customers.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-6">My Ratings & Reviews</h1>

//       {/* Overall Stats */}
//       <div className="card bg-gradient-to-br from-primary to-primary-focus text-primary-content shadow-xl mb-6">
//         <div className="card-body text-center">
//           <h2 className="text-6xl font-bold mb-2">{stats.averageRating}</h2>
//           <StarDisplay
//             rating={Math.round(stats.averageRating)}
//             size="w-8 h-8"
//           />
//           <p className="text-lg opacity-90 mt-2">
//             Based on {stats.totalFeedbacks} review
//             {stats.totalFeedbacks !== 1 ? "s" : ""}
//           </p>
//         </div>
//       </div>

//       {/* Detailed Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <div className="stats shadow">
//           <div className="stat">
//             <div className="stat-title">Total Reviews</div>
//             <div className="stat-value text-primary">
//               {stats.totalFeedbacks}
//             </div>
//             <div className="stat-desc">All time</div>
//           </div>
//         </div>

//         {stats.averageDeliverySpeed > 0 && (
//           <div className="stats shadow">
//             <div className="stat">
//               <div className="stat-title">Delivery Speed</div>
//               <div className="stat-value text-secondary">
//                 {stats.averageDeliverySpeed.toFixed(1)}
//               </div>
//               <div className="stat-desc">Out of 5</div>
//             </div>
//           </div>
//         )}

//         {stats.averageRiderBehavior > 0 && (
//           <div className="stats shadow">
//             <div className="stat">
//               <div className="stat-title">Behavior Rating</div>
//               <div className="stat-value text-accent">
//                 {stats.averageRiderBehavior.toFixed(1)}
//               </div>
//               <div className="stat-desc">Out of 5</div>
//             </div>
//           </div>
//         )}

//         <div className="stats shadow">
//           <div className="stat">
//             <div className="stat-title">Good Condition</div>
//             <div className="stat-value text-success">
//               {stats.parcelConditionBreakdown.good}
//             </div>
//             <div className="stat-desc">Parcels delivered safely</div>
//           </div>
//         </div>
//       </div>

//       {/* Rating Breakdown */}
//       <div className="card bg-base-100 shadow-xl mb-6">
//         <div className="card-body">
//           <h2 className="card-title mb-4">Rating Breakdown</h2>
//           <div className="space-y-3">
//             {[5, 4, 3, 2, 1].map((rating) => {
//               const count = stats.ratingBreakdown[rating];
//               const percentage =
//                 stats.totalFeedbacks > 0
//                   ? ((count / stats.totalFeedbacks) * 100).toFixed(0)
//                   : 0;

//               return (
//                 <div key={rating} className="flex items-center gap-4">
//                   <div className="flex items-center gap-1 w-20">
//                     <span className="font-semibold">{rating}</span>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                       className="w-4 h-4 text-warning"
//                     >
//                       <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                     </svg>
//                   </div>
//                   <progress
//                     className="progress progress-warning flex-1"
//                     value={percentage}
//                     max="100"
//                   ></progress>
//                   <span className="text-sm w-16 text-right">
//                     {count} ({percentage}%)
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Parcel Condition Stats */}
//       <div className="card bg-base-100 shadow-xl mb-6">
//         <div className="card-body">
//           <h2 className="card-title mb-4">Parcel Condition Report</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="stat bg-success/10 rounded-lg">
//               <div className="stat-title">Good Condition</div>
//               <div className="stat-value text-success">
//                 {stats.parcelConditionBreakdown.good}
//               </div>
//               <div className="stat-desc">
//                 {stats.totalFeedbacks > 0
//                   ? `${(
//                       (stats.parcelConditionBreakdown.good /
//                         stats.totalFeedbacks) *
//                       100
//                     ).toFixed(0)}%`
//                   : "0%"}
//               </div>
//             </div>
//             <div className="stat bg-warning/10 rounded-lg">
//               <div className="stat-title">Partially Damaged</div>
//               <div className="stat-value text-warning">
//                 {stats.parcelConditionBreakdown.partially_damaged}
//               </div>
//               <div className="stat-desc">
//                 {stats.totalFeedbacks > 0
//                   ? `${(
//                       (stats.parcelConditionBreakdown.partially_damaged /
//                         stats.totalFeedbacks) *
//                       100
//                     ).toFixed(0)}%`
//                   : "0%"}
//               </div>
//             </div>
//             <div className="stat bg-error/10 rounded-lg">
//               <div className="stat-title">Damaged</div>
//               <div className="stat-value text-error">
//                 {stats.parcelConditionBreakdown.damaged}
//               </div>
//               <div className="stat-desc">
//                 {stats.totalFeedbacks > 0
//                   ? `${(
//                       (stats.parcelConditionBreakdown.damaged /
//                         stats.totalFeedbacks) *
//                       100
//                     ).toFixed(0)}%`
//                   : "0%"}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Feedbacks */}
//       <div className="card bg-base-100 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title mb-4">Recent Reviews</h2>
//           <div className="space-y-4">
//             {feedbacks.map((feedback) => (
//               <div
//                 key={feedback._id}
//                 className="card bg-base-200 hover:bg-base-300 transition-colors"
//               >
//                 <div className="card-body p-4">
//                   <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
//                     <div>
//                       <p className="font-semibold">{feedback.userName}</p>
//                       <p className="text-xs text-base-content/70">
//                         {feedback.trackingId} • {formatDate(feedback.createdAt)}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <StarDisplay rating={feedback.rating} size="w-4 h-4" />
//                       <p className="text-sm font-semibold mt-1">
//                         {feedback.rating}/5
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-2 mb-3">
//                     <div
//                       className={`badge badge-sm ${
//                         feedback.parcelCondition === "good"
//                           ? "badge-success"
//                           : feedback.parcelCondition === "partially_damaged"
//                           ? "badge-warning"
//                           : "badge-error"
//                       }`}
//                     >
//                       {feedback.parcelCondition.replace("_", " ")}
//                     </div>
//                     {feedback.deliverySpeed > 0 && (
//                       <div className="badge badge-sm badge-info">
//                         Speed: {feedback.deliverySpeed}/5
//                       </div>
//                     )}
//                     {feedback.riderBehavior > 0 && (
//                       <div className="badge badge-sm badge-secondary">
//                         Behavior: {feedback.riderBehavior}/5
//                       </div>
//                     )}
//                   </div>

//                   {feedback.feedbackMessage && (
//                     <p className="text-sm italic">
//                       &ldquo;{feedback.feedbackMessage}&rdquo;
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyRatings;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyRatings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch rider's rating stats
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["rider-rating-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/${user?.email}/rating-stats`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch rider's feedbacks
  const { data: feedbacks = [], isLoading: isLoadingFeedbacks } = useQuery({
    queryKey: ["rider-feedbacks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/feedbacks/rider/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const isLoading = isLoadingStats || isLoadingFeedbacks;

  const StarDisplay = ({ rating, size = "w-5 h-5" }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            fill={star <= rating ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`${size} ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            } stroke-2`}
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
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!stats || stats.totalFeedbacks === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-base-content/70">No ratings yet.</p>
        <p className="text-sm text-base-content/50 mt-2">
          Complete more deliveries to receive ratings from customers.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 border-4 border-black bg-yellow-300 p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block">
        My Ratings & Reviews
      </h1>

      {/* Overall Stats */}
      <div className="bg-gradient-to-br from-blue-400 to-blue-500 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
        <div className="p-8 text-center">
          <h2 className="text-6xl font-bold mb-2">{stats.averageRating}</h2>
          <StarDisplay
            rating={Math.round(stats.averageRating)}
            size="w-8 h-8"
          />
          <p className="text-lg font-semibold mt-2">
            Based on {stats.totalFeedbacks} review
            {stats.totalFeedbacks !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="p-6">
            <div className="text-sm font-bold uppercase mb-2">
              Total Reviews
            </div>
            <div className="text-4xl font-bold text-blue-500 mb-1">
              {stats.totalFeedbacks}
            </div>
            <div className="text-sm font-semibold">All time</div>
          </div>
        </div>

        {stats.averageDeliverySpeed > 0 && (
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="p-6">
              <div className="text-sm font-bold uppercase mb-2">
                Delivery Speed
              </div>
              <div className="text-4xl font-bold text-pink-500 mb-1">
                {stats.averageDeliverySpeed.toFixed(1)}
              </div>
              <div className="text-sm font-semibold">Out of 5</div>
            </div>
          </div>
        )}

        {stats.averageRiderBehavior > 0 && (
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="p-6">
              <div className="text-sm font-bold uppercase mb-2">
                Behavior Rating
              </div>
              <div className="text-4xl font-bold text-purple-500 mb-1">
                {stats.averageRiderBehavior.toFixed(1)}
              </div>
              <div className="text-sm font-semibold">Out of 5</div>
            </div>
          </div>
        )}

        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="p-6">
            <div className="text-sm font-bold uppercase mb-2">
              Good Condition
            </div>
            <div className="text-4xl font-bold text-green-500 mb-1">
              {stats.parcelConditionBreakdown.good}
            </div>
            <div className="text-sm font-semibold">
              Parcels delivered safely
            </div>
          </div>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-4 border-black pb-2">
            Rating Breakdown
          </h2>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats.ratingBreakdown[rating];
              const percentage =
                stats.totalFeedbacks > 0
                  ? ((count / stats.totalFeedbacks) * 100).toFixed(0)
                  : 0;

              return (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-20">
                    <span className="font-bold">{rating}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-yellow-400"
                    >
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div className="flex-1 bg-gray-200 h-8 border-4 border-black relative overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full border-r-4 border-black"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold w-16 text-right">
                    {count} ({percentage}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Parcel Condition Stats */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-4 border-black pb-2">
            Parcel Condition Report
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-100 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-sm font-bold uppercase mb-2">
                Good Condition
              </div>
              <div className="text-4xl font-bold text-green-600 mb-1">
                {stats.parcelConditionBreakdown.good}
              </div>
              <div className="text-sm font-semibold">
                {stats.totalFeedbacks > 0
                  ? `${(
                      (stats.parcelConditionBreakdown.good /
                        stats.totalFeedbacks) *
                      100
                    ).toFixed(0)}%`
                  : "0%"}
              </div>
            </div>
            <div className="bg-yellow-100 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-sm font-bold uppercase mb-2">
                Partially Damaged
              </div>
              <div className="text-4xl font-bold text-yellow-600 mb-1">
                {stats.parcelConditionBreakdown.partially_damaged}
              </div>
              <div className="text-sm font-semibold">
                {stats.totalFeedbacks > 0
                  ? `${(
                      (stats.parcelConditionBreakdown.partially_damaged /
                        stats.totalFeedbacks) *
                      100
                    ).toFixed(0)}%`
                  : "0%"}
              </div>
            </div>
            <div className="bg-red-100 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-sm font-bold uppercase mb-2">Damaged</div>
              <div className="text-4xl font-bold text-red-600 mb-1">
                {stats.parcelConditionBreakdown.damaged}
              </div>
              <div className="text-sm font-semibold">
                {stats.totalFeedbacks > 0
                  ? `${(
                      (stats.parcelConditionBreakdown.damaged /
                        stats.totalFeedbacks) *
                      100
                    ).toFixed(0)}%`
                  : "0%"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Feedbacks */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-4 border-black pb-2">
            Recent Reviews
          </h2>
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <div
                key={feedback._id}
                className="bg-blue-50 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                  <div>
                    <p className="font-bold text-lg">{feedback.userName}</p>
                    <p className="text-xs font-semibold">
                      {feedback.trackingId} • {formatDate(feedback.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <StarDisplay rating={feedback.rating} size="w-4 h-4" />
                    <p className="text-sm font-bold mt-1">
                      {feedback.rating}/5
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <div
                    className={`px-3 py-1 text-xs font-bold border-2 border-black ${
                      feedback.parcelCondition === "good"
                        ? "bg-green-300"
                        : feedback.parcelCondition === "partially_damaged"
                        ? "bg-yellow-300"
                        : "bg-red-300"
                    }`}
                  >
                    {feedback.parcelCondition.replace("_", " ").toUpperCase()}
                  </div>
                  {feedback.deliverySpeed > 0 && (
                    <div className="px-3 py-1 text-xs font-bold border-2 border-black bg-cyan-300">
                      SPEED: {feedback.deliverySpeed}/5
                    </div>
                  )}
                  {feedback.riderBehavior > 0 && (
                    <div className="px-3 py-1 text-xs font-bold border-2 border-black bg-purple-300">
                      BEHAVIOR: {feedback.riderBehavior}/5
                    </div>
                  )}
                </div>

                {feedback.feedbackMessage && (
                  <p className="text-sm italic font-medium bg-white border-2 border-black p-3">
                    &ldquo;{feedback.feedbackMessage}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRatings;
