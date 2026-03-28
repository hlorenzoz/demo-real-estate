"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Search, 
  MapPin, 
  Star, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle,
  Clock,
  Instagram,
  Facebook
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const animations = {
    fadeIn: { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } },
    stagger: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <main className="min-h-screen">
      {/* 1. Navbar (Minimalist Glass) */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto glass rounded-2xl px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="text-primary-accent w-8 h-8" />
            <span className="font-serif text-2xl font-bold tracking-tight">INMO3</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#propiedades" className="hover:text-primary-accent transition-colors">Propiedades</Link>
            <Link href="#vender" className="hover:text-primary-accent transition-colors">Vender</Link>
            <Link href="#servicios" className="hover:text-primary-accent transition-colors">Servicios</Link>
            <Link href="#nosotros" className="hover:text-primary-accent transition-colors">Nosotros</Link>
          </div>
          <Link href="#contacto" className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-all">
            Contacto
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section (Value Prop + CTA) */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Note: In a real deploy, these would be the R2 URLs */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image 
            src="https://cdn.hlorenzoz.com/inmobiliary-inmo3/hero.webp" 
            alt="Interior de lujo en Xinzo de Limia" 
            fill 
            sizes="100vw"
            className="object-cover scale-105"
            priority
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl text-white"
          >
            <span className="bg-primary-accent/90 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 inline-block">
              Inmobiliaria de Confianza en Xinzo
            </span>
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight text-balance">
              Encuentra tu lugar en <span className="gold-gradient">Xinzo de Limia, Ourense, Spain</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light">
              Profesionalismo, transparencia y calidez humana. Gestionamos tu propiedad en la comarca de A Limia con la excelencia que mereces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#propiedades" className="bg-primary-accent text-primary px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-bold hover:scale-105 transition-transform group">
                Ver Propiedades <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#vender" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-white/20 transition-all">
                Tasa tu Vivienda Gratis
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Hero Search (Floating Glass) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 hidden lg:block"
        >
          <div className="glass p-2 rounded-2xl flex items-center gap-4 shadow-2xl">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="text-primary/40 w-5 h-5" />
              <input type="text" placeholder="¿Qué buscas hoy? (Piso, Casa, Terreno...)" className="bg-transparent border-none focus:ring-0 w-full text-primary" />
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div className="px-4 flex items-center gap-2 cursor-pointer hover:bg-black/5 rounded-xl py-2 transition-colors">
              <MapPin className="text-primary-accent w-5 h-5" />
              <span className="text-sm font-medium">Ubicación</span>
            </div>
            <button className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition-all font-bold">
              Buscar
            </button>
          </div>
        </motion.div>
      </section>

      {/* 3. Logical Offer (Tasación Gratuita) */}
      <section id="vender" className="py-24 bg-surface-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass overflow-hidden rounded-[32px] flex flex-col lg:flex-row shadow-2xl">
            <div className="lg:w-1/2 relative h-80 lg:h-auto">
              <Image src="https://cdn.hlorenzoz.com/inmobiliary-inmo3/services.webp" alt="Asesoramiento profesional" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
              <motion.div {...animations.fadeIn}>
                <h2 className="text-4xl md:text-5xl font-serif mb-6 text-primary">¿Interesado en Vender o Alquilar?</h2>
                <p className="text-lg text-text-muted mb-8 leading-relaxed">
                  En INMO3 entendemos que tu propiedad es tu patrimonio más importante. Por eso, ofrecemos **Tasaciones Gratuitas** y asesoramiento integral para que vendas al mejor precio del mercado.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 text-primary/80 font-medium">
                    <CheckCircle2 className="text-primary-accent w-5 h-5" /> Valoración precisa en menos de 48h.
                  </li>
                  <li className="flex items-center gap-3 text-primary/80 font-medium">
                    <CheckCircle2 className="text-primary-accent w-5 h-5" /> Reportaje fotográfico profesional gratuito.
                  </li>
                  <li className="flex items-center gap-3 text-primary/80 font-medium">
                    <CheckCircle2 className="text-primary-accent w-5 h-5" /> Gestión legal y defensa del precio.
                  </li>
                </ul>
                <button className="bg-primary text-white px-10 py-5 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform font-bold text-lg">
                  Solicitar Tasación Gratuita
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Social Proof & Human Touch (Olga/GMB) */}
      <section id="nosotros" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 {...animations.fadeIn} className="text-4xl md:text-5xl font-serif mb-4">Lo que dicen nuestros clientes</motion.h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-primary-accent text-primary-accent" />)}
            </div>
            <p className="text-primary-accent font-bold uppercase tracking-widest text-sm">GMB 5/5 Calificación de Google</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[ 
              { name: "Marta R.", text: "Olga es una profesional fantástica. Te explica todo con una amabilidad y transparencia que se agradece muchísimo en estos tiempos." },
              { name: "Javier L.", text: "Experiencia de 10. Gestión rápida y trato muy cercano. Se nota que conocen Xinzo como nadie." },
              { name: "Lucía P.", text: "Eficiencia y calidez humana. Nos ayudaron a encontrar nuestra casa ideal en tiempo récord. Totalmente recomendados." }
            ].map((review, i) => (
              <motion.div 
                key={i}
                {...animations.fadeIn}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-muted p-8 rounded-[24px] border border-black/5 hover:border-primary-accent/30 transition-colors group"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-primary-accent text-primary-accent" />)}
                </div>
                <p className="italic text-text-muted mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {review.name[0]}
                  </div>
                  <span className="font-bold text-primary">{review.name}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 flex flex-col lg:flex-row items-center gap-12 p-8 glass rounded-[32px]">
            <div className="lg:w-1/3 relative h-[400px] w-full rounded-2xl overflow-hidden">
              <Image src="https://cdn.hlorenzoz.com/inmobiliary-inmo3/team.webp" alt="Equipo INMO3" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="lg:w-2/3">
              <h3 className="text-3xl font-serif mb-4">Más que una inmobiliaria, somos tu vecino.</h3>
              <p className="text-lg text-text-muted mb-6 leading-relaxed">
                Liderado por Olga, nuestro equipo en INMO3 cree que la clave del éxito inmobiliario es la **transparencia total** y la **humanidad**. No somos una gran cadena fría; somos residentes de Xinzo que quieren ver crecer a su comunidad de la mejor manera.
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="text-3xl font-bold font-serif text-primary-accent">+100</div>
                  <div className="text-sm text-text-muted uppercase font-bold tracking-tight">Ventas Exitosas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold font-serif text-primary-accent">100%</div>
                  <div className="text-sm text-text-muted uppercase font-bold tracking-tight">Transparencia</div>
                </div>
                <div>
                  <div className="text-3xl font-bold font-serif text-primary-accent">10+</div>
                  <div className="text-sm text-text-muted uppercase font-bold tracking-tight">Años en Xinzo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GMB Integration (Contact/Map) */}
      <section id="contacto" className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Hablemos de tu próximo movimiento.</h2>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl glass-dark flex items-center justify-center">
                  <MapPin className="text-primary-accent w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-blue-200 text-sm font-bold uppercase">Ubicación</h4>
                  <p className="text-xl">Rúa Río Sil, 9, Xinzo de Limia, Ourense</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl glass-dark flex items-center justify-center">
                  <Phone className="text-primary-accent w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-blue-200 text-sm font-bold uppercase">Llámanos</h4>
                  <p className="text-xl">+34 988 46 15 85</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl glass-dark flex items-center justify-center">
                  <Clock className="text-primary-accent w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-blue-200 text-sm font-bold uppercase">Horario</h4>
                  <p className="text-xl">Lun - Vie: 09:30 - 13:30 | 16:30 - 20:00</p>
                </div>
              </div>
            </div>
          </div>
          <motion.div 
            {...animations.fadeIn}
            className="bg-white p-10 rounded-[32px] text-primary shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-6">Envíanos un mensaje</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase mb-2 block text-gray-400">Nombre</label>
                  <input type="text" className="w-full bg-gray-50 border-gray-200 rounded-xl focus:ring-primary-accent focus:border-primary-accent" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase mb-2 block text-gray-400">Email</label>
                  <input type="email" className="w-full bg-gray-50 border-gray-200 rounded-xl focus:ring-primary-accent focus:border-primary-accent" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase mb-2 block text-gray-400">Interés</label>
                <select className="w-full bg-gray-50 border-gray-200 rounded-xl focus:ring-primary-accent focus:border-primary-accent">
                  <option>Quiero Comprar</option>
                  <option>Quiero Alquilar</option>
                  <option>Quiero Vender</option>
                  <option>Tasación Gratuita</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase mb-2 block text-gray-400">Mensaje</label>
                <textarea rows={4} className="w-full bg-gray-50 border-gray-200 rounded-xl focus:ring-primary-accent focus:border-primary-accent"></textarea>
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-black transition-all">
                Enviar Solicitud
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Building2 className="text-primary-accent w-6 h-6" />
            <span className="font-serif text-xl font-bold">INMO3</span>
          </div>
          <p className="text-sm text-text-muted">© 2026 INMO3 Inmobiliaria. Todos los derechos reservados. Xinzo de Limia, Ourense.</p>
          <div className="flex gap-4">
            <Link href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary-accent hover:text-primary transition-all">
              <Instagram className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary-accent hover:text-primary transition-all">
              <Facebook className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (WhatsApp) */}
      <Link 
        href="https://wa.me/34988461585" 
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
        target="_blank"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-primary px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-black/5">
          ¿En qué podemos ayudarte?
        </span>
      </Link>
    </main>
  );
}
