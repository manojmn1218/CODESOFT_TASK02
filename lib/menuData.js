// Static menu data — used until we connect to the database in Stage 3
const menuItems = [
  // Starters
  {
    id: 1,
    name: "Crispy Samosas",
    description: "Golden pastry pockets stuffed with spiced potatoes and peas, served with mint chutney",
    price: 120,
    category: "Starters",
    image: "/images/menu/samosas.jpg",
  },
  {
    id: 2,
    name: "Tomato Basil Soup",
    description: "Smooth roasted tomato soup finished with cream and fresh basil",
    price: 150,
    category: "Starters",
    image: "/images/menu/tomato-soup.jpg",
  },
  {
    id: 3,
    name: "Bruschetta",
    description: "Toasted ciabatta topped with diced tomatoes, garlic, basil, and olive oil",
    price: 190,
    category: "Starters",
    image: "/images/menu/bruschetta.jpg",
  },

  // Main Course
  {
    id: 4,
    name: "Grilled Chicken",
    description: "Herb-marinated chicken breast with roasted seasonal vegetables",
    price: 380,
    category: "Main Course",
    image: "/images/menu/grilled-chicken.jpg",
  },
  {
    id: 5,
    name: "Butter Chicken",
    description: "Tender chicken pieces in a rich, creamy tomato and butter sauce with naan",
    price: 360,
    category: "Main Course",
    image: "/images/menu/butter-chicken.jpg",
  },
  {
    id: 6,
    name: "Pasta Carbonara",
    description: "Spaghetti tossed with crispy bacon, parmesan, egg, and black pepper",
    price: 320,
    category: "Main Course",
    image: "/images/menu/pasta-carbonara.jpg",
  },
  {
    id: 7,
    name: "Fish & Chips",
    description: "Beer-battered cod fillet with thick-cut fries, tartar sauce, and lemon",
    price: 350,
    category: "Main Course",
    image: "/images/menu/fish-and-chips.jpg",
  },
  {
    id: 8,
    name: "Paneer Tikka",
    description: "Char-grilled cottage cheese and peppers with spiced yogurt marinade",
    price: 280,
    category: "Main Course",
    image: "/images/menu/paneer-tikka.jpg",
  },

  // Pizza
  {
    id: 9,
    name: "Margherita Pizza",
    description: "Classic Neapolitan with San Marzano tomatoes, fresh mozzarella, and basil",
    price: 299,
    category: "Pizza",
    image: "/images/menu/margherita-pizza.jpg",
  },
  {
    id: 10,
    name: "Pepperoni Pizza",
    description: "Loaded with spicy pepperoni, mozzarella, and a hint of oregano",
    price: 399,
    category: "Pizza",
    image: "/images/menu/pepperoni-pizza.jpg",
  },

  // Burgers
  {
    id: 11,
    name: "Classic Cheeseburger",
    description: "Beef patty with cheddar, lettuce, tomato, and pickles on a sesame bun",
    price: 220,
    category: "Burgers",
    image: "/images/menu/classic-burger.jpg",
  },
  {
    id: 12,
    name: "BBQ Bacon Burger",
    description: "Smoky BBQ sauce, crispy bacon, caramelized onions, and melted cheese",
    price: 270,
    category: "Burgers",
    image: "/images/menu/bbq-burger.jpg",
  },

  // Desserts
  {
    id: 13,
    name: "Chocolate Brownie",
    description: "Warm fudgy brownie topped with vanilla ice cream and chocolate sauce",
    price: 180,
    category: "Desserts",
    image: "/images/menu/chocolate-brownie.jpg",
  },
  {
    id: 14,
    name: "Tiramisu",
    description: "Layers of coffee-soaked ladyfingers and mascarpone cream dusted with cocoa",
    price: 220,
    category: "Desserts",
    image: "/images/menu/tiramisu.jpg",
  },

  // Drinks
  {
    id: 15,
    name: "Fresh Lemonade",
    description: "House-made lemonade with fresh mint and a hint of ginger",
    price: 90,
    category: "Drinks",
    image: "/images/menu/lemonade.jpg",
  },
  {
    id: 16,
    name: "Mango Lassi",
    description: "Creamy yogurt smoothie blended with ripe Alphonso mangoes",
    price: 120,
    category: "Drinks",
    image: "/images/menu/mango-lassi.jpg",
  },
];

export const categories = [
  "All",
  "Starters",
  "Main Course",
  "Pizza",
  "Burgers",
  "Desserts",
  "Drinks",
];

export default menuItems;
