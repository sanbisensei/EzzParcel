// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";

// import districtData from "../Coverage/districtData.json"; //📁JSON data import korlam
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useNavigate } from "react-router";

// const generateTrackingId = () => {
//   const timestamp = Date.now().toString(36); // base36 timestamp
//   const random = Math.random().toString(36).substring(2, 8); // 6 random chars
//   return `TRK-${timestamp}-${random}`.toUpperCase();
// };

// const SendParcel = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm();
//   // react hook use korar jonno jaja proyojon shob niye ashchi
//   const { user } = useAuth();

//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const [cost, setCost] = useState(null);
//   //eita total cost calculate korar jonno use korsi, cost er initial value null

//   const type = watch("type");
//   // eita diye kinda conditional way te input field show korbo.jodi document hoy tahole show korbo na ar jodi non-document hoy tahole weight input field show korbo.

//   // nicher duita watch variable diye dynamically region & district change detect korbo
//   const selectedSenderRegion = watch("senderRegion");
//   const selectedSenderDistrict = watch("senderDistrict");
//   const selectedReceiverRegion = watch("receiverRegion");
//   const selectedReceiverDistrict = watch("receiverDistrict");

//   // Unique region gula alada kore nilam
//   const regions = [...new Set(districtData.map((d) => d.region))];

//   // Region select korar por oi region er moddhe kon kon district ache ta filter korbo
//   const senderDistricts = districtData.filter(
//     (d) => d.region === selectedSenderRegion
//   );
//   const receiverDistricts = districtData.filter(
//     (d) => d.region === selectedReceiverRegion
//   );

//   // District select korar por oi district er covered area gulo pabo (eta service center hisebe use hobe)
//   const senderServiceCenters =
//     districtData.find((d) => d.district === selectedSenderDistrict)
//       ?.covered_area || [];
//   const receiverServiceCenters =
//     districtData.find((d) => d.district === selectedReceiverDistrict)
//       ?.covered_area || [];

//   // Calculate Delivery Cost
//   const calculateCost = (data) => {
//     let base = data.type === "document" ? 80 : 150;
//     let regionMultiplier = data.receiverRegion === data.senderRegion ? 1 : 1.5;
//     let weightCharge =
//       data.type === "non-document" ? (data.weight || 0) * 10 : 0;
//     return Math.round(base * regionMultiplier + weightCharge);
//   };
//   /*
// very very important part of my system:
// 1. data receive korar por jodi document hoy tahole 80taka ar na hoile 150taka. eita base charge.
// 2. jodi same region e hoy tahole base price same thakbe & na hoile 1.5X price hobe.
// 3. document e per kg kono taka dite hobe na but non document hoile per kg 10 taka dite hobe.
// 4. (data.weight || 0) eita error handle kore. suppose amar data.weight jodi null/undefined/something weird hoy tahole oitake 0 hishebe count korbe otherwise 5kg ke 5kg rakhbe 10kg ke 10kg rakhbe. (5||0) = 5 (5 return korbe coz 5 hocche tuthy value)
//    */

//   //jokhon user submit e click korbe tokhon eta call hobe
//   const onSubmit = (data) => {
//     const deliveryCost = calculateCost(data);
//     setCost(deliveryCost);

//     // SweetAlert2 popup
//     Swal.fire({
//       title: "Parcel Cost Breakdown",
//       html: `
//       <div style="text-align:left; line-height:1.6">
//         <p><b>Parcel Type:</b> ${data.type}</p>
//         ${
//           data.type === "non-document"
//             ? `<p><b>Weight:</b> ${data.weight} kg</p>`
//             : ""
//         }
//         <p><b>Sender Name:</b> ${data.senderName}</p>
//         <p><b>Receiver Name:</b> ${data.receiverName}</p>
//         <hr />
//         <p><b>Base Price:</b> ৳${data.type === "document" ? 80 : 150}</p>
//         <p><b>Region Multiplier:</b> ${
//           data.receiverRegion === data.senderRegion ? "1x" : "1.5x"
//         }</p>
//         ${
//           data.type === "non-document"
//             ? `<p><b>Weight Charge:</b> ৳${(data.weight || 0) * 10}</p>`
//             : ""
//         }
//         <hr />
//         <p style="font-size:1.2rem; font-weight:bold; color:green">Total Price: ৳${deliveryCost}</p>
//       </div>
//     `,
//       showCancelButton: true,
//       confirmButtonText: "Initiate Payment",
//       cancelButtonText: "Back to Edit",
//       icon: "info",
//       focusConfirm: false,
//       buttonsStyling: false, // ⚡ Important to disable default styling
//       customClass: {
//         popup: "text-left",
//       },
//       didRender: () => {
//         const buttonsWrapper = document.querySelector(".swal2-actions");
//         if (buttonsWrapper) {
//           buttonsWrapper.style.display = "flex";
//           buttonsWrapper.style.justifyContent = "center"; // center buttons
//           buttonsWrapper.style.gap = "10px"; // ⚡ proper spacing between buttons
//         }

//         const confirmBtn = document.querySelector(".swal2-confirm");
//         const cancelBtn = document.querySelector(".swal2-cancel");
//         if (confirmBtn) {
//           confirmBtn.style.backgroundColor = "#16a34a"; // green
//           confirmBtn.style.color = "white";
//           confirmBtn.style.padding = "0.5rem 1rem";
//           confirmBtn.style.borderRadius = "0.5rem";
//           confirmBtn.style.fontWeight = "bold";
//           confirmBtn.style.cursor = "pointer";
//         }
//         if (cancelBtn) {
//           cancelBtn.style.backgroundColor = "#3b82f6"; // blue
//           cancelBtn.style.color = "white";
//           cancelBtn.style.padding = "0.5rem 1rem";
//           cancelBtn.style.borderRadius = "0.5rem";
//           cancelBtn.style.fontWeight = "bold";
//           cancelBtn.style.cursor = "pointer";
//         }
//       },
//     }).then((result) => {
//       if (result.isConfirmed) {
//         onConfirm(data, deliveryCost);
//       }
//     });
//   };

//   // When user clicks Confirm
//   // const onConfirm = (data, deliveryCost) => {
//   //   const parcelData = {
//   //     ...data,
//   //     cost: deliveryCost,
//   //     created_by: user.email,
//   //     payment_status: "unpaid",
//   //     delivery_status: "not collected",
//   //     tracking_id: generateTrackingId(),
//   //     created_at: new Date().toISOString(),
//   //   };
//   const onConfirm = (data, deliveryCost) => {
//     const parcelData = {
//       ...data,
//       cost: deliveryCost,
//       created_by: user.email,
//       payment_status: "unpaid",
//       delivery_status: "not collected",
//       tracking_id: generateTrackingId(),
//       createdAt: new Date(), // ✅ Changed from created_at and removed .toISOString()
//     };
//     console.log("Saved Parcel:", parcelData);

//     axiosSecure.post("/parcels", parcelData).then((res) => {
//       console.log(res.data);
//       if (res.data.insertedId) {
//         //TODO: here you could redirect to the payment page or trigger a payment model
//         Swal.fire({
//           icon: "success",
//           title: "Payment Initiated",
//           text: `Total payment of ৳${deliveryCost} is being processed.`,
//         });
//         navigate("/dashboard/myParcels");
//       }
//     });

//     reset();
//     setCost(null);
//   };

//   return (
//     <div className=" mx-auto bg-base-100 shadow-xl p-6  rounded-2xl">
//       <h1 className="text-3xl font-bold text-center mb-4">Send Your Parcel</h1>

//       {/* Form Start */}
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* ===== Parcel Info ===== */}
//         <div>
//           <h2 className="text-xl font-semibold mb-2">1. Parcel Info</h2>
//           <div className="grid md:grid-cols-3 gap-4">
//             <select
//               {...register("type", { required: true })}
//               className="select select-bordered w-full"
//             >
//               <option value="">Select Type</option>
//               <option value="document">Document</option>
//               <option value="non-document">Non-Document</option>
//             </select>

//             <input
//               {...register("title", { required: true })}
//               placeholder="Parcel Title"
//               className="input input-bordered w-full"
//             />

//             {type === "non-document" && (
//               <input
//                 type="number"
//                 step="0.1"
//                 {...register("weight")}
//                 placeholder="Weight (kg)"
//                 className="input input-bordered w-full"
//               />
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* ===== Sender Info ===== */}
//           <div>
//             <h2 className="text-xl font-semibold mb-2">2. Sender Info</h2>
//             <div className="grid md:grid-cols-2 gap-4">
//               <input
//                 {...register("senderName", { required: true })}
//                 defaultValue="Zahin"
//                 placeholder="Sender Name"
//                 className="input input-bordered w-full"
//               />
//               <input
//                 {...register("senderContact", { required: true })}
//                 placeholder="Contact Number"
//                 className="input input-bordered w-full"
//               />

//               {/* Sender Region */}
//               <select
//                 {...register("senderRegion", { required: true })}
//                 className="select select-bordered w-full"
//               >
//                 <option value="">Select Region</option>
//                 {regions.map((r) => (
//                   <option key={r} value={r}>
//                     {r}
//                   </option>
//                 ))}
//               </select>

//               {/* Sender District */}
//               <select
//                 {...register("senderDistrict", { required: true })}
//                 className="select select-bordered w-full"
//               >
//                 <option value="">Select District</option>
//                 {senderDistricts.map((d) => (
//                   <option key={d.district} value={d.district}>
//                     {d.district}
//                   </option>
//                 ))}
//               </select>

//               {/* Sender Service Center */}
//               <select
//                 {...register("senderService", { required: true })}
//                 className="select select-bordered w-full"
//               >
//                 <option value="">Select Service Center</option>
//                 {senderServiceCenters.map((center) => (
//                   <option key={center} value={center}>
//                     {center}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 {...register("senderAddress", { required: true })}
//                 placeholder="Sender Address"
//                 className="input input-bordered w-full"
//               />
//               <input
//                 {...register("pickupInstruction")}
//                 placeholder="Pickup Instruction"
//                 className="input input-bordered w-full"
//               />
//             </div>
//           </div>

//           {/* ===== Receiver Info ===== */}
//           <div>
//             <h2 className="text-xl font-semibold mb-2">3. Receiver Info</h2>
//             <div className="grid md:grid-cols-2 gap-4">
//               <input
//                 {...register("receiverName", { required: true })}
//                 placeholder="Receiver Name"
//                 defaultValue="Sadman"
//                 className="input input-bordered w-full"
//               />
//               <input
//                 {...register("receiverContact", { required: true })}
//                 placeholder="Receiver Contact"
//                 className="input input-bordered w-full"
//               />

//               {/* Receiver Region */}
//               <select
//                 {...register("receiverRegion", { required: true })}
//                 className="select select-bordered w-full"
//               >
//                 <option value="">Select Region</option>
//                 {regions.map((r) => (
//                   <option key={r} value={r}>
//                     {r}
//                   </option>
//                 ))}
//               </select>

//               {/* Receiver District */}
//               <select
//                 {...register("receiverDistrict", { required: true })}
//                 className="select select-bordered w-full"
//               >
//                 <option value="">Select District</option>
//                 {receiverDistricts.map((d) => (
//                   <option key={d.district} value={d.district}>
//                     {d.district}
//                   </option>
//                 ))}
//               </select>

//               {/* Receiver Service Center */}
//               <select
//                 {...register("receiverService", { required: true })}
//                 className="select select-bordered w-full"
//               >
//                 <option value="">Select Service Center</option>
//                 {receiverServiceCenters.map((center) => (
//                   <option key={center} value={center}>
//                     {center}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 {...register("receiverAddress", { required: true })}
//                 placeholder="Receiver Address"
//                 className="input input-bordered w-full"
//               />
//               <input
//                 {...register("deliveryInstruction")}
//                 placeholder="Delivery Instruction"
//                 className="input input-bordered w-full"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-center items-center">
//           <button
//             type="submit"
//             className="btn btn-primary hover:btn-accent w-1/3"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SendParcel;

import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import districtData from "../Coverage/districtData.json"; //📁JSON data import korlam
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const generateTrackingId = () => {
  const timestamp = Date.now().toString(36); // base36 timestamp
  const random = Math.random().toString(36).substring(2, 8); // 6 random chars
  return `TRK-${timestamp}-${random}`.toUpperCase();
};

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // react hook use korar jonno jaja proyojon shob niye ashchi
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [cost, setCost] = useState(null);
  //eita total cost calculate korar jonno use korsi, cost er initial value null

  const type = watch("type");
  // eita diye kinda conditional way te input field show korbo.jodi document hoy tahole show korbo na ar jodi non-document hoy tahole weight input field show korbo.

  // nicher duita watch variable diye dynamically region & district change detect korbo
  const selectedSenderRegion = watch("senderRegion");
  const selectedSenderDistrict = watch("senderDistrict");
  const selectedReceiverRegion = watch("receiverRegion");
  const selectedReceiverDistrict = watch("receiverDistrict");

  // Unique region gula alada kore nilam
  const regions = [...new Set(districtData.map((d) => d.region))];

  // Region select korar por oi region er moddhe kon kon district ache ta filter korbo
  const senderDistricts = districtData.filter(
    (d) => d.region === selectedSenderRegion
  );
  const receiverDistricts = districtData.filter(
    (d) => d.region === selectedReceiverRegion
  );

  // District select korar por oi district er covered area gulo pabo (eta service center hisebe use hobe)
  const senderServiceCenters =
    districtData.find((d) => d.district === selectedSenderDistrict)
      ?.covered_area || [];
  const receiverServiceCenters =
    districtData.find((d) => d.district === selectedReceiverDistrict)
      ?.covered_area || [];

  // Calculate Delivery Cost
  const calculateCost = (data) => {
    let base = data.type === "document" ? 80 : 150;
    let regionMultiplier = data.receiverRegion === data.senderRegion ? 1 : 1.5;
    let weightCharge =
      data.type === "non-document" ? (data.weight || 0) * 10 : 0;
    return Math.round(base * regionMultiplier + weightCharge);
  };
  /*
very very important part of my system:
1. data receive korar por jodi document hoy tahole 80taka ar na hoile 150taka. eita base charge.
2. jodi same region e hoy tahole base price same thakbe & na hoile 1.5X price hobe.
3. document e per kg kono taka dite hobe na but non document hoile per kg 10 taka dite hobe.
4. (data.weight || 0) eita error handle kore. suppose amar data.weight jodi null/undefined/something weird hoy tahole oitake 0 hishebe count korbe otherwise 5kg ke 5kg rakhbe 10kg ke 10kg rakhbe. (5||0) = 5 (5 return korbe coz 5 hocche tuthy value)
   */

  //jokhon user submit e click korbe tokhon eta call hobe
  const onSubmit = (data) => {
    const deliveryCost = calculateCost(data);
    setCost(deliveryCost);

    // SweetAlert2 popup with neobrutalism styling
    Swal.fire({
      title: "Parcel Cost Breakdown",
      html: `
      <div style="text-align:left; line-height:1.6">
        <p><b>Parcel Type:</b> ${data.type}</p>
        ${
          data.type === "non-document"
            ? `<p><b>Weight:</b> ${data.weight} kg</p>`
            : ""
        }
        <p><b>Sender Name:</b> ${data.senderName}</p>
        <p><b>Receiver Name:</b> ${data.receiverName}</p>
        <hr />
        <p><b>Base Price:</b> ৳${data.type === "document" ? 80 : 150}</p>
        <p><b>Region Multiplier:</b> ${
          data.receiverRegion === data.senderRegion ? "1x" : "1.5x"
        }</p>
        ${
          data.type === "non-document"
            ? `<p><b>Weight Charge:</b> ৳${(data.weight || 0) * 10}</p>`
            : ""
        }
        <hr />
        <p style="font-size:1.2rem; font-weight:bold; color:green">Total Price: ৳${deliveryCost}</p>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: "Initiate Payment",
      cancelButtonText: "Back to Edit",
      icon: "info",
      focusConfirm: false,
      buttonsStyling: false,
      customClass: {
        popup: "text-left",
      },
      didRender: () => {
        // Neobrutalism styling for SweetAlert
        const popup = document.querySelector(".swal2-popup");
        if (popup) {
          popup.style.border = "4px solid black";
          popup.style.boxShadow = "8px 8px 0px 0px rgba(0,0,0,1)";
          popup.style.borderRadius = "0";
        }

        const buttonsWrapper = document.querySelector(".swal2-actions");
        if (buttonsWrapper) {
          buttonsWrapper.style.display = "flex";
          buttonsWrapper.style.justifyContent = "center";
          buttonsWrapper.style.gap = "10px";
        }

        const confirmBtn = document.querySelector(".swal2-confirm");
        const cancelBtn = document.querySelector(".swal2-cancel");
        if (confirmBtn) {
          confirmBtn.style.backgroundColor = "#16a34a";
          confirmBtn.style.color = "white";
          confirmBtn.style.padding = "0.5rem 1rem";
          confirmBtn.style.border = "4px solid black";
          confirmBtn.style.boxShadow = "4px 4px 0px 0px rgba(0,0,0,1)";
          confirmBtn.style.borderRadius = "0";
          confirmBtn.style.fontWeight = "bold";
          confirmBtn.style.cursor = "pointer";
          confirmBtn.style.textTransform = "uppercase";
        }
        if (cancelBtn) {
          cancelBtn.style.backgroundColor = "#3b82f6";
          cancelBtn.style.color = "white";
          cancelBtn.style.padding = "0.5rem 1rem";
          cancelBtn.style.border = "4px solid black";
          cancelBtn.style.boxShadow = "4px 4px 0px 0px rgba(0,0,0,1)";
          cancelBtn.style.borderRadius = "0";
          cancelBtn.style.fontWeight = "bold";
          cancelBtn.style.cursor = "pointer";
          cancelBtn.style.textTransform = "uppercase";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm(data, deliveryCost);
      }
    });
  };

  const onConfirm = (data, deliveryCost) => {
    const parcelData = {
      ...data,
      cost: deliveryCost,
      created_by: user.email,
      payment_status: "unpaid",
      delivery_status: "not collected",
      tracking_id: generateTrackingId(),
      createdAt: new Date(),
    };
    console.log("Saved Parcel:", parcelData);

    axiosSecure.post("/parcels", parcelData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Payment Initiated",
          text: `Total payment of ৳${deliveryCost} is being processed.`,
          buttonsStyling: false,
          customClass: {
            confirmButton: "swal2-confirm",
          },
          didRender: () => {
            const popup = document.querySelector(".swal2-popup");
            if (popup) {
              popup.style.border = "4px solid black";
              popup.style.boxShadow = "8px 8px 0px 0px rgba(0,0,0,1)";
              popup.style.borderRadius = "0";
            }
            const confirmBtn = document.querySelector(".swal2-confirm");
            if (confirmBtn) {
              confirmBtn.style.backgroundColor = "#16a34a";
              confirmBtn.style.color = "white";
              confirmBtn.style.padding = "0.5rem 1rem";
              confirmBtn.style.border = "4px solid black";
              confirmBtn.style.boxShadow = "4px 4px 0px 0px rgba(0,0,0,1)";
              confirmBtn.style.borderRadius = "0";
              confirmBtn.style.fontWeight = "bold";
              confirmBtn.style.textTransform = "uppercase";
            }
          },
        });
        navigate("/dashboard/myParcels");
      }
    });

    reset();
    setCost(null);
  };

  return (
    <div className="mx-auto bg-base-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
      <h1 className="text-3xl font-black text-center mb-4 uppercase">
        Send Your Parcel
      </h1>

      {/* Form Start */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ===== Parcel Info ===== */}
        <div>
          <h2 className="text-xl font-black mb-2 uppercase">1. Parcel Info</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <select
              {...register("type", { required: true })}
              className="select select-bordered w-full border-4 border-black"
            >
              <option value="">Select Type</option>
              <option value="document">Document</option>
              <option value="non-document">Non-Document</option>
            </select>

            <input
              {...register("title", { required: true })}
              placeholder="Parcel Title"
              className="input input-bordered w-full border-4 border-black"
            />

            {type === "non-document" && (
              <input
                type="number"
                step="0.1"
                {...register("weight")}
                placeholder="Weight (kg)"
                className="input input-bordered w-full border-4 border-black"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ===== Sender Info ===== */}
          <div>
            <h2 className="text-xl font-black mb-2 uppercase">
              2. Sender Info
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                {...register("senderName", { required: true })}
                defaultValue="Zahin"
                placeholder="Sender Name"
                className="input input-bordered w-full border-4 border-black"
              />
              <input
                type="number"
                {...register("senderContact", { required: true })}
                placeholder="Contact Number"
                className="input input-bordered w-full border-4 border-black"
              />

              {/* Sender Region */}
              <select
                {...register("senderRegion", { required: true })}
                className="select select-bordered w-full border-4 border-black"
              >
                <option value="">Select Region</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              {/* Sender District */}
              <select
                {...register("senderDistrict", { required: true })}
                className="select select-bordered w-full border-4 border-black"
              >
                <option value="">Select District</option>
                {senderDistricts.map((d) => (
                  <option key={d.district} value={d.district}>
                    {d.district}
                  </option>
                ))}
              </select>

              {/* Sender Service Center */}
              <select
                {...register("senderService", { required: true })}
                className="select select-bordered w-full border-4 border-black"
              >
                <option value="">Select Service Center</option>
                {senderServiceCenters.map((center) => (
                  <option key={center} value={center}>
                    {center}
                  </option>
                ))}
              </select>

              <input
                {...register("senderAddress", { required: true })}
                placeholder="Sender Address"
                className="input input-bordered w-full border-4 border-black"
              />
              <input
                {...register("pickupInstruction")}
                placeholder="Pickup Instruction"
                className="input input-bordered w-full border-4 border-black"
              />
            </div>
          </div>

          {/* ===== Receiver Info ===== */}
          <div>
            <h2 className="text-xl font-black mb-2 uppercase">
              3. Receiver Info
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                {...register("receiverName", { required: true })}
                placeholder="Receiver Name"
                defaultValue="Sadman"
                className="input input-bordered w-full border-4 border-black"
              />
              <input
                type="number"
                {...register("receiverContact", { required: true })}
                placeholder="Receiver Contact"
                className="input input-bordered w-full border-4 border-black"
              />

              {/* Receiver Region */}
              <select
                {...register("receiverRegion", { required: true })}
                className="select select-bordered w-full border-4 border-black"
              >
                <option value="">Select Region</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              {/* Receiver District */}
              <select
                {...register("receiverDistrict", { required: true })}
                className="select select-bordered w-full border-4 border-black"
              >
                <option value="">Select District</option>
                {receiverDistricts.map((d) => (
                  <option key={d.district} value={d.district}>
                    {d.district}
                  </option>
                ))}
              </select>

              {/* Receiver Service Center */}
              <select
                {...register("receiverService", { required: true })}
                className="select select-bordered w-full border-4 border-black"
              >
                <option value="">Select Service Center</option>
                {receiverServiceCenters.map((center) => (
                  <option key={center} value={center}>
                    {center}
                  </option>
                ))}
              </select>

              <input
                {...register("receiverAddress", { required: true })}
                placeholder="Receiver Address"
                className="input input-bordered w-full border-4 border-black"
              />
              <input
                {...register("deliveryInstruction")}
                placeholder="Delivery Instruction"
                className="input input-bordered w-full border-4 border-black"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="btn btn-primary w-1/3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all font-black uppercase"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
