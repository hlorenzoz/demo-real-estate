import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionWrapper from "@/components/MotionWrapper";
import { getDictionary, Locale } from "@/get-dictionary";

export default async function cookiepolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const content = {
    en: {
      title: "Cookie Policy",
      intro: "This Cookie Policy explains how our agency uses cookies and similar technologies to recognize you when you visit our website.",
      sections: [
        {
          heading: "What are cookies?",
          text: "Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information."
        },
        {
          heading: "Why do we use cookies?",
          text: "We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as 'essential' or 'strictly necessary' cookies."
        },
        {
          heading: "How can I control cookies?",
          text: "You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager or by setting your web browser controls."
        }
      ]
    },
    es: {
      title: "Política de Cookies",
      intro: "Esta Política de Cookies explica cómo nuestra agencia utiliza cookies y tecnologías similares para reconocerte cuando visitas nuestro sitio web.",
      sections: [
        {
          heading: "¿Qué son las cookies?",
          text: "Las cookies son pequeños archivos de datos que se colocan en tu ordenador o dispositivo móvil cuando visitas un sitio web. Los propietarios de sitios web las utilizan ampliamente para que sus sitios funcionen, o para que funcionen de manera más eficiente, así como para proporcionar información de informes."
        },
        {
          heading: "¿Por qué usamos cookies?",
          text: "Utilizamos cookies propias y de terceros por varias razones. Algunas cookies son necesarias por razones técnicas para que nuestro sitio web funcione, y nos referimos a estas como cookies 'esenciales' o 'estrictamente necesarias'."
        },
        {
          heading: "¿Cómo puedo controlar las cookies?",
          text: "Tienes derecho a decidir si aceptas o rechazas las cookies. Puedes ejercer tus derechos sobre las cookies configurando tus preferencias en el Administrador de Consentimiento de Cookies o configurando los controles de tu navegador web."
        }
      ]
    }
  };

  const currentContent = content[lang as 'en' | 'es'] || content.en;

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
