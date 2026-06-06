export type CollegePlacementSummary = {
  placementRate: number;
  avgPackage: number;
  highestPackage: number;
  summary: string;
};

export type CollegeComparisonItem = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placements: CollegePlacementSummary;
};
