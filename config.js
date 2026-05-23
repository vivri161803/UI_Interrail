// config.js - Centralized configuration file for the Interrail Travel Journal

export const travelData = {
  // Website details
  meta: {
    title: "Interrail 2026",
    subtitle: "Exploring the cold nights & bright railtracks of Northern Europe"
  },

  // Chronological stations in the S-Curve timeline
  stations: [
    // Outgoing Trip (Descends on the Left side of the screen)
    {
      id: "firenze",
      city: "Florence",
      country: "Italy",
      date: "August 1 - 2, 2026",
      accommodation: "Ostello Bello Firenze",
      notes: "The departure point. Packed bags, passport checked, train ticket validated. Ready for the long journey north.",
      type: "outgoing", // left-aligned track
      image: "assets/placeholder-florence.jpg"
    },
    {
      id: "copenhagen",
      city: "Copenhagen",
      country: "Denmark",
      date: "August 4 - 6, 2026",
      accommodation: "Steel House Copenhagen",
      notes: "Arrived after a scenic trans-European train connection. rented cargo bikes, explored Nyhavn, and enjoyed cardamom buns.",
      type: "outgoing",
      image: "assets/placeholder-copenhagen.jpg"
    },
    {
      id: "stockholm",
      city: "Stockholm",
      country: "Sweden",
      date: "August 7 - 10, 2026",
      accommodation: "Generator Stockholm",
      notes: "Ferry rides across the archipelago, visited the Vasa Museum, walked the narrow streets of Gamla Stan. Cold breeze at sunset.",
      type: "outgoing",
      image: "assets/placeholder-stockholm.jpg"
    },
    {
      id: "uppsala",
      city: "Uppsala",
      country: "Sweden",
      date: "August 11 - 12, 2026",
      accommodation: "CityStay Uppsala",
      notes: "The northernmost point of the route. Visited the cathedral and university gardens. Beautiful, quiet college town vibe. This is the U-Turn station where we head back south.",
      type: "u-turn", // U-turn transition station
      image: "assets/placeholder-uppsala.jpg"
    },
    // Return Trip (Descends on the Right side of the screen)
    {
      id: "hamburg",
      city: "Hamburg",
      country: "Germany",
      date: "August 14 - 15, 2026",
      accommodation: "Superbude Altona",
      notes: "Speicherstadt brick warehouses looked amazing at twilight. Visited Miniatur Wunderland. Great harbor vibes.",
      type: "return", // right-aligned track
      image: "assets/placeholder-hamburg.jpg"
    },
    {
      id: "munich",
      city: "Munich",
      country: "Germany",
      date: "August 17 - 19, 2026",
      accommodation: "Wombat's City Hostel",
      notes: "Walked around Marienplatz, relaxed in the Englischer Garten, watched surfers on the Eisbachwelle wave.",
      type: "return",
      image: "assets/placeholder-munich.jpg"
    },
    {
      id: "firenze-return",
      city: "Florence",
      country: "Italy",
      date: "August 21, 2026",
      accommodation: "Home Sweet Home",
      notes: "End of the loop. Exhausted but full of memories, rail tickets, and photos from across Europe.",
      type: "return",
      image: "assets/placeholder-return.jpg"
    }
  ],

  // Packing list items
  packingList: [
    {
      category: "Essentials",
      items: [
        { id: "pass", name: "Interrail Pass / App", checked: false },
        { id: "passport", name: "Passport & ID cards", checked: false },
        { id: "cash", name: "Euros & Swedish Krona", checked: false },
        { id: "res", name: "Seat Reservation PDFs", checked: false }
      ]
    },
    {
      category: "Tech & Gear",
      items: [
        { id: "powerbank", name: "20,000mAh Powerbank", checked: false },
        { id: "charger", name: "Multi-port USB-C plug", checked: false },
        { id: "adapters", name: "Travel plug adapter", checked: false },
        { id: "headphones", name: "ANC Headphones (for trains)", checked: false }
      ]
    },
    {
      category: "Clothing",
      items: [
        { id: "jacket", name: "Light windbreaker jacket", checked: false },
        { id: "raincoat", name: "Rain jacket/poncho", checked: false },
        { id: "shoes", name: "Comfy walking sneakers", checked: false },
        { id: "layers", name: "Warm layers for Nordic nights", checked: false }
      ]
    },
    {
      category: "Toiletries & Meds",
      items: [
        { id: "towel", name: "Microfiber quick-dry towel", checked: false },
        { id: "shampoo", name: "Solid soap/shampoo bars", checked: false },
        { id: "earplugs", name: "Earplugs & sleep mask (hostels!)", checked: false },
        { id: "kit", name: "First-aid basic kit", checked: false }
      ]
    }
  ],

  // Gallery images & stories
  gallery: [
    {
      id: "train-view",
      title: "Window seat views",
      description: "Hours spent looking at changing landscapes from Denmark to Sweden."
    },
    {
      id: "gamla-stan",
      title: "Gamla Stan alleys",
      description: "Sunset colors on historical buildings in the heart of Stockholm."
    },
    {
      id: "nyhavn",
      title: "Nyhavn canals",
      description: "Bright colored facades and old wooden ships in Copenhagen."
    },
    {
      id: "hamburg-harbor",
      title: "Hamburg Elbphilharmonie",
      description: "Modern architecture meeting the historic industrial port."
    },
    {
      id: "hostel-life",
      title: "Late night card games",
      description: "Meeting fellow backpackers from all around the world in common rooms."
    },
    {
      id: "scandinavian-forests",
      title: "Swedish pine forests",
      description: "Endless green fields and lakes passing by the train windows."
    }
  ]
};
