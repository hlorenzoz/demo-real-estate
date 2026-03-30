import Image from "next/image";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import MotionWrapper from "../../../components/MotionWrapper";
import { getDictionary, Locale } from "../../../get-dictionary";

const team = [
  {
    id: 1,
    name: "Elena Rodriguez",
    role: { en: "CEO & Founder", es: "CEO y Fundadora" },
    image: "https://cdn.hlorenzoz.com/demo-real-estate/real-estate/team/ceo.webp",
    bio: {
      en: "With over 20 years of experience in luxury real estate, Elena leads our vision with passion and integrity.",
      es: "Con más de 20 años de experiencia en el sector inmobiliario de lujo, Elena lidera nuestra visión con pasión e integridad."
    }
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: { en: "Senior Real Estate Agent", es: "Agente Inmobiliario Senior" },
    image: "https://cdn.hlorenzoz.com/demo-real-estate/real-estate/team/senior_agent.webp",
    bio: {
      en: "Marcus is an expert in high-end urban properties, helping clients find their perfect city sanctuary.",
      es: "Marcus es experto en propiedades urbanas de alta gama, ayudando a los clientes a encontrar su santuario urbano perfecto."
    }
  },
  {
    id: 3,
    name: "Sofia Benitez",
    role: { en: "Operations & Property Manager", es: "Directora de Operaciones y Gestión" },
    image: "https://cdn.hlorenzoz.com/demo-real-estate/real-estate/team/property_manager.webp",
    bio: {
      en: "Sofia ensures that every property we manage meets the highest standards of luxury and comfort.",
      es: "Sofia se asegura de que cada propiedad que gestionamos cumpla con los más altos estándares de lujo y confort."
    }
  },
  {
    id: 4,
    name: "David Chen",
    role: { en: "Marketing & Strategy Director", es: "Director de Marketing y Estrategia" },
    image: "https://cdn.hlorenzoz.com/demo-real-estate/real-estate/team/marketing_director.webp",
    bio: {
      en: "David combines data-driven strategy with creative storytelling to showcase our exclusive listings.",
      es: "David combina estrategia basada en datos con narrativa creativa para destacar nuestros listados exclusivos."
    }
  }
];

export default async function meettheteamPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const currentLang = lang as 'en' | 'es';

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-primary selection:bg-primary-accent selection:text-primary overflow-x-hidden">
      <Navbar lang={lang as Locale} dict={dict.navbar} />
      
      <section className="pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionWrapper className="text-center mb-24">
            <h1 className="text-5xl md:text-7xl font-serif mb-8 text-primary tracking-tight italic">
              {lang === 'es' ? 'Conoce al Equipo' : 'Meet The Team'}
            </h1>
            <p className="text-xl text-text-muted font-light max-w-2xl mx-auto italic">
              {lang === 'es' 
                ? 'Los expertos dedicados a hacer realidad tus sueños inmobiliarios.' 
                : 'The dedicated experts behind your real estate dreams.'}
            </p>
          </MotionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <MotionWrapper 
                key={member.id} 
                delay={0.1 * index}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] mb-6 shadow-sm border border-slate-100 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={index < 2}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                    <p className="text-sm font-light leading-relaxed italic">
                      {member.bio[currentLang]}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-primary italic mb-1">{member.name}</h3>
                  <p className="text-primary-accent font-medium text-sm tracking-widest uppercase">
                    {member.role[currentLang]}
                  </p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={lang as Locale} dict={dict.footer} />
    </main>
  );
}
