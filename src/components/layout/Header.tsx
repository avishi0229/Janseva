import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Globe, Sun, Moon, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onToggleLargeText?: () => void;
  isLargeText?: boolean;
}

const Header = ({ onToggleLargeText, isLargeText }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/report", label: "Report Issue" },
    { href: "/track", label: "Track Issue" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/youth-portal", label: "Youth Squad" },
    { href: "/about", label: "About" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border shadow-sm">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <nav className="section-container py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 font-bold text-xl md:text-2xl text-primary focus-visible:ring-4 rounded-lg"
            aria-label="JANSEVA Home"
          >
            <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center text-white font-bold text-lg">
              JS
            </div>
            <span className="hidden sm:inline">JANSEVA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-xl text-lg font-medium transition-colors touch-target flex items-center justify-center
                  ${isActive(link.href) 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-muted"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Accessibility Controls */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleLargeText}
              className="touch-target"
              aria-label={isLargeText ? "Use normal text size" : "Use larger text size"}
            >
              {isLargeText ? <ZoomOut className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="touch-target"
              aria-label="Change language"
            >
              <Globe className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              className="gap-2 touch-target"
              aria-label="Emergency helpline"
            >
              <Phone className="w-5 h-5" />
              <span className="hidden xl:inline">1800-XXX-XXXX</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden touch-target"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-5 py-4 rounded-xl text-lg font-medium transition-colors
                    ${isActive(link.href) 
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground hover:bg-muted"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleLargeText}
                  className="touch-target"
                  aria-label={isLargeText ? "Use normal text size" : "Use larger text size"}
                >
                  {isLargeText ? <ZoomOut className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="touch-target"
                  aria-label="Change language"
                >
                  <Globe className="w-6 h-6" />
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 gap-2 touch-target"
                  aria-label="Emergency helpline"
                >
                  <Phone className="w-5 h-5" />
                  <span>1800-XXX-XXXX</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
