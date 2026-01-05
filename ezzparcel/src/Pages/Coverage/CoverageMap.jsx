// src/Pages/Coverage/CoverageMap.jsx
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import branchData from "./districtData.json";

// Fix icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ✅ Component to update map view based on search
function ChangeView({ searchResults }) {
  const map = useMap();

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      map.setView(
        [searchResults[0].latitude, searchResults[0].longitude],
        10, // zoom in
        { animate: true }
      );
    }
  }, [searchResults, map]);

  return null;
}

const CoverageMap = ({ searchResults }) => {
  const dataToDisplay =
    searchResults && searchResults.length > 0 ? searchResults : branchData;
  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-lg">
      <MapContainer
        center={[23.685, 90.3563]} // Default: Bangladesh center
        zoom={6}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* ✅ Move map when searchResult changes */}
        <ChangeView searchResults={searchResults} />

        {/* All markers */}
        {dataToDisplay.map((branch, index) => (
          <Marker key={index} position={[branch.latitude, branch.longitude]}>
            <Popup>
              <div className="font-semibold text-lg">{branch.district}</div>
              <div className="text-sm text-gray-700">
                Region: {branch.region} <br />
                City: {branch.city} <br />
                Areas: {branch.covered_area.join(", ")}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CoverageMap;
