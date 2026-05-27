// config.js — Central configuration for the Interrail Travel Journal
// Edit this file to update ALL dynamic content across the site.

export const config = {

  // ─── GLOBAL SETTINGS ──────────────────────────────────────────────────────
  maxPhotosPerAlbum: 8,

  // ─── SITE META ────────────────────────────────────────────────────────────
  meta: {
    title: "Interrail 2026",
    subtitle: "Exploring the cold nights & bright railtracks of Northern Europe"
  },

  // ─── ITINERARY STATIONS ───────────────────────────────────────────────────
  // Each station renders as a card in the horizontal Journey section.
  // type: 'outgoing' | 'u-turn' | 'return'
  // estimatedCost: estimated € per person per night (placeholder)
  stations: [
    {
      id: "firenze",
      cityName: "Florence",
      country: "Italy",
      date: "August 8, 2026",
      description: "The departure point. Packed bags, passport checked, Interrail pass validated. Ready for the long journey north.",
      type: "outgoing",
      featuredImage: "assets/Firenze1.png",
      // Geographic zone for thermal palette: 0 = warm south, 1 = cold north
      thermalIndex: 0.0
    },
    {
      id: "copenhagen",
      cityName: "Copenhagen",
      country: "Denmark",
      date: "August 9-13, 2026",
      days: 4,
      accommodation: "Steel House Copenhagen",
      estimatedCost: 42,
      description: "Arrived after a scenic trans-European train connection. Rented cargo bikes, explored Nyhavn, and enjoyed cardamom buns.",
      type: "outgoing",
      featuredImage: "assets/Copenhagen.jpg",
      thermalIndex: 0.5
    },
    {
      id: "stockholm",
      cityName: "Stockholm",
      country: "Sweden",
      date: "August 13-16, 2026",
      days: 3,
      accommodation: "Generator Stockholm",
      estimatedCost: 38,
      description: "Ferry rides across the archipelago, visited the Vasa Museum, walked the narrow streets of Gamla Stan. Cold breeze at sunset.",
      type: "outgoing",
      featuredImage: "assets/Stoccolma.jpg",
      thermalIndex: 0.8
    },
    {
      id: "uppsala",
      cityName: "Uppsala",
      country: "Sweden",
      date: "August 16-19, 2026",
      days: 3,
      accommodation: "CityStay Uppsala",
      estimatedCost: 32,
      description: "The northernmost point of the route — the U-Turn station. Visited the cathedral and university gardens. Beautiful, quiet college town vibe.",
      type: "u-turn",
      featuredImage: "assets/Uppsala.jpg",
      thermalIndex: 1.0
    },
    {
      id: "hamburg",
      cityName: "Hamburg",
      country: "Germany",
      date: "August 19-20, 2026",
      days: 1,
      accommodation: "Superbude Altona",
      estimatedCost: 35,
      description: "Speicherstadt brick warehouses looked amazing at twilight. Visited Miniatur Wunderland. Great harbor vibes.",
      type: "return",
      featuredImage: "assets/Amburgo.webp",
      thermalIndex: 0.6
    },
    {
      id: "munich",
      cityName: "Munich",
      country: "Germany",
      date: "August 20-23, 2026",
      days: 3,
      accommodation: "Wombat's City Hostel",
      estimatedCost: 33,
      description: "Marienplatz, the Englischer Garten, and surfers on the Eisbachwelle wave. A perfect final stop before heading home.",
      type: "return",
      featuredImage: "assets/Monaco.webp",
      thermalIndex: 0.3
    },
    {
      id: "firenze-return",
      cityName: "Florence",
      country: "Italy",
      date: "August 23, 2026",
      description: "End of the loop. Exhausted but full of memories, rail tickets, and photos from across Northern Europe.",
      type: "return",
      featuredImage: "assets/Firenze2.jpg",
      thermalIndex: 0.0
    }
  ],

  // ─── TRAIN CONNECTIONS ────────────────────────────────────────────────────
  // Displayed as pill tooltips between station cards.
  connections: [
    { from: "firenze", to: "copenhagen", duration: "~1d", type: "EuroNight" },
    { from: "copenhagen", to: "stockholm", duration: "~5h", type: "SJ X2000" },
    { from: "stockholm", to: "uppsala", duration: "~1h", type: "Regional" },
    { from: "uppsala", to: "hamburg", duration: "~12h", type: "InterCity" },
    { from: "hamburg", to: "munich", duration: "~5h", type: "ICE" },
    { from: "munich", to: "firenze-return", duration: "~8h", type: "EuroCity" },
  ],

  // ─── PHOTO ALBUMS ─────────────────────────────────────────────────────────
  // Each album corresponds to one city. Matched to stations by cityName.
  albums: [
    {
      cityId: "firenze",
      cityName: "Florence",
      photoPaths: [
        "assets/florence-01.jpg",
        "assets/florence-02.jpg",
        "assets/florence-03.jpg",
        "assets/florence-04.jpg"
      ]
    },
    {
      cityId: "copenhagen",
      cityName: "Copenhagen",
      photoPaths: [
        "assets/copenhagen-01.jpg",
        "assets/copenhagen-02.jpg",
        "assets/copenhagen-03.jpg",
        "assets/copenhagen-04.jpg",
        "assets/copenhagen-05.jpg"
      ]
    },
    {
      cityId: "stockholm",
      cityName: "Stockholm",
      photoPaths: [
        "assets/stockholm-01.jpg",
        "assets/stockholm-02.jpg",
        "assets/stockholm-03.jpg",
        "assets/stockholm-04.jpg",
        "assets/stockholm-05.jpg"
      ]
    },
    {
      cityId: "uppsala",
      cityName: "Uppsala",
      photoPaths: [
        "assets/uppsala-01.jpg",
        "assets/uppsala-02.jpg",
        "assets/uppsala-03.jpg"
      ]
    },
    {
      cityId: "hamburg",
      cityName: "Hamburg",
      photoPaths: [
        "assets/hamburg-01.jpg",
        "assets/hamburg-02.jpg",
        "assets/hamburg-03.jpg",
        "assets/hamburg-04.jpg"
      ]
    },
    {
      cityId: "munich",
      cityName: "Munich",
      photoPaths: [
        "assets/munich-01.jpg",
        "assets/munich-02.jpg",
        "assets/munich-03.jpg",
        "assets/munich-04.jpg",
        "assets/munich-05.jpg"
      ]
    },
    {
      cityId: "firenze-return",
      cityName: "Florence",
      photoPaths: [
        "assets/firenze-return-01.jpg",
        "assets/firenze-return-02.jpg"
      ]
    }
  ],

  // ─── USEFUL LINKS ─────────────────────────────────────────────────────────
  // Displayed in the Useful Links section before the footer.
  usefulLinks: [
    {
      id: "interrail",
      label: "Interrail Pass",
      url: "https://www.interrail.eu/en",
      description: "Acquisto e gestione del pass Interrail globale",
      icon: "train"
    },
    {
      id: "Google Sheets",
      label: "Google Sheets",
      url: "https://docs.google.com/spreadsheets/d/1PiseslzftYcfBc9gKXv2kQa3JUQYCIL7uA0Sf4rltp8/edit?usp=sharing",
      description: "General info about the trip",
      icon: "bed"
    },
    {
      id: "Farnesina",
      label: "Farnesina",
      url: "https://www.dovesiamonelmondo.it/home.html",
      description: "Safe traveling service for Italian citizens",
      icon: "clock"
    },
    {
      id: "discount",
      label: "Discount Ostelli",
      url: "https://www.famoushostels.com/eco-wanderer/?utm_source=eurail&utm_medium=cta&utm_campaign=eurail_page",
      description: "Discount for saving Co2 with the Interrail pass",
      icon: "map"
    },
    {
      id: "hostels",
      label: "Hostelworld",
      url: "https://www.hostelworld.com",
      description: "Booking for hostels and accomodation",
      icon: "ticket"
    },
    {
      id: "xe",
      label: "XE Currency",
      url: "https://www.xe.com",
      description: "Real time currency converter",
      icon: "coin"
    }
  ]
};
