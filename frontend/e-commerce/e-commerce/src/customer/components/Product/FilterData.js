export const color = [
  "white",
  "black",
  "red",
  "maroon",
  "beige",
  "pink",
  "green",
  "yellow",
  "blue",
  "brown",
  "purple",
  "sky blue",
  "navy blue"
];

export const sizeOptionsByCategory = {
  top: ["S", "M", "L", "XL", "XXL"],

  "t-shirt": ["S", "M", "L", "XL", "XXL"],

  shirt: ["S", "M", "L", "XL", "XXL"],

  jacket: ["S", "M", "L", "XL", "XXL"],

  sweater: ["S", "M", "L", "XL", "XXL"],

  women_dress: ["S", "M", "L", "XL", "XXL"],

  mens_kurta: ["S", "M", "L", "XL", "XXL"],

  kurtas: ["S", "M", "L", "XL", "XXL"],

  men_jeans: ["28", "30", "32", "34", "36", "38", "40"],

  women_jeans: ["26", "28", "30", "32", "34", "36", "38"],

  shoes: ["6", "7", "8", "9", "10", "11"],

  lengha_choli: ["S", "M", "L", "XL", "XXL"],

  // Saree ला size नाही
  women_saree: [],
};


export const filters = [
  {
    id: "color",
    name: "Color",
    options: color.map((c) => ({
      value: c,
      label: c.charAt(0).toUpperCase() + c.slice(1),
    })),
  },
];


export const singleFilter = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "159-399", label: "₹159 To ₹399" },
      { value: "399-999", label: "₹399 To ₹999" },
      { value: "999-1999", label: "₹999 To ₹1999" },
      { value: "1999-2999", label: "₹1999 To ₹2999" },
      { value: "3999-4999", label: "₹3999 To ₹4999" },
    ],
  },

  {
    id: "discount",
    name: "Discount Range",
    options: [
      { value: "10", label: "10% And Above" },
      { value: "20", label: "20% And Above" },
      { value: "30", label: "30% And Above" },
      { value: "40", label: "40% And Above" },
      { value: "50", label: "50% And Above" },
      { value: "60", label: "60% And Above" },
      { value: "70", label: "70% And Above" },
      { value: "80", label: "80% And Above" },
    ],
  },

  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in_stock", label: "In Stock" },
      { value: "out_stock", label: "Out Of Stock" },
    ],
  },
];