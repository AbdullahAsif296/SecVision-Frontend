"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";

export default function Navigation() {
  const location = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glassmorphism">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group" data-testid="logo-link">
            <div className="w-8 h-8 relative">
              <Image 
                src="/logo.svg" 
                alt="SecureVision" 
                width={32} 
                height={32} 
                className="transition-transform group-hover:scale-110" 
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SecureVision
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-accent transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-accent after:w-0 hover:after:w-full after:transition-all ${
                  location === item.href ? "text-accent" : ""
                }`}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-sm font-medium hover:text-accent" data-testid="button-signin">
              Sign In
            </Button>
            <Link href="/demo">
              <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 transition-transform" data-testid="button-get-started">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glassmorphism">
              <div className="space-y-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block hover:text-accent transition-colors ${
                      location === item.href ? "text-accent" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                    data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-6 border-t border-border space-y-4">
                  <Button variant="ghost" className="w-full justify-start hover:text-accent" data-testid="mobile-button-signin">
                    Sign In
                  </Button>
                  <Link href="/demo" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white" data-testid="mobile-button-get-started">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
