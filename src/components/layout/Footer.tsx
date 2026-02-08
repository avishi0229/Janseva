import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
} from "lucide-react";

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
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center text-white font-bold text-sm">
                JS
              </div>
              <span className="font-bold text-xl">JANSEVA</span>
            </div>
            <p className="text-background/80 text-sm">
              Where every citizen’s voice matters. A civic platform for reporting
              and tracking municipal issues.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-background/80 hover:text-background text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-base mb-3">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-background/80 hover:text-background text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base mb-3">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Helpline</p>
                  <a
                    href="tel:1800XXXXXXX"
                    className="text-background/80 text-sm"
                  >
                    1800-XXX-XXXX
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href="mailto:support@janseva.gov.in"
                    className="text-background/80 text-sm"
                  >
                    support@janseva.gov.in
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5" />
                <p className="text-background/80 text-sm">
                  Municipal Corporation Office,
                  <br />
                  City Center
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-background/70 text-xs text-center md:text-left">
              © {currentYear} JANSEVA. All rights reserved.
            </p>
            <p className="text-background/70 text-xs text-center md:text-right">
              Designed for accessibility.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
