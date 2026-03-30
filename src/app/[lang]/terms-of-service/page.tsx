import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import MotionWrapper from "../../../components/MotionWrapper";
import { getDictionary, Locale } from "../../../get-dictionary";

export default async function termsofservicePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const content = {
    en: {
      title: "Terms of Service",
      sections: [
        {
          heading: "1. Acceptance of Terms",
          text: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement."
        },
        {
          heading: "2. Use of License",
          text: "Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only."
        },
        {
          heading: "3. Disclaimer",
          text: "The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
        },
        {
          heading: "4. Limitations",
          text: "In no event shall the agency or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website."
        }
      ]
    },
    es: {
      title: "Términos del Servicio",
      sections: [
        {
          heading: "1. Aceptación de los Términos",
          text: "Al acceder y utilizar este sitio web, usted acepta y acuerda estar sujeto a los términos y disposiciones de este acuerdo."
        },
        {
          heading: "2. Licencia de Uso",
          text: "Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en nuestro sitio web para visualización transitoria personal y no comercial únicamente."
        },
        {
          heading: "3. Descargo de Responsabilidad",
          text: "Los materiales en nuestro sitio web se proporcionan 'tal cual'. No ofrecemos garantías, expresas o implícitas, y por la presente renunciamos y negamos todas las demás garantías, incluidas, sin limitación, las garantías implícitas o condiciones de comercialización, idoneidad para un propósito particular o no infracción de la propiedad intelectual u otra violación de derechos."
        },
        {
          heading: "4. Limitaciones",
          text: "En ningún caso la agencia o sus proveedores serán responsables de cualquier daño (incluidos, sin limitación, daños por pérdida de datos o beneficios, o debido a la interrupción del negocio) que surja del uso o la imposibilidad de usar los materiales en nuestro sitio web."
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
          <MotionWrapper>
            <h1 className="text-5xl md:text-7xl font-serif mb-16 text-primary tracking-tight italic text-center">
              {currentContent.title}
            </h1>
          </MotionWrapper>

          <div className="space-y-12">
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
