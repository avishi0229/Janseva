import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/report", label: "Report an Issue" },
    { href: "/track", label: "Track Issue" },
    { href: "/dashboard", label: "Public Dashboard" },
    { href: "/youth-portal", label: "Youth Squad" },
    { href: "/about", label: "About Us" },
  ];

  const supportLinks = [
    { href: "/faq", label: "FAQs" },
    { href: "/guide", label: "User Guide" },
    { href: "/accessibility", label: "Accessibility" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ];

  return (
    <footer className="bg-foreground text-background" role="contentinfo">
      <div className="section-container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center text-white font-bold text-lg">
                JS
              </div>
              <span className="font-bold text-2xl">JANSEVA</span>
            </div>
            <p className="text-background/80 text-lg">
              Where Every Citizen's Voice Matters. An inclusive civic engagement platform 
              for reporting and tracking municipal issues.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-background/10 hover:bg-background/20 transition-colors touch-target"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-background/10 hover:bg-background/20 transition-colors touch-target"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-background/10 hover:bg-background/20 transition-colors touch-target"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-background/10 hover:bg-background/20 transition-colors touch-target"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-background/80 hover:text-background text-lg transition-colors inline-block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-xl mb-4">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-background/80 hover:text-background text-lg transition-colors inline-block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-xl mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-lg font-semibold">Helpline (Toll-Free)</p>
                  <a href="tel:1800XXXXXXX" className="text-background/80 hover:text-background">
                    1800-XXX-XXXX
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-lg font-semibold">Email Support</p>
                  <a href="mailto:support@janseva.gov.in" className="text-background/80 hover:text-background">
                    support@janseva.gov.in
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-lg font-semibold">Office Address</p>
                  <p className="text-background/80">
                    Municipal Corporation Office,<br />
                    City Center, Your City
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/70 text-center md:text-left">
              © {currentYear} JANSEVA. All rights reserved. A Government of India Initiative.
            </p>
            <p className="text-background/70 text-sm text-center md:text-right">
              Designed for accessibility. Built for everyone.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
