// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import districtData from "../Coverage/districtData.json";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const BeARider = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   // Watch for region selection to dynamically load districts
//   const selectedRegion = watch("region");

//   // Get unique regions
//   const regions = [...new Set(districtData.map((d) => d.region))];

//   // Filter districts based on selected region
//   const districts = districtData.filter((d) => d.region === selectedRegion);

//   const onSubmit = async (data) => {
//     const riderApplicationData = {
//       name: user.displayName,
//       email: user.email,
//       age: parseInt(data.age),
//       region: data.region,
//       district: data.district,
//       phoneNumber: data.phoneNumber,
//       nationalId: data.nationalId,
//       bikeBrand: data.bikeBrand,
//       bikeRegistration: data.bikeRegistration,
//       licenseNumber: data.licenseNumber,
//       experience: data.experience,
//       status: "pending",
//       appliedAt: new Date(),
//     };

//     try {
//       const res = await axiosSecure.post("/riders/apply", riderApplicationData);

//       // Success for both new application (201) and re-application (200)
//       if (res.data.insertedId || res.data.modifiedCount) {
//         Swal.fire({
//           icon: "success",
//           title: "Application Submitted!",
//           text:
//             res.data.message ||
//             "Your rider application has been submitted successfully. We will review it soon.",
//         });
//         reset();
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Application Failed",
//         text:
//           error.response?.data?.message ||
//           "Failed to submit application. Please try again.",
//       });
//     }
//   };

//   return (
//     <div className="mx-auto bg-base-100 shadow-xl p-6 rounded-2xl max-w-4xl">
//       <h1 className="text-3xl font-bold text-center mb-2">Become a Rider</h1>
//       <p className="text-center text-gray-600 mb-6">
//         Join our delivery team and start earning today!
//       </p>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* ===== Personal Information ===== */}
//         <div>
//           <h2 className="text-xl font-semibold mb-3">Personal Information</h2>
//           <div className="grid md:grid-cols-2 gap-4">
//             {/* Name - Read Only */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Full Name</span>
//               </label>
//               <input
//                 type="text"
//                 value={user?.displayName || ""}
//                 readOnly
//                 className="input input-bordered bg-gray-100 cursor-not-allowed"
//               />
//             </div>

//             {/* Email - Read Only */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Email</span>
//               </label>
//               <input
//                 type="email"
//                 value={user?.email || ""}
//                 readOnly
//                 className="input input-bordered bg-gray-100 cursor-not-allowed"
//               />
//             </div>

//             {/* Age */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Age</span>
//               </label>
//               <input
//                 type="number"
//                 {...register("age", {
//                   required: "Age is required",
//                   min: { value: 18, message: "Must be at least 18 years old" },
//                   max: { value: 60, message: "Must be under 60 years old" },
//                 })}
//                 placeholder="Enter your age"
//                 className="input input-bordered w-full"
//               />
//               {errors.age && (
//                 <span className="text-red-500 text-sm mt-1">
//                   {errors.age.message}
//                 </span>
//               )}
//             </div>

//             {/* Phone Number */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Phone Number</span>
//               </label>
//               <input
//                 type="tel"
//                 {...register("phoneNumber", {
//                   required: "Phone number is required",
//                   pattern: {
//                     value: /^01[0-9]{9}$/,
//                     message: "Enter valid BD phone number (01XXXXXXXXX)",
//                   },
//                 })}
//                 placeholder="01XXXXXXXXX"
//                 className="input input-bordered w-full"
//               />
//               {errors.phoneNumber && (
//                 <span className="text-red-500 text-sm mt-1">
//                   {errors.phoneNumber.message}
//                 </span>
//               )}
//             </div>

//             {/* National ID */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">
//                   National ID Card Number
//                 </span>
//               </label>
//               <input
//                 type="text"
//                 {...register("nationalId", {
//                   required: "National ID is required",
//                   minLength: {
//                     value: 10,
//                     message: "National ID must be at least 10 digits",
//                   },
//                 })}
//                 placeholder="Enter your NID number"
//                 className="input input-bordered w-full"
//               />
//               {errors.nationalId && (
//                 <span className="text-red-500 text-sm mt-1">
//                   {errors.nationalId.message}
//                 </span>
//               )}
//             </div>

//             {/* Driving License */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">
//                   Driving License Number
//                 </span>
//               </label>
//               <input
//                 type="text"
//                 {...register("licenseNumber", {
//                   required: "Driving license number is required",
//                 })}
//                 placeholder="Enter your license number"
//                 className="input input-bordered w-full"
//               />
//               {errors.licenseNumber && (
//                 <span className="text-red-500 text-sm mt-1">
//                   {errors.licenseNumber.message}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ===== Location Information ===== */}
//         <div>
//           <h2 className="text-xl font-semibold mb-3">Location</h2>
//           <div className="grid md:grid-cols-2 gap-4">
//             {/* Region */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Region</span>
//               </label>
//               <select
//                 {...register("region", { required: "Region is required" })}
//                 className="select select-bordered w-full"
//               >
//                 <option value="">Select Region</option>
//                 {regions.map((r) => (
//                   <option key={r} value={r}>
//                     {r}
//                   </option>
//                 ))}
//               </select>
//               {errors.region && (
//                 <span className="text-red-500 text-sm mt-1">
//                   {errors.region.message}
//                 </span>
//               )}
//             </div>

//             {/* District */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">District</span>
//               </label>
//               <select
//                 {...register("district", { required: "District is required" })}
//                 className="select select-bordered w-full"
//                 disabled={!selectedRegion}
//               >
//                 <option value="">Select District</option>
//                 {districts.map((d) => (
//                   <option key={d.district} value={d.district}>
//                     {d.district}
//                   </option>
//                 ))}
//               </select>
//               {errors.district && (
//                 <span className="text-red-500 text-sm mt-1">
//                   {errors.district.message}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ===== Bike Information ===== */}
//         <div>
//           <h2 className="text-xl font-semibold mb-3">Bike Information</h2>
//           <div className="grid md:grid-cols-2 gap-4">
//             {/* Bike Brand */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Bike Brand</span>
//               </label>
//               <input
//                 type="text"
//                 {...register("bikeBrand", {
//                   required: "Bike brand is required",
//                 })}
//                 placeholder="e.g., Honda, Yamaha, Bajaj"
//                 className="input input-bordered w-full"
//               />
//               {errors.bikeBrand && (
//                 <span className="text-red-500 text-sm mt-1">
//                   {errors.bikeBrand.message}
//                 </span>
//               )}
//             </div>

//             {/* Bike Registration */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">
//                   Bike Registration Number
//                 </span>
//               </label>
//               <input
//                 type="text"
//                 {...register("bikeRegistration", {
//                   required: "Bike registration number is required",
//                 })}
//                 placeholder="e.g., DHAKA-123456"
//                 className="input input-bordered w-full"
//               />
//               {errors.bikeRegistration && (
//                 <span className="text-red-500 text-sm mt-1">
//                   {errors.bikeRegistration.message}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ===== Experience ===== */}
//         <div>
//           <h2 className="text-xl font-semibold mb-3">Experience</h2>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-medium">
//                 Riding/Delivery Experience (in years)
//               </span>
//             </label>
//             <input
//               type="number"
//               step="0.5"
//               {...register("experience", {
//                 required: "Experience is required",
//                 min: { value: 0, message: "Experience cannot be negative" },
//               })}
//               placeholder="e.g., 2.5"
//               className="input input-bordered w-full"
//             />
//             {errors.experience && (
//               <span className="text-red-500 text-sm mt-1">
//                 {errors.experience.message}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-center items-center pt-4">
//           <button
//             type="submit"
//             className="btn btn-primary hover:btn-accent w-full md:w-1/2"
//           >
//             Submit Application
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BeARider;

import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import districtData from "../Coverage/districtData.json";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BeARider = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Watch for region selection to dynamically load districts
  const selectedRegion = watch("region");

  // Get unique regions
  const regions = [...new Set(districtData.map((d) => d.region))];

  // Filter districts based on selected region
  const districts = districtData.filter((d) => d.region === selectedRegion);

  const onSubmit = async (data) => {
    const riderApplicationData = {
      name: user.displayName,
      email: user.email,
      age: parseInt(data.age),
      region: data.region,
      district: data.district,
      phoneNumber: data.phoneNumber,
      nationalId: data.nationalId,
      bikeBrand: data.bikeBrand,
      bikeRegistration: data.bikeRegistration,
      licenseNumber: data.licenseNumber,
      experience: data.experience,
      status: "pending",
      appliedAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/riders/apply", riderApplicationData);

      // Success for both new application (201) and re-application (200)
      if (res.data.insertedId || res.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text:
            res.data.message ||
            "Your rider application has been submitted successfully. We will review it soon.",
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Application Failed",
        text:
          error.response?.data?.message ||
          "Failed to submit application. Please try again.",
      });
    }
  };

  return (
    <div className="mx-auto bg-base-100 p-6 rounded-none max-w-4xl border-4 border-base-content shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="bg-primary p-4 -m-6 mb-6 border-b-4 border-base-content">
        <h1 className="text-3xl font-black text-primary-content uppercase tracking-tight">
          Become a Rider
        </h1>
        <p className="text-primary-content font-bold mt-1">
          Join our delivery team and start earning today!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ===== Personal Information ===== */}
        <div className="border-4 border-base-content p-4 bg-base-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-black mb-4 uppercase border-b-4 border-base-content pb-2 inline-block">
            Personal Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Name - Read Only */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold uppercase text-sm">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input bg-base-300 border-4 border-base-content rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold cursor-not-allowed"
              />
            </div>

            {/* Email - Read Only */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold uppercase text-sm">
                  Email
                </span>
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input bg-base-300 border-4 border-base-content rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold cursor-not-allowed"
              />
            </div>

            {/* Age */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold uppercase text-sm">
                  Age
                </span>
              </label>
              <input
                type="number"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 18, message: "Must be at least 18 years old" },
                  max: { value: 60, message: "Must be under 60 years old" },
                })}
                placeholder="Enter your age"
                className="input bg-base-100 border-4 border-base-content rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
              {errors.age && (
                <span className="text-error font-bold text-sm mt-2 flex items-center gap-1">
                  <span className="text-lg">⚠</span> {errors.age.message}
                </span>
              )}
            </div>

            {/* Phone Number */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold uppercase text-sm">
                  Phone Number
                </span>
              </label>
              <input
                type="tel"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^01[0-9]{9}$/,
                    message: "Enter valid BD phone number (01XXXXXXXXX)",
                  },
                })}
                placeholder="01XXXXXXXXX"
                className="input bg-base-100 border-4 border-base-content rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
              {errors.phoneNumber && (
                <span className="text-error font-bold text-sm mt-2 flex items-center gap-1">
                  <span className="text-lg">⚠</span>{" "}
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            {/* National ID */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold uppercase text-sm">
                  National ID Card Number
                </span>
              </label>
              <input
                type="text"
                {...register("nationalId", {
                  required: "National ID is required",
                  minLength: {
                    value: 10,
                    message: "National ID must be at least 10 digits",
                  },
                })}
                placeholder="Enter your NID number"
                className="input bg-base-100 border-4 border-base-content rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
              {errors.nationalId && (
                <span className="text-error font-bold text-sm mt-2 flex items-center gap-1">
                  <span className="text-lg">⚠</span> {errors.nationalId.message}
                </span>
              )}
            </div>

            {/* Driving License */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold uppercase text-sm">
                  Driving License Number
                </span>
              </label>
              <input
                type="text"
                {...register("licenseNumber", {
                  required: "Driving license number is required",
                })}
                placeholder="Enter your license number"
                className="input bg-base-100 border-4 border-base-content rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
              {errors.licenseNumber && (
                <span className="text-error font-bold text-sm mt-2 flex items-center gap-1">
                  <span className="text-lg">⚠</span>{" "}
                  {errors.licenseNumber.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ===== Location Information ===== */}
        <div className="border-4 border-base-content p-4 bg-secondary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-black mb-4 uppercase border-b-4 border-base-content pb-2 inline-block text-secondary-content">
            Location
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Region */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold uppercase text-sm text-secondary-content">
                  Region
                </span>
              </label>
              <select
                {...register("region", { required: "Region is required" })}
                className="select bg-base-100 border-4 border-base-content rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <option value="">Select Region</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.region && (
                <span className="text-error font-bold text-sm mt-2 flex items-center gap-1 bg-base-100 p-2 border-2 border-base-content">
                  <span className="text-lg">⚠</span> {errors.region.message}
                </span>
              )}
            </div>

            {/* District */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold uppercase text-sm text-secondary-content">
                  District
                </span>
              </label>
              <select
                {...register("district", { required: "District is required" })}
                className="select bg-base-100 border-4 border-base-content rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedRegion}
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.district} value={d.district}>
                    {d.district}
                  </option>
                ))}
              </select>
              {errors.district && (
                <span className="text-error font-bold text-sm mt-2 flex items-center gap-1 bg-base-100 p-2 border-2 border-base-content">
                  <span className="text-lg">⚠</span> {errors.district.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ===== Bike Information ===== */}
        <div className="border-4 border-base-content p-4 bg-accent shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-black mb-4 uppercase border-b-4 border-base-content pb-2 inline-block text-accent-content">
            Bike Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Bike Brand */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold uppercase text-sm text-accent-content">
                  Bike Brand
                </span>
              </label>
              <input
                type="text"
                {...register("bikeBrand", {
                  required: "Bike brand is required",
                })}
                placeholder="e.g., Honda, Yamaha, Bajaj"
                className="input bg-base-100 border-4 border-base-content rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
              {errors.bikeBrand && (
                <span className="text-error font-bold text-sm mt-2 flex items-center gap-1 bg-base-100 p-2 border-2 border-base-content">
                  <span className="text-lg">⚠</span> {errors.bikeBrand.message}
                </span>
              )}
            </div>

            {/* Bike Registration */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold uppercase text-sm text-accent-content">
                  Bike Registration Number
                </span>
              </label>
              <input
                type="text"
                {...register("bikeRegistration", {
                  required: "Bike registration number is required",
                })}
                placeholder="e.g., DHAKA-123456"
                className="input bg-base-100 border-4 border-base-content rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
              {errors.bikeRegistration && (
                <span className="text-error font-bold text-sm mt-2 flex items-center gap-1 bg-base-100 p-2 border-2 border-base-content">
                  <span className="text-lg">⚠</span>{" "}
                  {errors.bikeRegistration.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ===== Experience ===== */}
        <div className="border-4 border-base-content p-4 bg-base-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-black mb-4 uppercase border-b-4 border-base-content pb-2 inline-block">
            Experience
          </h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold uppercase text-sm">
                Riding/Delivery Experience (in years)
              </span>
            </label>
            <input
              type="number"
              step="0.5"
              {...register("experience", {
                required: "Experience is required",
                min: { value: 0, message: "Experience cannot be negative" },
              })}
              placeholder="e.g., 2.5"
              className="input bg-base-100 border-4 border-base-content rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
            />
            {errors.experience && (
              <span className="text-error font-bold text-sm mt-2 flex items-center gap-1">
                <span className="text-lg">⚠</span> {errors.experience.message}
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center pt-4">
          <button
            type="submit"
            className="btn bg-primary text-primary-content border-4 border-base-content rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all font-black uppercase text-lg w-full md:w-1/2"
          >
            Submit Application →
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeARider;
