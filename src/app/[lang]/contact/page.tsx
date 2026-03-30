import React from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { getDictionary } from "../../../get-dictionary";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import MotionWrapper from "../../../components/MotionWrapper";
import ContactForm from "../../../components/ContactForm";


export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-primary selection:bg-primary-accent selection:text-primary overflow-x-hidden">
      <Navbar lang={lang} dict={dict.navbar} />
      
      <section className="pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionWrapper className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-serif mb-8 text-primary tracking-tight italic">
              {dict.contact_page.title}
            </h1>
            <p className="text-xl text-text-muted font-light max-w-2xl mx-auto italic">
              {dict.contact_page.description}
            </p>
          </MotionWrapper>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <MotionWrapper delay={0.2} className="bg-white p-10 md:p-16 rounded-[48px] shadow-[0_32px_80px_rgba(0,0,0,0.06)] border border-slate-100">
                <ContactForm 
                  dict={{
                    form_name: dict.contact_page.form_name,
                    form_email: dict.contact_page.form_email,
                    form_message: dict.contact_page.form_message,
                    form_submit: dict.contact_page.form_submit
                  }} 
                  lang={lang} 
                />
            </MotionWrapper>


            {/* Info and Map Placeholder */}
            <MotionWrapper delay={0.4} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-white rounded-3xl border border-slate-50 shadow-sm flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary-accent/10 rounded-2xl flex items-center justify-center text-primary-accent mb-6">
                            <Phone size={24} />
                        </div>
                        <h3 className="font-serif text-xl mb-2 text-primary">{dict.contact_page.phone}</h3>
                        <p className="text-text-muted font-bold">+34 900 000 000</p>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-slate-50 shadow-sm flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary-accent/10 rounded-2xl flex items-center justify-center text-primary-accent mb-6">
                            <Mail size={24} />
                        </div>
                        <h3 className="font-serif text-xl mb-2 text-primary">{dict.contact_page.email}</h3>
                        <p className="text-text-muted font-bold">info@your-agency.com</p>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[32px] border border-slate-50 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-primary-accent/10 rounded-xl flex items-center justify-center text-primary-accent">
                            <Clock size={20} />
                        </div>
                        <h3 className="font-serif text-2xl text-primary">{dict.contact_page.working_hours}</h3>
                    </div>
                    <div className="space-y-4 text-text-muted font-bold">
                        <div className="flex justify-between border-b border-slate-50 pb-4">
                            <span>{dict.contact_page.mon_fri_label}</span>
                            <span>9:00 - 14:00, 16:00 - 19:30</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-50 pb-4">
                            <span>{dict.contact_page.sat_label}</span>
                            <span>10:00 - 13:30</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{dict.contact_page.sun_label}</span>
                            <span className="text-red-400">{dict.contact_page.closed}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[40px] border border-slate-50 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-primary-accent/10 rounded-xl flex items-center justify-center text-primary-accent">
                            <MapPin size={20} />
                        </div>
                        <h3 className="font-serif text-2xl text-primary">{dict.contact_page.visit_us}</h3>
                    </div>
                    <p className="text-text-muted font-bold mb-8">Main Street, 123, 28001 City, Region</p>
                    <div className="h-[300px] w-full bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center text-text-muted text-center p-8">
                        <MapPin className="w-10 h-10 mb-4 opacity-20" />
                        <p className="italic">{dict.contact_page.maps_placeholder}</p>
                    </div>
                </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}
