import React from "react";
import { Button } from "./ui/button";

interface Region {
  workingStatuse: boolean;
}

type RegionData = {
  [regionName: string]: Region;
};

const regions: RegionData = {
  CVR_L1: { workingStatuse: false },
  CVR_L2: { workingStatuse: true },
  CVAH_L1: { workingStatuse: true },
  CVAH_L2: { workingStatuse: true },
  Pinch_Roll_L1: { workingStatuse: true },
  Pinch_Roll_L2: { workingStatuse: true },
  HMD: { workingStatuse: true },
  SH1: { workingStatuse: true },
  SH2: { workingStatuse: true },
  SH3: { workingStatuse: true },
  "Stand_01-06": { workingStatuse: true },
  "Stand_07-12": { workingStatuse: true },
  "Stand_13-18": { workingStatuse: true },
  "FURNACE EXIT": { workingStatuse: true },
};

const RegionTable: React.FC = () => {
  const filteredRegions = Object.entries(regions).filter(
    ([_, regionInfo]) => !regionInfo.workingStatuse
  );

  return (
    <table className="table-auto w-full border border-gray-300 rounded-md">
      <thead>
        <tr className="bg-gray-100 text-left text-sm font-medium">
          <th className="px-4 py-2">Sr. No.</th>
          <th className="px-4 py-2">Region Name</th>
          <th className="px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {filteredRegions.map(([regionName, regionInfo], index) => (
          <tr key={regionName} className="border-b border-gray-300">
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2">{regionName}</td>
            <td className="px-4 py-2">
              <Button>Add to region</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RegionTable;
