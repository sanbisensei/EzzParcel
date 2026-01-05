// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router";

// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   const options = { year: "numeric", month: "long", day: "numeric" };
//   return new Date(dateString).toLocaleDateString(undefined, options);
// };

// const MyParcels = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const {
//     data: parcels = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["my-Parcels", user.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/parcels?email=${user.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   const handlePay = (parcelId) => {
//     navigate(`/dashboard/payment/${parcelId}`);
//   };

//   const handleDeleteParcel = async (parcelId) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axiosSecure.delete(`/parcels/${parcelId}`);
//         Swal.fire("Deleted!", "Parcel has been deleted.", "success");
//         queryClient.invalidateQueries(["my-Parcels", user.email]);
//       } catch (err) {
//         Swal.fire(
//           "Error!",
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to delete parcel.",
//           "error"
//         );
//       }
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center p-10">Loading your parcels...</div>;
//   }

//   if (isError) {
//     return (
//       <div className="text-center p-10 text-red-500">
//         Error: {error.message}
//       </div>
//     );
//   }

//   if (parcels.length === 0) {
//     return (
//       <div className="text-center text-gray-500 py-10">No parcels found.</div>
//     );
//   }

//   return (
//     <div className="p-4 w-full">
//       {/* Desktop Table View */}
//       <div className="hidden md:block">
//         <table className="table w-full text-base">
//           <thead>
//             <tr className="bg-base-200 font-semibold">
//               <th>Title</th>
//               <th>Type</th>
//               <th>Created At</th>
//               <th>Cost</th>
//               <th>Payment Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {parcels.map((parcel) => (
//               <tr key={parcel._id} className="hover">
//                 <td className="capitalize">{parcel.title || "N/A"}</td>
//                 <td className="capitalize">{parcel.type || "N/A"}</td>
//                 <td>{formatDate(parcel.createdAt)}</td>
//                 <td>৳{parcel.cost || 0}</td>
//                 <td>
//                   {parcel.payment_status === "paid" ? (
//                     <span className="badge badge-success badge-outline">
//                       Paid
//                     </span>
//                   ) : (
//                     <span className="badge badge-error badge-outline">
//                       Unpaid
//                     </span>
//                   )}
//                 </td>
//                 <td className="space-x-2">
//                   <button
//                     className="btn btn-sm btn-info text-white"
//                     onClick={() => alert(`Viewing ${parcel.tracking_id}`)}
//                   >
//                     View
//                   </button>
//                   {parcel.payment_status !== "paid" && (
//                     <button
//                       className="btn btn-sm btn-success text-white"
//                       onClick={() => handlePay(parcel._id)}
//                     >
//                       Pay
//                     </button>
//                   )}
//                   <button
//                     className="btn btn-sm btn-error text-white"
//                     onClick={() => handleDeleteParcel(parcel._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Card View */}
//       <div className="md:hidden space-y-4">
//         {parcels.map((parcel) => (
//           <div
//             key={parcel._id}
//             className="bg-base-200 rounded-xl p-4 shadow-md"
//           >
//             <h3 className="font-semibold text-lg mb-2">
//               {parcel.title || "Untitled Parcel"}
//             </h3>

//             <div className="space-y-1 text-sm">
//               <p>
//                 <span className="font-medium">Type:</span>{" "}
//                 {parcel.type || "N/A"}
//               </p>
//               <p>
//                 <span className="font-medium">Created:</span>{" "}
//                 {formatDate(parcel.createdAt)}
//               </p>
//               <p>
//                 <span className="font-medium">Cost:</span> ৳{parcel.cost || 0}
//               </p>
//               <p>
//                 <span className="font-medium">Payment:</span>{" "}
//                 {parcel.payment_status === "paid" ? (
//                   <span className="text-green-600 font-semibold">Paid</span>
//                 ) : (
//                   <span className="text-red-500 font-semibold">Unpaid</span>
//                 )}
//               </p>
//             </div>

//             <div className="flex justify-between mt-3">
//               <button
//                 className="btn btn-xs btn-info text-white"
//                 onClick={() => alert(`Viewing ${parcel.tracking_id}`)}
//               >
//                 View
//               </button>
//               {parcel.payment_status !== "paid" && (
//                 <button
//                   className="btn btn-xs btn-success text-white"
//                   onClick={() => handlePay(parcel._id)}
//                 >
//                   Pay
//                 </button>
//               )}
//               <button
//                 className="btn btn-xs btn-error text-white"
//                 onClick={() => handleDeleteParcel(parcel._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyParcels;

import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-Parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handlePay = (parcelId) => {
    navigate(`/dashboard/payment/${parcelId}`);
  };

  const handleDeleteParcel = async (parcelId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/parcels/${parcelId}`);
        Swal.fire("Deleted!", "Parcel has been deleted.", "success");
        queryClient.invalidateQueries(["my-Parcels", user.email]);
      } catch (err) {
        Swal.fire(
          "Error!",
          err.response?.data?.message ||
            err.message ||
            "Failed to delete parcel.",
          "error"
        );
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-10 text-2xl font-black uppercase">
        Loading your parcels...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-10 text-red-600 text-2xl font-black uppercase border-4 border-black bg-red-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        Error: {error.message}
      </div>
    );
  }

  if (parcels.length === 0) {
    return (
      <div className="text-center p-10 text-2xl font-black uppercase border-4 border-black bg-yellow-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        No parcels found.
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      {/* Desktop Table View */}
      <div className="hidden md:block border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white">
        <table className="table w-full text-base">
          <thead>
            <tr className="bg-[#F9BC60] border-b-4 border-black font-black uppercase text-base">
              <th className="border-r-4 border-black text-black">Title</th>
              <th className="border-r-4 border-black text-black">Type</th>
              <th className="border-r-4 border-black text-black">Created At</th>
              <th className="border-r-4 border-black text-black">Cost</th>
              <th className="border-r-4 border-black text-black">
                Payment Status
              </th>
              <th className="text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr
                key={parcel._id}
                className="border-b-4 border-black hover:bg-blue-100"
              >
                <td className="capitalize border-r-4 border-black font-bold">
                  {parcel.title || "N/A"}
                </td>
                <td className="capitalize border-r-4 border-black">
                  {parcel.type || "N/A"}
                </td>
                <td className="border-r-4 border-black">
                  {formatDate(parcel.createdAt)}
                </td>
                <td className="border-r-4 border-black font-bold">
                  ৳{parcel.cost || 0}
                </td>
                <td className="border-r-4 border-black">
                  {parcel.payment_status === "paid" ? (
                    <span className="inline-block px-3 py-1 bg-green-400 border-2 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      Paid
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 bg-red-400 border-2 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      Unpaid
                    </span>
                  )}
                </td>
                <td className="space-x-2">
                  <button
                    className="px-3 py-1 bg-cyan-400 border-3 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                    onClick={() => alert(`Viewing ${parcel.tracking_id}`)}
                  >
                    View
                  </button>
                  {parcel.payment_status !== "paid" && (
                    <button
                      className="px-3 py-1 bg-green-400 border-3 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                      onClick={() => handlePay(parcel._id)}
                    >
                      Pay
                    </button>
                  )}
                  <button
                    className="px-3 py-1 bg-red-400 border-3 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                    onClick={() => handleDeleteParcel(parcel._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {parcels.map((parcel) => (
          <div
            key={parcel._id}
            className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4"
          >
            <h3 className="font-black text-lg mb-3 uppercase bg-[#F9BC60] border-2 border-black p-2 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {parcel.title || "Untitled Parcel"}
            </h3>

            <div className="space-y-2 text-sm mt-4">
              <p className="border-l-4 border-black pl-2">
                <span className="font-black uppercase">Type:</span>{" "}
                {parcel.type || "N/A"}
              </p>
              <p className="border-l-4 border-black pl-2">
                <span className="font-black uppercase">Created:</span>{" "}
                {formatDate(parcel.createdAt)}
              </p>
              <p className="border-l-4 border-black pl-2">
                <span className="font-black uppercase">Cost:</span> ৳
                {parcel.cost || 0}
              </p>
              <p className="border-l-4 border-black pl-2">
                <span className="font-black uppercase">Payment:</span>{" "}
                {parcel.payment_status === "paid" ? (
                  <span className="inline-block px-2 py-1 bg-green-400 border-2 border-black font-bold uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Paid
                  </span>
                ) : (
                  <span className="inline-block px-2 py-1 bg-red-400 border-2 border-black font-bold uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Unpaid
                  </span>
                )}
              </p>
            </div>

            <div className="flex justify-between mt-4 gap-2">
              <button
                className="flex-1 px-2 py-2 bg-cyan-400 border-3 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                onClick={() => alert(`Viewing ${parcel.tracking_id}`)}
              >
                View
              </button>
              {parcel.payment_status !== "paid" && (
                <button
                  className="flex-1 px-2 py-2 bg-green-400 border-3 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                  onClick={() => handlePay(parcel._id)}
                >
                  Pay
                </button>
              )}
              <button
                className="flex-1 px-2 py-2 bg-red-400 border-3 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                onClick={() => handleDeleteParcel(parcel._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyParcels;
