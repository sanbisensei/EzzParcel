// const faqs = [
//   {
//     question: "How long does delivery take?",
//     answer:
//       "Most parcels arrive within 2-5 business days. For distant lands, it may take a fortnight or more.",
//   },
//   {
//     question: "Do you provide tracking for parcels?",
//     answer:
//       "Yes! Each parcel comes with a magical scroll (tracking number) to trace its journey in real-time.",
//   },
//   {
//     question: "Can I schedule a delivery for a specific day?",
//     answer:
//       "Indeed! You may choose the day your parcel departs, ensuring it arrives when you wish.",
//   },
//   {
//     question: "Are fragile items handled with care?",
//     answer:
//       "Absolutely. Our couriers treat every treasure as if it were the king’s own, wrapped and guarded with care.",
//   },
//   {
//     question: "What if my parcel is lost or damaged?",
//     answer:
//       "Fret not! Report to the guild (support team) and we shall send a replacement swiftly.",
//   },
// ];

// const FAQ = () => {
//   return (
//     <section className="py-12 px-4 bg-base-100 text-center">
//       {/* Header */}
//       <h2 data-aos="fade-up" className="text-2xl md:text-3xl font-bold mb-2">
//         Frequently Asked Questions (FAQ)
//       </h2>
//       <p data-aos="fade-up" className="text-gray-600 max-w-xl mx-auto mb-8">
//         Seek answers to the most common queries about EzzParcel — your trusted
//         medieval-inspired parcel delivery guild.
//       </p>

//       {/* FAQ Dropdowns */}
//       <div className="max-w-2xl mx-auto space-y-4 text-left">
//         {faqs.map((faq, index) => (
//           <div
//             key={index}
//             data-aos="fade-up"
//             className="collapse collapse-plus w-full border border-gray-300 bg-base-200 rounded-md"
//           >
//             <input type="checkbox" className="w-full" />
//             <div className="collapse-title font-semibold text-lg cursor-pointer px-4 py-3">
//               {faq.question}
//             </div>
//             <div className="collapse-content text-gray-700 px-4 py-3 overflow-visible">
//               <p>{faq.answer}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FAQ;

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Most parcels arrive within 2-5 business days. For distant lands, it may take a fortnight or more.",
  },
  {
    question: "Do you provide tracking for parcels?",
    answer:
      "Yes! Each parcel comes with a magical scroll (tracking number) to trace its journey in real-time.",
  },
  {
    question: "Can I schedule a delivery for a specific day?",
    answer:
      "Indeed! You may choose the day your parcel departs, ensuring it arrives when you wish.",
  },
  {
    question: "Are fragile items handled with care?",
    answer:
      "Absolutely. Our couriers treat every treasure as if it were the king's own, wrapped and guarded with care.",
  },
  {
    question: "What if my parcel is lost or damaged?",
    answer:
      "Fret not! Report to the guild (support team) and we shall send a replacement swiftly.",
  },
];

const FAQ = () => {
  return (
    <section className="py-12 px-4 bg-base-100 text-center">
      {/* Header */}
      <h2 data-aos="fade-up" className="text-2xl md:text-3xl font-bold mb-2">
        Frequently Asked Questions (FAQ)
      </h2>
      <p data-aos="fade-up" className="text-base-content max-w-xl mx-auto mb-8">
        Seek answers to the most common queries about EzzParcel — your trusted
        medieval-inspired parcel delivery guild.
      </p>

      {/* FAQ Dropdowns */}
      <div className="max-w-2xl mx-auto space-y-4 text-left">
        {faqs.map((faq, index) => (
          <div
            key={index}
            data-aos="fade-up"
            className="collapse collapse-plus w-full border-4 border-neutral bg-base-200 rounded-md"
            style={{
              boxShadow:
                "6px 6px 0px 0px rgb(var(--n) / var(--tw-bg-opacity, 1))",
            }}
          >
            <input type="checkbox" className="w-full" />
            <div className="collapse-title font-semibold text-lg cursor-pointer px-4 py-3">
              {faq.question}
            </div>
            <div className="collapse-content text-base-content px-4 py-3 overflow-visible">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
