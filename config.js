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
  // Each station is rendered as a card on the S-Curve timeline.
  // Rename `featuredImage` to point to your actual photo in `assets/`.
  stations: [
    {
      id: "firenze",
      cityName: "Florence",
      country: "Italy",
      date: "August 1–2, 2026",
      accommodation: "Ostello Bello Firenze",
      description: "The departure point. Packed bags, passport checked, Interrail pass validated. Ready for the long journey north.",
      type: "outgoing",
      featuredImage: "assets/Firenze1.png"
    },
    {
      id: "copenhagen",
      cityName: "Copenhagen",
      country: "Denmark",
      date: "August 4–6, 2026",
      accommodation: "Steel House Copenhagen",
      description: "Arrived after a scenic trans-European train connection. Rented cargo bikes, explored Nyhavn, and enjoyed cardamom buns.",
      type: "outgoing",
      featuredImage: "assets/Copenhagen.jpg"
    },
    {
      id: "stockholm",
      cityName: "Stockholm",
      country: "Sweden",
      date: "August 7–10, 2026",
      accommodation: "Generator Stockholm",
      description: "Ferry rides across the archipelago, visited the Vasa Museum, walked the narrow streets of Gamla Stan. Cold breeze at sunset.",
      type: "outgoing",
      featuredImage: "assets/Stoccolma.jpg"
    },
    {
      id: "uppsala",
      cityName: "Uppsala",
      country: "Sweden",
      date: "August 11–12, 2026",
      accommodation: "CityStay Uppsala",
      description: "The northernmost point of the route — the U-Turn station. Visited the cathedral and university gardens. Beautiful, quiet college town vibe.",
      type: "u-turn",
      featuredImage: "assets/Uppsala.jpg"
    },
    {
      id: "hamburg",
      cityName: "Hamburg",
      country: "Germany",
      date: "August 14–15, 2026",
      accommodation: "Superbude Altona",
      description: "Speicherstadt brick warehouses looked amazing at twilight. Visited Miniatur Wunderland. Great harbor vibes.",
      type: "return",
      featuredImage: "assets/Amburgo.webp"
    },
    {
      id: "munich",
      cityName: "Munich",
      country: "Germany",
      date: "August 17–19, 2026",
      accommodation: "Wombat's City Hostel",
      description: "Marienplatz, the Englischer Garten, and surfers on the Eisbachwelle wave. A perfect final stop before heading home.",
      type: "return",
      featuredImage: "assets/Monaco.webp"
    },
    {
      id: "firenze-return",
      cityName: "Florence",
      country: "Italy",
      date: "August 21, 2026",
      accommodation: "Home Sweet Home",
      description: "End of the loop. Exhausted but full of memories, rail tickets, and photos from across Northern Europe.",
      type: "return",
      featuredImage: "assets/Firenze2.jpg"
    }
  ],

  // ─── PHOTO ALBUMS ─────────────────────────────────────────────────────────
  // Each album corresponds to one city. photoPaths lists filenames inside assets/.
  // The gallery respects `maxPhotosPerAlbum` — any extras are silently ignored.
  // Replace placeholder strings with real filenames once photos are added.
  albums: [
    {
      cityName: "Florence",
      photoPaths: [
        "assets/florence-01.jpg",
        "assets/florence-02.jpg",
        "assets/florence-03.jpg",
        "assets/florence-04.jpg"
      ]
    },
    {
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
      cityName: "Uppsala",
      photoPaths: [
        "assets/uppsala-01.jpg",
        "assets/uppsala-02.jpg",
        "assets/uppsala-03.jpg"
      ]
    },
    {
      cityName: "Hamburg",
      photoPaths: [
        "assets/hamburg-01.jpg",
        "assets/hamburg-02.jpg",
        "assets/hamburg-03.jpg",
        "assets/hamburg-04.jpg"
      ]
    },
    {
      cityName: "Munich",
      photoPaths: [
        "assets/munich-01.jpg",
        "assets/munich-02.jpg",
        "assets/munich-03.jpg",
        "assets/munich-04.jpg",
        "assets/munich-05.jpg"
      ]
    }
  ],

  // ─── TRANSITIONS ──────────────────────────────────────────────────────────
  // Defines the transition styles between major sections
  transitions: {
    heroToTimeline: "curtainReveal", // Hero sticks, Timeline slides up over it
    galleryToTimeline: "darkSeparator" // Dark spacer div between Gallery and Timeline
  }
};
