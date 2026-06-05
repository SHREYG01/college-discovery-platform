import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const colleges = [
  {
    name: "Indian Institute of Technology Delhi",
    location: "Hauz Khas, New Delhi",
    fees: 225000,
    rating: 4.8,
    description:
      "One of India's premier engineering institutes, IIT Delhi offers cutting-edge research facilities, strong industry placements, and a vibrant campus life in the heart of the capital.",
  },
  {
    name: "Indian Institute of Technology Bombay",
    location: "Powai, Mumbai, Maharashtra",
    fees: 230000,
    rating: 4.9,
    description:
      "IIT Bombay is consistently ranked among India's top institutions, known for excellence in engineering, entrepreneurship culture, and exceptional placement records with global recruiters.",
  },
  {
    name: "Indian Institute of Technology Madras",
    location: "Adyar, Chennai, Tamil Nadu",
    fees: 220000,
    rating: 4.8,
    description:
      "IIT Madras combines world-class academics with a sprawling green campus. It leads in research output, startups, and interdisciplinary programs across engineering and sciences.",
  },
  {
    name: "Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu",
    fees: 198000,
    rating: 4.2,
    description:
      "VIT Vellore is a leading private university offering flexible curriculum, international exchange programs, and a massive campus with modern labs and strong corporate tie-ups.",
  },
  {
    name: "Birla Institute of Technology and Science, Pilani",
    location: "Pilani, Rajasthan",
    fees: 475000,
    rating: 4.7,
    description:
      "BITS Pilani is renowned for its rigorous academics, zero-attendance policy, and practice school internships. Alumni include leaders across tech, finance, and research worldwide.",
  },
  {
    name: "National Institute of Technology, Tiruchirappalli",
    location: "Tiruchirappalli, Tamil Nadu",
    fees: 165000,
    rating: 4.5,
    description:
      "NIT Trichy is the top-ranked NIT in India, offering excellent value with strong placements, active student clubs, and a reputation for producing industry-ready engineers.",
  },
  {
    name: "SRM Institute of Science and Technology",
    location: "Kattankulathur, Chennai, Tamil Nadu",
    fees: 275000,
    rating: 4.0,
    description:
      "SRM Chennai is one of India's largest private universities with diverse programs, international collaborations, and a campus equipped with state-of-the-art research centres.",
  },
  {
    name: "Manipal Institute of Technology",
    location: "Manipal, Karnataka",
    fees: 385000,
    rating: 4.3,
    description:
      "Part of MAHE, Manipal Institute of Technology offers a cosmopolitan campus, strong medical-engineering synergy, and well-established placement networks across India and abroad.",
  },
  {
    name: "Indian Institute of Technology Kharagpur",
    location: "Kharagpur, West Bengal",
    fees: 228000,
    rating: 4.7,
    description:
      "The oldest IIT, IIT Kharagpur boasts the largest campus among IITs, pioneering departments in aerospace, ocean engineering, and law alongside core engineering disciplines.",
  },
  {
    name: "International Institute of Information Technology, Hyderabad",
    location: "Gachibowli, Hyderabad, Telangana",
    fees: 340000,
    rating: 4.6,
    description:
      "IIIT Hyderabad is a premier institute focused on computer science and electronics, with strong research in AI, robotics, and a highly selective admission process.",
  },
  {
    name: "Anna University",
    location: "Guindy, Chennai, Tamil Nadu",
    fees: 55000,
    rating: 4.1,
    description:
      "Anna University is Tamil Nadu's flagship technical university, affiliating hundreds of engineering colleges and running top-ranked government-funded programs at its main campus.",
  },
  {
    name: "Delhi Technological University",
    location: "Rohini, New Delhi",
    fees: 180000,
    rating: 4.4,
    description:
      "Formerly Delhi College of Engineering, DTU is a top state university with affordable fees, excellent placements, and a legacy of producing leaders in Indian industry.",
  },
  {
    name: "Jadavpur University",
    location: "Kolkata, West Bengal",
    fees: 12000,
    rating: 4.3,
    description:
      "Jadavpur University offers outstanding education at minimal cost, with highly regarded engineering and arts faculties and a politically active, intellectually vibrant campus culture.",
  },
  {
    name: "Christ University",
    location: "Hosur Road, Bengaluru, Karnataka",
    fees: 245000,
    rating: 4.1,
    description:
      "Christ University is a leading private deemed university known for holistic education, strong humanities and commerce programs alongside competitive engineering and sciences.",
  },
  {
    name: "Symbiosis Institute of Technology",
    location: "Lavale, Pune, Maharashtra",
    fees: 320000,
    rating: 4.2,
    description:
      "SIT Pune is part of the Symbiosis International University, offering industry-aligned curricula, a picturesque hilltop campus, and strong connections to Pune's IT and automotive hubs.",
  },
  {
    name: "Amrita School of Engineering",
    location: "Coimbatore, Tamil Nadu",
    fees: 310000,
    rating: 4.4,
    description:
      "Amrita Vishwa Vidyapeetham emphasises value-based education with modern infrastructure, active research in sustainable technologies, and growing international recognition.",
  },
  {
    name: "Thapar Institute of Engineering and Technology",
    location: "Patiala, Punjab",
    fees: 420000,
    rating: 4.3,
    description:
      "Thapar Institute is a historic private engineering college with strong alumni networks, well-funded labs, and consistent placement performance across core engineering branches.",
  },
  {
    name: "University of Delhi",
    location: "North Campus, New Delhi",
    fees: 25000,
    rating: 4.2,
    description:
      "Delhi University's Faculty of Technology and affiliated colleges offer affordable, high-quality education with access to the capital's internships, libraries, and cultural life.",
  },
  {
    name: "Jamia Millia Islamia",
    location: "Okhla, New Delhi",
    fees: 15000,
    rating: 4.0,
    description:
      "Jamia Millia Islamia is a central university with respected engineering and architecture programs, diverse student body, and a central Delhi location at very affordable fees.",
  },
  {
    name: "Ashoka University",
    location: "Rajiv Gandhi Education City, Sonipat, Haryana",
    fees: 950000,
    rating: 4.5,
    description:
      "Ashoka University is a liberal arts and sciences institution offering interdisciplinary undergraduate programs, small class sizes, and a focus on critical thinking and research.",
  },
];

async function main() {
  console.log("Seeding colleges...");

  await prisma.college.deleteMany();

  const result = await prisma.college.createMany({
    data: colleges,
  });

  console.log(`Seeded ${result.count} colleges.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
