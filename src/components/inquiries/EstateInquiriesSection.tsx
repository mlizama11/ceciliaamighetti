import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Landmark,
  BookOpen,
  HeartHandshake,
  Award,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { artworks } from '../../data/artworks';

interface EstateInquiriesProps {
  preselectedArtworkId?: string;
  onClearPreselectedArtwork?: () => void;
}

export const EstateInquiriesSection: React.FC<EstateInquiriesProps> = ({
  preselectedArtworkId,
  onClearPreselectedArtwork
}) => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const email = t.inquiries.emailPlaceholder;

  // Find artwork details if one was preselected from the lightbox
  const selectedArtwork = preselectedArtworkId
    ? artworks.find((a) => a.id === preselectedArtworkId)
    : null;

  const mailSubject = selectedArtwork
    ? encodeURIComponent(
        `${language === 'en' ? 'Inquiry regarding artwork' : 'Consulta sobre obra'}: ${
          language === 'en' ? selectedArtwork.titleEn : selectedArtwork.titleEs
        } (${selectedArtwork.year})`
      )
    : encodeURIComponent(
        language === 'en'
          ? 'Inquiry — Cecilia Amighetti Prieto Estate Archive'
          : 'Consulta — Archivo Cecilia Amighetti Prieto'
      );

  const mailtoHref = `mailto:${email}?subject=${mailSubject}`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const coordinationAreas = [
    {
      icon: <Landmark className="w-5 h-5 text-[#2D5A43] dark:text-[#4E8A6B]" />,
      title: t.inquiries.loanTitle,
      desc: t.inquiries.loanDesc
    },
    {
      icon: <BookOpen className="w-5 h-5 text-[#E09F3E] dark:text-[#EDB45D]" />,
      title: t.inquiries.researchTitle,
      desc: t.inquiries.researchDesc
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#C86D51]" />,
      title: t.inquiries.collectorTitle,
      desc: t.inquiries.collectorDesc
    },
    {
      icon: <Award className="w-5 h-5 text-[#2E4D7A] dark:text-[#4B77B5]" />,
      title: t.inquiries.memorialTitle,
      desc: t.inquiries.memorialDesc
    }
  ];

  return (
    <section id="consultas" className="py-24 sm:py-32 relative bg-[#FAF7F0] dark:bg-[#1E1815]">
      {/* Background warm ambient wash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-170 h-120 bg-linear-to-r from-[#C86D51]/10 via-[#E09F3E]/8 to-[#2D5A43]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C86D51] font-semibold mb-3">
            <Mail className="w-4 h-4" />
            <span>{t.inquiries.tag}</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#2C221E] dark:text-[#F5EFEB] leading-tight">
            {t.inquiries.title}
          </h2>
          <p className="font-serif text-base sm:text-lg text-[#6B5E57] dark:text-[#A89B93] mt-4 leading-relaxed">
            {t.inquiries.subtitle}
          </p>
          <div className="w-16 h-0.5 bg-[#C86D51] mx-auto mt-6" />
        </div>

        {/* Selected artwork context callout if triggered from lightbox */}
        {selectedArtwork && (
          <div className="mb-8 p-4 rounded-xl bg-[#EFE9DC] dark:bg-[#261E1A] border border-[#C86D51]/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={`/artworks/${selectedArtwork.image}`}
                alt={language === 'en' ? selectedArtwork.titleEn : selectedArtwork.titleEs}
                className="w-12 h-12 object-cover rounded shadow-xs"
              />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C86D51] font-semibold block">
                  {language === 'en' ? 'Artwork of inquiry' : 'Obra consultada'}
                </span>
                <span className="text-sm font-medium text-[#2C221E] dark:text-[#F5EFEB]">
                  {language === 'en' ? selectedArtwork.titleEn : selectedArtwork.titleEs} ({selectedArtwork.year})
                </span>
              </div>
            </div>
            {onClearPreselectedArtwork && (
              <button
                onClick={onClearPreselectedArtwork}
                className="text-xs text-[#6B5E57] hover:text-[#C86D51] cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Central Direct Email Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F7F3EB] dark:bg-[#241E1B] border border-[#2C221E]/12 dark:border-white/10 shadow-2xl text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#C86D51]/15 text-[#C86D51] flex items-center justify-center mx-auto shadow-inner">
            <Mail className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#6B5E57] dark:text-[#A89B93] font-mono font-medium block">
              {language === 'en' ? 'Official Estate Email' : 'Correo Oficial del Archivo'}
            </span>
            <div className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2C221E] dark:text-[#F5EFEB] font-medium tracking-tight select-all">
              {email}
            </div>
          </div>

          {/* Action Buttons: Write Email & Copy */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={mailtoHref}
              className="px-8 py-3.5 rounded-full bg-[#C86D51] hover:bg-[#B3593F] text-white font-sans-human text-xs font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
            >
              <span>{t.inquiries.sendEmail}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              onClick={handleCopy}
              className="px-6 py-3.5 rounded-full border border-[#2C221E]/20 dark:border-white/20 hover:border-[#C86D51] text-[#2C221E] dark:text-[#F5EFEB] hover:text-[#C86D51] dark:hover:text-[#EDB45D] font-sans-human text-xs font-semibold tracking-wider uppercase transition-all bg-[#FAF7F0] dark:bg-[#1A1614] flex items-center gap-2 cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 dark:text-green-400">{t.inquiries.emailCopied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t.inquiries.copyEmail}</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-[#6B5E57] dark:text-[#A89B93] max-w-md mx-auto pt-2">
            {language === 'en'
              ? 'Correspondence is attended directly by Cecilia Amighetti’s family and archival trustees in San José, Costa Rica.'
              : 'La correspondencia es atendida directamente por la familia y albaceas de Cecilia Amighetti en San José, Costa Rica.'}
          </p>
        </div>

        {/* 4 Archival Coordination Areas */}
        <div className="mt-14 space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-[#6B5E57] dark:text-[#A89B93] font-semibold text-center mb-6">
            {t.inquiries.inquiryTypesTitle}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coordinationAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#F7F3EB]/70 dark:bg-[#241E1B]/70 border border-[#2C221E]/8 dark:border-white/8 hover:border-[#C86D51]/30 transition-all flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] dark:bg-[#1A1614] shrink-0 shadow-xs">
                  {area.icon}
                </div>
                <div>
                  <h4 className="font-editorial text-lg text-[#2C221E] dark:text-[#F5EFEB] leading-snug">
                    {area.title}
                  </h4>
                  <p className="font-sans-human text-xs text-[#6B5E57] dark:text-[#A89B93] mt-1 leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
