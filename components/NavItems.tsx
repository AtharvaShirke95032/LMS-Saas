"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "Pricing", href: "/subscription" },
  { label: "My Learnings", href: "/my-journey" },
  { label: "notes", href: "/notes" },
];

const NavItems = () => {
  const pathname = usePathname();
  console.log("pathname:",pathname);
  return (
    <nav className="flex items-center gap-4">
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          className={cn(pathname === href && "text-[#93cf2f] font-semibold" )}
        >
          {label}
        </Link>
      ))}
      
    </nav>
    
    
  );
};

export default NavItems;
