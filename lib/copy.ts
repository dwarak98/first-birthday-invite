import { event, type Locale } from "./event";

export function copyFor(locale: Locale) {
  const tamil = locale === "ta";
  const name = tamil ? event.childNameTa : event.childNameEn;

  return {
    locale,
    htmlLang: tamil ? "ta" : "en",
    name,
    scriptEyebrow: tamil ? "அன்புடன் அழைக்கிறோம்" : "You're invited",
    headline: tamil
      ? `${name} சிறுமியின் ${event.ageTa}`
      : `Celebrate ${name}'s ${event.ageEn}`,
    intro: tamil
      ? `எங்கள் மகள் ஸ்ரிஷ்டிகா த்வர்கநாத்தின் முதல் பிறந்தநாளை உங்களுடன் கொண்டாட விரும்புகிறோம். உங்கள் வருகை எங்களுக்கு மிகவும் முக்கியம்.`
      : `We would love for you to celebrate ${name}'s first birthday with us. Your presence would mean the world.`,
    fromLabel: tamil ? "அன்புடன்" : "With love",
    hosts: tamil ? event.hostsTa : event.hostsEn,
    whenLabel: tamil ? "தேதி & நேரம்" : "Date & time",
    date: tamil ? event.dateTa : event.dateEn,
    time: tamil ? event.timeTa : event.timeEn,
    whereLabel: tamil ? "இடம்" : "Venue",
    venueName: tamil ? event.venueNameTa : event.venueNameEn,
    venueAddress: tamil ? event.venueAddressTa : event.venueAddressEn,
    mapsCta: tamil ? "வரைபடத்தில் திற" : "Open in Maps",
    expectLabel: tamil ? "என்ன நடக்கும்" : "What to expect",
    expect: tamil ? event.whatToExpectTa : event.whatToExpectEn,
    rsvpTitle: tamil ? "வருகிறீர்களா?" : "Will you join us?",
    rsvpLead: tamil
      ? `உணவு மற்றும் இடத்தை திட்டமிட, தயவுசெய்து RSVP செய்யவும். ${event.rsvpByTa}.`
      : `Please RSVP so we can plan food and seating. ${event.rsvpByEn}.`,
    nameLabel: tamil ? "உங்கள் பெயர்" : "Your name",
    attendingLabel: tamil ? "வருகிறீர்களா?" : "Are you attending?",
    yes: tamil ? "ஆம், வருகிறோம்" : "Yes, we'll be there",
    no: tamil ? "வர இயலாது" : "Sorry, we can't make it",
    peopleLabel: tamil ? "வருபவர்களின் எண்ணிக்கை" : "Number of people attending",
    submit: tamil ? "RSVP அனுப்பு" : "Send RSVP",
    submitting: tamil ? "அனுப்புகிறது..." : "Sending...",
    thanksYes: tamil
      ? "நன்றி! உங்களை சந்திப்பதில் மகிழ்ச்சி."
      : "Thank you! We can't wait to celebrate with you.",
    thanksNo: tamil
      ? "தெரிவித்ததற்கு நன்றி. உங்களை நினைப்போம்."
      : "Thank you for letting us know. We'll miss you.",
    error: tamil
      ? "ஒரு சிக்கல் ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்."
      : "Something went wrong. Please try again.",
    switchTo: tamil ? "English" : "தமிழ்",
    switchHref: tamil ? "/" : "/?lang=ta",
    switchHint: tamil ? "View in English" : "தமிழில் பார்க்க",
    ogTitle: tamil
      ? `${name} — ${event.ageTa} அழைப்பிதழ்`
      : `${name}'s ${event.ageEn} invitation`,
    ogDescription: tamil
      ? `${event.dateTa} · ${event.timeTa} · ${event.venueNameTa}`
      : `${event.dateEn} · ${event.timeEn} · ${event.venueNameEn}`,
    pickerTitle: tamil ? "மொழியைத் தேர்ந்தெடுக்கவும்" : "Choose a language",
    homeTitle: "First birthday invitation",
    homeLead:
      "Open the invitation in your language. You can RSVP on the next page.",
    englishCard: "English invitation",
    tamilCard: "தமிழ் அழைப்பிதழ்",
    footer: tamil
      ? "இந்த அழைப்பிதழை WhatsApp-ல் பகிரலாம்."
      : "Share this page on WhatsApp — the invitation image will appear in the preview.",
  };
}
