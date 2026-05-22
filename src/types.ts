/**
 * Type declarations for Crystal Inn application
 */

export interface MenuItem {
  id: string;
  name: string;
  bengaliName?: string;
  price: number;
  category: 'specialty' | 'tandoor' | 'thali' | 'chinese' | 'beverages' | 'starters';
  description: string;
  isVeg: boolean;
  isSpecial?: boolean;
}

export interface RoomOption {
  id: string;
  name: string;
  pricePerDay: number;
  pricePerHour: number;
  description: string;
  capacity: number;
  amenities: string[];
  imageUrl: string;
  tag?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  isLocalGuide?: boolean;
  reviewsCount?: number;
  photosCount?: number;
  rating: number;
  relativeTime: string;
  text: string;
  likes: number;
  reply?: string;
}

export interface BookingDetails {
  bookingId: string;
  customerName: string;
  email: string;
  phone: string;
  type: 'table' | 'lodging';
  date: string;
  time: string;
  guestsCount: number;
  roomTypeId?: string;
  duration?: number; // hours or days
  durationUnit?: 'hours' | 'days';
  totalAmount: number;
  specialRequests?: string;
  createdAt: string;
  isConfirmed: boolean;
}
