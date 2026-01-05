// import { Quote } from "lucide-react";
// import cartIcon from "../../../assets/carticon.png";

// const reviews = [
//   {
//     text: "The Posture Pro feels like armor of a knight...",
//     name: "Rafiul Islam",
//     role: "Blacksmith",
//     img: "https://i.pravatar.cc/100?img=1",
//   },
//   {
//     text: "I no longer slouch like a weary traveler...",
//     name: "Sumaiya Akter",
//     role: "Scholar",
//     img: "https://i.pravatar.cc/100?img=2",
//   },
//   {
//     text: "With Posture Pro, I stride like a king...",
//     name: "Nafis Rahman",
//     role: "Merchant",
//     img: "https://i.pravatar.cc/100?img=3",
//   },
//   {
//     text: "My spine feels guarded as if by enchanted shields...",
//     name: "Farzana Chowdhury",
//     role: "Healer",
//     img: "https://i.pravatar.cc/100?img=4",
//   },
//   {
//     text: "Like a knight’s sword, Posture Pro cuts away my aches...",
//     name: "Md. Arman Ali",
//     role: "Student",
//     img: "https://i.pravatar.cc/100?img=5",
//   },
//   {
//     text: "Each day I sit at my desk as if upon a royal throne...",
//     name: "Shamima Yasmin",
//     role: "Artist",
//     img: "https://i.pravatar.cc/100?img=6",
//   },
// ];

// const CustomerReview = () => {
//   return (
//     <section className="py-12 px-4 bg-base-100 text-center text-accent-content">
//       {/* Header */}
//       <div className="flex justify-center mb-4">
//         <img src={cartIcon} alt="cart" className="w-12 h-12" />
//       </div>
//       <h2 className="text-accent-content md:text-3xl font-bold mb-2">
//         What our customers are saying
//       </h2>
//       <p className="text-accent-content max-w-xl mx-auto mb-8">
//         the most fast paced parcel management system is in everyone&#39;s hand
//       </p>

//       {/* Horizontal scroll carousel */}
//       <div className="flex space-x-4 overflow-x-auto py-4 px-2">
//         {reviews.map((review, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 w-72 bg-accent shadow-lg p-6 rounded-lg flex flex-col justify-between"
//           >
//             <Quote className="w-5 h-5 text-primary mb-3" />
//             <p className="flex-1 text-sm mb-4 text-accent-content">
//               {review.text}
//             </p>
//             <div className="flex items-center gap-3 mt-auto">
//               <img
//                 src={review.img}
//                 alt={review.name}
//                 className="w-10 h-10 rounded-full object-cover border border-secondary"
//               />
//               <div className="text-left">
//                 <h4 className="font-bold text-sm">{review.name}</h4>
//                 <p className="text-xs text-accent-content">{review.role}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CustomerReview;

import { Quote } from "lucide-react";
import cartIcon from "../../../assets/carticon.png";

const reviews = [
  {
    text: "The Posture Pro feels like armor of a knight...",
    name: "Rafiul Islam",
    role: "Blacksmith",
    img: "https://i.pravatar.cc/100?img=1",
  },
  {
    text: "I no longer slouch like a weary traveler...",
    name: "Sumaiya Akter",
    role: "Scholar",
    img: "https://i.pravatar.cc/100?img=2",
  },
  {
    text: "With Posture Pro, I stride like a king...",
    name: "Nafis Rahman",
    role: "Merchant",
    img: "https://i.pravatar.cc/100?img=3",
  },
  {
    text: "My spine feels guarded as if by enchanted shields...",
    name: "Farzana Chowdhury",
    role: "Healer",
    img: "https://i.pravatar.cc/100?img=4",
  },
  {
    text: "Like a knight's sword, Posture Pro cuts away my aches...",
    name: "Md. Arman Ali",
    role: "Student",
    img: "https://i.pravatar.cc/100?img=5",
  },
  {
    text: "Each day I sit at my desk as if upon a royal throne...",
    name: "Shamima Yasmin",
    role: "Artist",
    img: "https://i.pravatar.cc/100?img=6",
  },
];

const CustomerReview = () => {
  return (
    <section className="py-12 px-4 bg-base-100 text-center text-accent-content">
      {/* Header */}
      <div className="flex justify-center mb-4">
        <img src={cartIcon} alt="cart" className="w-12 h-12" />
      </div>
      <h2 className="text-accent-content md:text-3xl font-bold mb-2">
        What our customers are saying
      </h2>
      <p className="text-accent-content max-w-xl mx-auto mb-8">
        the most fast paced parcel management system is in everyone&#39;s hand
      </p>

      {/* Horizontal scroll carousel */}
      <div className="flex space-x-4 overflow-x-auto py-4 px-2">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 bg-accent shadow-lg p-6 rounded-lg flex flex-col justify-between border-4 border-neutral translate-x-0 translate-y-0 transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            style={{
              boxShadow:
                "6px 6px 0px 0px rgb(var(--n) / var(--tw-bg-opacity, 1))",
            }}
          >
            <Quote className="w-5 h-5 text-primary mb-3" />
            <p className="flex-1 text-sm mb-4 text-accent-content">
              {review.text}
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <img
                src={review.img}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover border-4 border-neutral"
              />
              <div className="text-left">
                <h4 className="font-bold text-sm">{review.name}</h4>
                <p className="text-xs text-accent-content">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReview;
