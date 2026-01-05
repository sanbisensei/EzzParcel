// import {
//   Package,
//   Truck,
//   Warehouse,
//   HandCoins,
//   Building2,
//   RotateCcw,
// } from "lucide-react";

// const services = [
//   {
//     title: "Express & Standard Delivery",
//     description:
//       "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
//     icon: Package,
//   },
//   {
//     title: "Nationwide Delivery",
//     description:
//       "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
//     icon: Truck,
//   },
//   {
//     title: "Fulfillment Solution",
//     description:
//       "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
//     icon: Warehouse,
//   },
//   {
//     title: "Pay with Stripe",
//     description: "reliable transaction app",
//     icon: HandCoins,
//   },
//   {
//     title: "Corporate Service / Contract In Logistics",
//     description:
//       "Customized corporate services which includes warehouse and inventory management support.",
//     icon: Building2,
//   },
//   {
//     title: "Parcel Return",
//     description:
//       "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
//     icon: RotateCcw,
//   },
// ];

// const OurServices = () => {
//   return (
//     <section className="py-16 bg-primary text-primary-content rounded-4xl">
//       <div data-aos="fade-up" className="max-w-6xl mx-auto px-6 text-center">
//         {/* Heading */}
//         <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
//         <p className="mb-12 max-w-2xl mx-auto">
//           Enjoy fast, reliable parcel delivery with real-time tracking and zero
//           hassle. From personal packages to business shipments — we deliver on
//           time, every time.
//         </p>

//         {/* Cards Grid */}
//         <div
//           data-aos="fade-up"
//           className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
//         >
//           {services.map((service, index) => {
//             const Icon = service.icon;
//             return (
//               <div
//                 key={index}
//                 className="card bg-secondary hover:bg-accent hover:text-accent-content text-secondary-content shadow-xl hover:scale-105 transition-transform duration-300"
//               >
//                 <div className="card-body items-center text-center">
//                   <Icon className="w-12 h-12 text-primary mb-4" />
//                   <h3 className="card-title text-lg font-semibold">
//                     {service.title}
//                   </h3>
//                   <p className="text-sm opacity-80">{service.description}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurServices;

import {
  Package,
  Truck,
  Warehouse,
  HandCoins,
  Building2,
  RotateCcw,
} from "lucide-react";

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: Package,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: Truck,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: Warehouse,
  },
  {
    title: "Pay with Stripe",
    description: "reliable transaction app",
    icon: HandCoins,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: Building2,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: RotateCcw,
  },
];

const OurServices = () => {
  return (
    <section className="py-16 bg-primary text-primary-content border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div data-aos="fade-up" className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
        <p className="mb-12 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        {/* Cards Grid */}
        <div
          data-aos="fade-up"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="card bg-secondary text-secondary-content border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
              >
                <div className="card-body items-center text-center">
                  <Icon className="w-12 h-12 mb-4 stroke-[3]" />
                  <h3 className="card-title text-lg font-black uppercase">
                    {service.title}
                  </h3>
                  <p className="text-sm opacity-80">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
