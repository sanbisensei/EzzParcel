// src/Pages/Coverage/Coverage.jsx
import { useState } from "react";
import CoverageMap from "./CoverageMap";
import districtData from "./districtData.json";

const Coverage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  // Filter for matching districts or areas
  const matchedDistricts = searchTerm
    ? districtData.filter(
        (d) =>
          d.district.toLowerCase().includes(lowerCaseSearchTerm) ||
          d.city.toLowerCase().includes(lowerCaseSearchTerm) ||
          d.covered_area.some((a) =>
            a.toLowerCase().includes(lowerCaseSearchTerm)
          )
      )
    : districtData;

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        We are available in{" "}
        <span className="text-blue-600">{districtData.length} districts</span>
      </h1>

      <div className="w-full max-w-md mb-8">
        <input
          type="text"
          placeholder="Search your district..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Pass matched district to the map */}
      <div className="w-full max-w-5xl">
        <CoverageMap searchResults={matchedDistricts} />
      </div>
    </div>
  );
};

export default Coverage;
