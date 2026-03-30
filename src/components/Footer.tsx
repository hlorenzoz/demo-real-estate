import React from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, Instagram, Facebook } from "lucide-react";
import { Dictionary } from "../get-dictionary";

interface FooterProps {
  dict: Dictionary["footer"];
  lang: "en" | "es";
}

export default function Footer({ dict, lang }: FooterProps) {
  return (
    <footer className="bg-[#111111] text-white py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16">
        <div className="md:col-span-2">
          <Link href={`/${lang}`} className="flex flex-col mb-8">
            <span className="text-4xl font-serif text-white tracking-tighter leading-none">Real Estate</span>
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-primary-accent mt-2">{dict.excellence}</span>
          </Link>
          <p className="text-gray-400 max-w-sm text-lg leading-relaxed font-bold">
            {dict.agency_desc}
          </p>
        </div>
        <div>
          <h4 className="font-serif text-xl mb-8 gold-gradient italic">{dict.contact}</h4>
          <div className="space-y-4">
            <a href={`tel:${dict.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-gray-300 hover:text-primary-accent transition-all font-bold">
              <Phone size={18} /> {dict.phone}
            </a>
            <p className="flex items-start gap-3 text-gray-300 font-bold">
              <MapPin size={18} className="mt-1" /> {dict.address}
            </p>
            <p className="flex items-start gap-3 text-gray-300 font-bold">
              <Mail size={18} className="mt-1" /> {dict.email}
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-serif text-xl mb-8 gold-gradient italic">Agency</h4>
          <ul className="space-y-4">
            <li><Link href={`/${lang}/about-us`} className="text-gray-300 hover:text-primary-accent transition-all font-bold">About Us</Link></li>
            <li><Link href={`/${lang}/meet-the-team`} className="text-gray-300 hover:text-primary-accent transition-all font-bold">Meet The Team</Link></li>
            <li><Link href={`/${lang}/contact`} className="text-gray-300 hover:text-primary-accent transition-all font-bold">Contact</Link></li>
            <li><Link href={`/${lang}/terms-of-service`} className="text-gray-300 hover:text-primary-accent transition-all font-bold">Terms of Service</Link></li>
            <li><Link href={`/${lang}/privacy-policy`} className="text-gray-300 hover:text-primary-accent transition-all font-bold">Privacy Policy</Link></li>
            <li><Link href={`/${lang}/cookie-policy`} className="text-gray-300 hover:text-primary-accent transition-all font-bold">Cookie Policy</Link></li>
            <li><Link href={`/${lang}/gdpr`} className="text-gray-300 hover:text-primary-accent transition-all font-bold">GDPR</Link></li>
            <li><Link href={`/${lang}/sitemap`} className="text-gray-300 hover:text-primary-accent transition-all font-bold">Sitemap</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-xl mb-8 gold-gradient italic">{dict.follow}</h4>
          <div className="flex gap-4">
            <Link href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-accent hover:text-primary transition-all">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-accent hover:text-primary transition-all">
              <Facebook className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
