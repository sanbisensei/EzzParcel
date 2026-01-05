// import heroImg from "../../../assets/merchant.jpg";

// const BeMerchant = () => {
//   return (
//     <section className="bg-accent rounded-4xl text-accent-content max-w-6xl mx-auto my-10 px-6 py-10 flex flex-col md:flex-row items-center gap-10">
//       {/* Left Side (Text + Buttons) */}
//       <div
//         className="flex-1 space-y-6 text-center md:text-left"
//         data-aos="fade-right"
//       >
//         <h2 className="text-2xl md:text-4xl font-bold leading-snug">
//           Merchant and Customer Satisfaction <br />
//           is Our First Priority
//         </h2>
//         <p className="text-sm md:text-base opacity-90">
//           We offer the lowest delivery charge with the highest value along with
//           100% safety of your product. Profast courier delivers your parcels in
//           every corner of Bangladesh right on time.
//         </p>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//           <button className="bg-primary text-primary-content font-medium px-6 py-3 rounded-full hover:bg-secondary hover:text-secondary-content transition">
//             Become a Merchant
//           </button>
//           <button className="border border-shadow-primary-content text-shadow-primary-content font-medium px-6 py-3 rounded-full hover:bg-primary hover:text-primary-content hover:border-primary transition">
//             Earn with EzzParcel Courier
//           </button>
//         </div>
//       </div>

//       {/* Right Side (Image / Illustration) */}
//       <div
//         className="flex-1 flex justify-center md:justify-end"
//         data-aos="fade-left"
//       >
//         <img
//           src={heroImg}
//           alt="Parcel Illustration"
//           className="max-w-[280px] md:max-w-[340px] lg:max-w-[400px] object-contain rounded-3xl"
//         />
//       </div>
//     </section>
//   );
// };

// export default BeMerchant;

import heroImg from "../../../assets/merchant.jpg";
import { Link } from "react-router";

const BeMerchant = () => {
  return (
    <section className="bg-accent border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-accent-content max-w-6xl mx-auto my-10 px-6 py-10 flex flex-col md:flex-row items-center gap-10">
      {/* Left Side (Text + Buttons) */}
      <div
        className="flex-1 space-y-6 text-center md:text-left"
        data-aos="fade-right"
      >
        <h2 className="text-2xl md:text-4xl font-bold leading-snug">
          Rider and Customer Satisfaction <br />
          is Our First Priority
        </h2>
        <p className="text-sm md:text-base font-semibold opacity-90">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Profast courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link to="/BeARider">
            <button className="bg-primary text-primary-content font-bold px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all">
              Become a Rider
            </button>
          </Link>
          <button className="bg-secondary text-secondary-content font-bold px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all">
            Earn with EzzParcel Courier
          </button>
        </div>
      </div>

      {/* Right Side (Image / Illustration) */}
      <div
        className="flex-1 flex justify-center md:justify-end"
        data-aos="fade-left"
      >
        <img
          src={heroImg}
          alt="Parcel Illustration"
          className="max-w-[280px] md:max-w-[340px] lg:max-w-[400px] object-contain border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        />
      </div>
    </section>
  );
};

export default BeMerchant;
