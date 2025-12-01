import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGavel } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Help", path: "/help" },
    { name: "Contact", path: "/contact" },
    { name: "How Gavel Work", path: "/how-gavel-work" },
    { name: "Login", path: "/login" },
    { name: "Signup", path: "/signup" },
  ];

  return (
    <header className="sticky top-1 z-50 w-full px-4 xl:px-16 backdrop-blur-xl shadow-md" >
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaGavel className="text-secondary text-3xl" />
          <span className="text-2xl font-bold text-secondary">Gavel</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
          {links.map((link) => {
            return (
              link.name !== "Login" && link.name !== "Signup" && <Link
                key={link.name}
                to={link.path}
                className={`font-medium text-lg transition-colors ${location.pathname === link.path
                  ? "text-secondary"
                  : "text-foreground hover:text-secondary"
                  }`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>
        <div className="hidden lg:flex gap-2 items-center ">
          <Link to="/login">
            <Button variant="ghost" className="text-lg p-6 py-3 rounded-full border border-secondary">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" className="text-lg p-6 py-3 rounded-full border text-foreground bg-secondary/80 hover:bg-secondary/60 hover:text-foreground">
              Signup
            </Button>
          </Link>
        </div>

        {/* Mobile Menu (Sheet) */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="text-5xl">
              <svg className="w-6 h-6 text-secondary/60" viewBox="0 0 22 20" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-5 mt-8 px-4">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors ${location.pathname === link.path
                      ? "text-secondary"
                      : "text-foreground hover:text-secondary"
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
