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
    <footer className="relative overflow-hidden border-t border-[#2C221E]/30 bg-[#2C221E] pt-20 pb-12 text-[#F7F3EB]">
      {/* Gentle background glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-40 w-full max-w-4xl -translate-x-1/2 bg-linear-to-b from-[#C86D51]/15 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-12 border-b border-white/10 pb-16 md:grid-cols-12">
          {/* Col 1: Brand & Memorial Quote */}
          <div className="space-y-4 md:col-span-6">
            <SignatureLogo isLight className="text-white" animated={false} />
            <p className="max-w-md pt-2 font-serif text-xl text-[#EDB45D] italic">
              {t.footer.memorialQuote}
            </p>
            <p className="font-sans-human max-w-lg text-xs leading-relaxed text-[#A89B93]">
              {t.footer.estateNote}
            </p>
            <p className="pt-2 font-mono text-xs tracking-wider text-[#EDB45D]">
              {t.footer.familySignoff}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 md:col-span-3">
            <span className="mb-4 block font-mono text-xs font-semibold tracking-widest text-[#EDB45D] uppercase">
              {language === 'en' ? 'Archive Navigation' : 'Navegación del Archivo'}
            </span>
            <ul className="space-y-2.5 text-sm text-[#A89B93]">
              <li>
                <a href="#obras" className="transition-colors hover:text-white">
                  {t.nav.collection}
                </a>
              </li>
              <li>
                <a href="#biografia" className="transition-colors hover:text-white">
                  {t.nav.biography}
                </a>
              </li>
              <li>
                <a href="#cronologia" className="transition-colors hover:text-white">
                  {t.nav.timeline}
                </a>
              </li>
              <li>
                <a href="#exposiciones" className="transition-colors hover:text-white">
                  {t.nav.exhibitions}
                </a>
              </li>
              <li>
                <a href="#consultas" className="transition-colors hover:text-white">
                  {t.nav.inquiries}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Cultural Institutions & Archives */}
          <div className="space-y-3 md:col-span-3">
            <span className="mb-4 block font-mono text-xs font-semibold tracking-widest text-[#EDB45D] uppercase">
              {language === 'en' ? 'Institutional Records' : 'Acervos e Instituciones'}
            </span>
            <ul className="space-y-2 text-xs text-[#A89B93]">
              <li className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[#C86D51]" />
                <span>Polyforum Cultural Siqueiros</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[#C86D51]" />
                <span>Universidad de Costa Rica (UCR)</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[#C86D51]" />
                <span>Museo de los Niños · Galería Nacional</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[#C86D51]" />
                <span>Centro de Orientación Familiar (COF)</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[#C86D51]" />
                <span>Colección Familia Amighetti Prieto</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-5 pt-8 text-xs text-[#A89B93] md:flex-row md:gap-4">
          <div className="w-full space-y-2 text-center md:text-left">
            <p>{t.footer.rights}</p>
            <p className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-center md:justify-start md:text-left">
              {language === 'en' ? 'Created by ' : 'Creado por '}
              <a
                href="https://www.linkedin.com/in/mauriciolizama/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EDB45D] transition-colors hover:text-white"
              >
                Mauricio Lizama
              </a>
              <span className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 text-[#EDB45D]" />
                {language === 'en' ? 'with love' : 'con amor'}.
              </span>
            </p>
            <p>
              {' '}
              {language === 'en'
                ? 'Information provided by Liana Babbar Amighetti'
                : 'Información proporcionada por Liana Babbar Amighetti'}
            </p>
          </div>

          <a
            href="#top"
            onClick={handleScrollToTop}
            className="group flex shrink-0 cursor-pointer items-center gap-1.5 text-xs text-[#EDB45D] transition-colors hover:text-white"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
