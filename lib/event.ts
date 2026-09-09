export const locales = ["en", "ta"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * Edit this file with your celebration details.
 * Tamil and English are kept side by side so WhatsApp links can stay in one language.
 */
export const event = {
  childNameEn: "Your daughter",
  childNameTa: "உங்கள் மகள்",
  ageEn: "1st Birthday",
  ageTa: "முதல் பிறந்தநாள்",
  hostsEn: "Amma & Appa",
  hostsTa: "அம்மா மற்றும் அப்பா",
  dateEn: "Saturday, 18 October 2026",
  dateTa: "சனிக்கிழமை, 18 அக்டோபர் 2026",
  timeEn: "11:00 AM – 2:00 PM",
  timeTa: "காலை 11:00 – மதியம் 2:00",
  venueNameEn: "Add the venue name",
  venueNameTa: "விழா நடைபெறும் இடம்",
  venueAddressEn: "Street, Area, City, PIN",
  venueAddressTa: "தெரு, பகுதி, நகரம், அஞ்சல் குறியீடு",
  mapsUrl: "https://maps.google.com/?q=Chennai",
  rsvpByEn: "Please reply by 10 October",
  rsvpByTa: "தயவுசெய்து அக்டோபர் 10-க்குள் பதிலளிக்கவும்",
  whatToExpectEn: [
    "A warm welcome, cake cutting, and blessings for the birthday girl",
    "Lunch will be served — come hungry",
    "Children are very welcome",
    "Festive or traditional attire",
    "Parking is available at the venue",
  ],
  whatToExpectTa: [
    "வரவேற்பு, கேக் வெட்டுதல் மற்றும் பிறந்தநாள் சிறுமிக்கு ஆசிகள்",
    "மதிய உணவு வழங்கப்படும்",
    "குழந்தைகளும் வரலாம்",
    "விழா அல்லது பாரம்பரிய உடை",
    "வாகனம் நிறுத்த இடம் உண்டு",
  ],
};

export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
