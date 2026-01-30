"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Menu, X } from "lucide-react";
import NavLink from "@/components/ui/nav-link";
import LinkBtn from "@/components/ui/link-btn";
import { signOut, useSession } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold text-gray-900">
          CashFlow
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How it works</NavLink>
          <NavLink href="#overview">Overview</NavLink>
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-5">
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                 
                    <Avatar className="cursor-pointer">
                      <AvatarFallback className="bg-primary-500 text-white">
                        {session.user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div>
                      <p>{session.user.name}</p>
                      <p>{session.user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel onClick={() => signOut()}>
                    Logout
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <LinkBtn href="/login">
                Login
                <ChevronRight className="h-4 w-4" />
              </LinkBtn>
              <Link href="/register">
                <Button size="sm">Get started</Button>
              </Link>
            </>
          )}
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
              Overview
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
