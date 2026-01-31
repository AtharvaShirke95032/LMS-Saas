"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/aceternity/resizable-navbar";
import { useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function NavbarDemo() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Companions", href: "/companions" },
    { name: "Pricing", href: "/subscription" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "My Learnings", href: "/my-journey" },
   
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full p-2 sm:p-4 lg:p-5">
      <Navbar className="fixed top-0 border-0 p-4 sm:p-6 lg:p-10">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            
            <SignedOut>
              <SignInButton>
                <NavbarButton
                  variant="dark"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </NavbarButton>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />

            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
            <SignedIn>
              <NavbarButton
                variant="dark"
                className="w-fit"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <UserButton />
              </NavbarButton>
            </SignedIn>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.href}
                prefetch={true}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              <SignedOut>
                <SignInButton>
                  <NavbarButton
                    variant="dark"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign
                  </NavbarButton>
                </SignInButton>
              </SignedOut>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export default NavbarDemo;
