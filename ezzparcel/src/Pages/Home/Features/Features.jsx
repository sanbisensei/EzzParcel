// import trackingImg from "../../../assets/features (1).jpg";
// import safeDeliveryImg from "../../../assets/features (2).jpg";
// import supportImg from "../../../assets/features (3).jpg";

// const features = [
//   {
//     title: "Live Parcel Tracking",
//     description:
//       "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
//     image: trackingImg,
//     animation: "fade-right",
//   },
//   {
//     title: "100% Safe Delivery",
//     description:
//       "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
//     image: safeDeliveryImg,
//     animation: "fade-up",
//   },
//   {
//     title: "24/7 Call Center Support",
//     description:
//       "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
//     image: supportImg,
//     animation: "fade-left",
//   },
// ];

// const Features = () => {
//   return (
//     <section className="my-10">
//       <div className="max-w-5xl mx-auto px-6 space-y-6">
//         {features.map((feature, i) => (
//           <div
//             key={i}
//             data-aos={feature.animation}
//             className="flex flex-col md:flex-row items-center p-6 bg-primary text-primary-content rounded-2xl shadow-md hover:shadow-lg transition w-full gap-6"
//           >
//             {/* Image */}
//             <div className="w-32 h-32 md:w-48 md:h-48 lg:w-60 lg:h-60 flex-shrink-0">
//               <img
//                 src={feature.image}
//                 alt={feature.title}
//                 className="w-full h-full object-contain rounded-xl"
//               />
//             </div>

//             {/* Text */}
//             <div className="text-center md:text-left">
//               <h3 className="text-lg md:text-xl font-semibold mb-2">
//                 {feature.title}
//               </h3>
//               <p className="text-sm md:text-base opacity-90">
//                 {feature.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Features;

import trackingImg from "../../../assets/features (1).jpg";
import safeDeliveryImg from "../../../assets/features (2).jpg";
import supportImg from "../../../assets/features (3).jpg";

const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: trackingImg,
    animation: "fade-right",
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: safeDeliveryImg,
    animation: "fade-up",
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: supportImg,
    animation: "fade-left",
  },
];

const Features = () => {
  return (
    <section className="my-10">
      <div className="max-w-5xl mx-auto px-6 space-y-6">
        {features.map((feature, i) => (
          <div
            key={i}
            data-aos={feature.animation}
            className="flex flex-col md:flex-row items-center p-6 bg-primary text-primary-content border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 w-full gap-6"
          >
            {/* Image */}
            <div className="w-32 h-32 md:w-48 md:h-48 lg:w-60 lg:h-60 flex-shrink-0">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-contain border-4 border-black"
              />
            </div>

            {/* Text */}
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-black uppercase mb-2">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base opacity-90">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
