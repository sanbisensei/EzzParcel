// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";
// import Swal from "sweetalert2";

// const useTrackingUpdate = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   const { mutateAsync: addTrackingUpdate, isPending } = useMutation({
//     mutationFn: async ({
//       trackingId,
//       parcelId,
//       status,
//       location,
//       description,
//     }) => {
//       const res = await axiosSecure.post("/tracking", {
//         parcelId,
//         trackingId,
//         status,
//         location,
//         description,
//       });
//       return res.data;
//     },
//     onSuccess: (data, variables) => {
//       queryClient.invalidateQueries(["tracking", variables.trackingId]);

//       Swal.fire({
//         title: "Success!",
//         text: "Tracking updated successfully",
//         icon: "success",
//         timer: 2000,
//       });
//     },
//     onError: (error) => {
//       Swal.fire({
//         title: "Error!",
//         text: error.response?.data?.message || "Failed to update tracking",
//         icon: "error",
//       });
//     },
//   });

//   return { addTrackingUpdate, isPending };
// };

// export default useTrackingUpdate;
