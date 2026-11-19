import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { SignatureLogo } from '../common/SignatureLogo';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#2C221E] text-[#F7F3EB] pt-20 pb-12 relative overflow-hidden border-t border-[#2C221E]/30">
      {/* Gentle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-linear-to-b from-[#C86D51]/15 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10 items-start">
          {/* Col 1: Brand & Memorial Quote */}
          <div className="md:col-span-6 space-y-4">
            <SignatureLogo isLight className="text-white" animated={false} />
            <p className="font-serif italic text-xl text-[#EDB45D] max-w-md pt-2">
              {t.footer.memorialQuote}
            </p>
            <p className="font-sans-human text-xs text-[#A89B93] leading-relaxed max-w-lg">
              {t.footer.estateNote}
            </p>
            <p className="text-xs text-[#C86D51] font-mono tracking-wider pt-2">
              {t.footer.familySignoff}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#EDB45D] font-mono font-semibold block mb-4">
              {language === 'en' ? 'Archive Navigation' : 'Navegación del Archivo'}
            </span>
            <ul className="space-y-2.5 text-sm text-[#A89B93]">
              <li>
                <a href="#obras" className="hover:text-white transition-colors">
                  {t.nav.collection}
                </a>
              </li>
              <li>
                <a href="#biografia" className="hover:text-white transition-colors">
                  {t.nav.biography}
                </a>
              </li>
              <li>
                <a href="#cronologia" className="hover:text-white transition-colors">
                  {t.nav.timeline}
                </a>
              </li>
              <li>
                <a href="#exposiciones" className="hover:text-white transition-colors">
                  {t.nav.exhibitions}
                </a>
              </li>
              <li>
                <a href="#consultas" className="hover:text-white transition-colors">
                  {t.nav.inquiries}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Cultural Institutions & Archives */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#EDB45D] font-mono font-semibold block mb-4">
              {language === 'en' ? 'Institutional Records' : 'Acervos e Instituciones'}
            </span>
            <ul className="space-y-2 text-xs text-[#A89B93]">
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>Polyforum Cultural Siqueiros</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>Universidad de Costa Rica (UCR)</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>Museo de los Niños · Galería Nacional</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>Centro de Orientación Familiar (COF)</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>Colección Familia Amighetti Prieto</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89B93]">
          <div className="space-y-1.5 text-center sm:text-left">
            <p>{t.footer.rights}</p>
            <p>
              {language === 'en' ? 'Created by ' : 'Creado por '}
              <a
                href="https://www.linkedin.com/in/mauriciolizama/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EDB45D] hover:text-white transition-colors"
              >
                Mauricio Lizama
              </a>
              {' · '}
              {language === 'en'
                ? 'Information provided by Liana Babbar Amighetti'
                : 'Información proporcionada por Liana Babbar Amighetti'}
            </p>
          </div>

          <a
            href="#top"
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#EDB45D] hover:text-white transition-colors cursor-pointer group"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
