import { useState } from "react";

// داخل مكون Footer:
import React from "react";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";

import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Company */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
              {/* Logo */}
              <img
                src="/logo1.png"
                alt="Vanguard Development Logo"
                width={200}
                height={200}
              />
            </div>

            <p className="text-gray-300 leading-relaxed text-sm sm:text-base text-center sm:text-left">
              Redefining luxury and sustainability in urban development.
              Creating exceptional communities that blend modern architecture
              with natural beauty.
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-sm">Cairo, Egypt</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-300">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="tel:+201500800501"
                  className="text-sm hover:text-emerald-400 transition-colors"
                >
                  +20 150 080 0501
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="mailto:info@vd-eg.com"
                  className="text-sm hover:text-emerald-400 transition-colors break-all"
                >
                  info@vd-eg.com
                </a>
              </div>
            </div>
          </div>

          {/* Social & Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
            <div className="flex justify-center sm:justify-start gap-3 mb-6">
              {[
                {
                  Icon: Facebook,
                  href: "https://www.facebook.com/vanguardDevelopment1",
                  color: "hover:text-blue-400",
                },
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/vanguard__development/",
                  color: "hover:text-pink-400",
                },
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/company/vanguard-development",
                  color: "hover:text-blue-500",
                },
                {
                  Icon: Twitter,
                  href: "https://x.com/Vanguardde80801",
                  color: "hover:text-sky-400",
                },
                {
                  Icon: FaTiktok,
                  href: "https://www.tiktok.com/@vanguarddevelopme",
                  color: "hover:text-pink-400",
                },
              ].map(({ Icon, href, color }, index) => (
                <a
                  key={index}
                  href={href}
                  className={`w-8 h-8 flex items-center justify-center text-gray-400 ${color} transition-colors duration-300 hover:scale-110`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-center sm:text-left">
          <div className="text-gray-400 text-xs sm:text-sm order-2 sm:order-1">
            © 2025 Vanguard Development. All rights reserved.
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm order-1 sm:order-2">
            <a
              href="https://wa.me/201505374793"
              title="المطور"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-1"
            >
              {hovered ? (
                <FaWhatsapp className="w-4 h-4" />
              ) : (
                <span className=" font-bold font-mono">&lt;/&gt;</span>
              )}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
