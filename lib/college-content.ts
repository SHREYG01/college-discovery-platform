import type { College } from "@/types";

type CollegeBase = Pick<
  College,
  "name" | "location" | "fees" | "rating" | "description"
>;

export function getAdmissionInfo(college: CollegeBase) {
  const isPremier =
    college.name.includes("IIT") ||
    college.name.includes("BITS") ||
    college.name.includes("NIT");

  return {
    eligibility: isPremier
      ? [
          "Valid JEE Main / JEE Advanced rank (program-specific cutoffs apply)",
          "Minimum 75% in Class XII (PCM) or equivalent qualifying examination",
          "Age limit as per conducting authority guidelines",
        ]
      : [
          "Completion of Class XII with PCM/PCB as per program requirements",
          "Minimum aggregate score of 60% in qualifying examination",
          "Entrance exam score (institute-specific or state/national level)",
        ],
    process: [
      "Register on the official admission portal",
      "Submit academic documents and entrance exam scores",
      "Participate in counselling / seat allocation rounds",
      "Pay admission fee and complete enrollment formalities",
    ],
    deadlines: [
      { label: "Application opens", value: "January – March" },
      { label: "Entrance exams", value: "April – June" },
      { label: "Counselling rounds", value: "July – August" },
      { label: "Session begins", value: "August – September" },
    ],
    documents: [
      "Class X & XII mark sheets and certificates",
      "Entrance exam scorecard",
      "Category / domicile certificates (if applicable)",
      "Passport-size photographs and government ID proof",
    ],
    feeNote: `Annual tuition is approximately ₹${college.fees.toLocaleString("en-IN")}. Hostel, mess, and other charges are additional.`,
  };
}

export function getPlacementInfo(college: CollegeBase) {
  const placementRate = Math.min(98, Math.round(college.rating * 18 + 10));
  const avgPackage = Math.round(college.fees * (college.rating >= 4.5 ? 3.2 : 2.4));
  const highestPackage = Math.round(avgPackage * (college.rating >= 4.5 ? 4.5 : 3));

  const recruiters =
    college.rating >= 4.5
      ? [
          "Google",
          "Microsoft",
          "Amazon",
          "Goldman Sachs",
          "Qualcomm",
          "Texas Instruments",
        ]
      : college.rating >= 4.0
        ? [
            "TCS",
            "Infosys",
            "Wipro",
            "Cognizant",
            "Accenture",
            "Capgemini",
          ]
        : [
            "TCS",
            "Infosys",
            "HCL",
            "Tech Mahindra",
            "L&T",
            "Startups & SMEs",
          ];

  return {
    placementRate,
    avgPackage,
    highestPackage,
    recruiters,
    highlights: [
      `${placementRate}% of eligible students placed in the most recent season`,
      `Average package of ₹${(avgPackage / 100000).toFixed(1)} LPA across core branches`,
      `Highest package recorded at ₹${(highestPackage / 100000).toFixed(1)} LPA`,
      "Dedicated training & placement cell with pre-placement talks and mock interviews",
    ],
  };
}
