import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import MotionWrapper from "../../../components/MotionWrapper";
import { getDictionary, Locale } from "../../../get-dictionary";

export default async function gdprPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const content = {
    en: {
      title: "GDPR Compliance",
      intro: "The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy in the European Union and the European Economic Area.",
      sections: [
        {
          heading: "Our Commitment",
          text: "We are committed to ensuring that our operations comply with GDPR standards, protecting your personal data and ensuring your rights are respected."
        },
        {
          heading: "Your Data Rights",
          text: "Under GDPR, you have the right to access, rectify, or erase your personal data. You also have the right to data portability and to restrict or object to the processing of your data."
        },
        {
          heading: "Data Protection",
          text: "We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including encryption and secure storage protocols."
        }
      ]
    },
    es: {
      title: "Cumplimiento de RGPD",
      intro: "El Reglamento General de Protección de Datos (RGPD) es un reglamento de la legislación de la UE sobre protección de datos y privacidad en la Unión Europea y el Espacio Económico Europeo.",
      sections: [
        {
          heading: "Nuestro Compromiso",
          text: "Nos comprometemos a garantizar que nuestras operaciones cumplan con los estándares de RGPD, protegiendo tus datos personales y asegurando que tus derechos sean respetados."
        },
        {
          heading: "Tus Derechos de Datos",
          text: "Según el RGPD, tienes derecho a acceder, rectificar o eliminar tus datos personales. También tienes derecho a la portabilidad de los datos y a restringir u oponerte al procesamiento de tus datos."
        },
        {
          heading: "Protección de Datos",
          text: "Implementamos medidas técnicas y organizativas adecuadas para garantizar un nivel de seguridad adecuado al riesgo, incluidos protocolos de cifrado y almacenamiento seguro."
        }
      ]
    }
  };

  const currentContent = content[lang as 'en' | 'es'];

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-primary selection:bg-primary-accent selection:text-primary overflow-x-hidden">
      <Navbar lang={lang as Locale} dict={dict.navbar} />
      
      <section className="pt-48 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <MotionWrapper className="text-center mb-16 px-4">
            <h1 className="text-5xl md:text-7xl font-serif mb-8 text-primary tracking-tight italic">
              {currentContent.title}
            </h1>
            <p className="text-xl text-text-muted font-light leading-relaxed italic">
              {currentContent.intro}
            </p>
          </MotionWrapper>

          <div className="space-y-8">
            {currentContent.sections.map((section, index) => (
              <MotionWrapper key={index} delay={0.1 * index}>
                <div className="p-10 bg-white rounded-[40px] border border-slate-50 shadow-sm transition-all duration-500 hover:shadow-md">
                  <h2 className="text-2xl font-serif text-primary italic mb-6">{section.heading}</h2>
                  <p className="text-text-muted leading-relaxed font-light italic">
                    {section.text}
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
