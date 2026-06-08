import bridal1 from "../assets/bridal-1.webp";
import bridal2 from "../assets/bridal-2.webp";
import bridal3 from "../assets/bridal-3.webp";
import bridal4 from "../assets/bridal-4.webp";
import bridal5 from "../assets/bridal-5.webp";
import bridal6 from "../assets/bridal-6.webp";
import bridal7 from "../assets/bridal-7.webp";
import bridal8 from "../assets/bridal-8.webp";
import bridal9 from "../assets/bridal-9.webp";
import bridal10 from "../assets/bridal-10.webp";
import bridal11 from "../assets/bridal-11.webp";
import interior1 from "../assets/interior1.webp";
import interior2 from "../assets/interior2.webp";
import interior3 from "../assets/interior3.webp";
import interior4 from "../assets/interior4.webp";

import type {
  AdminAdvertisement,
  AdminBooking,
  AdminGalleryItem,
  AdminOffer,
  AdminService,
  AdminTestimonial,
} from "./types";

export const workingHours = "10:00 AM - 8:00 PM";

export const appointmentSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
];

export const adminStats = [
  { label: "Total bookings", value: "248" },
  { label: "Customers", value: "186" },
  { label: "Active offers", value: "4" },
  { label: "Gallery images", value: "28" },
  { label: "Upcoming appointments", value: "12" },
];

export const adminBookings: AdminBooking[] = [
  {
    id: "EM-3021",
    name: "Priya Mohanty",
    service: "Royal Bride Package",
    date: "2026-06-09",
    time: "10:00 AM",
    status: "Approved",
    phone: "+91 92300 00011",
  },
  {
    id: "EM-3022",
    name: "Anjali Sahu",
    service: "Party Makeup",
    date: "2026-06-10",
    time: "10:30 AM",
    status: "Pending",
    phone: "+91 92300 00012",
  },
  {
    id: "EM-3023",
    name: "Riya Behera",
    service: "Bridal Makeup",
    date: "2026-06-12",
    time: "11:00 AM",
    status: "Rescheduled",
    phone: "+91 92300 00013",
  },
  {
    id: "EM-3024",
    name: "Sweta Nayak",
    service: "Academy Enquiry",
    date: "2026-06-13",
    time: "9:30 AM",
    status: "Rejected",
    phone: "+91 92300 00014",
  },
];

export const adminTestimonials: AdminTestimonial[] = [
  { name: "Priya Mohanty", rating: 5, service: "Bridal Makeup", status: "Visible" },
  { name: "Sneha Patra", rating: 5, service: "Academy Course", status: "Visible" },
  { name: "Kavya Das", rating: 5, service: "Pre-bridal Package", status: "Draft" },
  { name: "Ananya Nair", rating: 4, service: "Party Makeup", status: "Visible" },
];

export const adminOffers: AdminOffer[] = [
  { name: "Grand Festive Offer", discount: "20% OFF", status: "Active", endsOn: "2026-06-17" },
  { name: "Premium Saver", discount: "Rs. 500 OFF", status: "Active", endsOn: "2026-06-30" },
  { name: "Academy Scholarship", discount: "15% OFF", status: "Scheduled", endsOn: "2026-07-15" },
  { name: "Summer Special", discount: "₹1000 OFF", status: "Expired", endsOn: "2026-05-31" },
];

export const adminAdvertisements: AdminAdvertisement[] = [
  {
    name: "Wedding Season Poster",
    format: "Poster",
    status: "Active",
    dateRange: "2026-06-01 to 2026-06-15",
  },
  {
    name: "Festival Banner",
    format: "Banner",
    status: "Paused",
    dateRange: "2026-06-18 to 2026-06-30",
  },
  {
    name: "Academy Promotion",
    format: "Poster",
    status: "Active",
    dateRange: "2026-06-10 to 2026-07-10",
  },
];

export const adminGallery: AdminGalleryItem[] = [
  { name: "Regal bride portrait", category: "Bridal", source: bridal1 },
  { name: "Soft glam bridal look", category: "Bridal", source: bridal2 },
  { name: "Bride in red veil", category: "Bridal", source: bridal5 },
  { name: "Pink bridal look", category: "Bridal", source: bridal3 },
  { name: "Elegant bridal side profile", category: "Bridal", source: bridal6 },
  { name: "Classic bridal look with jewelry", category: "Bridal", source: bridal7 },
  { name: "Soft glam bridal portrait", category: "Bridal", source: bridal8 },
  { name: "Bridal look with warm tones", category: "Bridal", source: bridal9 },
  { name: "Premium bridal makeup finish", category: "Bridal", source: bridal10 },
  { name: "Luxury bridal close-up portrait", category: "Bridal", source: bridal11 },
  { name: "Bridal eye makeup close up", category: "Before & After", source: bridal4 },
  { name: "Studio interior", category: "Parlour", source: interior1 },
  { name: "Elegant salon lounge", category: "Parlour", source: interior2 },
  { name: "Premium salon setup", category: "Parlour", source: interior3 },
  { name: "Academy class", category: "Academy", source: interior4 },
];

export const adminServices: AdminService[] = [
  { name: "Threading", category: "Parlour", price: "Rs. 50 - Rs. 200", duration: "15 min" },
  {
    name: "Hair Cutting",
    category: "Parlour",
    price: "Rs. 100 - Rs. 400",
    duration: "30 - 60 min",
  },
  { name: "Facial", category: "Parlour", price: "Rs. 500 - Rs. 3,000", duration: "45 - 90 min" },
  {
    name: "Party Makeup",
    category: "Parlour",
    price: "Rs. 2,500",
    duration: "60 min",
    featured: true,
  },
  {
    name: "Royal Bride",
    category: "Bridal",
    price: "Rs. 8,000",
    duration: "3 - 4 hrs",
    featured: true,
  },
  { name: "Academy Course", category: "Academy", price: "On request", duration: "1 - 6 months" },
];
