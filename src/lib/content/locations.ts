export type LocationArea = {
  slug: string;
  name: string;
  district: string;
  title: string;
  metaDescription: string;
  h1: string;
  quickAnswer: string;
  distanceFromStudio: string;
  travelTime: string;
  travelPolicy: string;
  landmarkContext: string;
  venueContext: string;
  highlights: string[];
  servicesOffered: Array<{ name: string; price: string; description?: string; desc?: string }>;
  faqs: Array<{ question: string; answer: string }>;
  nearbyAreas: Array<{ name: string; slug: string; distance: string }>;
  geoCoordinates: { latitude: number; longitude: number };
  mapQuery: string;
  editorialContent: {
    overview: string;
    whyChooseUs: string;
    bridalStylingDetails: string;
    bookingAdvice: string;
  };
};

export const locationsData: Record<string, LocationArea> = {
  "jajpur-road": {
    slug: "jajpur-road",
    name: "Jajpur Road",
    district: "Jajpur, Odisha",
    title: "Bridal Makeup Artist in Jajpur Road | Elegance Makeover",
    metaDescription:
      "Looking for the best bridal makeup artist in Jajpur Road? Certified HD & airbrush bridal makeovers, pre-bridal salon care & academy by Rasmirekha Swain.",
    h1: "Bridal Makeup Artist in Jajpur Road",
    quickAnswer:
      "Elegance Makeover & Academy in Jajpur Road is the area's premier bridal makeup studio led by master artist Rasmirekha Swain. Located centrally in Jajpur Road (Vyasanagar), the studio offers international-grade HD and airbrush bridal makeup, saree draping, hairstyling, and pre-bridal packages starting from ₹6,000.",
    distanceFromStudio: "0 km (Main Studio Location)",
    travelTime: "Walk-in & In-Studio Sessions",
    travelPolicy:
      "Full in-studio luxury suites available with dedicated bridal trial and dressing rooms. On-location venue visits within Jajpur Road are available upon advance reservation for weddings and receptions.",
    landmarkContext:
      "Centrally situated near the Jajpur Keonjhar Road Railway Station corridor and Vyasanagar commercial marketplace, easily accessible from Chorda and station road.",
    venueContext:
      "We regularly style brides hosting weddings at popular Jajpur Road venues including local Kalyan Mandaps, hotel banquet halls, and private family residences across town.",
    highlights: [
      "Headquarters studio with complete bridal dressing and private changing suites",
      "Trial sessions available with master artist Rasmirekha Swain",
      "Specialist in authentic Odia bridal styling: Mukuta placement, Chandan bindi, and Alta",
      "Walk-in consultation friendly with parking and changing amenities",
    ],
    servicesOffered: [
      {
        name: "HD Bridal Makeup",
        price: "₹6,000 - ₹12,000",
        desc: "Complete bridal transformation including camera-ready HD base, luxury lashes, bespoke hair styling, and traditional saree/lehenga draping.",
      },
      {
        name: "Airbrush Bridal Makeup",
        price: "₹9,000 - ₹15,000",
        desc: "Sweat-resistant, 18-hour waterproof micro-mist airbrush finish ideal for hot, humid wedding days and high-definition wedding videography.",
      },
      {
        name: "Party & Reception Makeup",
        price: "₹2,500",
        desc: "Sophisticated glam for wedding receptions, sangeet nights, ring ceremonies, and bridesmaids.",
      },
      {
        name: "Pre-Bridal Glow Hydra Facial",
        price: "₹1,500 - ₹3,500",
        desc: "Clinical deep cleansing, gentle chemical exfoliation, and hydration infusion for spotless bridal glow.",
      },
    ],
    faqs: [
      {
        question: "Where is Elegance Makeover studio located in Jajpur Road?",
        answer:
          "Our flagship studio is conveniently located in the heart of Jajpur Road (Vyasanagar), Odisha 755019, close to the railway station and market center. Direct WhatsApp support and Google Maps navigation are available.",
      },
      {
        question: "How much does bridal makeup cost in Jajpur Road?",
        answer:
          "Bridal makeup packages at Elegance Makeover start from ₹6,000 for standard HD bridal makeup up to ₹12,000 - ₹15,000 for luxury HD Airbrush bridal packages with hair styling, lashes, and draping included.",
      },
      {
        question: "Do you travel to wedding venues in Jajpur Road for bridal makeup?",
        answer:
          "Yes. While many brides prefer the air-conditioned comfort and ring lights of our luxury private dressing suite, our senior artist team also travels to hotels, mandaps, and homes across Jajpur Road on wedding day.",
      },
      {
        question: "How early should I book my bridal date at Jajpur Road?",
        answer:
          "During the peak wedding season in Odisha (November to March, and April/May lagna dates), we strongly recommend booking 4 to 12 weeks in advance to secure your preferred morning or evening muhurat slot.",
      },
      {
        question: "Can family members get makeup done alongside the bride?",
        answer:
          "Yes. We offer coordinated family and bridesmaid packages for mothers, sisters, and close relatives, scheduled seamlessly with the bride's timeline.",
      },
    ],
    nearbyAreas: [
      { name: "Vyasanagar", slug: "vyasanagar", distance: "Adjacent (Twin City)" },
      { name: "Danagadi", slug: "danagadi", distance: "12 km" },
      { name: "Kalinganagar", slug: "kalinganagar", distance: "14 km" },
      { name: "Panikoili", slug: "panikoili", distance: "18 km" },
    ],
    geoCoordinates: { latitude: 20.9507, longitude: 86.1378 },
    mapQuery: "Elegance+Makeover+%26+Academy+Jajpur+Road+Odisha",
    editorialContent: {
      overview:
        "Jajpur Road (also known as Vyasanagar) is the economic and commercial hub of Jajpur district. For brides seeking bridal makeup that remains fresh, radiant, and tear-proof throughout long ceremonial rituals, Elegance Makeover & Academy provides an elite, stress-free beauty experience. Under the direct artistry of founder Rasmirekha Swain, every bride receives personalized skin prep, precision color matching, and bespoke styling honoring both tradition and modern glamour.",
      whyChooseUs:
        "Unlike generic salons where multiple clients are hurried through, Elegance Makeover maintains dedicated bridal appointment slots. We use only authentic international cosmetic brands (MAC, Huda Beauty, NARS, Estée Lauder, Kryolan) suited for Indian skin tones and warm Odisha climates. Our bridal suites offer uninterrupted privacy for brides, their mothers, and wedding photographers.",
      bridalStylingDetails:
        "Odia weddings are rich in sacred traditions. From the precision placement of the Mukuta (bridal crown) and the delicate hand-painted Chandan designs along the brow line, to the intricate draping of Khandua pata or Sambalpuri silk sarees, our team handles every element with meticulous cultural respect and artistic finesse.",
      bookingAdvice:
        "To guarantee your preferred timing, contact us via phone or WhatsApp as soon as your wedding lagna or reception date is finalized. We provide complimentary pre-booking phone consultations to discuss your outfits, jewelry, skin concerns, and look preferences.",
    },
  },

  vyasanagar: {
    slug: "vyasanagar",
    name: "Vyasanagar",
    district: "Jajpur, Odisha",
    title: "Bridal Makeup Artist in Vyasanagar | Elegance Makeover",
    metaDescription:
      "Top bridal makeup artist in Vyasanagar, Odisha. Premium HD bridal makeup, airbrush wedding styling, pre-bridal facials & beauty academy by Rasmirekha Swain.",
    h1: "Bridal Makeup Artist in Vyasanagar",
    quickAnswer:
      "For brides in Vyasanagar municipality seeking luxury wedding day styling, Elegance Makeover & Academy offers internationally certified bridal makeup artistry. Located directly within the municipality boundaries, our studio specializes in long-lasting HD makeup, flawless airbrushing, and complete Odia bridal draping.",
    distanceFromStudio: "0 km (Within Municipality)",
    travelTime: "5 - 10 minutes",
    travelPolicy:
      "Both in-studio appointments and on-venue bridal services are provided across all Vyasanagar municipal wards and residential colonies.",
    landmarkContext:
      "Serving all Vyasanagar municipal wards, Chorda, Sobra, Madhusudan Nagar, and the railway colony sectors.",
    venueContext:
      "Frequent on-site bridal bookings at community centers, local wedding mandaps, and family homes throughout Vyasanagar.",
    highlights: [
      "Immediate local accessibility for brides across all Vyasanagar municipal sectors",
      "Air-conditioned private bridal vanity lounge",
      "Personalized makeup consultations for wedding, engagement, and reception",
      "Experienced with high-humidity coastal and semi-coastal weather conditions",
    ],
    servicesOffered: [
      {
        name: "Vyasanagar Signature Bridal Package",
        price: "₹6,000 - ₹12,000",
        desc: "Full HD makeup base, customized eye look, luxury mink lashes, traditional jewelry setting, and precision saree pleating.",
      },
      {
        name: "Airbrush HD Wedding Finish",
        price: "₹9,000 - ₹15,000",
        desc: "Ultra-fine airbrush application creating a weightless, transfer-proof finish that withstands long rituals and high humidity.",
      },
      {
        name: "Engagement & Ring Ceremony Look",
        price: "₹3,500 - ₹5,000",
        desc: "Modern soft-glam styling curated for ring exchanges, pastel lehengas, and evening cocktail celebrations.",
      },
      {
        name: "Bridal Skin Radiance Treatments",
        price: "₹1,500 - ₹3,500",
        desc: "Hydra-dermabrasion and deep nutrient facials scheduled 3 to 7 days before your ceremony.",
      },
    ],
    faqs: [
      {
        question: "Is Elegance Makeover accessible from all parts of Vyasanagar?",
        answer:
          "Yes. Our studio is located right within Vyasanagar municipality, just minutes from Chorda bypass, station road, and local residential sectors.",
      },
      {
        question: "What products are used for bridal makeup in Vyasanagar?",
        answer:
          "We use only genuine high-definition cosmetics from MAC, Huda Beauty, Anastasia Beverly Hills, Kryolan, and Estée Lauder, verified for safety and longevity on sensitive skin.",
      },
      {
        question: "Can I book a trial bridal session in Vyasanagar?",
        answer:
          "Yes, bridal consultation and trial appointments can be scheduled on weekdays so you can test color palettes, lip shades, and hairstyle concepts beforehand.",
      },
      {
        question: "How long does bridal makeup take on the wedding day?",
        answer:
          "A comprehensive bridal appointment typically takes 2.5 to 3 hours, ensuring careful skin preparation, foundation blending, eye design, hairstyle construction, and draping without rushing.",
      },
    ],
    nearbyAreas: [
      { name: "Jajpur Road", slug: "jajpur-road", distance: "0 km (Core Hub)" },
      { name: "Danagadi", slug: "danagadi", distance: "12 km" },
      { name: "Kalinganagar", slug: "kalinganagar", distance: "14 km" },
      { name: "Panikoili", slug: "panikoili", distance: "18 km" },
    ],
    geoCoordinates: { latitude: 20.9507, longitude: 86.1378 },
    mapQuery: "Elegance+Makeover+Vyasanagar+Jajpur+Road",
    editorialContent: {
      overview:
        "Vyasanagar municipality represents a thriving, cosmopolitan center where modern bridal preferences seamlessly blend with traditional Odia heritage. Brides here demand camera-ready glam that looks natural in person and striking under 4K video lenses. Elegance Makeover & Academy delivers exact artistry tailored to each bride's facial structure, outfit palette, and wedding setting.",
      whyChooseUs:
        "With over a decade of hands-on experience styling hundreds of brides in Vyasanagar, Rasmirekha Swain understands the nuances of local lighting, ritual timings, and humidity. We never cut corners with cheap base products; every layer is selected to lock in moisture while preventing oiliness throughout the long wedding ceremony.",
      bridalStylingDetails:
        "Our artists excel at coordinating the full bridal ensemble: harmonizing heavy gold or temple jewelry with secure hair padding, positioning the traditional Odia Mukuta with stability, and creating artistic Chandan dot art tailored to classical bridal aesthetics.",
      bookingAdvice:
        "We advise reserving your wedding and reception slots simultaneously to ensure schedule continuity. Advance booking guarantees that your date is exclusively held on our calendar.",
    },
  },

  "jajpur-town": {
    slug: "jajpur-town",
    name: "Jajpur Town",
    district: "Jajpur, Odisha",
    title: "Bridal Makeup Artist in Jajpur Town | Elegance Makeover",
    metaDescription:
      "Expert bridal makeup artist serving Jajpur Town (Biraja Kshetra). Luxury HD bridal makeup, authentic Odia bride styling, on-venue travel by Rasmirekha Swain.",
    h1: "Bridal Makeup Artist in Jajpur Town",
    quickAnswer:
      "Brides in historic Jajpur Town (Biraja Kshetra) trust Elegance Makeover & Academy for luxury bridal and reception makeup. Located approximately 30 km from Jajpur Town via SH-11, our master bridal team provides both in-studio VIP dressing and on-venue makeup artist travel directly to mandaps and ancestral homes in Jajpur Town.",
    distanceFromStudio: "30 km via SH-11",
    travelTime: "40 - 50 minutes by road",
    travelPolicy:
      "On-venue bridal travel service is available across Jajpur Town for weddings, receptions, and multi-event functions. Artists arrive equipped with portable professional ring lights, vanity organizers, and sanitized kits.",
    landmarkContext:
      "Serving all areas around Maa Biraja Temple, Vaitarani river ghats, Kusuma pond, and local administrative sectors.",
    venueContext:
      "We cater to destination and local weddings hosted at prominent Jajpur Town Kalyan Mandaps, heritage family homes, and temple wedding pavilions.",
    highlights: [
      "Frequent on-venue wedding service to Jajpur Town with dedicated bridal assistance",
      "Expertise in traditional Odia Biraja Kshetra cultural wedding customs",
      "Full portable bridal makeup setup with high-CRI lighting for on-location mandap rooms",
      "Pre-bridal salon packages available at our central Jajpur Road studio",
    ],
    servicesOffered: [
      {
        name: "Jajpur Town Bridal On-Venue Package",
        price: "₹8,000 - ₹15,000",
        desc: "Complete artist travel to your mandap or home in Jajpur Town with full HD bridal makeup, luxury lashes, and traditional temple jewelry setting.",
      },
      {
        name: "Traditional Odia Wedding Look",
        price: "₹6,000 - ₹12,000",
        desc: "Classic bridal elegance highlighting red-and-gold silk sarees, Mukuta placement, fine Chandan bindi work, and long-wear glowing skin.",
      },
      {
        name: "Reception & Engagement Glam",
        price: "₹3,500 - ₹6,000",
        desc: "Contemporary evening makeup styling with soft smoky eyes, sculpted contouring, and modern hairstyles for Jajpur Town receptions.",
      },
      {
        name: "Bridal Party & Siders Combo",
        price: "Custom Package",
        desc: "Coordinated hair and makeup styling for mothers, sisters, and bridesmaids attending the wedding in Jajpur Town.",
      },
    ],
    faqs: [
      {
        question: "Does Elegance Makeover travel to Jajpur Town for bridal makeup?",
        answer:
          "Yes, we frequently travel to Jajpur Town (approx. 40 minutes via SH-11). Our team brings all necessary vanity kits, lighting, and hair styling equipment directly to your home or wedding venue.",
      },
      {
        question: "Is there an additional travel fee for Jajpur Town weddings?",
        answer:
          "A nominal travel conveyance charge covers round-trip vehicle transit between Jajpur Road and Jajpur Town, keeping rates transparent with no hidden costs.",
      },
      {
        question: "Can brides from Jajpur Town visit the Jajpur Road studio instead?",
        answer:
          "Yes, many brides prefer to get ready in our air-conditioned luxury bridal suite in Jajpur Road before heading to their wedding venue in Jajpur Town.",
      },
      {
        question: "What bridal styles are most popular for Jajpur Town weddings?",
        answer:
          "Traditional red and maroon Banarasi or Sambalpuri silk looks with intricate Mukuta headpieces and sweat-resistant HD airbrush makeup are the most requested styles by Jajpur Town brides.",
      },
    ],
    nearbyAreas: [
      { name: "Jajpur Road", slug: "jajpur-road", distance: "30 km" },
      { name: "Panikoili", slug: "panikoili", distance: "14 km" },
      { name: "Kuakhia", slug: "kuakhia", distance: "22 km" },
      { name: "Bhadrak", slug: "bhadrak", distance: "38 km" },
    ],
    geoCoordinates: { latitude: 20.8497, longitude: 86.3377 },
    mapQuery: "Jajpur+Town+Odisha",
    editorialContent: {
      overview:
        "Jajpur Town, revered as Biraja Kshetra, is one of the most culturally significant spiritual centers of Odisha. Weddings here are deeply steeped in sacred Vedic rites, traditional customs, and close-knit family celebrations. For brides preparing for their nuptials in Jajpur Town, having a seasoned bridal artist who understands both religious ceremonial requirements and modern cosmetic science is essential.",
      whyChooseUs:
        "Rasmirekha Swain has styled dozens of radiant brides across Jajpur Town. Our signature approach ensures your bridal makeup looks magnificent in natural daylight during afternoon rituals, under warm temple lamps, and before intense flash photography at evening receptions.",
      bridalStylingDetails:
        "From placing sacred sindoor without staining the forehead base to securely fastening heavy traditional ornamanets (such as Matha Patti, Nath, and Kanachapa), our team ensures every jewel stays firmly in place throughout hours of traditional ceremonies.",
      bookingAdvice:
        "For on-location travel to Jajpur Town, we suggest booking at least 1 to 2 months ahead so our mobile artist vehicle and scheduling can be locked in for your specific wedding lagna time.",
    },
  },

  danagadi: {
    slug: "danagadi",
    name: "Danagadi",
    district: "Jajpur, Odisha",
    title: "Bridal Makeup Artist in Danagadi | Elegance Makeover",
    metaDescription:
      "Bridal makeup artist for Danagadi & Kalinganagar industrial corridor. HD bridal makeup, bridal skincare, party makeup & academy near Danagadi by Rasmirekha.",
    h1: "Bridal Makeup Artist in Danagadi",
    quickAnswer:
      "Danagadi brides and corporate families in the Kalinganagar industrial zone choose Elegance Makeover & Academy for luxury wedding day beauty. Situated just 12 km from Danagadi, our studio is the closest premium bridal salon offering certified HD makeup, hydra facials, and wedding artist home visits.",
    distanceFromStudio: "12 km via Danagadi Road",
    travelTime: "18 - 25 minutes by road",
    travelPolicy:
      "Direct artist travel to Danagadi residences, township quarters, and marriage halls is readily available with minimal travel notice.",
    landmarkContext:
      "Serving Danagadi market, industrial township quarters, Duburi junction, and surrounding steel plant residential sectors.",
    venueContext:
      "Convenient for brides hosting weddings in Danagadi community halls, local mandaps, and township guest houses.",
    highlights: [
      "Quick 20-minute accessibility to our central studio in Jajpur Road",
      "Specialist services for steel township and industrial belt families",
      "Transfer-proof, pollution-resistant and sweatproof makeup formulations",
      "Flexible early morning and late evening wedding slots",
    ],
    servicesOffered: [
      {
        name: "Danagadi Bridal HD Transformation",
        price: "₹6,000 - ₹12,000",
        desc: "Complete luxury bridal makeover with skin prep, HD camera foundation, bespoke eyes, lashes, hair bun styling, and draping.",
      },
      {
        name: "Township Reception & Party Glam",
        price: "₹2,500 - ₹4,500",
        desc: "Modern party styling for reception galas, corporate family celebrations, and engagement dinners.",
      },
      {
        name: "Pollution Defense Pre-Bridal Skin Cleanup",
        price: "₹1,500 - ₹3,000",
        desc: "Deep pore ultrasonic extraction and detoxifying facial treatments tailored for industrial zone skin conditions.",
      },
      {
        name: "Academy Enrollment for Danagadi Youths",
        price: "₹15,000 - ₹45,000",
        desc: "Professional cosmetology and bridal artistry certification with daily hands-on practice near Danagadi.",
      },
    ],
    faqs: [
      {
        question: "How far is Elegance Makeover studio from Danagadi?",
        answer:
          "Our salon is located just 12 km from Danagadi in Jajpur Road, taking roughly 20 minutes by auto or private vehicle along the direct road.",
      },
      {
        question: "Can Danagadi brides get on-venue makeup service?",
        answer:
          "Yes. Our senior makeup artists travel directly to Danagadi homes, company quarters, and wedding halls with complete portable styling equipment.",
      },
      {
        question: "How does your makeup handle local dust and humidity in Danagadi?",
        answer:
          "We use professional barrier primers, setting powders, and humidity-resistant setting sprays from Kryolan, MAC, and Huda Beauty to ensure your makeup remains completely pristine and matte.",
      },
    ],
    nearbyAreas: [
      { name: "Jajpur Road", slug: "jajpur-road", distance: "12 km" },
      { name: "Kalinganagar", slug: "kalinganagar", distance: "6 km" },
      { name: "Vyasanagar", slug: "vyasanagar", distance: "12 km" },
      { name: "Panikoili", slug: "panikoili", distance: "20 km" },
    ],
    geoCoordinates: { latitude: 20.9856, longitude: 86.0754 },
    mapQuery: "Danagadi+Jajpur+Odisha",
    editorialContent: {
      overview:
        "Danagadi is a vital hub bridging the agricultural traditions of Jajpur with the industrial growth of Kalinganagar. Families living in Danagadi need bridal and parlour services that combine contemporary trends with traditional Odia wedding customs. Elegance Makeover & Academy provides exactly that balance, delivering world-class bridal artistry right on their doorstep.",
      whyChooseUs:
        "Being located so close in Jajpur Road, our team can reach Danagadi rapidly for morning wedding muhurats or evening receptions without exhausting travel delays. We customize skin prep to counteract local environmental factors, ensuring radiant bridal skin that glows under every camera flash.",
      bridalStylingDetails:
        "Whether you are planning an authentic Sambalpuri or Kanjeevaram saree drape or a heavy embroidered designer bridal lehenga, our experienced drapers ensure comfortable, movement-friendly draping that stays perfectly pleated throughout the ceremony.",
      bookingAdvice:
        "Many Danagadi brides combine their pre-bridal skin sessions at our salon with on-venue makeup for their actual wedding day. Book your appointment bundle early for maximum savings.",
    },
  },

  kalinganagar: {
    slug: "kalinganagar",
    name: "Kalinganagar",
    district: "Jajpur, Odisha",
    title: "Bridal Makeup Artist in Kalinganagar | Elegance Makeover",
    metaDescription:
      "Premier bridal makeup artist for Kalinganagar Tata Steel township & industrial zone. HD airbrush bridal makeup, pre-bridal salon care by Rasmirekha Swain.",
    h1: "Bridal Makeup Artist in Kalinganagar",
    quickAnswer:
      "For corporate families and residents in Kalinganagar (Tata Steel City and industrial area), Elegance Makeover & Academy offers premier bridal makeup and luxury salon services. Located only 14 km away in Jajpur Road, our artists provide executive-grade bridal transformations, on-site township service, and modern party makeup.",
    distanceFromStudio: "14 km via Kalinganagar Main Road",
    travelTime: "20 - 25 minutes by road",
    travelPolicy:
      "We provide on-site bridal services inside Kalinganagar residential townships, Tata Steel complex quarters, and surrounding private venues.",
    landmarkContext:
      "Serving Tata Steel township, Neelachal Ispat Nigam (NINL) sectors, Duburi, and the Kalinganagar industrial corridor.",
    venueContext:
      "Regular makeup appointments for township club houses, community halls, hotel banquet facilities, and private residential quarters.",
    highlights: [
      "Preferred bridal makeup choice for Kalinganagar corporate and executive families",
      "Modern, minimalist and high-definition bridal styling options",
      "Airbrush makeup that prevents cakeyness and withstands industrial climate conditions",
      "Weekend academy training schedules for aspiring artists from Kalinganagar",
    ],
    servicesOffered: [
      {
        name: "Kalinganagar Executive Bridal Package",
        price: "₹8,000 - ₹15,000",
        desc: "High-definition airbrush bridal look, international contouring, premium lashes, designer hair styling, and saree/lehenga draping.",
      },
      {
        name: "Corporate Reception & Cocktail Glam",
        price: "₹3,000 - ₹5,000",
        desc: "Chic, dewy, modern evening looks suited for corporate receptions, sangeets, and anniversary events.",
      },
      {
        name: "Skin Detox & Hydro-Infusion Treatment",
        price: "₹2,000 - ₹3,500",
        desc: "Advanced multi-stage hydra facial to eliminate environmental pollutants, refine pores, and restore youth glow.",
      },
    ],
    faqs: [
      {
        question: "Do your artists visit Kalinganagar township quarters for bridal appointments?",
        answer:
          "Yes, we frequently visit Kalinganagar residential colonies and township quarters for on-site bridal preparation, bringing full vanity lighting and sanitized tools.",
      },
      {
        question: "How long in advance should Kalinganagar residents book?",
        answer:
          "For wedding season dates, booking 3 to 6 weeks in advance ensures dedicated artist allocation for your venue.",
      },
    ],
    nearbyAreas: [
      { name: "Jajpur Road", slug: "jajpur-road", distance: "14 km" },
      { name: "Danagadi", slug: "danagadi", distance: "6 km" },
      { name: "Vyasanagar", slug: "vyasanagar", distance: "14 km" },
      { name: "Panikoili", slug: "panikoili", distance: "22 km" },
    ],
    geoCoordinates: { latitude: 20.9705, longitude: 86.0592 },
    mapQuery: "Kalinganagar+Jajpur+Odisha",
    editorialContent: {
      overview:
        "Kalinganagar has emerged as a premier modern township in Odisha, home to professionals from across India. Bridal aesthetic preferences here often combine cosmopolitan pan-Indian glamour with traditional Odia touches. Elegance Makeover & Academy provides the sophisticated cosmetic artistry needed to satisfy the highest beauty expectations.",
      whyChooseUs:
        "Master artist Rasmirekha Swain brings a refined, editorial approach to bridal makeup. We avoid unnatural, over-whitened foundation masks, focusing instead on sculpting features, enhancing natural skin undertones, and creating timeless elegance.",
      bridalStylingDetails:
        "Our team is well-versed in diverse Indian wedding traditions, including Odia, Bengali, Bihari, and North Indian bridal styling, making us the top recommendation for diverse Kalinganagar township families.",
      bookingAdvice:
        "Plan your bridal consultation via video call or WhatsApp, or visit our central Jajpur Road studio for an in-person assessment of skin and hair requirements.",
    },
  },

  panikoili: {
    slug: "panikoili",
    name: "Panikoili",
    district: "Jajpur, Odisha",
    title: "Bridal Makeup Artist in Panikoili | Elegance Makeover",
    metaDescription:
      "Expert bridal makeup artist near Panikoili NH-16 junction. Professional HD bridal makeup, airbrush styling & salon treatments by Rasmirekha Swain.",
    h1: "Bridal Makeup Artist in Panikoili",
    quickAnswer:
      "Brides in and around Panikoili (NH-16 and NH-20 junction) choose Elegance Makeover & Academy for luxury bridal styling. Located just 18 km away via the highway corridor, our team offers both studio visits in Jajpur Road and venue service across Panikoili, Kuakhia, and nearby wedding halls.",
    distanceFromStudio: "18 km via NH-20",
    travelTime: "25 - 30 minutes by road",
    travelPolicy:
      "Direct highway connectivity makes on-venue travel to Panikoili wedding venues fast and reliable.",
    landmarkContext:
      "Serving Panikoili junction, highway hotels, police training zone, and surrounding rural-urban settlements.",
    venueContext:
      "Regular appointments at highway banquet facilities, mandaps near the NH-16 junction, and local family residences.",
    highlights: [
      "Direct 25-minute highway route from our flagship Jajpur Road studio",
      "Specialist in weather-resistant bridal makeup for outdoor and mandap ceremonies",
      "Available for early morning wedding mahurats and late evening receptions",
      "Bridal party combos for large family groups",
    ],
    servicesOffered: [
      {
        name: "Panikoili Bridal HD Package",
        price: "₹6,000 - ₹12,000",
        desc: "Full HD bridal makeup, eyelashes, traditional or modern bridal hair design, and saree pleating.",
      },
      {
        name: "Airbrush Waterproof Wedding Makeup",
        price: "₹9,000 - ₹15,000",
        desc: "Seamless airbrush base that resists tears, sweat, and long outdoor ceremonies.",
      },
      {
        name: "Party & Festive Makeup",
        price: "₹2,500",
        desc: "Glamorous party looks for family weddings and festive functions.",
      },
    ],
    faqs: [
      {
        question: "Can your artists travel to Panikoili on the wedding day?",
        answer:
          "Yes, we travel directly to Panikoili with complete professional equipment for weddings and receptions.",
      },
      {
        question: "How long does the journey take from Jajpur Road to Panikoili?",
        answer:
          "It takes about 25 to 30 minutes via NH-20, allowing convenient scheduling for morning and evening weddings.",
      },
    ],
    nearbyAreas: [
      { name: "Jajpur Road", slug: "jajpur-road", distance: "18 km" },
      { name: "Kuakhia", slug: "kuakhia", distance: "12 km" },
      { name: "Jajpur Town", slug: "jajpur-town", distance: "14 km" },
      { name: "Bhadrak", slug: "bhadrak", distance: "28 km" },
    ],
    geoCoordinates: { latitude: 20.8931, longitude: 86.2084 },
    mapQuery: "Panikoili+Jajpur+Odisha",
    editorialContent: {
      overview:
        "Panikoili is a strategic crossroads in central Odisha, connecting NH-16 and NH-20. Many weddings in this region take advantage of spacious highway resorts and wedding mandaps. Elegance Makeover & Academy delivers the high-caliber makeup artistry necessary for brides celebrating in Panikoili.",
      whyChooseUs:
        "Our reliable on-time track record ensures that our mobile artist vehicle reaches your Panikoili venue well before the ceremony begins, preventing last-minute stress.",
      bridalStylingDetails:
        "We specialize in durable makeup formulas that look fresh from the first ritual to the final bidaai, giving brides confidence in front of friends, relatives, and professional photographers.",
      bookingAdvice:
        "Contact our team via WhatsApp to discuss on-venue timings and reserve your wedding date.",
    },
  },

  kuakhia: {
    slug: "kuakhia",
    name: "Kuakhia",
    district: "Jajpur, Odisha",
    title: "Bridal Makeup Artist in Kuakhia | Elegance Makeover",
    metaDescription:
      "Bridal makeup artist for Kuakhia, Odisha. Premium HD bridal makeup, traditional Odia saree draping, wedding hair styling by Rasmirekha Swain.",
    h1: "Bridal Makeup Artist in Kuakhia",
    quickAnswer:
      "Brides in Kuakhia along the southern NH-16 stretch trust Elegance Makeover & Academy for luxury bridal makeup, traditional jewelry setting, and pre-bridal skin care. Located 24 km from Kuakhia, our salon offers both in-studio services and on-venue artist travel.",
    distanceFromStudio: "24 km via NH-16",
    travelTime: "30 - 35 minutes by road",
    travelPolicy:
      "Convenient on-location travel to Kuakhia and surrounding villages along the highway for weddings and receptions.",
    landmarkContext:
      "Serving Kuakhia market, NH-16 bypass, and surrounding residential communities.",
    venueContext:
      "Frequent bookings at local community mandaps and private wedding venues in Kuakhia.",
    highlights: [
      "Smooth 30-minute highway connectivity to our Jajpur Road flagship salon",
      "Authentic traditional Odia bridal artistry and Mukuta styling",
      "Complete bridal vanity service at your doorstep or venue",
      "Family and bridesmaid group packages available",
    ],
    servicesOffered: [
      {
        name: "Kuakhia Traditional Bridal Package",
        price: "₹6,000 - ₹12,000",
        desc: "Full bridal makeup, Chandan brow design, jewelry placement, hair styling, and saree draping.",
      },
      {
        name: "Waterproof HD Airbrush Makeup",
        price: "₹9,000 - ₹15,000",
        desc: "Long-lasting, sweat-proof airbrush makeup for high-humidity conditions.",
      },
      {
        name: "Reception Glam Package",
        price: "₹3,000 - ₹5,000",
        desc: "Modern evening makeup and hairstyling for wedding receptions.",
      },
    ],
    faqs: [
      {
        question: "Does Elegance Makeover provide bridal makeup in Kuakhia?",
        answer:
          "Yes, we provide full on-venue bridal makeup services across Kuakhia and nearby areas along the NH-16 corridor.",
      },
      {
        question: "How do I book an artist for a Kuakhia wedding?",
        answer:
          "Simply message us on WhatsApp with your wedding date, venue, and required timing. We will confirm availability and secure your slot.",
      },
    ],
    nearbyAreas: [
      { name: "Panikoili", slug: "panikoili", distance: "12 km" },
      { name: "Jajpur Road", slug: "jajpur-road", distance: "24 km" },
      { name: "Jajpur Town", slug: "jajpur-town", distance: "22 km" },
      { name: "Cuttack", slug: "cuttack", distance: "52 km" },
    ],
    geoCoordinates: { latitude: 20.8064, longitude: 86.1554 },
    mapQuery: "Kuakhia+Jajpur+Odisha",
    editorialContent: {
      overview:
        "Kuakhia is a thriving market town in southern Jajpur district. Brides in Kuakhia value authentic cultural traditions while seeking modern, photo-ready makeup finishes. Elegance Makeover & Academy provides the perfect blend of local expertise and international cosmetics.",
      whyChooseUs:
        "With a decade of experience across Jajpur district, founder Rasmirekha Swain provides gentle, respectful, and punctual bridal services tailored to every bride's unique preferences.",
      bridalStylingDetails:
        "Our team ensures your traditional bridal Mukuta is comfortably secured, your Chandan dots are meticulously applied, and your silk saree is draped to perfection.",
      bookingAdvice:
        "Book your wedding and reception appointments together to ensure your favorite artist is assigned for both functions.",
    },
  },

  bhadrak: {
    slug: "bhadrak",
    name: "Bhadrak",
    district: "Bhadrak, Odisha",
    title: "Bridal Makeup Artist for Bhadrak | Elegance Makeover",
    metaDescription:
      "Bridal makeup artist for Bhadrak brides. Luxury HD bridal makeup, airbrush wedding styling, pre-bridal salon care & academy by Rasmirekha Swain.",
    h1: "Bridal Makeup Artist for Bhadrak",
    quickAnswer:
      "Brides in Bhadrak seeking world-class bridal makeup look to Elegance Makeover & Academy in nearby Jajpur Road. Located approximately 45 km via NH-16, our master artist team travels directly to wedding venues and ancestral homes across Bhadrak district.",
    distanceFromStudio: "45 km via NH-16",
    travelTime: "50 - 60 minutes by road / 30 mins by express train",
    travelPolicy:
      "On-venue bridal makeup artist visits are available throughout Bhadrak district. Our senior team travels with complete professional vanity kits and lighting.",
    landmarkContext:
      "Serving Bhadrak town, Charampa, Bonth, Dhamnagar, and the NH-16 bypass corridor.",
    venueContext:
      "Regular makeup appointments at leading Bhadrak wedding halls, hotel banquet facilities, and private family homes.",
    highlights: [
      "Frequent wedding travel to Bhadrak with dedicated senior artist teams",
      "Luxury HD & airbrush makeup suited for Bhadrak's coastal climate",
      "Direct highway and rail transit between Jajpur Road and Bhadrak",
      "Comprehensive bridal packages including jewelry setting and draping",
    ],
    servicesOffered: [
      {
        name: "Bhadrak Destination Bridal Package",
        price: "₹8,000 - ₹16,000",
        desc: "Complete artist travel to your Bhadrak venue with luxury HD bridal makeup, hair design, and traditional jewelry setting.",
      },
      {
        name: "Waterproof Airbrush Bridal Makeup",
        price: "₹10,000 - ₹16,000",
        desc: "Ultra-durable, sweat-resistant airbrush finish ideal for long ceremonies in coastal weather.",
      },
      {
        name: "Reception & Engagement Styling",
        price: "₹3,500 - ₹6,000",
        desc: "Contemporary evening glam with sculpted contouring and modern hairstyles.",
      },
    ],
    faqs: [
      {
        question: "Does Elegance Makeover travel to Bhadrak for weddings?",
        answer:
          "Yes, we regularly travel to Bhadrak for weddings and receptions via NH-16. Our team arrives fully equipped with vanity lighting and tools.",
      },
      {
        question: "How long does the journey take to Bhadrak?",
        answer:
          "The drive takes approximately 50 to 60 minutes via NH-16, making same-day wedding and reception styling convenient.",
      },
      {
        question: "Can Bhadrak brides visit the studio in Jajpur Road?",
        answer:
          "Yes, many Bhadrak brides take the 30-minute train or drive to our Jajpur Road salon for pre-bridal facials and consultations before the big day.",
      },
    ],
    nearbyAreas: [
      { name: "Panikoili", slug: "panikoili", distance: "28 km" },
      { name: "Jajpur Road", slug: "jajpur-road", distance: "45 km" },
      { name: "Jajpur Town", slug: "jajpur-town", distance: "38 km" },
    ],
    geoCoordinates: { latitude: 21.0544, longitude: 86.4957 },
    mapQuery: "Bhadrak+Odisha",
    editorialContent: {
      overview:
        "Bhadrak is one of northern coastal Odisha's most prominent cultural districts. Weddings in Bhadrak celebrate rich traditions with grand family gatherings. Brides here seek makeup that honors age-old customs while presenting a fresh, glowing, international aesthetic.",
      whyChooseUs:
        "Rasmirekha Swain is widely recognized across northern coastal Odisha for her signature bridal artistry. Our team brings years of wedding experience, ensuring every bride feels calm, pampered, and stunning on her most important day.",
      bridalStylingDetails:
        "We pay special attention to the unique styling preferences of Bhadrak brides, ensuring the perfect balance between vibrant eye artistry, sculpted cheeks, and secure traditional saree pleating.",
      bookingAdvice:
        "For Bhadrak weddings, we recommend booking 1 to 2 months in advance to reserve travel slots.",
    },
  },

  cuttack: {
    slug: "cuttack",
    name: "Cuttack",
    district: "Cuttack, Odisha",
    title: "Bridal Makeup Artist for Cuttack | Elegance Makeover",
    metaDescription:
      "Luxury bridal makeup artist for Cuttack weddings & academy training. Certified HD airbrush bridal makeup & pre-bridal care by Rasmirekha Swain.",
    h1: "Bridal Makeup Artist for Cuttack",
    quickAnswer:
      "Brides and academy students from historic Cuttack (the Millennium City) choose Elegance Makeover & Academy for luxury bridal styling and certified makeup training. Located 75 km away via the direct 6-lane NH-16 corridor, our master artist team provides on-venue bridal services across Cuttack and welcomes commuting academy students.",
    distanceFromStudio: "75 km via NH-16 (6-lane highway)",
    travelTime: "1 hr 15 mins by road / 45 mins by express train",
    travelPolicy:
      "On-venue bridal makeup visits are available for weddings and receptions across Cuttack city, CDA sectors, and highway wedding resorts.",
    landmarkContext:
      "Serving CDA, Cantonment, Link Road, Chauliaganj, Bidanasi, and the Barabati area.",
    venueContext:
      "Frequent bookings at leading Cuttack banquet halls, Kalyan Mandaps, and private heritage homes.",
    highlights: [
      "Direct NH-16 and railway express connection between Jajpur Road and Cuttack",
      "Specialist in Silver Filigree (Tarakasi) bridal jewelry integration",
      "High-end international cosmetics: MAC, Huda Beauty, NARS, Estée Lauder",
      "Professional cosmetology academy options for Cuttack students seeking intensive training",
    ],
    servicesOffered: [
      {
        name: "Cuttack Heritage Bridal Package",
        price: "₹8,000 - ₹16,000",
        desc: "Full artist travel to your Cuttack venue with luxury HD bridal makeup, lashes, custom hair design, and traditional Tarakasi jewelry placement.",
      },
      {
        name: "HD Airbrush Luxury Bridal Makeup",
        price: "₹10,000 - ₹18,000",
        desc: "Flawless, sweat-resistant airbrush makeup that stays impeccable through long Odia wedding ceremonies.",
      },
      {
        name: "Professional Makeup Academy Course",
        price: "₹25,000 - ₹45,000",
        desc: "Intensive 30-day professional bridal makeup course with vanity kit guidance and placement support.",
      },
    ],
    faqs: [
      {
        question: "Does Elegance Makeover travel to Cuttack for weddings?",
        answer:
          "Yes, we provide full on-venue bridal makeup service across Cuttack city via the direct NH-16 highway.",
      },
      {
        question: "Can Cuttack students enroll in the makeup academy?",
        answer:
          "Yes, many students from Cuttack commute easily via express train (45 minutes) or take our intensive residential workshop modules.",
      },
      {
        question: "How does Elegance Makeover compare to local Cuttack salons?",
        answer:
          "We offer dedicated one-on-one bridal focus, authentic luxury imported cosmetics, and master artist Rasmirekha Swain's personal touch without factory-style turnover.",
      },
    ],
    nearbyAreas: [
      { name: "Kuakhia", slug: "kuakhia", distance: "52 km" },
      { name: "Jajpur Road", slug: "jajpur-road", distance: "75 km" },
      { name: "Bhubaneswar", slug: "bhubaneswar", distance: "28 km" },
    ],
    geoCoordinates: { latitude: 20.4625, longitude: 85.8828 },
    mapQuery: "Cuttack+Odisha",
    editorialContent: {
      overview:
        "Cuttack, Odisha's historic silver city, is celebrated for its exquisite filigree work (Tarakasi) and deep-rooted cultural festivals. Cuttack brides desire bridal looks that honor this heritage while looking contemporary, elegant, and photo-ready. Elegance Makeover & Academy delivers master-level bridal artistry tailored to Cuttack's unique aesthetic.",
      whyChooseUs:
        "Founder Rasmirekha Swain brings a wealth of bridal expertise, understanding how to complement Cuttack's signature silver filigree crowns and ornaments with radiant, balanced makeup.",
      bridalStylingDetails:
        "Our team excels at highlighting the bride's natural elegance, crafting seamless skin textures, striking eye looks, and classic Odia bridal hairstyles adorned with fragrant flowers.",
      bookingAdvice:
        "For Cuttack weddings, we recommend booking 6 to 12 weeks in advance to secure our travel team.",
    },
  },

  bhubaneswar: {
    slug: "bhubaneswar",
    name: "Bhubaneswar",
    district: "Khurda, Odisha",
    title: "Bridal Makeup Artist for Bhubaneswar | Elegance Makeover",
    metaDescription:
      "Premier bridal makeup artist for Bhubaneswar weddings & academy certification. HD airbrush bridal makeup & luxury parlour care by Rasmirekha Swain.",
    h1: "Bridal Makeup Artist for Bhubaneswar",
    quickAnswer:
      "For brides and academy students in Odisha's capital city Bhubaneswar, Elegance Makeover & Academy provides destination bridal artistry and professional cosmetology training. Conveniently connected by the 6-lane NH-16 highway, our senior artist team travels to Bhubaneswar's top hotels, wedding resorts, and private venues.",
    distanceFromStudio: "105 km via NH-16 (Express Highway)",
    travelTime: "1 hr 45 mins by road / 1 hr 15 mins by Vande Bharat / Superfast train",
    travelPolicy:
      "Destination bridal artist visits are available for weddings and grand receptions across Bhubaneswar, Patia, Khandagiri, and Jayadev Vihar.",
    landmarkContext:
      "Serving Patia, Nayapalli, Jayadev Vihar, Saheed Nagar, Khandagiri, and major wedding resort hubs.",
    venueContext:
      "Regular makeup appointments at leading Bhubaneswar 5-star hotels, luxury convention centers, and destination wedding mandaps.",
    highlights: [
      "Frequent destination wedding travel to Bhubaneswar's premier resorts and hotels",
      "State-of-the-art HD and airbrush makeup technology for 4K video shoots",
      "Recognized makeup academy offering professional certifications for Bhubaneswar students",
      "VIP bridal concierge service with complete team assistance",
    ],
    servicesOffered: [
      {
        name: "Bhubaneswar Destination Bridal Suite",
        price: "₹10,000 - ₹20,000",
        desc: "Complete artist team travel to your Bhubaneswar hotel or resort, luxury HD airbrush makeup, couture hair design, and full ensemble draping.",
      },
      {
        name: "Luxury Reception Red Carpet Glam",
        price: "₹4,000 - ₹7,000",
        desc: "Editorial evening looks with sculpted bone structure, dewy glass skin, and celebrity-inspired hairstyles.",
      },
      {
        name: "Certified Master Makeup Course",
        price: "₹25,000 - ₹45,000",
        desc: "Comprehensive professional makeup artist training with portfolio photoshoots, vanity guidance, and placement support.",
      },
    ],
    faqs: [
      {
        question: "Does Elegance Makeover travel to Bhubaneswar for weddings?",
        answer:
          "Yes, we regularly travel to Bhubaneswar for destination weddings, luxury hotel appointments, and grand receptions.",
      },
      {
        question: "What products are used for Bhubaneswar brides?",
        answer:
          "We use only the world's leading professional brands including Charlotte Tilbury, MAC, Huda Beauty, NARS, and Kryolan.",
      },
      {
        question: "Can students from Bhubaneswar enroll in your academy?",
        answer:
          "Yes! Students from Bhubaneswar frequently join our intensive master makeup courses, benefiting from small batch sizes and direct mentorship by Rasmirekha Swain.",
      },
    ],
    nearbyAreas: [
      { name: "Cuttack", slug: "cuttack", distance: "28 km" },
      { name: "Kuakhia", slug: "kuakhia", distance: "80 km" },
      { name: "Jajpur Road", slug: "jajpur-road", distance: "105 km" },
    ],
    geoCoordinates: { latitude: 20.2961, longitude: 85.8245 },
    mapQuery: "Bhubaneswar+Odisha",
    editorialContent: {
      overview:
        "Bhubaneswar, the temple city and capital of Odisha, hosts some of the state's most magnificent destination weddings and celebrations. Brides in Bhubaneswar expect international standard cosmetic artistry, modern trends, and flawless execution under high-definition wedding videography.",
      whyChooseUs:
        "Elegance Makeover & Academy brings elite, individualized artistry to Bhubaneswar weddings. Instead of generic salon assembly lines, founder Rasmirekha Swain delivers personalized luxury with a calm, attentive bedside manner.",
      bridalStylingDetails:
        "We coordinate closely with your photographer and lighting team, ensuring that your makeup looks breathtaking in natural sunlight, moody evening banquets, and high-definition video captures.",
      bookingAdvice:
        "Due to heavy demand for destination wedding dates in Bhubaneswar, early booking (2 to 3 months in advance) is recommended.",
    },
  },
};

export const allLocationSlugs = Object.keys(locationsData);

export function getLocationBySlug(slug: string): LocationArea | undefined {
  return locationsData[slug];
}
