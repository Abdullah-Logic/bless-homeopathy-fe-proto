export type ShopProduct = {
  name: string;
  priceLabel: string;
  description: string;
  imageSrc: string;
  category: "Dr. Reckeweg" | "Schuessler Salts";
};

export const shopProducts: ShopProduct[] = [
  {
    name: "R1",
    priceLabel: "$20.00 - $40.00",
    description:
      "Homeopathic medicine from Dr. Reckeweg. Available in multiple variants.",
    imageSrc: "/ecommerce/product-01.jpg",
    category: "Dr. Reckeweg",
  },
  {
    name: "R4",
    priceLabel: "$20.00 - $40.00",
    description:
      "Homeopathic medicine from Dr. Reckeweg. Available in multiple variants.",
    imageSrc: "/ecommerce/product-02.jpg",
    category: "Dr. Reckeweg",
  },
  {
    name: "R5",
    priceLabel: "$20.00 - $40.00",
    description:
      "Homeopathic medicine from Dr. Reckeweg. Available in multiple variants.",
    imageSrc: "/ecommerce/product-03.jpg",
    category: "Dr. Reckeweg",
  },
  {
    name: "R6",
    priceLabel: "$20.00 - $40.00",
    description:
      "Homeopathic medicine from Dr. Reckeweg. Available in multiple variants.",
    imageSrc: "/ecommerce/product-04.jpg",
    category: "Dr. Reckeweg",
  },
  {
    name: "R8 Jut-U-Sin Syrup",
    priceLabel: "$20.00",
    description: "Single-price homeopathic syrup from Dr. Reckeweg.",
    imageSrc: "/ecommerce/product-05.jpg",
    category: "Dr. Reckeweg",
  },
  {
    name: "R9",
    priceLabel: "$20.00 - $40.00",
    description:
      "Homeopathic medicine from Dr. Reckeweg. Available in multiple variants.",
    imageSrc: "/ecommerce/product-06.jpg",
    category: "Dr. Reckeweg",
  },
  {
    name: "R11",
    priceLabel: "$20.00 - $40.00",
    description:
      "Homeopathic medicine from Dr. Reckeweg. Available in multiple variants.",
    imageSrc: "/ecommerce/product-07.jpg",
    category: "Dr. Reckeweg",
  },
  {
    name: "R13",
    priceLabel: "$20.00 - $40.00",
    description:
      "Homeopathic medicine from Dr. Reckeweg. Available in multiple variants.",
    imageSrc: "/ecommerce/product-08.jpg",
    category: "Dr. Reckeweg",
  },
  {
    name: "R20",
    priceLabel: "$20.00 - $40.00",
    description:
      "Organotherapy remedy from Dr. Reckeweg. Use on practitioner advice.",
    imageSrc: "/ecommerce/product-01.jpg",
    category: "Dr. Reckeweg",
  },
];

export const shopCategories = [
  { name: "Dr. Reckeweg", count: 33 },
  { name: "Schuessler Salts", count: 12 },
] as const;

export const clinicInfo = {
  phoneDisplay: "604 (613) 8111",
  phoneHref: "tel:+16046138111",
  email: "info@blesshomeopathy.com",
  officeHours: "10:00 AM - 07:00 PM",
  address: "32860 Capilano Pl, Abbotsford, BC V2S 7B4",
  shopUrl: "https://blesshomeopathy.com/shop/",
} as const;
