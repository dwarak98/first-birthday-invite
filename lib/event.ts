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
  childNameEn: "Shrishtiika Dwaraknaath",
  childNameTa: "ஸ்ரிஷ்டிகா த்வர்கநாத்",
  ageEn: "1st Birthday",
  ageTa: "முதல் பிறந்தநாள்",
  hostsEn: "Dwaraknaath and Srivarsini",
  hostsTa: "த்வர்கநாத் மற்றும் ஸ்ரீவர்சினி",
  dateEn: "Saturday, 26th September 2026",
  dateTa: "சனிக்கிழமை, 26 செப்டம்பர் 2026",
  timeEn: "6:00 PM – 8:00 PM",
  timeTa: "மாலை 6:00 – 8:00",
  venueNameEn: "Zaitoon Velachery",
  venueNameTa: "ஜைத்தூன் வேளச்சேரி",
  venueAddressEn:
    "362, Velachery – Tambaram Main Road, opposite Adayar Ananda Bhavan, Velachery, Chennai 600042",
  venueAddressTa:
    "362, வேளச்சேரி – தாம்பரம் மெயின் ரோடு, அடையார் ஆனந்த பவன் எதிரில், வேளச்சேரி, சென்னை 600042",
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Zaitoon+Restaurant%2C+362+Velachery+Main+Road%2C+Velachery%2C+Chennai+600042",
  rsvpByEn: "Please reply by 20 September",
  rsvpByTa: "தயவுசெய்து செப்டம்பர் 20-க்குள் பதிலளிக்கவும்",
  whatToExpectEn: [
    "Cake cutting",
    "Dinner",
    "Valet parking available",
  ],
  whatToExpectTa: [
    "கேக் வெட்டுதல்",
    "இரவு உணவு",
    "வேலேட் பார்க்கிங் உண்டு",
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
