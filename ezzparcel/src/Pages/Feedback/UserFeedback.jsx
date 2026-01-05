// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import toast from "react-hot-toast";

// const UserFeedback = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const queryClient = useQueryClient();
//   const [selectedParcel, setSelectedParcel] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [hoveredRating, setHoveredRating] = useState(0);
//   const [parcelCondition, setParcelCondition] = useState("good");
//   const [deliverySpeed, setDeliverySpeed] = useState(0);
//   const [riderBehavior, setRiderBehavior] = useState(0);
//   const [feedbackMessage, setFeedbackMessage] = useState("");

//   // Fetch user's delivered parcels
//   const { data: parcels = [], isLoading } = useQuery({
//     queryKey: ["user-delivered-parcels", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
//       return res.data.filter((p) => p.delivery_status === "delivered");
//     },
//     enabled: !!user?.email,
//   });

//   // Check if parcel already has feedback
//   const { data: existingFeedback } = useQuery({
//     queryKey: ["parcel-feedback", selectedParcel?._id],
//     queryFn: async () => {
//       try {
//         const res = await axiosSecure.get(
//           `/feedbacks/parcel/${selectedParcel._id}`
//         );
//         return res.data;
//       } catch (error) {
//         if (error.response?.status === 404) return null;
//         throw error;
//       }
//     },
//     enabled: !!selectedParcel?._id,
//   });

//   // Submit feedback mutation
//   const submitFeedbackMutation = useMutation({
//     mutationFn: async (feedbackData) => {
//       const res = await axiosSecure.post("/feedbacks", feedbackData);
//       return res.data;
//     },
//     onSuccess: () => {
//       toast.success("Feedback submitted successfully! Thank you! 🎉");
//       queryClient.invalidateQueries(["user-delivered-parcels"]);
//       queryClient.invalidateQueries(["parcel-feedback"]);
//       resetForm();
//     },
//     onError: (error) => {
//       toast.error(
//         error?.response?.data?.message || "Failed to submit feedback"
//       );
//     },
//   });

//   const resetForm = () => {
//     setSelectedParcel(null);
//     setRating(0);
//     setParcelCondition("good");
//     setDeliverySpeed(0);
//     setRiderBehavior(0);
//     setFeedbackMessage("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!selectedParcel) {
//       toast.error("Please select a parcel");
//       return;
//     }

//     if (rating === 0) {
//       toast.error("Please give a rating");
//       return;
//     }

//     const feedbackData = {
//       parcelId: selectedParcel._id,
//       trackingId: selectedParcel.tracking_id,
//       riderId: selectedParcel.riderId,
//       riderEmail: selectedParcel.riderEmail,
//       riderName: selectedParcel.riderName,
//       userId: user.uid || user._id,
//       userEmail: user.email,
//       userName: user.displayName || user.name,
//       rating: rating,
//       parcelCondition: parcelCondition,
//       deliverySpeed: deliverySpeed,
//       riderBehavior: riderBehavior,
//       feedbackMessage: feedbackMessage.trim(),
//     };

//     submitFeedbackMutation.mutate(feedbackData);
//   };

//   const StarRating = ({ value, onRate, onHover, size = "w-8 h-8" }) => {
//     return (
//       <div className="flex gap-2">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             type="button"
//             onClick={() => onRate(star)}
//             onMouseEnter={() => onHover && onHover(star)}
//             onMouseLeave={() => onHover && onHover(0)}
//             className={`${size} transition-all duration-200 hover:scale-110`}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill={
//                 star <= (onHover ? hoveredRating : value)
//                   ? "currentColor"
//                   : "none"
//               }
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className={`${
//                 star <= (onHover ? hoveredRating : value)
//                   ? "text-warning"
//                   : "text-base-300"
//               }`}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//               />
//             </svg>
//           </button>
//         ))}
//       </div>
//     );
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   if (parcels.length === 0) {
//     return (
//       <div className="text-center py-10">
//         <p className="text-lg text-base-content/70">
//           No delivered parcels found.
//         </p>
//         <p className="text-sm text-base-content/50 mt-2">
//           You can give feedback after your parcel is delivered.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Give Feedback</h1>

//       <div className="grid gap-6">
//         {/* Select Parcel */}
//         <div className="card bg-base-100 shadow-xl">
//           <div className="card-body">
//             <h2 className="card-title">Select a Delivered Parcel</h2>
//             <div className="grid gap-3">
//               {parcels.map((parcel) => (
//                 <div
//                   key={parcel._id}
//                   onClick={() => setSelectedParcel(parcel)}
//                   className={`card cursor-pointer transition-all duration-200 ${
//                     selectedParcel?._id === parcel._id
//                       ? "bg-primary text-primary-content shadow-lg scale-[1.02]"
//                       : "bg-base-200 hover:bg-base-300"
//                   }`}
//                 >
//                   <div className="card-body p-4">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="font-semibold">{parcel.tracking_id}</p>
//                         <p className="text-sm opacity-80">
//                           Delivered by: {parcel.riderName}
//                         </p>
//                         <p className="text-xs opacity-70">
//                           {new Date(parcel.deliveredAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                       {selectedParcel?._id === parcel._id && (
//                         <div className="badge badge-success">Selected</div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Feedback Form */}
//         {selectedParcel && (
//           <>
//             {existingFeedback ? (
//               <div className="alert alert-info">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   className="stroke-current shrink-0 w-6 h-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   ></path>
//                 </svg>
//                 <span>
//                   You have already submitted feedback for this parcel.
//                 </span>
//               </div>
//             ) : (
//               <form
//                 onSubmit={handleSubmit}
//                 className="card bg-base-100 shadow-xl"
//               >
//                 <div className="card-body space-y-6">
//                   <h2 className="card-title">Your Feedback</h2>

//                   {/* Overall Rating */}
//                   <div>
//                     <label className="label">
//                       <span className="label-text font-semibold">
//                         Overall Rating <span className="text-error">*</span>
//                       </span>
//                     </label>
//                     <div className="flex items-center gap-4">
//                       <StarRating
//                         value={rating}
//                         onRate={setRating}
//                         onHover={setHoveredRating}
//                       />
//                       <span className="text-lg font-semibold">
//                         {rating > 0 ? `${rating}/5` : "Not rated"}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Parcel Condition */}
//                   <div>
//                     <label className="label">
//                       <span className="label-text font-semibold">
//                         Parcel Condition <span className="text-error">*</span>
//                       </span>
//                     </label>
//                     <div className="flex gap-3">
//                       <label className="cursor-pointer">
//                         <input
//                           type="radio"
//                           name="condition"
//                           className="radio radio-success"
//                           value="good"
//                           checked={parcelCondition === "good"}
//                           onChange={(e) => setParcelCondition(e.target.value)}
//                         />
//                         <span className="ml-2">Good</span>
//                       </label>
//                       <label className="cursor-pointer">
//                         <input
//                           type="radio"
//                           name="condition"
//                           className="radio radio-warning"
//                           value="partially_damaged"
//                           checked={parcelCondition === "partially_damaged"}
//                           onChange={(e) => setParcelCondition(e.target.value)}
//                         />
//                         <span className="ml-2">Partially Damaged</span>
//                       </label>
//                       <label className="cursor-pointer">
//                         <input
//                           type="radio"
//                           name="condition"
//                           className="radio radio-error"
//                           value="damaged"
//                           checked={parcelCondition === "damaged"}
//                           onChange={(e) => setParcelCondition(e.target.value)}
//                         />
//                         <span className="ml-2">Damaged</span>
//                       </label>
//                     </div>
//                   </div>

//                   {/* Delivery Speed */}
//                   <div>
//                     <label className="label">
//                       <span className="label-text font-semibold">
//                         Delivery Speed (Optional)
//                       </span>
//                     </label>
//                     <StarRating
//                       value={deliverySpeed}
//                       onRate={setDeliverySpeed}
//                       size="w-6 h-6"
//                     />
//                   </div>

//                   {/* Rider Behavior */}
//                   <div>
//                     <label className="label">
//                       <span className="label-text font-semibold">
//                         Rider Behavior (Optional)
//                       </span>
//                     </label>
//                     <StarRating
//                       value={riderBehavior}
//                       onRate={setRiderBehavior}
//                       size="w-6 h-6"
//                     />
//                   </div>

//                   {/* Feedback Message */}
//                   <div>
//                     <label className="label">
//                       <span className="label-text font-semibold">
//                         Additional Comments (Optional)
//                       </span>
//                     </label>
//                     <textarea
//                       className="textarea textarea-bordered w-full"
//                       placeholder="Share your experience..."
//                       rows={4}
//                       value={feedbackMessage}
//                       onChange={(e) => setFeedbackMessage(e.target.value)}
//                     ></textarea>
//                   </div>

//                   {/* Submit Button */}
//                   <div className="card-actions justify-end">
//                     <button
//                       type="button"
//                       className="btn btn-ghost"
//                       onClick={resetForm}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="btn btn-primary"
//                       disabled={submitFeedbackMutation.isPending}
//                     >
//                       {submitFeedbackMutation.isPending ? (
//                         <>
//                           <span className="loading loading-spinner loading-sm"></span>
//                           Submitting...
//                         </>
//                       ) : (
//                         "Submit Feedback"
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserFeedback;

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const UserFeedback = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [parcelCondition, setParcelCondition] = useState("good");
  const [deliverySpeed, setDeliverySpeed] = useState(0);
  const [riderBehavior, setRiderBehavior] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Fetch user's delivered parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["user-delivered-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data.filter((p) => p.delivery_status === "delivered");
    },
    enabled: !!user?.email,
  });

  // Check if parcel already has feedback
  const { data: existingFeedback } = useQuery({
    queryKey: ["parcel-feedback", selectedParcel?._id],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/feedbacks/parcel/${selectedParcel._id}`
        );
        return res.data;
      } catch (error) {
        if (error.response?.status === 404) return null;
        throw error;
      }
    },
    enabled: !!selectedParcel?._id,
  });

  // Submit feedback mutation
  const submitFeedbackMutation = useMutation({
    mutationFn: async (feedbackData) => {
      const res = await axiosSecure.post("/feedbacks", feedbackData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Feedback submitted successfully! Thank you! 🎉");
      queryClient.invalidateQueries(["user-delivered-parcels"]);
      queryClient.invalidateQueries(["parcel-feedback"]);
      resetForm();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to submit feedback"
      );
    },
  });

  const resetForm = () => {
    setSelectedParcel(null);
    setRating(0);
    setParcelCondition("good");
    setDeliverySpeed(0);
    setRiderBehavior(0);
    setFeedbackMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedParcel) {
      toast.error("Please select a parcel");
      return;
    }

    if (rating === 0) {
      toast.error("Please give a rating");
      return;
    }

    const feedbackData = {
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.tracking_id,
      riderId: selectedParcel.riderId,
      riderEmail: selectedParcel.riderEmail,
      riderName: selectedParcel.riderName,
      userId: user.uid || user._id,
      userEmail: user.email,
      userName: user.displayName || user.name,
      rating: rating,
      parcelCondition: parcelCondition,
      deliverySpeed: deliverySpeed,
      riderBehavior: riderBehavior,
      feedbackMessage: feedbackMessage.trim(),
    };

    submitFeedbackMutation.mutate(feedbackData);
  };

  const StarRating = ({ value, onRate, onHover, size = "w-8 h-8" }) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover && onHover(star)}
            onMouseLeave={() => onHover && onHover(0)}
            className={`${size} transition-all duration-200 hover:scale-110`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={
                star <= (onHover ? hoveredRating : value)
                  ? "currentColor"
                  : "none"
              }
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
              className={`${
                star <= (onHover ? hoveredRating : value)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-4xl font-black uppercase animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (parcels.length === 0) {
    return (
      <div className="text-center py-10 border-4 border-black bg-yellow-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-4">
        <p className="text-2xl font-black uppercase mb-2">
          No delivered parcels found.
        </p>
        <p className="text-lg font-bold">
          You can give feedback after your parcel is delivered.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-black mb-8 uppercase bg-[#FF6E6C] border-4 border-black p-4 inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        Give Feedback
      </h1>

      <div className="grid gap-6">
        {/* Select Parcel */}
        <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div className="p-6">
            <h2 className="text-2xl font-black mb-4 uppercase bg-cyan-400 border-2 border-black p-3 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Select a Delivered Parcel
            </h2>
            <div className="grid gap-3 mt-6">
              {parcels.map((parcel) => (
                <div
                  key={parcel._id}
                  onClick={() => setSelectedParcel(parcel)}
                  className={`cursor-pointer transition-all duration-200 border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] ${
                    selectedParcel?._id === parcel._id
                      ? "bg-green-400"
                      : "bg-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-black text-lg">{parcel.tracking_id}</p>
                      <p className="text-sm font-bold mt-1">
                        Delivered by: {parcel.riderName}
                      </p>
                      <p className="text-xs font-semibold">
                        {new Date(parcel.deliveredAt).toLocaleDateString()}
                      </p>
                    </div>
                    {selectedParcel?._id === parcel._id && (
                      <div className="px-3 py-1 bg-black text-white font-bold uppercase text-xs">
                        Selected
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        {selectedParcel && (
          <>
            {existingFeedback ? (
              <div className="bg-cyan-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 stroke-current"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span className="font-bold text-lg">
                    You have already submitted feedback for this parcel.
                  </span>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="p-6 space-y-6">
                  <h2 className="text-2xl font-black uppercase bg-[#FF6E6C] border-2 border-black p-3 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Your Feedback
                  </h2>

                  {/* Overall Rating */}
                  <div>
                    <label className="block mb-3">
                      <span className="font-black text-lg uppercase">
                        Overall Rating <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <div className="flex items-center gap-4">
                      <StarRating
                        value={rating}
                        onRate={setRating}
                        onHover={setHoveredRating}
                      />
                      <span className="text-xl font-black bg-yellow-300 border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        {rating > 0 ? `${rating}/5` : "Not rated"}
                      </span>
                    </div>
                  </div>

                  {/* Parcel Condition */}
                  <div>
                    <label className="block mb-3">
                      <span className="font-black text-lg uppercase">
                        Parcel Condition <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <label className="cursor-pointer flex items-center gap-2 bg-green-200 border-3 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                        <input
                          type="radio"
                          name="condition"
                          className="w-5 h-5 accent-black"
                          value="good"
                          checked={parcelCondition === "good"}
                          onChange={(e) => setParcelCondition(e.target.value)}
                        />
                        <span className="font-bold">Good</span>
                      </label>
                      <label className="cursor-pointer flex items-center gap-2 bg-yellow-200 border-3 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                        <input
                          type="radio"
                          name="condition"
                          className="w-5 h-5 accent-black"
                          value="partially_damaged"
                          checked={parcelCondition === "partially_damaged"}
                          onChange={(e) => setParcelCondition(e.target.value)}
                        />
                        <span className="font-bold">Partially Damaged</span>
                      </label>
                      <label className="cursor-pointer flex items-center gap-2 bg-red-200 border-3 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                        <input
                          type="radio"
                          name="condition"
                          className="w-5 h-5 accent-black"
                          value="damaged"
                          checked={parcelCondition === "damaged"}
                          onChange={(e) => setParcelCondition(e.target.value)}
                        />
                        <span className="font-bold">Damaged</span>
                      </label>
                    </div>
                  </div>

                  {/* Delivery Speed */}
                  <div>
                    <label className="block mb-3">
                      <span className="font-black text-lg uppercase">
                        Delivery Speed (Optional)
                      </span>
                    </label>
                    <StarRating
                      value={deliverySpeed}
                      onRate={setDeliverySpeed}
                      size="w-6 h-6"
                    />
                  </div>

                  {/* Rider Behavior */}
                  <div>
                    <label className="block mb-3">
                      <span className="font-black text-lg uppercase">
                        Rider Behavior (Optional)
                      </span>
                    </label>
                    <StarRating
                      value={riderBehavior}
                      onRate={setRiderBehavior}
                      size="w-6 h-6"
                    />
                  </div>

                  {/* Feedback Message */}
                  <div>
                    <label className="block mb-3">
                      <span className="font-black text-lg uppercase">
                        Additional Comments (Optional)
                      </span>
                    </label>
                    <textarea
                      className="w-full border-4 border-black p-4 font-semibold shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all"
                      placeholder="Share your experience..."
                      rows={4}
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      className="px-6 py-3 bg-gray-300 border-4 border-black font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-green-400 border-4 border-black font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={submitFeedbackMutation.isPending}
                    >
                      {submitFeedbackMutation.isPending
                        ? "Submitting..."
                        : "Submit Feedback"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserFeedback;
