import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import MotionWrapper from "../../../components/MotionWrapper";
import { getDictionary, Locale } from "../../../get-dictionary";

export default async function privacypolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const content = {
    en: {
      title: "Privacy Policy",
      intro: "Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.",
      sections: [
        {
          heading: "Information Collection",
          text: "We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent."
        },
        {
          heading: "Information Storage",
          text: "We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification."
        },
        {
          heading: "Third-Party Sharing",
          text: "We don't share any personally identifying information publicly or with third-parties, except when required to by law."
        }
      ]
    },
    es: {
      title: "Política de Privacidad",
      intro: "Tu privacidad es importante para nosotros. Nuestra política es respetar tu privacidad con respecto a cualquier información que podamos recopilar de ti a través de nuestro sitio web.",
      sections: [
        {
          heading: "Recopilación de Información",
          text: "Solo solicitamos información personal cuando realmente la necesitamos para brindarte un servicio. La recopilamos por medios justos y legales, con tu conocimiento y consentimiento."
        },
        {
          heading: "Almacenamiento de Información",
          text: "Solo retenemos la información recopilada durante el tiempo que sea necesario para brindarte el servicio solicitado. Protegemos los datos almacenados dentro de medios comercialmente aceptables para evitar pérdidas y robos, así como el acceso, la divulgación, la copia, el uso o la modificación no autorizados."
        },
        {
          heading: "Uso compartido con Terceros",
          text: "No compartimos ninguna información de identificación personal públicamente ni con terceros, excepto cuando lo exija la ley."
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
