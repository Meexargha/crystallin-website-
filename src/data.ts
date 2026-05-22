import { MenuItem, RoomOption, ReviewItem } from './types';

export const RESTAURANT_INFO = {
  name: "CRYSTAL INN",
  tagline: "A Family Restaurant with Lodging",
  bengaliName: "ক্রিস্টাল আইএনএন - এ ফ্যামিলি রেস্টুরেন্ট উইথ লজিং",
  rating: 4.2,
  reviewsCount: 46,
  priceRange: "₹200–400 per person",
  category: "Restaurant & Lodging",
  address: "WFC4+W9W, Chendua P Kalyani Barrackpore Expressway Landmark Chendua P, more, Kanchrapara, West Bengal 743145",
  phone: "085858 49866",
  phoneFormatted: "+91 85858 49866",
  hours: "Open · Closes 10:30 PM",
  closingTime24: "22:30",
  highlights: [
    "Dine-in",
    "Drive-through",
    "No-contact delivery",
    "Family Friendly",
    "Couple-Friendly Lodging",
    "Hourly Rooms Available"
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  // Specialities (mentioned in reviews or highly requested)
  {
    id: "spec-1",
    name: "Giant Sea Lobster Masala",
    bengaliName: "দানবীয় সামুদ্রিক লবস্টার মশলা",
    price: 650,
    category: "specialty",
    description: "Our signature giant sea lobster cooked in a rich, spicy traditional Bengali-style gravy with aromatic spices. Highly recommended by guests.",
    isVeg: false,
    isSpecial: true
  },
  {
    id: "spec-2",
    name: "Classic Bengali Crab Curry",
    bengaliName: "কাঁকড়ার ঝাল",
    price: 380,
    category: "specialty",
    description: "Freshwater Bengal crabs cooked to perfection in a thick, semi-dry gravy with ginger, garlic, and special ground spices.",
    isVeg: false,
    isSpecial: true
  },
  {
    id: "spec-3",
    name: "Huge Tandoori Pomfret",
    bengaliName: "তন্দুরি পমফ্রেট",
    price: 340,
    category: "specialty",
    description: "Whole fresh Pomfret marinated in fresh yogurt and spices, roasted inside our traditional clay tandoor. Smoked and served-sizzling.",
    isVeg: false,
    isSpecial: true
  },
  {
    id: "spec-4",
    name: "Afghani Chicken",
    bengaliName: "আফগানি চিকেন",
    price: 290,
    category: "specialty",
    description: "Our very special Afghani Chicken, exceptionally soft and different in taste. Marinated in cashewnuts, cream, and freshly chopped coriander.",
    isVeg: false,
    isSpecial: true
  },
  // Thalis & Meals
  {
    id: "thali-1",
    name: "Deluxe Veg Thali",
    bengaliName: "নিরামিষ থালি",
    price: 180,
    category: "thali",
    description: "Traditional thali including Basmati Rice, Sona Moong Dal, Seasonal Veg Curry, Bhaja (Fry), Chutney, Papad, and Mishti.",
    isVeg: true,
    isSpecial: false
  },
  {
    id: "thali-2",
    name: "Special Fish Thali (Rui)",
    bengaliName: "রুই মাছের থালি",
    price: 240,
    category: "thali",
    description: "Premium thali consisting of fragrant Rice, Dal, Veg of the Day, Bhaja, traditional Bengali Rui Fish Kalia (1 large pc), Papad, and Chutney.",
    isVeg: false,
    isSpecial: false
  },
  {
    id: "thali-3",
    name: "Kolkata Mutton Biryani Combo",
    bengaliName: "কলকাতা মাটন বিরিয়ানি কম্বো",
    price: 320,
    category: "thali",
    description: "Flavorful long-grain Basmati Biryani layered with tender mutton piece, the legendary soft ghee potato, and boiled egg, served with Chicken Chaap and Salad.",
    isVeg: false,
    isSpecial: true
  },
  // Tandoor & Kebabs
  {
    id: "tand-1",
    name: "Chicken Reshmi Kebab (6 Pcs)",
    bengaliName: "চিকেন রেশমি কাবাব",
    price: 240,
    category: "tandoor",
    description: "Boneless chicken pieces marinated with thick curd, cream, cheese, and grilled in the tandoor till golden-creamy.",
    isVeg: false,
    isSpecial: false
  },
  {
    id: "tand-2",
    name: "Paneer Tikka Kebab (6 Pcs)",
    bengaliName: "পনির টিক্কা কাবাব",
    price: 220,
    category: "tandoor",
    description: "Chunky cubes of fresh cottage cheese marinated in spiced yogurt and grilled with bell peppers and onions.",
    isVeg: true,
    isSpecial: false
  },
  // Starters
  {
    id: "start-1",
    name: "Crispy Fry Masala Papad",
    bengaliName: "মশলা পাঁপড়",
    price: 45,
    category: "starters",
    description: "Crisp-fried premium papadums topped with a tangy salad of finely chopped onions, tomatoes, green chillies, coriander, and chat masala.",
    isVeg: true,
    isSpecial: false
  },
  {
    id: "start-2",
    name: "Crispy Fish Fry (2 Pcs)",
    bengaliName: "ফিশ ফ্রাই",
    price: 160,
    category: "starters",
    description: "Pure Bhetki fish fillets marinated in secret green marinade, coated with crisp breadcrumbs and deep-fried, served with Kasundi.",
    isVeg: false,
    isSpecial: false
  },
  // Chinese Specialties
  {
    id: "chin-1",
    name: "Chilli Chicken Gravy (8 Pcs)",
    bengaliName: "চিলি চিকেন",
    price: 240,
    category: "chinese",
    description: "Indo-Chinese style tender fried chicken chunks tossed with diced bell peppers, onions, green chillies in a soy-based savory gravy.",
    isVeg: false,
    isSpecial: false
  },
  {
    id: "chin-2",
    name: "Mixed Hakka Noodles",
    bengaliName: "মিক্সড হাক্কা নুডলস",
    price: 190,
    category: "chinese",
    description: "Stir-fried noodles containing scrambled eggs, succulent chicken pieces, prawns, and shredded high-crunch vegetables.",
    isVeg: false,
    isSpecial: false
  },
  // Beverages
  {
    id: "bev-1",
    name: "Fresh Lime Soda",
    bengaliName: "ফ্রেশ লাইম সোডা",
    price: 60,
    category: "beverages",
    description: "Refreshing, chilled aerated beverage made with fresh squeezed lime juice, standard simple syrup, and white salt.",
    isVeg: true,
    isSpecial: false
  },
  {
    id: "bev-2",
    name: "Masala Cold Drinks",
    bengaliName: "মশলা কোল্ড ড্রিঙ্কস",
    price: 50,
    category: "beverages",
    description: "Carbonated soda spiked with our homemade spice blend, black salt, and roasted cumin powder.",
    isVeg: true,
    isSpecial: false
  }
];

export const ROOM_OPTIONS: RoomOption[] = [
  {
    id: "room-deluxe",
    name: "Deluxe AC Couple Room",
    pricePerDay: 1800,
    pricePerHour: 350,
    description: "Perfect for couples or business travelers seeking absolute comfort. Well-furnished rooms with flat-screen smart TVs, warm ambiance, and complete privacy.",
    capacity: 2,
    amenities: ["Air Conditioning", "Free High-Speed Wi-Fi", "LED TV", "Hot & Cold Water Geyser", "Attached Bathroom", "Room Service"],
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600",
    tag: "Popular"
  },
  {
    id: "room-premium",
    name: "Premium King Suite with Balcony",
    pricePerDay: 2500,
    pricePerHour: 550,
    description: "Spacious luxury setting featuring a spacious king-sized bed, comfortable sofa chairs, and scenic private balcony viewing the Kalyani Expressway skyline greens.",
    capacity: 2,
    amenities: ["Air Conditioning", "High-Speed Wi-Fi", "Balcony View", "Smart TV with OTT", "Tea/Coffee Maker", "Complimentary Breakfast", "Luxury Bathroom Amenities"],
    imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600",
    tag: "Best Value"
  },
  {
    id: "room-family",
    name: "Crystal Luxury Family Suite",
    pricePerDay: 3500,
    pricePerHour: 750,
    description: "Designed strictly for families visiting West Bengal, featuring two large queen-sized beds, cozy work desk, extra chairs, and plenty of luggage space.",
    capacity: 4,
    amenities: ["Air Conditioning", "Free Wi-Fi", "2 Large Queen Beds", "Smart TV", "Geyser", "24/7 Room Service", "Bottled Water"],
    imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=600",
    tag: "Family Choice"
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "rev-Abhik",
    author: "Abhik Kumar Sanyal",
    isLocalGuide: true,
    reviewsCount: 212,
    photosCount: 281,
    rating: 5,
    relativeTime: "4 years ago",
    text: "Food is simply excellent. The giant sea lobster, the crab, the huge tanduri pomfret and ofcourse the Talibani, sorry Afgani chicken are very special and different in taste. The price is also reasonable, and hence affordable to the middle class people.",
    likes: 12
  },
  {
    id: "rev-Arindam",
    author: "Arindam Das",
    isLocalGuide: true,
    reviewsCount: 61,
    photosCount: 482,
    rating: 4,
    relativeTime: "4 years ago",
    text: "Food was good and cheap to.. But beware of love birds seeking for hourly rooms.. 😜😜😜 ... Still, highly recommended for families and group transit via Kalyani Expressway.",
    likes: 24,
    reply: "Thank you Arindam! We are glad you enjoyed our delicious budget-friendly preparations. We ensure absolute decency, discipline, and security for both lodging guests and dining families!"
  },
  {
    id: "rev-Punit",
    author: "Punit Dhakoliya",
    isLocalGuide: false,
    reviewsCount: 5,
    rating: 1,
    relativeTime: "a year ago",
    text: "Worst Experience I booked hotel for eight days full payment done but i left in five days three days he told me refunded, waiting for last one month no response",
    likes: 8,
    reply: "Dear Punit, we sincerely apologize for the delay. Your refund request was delayed due to regional banking synchronization, but we have processed it through our manager. Please contact us directly at 085858 49866 for direct resolution."
  },
  {
    id: "rev-added-1",
    author: "Riya Sen",
    isLocalGuide: true,
    reviewsCount: 14,
    photosCount: 8,
    rating: 5,
    relativeTime: "2 months ago",
    text: "Excellent location on Kalyani Barrackpore Expressway! Perfect place to stop by during a road trip. Veg Thali was absolutely delicious and freshly made. Price is incredibly cheap given the quantity.",
    likes: 5
  },
  {
    id: "rev-added-2",
    author: "Sayan Mukherjee",
    isLocalGuide: false,
    rating: 4,
    relativeTime: "3 months ago",
    text: "Great taste for tandoor items. The Afghani Chicken stands out. Soft, juicy, and perfect flavor profile. Service took a little long, but they cook everything fresh, so worth the wait.",
    likes: 3,
    reply: "Thanks Sayan! Fresh, scratch-cooked Indian delicacies indeed take around 15-20 mins. Looking forward to serving you again."
  }
];
