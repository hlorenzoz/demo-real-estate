import React from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, Instagram, Facebook } from "lucide-react";
import { Dictionary } from "@/get-dictionary";
import { getLocalizedPath } from "@/lib/routes";

interface FooterProps {
  dict: Dictionary["footer"];
  lang: "en" | "es";
}

export default function Footer({ dict, lang }: FooterProps) {
  return (
    <footer className="bg-[#111111] text-white py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-12 gap-y-16 lg:gap-x-16">
        <div className="sm:col-span-2 md:col-span-2 lg:col-span-2">
          <Link href={`/${lang}`} className="flex flex-col mb-8">
            <span className="text-4xl font-serif text-white tracking-tighter leading-none">Real Estate</span>
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-primary-accent mt-2">{dict.excellence}</span>
          </Link>
          <p className="text-gray-200 max-w-sm text-lg leading-relaxed font-bold">
            {dict.agency_desc}
          </p>
        </div>
        <div>
          <h2 className="font-serif text-xl mb-8 gold-gradient italic">{dict.contact}</h2>
          <div className="space-y-4">
            <a href={`tel:${dict.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-gray-300 hover:text-primary-accent transition-all font-bold">
              <Phone size={18} /> {dict.phone}
            </a>
            <p className="flex items-start gap-3 text-gray-300 font-bold">
              <MapPin size={18} className="mt-1 shrink-0" /> {dict.address}
            </p>
            <a href={`mailto:${dict.email}`} className="flex items-start gap-3 text-gray-300 hover:text-primary-accent transition-all font-bold break-all">
              <Mail size={18} className="mt-1 shrink-0" /> {dict.email}
            </a>
          </div>
        </div>
        <div>
          <h2 className="font-serif text-xl mb-8 gold-gradient italic">{dict.about_us}</h2>
          <ul className="space-y-4">
            <li><Link href={getLocalizedPath(lang, 'about-us')} className="text-gray-100 hover:text-primary-accent transition-all font-bold">{dict.about_us}</Link></li>
            <li><Link href={getLocalizedPath(lang, 'meet-the-team')} className="text-gray-100 hover:text-primary-accent transition-all font-bold">{dict.team}</Link></li>
            <li><Link href={getLocalizedPath(lang, 'contact')} className="text-gray-100 hover:text-primary-accent transition-all font-bold">{dict.contact_nav}</Link></li>
            <li><Link href={getLocalizedPath(lang, 'terms-of-service')} className="text-gray-100 hover:text-primary-accent transition-all font-bold">{dict.tos}</Link></li>
            <li><Link href={getLocalizedPath(lang, 'privacy-policy')} className="text-gray-100 hover:text-primary-accent transition-all font-bold">{dict.privacy}</Link></li>
            <li><Link href={getLocalizedPath(lang, 'cookie-policy')} className="text-gray-100 hover:text-primary-accent transition-all font-bold">{dict.cookie_policy}</Link></li>
            <li><Link href={getLocalizedPath(lang, 'gdpr')} className="text-gray-100 hover:text-primary-accent transition-all font-bold">{dict.gdpr}</Link></li>
            <li><Link href={getLocalizedPath(lang, 'rentals')} className="text-gray-100 hover:text-primary-accent transition-all font-bold">{dict.rentals}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-xl mb-8 gold-gradient italic">{dict.follow}</h2>
          <div className="flex gap-4">
            <Link href="#" aria-label="Instagram" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-accent hover:text-primary transition-all">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" aria-label="Facebook" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-accent hover:text-primary transition-all">
              <Facebook className="w-5 h-5" />
            </Link>
          </div>
        </div>
        {dict.citations && (
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="font-serif text-xl mb-8 gold-gradient italic">{dict.citations_title || 'Market Intelligence'}</h2>
            <ul className="space-y-4">
              {dict.citations.map((cite: { text: string; url: string }) => (
                <li key={cite.text} className="border-l border-white/10 pl-4">
                  <a 
                    href={cite.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 text-xs font-medium hover:text-primary-accent transition-all italic block"
                  >
                    {cite.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">© 2026 {dict.excellence}. All rights reserved.</p>
        <div className="flex gap-8">
            <Link href={getLocalizedPath(lang, 'sitemap')} className="text-gray-400 hover:text-white transition-all text-xs font-black uppercase tracking-tighter">Sitemap</Link>
            <Link href={getLocalizedPath(lang, 'privacy-policy')} className="text-gray-400 hover:text-white transition-all text-xs font-black uppercase tracking-tighter">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
