"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import NavLink from "@/components/ui/nav-link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
          FinanceTracker
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          {/* <Link
            href="#features"
            className="hover:text-gray-900 border-b-4 border-white hover:border-primary-500 py-2 active:border-primary-500"
          >
            Features
          </Link>
          <Link href="#how-it-works" className="hover:text-gray-900 hover:border-b-4 border-b-4 border-white hover:border-primary-500 py-2">
            How it works
          </Link>
          <Link href="#pricing" className="hover:text-gray-900 hover:border-b-4 border-b-4 border-white hover:border-primary-500 py-2">
            Pricing
          </Link> */}
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How it works</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Login
          </Link>
          <Link href="/register">
            <Button size="sm">Get started</Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white ">
          <nav className="flex flex-col gap-4 px-6 py-6 text-sm">
            <Link href="#features" onClick={() => setOpen(false)}>
              Features
            </Link>
            <Link href="#how-it-works" onClick={() => setOpen(false)}>
              How it works
            </Link>
            <Link href="#pricing" onClick={() => setOpen(false)}>
              Pricing
            </Link>

            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-gray-600"
              >
                Login
              </Link>
              <Button onClick={() => setOpen(false)}>Get started</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
