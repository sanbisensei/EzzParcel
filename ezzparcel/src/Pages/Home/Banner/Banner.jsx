// import { useState, useEffect } from "react";
// import { Package, Truck, Clock, MapPin } from "lucide-react";
// import bannerImage1 from "../../../assets/banner (1).png";
// import bannerImage2 from "../../../assets/banner (2).jpg";
// import bannerImage6 from "../../../assets/banner3.jpg";
// import bannerImage7 from "../../../assets/banner4.jpg";
// import bannerImage3 from "../../../assets/ai (2).png";
// import bannerImage4 from "../../../assets/ai (3).png";
// import bannerImage5 from "../../../assets/ai (5).jpg";
// import useAuth from "../../../hooks/useAuth";
// import { Link } from "react-router";

// const Banner = () => {
//   const [activeCard, setActiveCard] = useState(null);
//   const [trackingCode, setTrackingCode] = useState("");
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const { user } = useAuth();
//   const carouselImages = [bannerImage3, bannerImage4, bannerImage5];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full p-4 md:p-6">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
//         {/* Left Side - Interactive Text */}
//         <div className="flex flex-col justify-center space-y-6 p-6 md:p-8">
//           <div className="space-y-4">
//             <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
//               🚀 Fast & Reliable
//             </div>

//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-base-content leading-tight">
//               {user?.displayName ? (
//                 <>
//                   Welcome,{" "}
//                   <span className="text-primary">{user.displayName}</span>
//                 </>
//               ) : (
//                 <>
//                   Welcome to <span className="text-primary">EzzParcel</span>
//                 </>
//               )}
//             </h1>

//             <p className="text-lg md:text-xl text-base-content/70 leading-relaxed">
//               Your fast delivery app for seamless parcel tracking and
//               lightning-quick delivery services. We make shipping simple,
//               secure, and stress-free.
//             </p>
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
//             <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl hover:bg-primary/20 transition-all cursor-pointer">
//               <div className="p-2 bg-primary rounded-lg">
//                 <Truck className="w-5 h-5 text-primary-content" />
//               </div>
//               <div>
//                 <p className="font-semibold text-base-content">Give Feedback</p>
//                 <p className="text-xs text-base-content/60">
//                   Same day available
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3 p-4 bg-secondary/10 rounded-xl hover:bg-secondary/20 transition-all cursor-pointer">
//               <div className="p-2 bg-secondary rounded-lg">
//                 <MapPin className="w-5 h-5 text-secondary-content" />
//               </div>
//               <div>
//                 <p className="font-semibold text-base-content">Fast Delivery</p>
//                 <p className="text-xs text-base-content/60">
//                   we try to deliver fast
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-xl hover:bg-accent/20 transition-all cursor-pointer">
//               <div className="p-2 bg-accent rounded-lg">
//                 <Clock className="w-5 h-5 text-accent-content" />
//               </div>
//               <div>
//                 <p className="font-semibold text-base-content">Live Tracking</p>
//                 <p className="text-xs text-base-content/60">
//                   Always here for you
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* CTA Button */}
//           <div className="pt-2">
//             <Link to="/sendParcel">
//               <button className="btn btn-primary btn-lg">
//                 Send Parcel Now
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Right Side - Bento Box Grid */}
//         <div className="grid grid-cols-4 grid-rows-4 gap-3 h-[600px]">
//           {/* Large Image 1 */}
//           <div
//             className="col-span-2 row-span-2 rounded-3xl overflow-hidden relative group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
//             onMouseEnter={() => setActiveCard(0)}
//             onMouseLeave={() => setActiveCard(null)}
//           >
//             <img
//               src={bannerImage1}
//               alt="Featured delivery"
//               className={`w-full h-full object-cover transition-transform duration-500 ${
//                 activeCard === 0 ? "scale-110" : "scale-100"
//               }`}
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//           </div>

//           {/* Image 2 */}
//           <div
//             className="col-span-2 row-span-2 rounded-3xl overflow-hidden relative group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
//             onMouseEnter={() => setActiveCard(1)}
//             onMouseLeave={() => setActiveCard(null)}
//           >
//             <img
//               src={bannerImage2}
//               alt="Delivery service"
//               className={`w-full h-full object-cover transition-transform duration-500 ${
//                 activeCard === 1 ? "scale-110" : "scale-100"
//               }`}
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//           </div>

//           {/* Carousel Section */}
//           <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative shadow-lg">
//             <div className="relative w-full h-full">
//               {carouselImages.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img}
//                   alt={`Slide ${index + 1}`}
//                   className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
//                     currentSlide === index ? "opacity-100" : "opacity-0"
//                   }`}
//                 />
//               ))}

//               {/* Carousel Indicators */}
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
//                 {carouselImages.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentSlide(index)}
//                     className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                       currentSlide === index ? "bg-white w-6" : "bg-white/50"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Image 4 */}
//           <div
//             className="col-span-1 row-span-2 rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
//             onMouseEnter={() => setActiveCard(3)}
//             onMouseLeave={() => setActiveCard(null)}
//           >
//             <img
//               src={bannerImage7}
//               alt="Reliable service"
//               className={`w-full h-full object-cover transition-transform duration-500 ${
//                 activeCard === 3 ? "scale-110" : "scale-100"
//               }`}
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//           </div>

//           {/* Image 5 */}
//           <div
//             className="col-span-1 row-span-2 rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
//             onMouseEnter={() => setActiveCard(4)}
//             onMouseLeave={() => setActiveCard(null)}
//           >
//             <img
//               src={bannerImage6}
//               alt="Professional delivery"
//               className={`w-full h-full object-cover transition-transform duration-500 ${
//                 activeCard === 4 ? "scale-110" : "scale-100"
//               }`}
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;
import { useState, useEffect } from "react";
import { Package, Truck, Clock, MapPin } from "lucide-react";
import bannerImage1 from "../../../assets/banner (1).png";
import bannerImage2 from "../../../assets/banner (2).jpg";
import bannerImage6 from "../../../assets/banner3.jpg";
import bannerImage7 from "../../../assets/banner4.jpg";
import bannerImage3 from "../../../assets/ai (2).png";
import bannerImage4 from "../../../assets/ai (3).png";
import bannerImage5 from "../../../assets/ai (5).jpg";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";

const Banner = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [trackingCode, setTrackingCode] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useAuth();
  const carouselImages = [bannerImage3, bannerImage4, bannerImage5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {/* Left Side - Interactive Text */}
        <div className="flex flex-col justify-center space-y-6 p-6 md:p-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-primary text-primary-content border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-black uppercase">
              🚀 Fast & Reliable
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-base-content leading-tight uppercase">
              {user?.displayName ? (
                <>
                  Welcome,{" "}
                  <span className="text-primary">{user.displayName}</span>
                </>
              ) : (
                <>
                  Welcome to <span className="text-primary">EzzParcel</span>
                </>
              )}
            </h1>

            <p className="text-lg md:text-xl text-base-content/70 leading-relaxed">
              Your fast delivery app for seamless parcel tracking and
              lightning-quick delivery services. We make shipping simple,
              secure, and stress-free.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
            <div className="flex items-center gap-3 p-4 bg-primary/10 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer">
              <div className="p-2 bg-primary border-2 border-black">
                <Truck className="w-5 h-5 text-primary-content stroke-[3]" />
              </div>
              <div>
                <p className="font-black text-base-content uppercase text-sm">
                  Give Feedback
                </p>
                <p className="text-xs text-base-content/60">
                  Same day available
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-secondary/10 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer">
              <div className="p-2 bg-secondary border-2 border-black">
                <MapPin className="w-5 h-5 text-secondary-content stroke-[3]" />
              </div>
              <div>
                <p className="font-black text-base-content uppercase text-sm">
                  Fast Delivery
                </p>
                <p className="text-xs text-base-content/60">
                  we try to deliver fast
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-accent/10 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer">
              <div className="p-2 bg-accent border-2 border-black">
                <Clock className="w-5 h-5 text-accent-content stroke-[3]" />
              </div>
              <div>
                <p className="font-black text-base-content uppercase text-sm">
                  Live Tracking
                </p>
                <p className="text-xs text-base-content/60">
                  Always here for you
                </p>
              </div>
            </div>
          </div>

          {/* Track Package Input - Commented for later */}
          {/* 
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-base-content">Track Your Package</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter tracking code..."
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                Track
              </button>
            </div>
          </div>
          */}

          {/* CTA Button */}
          <div className="pt-2">
            <Link to="/sendParcel">
              <button className="btn btn-primary btn-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all font-black uppercase">
                Send Parcel Now
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side - Bento Box Grid */}
        <div className="grid grid-cols-4 grid-rows-4 gap-3 h-[600px]">
          {/* Large Image 1 */}
          <div
            className="col-span-2 row-span-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative group cursor-pointer hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300"
            onMouseEnter={() => setActiveCard(0)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <img
              src={bannerImage1}
              alt="Featured delivery"
              className={`w-full h-full object-cover transition-transform duration-500 ${
                activeCard === 0 ? "scale-110" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Image 2 */}
          <div
            className="col-span-2 row-span-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative group cursor-pointer hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300"
            onMouseEnter={() => setActiveCard(1)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <img
              src={bannerImage2}
              alt="Delivery service"
              className={`w-full h-full object-cover transition-transform duration-500 ${
                activeCard === 1 ? "scale-110" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Carousel Section */}
          <div className="col-span-2 row-span-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
            <div className="relative w-full h-full">
              {carouselImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-3 transition-all duration-300 border-2 border-black ${
                      currentSlide === index
                        ? "bg-white w-8"
                        : "bg-white/50 w-3"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Image 4 */}
          <div
            className="col-span-1 row-span-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative group cursor-pointer hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300"
            onMouseEnter={() => setActiveCard(3)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <img
              src={bannerImage7}
              alt="Reliable service"
              className={`w-full h-full object-cover transition-transform duration-500 ${
                activeCard === 3 ? "scale-110" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Image 5 */}
          <div
            className="col-span-1 row-span-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative group cursor-pointer hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300"
            onMouseEnter={() => setActiveCard(4)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <img
              src={bannerImage6}
              alt="Professional delivery"
              className={`w-full h-full object-cover transition-transform duration-500 ${
                activeCard === 4 ? "scale-110" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
