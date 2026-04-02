import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { getDictionary } from "@/get-dictionary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionWrapper from "@/components/MotionWrapper";

export default async function BlogPage({
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
              {dict.blog_page.title}
            </h1>
            <p className="text-xl text-text-muted font-light max-w-2xl mx-auto italic">
              {dict.blog_page.description}
            </p>
          </MotionWrapper>

          {/* Featured Post Placeholder */}
          <MotionWrapper delay={0.2} className="relative h-[500px] rounded-[64px] overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] mb-20 cursor-pointer">
            <Image 
              src="https://cdn.hlorenzoz.com/demo-real-estate/real-estate/luxury-interior.webp"
              alt="Featured article"
              fill
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-12 md:p-20">
                <div className="max-w-2xl text-white">
                    <span className="bg-primary-accent text-primary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl mb-6 inline-block">
                        {dict.blog_page.featured}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-[1.1]">
                        {dict.blog_page.featured_post.title}
                    </h2>
                    <div className="flex items-center gap-6 text-gray-300 font-bold text-sm">
                        <span className="flex items-center gap-2"><Calendar size={16} /> {dict.blog_page.featured_post.date}</span>
                        <span className="flex items-center gap-2"><Clock size={16} /> {dict.blog_page.featured_post.read_time}</span>
                    </div>

                </div>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.4} className="bg-white p-12 md:p-24 rounded-[64px] border border-slate-50 shadow-[0_32px_80px_rgba(0,0,0,0.04)] text-center max-w-4xl mx-auto">
            <div className="max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-primary-accent/10 rounded-3xl flex items-center justify-center text-primary-accent mx-auto mb-8 animate-pulse text-2xl">
                    ✨
                </div>
                <h2 className="text-3xl font-serif mb-6 text-primary leading-relaxed italic">{dict.blog_page.coming_soon}</h2>
                <div className="h-1 w-20 bg-primary-accent mx-auto rounded-full" />
            </div>
          </MotionWrapper>
        </div>
      </section>

      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}
