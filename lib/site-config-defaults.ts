import type { SiteConfig } from "@/lib/site-config-schema";

export const defaultSiteConfig: SiteConfig = {
  couple: {
    partner1: "Alex",
    partner2: "Jordan",
    displayNames: "Alex & Jordan",
  },
  wedding: {
    dateIso: "2026-09-12T16:00:00",
    dateDisplay: "Saturday, September 12, 2026",
    timeDisplay: "4:00 PM",
    tagline:
      "Together with their families, invite you to celebrate their wedding",
  },
  rsvp: {
    deadline: "Please respond by August 1, 2026",
    maxGuests: 5,
  },
  story: {
    title: "Sponsors",
    paragraphs: [
      "We met on a rainy afternoon in a small coffee shop downtown — Alex was reading, Jordan was sketching, and somehow we ended up sharing a table and a conversation that never really ended.",
      "Years later, we're ready to say yes to forever. We can't wait to celebrate this next chapter with the people we love most.",
    ],
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    imageAlt: "The couple",
  },
  schedule: [
    {
      time: "3:30 PM",
      title: "Guest arrival",
      description: "Welcome drinks on the lawn",
    },
    {
      time: "4:00 PM",
      title: "Ceremony",
      description: "Garden terrace",
    },
    {
      time: "5:00 PM",
      title: "Cocktail hour",
      description: "Light bites and music",
    },
    {
      time: "6:30 PM",
      title: "Reception & dinner",
      description: "Dancing to follow",
    },
  ],
  details: {
    dressCode:
      "Garden formal — think soft colors and comfortable shoes for the lawn.",
    motifTitle: "Our Colors",
    motifColors: ["#7a8fa3", "#5c6f82", "#ebe4d8", "#f5f0e8", "#faf8f5"],
  },
  venues: [
    {
      label: "Ceremony",
      name: "St. Mary's Chapel",
      address: "456 Chapel Road, Sonoma, CA 95476",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.0!2d-122.45!3d38.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDE3JzI0LjAiTiAxMjLCsDI3JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1",
      mapsLink: "https://maps.google.com/?q=456+Chapel+Road+Sonoma+CA",
    },
    {
      label: "Reception",
      name: "Willow Creek Estate",
      address: "123 Meadow Lane, Sonoma, CA 95476",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.0!2d-122.45!3d38.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDE3JzI0LjAiTiAxMjLCsDI3JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1",
      mapsLink: "https://maps.google.com/?q=123+Meadow+Lane+Sonoma+CA",
    },
  ],
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80",
      alt: "Engagement photo 1",
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
      alt: "Engagement photo 2",
    },
    {
      src: "https://images.unsplash.com/photo-1465496635288-fc185cba81cb?w=600&q=80",
      alt: "Engagement photo 3",
    },
    {
      src: "https://images.unsplash.com/photo-1522673607200-836d12b0c201?w=600&q=80",
      alt: "Engagement photo 4",
    },
    {
      src: "https://images.unsplash.com/photo-1529636798458-92174e477ded?w=600&q=80",
      alt: "Engagement photo 5",
    },
    {
      src: "https://images.unsplash.com/photo-1469371670803-766ccf145fc2?w=600&q=80",
      alt: "Engagement photo 6",
    },
  ],
  faq: [
    {
      question: "Can I bring a plus-one?",
      answer:
        "Your invitation indicates the number of seats reserved for you. If you have questions, please reach out to us directly.",
    },
    {
      question: "Are children welcome?",
      answer:
        "We love your little ones, but we've planned an adults-only celebration. Thank you for understanding.",
    },
    {
      question: "Where should I park?",
      answer:
        "Complimentary parking is available on-site. Follow signs to the guest lot upon arrival.",
    },
    {
      question: "Is there a gift registry?",
      answer:
        "Your presence is the greatest gift. If you wish to honor us further, a card box will be at the reception.",
    },
  ],
  contact: {
    email: "hello@alexandjordan.com",
  },
  music: {
    src: "/audio/wedding.mp3",
    enabled: true,
  },
  theme: {
    sand: "#f5f0e8",
    beige: "#ebe4d8",
    cream: "#faf8f5",
    dusty: "#7a8fa3",
    dustyDark: "#5c6f82",
    ink: "#3d3832",
    inkMuted: "#6b6560",
  },
  nav: [
    { label: "Home", href: "#hero" },
    { label: "Sponsors", href: "#story" },
    { label: "Details", href: "#details" },
    { label: "Venues", href: "#venue" },
    { label: "Gallery", href: "#gallery" },
    { label: "FAQ", href: "#faq" },
    { label: "RSVP", href: "#rsvp" },
  ],
};
