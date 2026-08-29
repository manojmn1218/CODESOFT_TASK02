import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brown-dark text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🍽️</span>
              <span className="font-heading text-lg font-semibold">
                DineDesk
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Good food, simply served. We believe great meals don&apos;t need
              to be complicated — just fresh ingredients and honest cooking.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/menu" className="hover:text-white transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="hover:text-white transition-colors">
                  Reserve a Table
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-3">
              Visit Us
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>123 Main Street, Downtown</li>
              <li>Open daily: 11 AM – 10 PM</li>
              <li>Phone: (555) 123-4567</li>
              <li>hello@dinedesk.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} DineDesk. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
