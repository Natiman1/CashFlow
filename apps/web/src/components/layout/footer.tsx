import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Brand */}
          <div>
            <h3 className="font-semibold">FinanceTracker</h3>
            <p className="mt-2 text-sm text-gray-600 max-w-sm">
              Simple, secure personal finance tracking for everyone.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2">
              <span className="font-medium">Product</span>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Features
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium">Company</span>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} FinanceTracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
