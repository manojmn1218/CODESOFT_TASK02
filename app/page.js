import Link from "next/link";
import Image from "next/image";

// Popular dishes shown on homepage — these match our menu data
const popularDishes = [
  {
    name: "Butter Chicken",
    image: "/images/menu/butter-chicken.jpg",
    price: 360,
    description: "Tender chicken in a rich, creamy tomato sauce",
  },
  {
    name: "Margherita Pizza",
    image: "/images/menu/margherita-pizza.jpg",
    price: 299,
    description: "Fresh mozzarella, tomato sauce, and basil",
  },
  {
    name: "Classic Burger",
    image: "/images/menu/classic-burger.jpg",
    price: 220,
    description: "Beef patty with lettuce, tomato, and cheese",
  },
];

const steps = [
  {
    icon: "📋",
    title: "Browse the Menu",
    description: "Pick your favorites from our selection of dishes",
  },
  {
    icon: "🛒",
    title: "Place Your Order",
    description: "Add to cart and checkout — delivery or pickup",
  },
  {
    icon: "🍽️",
    title: "Enjoy Your Meal",
    description: "Track your order and dig in when it arrives",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-text leading-tight">
              Good food,
              <br />
              <span className="text-brown">simply served.</span>
            </h1>
            <p className="mt-4 text-text-muted text-lg leading-relaxed max-w-lg">
              We keep things simple — fresh ingredients, honest cooking, and a
              warm welcome every time. No fuss, just really good food.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/menu" className="btn-primary inline-block">
                View Our Menu
              </Link>
              <Link href="/reservation" className="btn-secondary inline-block">
                Reserve a Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular dishes */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-text">
            Popular Right Now
          </h2>
          <p className="mt-2 text-text-muted">
            What our regulars can&apos;t stop ordering
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDishes.map((dish) => (
              <div
                key={dish.name}
                className="bg-white rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-semibold text-lg">
                      {dish.name}
                    </h3>
                    <span className="text-brown font-semibold">
                      ₹{dish.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-text-muted">
                    {dish.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/menu"
              className="text-brown font-medium hover:text-brown-dark transition-colors text-sm"
            >
              See the full menu →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-text text-center">
            How It Works
          </h2>
          <p className="mt-2 text-text-muted text-center">
            Getting your food is easy
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="font-heading text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-brown rounded-lg px-8 py-12 md:py-16 text-center text-white">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold">
              Dining In?
            </h2>
            <p className="mt-3 text-white/80 max-w-md mx-auto">
              Book a table and we&apos;ll have everything ready when you arrive.
              Walk-ins welcome too, but reservations guarantee your spot.
            </p>
            <Link
              href="/reservation"
              className="mt-6 inline-block bg-white text-brown px-6 py-3 rounded-md font-medium hover:bg-cream transition-colors"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
