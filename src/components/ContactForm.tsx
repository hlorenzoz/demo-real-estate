/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactFormProps {
  dict: {
    form_name: string;
    form_email: string;
    form_message: string;
    form_submit: string;
  };
  lang: string;
}

export default function ContactForm({ dict, lang }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API call
    try {
      // For testing purposes: allow triggering different states
      if (formData.name === "TriggerError") {
        throw new Error("Simulated API error");
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset after 5 seconds to allow new messages
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as any;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-serif text-primary mb-2 italic">
              {lang === "en" ? "Message Sent!" : "¡Mensaje Enviado!"}
            </h3>
            <p className="text-text-muted font-bold max-w-xs mx-auto">
              {lang === "en" ? "We'll get back to you as soon as possible." : "Nos pondremos en contacto contigo lo antes posible."}
            </p>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit} 
            className="space-y-8"
          >
            <div className="space-y-2 group">
              <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-text-muted ml-1 transition-colors group-focus-within:text-primary-accent">
                {dict.form_name}
              </label>
              <input 
                id="name"
                name="name"
                type="text" 
                required
                value={formData.name}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 outline-none focus:bg-white focus:border-primary-accent/20 transition-all font-bold text-primary disabled:opacity-50" 
              />
            </div>
            
            <div className="space-y-2 group">
              <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-text-muted ml-1 transition-colors group-focus-within:text-primary-accent">
                {dict.form_email}
              </label>
              <input 
                id="email"
                name="email"
                type="email" 
                required
                value={formData.email}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 outline-none focus:bg-white focus:border-primary-accent/20 transition-all font-bold text-primary disabled:opacity-50" 
              />
            </div>

            <div className="space-y-2 group">
              <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-text-muted ml-1 transition-colors group-focus-within:text-primary-accent">
                {dict.form_message}
              </label>
              <textarea 
                id="message"
                name="message"
                rows={4} 
                required
                value={formData.message}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 outline-none focus:bg-white focus:border-primary-accent/20 transition-all font-bold text-primary disabled:opacity-50 resize-none" 
              />
            </div>

            <button 
              type="submit" 
              disabled={status === "loading"}
              className="w-full bg-primary text-white py-6 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-sm tracking-widest hover:bg-primary-accent hover:text-primary transition-all shadow-xl group disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none overflow-hidden relative"
            >
              {status === "loading" ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="animate-spin" size={18} />
                  <span>{lang === "en" ? "Sending..." : "Enviando..."}</span>
                </div>
              ) : (
                <>
                  {dict.form_submit} <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}

              {/* Hover highlight effect */}
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
            </button>
            
            {status === "error" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 text-sm font-bold justify-center"
              >
                <AlertCircle size={16} />
                <span>{lang === "en" ? "Error sending message. Please try again." : "Error al enviar el mensaje. Inténtalo de nuevo."}</span>
              </motion.div>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
