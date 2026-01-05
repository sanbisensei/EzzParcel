// import { Package } from "lucide-react";

// const HowItWorks = () => {
//   return (
//     <div data-aos="zoom-in" className="px-4">
//       <h1 className="text-2xl font-bold mb-2">How It Works</h1>
//       <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-3">
//         {/* CARDS */}
//         {/* 1 */}
//         <div className="card w-full sm:w-[calc(50%-6px)] lg:w-[300px] h-[250px] bg-primary text-primary-content card-xl shadow-lg">
//           <div className="">
//             <Package className="w-[60px] h-[60px] pl-4 pr-4 mt-7" />

//             <p className="text-[18px] font-bold pr-4 pl-4">
//               Booking Pick & Drop
//             </p>
//             <p className="text-[15px] pb-2 pr-4 pl-4 flex justify-center items-center">
//               From personal packages to business shipments — we deliver on time,
//               every time.
//             </p>
//           </div>
//         </div>
//         {/* 2 */}
//         <div className="card w-full sm:w-[calc(50%-6px)] lg:w-[300px] h-[250px] bg-primary text-primary-content card-xl shadow-sm">
//           <div className="">
//             <Package className="w-[60px] h-[60px] pl-4 pr-4 mt-7" />

//             <p className="text-[18px] font-bold pr-4 pl-4">Pay with Stripe</p>
//             <p className="text-[15px] pb-2 pr-4 pl-4 flex justify-center items-center">
//               From personal packages to business shipments — we deliver on time,
//               every time.
//             </p>
//           </div>
//         </div>
//         {/* 3 */}
//         <div className="card w-full sm:w-[calc(50%-6px)] lg:w-[300px] h-[250px] bg-primary text-primary-content card-xl shadow-sm">
//           <div className="">
//             <Package className="w-[60px] h-[60px] pl-4 pr-4 mt-7" />

//             <p className="text-[18px] font-bold pr-4 pl-4">Delivery Hub</p>
//             <p className="text-[15px] pb-2 pr-4 pl-4 flex justify-center items-center">
//               From personal packages to business shipments — we deliver on time,
//               every time
//             </p>
//           </div>
//         </div>
//         {/* 4 */}
//         <div className="card w-full sm:w-[calc(50%-6px)] lg:w-[300px] h-[250px] bg-primary text-primary-content card-xl shadow-sm">
//           <div className="">
//             <Package className="w-[60px] h-[60px] pl-4 pr-4 mt-7" />

//             <p className="text-[18px] font-bold pr-4 pl-4">
//               Booking SME & Corporate
//             </p>
//             <p className="text-[15px] pb-2 pr-4 pl-4 flex justify-center items-center">
//               From personal packages to business shipments — we deliver on time,
//               every time.
//             </p>
//           </div>
//         </div>
//         {/* CARDS END */}
//       </div>
//     </div>
//   );
// };

// export default HowItWorks;

import { Package } from "lucide-react";

const HowItWorks = () => {
  return (
    <div data-aos="zoom-in" className="px-4">
      <h1 className="text-2xl font-black mb-2 uppercase">How It Works</h1>
      <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-3">
        {/* CARDS */}
        {/* 1 */}
        <div className="card w-full sm:w-[calc(50%-6px)] lg:w-[300px] h-[250px] bg-primary text-primary-content card-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all">
          <div className="">
            <Package className="w-[60px] h-[60px] pl-4 pr-4 mt-7 stroke-[3]" />

            <p className="text-[18px] font-black pr-4 pl-4 uppercase">
              Booking Pick & Drop
            </p>
            <p className="text-[15px] pb-2 pr-4 pl-4 flex justify-center items-center">
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>
        </div>
        {/* 2 */}
        <div className="card w-full sm:w-[calc(50%-6px)] lg:w-[300px] h-[250px] bg-primary text-primary-content card-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all">
          <div className="">
            <Package className="w-[60px] h-[60px] pl-4 pr-4 mt-7 stroke-[3]" />

            <p className="text-[18px] font-black pr-4 pl-4 uppercase">
              Pay with Stripe
            </p>
            <p className="text-[15px] pb-2 pr-4 pl-4 flex justify-center items-center">
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>
        </div>
        {/* 3 */}
        <div className="card w-full sm:w-[calc(50%-6px)] lg:w-[300px] h-[250px] bg-primary text-primary-content card-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all">
          <div className="">
            <Package className="w-[60px] h-[60px] pl-4 pr-4 mt-7 stroke-[3]" />

            <p className="text-[18px] font-black pr-4 pl-4 uppercase">
              Delivery Hub
            </p>
            <p className="text-[15px] pb-2 pr-4 pl-4 flex justify-center items-center">
              From personal packages to business shipments — we deliver on time,
              every time
            </p>
          </div>
        </div>
        {/* 4 */}
        <div className="card w-full sm:w-[calc(50%-6px)] lg:w-[300px] h-[250px] bg-primary text-primary-content card-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all">
          <div className="">
            <Package className="w-[60px] h-[60px] pl-4 pr-4 mt-7 stroke-[3]" />

            <p className="text-[18px] font-black pr-4 pl-4 uppercase">
              Booking SME & Corporate
            </p>
            <p className="text-[15px] pb-2 pr-4 pl-4 flex justify-center items-center">
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>
        </div>
        {/* CARDS END */}
      </div>
    </div>
  );
};

export default HowItWorks;
