const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const menuItems = [
  {
    name: "Crispy Samosas",
    description: "Golden pastry pockets stuffed with spiced potatoes and peas, served with mint chutney",
    price: 120,
    category: "Starters",
    image: "/images/menu/samosas.jpg",
  },
  {
    name: "Tomato Basil Soup",
    description: "Smooth roasted tomato soup finished with cream and fresh basil",
    price: 150,
    category: "Starters",
    image: "/images/menu/tomato-soup.jpg",
  },
  {
    name: "Bruschetta",
    description: "Toasted ciabatta topped with diced tomatoes, garlic, basil, and olive oil",
    price: 190,
    category: "Starters",
    image: "/images/menu/bruschetta.jpg",
  },
  {
    name: "Grilled Chicken",
    description: "Herb-marinated chicken breast with roasted seasonal vegetables",
    price: 380,
    category: "Main Course",
    image: "/images/menu/grilled-chicken.jpg",
  },
  {
    name: "Butter Chicken",
    description: "Tender chicken pieces in a rich, creamy tomato and butter sauce with naan",
    price: 360,
    category: "Main Course",
    image: "/images/menu/butter-chicken.jpg",
  },
  {
    name: "Pasta Carbonara",
    description: "Spaghetti tossed with crispy bacon, parmesan, egg, and black pepper",
    price: 320,
    category: "Main Course",
    image: "/images/menu/pasta-carbonara.jpg",
  },
  {
    name: "Fish & Chips",
    description: "Beer-battered cod fillet with thick-cut fries, tartar sauce, and lemon",
    price: 350,
    category: "Main Course",
    image: "/images/menu/fish-and-chips.jpg",
  },
  {
    name: "Paneer Tikka",
    description: "Char-grilled cottage cheese and peppers with spiced yogurt marinade",
    price: 280,
    category: "Main Course",
    image: "/images/menu/paneer-tikka.jpg",
  },
  {
    name: "Margherita Pizza",
    description: "Classic Neapolitan with San Marzano tomatoes, fresh mozzarella, and basil",
    price: 299,
    category: "Pizza",
    image: "/images/menu/margherita-pizza.jpg",
  },
  {
    name: "Pepperoni Pizza",
    description: "Loaded with spicy pepperoni, mozzarella, and a hint of oregano",
    price: 399,
    category: "Pizza",
    image: "/images/menu/pepperoni-pizza.jpg",
  },
  {
    name: "Classic Cheeseburger",
    description: "Beef patty with cheddar, lettuce, tomato, and pickles on a sesame bun",
    price: 220,
    category: "Burgers",
    image: "/images/menu/classic-burger.jpg",
  },
  {
    name: "BBQ Bacon Burger",
    description: "Smoky BBQ sauce, crispy bacon, caramelized onions, and melted cheese",
    price: 270,
    category: "Burgers",
    image: "/images/menu/bbq-burger.jpg",
  },
  {
    name: "Chocolate Brownie",
    description: "Warm fudgy brownie topped with vanilla ice cream and chocolate sauce",
    price: 180,
    category: "Desserts",
    image: "/images/menu/chocolate-brownie.jpg",
  },
  {
    name: "Tiramisu",
    description: "Layers of coffee-soaked ladyfingers and mascarpone cream dusted with cocoa",
    price: 220,
    category: "Desserts",
    image: "/images/menu/tiramisu.jpg",
  },
  {
    name: "Fresh Lemonade",
    description: "House-made lemonade with fresh mint and a hint of ginger",
    price: 90,
    category: "Drinks",
    image: "/images/menu/lemonade.jpg",
  },
  {
    name: "Mango Lassi",
    description: "Creamy yogurt smoothie blended with ripe Alphonso mangoes",
    price: 120,
    category: "Drinks",
    image: "/images/menu/mango-lassi.jpg",
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.staff.deleteMany();

  // Seed menu items
  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item });
  }
  console.log(`Seeded ${menuItems.length} menu items`);

  // Seed staff account
  const hashedPassword = await bcrypt.hash("dinedesk2024", 10);
  await prisma.staff.create({
    data: {
      username: "admin",
      password: hashedPassword,
    },
  });
  console.log("Seeded staff account (admin / dinedesk2024)");

  console.log("Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
