export interface Doctor {
  id: string;
  name: string;
  role: string;
  img: string;
  degrees: string[];
  experience: string;
  availability: string;
  bio: string;
  specialties: string[];
  achievements: { title: string; description: string }[];
}

export const DOCTORS: Doctor[] = [
  {
    id: "dr-sk-singh",
    name: "Dr. S.K. Singh",
    role: "Senior Surgeon & Specialist",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    degrees: ["MD", "MS", "Sr. Surgeon"],
    experience: "15+ Years",
    availability: "Mon - Sat (10 AM - 8 PM)",
    bio: "Dr. S.K. Singh is the leading surgeon at SK Medical Center with over 15 years of surgical excellence. He specializes in minimally invasive procedures and has successfully performed thousands of surgeries, helping patients recover faster and more effectively.",
    specialties: ["General Surgery", "Abdominal Procedures", "Laparoscopic Surgery", "Emergency Medicine"],
    achievements: [
      { title: "Surgical Excellence Award", description: "Recognized for outstanding success rates in complex abdominal surgeries." },
      { title: "Community Service Honor", description: "Awarded for providing affordable healthcare to the Vikas Nagar community." }
    ]
  },
  {
    id: "pediatrics-expert",
    name: "Dr. Meena Gupta",
    role: "Pediatrics Specialist",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600",
    degrees: ["MD (Pediatrics)", "DNB"],
    experience: "10+ Years",
    availability: "Available 24/7 (On Call)",
    bio: "Focused on compassionate care for your little ones, Dr. Meena Gupta has extensive experience in neonatal and pediatric care. She believes in a holistic approach to child health, ensuring every child receives the care they need to thrive.",
    specialties: ["Neonatology", "Child Vaccinations", "Growth & Development", "Pediatric Emergencies"],
    achievements: [
      { title: "Child Care Pioneer", description: "Implemented modern vaccination protocols in the local community." },
      { title: "Top Rated Pediatrician", description: "Consistently rated 5 stars for her empathetic approach with children." }
    ]
  },
  {
    id: "specialist-surgeon",
    name: "Dr. Aryan Khan",
    role: "Consultant Surgeon",
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    degrees: ["MBBS", "MS (Surgery)"],
    experience: "8+ Years",
    availability: "Evenings (4 PM - 9 PM)",
    bio: "Dr. Aryan Khan brings modern surgical techniques and a patient-first philosophy to SK Medical Center. He specializes in acute care and minor surgical procedures with a focus on precision and safety.",
    specialties: ["Minor Surgeries", "Trauma Care", "Acute Pain Management", "Surgical Consultations"],
    achievements: [
      { title: "Innovation in Surgery", description: "Pioneered day-care surgical methods to reduce hospital stay." },
      { title: "Rapid Response Award", description: "Commended for his efficiency in emergency surgical interventions." }
    ]
  },
  {
    id: "general-physician",
    name: "Dr. Ritu Sharma",
    role: "Senior General Physician",
    img: "https://images.unsplash.com/photo-1559839734-2b71f15364ef?auto=format&fit=crop&q=80&w=600",
    degrees: ["MBBS", "DNB (Medicine)"],
    experience: "12+ Years",
    availability: "Full-Time (9 AM - 6 PM)",
    bio: "With a vast experience in internal medicine, Dr. Ritu Sharma is dedicated to managing chronic diseases and preventive healthcare. She is known for her detailed diagnostic approach and personalized treatment plans.",
    specialties: ["Internal Medicine", "Diabetes Management", "Hypertension", "Chronic Disease Care"],
    achievements: [
      { title: "Preventive Health Award", description: "Recognized for her contribution to early disease detection programs." },
      { title: "Patient Choice Award", description: "Voted most approachable doctor by our regular patients." }
    ]
  }
];
