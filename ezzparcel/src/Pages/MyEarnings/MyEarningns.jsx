// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";

// const MyEarnings = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [selectedPeriod, setSelectedPeriod] = useState("overall");

//   const {
//     data: stats,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["rider-earnings-stats", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/parcels/rider/${user?.email}/earnings-stats`
//       );
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

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

//   // Get data based on selected period
//   const getPeriodData = () => {
//     switch (selectedPeriod) {
//       case "today":
//         return stats.today;
//       case "week":
//         return stats.thisWeek;
//       case "month":
//         return stats.thisMonth;
//       case "year":
//         return stats.thisYear;
//       case "overall":
//       default:
//         return {
//           deliveries: stats.totalDeliveries,
//           earnings: stats.totalEarnings,
//         };
//     }
//   };

//   const periodData = getPeriodData();

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-6">My Earnings Dashboard</h1>

//       {/* Overall Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <div className="card bg-gradient-to-br from-primary to-primary-focus text-primary-content shadow-lg">
//           <div className="card-body">
//             <h2 className="card-title text-sm opacity-90">Total Earnings</h2>
//             <p className="text-3xl font-bold">
//               ${stats.totalEarnings.toFixed(2)}
//             </p>
//             <p className="text-sm opacity-75">
//               {stats.totalDeliveries} deliveries
//             </p>
//           </div>
//         </div>

//         <div className="card bg-gradient-to-br from-warning to-warning-focus text-warning-content shadow-lg">
//           <div className="card-body">
//             <h2 className="card-title text-sm opacity-90">Pending Cashout</h2>
//             <p className="text-3xl font-bold">
//               ${stats.pendingCashout.toFixed(2)}
//             </p>
//             <p className="text-sm opacity-75">Available to withdraw</p>
//           </div>
//         </div>

//         <div className="card bg-gradient-to-br from-success to-success-focus text-success-content shadow-lg">
//           <div className="card-body">
//             <h2 className="card-title text-sm opacity-90">Cashed Out</h2>
//             <p className="text-3xl font-bold">${stats.cashedOut.toFixed(2)}</p>
//             <p className="text-sm opacity-75">Already withdrawn</p>
//           </div>
//         </div>

//         <div className="card bg-gradient-to-br from-secondary to-secondary-focus text-secondary-content shadow-lg">
//           <div className="card-body">
//             <h2 className="card-title text-sm opacity-90">Avg per Delivery</h2>
//             <p className="text-3xl font-bold">
//               $
//               {stats.totalDeliveries > 0
//                 ? (stats.totalEarnings / stats.totalDeliveries).toFixed(2)
//                 : "0.00"}
//             </p>
//             <p className="text-sm opacity-75">Per parcel</p>
//           </div>
//         </div>
//       </div>

//       {/* Period Analysis */}
//       <div className="card bg-base-100 shadow-xl mb-8">
//         <div className="card-body">
//           <h2 className="card-title mb-4">Earnings Analysis</h2>

//           {/* Period Selector */}
//           <div className="tabs tabs-boxed bg-base-200 mb-6">
//             <button
//               className={`tab ${
//                 selectedPeriod === "today" ? "tab-active" : ""
//               }`}
//               onClick={() => setSelectedPeriod("today")}
//             >
//               Today
//             </button>
//             <button
//               className={`tab ${selectedPeriod === "week" ? "tab-active" : ""}`}
//               onClick={() => setSelectedPeriod("week")}
//             >
//               This Week
//             </button>
//             <button
//               className={`tab ${
//                 selectedPeriod === "month" ? "tab-active" : ""
//               }`}
//               onClick={() => setSelectedPeriod("month")}
//             >
//               This Month
//             </button>
//             <button
//               className={`tab ${selectedPeriod === "year" ? "tab-active" : ""}`}
//               onClick={() => setSelectedPeriod("year")}
//             >
//               This Year
//             </button>
//             <button
//               className={`tab ${
//                 selectedPeriod === "overall" ? "tab-active" : ""
//               }`}
//               onClick={() => setSelectedPeriod("overall")}
//             >
//               Overall
//             </button>
//           </div>

//           {/* Period Stats */}
//           <div className="stats shadow w-full">
//             <div className="stat">
//               <div className="stat-figure text-primary">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   className="inline-block w-8 h-8 stroke-current"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   ></path>
//                 </svg>
//               </div>
//               <div className="stat-title">
//                 {selectedPeriod === "today" && "Today's"}
//                 {selectedPeriod === "week" && "This Week's"}
//                 {selectedPeriod === "month" && "This Month's"}
//                 {selectedPeriod === "year" && "This Year's"}
//                 {selectedPeriod === "overall" && "Total"} Deliveries
//               </div>
//               <div className="stat-value text-primary">
//                 {periodData.deliveries}
//               </div>
//               <div className="stat-desc">
//                 {selectedPeriod === "overall" ? "All time" : "Completed"}
//               </div>
//             </div>

//             <div className="stat">
//               <div className="stat-figure text-secondary">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   className="inline-block w-8 h-8 stroke-current"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                   ></path>
//                 </svg>
//               </div>
//               <div className="stat-title">
//                 {selectedPeriod === "today" && "Today's"}
//                 {selectedPeriod === "week" && "This Week's"}
//                 {selectedPeriod === "month" && "This Month's"}
//                 {selectedPeriod === "year" && "This Year's"}
//                 {selectedPeriod === "overall" && "Total"} Earnings
//               </div>
//               <div className="stat-value text-secondary">
//                 ${periodData.earnings.toFixed(2)}
//               </div>
//               <div className="stat-desc">
//                 {periodData.deliveries > 0
//                   ? `Avg: $${(
//                       periodData.earnings / periodData.deliveries
//                     ).toFixed(2)} per delivery`
//                   : "No deliveries"}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Delivery Type Breakdown */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* Same District */}
//         <div className="card bg-base-100 shadow-xl">
//           <div className="card-body">
//             <h2 className="card-title">
//               <span className="badge badge-primary">Same District</span>
//               Deliveries
//             </h2>
//             <div className="stats stats-vertical shadow bg-base-200">
//               <div className="stat">
//                 <div className="stat-title">Total Deliveries</div>
//                 <div className="stat-value text-primary">
//                   {stats.sameDistrict.count}
//                 </div>
//                 <div className="stat-desc">
//                   {stats.totalDeliveries > 0
//                     ? `${(
//                         (stats.sameDistrict.count / stats.totalDeliveries) *
//                         100
//                       ).toFixed(1)}% of total`
//                     : "N/A"}
//                 </div>
//               </div>
//               <div className="stat">
//                 <div className="stat-title">Total Earnings (10%)</div>
//                 <div className="stat-value text-primary">
//                   ${stats.sameDistrict.earnings.toFixed(2)}
//                 </div>
//                 <div className="stat-desc">
//                   {stats.sameDistrict.count > 0
//                     ? `Avg: $${(
//                         stats.sameDistrict.earnings / stats.sameDistrict.count
//                       ).toFixed(2)} per delivery`
//                     : "No deliveries"}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Cross District */}
//         <div className="card bg-base-100 shadow-xl">
//           <div className="card-body">
//             <h2 className="card-title">
//               <span className="badge badge-secondary">Cross District</span>
//               Deliveries
//             </h2>
//             <div className="stats stats-vertical shadow bg-base-200">
//               <div className="stat">
//                 <div className="stat-title">Total Deliveries</div>
//                 <div className="stat-value text-secondary">
//                   {stats.crossDistrict.count}
//                 </div>
//                 <div className="stat-desc">
//                   {stats.totalDeliveries > 0
//                     ? `${(
//                         (stats.crossDistrict.count / stats.totalDeliveries) *
//                         100
//                       ).toFixed(1)}% of total`
//                     : "N/A"}
//                 </div>
//               </div>
//               <div className="stat">
//                 <div className="stat-title">Total Earnings (15%)</div>
//                 <div className="stat-value text-secondary">
//                   ${stats.crossDistrict.earnings.toFixed(2)}
//                 </div>
//                 <div className="stat-desc">
//                   {stats.crossDistrict.count > 0
//                     ? `Avg: $${(
//                         stats.crossDistrict.earnings / stats.crossDistrict.count
//                       ).toFixed(2)} per delivery`
//                     : "No deliveries"}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Stats Grid */}
//       <div className="card bg-base-100 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title mb-4">Quick Stats Overview</h2>
//           <div className="overflow-x-auto">
//             <table className="table table-zebra">
//               <thead>
//                 <tr>
//                   <th>Period</th>
//                   <th>Deliveries</th>
//                   <th>Earnings</th>
//                   <th>Avg per Delivery</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="font-semibold">Today</td>
//                   <td>{stats.today.deliveries}</td>
//                   <td className="font-semibold text-primary">
//                     ${stats.today.earnings.toFixed(2)}
//                   </td>
//                   <td>
//                     {stats.today.deliveries > 0
//                       ? `$${(
//                           stats.today.earnings / stats.today.deliveries
//                         ).toFixed(2)}`
//                       : "-"}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="font-semibold">This Week</td>
//                   <td>{stats.thisWeek.deliveries}</td>
//                   <td className="font-semibold text-primary">
//                     ${stats.thisWeek.earnings.toFixed(2)}
//                   </td>
//                   <td>
//                     {stats.thisWeek.deliveries > 0
//                       ? `$${(
//                           stats.thisWeek.earnings / stats.thisWeek.deliveries
//                         ).toFixed(2)}`
//                       : "-"}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="font-semibold">This Month</td>
//                   <td>{stats.thisMonth.deliveries}</td>
//                   <td className="font-semibold text-primary">
//                     ${stats.thisMonth.earnings.toFixed(2)}
//                   </td>
//                   <td>
//                     {stats.thisMonth.deliveries > 0
//                       ? `$${(
//                           stats.thisMonth.earnings / stats.thisMonth.deliveries
//                         ).toFixed(2)}`
//                       : "-"}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="font-semibold">This Year</td>
//                   <td>{stats.thisYear.deliveries}</td>
//                   <td className="font-semibold text-primary">
//                     ${stats.thisYear.earnings.toFixed(2)}
//                   </td>
//                   <td>
//                     {stats.thisYear.deliveries > 0
//                       ? `$${(
//                           stats.thisYear.earnings / stats.thisYear.deliveries
//                         ).toFixed(2)}`
//                       : "-"}
//                   </td>
//                 </tr>
//                 <tr className="font-bold">
//                   <td>Overall</td>
//                   <td>{stats.totalDeliveries}</td>
//                   <td className="text-primary">
//                     ${stats.totalEarnings.toFixed(2)}
//                   </td>
//                   <td>
//                     {stats.totalDeliveries > 0
//                       ? `$${(
//                           stats.totalEarnings / stats.totalDeliveries
//                         ).toFixed(2)}`
//                       : "-"}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyEarnings;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("overall");

  const {
    data: stats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["rider-earnings-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider/${user?.email}/earnings-stats`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error">
        <span>Error: {error.message}</span>
      </div>
    );
  }

  // Get data based on selected period
  const getPeriodData = () => {
    switch (selectedPeriod) {
      case "today":
        return stats.today;
      case "week":
        return stats.thisWeek;
      case "month":
        return stats.thisMonth;
      case "year":
        return stats.thisYear;
      case "overall":
      default:
        return {
          deliveries: stats.totalDeliveries,
          earnings: stats.totalEarnings,
        };
    }
  };

  const periodData = getPeriodData();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 border-4 border-black bg-yellow-300 p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block">
        My Earnings Dashboard
      </h1>

      {/* Overall Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-400 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-sm font-bold mb-2 uppercase">Total Earnings</h2>
          <p className="text-3xl font-bold mb-1">
            ${stats.totalEarnings.toFixed(2)}
          </p>
          <p className="text-sm font-semibold">
            {stats.totalDeliveries} deliveries
          </p>
        </div>

        <div className="bg-yellow-300 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-sm font-bold mb-2 uppercase">Pending Cashout</h2>
          <p className="text-3xl font-bold mb-1">
            ${stats.pendingCashout.toFixed(2)}
          </p>
          <p className="text-sm font-semibold">Available to withdraw</p>
        </div>

        <div className="bg-green-400 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-sm font-bold mb-2 uppercase">Cashed Out</h2>
          <p className="text-3xl font-bold mb-1">
            ${stats.cashedOut.toFixed(2)}
          </p>
          <p className="text-sm font-semibold">Already withdrawn</p>
        </div>

        <div className="bg-pink-400 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-sm font-bold mb-2 uppercase">Avg per Delivery</h2>
          <p className="text-3xl font-bold mb-1">
            $
            {stats.totalDeliveries > 0
              ? (stats.totalEarnings / stats.totalDeliveries).toFixed(2)
              : "0.00"}
          </p>
          <p className="text-sm font-semibold">Per parcel</p>
        </div>
      </div>

      {/* Period Analysis */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-4 border-black pb-2">
            Earnings Analysis
          </h2>

          {/* Period Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              className={`px-4 py-2 font-bold border-4 border-black transition-all ${
                selectedPeriod === "today"
                  ? "bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-0 translate-y-0"
                  : "bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]"
              }`}
              onClick={() => setSelectedPeriod("today")}
            >
              Today
            </button>
            <button
              className={`px-4 py-2 font-bold border-4 border-black transition-all ${
                selectedPeriod === "week"
                  ? "bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-0 translate-y-0"
                  : "bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]"
              }`}
              onClick={() => setSelectedPeriod("week")}
            >
              This Week
            </button>
            <button
              className={`px-4 py-2 font-bold border-4 border-black transition-all ${
                selectedPeriod === "month"
                  ? "bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-0 translate-y-0"
                  : "bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]"
              }`}
              onClick={() => setSelectedPeriod("month")}
            >
              This Month
            </button>
            <button
              className={`px-4 py-2 font-bold border-4 border-black transition-all ${
                selectedPeriod === "year"
                  ? "bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-0 translate-y-0"
                  : "bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]"
              }`}
              onClick={() => setSelectedPeriod("year")}
            >
              This Year
            </button>
            <button
              className={`px-4 py-2 font-bold border-4 border-black transition-all ${
                selectedPeriod === "overall"
                  ? "bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-0 translate-y-0"
                  : "bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]"
              }`}
              onClick={() => setSelectedPeriod("overall")}
            >
              Overall
            </button>
          </div>

          {/* Period Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-200 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 stroke-current stroke-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="text-sm font-bold uppercase mb-2">
                {selectedPeriod === "today" && "Today's"}
                {selectedPeriod === "week" && "This Week's"}
                {selectedPeriod === "month" && "This Month's"}
                {selectedPeriod === "year" && "This Year's"}
                {selectedPeriod === "overall" && "Total"} Deliveries
              </div>
              <div className="text-4xl font-bold mb-1">
                {periodData.deliveries}
              </div>
              <div className="text-sm font-semibold">
                {selectedPeriod === "overall" ? "All time" : "Completed"}
              </div>
            </div>

            <div className="bg-orange-300 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 stroke-current stroke-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </div>
              <div className="text-sm font-bold uppercase mb-2">
                {selectedPeriod === "today" && "Today's"}
                {selectedPeriod === "week" && "This Week's"}
                {selectedPeriod === "month" && "This Month's"}
                {selectedPeriod === "year" && "This Year's"}
                {selectedPeriod === "overall" && "Total"} Earnings
              </div>
              <div className="text-4xl font-bold mb-1">
                ${periodData.earnings.toFixed(2)}
              </div>
              <div className="text-sm font-semibold">
                {periodData.deliveries > 0
                  ? `Avg: $${(
                      periodData.earnings / periodData.deliveries
                    ).toFixed(2)} per delivery`
                  : "No deliveries"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Type Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Same District */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-blue-400 border-2 border-black px-3 py-1 text-sm font-bold">
                Same District
              </span>
              Deliveries
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-sm font-bold uppercase mb-1">
                  Total Deliveries
                </div>
                <div className="text-3xl font-bold mb-1">
                  {stats.sameDistrict.count}
                </div>
                <div className="text-sm font-semibold">
                  {stats.totalDeliveries > 0
                    ? `${(
                        (stats.sameDistrict.count / stats.totalDeliveries) *
                        100
                      ).toFixed(1)}% of total`
                    : "N/A"}
                </div>
              </div>
              <div className="bg-blue-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-sm font-bold uppercase mb-1">
                  Total Earnings (10%)
                </div>
                <div className="text-3xl font-bold mb-1">
                  ${stats.sameDistrict.earnings.toFixed(2)}
                </div>
                <div className="text-sm font-semibold">
                  {stats.sameDistrict.count > 0
                    ? `Avg: $${(
                        stats.sameDistrict.earnings / stats.sameDistrict.count
                      ).toFixed(2)} per delivery`
                    : "No deliveries"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cross District */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-pink-400 border-2 border-black px-3 py-1 text-sm font-bold">
                Cross District
              </span>
              Deliveries
            </h2>
            <div className="space-y-4">
              <div className="bg-pink-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-sm font-bold uppercase mb-1">
                  Total Deliveries
                </div>
                <div className="text-3xl font-bold mb-1">
                  {stats.crossDistrict.count}
                </div>
                <div className="text-sm font-semibold">
                  {stats.totalDeliveries > 0
                    ? `${(
                        (stats.crossDistrict.count / stats.totalDeliveries) *
                        100
                      ).toFixed(1)}% of total`
                    : "N/A"}
                </div>
              </div>
              <div className="bg-pink-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-sm font-bold uppercase mb-1">
                  Total Earnings (15%)
                </div>
                <div className="text-3xl font-bold mb-1">
                  ${stats.crossDistrict.earnings.toFixed(2)}
                </div>
                <div className="text-sm font-semibold">
                  {stats.crossDistrict.count > 0
                    ? `Avg: $${(
                        stats.crossDistrict.earnings / stats.crossDistrict.count
                      ).toFixed(2)} per delivery`
                    : "No deliveries"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-4 border-black pb-2">
            Quick Stats Overview
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-4 border-black">
              <thead>
                <tr className="bg-yellow-300 border-b-4 border-black">
                  <th className="border-r-4 border-black p-3 text-left font-bold">
                    Period
                  </th>
                  <th className="border-r-4 border-black p-3 text-left font-bold">
                    Deliveries
                  </th>
                  <th className="border-r-4 border-black p-3 text-left font-bold">
                    Earnings
                  </th>
                  <th className="p-3 text-left font-bold">Avg per Delivery</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-4 border-black">
                  <td className="border-r-4 border-black p-3 font-bold bg-blue-100">
                    Today
                  </td>
                  <td className="border-r-4 border-black p-3">
                    {stats.today.deliveries}
                  </td>
                  <td className="border-r-4 border-black p-3 font-bold">
                    ${stats.today.earnings.toFixed(2)}
                  </td>
                  <td className="p-3">
                    {stats.today.deliveries > 0
                      ? `$${(
                          stats.today.earnings / stats.today.deliveries
                        ).toFixed(2)}`
                      : "-"}
                  </td>
                </tr>
                <tr className="border-b-4 border-black">
                  <td className="border-r-4 border-black p-3 font-bold bg-green-100">
                    This Week
                  </td>
                  <td className="border-r-4 border-black p-3">
                    {stats.thisWeek.deliveries}
                  </td>
                  <td className="border-r-4 border-black p-3 font-bold">
                    ${stats.thisWeek.earnings.toFixed(2)}
                  </td>
                  <td className="p-3">
                    {stats.thisWeek.deliveries > 0
                      ? `$${(
                          stats.thisWeek.earnings / stats.thisWeek.deliveries
                        ).toFixed(2)}`
                      : "-"}
                  </td>
                </tr>
                <tr className="border-b-4 border-black">
                  <td className="border-r-4 border-black p-3 font-bold bg-pink-100">
                    This Month
                  </td>
                  <td className="border-r-4 border-black p-3">
                    {stats.thisMonth.deliveries}
                  </td>
                  <td className="border-r-4 border-black p-3 font-bold">
                    ${stats.thisMonth.earnings.toFixed(2)}
                  </td>
                  <td className="p-3">
                    {stats.thisMonth.deliveries > 0
                      ? `$${(
                          stats.thisMonth.earnings / stats.thisMonth.deliveries
                        ).toFixed(2)}`
                      : "-"}
                  </td>
                </tr>
                <tr className="border-b-4 border-black">
                  <td className="border-r-4 border-black p-3 font-bold bg-purple-100">
                    This Year
                  </td>
                  <td className="border-r-4 border-black p-3">
                    {stats.thisYear.deliveries}
                  </td>
                  <td className="border-r-4 border-black p-3 font-bold">
                    ${stats.thisYear.earnings.toFixed(2)}
                  </td>
                  <td className="p-3">
                    {stats.thisYear.deliveries > 0
                      ? `$${(
                          stats.thisYear.earnings / stats.thisYear.deliveries
                        ).toFixed(2)}`
                      : "-"}
                  </td>
                </tr>
                <tr className="bg-yellow-200">
                  <td className="border-r-4 border-black p-3 font-bold">
                    Overall
                  </td>
                  <td className="border-r-4 border-black p-3 font-bold">
                    {stats.totalDeliveries}
                  </td>
                  <td className="border-r-4 border-black p-3 font-bold">
                    ${stats.totalEarnings.toFixed(2)}
                  </td>
                  <td className="p-3 font-bold">
                    {stats.totalDeliveries > 0
                      ? `$${(
                          stats.totalEarnings / stats.totalDeliveries
                        ).toFixed(2)}`
                      : "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEarnings;
