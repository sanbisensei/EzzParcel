// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const PaymentHistory = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const { isPending, data: payments = [] } = useQuery({
//     queryKey: ["paymentHistory", user.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/payments?email=${user.email}`);
//       return res.data;
//     },
//   });
//   if (isPending) {
//     return <div className="text-center p-10">Loading payment history...</div>;
//   }

//   if (payments.length === 0) {
//     return (
//       <div className="text-center text-gray-500 py-10">
//         No payment history found.
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 w-full">
//       <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
//         Payment History
//       </h2>
//       <div className="overflow-x-auto">
//         <table className="table w-full text-base">
//           <thead>
//             <tr className="bg-base-200 font-semibold">
//               <th>#</th>
//               <th>Transaction ID</th>
//               <th>Amount</th>
//               <th>Payment Method</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.map((payment, index) => (
//               <tr key={payment._id} className="hover">
//                 <th>{index + 1}</th>
//                 <td>{payment.transactionId}</td>
//                 <td>৳{payment.amount}</td>
//                 <td className="capitalize">{payment.paymentMethod}</td>
//                 <td>{payment.paid_at_string}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PaymentHistory;

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["paymentHistory", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  if (isPending) {
    return (
      <div className="text-center p-10 text-2xl font-black uppercase">
        Loading payment history...
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="text-center p-10 text-2xl font-black uppercase border-4 border-black bg-[#FF6E6C] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        No payment history found.
      </div>
    );
  }

  return (
    <div className="p-4 w-full text-gray-950">
      <h2 className="text-2xl md:text-4xl font-black mb-6 text-center md:text-left uppercase bg-[#FF6E6C] border-4 border-black p-4 inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        Payment History
      </h2>
      <div className="overflow-x-auto border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white">
        <table className="table w-full text-base">
          <thead>
            <tr className="bg-cyan-400 border-b-4 border-black font-black uppercase text-base">
              <th className=" text-gray-950 border-r-4 border-black">#</th>
              <th className="text-gray-950 border-r-4 border-black">
                Transaction ID
              </th>
              <th className="text-gray-950 border-r-4 border-black">Amount</th>
              <th className="text-gray-950 border-r-4 border-black">
                Payment Method
              </th>
              <th className="text-gray-950">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className="border-b-4 border-black hover:bg-blue-100"
              >
                <th className="border-r-4 border-black font-bold">
                  {index + 1}
                </th>
                <td className="border-r-4 border-black font-mono">
                  {payment.transactionId}
                </td>
                <td className="border-r-4 border-black font-bold">
                  ৳{payment.amount}
                </td>
                <td className="capitalize border-r-4 border-black">
                  {payment.paymentMethod}
                </td>
                <td>{payment.paid_at_string}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
