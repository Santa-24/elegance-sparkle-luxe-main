export type AdminBooking = {
  id: string;
  name: string;
  service: string;
  date: string;
  time: string;
  status: "Pending" | "Approved" | "Rejected" | "Rescheduled" | "Completed" | "Cancelled";
  phone: string;
};

export type AdminService = {
  name: string;
  category: "Bridal" | "Parlour" | "Academy";
  price: string;
  duration: string;
  featured?: boolean;
};

export type AdminGalleryItem = {
  name: string;
  category: "Bridal" | "Parlour" | "Before & After" | "Academy";
  source: string;
};

export type AdminTestimonial = {
  name: string;
  rating: number;
  service: string;
  status: "Visible" | "Draft";
};

export type AdminOffer = {
  name: string;
  discount: string;
  status: "Active" | "Scheduled" | "Expired";
  endsOn: string;
};

export type AdminAdvertisement = {
  name: string;
  format: "Poster" | "Banner";
  status: "Active" | "Paused";
  dateRange: string;
};
