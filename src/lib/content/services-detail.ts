export interface ServiceDetail {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  category: "Bridal" | "Parlour" | "Academy";
  price: string;
  rawPrice: number;
  duration: string;
  quickAnswer: string;
  whatsIncluded: string[];
  whoItsFor: string;
  processSteps: { stepNumber: number; title: string; desc: string }[];
  prepTips: string[];
  aftercareTips: string[];
  faqs: { question: string; answer: string }[];
  relatedServices: { name: string; slug: string; price: string }[];
  relatedBlogSlugs: string[];
  courseDetails?: {
    duration: string;
    certification: string;
    syllabus: string[];
    fee: string;
    mode: string;
    provider: string;
  };
}

export const servicesDetailData: Record<string, ServiceDetail> = {
  "bridal-makeup": {
    slug: "bridal-makeup",
    title: "Bridal Makeup",
    seoTitle: "Bridal Makeup in Jajpur Road | Elegance Makeover",
    metaDescription:
      "Luxury traditional Odia and contemporary bridal makeup in Jajpur Road by Master Artist Rasmirekha Swain. Long-wear HD finish, draping & hair styling.",
    category: "Bridal",
    price: "₹8,000 - ₹12,000",
    rawPrice: 8000,
    duration: "3 - 4 hours",
    quickAnswer:
      "Bridal makeup at Elegance Makeover starts at ₹8,000 in Jajpur Road. Directed by Master Artist Rasmirekha Swain, every session includes high-definition base prep, customized eye artistry, luxury hair styling, precision jewellery setting, and traditional Odia saree draping engineered to remain flawless for 14+ hours.",
    whatsIncluded: [
      "Custom HD foundation base matched to undertone",
      "Full waterproof, sweat-resistant contouring & blush",
      "Customized eye artistry with luxury faux mink lashes",
      "Traditional bridal hairstyle with fresh floral/mukut fitting",
      "Precision bridal saree/lehenga draping & dupatta setting",
      "Jewellery pinning, matha patti & nath fixation",
      "Pre-event touch-up kit with matching lip sample",
    ],
    whoItsFor:
      "Traditional Odia brides, destination brides, and reception brides seeking a regal, camera-ready bridal transformation that highlights their natural beauty without looking cakey or artificial.",
    processSteps: [
      {
        stepNumber: 1,
        title: "Skin Analysis & Deep Hydration Prep",
        desc: "We analyze skin texture, balance oil/hydration zones, and prep with micro-pore primers to establish an ultra-smooth, moisture-locked canvas.",
      },
      {
        stepNumber: 2,
        title: "Bespoke HD Base & Sculpting",
        desc: "High-definition foundation formulas are buffed into the skin using micro-sponge techniques, followed by light contouring to flatter facial symmetry.",
      },
      {
        stepNumber: 3,
        title: "Artisanal Eye & Lip Coordination",
        desc: "Waterproof eyeliner, smokey or cut-crease eyeshadow tailored to your bridal attire colors, followed by smudge-proof, 14-hour lip pigments.",
      },
      {
        stepNumber: 4,
        title: "Hairstyle, Floral Mukut & Draping",
        desc: "Structured updo or cascading curls secured for heavy ornaments. Saree pleating, can-can skirt setting, and secure dupatta pinning.",
      },
    ],
    prepTips: [
      "Get your last facial 4-5 days prior to the wedding date; avoid new skin peels on the wedding week.",
      "Hydrate well (drink 2-3 liters of water daily) and gently exfoliate lips 2 days ahead.",
      "Wash and dry hair the night before without using heavy conditioners or hair oils.",
      "Wear a button-down or zip-front top on the bridal morning so clothing slips off easily without disturbing makeup.",
    ],
    aftercareTips: [
      "Keep blotting papers in your bridal clutch to gently dab away perspiration; never wipe or rub.",
      "Touch up lips at midpoint using the sample mini-pot provided in your bridal kit.",
      "Remove lashes gently at night using an oil-based micellar water or cleansing balm before bed.",
    ],
    faqs: [
      {
        question: "How much does bridal makeup cost at Elegance Makeover Jajpur Road?",
        answer:
          "Signature bridal makeup starts at ₹8,000 for classic HD and goes up to ₹12,000 for luxury couture packages including full floral hair design and draping.",
      },
      {
        question: "How long does a bridal makeover session take?",
        answer:
          "A complete bridal makeover takes between 3 to 4 hours, which includes skin prep, makeup, hair styling, mukut fitting, and saree draping.",
      },
      {
        question: "Do you travel to wedding venues in Jajpur Road and other Odisha districts?",
        answer:
          "Yes, Rasmirekha Swain and her senior team travel on-location across Jajpur Road, Cuttack, Bhubaneswar, Bhadrak, and all surrounding areas.",
      },
      {
        question: "Which cosmetic brands do you use for bridal makeup?",
        answer:
          "We use authentic luxury international brands including MAC, Huda Beauty, Dior, NARS, Charlotte Tilbury, Estée Lauder, and Anastasia Beverly Hills.",
      },
      {
        question: "How early should I book my bridal makeup date?",
        answer:
          "Odisha wedding muhurat dates get reserved 3 to 6 months in advance. We recommend locking your date as soon as your marriage date is finalized.",
      },
    ],
    relatedServices: [
      { name: "HD Airbrush Bridal Makeup", slug: "hd-airbrush-bridal-makeup", price: "₹14,999" },
      { name: "Engagement Makeup", slug: "engagement-makeup", price: "₹4,500" },
      { name: "Hydra Facial", slug: "hydra-facial", price: "₹2,499" },
    ],
    relatedBlogSlugs: [
      "odia-bridal-makeup-guide",
      "bridal-makeup-cost-odisha",
      "wedding-day-makeup-checklist",
    ],
  },

  "hd-airbrush-bridal-makeup": {
    slug: "hd-airbrush-bridal-makeup",
    title: "HD Airbrush Bridal Makeup",
    seoTitle: "HD Airbrush Makeup in Jajpur Road | Elegance Makeover",
    metaDescription:
      "Flawless HD Airbrush bridal makeup in Jajpur Road, Odisha. Lightweight, 24-hour waterproof base, high humidity resistance. Book Master Artist Rasmirekha.",
    category: "Bridal",
    price: "₹12,000 - ₹16,000",
    rawPrice: 12000,
    duration: "3.5 - 4.5 hours",
    quickAnswer:
      "HD Airbrush bridal makeup at Elegance Makeover costs ₹12,000 to ₹16,000 in Jajpur Road. Using professional micro-fine silicone airbrush mists, this technique gives a weightless, poreless velvet finish that is 100% waterproof, tear-resistant, and humidity-proof under 4K video lights for 18+ hours.",
    whatsIncluded: [
      "Compressor-delivered micro-misted silicone airbrush base",
      "Flawless 4K optical-diffusing skin smoothing",
      "High-humidity and heat-resistant base formulation",
      "Full waterproof eye artistry with premium multi-dimensional 3D lashes",
      "Sculpted airbrush contouring and soft satin highlight",
      "Bridal updo or floral braid with custom mukut stabilization",
      "Luxury saree/lehenga draping with heavy can-can weight balancing",
    ],
    whoItsFor:
      "Brides desiring the pinnacle of bridal luxury, especially those having outdoor mandaps, warm summer/monsoon weddings, or extensive 4K cinematic wedding videography where every pore is visible.",
    processSteps: [
      {
        stepNumber: 1,
        title: "Micellar Detox & Silicone Barrier Prep",
        desc: "Skin is clarified and primed with a specialized airbrush sealant that creates an invisible shield against sweat and sebum production.",
      },
      {
        stepNumber: 2,
        title: "Airgun Compressor Dispersion",
        desc: "Color-customized airbrush foundation is misted at precise PSI, depositing millions of microscopic pigment spheres without touching or dragging the skin.",
      },
      {
        stepNumber: 3,
        title: "Air-Stippled Contour & Dimensional Highlighting",
        desc: "Cheekbones, jawline, and collarbones are gently airbrushed to provide high-definition depth under wedding photography flashes.",
      },
      {
        stepNumber: 4,
        title: "Hair Architecture & Bridal Draping",
        desc: "Full structured hair design with protective thermal setting, accompanied by meticulous jewellery anchoring and royal pleat drapes.",
      },
    ],
    prepTips: [
      "Avoid using any heavy oil-based facial moisturizers right before your session; airbrush formulations adhere best to water-hydrated skin.",
      "Shave or thread peach fuzz 2-3 days prior if desired for the smoothest micro-spray laydown.",
      "Ensure eyebrows are shaped and groomed 3-4 days ahead.",
    ],
    aftercareTips: [
      "Do not touch or rub your face; airbrush is smudge-proof but mechanical friction should be avoided.",
      "If you shed tears during Vidaai, gently press a clean tissue below the waterline rather than wiping.",
      "At night, break down the waterproof airbrush base using a cleansing oil before your regular face wash.",
    ],
    faqs: [
      {
        question: "What is the difference between regular HD and Airbrush makeup?",
        answer:
          "Regular HD is applied with high-end brushes and beauty sponges. Airbrush is sprayed using a compressed air tool that releases micro-fine droplets, creating an even lighter, 100% waterproof layer that looks indistinguishable from real skin under 4K lenses.",
      },
      {
        question: "Is Airbrush bridal makeup suitable for humid Odisha weather?",
        answer:
          "Yes, Airbrush is specifically designed for high-humidity climates. The silicone formula locks against perspiration and stage heat, preventing makeup meltdown.",
      },
      {
        question: "Will airbrush makeup look cakey on textured or acne-prone skin?",
        answer:
          "No, airbrush foundation deposits a much thinner film than liquid foundation, allowing natural skin texture to breathe without settling into fine lines or pores.",
      },
      {
        question: "How much does Airbrush bridal makeup cost in Jajpur Road?",
        answer:
          "Our HD Airbrush bridal packages range between ₹12,000 and ₹16,000 depending on hairstyle complexity, floral additions, and outstation travel requirements.",
      },
      {
        question: "Can I book a trial for HD Airbrush makeup?",
        answer:
          "Yes, paid bridal trials are available at our Jajpur Road studio upon request and advance appointment.",
      },
    ],
    relatedServices: [
      { name: "Bridal Makeup", slug: "bridal-makeup", price: "₹8,000" },
      { name: "Hydra Facial", slug: "hydra-facial", price: "₹2,499" },
      { name: "Hair Smoothening", slug: "hair-smoothening", price: "₹3,999" },
    ],
    relatedBlogSlugs: [
      "hd-vs-airbrush-makeup-indian-skin",
      "bridal-makeup-cost-odisha",
      "odia-bridal-makeup-guide",
    ],
  },

  "engagement-makeup": {
    slug: "engagement-makeup",
    title: "Engagement & Reception Makeup",
    seoTitle: "Engagement Makeup in Jajpur Road | Elegance Makeover",
    metaDescription:
      "Stunning engagement & reception makeover in Jajpur Road by Rasmirekha Swain. Soft glam, glowing skin, couture hair & gown draping. Book online.",
    category: "Bridal",
    price: "₹4,500 - ₹7,000",
    rawPrice: 4500,
    duration: "2 - 2.5 hours",
    quickAnswer:
      "Engagement and ring ceremony makeup at Elegance Makeover starts at ₹4,500 in Jajpur Road. Perfect for pastel lehengas, silk sarees, and western gowns, this package includes radiant glass-skin prep, luminous shimmer eyes, modern textured curls or updos, and dupatta/gown styling.",
    whatsIncluded: [
      "Luminous glass-skin hydration and long-wear base",
      "Soft glam or romantic rose-gold smokey eye styling",
      "Premium lashes and waterproof winged liner",
      "Textured bridal Hollywood waves, messy buns, or modern braids",
      "Dupatta pinning or gown styling assistance",
      "Full setting mist for 10-hour dance & stage longevity",
    ],
    whoItsFor:
      "Brides celebrating their Ring Ceremony, Sangeet, Haldi, or post-wedding Reception who want modern, romantic glamour distinct from the traditional wedding-day red look.",
    processSteps: [
      {
        stepNumber: 1,
        title: "Palette & Attire Harmonization",
        desc: "We analyze your engagement outfit shade (champagne, blush pink, lavender, mint) and map complementary eyeshadow and lip hues.",
      },
      {
        stepNumber: 2,
        title: "Luminous Base Application",
        desc: "Illuminating primers and feather-light HD foundations create a fresh, radiant dewy finish that glows under evening lights.",
      },
      {
        stepNumber: 3,
        title: "Modern Romantic Eye & Lip Styling",
        desc: "Shimmer duochromes, defined lash lines, and long-lasting soft mauve or nude-pink velvet matte lips.",
      },
      {
        stepNumber: 4,
        title: "Hairstyling & Accessory Pinning",
        desc: "Voluminous open curls with pearl pins, soft textured updos, or boho braids tailored to your outfit collarline.",
      },
    ],
    prepTips: [
      "Wash hair with clarifying shampoo in the morning and blow dry completely.",
      "Bring your engagement jewellery and outfit to the studio for coordinated placement.",
      "Apply lip balm generously the night before.",
    ],
    aftercareTips: [
      "Blot shine from the T-zone with tissue; keep lip gloss on hand for quick evening shine refreshes.",
      "Take off false eyelashes slowly from the outer corner inward after your party.",
    ],
    faqs: [
      {
        question: "How is engagement makeup different from wedding bridal makeup?",
        answer:
          "Engagement makeup focuses on fresh, luminous, romantic tones (pastels, champagnes, soft golds) and modern textured hair, whereas bridal makeup is more opulent, ritual-proof, and involves traditional jewellery and heavy draping.",
      },
      {
        question: "Can I wear a western gown or Indo-western outfit for this service?",
        answer:
          "Yes, our team specializes in styling for gowns, lehengas, Shararas, and designer silk sarees.",
      },
      {
        question: "How long does engagement makeup take?",
        answer: "An engagement makeover typically takes approximately 2 to 2.5 hours.",
      },
      {
        question: "What is the fee for engagement makeup in Jajpur Road?",
        answer:
          "Pricing starts at ₹4,500 and goes up to ₹7,000 for advanced couture hair design and premium international lash enhancements.",
      },
      {
        question: "Is venue travel available for engagement ceremonies?",
        answer:
          "Yes, we travel to venues in Jajpur Road, Vyasanagar, and across Odisha for engagement and sangeet events.",
      },
    ],
    relatedServices: [
      { name: "Bridal Makeup", slug: "bridal-makeup", price: "₹8,000" },
      { name: "Party Makeup", slug: "party-makeup", price: "₹2,500" },
      { name: "Hair Styling", slug: "hair-styling", price: "₹800" },
    ],
    relatedBlogSlugs: [
      "wedding-day-makeup-checklist",
      "bridal-makeup-cost-odisha",
      "odia-bridal-makeup-guide",
    ],
  },

  "party-makeup": {
    slug: "party-makeup",
    title: "Party & Occasion Makeup",
    seoTitle: "Party Makeup in Jajpur Road | Elegance Makeover",
    metaDescription:
      "Professional party makeup & hair styling in Jajpur Road, Odisha. Bridesmaid, reception & family event glam from ₹2,500. Call Elegance Makeover.",
    category: "Parlour",
    price: "₹2,500 - ₹4,000",
    rawPrice: 2500,
    duration: "60 - 90 minutes",
    quickAnswer:
      "Party makeup at Elegance Makeover starts at ₹2,500 in Jajpur Road. Tailored for wedding guests, bridesmaids, sisters of the bride, and anniversary celebrations, each look features clean HD skin correction, customized eye makeup, eyelashes, and professional hair styling completed in 75 minutes.",
    whatsIncluded: [
      "HD skin base with tone-matching concealer",
      "Neutral, glam, or smokey eye artistry",
      "Natural strip eyelashes and water-resistant mascara",
      "Sculpted cheeks, blush, and satin lip color",
      "Hair styling: straight, loose curls, or simple chic updo",
      "Saree or lehenga pinning assistance",
    ],
    whoItsFor:
      "Bridesmaids, mothers of the bride/groom, party guests, and corporate attendees who need camera-ready glam that lasts throughout the celebration.",
    processSteps: [
      {
        stepNumber: 1,
        title: "Consultation & Attire Review",
        desc: "We discuss your outfit color, event timing (day vs night), and preferred intensity from no-makeup makeup to high glam.",
      },
      {
        stepNumber: 2,
        title: "Flawless HD Base",
        desc: "Quick hydrating skin prep followed by weightless foundation and targeted spot concealing.",
      },
      {
        stepNumber: 3,
        title: "Eyes & Lips",
        desc: "Blend-matched eyeshadow, defined liner, fluttery lashes, and transfer-resistant lip shades.",
      },
      {
        stepNumber: 4,
        title: "Hair Design & Saree Pleating",
        desc: "Thermal curling, sleek straightening, or elegant half-up styling, finished with setting spray.",
      },
    ],
    prepTips: [
      "Arrive with clean, moisturizer-free skin and thoroughly dry hair.",
      "Bring your saree safety pins, bobby pins, and outfit.",
    ],
    aftercareTips: [
      "Gently blot any shine with facial tissue during the party.",
      "Cleanse thoroughly with warm water and micellar cleansing water before sleep.",
    ],
    faqs: [
      {
        question: "How much is party makeup in Jajpur Road?",
        answer:
          "Party makeup at Elegance Makeover starts at ₹2,500 for standard HD and ₹4,000 for celebrity glam looks with elaborate hairstyles.",
      },
      {
        question: "Do you offer group discounts for multiple bridesmaids?",
        answer:
          "Yes, we offer special group packages for 3 or more members booking party makeup for the same wedding event.",
      },
      {
        question: "How long does a party makeup session take?",
        answer: "The average party makeup session takes 60 to 90 minutes per person.",
      },
      {
        question: "Can I walk in for party makeup or do I need to book?",
        answer:
          "Walk-ins are welcomed subject to chair availability, but during peak Odisha wedding season, we strongly recommend advance booking.",
      },
      {
        question: "Are eyelashes included with party makeup?",
        answer:
          "Yes, high-quality lightweight strip lashes are included in all our party makeup packages.",
      },
    ],
    relatedServices: [
      { name: "Engagement Makeup", slug: "engagement-makeup", price: "₹4,500" },
      { name: "Hair Styling", slug: "hair-styling", price: "₹800" },
      { name: "Hydra Facial", slug: "hydra-facial", price: "₹2,499" },
    ],
    relatedBlogSlugs: ["wedding-day-makeup-checklist", "bridal-makeup-cost-odisha"],
  },

  "hair-styling": {
    slug: "hair-styling",
    title: "Hair Styling & Hair Cuts",
    seoTitle: "Hair Styling & Cuts in Jajpur Road | Elegance Makeover",
    metaDescription:
      "Expert hair styling, haircuts, bridal updos & curls in Jajpur Road, Odisha. Custom hair transformations by experienced stylists. Book your chair.",
    category: "Parlour",
    price: "₹300 - ₹2,000",
    rawPrice: 300,
    duration: "30 - 75 minutes",
    quickAnswer:
      "Hair styling and precision cutting at Elegance Makeover ranges from ₹300 to ₹2,000 in Jajpur Road. Services include layer cuts, feather cuts, curtain bangs, bridal floral updos, Hollywood waves, and traditional Odia braids with pearl and gajra ornamentation.",
    whatsIncluded: [
      "Face-shape and hair texture consultation",
      "Precision cut, split-end removal, and feathering",
      "Blow dry with volume boosting or smoothing serums",
      "Thermal styling with heat-protectant barrier",
      "Accessory pinning, hair donut/mesh insertion, and gajra setting",
    ],
    whoItsFor:
      "Women looking for regular grooming, chic haircuts, or intricate event hairstyles that stay secure throughout long celebrations.",
    processSteps: [
      {
        stepNumber: 1,
        title: "Hair & Scalp Assessment",
        desc: "We evaluate hair density, length, wave pattern, and face angles to suggest the most flattering cut or style.",
      },
      {
        stepNumber: 2,
        title: "Wash & Thermal Protection",
        desc: "Hair is treated with thermal leave-in shields to protect hair cuticles from heat styling tools.",
      },
      {
        stepNumber: 3,
        title: "Sculpting / Cutting",
        desc: "Precision sectioning and professional shears deliver seamless layers, face-framing fringes, or texture.",
      },
      {
        stepNumber: 4,
        title: "Finishing & Hold Setting",
        desc: "Flexible-hold micro-sprays ensure bouncy, non-crunchy hold that resists humidity.",
      },
    ],
    prepTips: [
      "For cuts, hair can be washed at our salon wash station.",
      "For event updos or curls, wash hair 12 hours before and avoid heavy silicon hair oils so curls hold longer.",
    ],
    aftercareTips: [
      "Avoid tying wet hair tightly to prevent breakage.",
      "Use sulfate-free shampoo to preserve cut texture and bounce.",
    ],
    faqs: [
      {
        question: "What is the price of a haircut at Elegance Makeover Jajpur Road?",
        answer:
          "Basic trims start at ₹200, while signature designer layer cuts with blow-dry range from ₹400 to ₹700.",
      },
      {
        question: "Do you provide traditional floral gajra hairstyles for brides?",
        answer:
          "Yes, we specialize in Odia bridal braids, traditional donut buns with fresh jasmine/mogra gajra, and contemporary messy floral buns.",
      },
      {
        question: "Can I get my hair styled without makeup?",
        answer:
          "Absolutely. You can book standalone hair styling, blowout, or haircut appointments anytime.",
      },
      {
        question: "How long do thermal curls last in humid weather?",
        answer:
          "With our professional thermal barrier prep and humidity-resistant hair sprays, curls comfortably last 8 to 12 hours.",
      },
      {
        question: "Do you offer hair treatments like spa and deep conditioning?",
        answer:
          "Yes, we provide L'Oreal and Matrix deep conditioning spas to restore shine and reverse split-end dryness.",
      },
    ],
    relatedServices: [
      { name: "Hair Smoothening", slug: "hair-smoothening", price: "₹3,999" },
      { name: "Party Makeup", slug: "party-makeup", price: "₹2,500" },
      { name: "Bridal Makeup", slug: "bridal-makeup", price: "₹8,000" },
    ],
    relatedBlogSlugs: ["hairstyles-for-odia-weddings", "wedding-day-makeup-checklist"],
  },

  "hydra-facial": {
    slug: "hydra-facial",
    title: "Hydra Facial & Glow Treatments",
    seoTitle: "Hydra Facial in Jajpur Road | Elegance Makeover",
    metaDescription:
      "Instant bridal glow with 7-step medical-grade Hydra Facial in Jajpur Road, Odisha. Deep pore extraction, hydration & brightening. Book appointment.",
    category: "Parlour",
    price: "₹2,499 - ₹4,999",
    rawPrice: 2499,
    duration: "60 - 75 minutes",
    quickAnswer:
      "Hydra Facial at Elegance Makeover starts at ₹2,499 in Jajpur Road. This 7-in-1 clinical skincare treatment uses vortex suction to painlessly vacuum blackheads, exfoliate dead surface cells, and infuse antioxidant hyaluronic peptides for an instant, glass-skin glow with zero downtime.",
    whatsIncluded: [
      "Ultrasonic double cleanse and dead skin cell exfoliation",
      "Vortex-suction painless blackhead and sebum extraction",
      "Enzyme brightening peel with botanical AHA/BHA",
      "Hyaluronic acid & vitamin peptide serum infusion",
      "Cryo-cooling wand soothing to tighten open pores",
      "Bio-microcurrent skin lifting & tightening",
      "LED phototherapy light mask targeted to skin needs",
    ],
    whoItsFor:
      "Brides-to-be, people with dull skin, congested pores, pigmentation, or dry patches looking for an instant radiant glow before big weddings and functions.",
    processSteps: [
      {
        stepNumber: 1,
        title: "Cleanse & Micro-Exfoliation",
        desc: "Gentle lactic acid and fruit enzymes are swept over the skin to dissolve dead cellular debris.",
      },
      {
        stepNumber: 2,
        title: "Vortex Pore Extraction",
        desc: "Painless suction extracts sebum plugs, stubborn blackheads, and environmental pollution from pores.",
      },
      {
        stepNumber: 3,
        title: "Antioxidant & Hyaluronic Infusion",
        desc: "A rich cocktail of peptides, niacinamide, and low-molecular hyaluronic acid is deeply infused under positive pressure.",
      },
      {
        stepNumber: 4,
        title: "Cryo-Tightening & LED Therapy",
        desc: "Cold therapy locks active serums deep in the dermis while calming redness, followed by collagen-stimulating LED lights.",
      },
    ],
    prepTips: [
      "Avoid waxing or threading facial hair for 48 hours before the facial.",
      "Discontinue strong retinol or prescription chemical acids 3 days prior.",
    ],
    aftercareTips: [
      "Avoid direct sun exposure for 24 hours; apply SPF 50 generously.",
      "Do not apply heavy makeup for 12 hours to let skin breathe and absorb peptides.",
      "Stay hydrated to prolong the plumping effect.",
    ],
    faqs: [
      {
        question: "How much does a Hydra Facial cost in Jajpur Road?",
        answer:
          "Our Hydra Facial sessions start at ₹2,499 for the 5-step express glow and ₹4,999 for the complete 7-step medical-grade bridal infusion with LED therapy.",
      },
      {
        question: "When should a bride get a Hydra Facial before her wedding?",
        answer:
          "We recommend getting your Hydra Facial 3 to 5 days before your first wedding function for peak radiant, plump glass skin on your big day.",
      },
      {
        question: "Does Hydra Facial hurt or cause redness?",
        answer:
          "No, Hydra Facial is non-invasive and virtually painless. You will feel cool water suction, leaving your skin plump and refreshed with zero downtime.",
      },
      {
        question: "Can Hydra Facial help with acne scars and pigmentation?",
        answer:
          "Yes, regular sessions improve cell turnover, clear clogged pores, and fade superficial post-acne pigmentation over time.",
      },
      {
        question: "How often should I get a Hydra Facial?",
        answer:
          "For maintenance, once every 4 to 6 weeks is recommended to keep pores clear and skin glowing.",
      },
    ],
    relatedServices: [
      { name: "Bridal Makeup", slug: "bridal-makeup", price: "₹8,000" },
      { name: "HD Airbrush Bridal Makeup", slug: "hd-airbrush-bridal-makeup", price: "₹14,999" },
      { name: "Hair Smoothening", slug: "hair-smoothening", price: "₹3,999" },
    ],
    relatedBlogSlugs: ["pre-bridal-skincare-timeline", "bridal-makeup-for-all-skin-tones"],
  },

  "hair-smoothening": {
    slug: "hair-smoothening",
    title: "Hair Smoothening & Keratin",
    seoTitle: "Hair Smoothening in Jajpur Road | Elegance Makeover",
    metaDescription:
      "Silky, frizz-free hair smoothening, keratin & botox treatments in Jajpur Road, Odisha. Salon-grade care from ₹3,999. Book appointment at Elegance.",
    category: "Parlour",
    price: "₹3,999 - ₹7,999",
    rawPrice: 3999,
    duration: "3 - 5 hours",
    quickAnswer:
      "Hair smoothening and keratin therapy at Elegance Makeover starts at ₹3,999 in Jajpur Road. Using certified formaldehyde-free L'Oreal Professionnel and GK Keratin formulas, our chemical smoothing eliminates stubborn frizz, straightens unruly waves, and gives glossy, mirror-like softness lasting 6 to 10 months.",
    whatsIncluded: [
      "Comprehensive hair strand porosity and elasticity test",
      "Deep clarifying wash to remove silicone and mineral buildup",
      "Precision protein and smoothing cream application",
      "Controlled thermal flat-iron sealing at exact cuticle temperatures",
      "Neutralizer wash and ultra-nourishing protein masque",
      "Haircut trim and post-treatment blow dry",
    ],
    whoItsFor:
      "Women struggling with frizzy, unmanageable, wavy, or unruly hair caused by coastal Odisha humidity who want effortless, salon-sleek hair every day.",
    processSteps: [
      {
        stepNumber: 1,
        title: "Strand Elasticity Check",
        desc: "We analyze your hair's tensile strength and chemical history (henna, color, bleach) to pick the safe product formulation.",
      },
      {
        stepNumber: 2,
        title: "Clarifying Wash & Sectioning",
        desc: "Hair is stripped of impurities and dried in micro-sections for uniform cream distribution.",
      },
      {
        stepNumber: 3,
        title: "Smoothing Formula Application & Ironing",
        desc: "The keratin protein or smoothing solution is worked into every strand, processed, and sealed with ceramic plates.",
      },
      {
        stepNumber: 4,
        title: "Neutralizing & Hydration Lock",
        desc: "The structural bond is permanently stabilized, followed by a conditioning seal to lock high gloss shine.",
      },
    ],
    prepTips: [
      "Do not apply henna or heavy oils on hair for at least 2 weeks before chemical smoothening.",
      "Set aside 3 to 5 hours for the complete thorough procedure.",
    ],
    aftercareTips: [
      "Do not wet, wash, tie, clip, or tuck hair behind ears for the first 48 to 72 hours.",
      "Always use sulfate-free and paraben-free shampoo and conditioner to preserve straightness.",
      "Sleep on a silk or satin pillowcase to minimize mechanical friction.",
    ],
    faqs: [
      {
        question: "How long does hair smoothening last?",
        answer:
          "Professional hair smoothening lasts 6 to 10 months depending on your natural hair growth cycle and your post-treatment care routine.",
      },
      {
        question: "What is the cost of hair smoothening in Jajpur Road?",
        answer:
          "Prices range from ₹3,999 for shoulder-length hair to ₹7,999 for thick, waist-length hair.",
      },
      {
        question: "Is smoothening different from keratin treatment?",
        answer:
          "Smoothening chemically rearranges hair bonds for pin-straight results. Keratin is a protein restoration therapy that eliminates frizz and relaxes curls by 60-70% while preserving natural volume.",
      },
      {
        question: "Can I oil my hair after smoothening?",
        answer:
          "You should avoid hair oils for the first 15 to 20 days. Afterward, you may use light argan or jojoba serum sparingly.",
      },
      {
        question: "Will smoothening damage my hair?",
        answer:
          "When performed by certified professionals with controlled heat and genuine products, damage is minimized and hair feels substantially softer.",
      },
    ],
    relatedServices: [
      { name: "Hair Styling", slug: "hair-styling", price: "₹800" },
      { name: "Hydra Facial", slug: "hydra-facial", price: "₹2,499" },
      { name: "Bridal Makeup", slug: "bridal-makeup", price: "₹8,000" },
    ],
    relatedBlogSlugs: ["pre-bridal-skincare-timeline", "hairstyles-for-odia-weddings"],
  },

  "makeup-academy-course": {
    slug: "makeup-academy-course",
    title: "Professional Makeup Academy Course",
    seoTitle: "Makeup Academy Course in Jajpur Road | Elegance",
    metaDescription:
      "Certified professional makeup artist course in Jajpur Road, Odisha. 1-to-1 mentorship, live bridal models, vanity kit & ISO certificate. Enroll today.",
    category: "Academy",
    price: "₹15,000 - ₹35,000",
    rawPrice: 15000,
    duration: "1 Month to 3 Months",
    quickAnswer:
      "The Professional Makeup Academy Course at Elegance Makeover & Academy in Jajpur Road costs ₹15,000 to ₹35,000. Mentored directly by founder Rasmirekha Swain, the hands-on curriculum covers color theory, HD base creation, airbrush mastery, eye sculpting, saree draping, and client business marketing with recognized certification.",
    whatsIncluded: [
      "100% hands-on practical training on live human models",
      "Full makeup vanity kit and brush set guidance",
      "Mastery of HD bridal, party, reception, and airbrush techniques",
      "Traditional Odia bridal saree draping & jewellery setting modules",
      "Photography, lighting, and social media reels portfolio building",
      "Government-standard completion certificate & internship options",
      "Lifetime WhatsApp artist mentorship & career placement guidance",
    ],
    whoItsFor:
      "Aspiring makeup artists, parlour owners seeking skill upgrades, students in Jajpur, Cuttack, and Bhubaneswar wanting a lucrative beauty career, and passionate beginners.",
    processSteps: [
      {
        stepNumber: 1,
        title: "Color Theory & Skin Science",
        desc: "Understand warm/cool undertones, color wheel correction, skin conditions, and ingredient chemistries.",
      },
      {
        stepNumber: 2,
        title: "HD Foundation & Flawless Base Mastery",
        desc: "Learn brush pressure, sponge stippling, contour placement, and high-longevity setting powders.",
      },
      {
        stepNumber: 3,
        title: "Advanced Eye Artistry & Airbrushing",
        desc: "Master smokey cut-crease, glitter application, winged liner geometry, and precision airbrush spray control.",
      },
      {
        stepNumber: 4,
        title: "Bridal Portfolio & Business Setup",
        desc: "Perform end-to-end bridal makeovers on live models, shoot high-res portfolio images, and learn client pricing strategy.",
      },
    ],
    prepTips: [
      "No prior makeup experience is required; we teach from foundational basics up to celebrity level.",
      "Bring a notebook and commitment to daily hands-on practice.",
    ],
    aftercareTips: [
      "Practice techniques on different skin tones and textures within 48 hours of each module.",
      "Share your practice pictures in our private student review group for instant critiques.",
    ],
    faqs: [
      {
        question: "Which is the best makeup academy in Jajpur Road and nearby districts?",
        answer:
          "Elegance Makeover & Academy is the top-rated bridal beauty academy in Jajpur Road, offering certified 1-on-1 mentorship by Master Artist Rasmirekha Swain with real model practice.",
      },
      {
        question: "What is the fee for the makeup artist course?",
        answer:
          "Course fees range from ₹15,000 for the 1-month intensive foundation to ₹35,000 for the comprehensive 3-month Master Bridal & Airbrush Diploma. Flexible installment options are available.",
      },
      {
        question: "Do students get a certificate after completion?",
        answer:
          "Yes, students receive a verified Elegance Academy Certificate of Completion upon passing their final bridal practical exam.",
      },
      {
        question: "Are products provided during classroom practice?",
        answer:
          "Yes, all cosmetics, vanity products, and tools are provided for classroom training so students can practice without upfront tool costs.",
      },
      {
        question: "Can I start earning immediately after the course?",
        answer:
          "Yes, our graduates start booking freelance party makeup, bridal clients, or opening their own beauty studios within weeks of graduation.",
      },
    ],
    relatedServices: [
      { name: "Bridal Makeup", slug: "bridal-makeup", price: "₹8,000" },
      { name: "HD Airbrush Bridal Makeup", slug: "hd-airbrush-bridal-makeup", price: "₹14,999" },
      { name: "Hydra Facial", slug: "hydra-facial", price: "₹2,499" },
    ],
    relatedBlogSlugs: ["makeup-artist-course-fees-career-odisha", "bridal-makeup-cost-odisha"],
    courseDetails: {
      duration: "30 to 90 Days (Flexible Batches)",
      certification: "Certified Professional Makeup Artist Diploma",
      syllabus: [
        "Skin Physiology & Undertone Analysis",
        "Color Wheel & Pigment Neutralization",
        "HD Base Formulation & Blending Techniques",
        "Smokey, Cut-Crease & Haldi/Mehendi Eye Looks",
        "Silicone Airbrush System Operation & Cleaning",
        "Odia Bridal Saree & Lehenga Draping Arts",
        "Hair Updos, Curls & Floral Mukut Integration",
        "Social Media Branding, Reels & Client Pricing",
      ],
      fee: "₹15,000 - ₹35,000",
      mode: "Onsite Practical Studio Training",
      provider: "Elegance Makeover & Academy",
    },
  },
};
