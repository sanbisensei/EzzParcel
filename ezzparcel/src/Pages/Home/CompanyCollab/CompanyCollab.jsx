import Marquee from "react-fast-marquee";

import company1 from "../../../assets/company (1).png";
import company2 from "../../../assets/company (2).png";
import company3 from "../../../assets/company (3).png";
import company4 from "../../../assets/company (4).png";
import company5 from "../../../assets/company (5).png";
import company6 from "../../../assets/company (6).png";
import company7 from "../../../assets/company (7).png";

const logos = [
  company1,
  company2,
  company3,
  company4,
  company5,
  company6,
  company7,
];

const CompanyCollab = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Our Trusted Clients
        </h2>

        {/* Sliding Logos */}
        <Marquee
          gradient={false}
          speed={40} // speed of sliding
          direction="left" // can also be "right"
          pauseOnHover={true}
        >
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 h-20 flex items-center justify-center mx-8"
            >
              <img
                src={logo}
                alt={`Client ${i + 1}`}
                className="max-h-16 object-contain grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default CompanyCollab;
