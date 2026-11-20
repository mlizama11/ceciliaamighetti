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
      icon: <Landmark className="h-5 w-5 text-[#2D5A43] dark:text-[#4E8A6B]" />,
      title: t.inquiries.loanTitle,
      desc: t.inquiries.loanDesc
    },
    {
      icon: <BookOpen className="h-5 w-5 text-[#E09F3E] dark:text-[#EDB45D]" />,
      title: t.inquiries.researchTitle,
      desc: t.inquiries.researchDesc
    },
    {
      icon: <HeartHandshake className="h-5 w-5 text-[#C86D51]" />,
      title: t.inquiries.collectorTitle,
      desc: t.inquiries.collectorDesc
    },
    {
      icon: <Award className="h-5 w-5 text-[#2E4D7A] dark:text-[#4B77B5]" />,
      title: t.inquiries.memorialTitle,
      desc: t.inquiries.memorialDesc
    }
  ];

  return (
    <section id="consultas" className="relative bg-[#FAF7F0] py-24 sm:py-32 dark:bg-[#1E1815]">
      {/* Background warm ambient wash */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-120 w-170 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-[#C86D51]/10 via-[#E09F3E]/8 to-[#2D5A43]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#9B4A35] uppercase dark:text-[#EDB45D]">
            <Mail className="h-4 w-4" />
            <span>{t.inquiries.tag}</span>
          </div>
          <h2 className="font-editorial text-4xl leading-tight text-[#2C221E] sm:text-5xl lg:text-6xl dark:text-[#F5EFEB]">
            {t.inquiries.title}
          </h2>
          <p className="mt-4 font-serif text-base leading-relaxed text-[#6B5E57] sm:text-lg dark:text-[#A89B93]">
            {t.inquiries.subtitle}
          </p>
          <div className="mx-auto mt-6 h-0.5 w-16 bg-[#C86D51]" />
        </div>

        {/* Selected artwork context callout if triggered from lightbox */}
        {selectedArtwork && (
          <div className="mb-8 flex items-center justify-between gap-4 rounded-xl border border-[#C86D51]/40 bg-[#EFE9DC] p-4 dark:bg-[#261E1A]">
            <div className="flex items-center gap-3">
              <img
                src={`/artworks/${selectedArtwork.image}`}
                alt={language === 'en' ? selectedArtwork.titleEn : selectedArtwork.titleEs}
                className="h-12 w-12 rounded object-cover shadow-xs"
              />
              <div>
                <span className="block text-[10px] font-semibold tracking-wider text-[#C86D51] uppercase">
                  {language === 'en' ? 'Artwork of inquiry' : 'Obra consultada'}
                </span>
                <span className="text-sm font-medium text-[#2C221E] dark:text-[#F5EFEB]">
                  {language === 'en' ? selectedArtwork.titleEn : selectedArtwork.titleEs} (
                  {selectedArtwork.year})
                </span>
              </div>
            </div>
            {onClearPreselectedArtwork && (
              <button
                onClick={onClearPreselectedArtwork}
                className="cursor-pointer text-xs text-[#6B5E57] hover:text-[#C86D51]"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Central Direct Email Card */}
        <div className="space-y-6 rounded-3xl border border-[#2C221E]/12 bg-[#F7F3EB] p-8 text-center shadow-2xl sm:p-12 dark:border-white/10 dark:bg-[#241E1B]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C86D51]/15 text-[#C86D51] shadow-inner">
            <Mail className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <span className="block font-mono text-xs font-medium tracking-widest text-[#6B5E57] uppercase dark:text-[#A89B93]">
              {language === 'en' ? 'Official Estate Email' : 'Correo Oficial del Archivo'}
            </span>
            <div className="font-serif text-2xl font-medium tracking-tight text-[#2C221E] select-all sm:text-3xl lg:text-4xl dark:text-[#F5EFEB]">
              {email}
            </div>
          </div>

          {/* Action Buttons: Write Email & Copy */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={mailtoHref}
              className="font-sans-human group flex cursor-pointer items-center gap-2 rounded-full bg-[#A14F39] px-8 py-3.5 text-xs font-semibold tracking-wider text-white uppercase shadow-md transition-all hover:bg-[#8F422E] hover:shadow-lg"
            >
              <span>{t.inquiries.sendEmail}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              onClick={handleCopy}
              className="font-sans-human flex cursor-pointer items-center gap-2 rounded-full border border-[#2C221E]/20 bg-[#FAF7F0] px-6 py-3.5 text-xs font-semibold tracking-wider text-[#2C221E] uppercase shadow-xs transition-all hover:border-[#C86D51] hover:text-[#C86D51] dark:border-white/20 dark:bg-[#1A1614] dark:text-[#F5EFEB] dark:hover:text-[#EDB45D]"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 dark:text-green-400">
                    {t.inquiries.emailCopied}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>{t.inquiries.copyEmail}</span>
                </>
              )}
            </button>
          </div>

          <p className="mx-auto max-w-md pt-2 text-xs text-[#6B5E57] dark:text-[#A89B93]">
            {language === 'en'
              ? 'Correspondence is attended directly by Cecilia Amighetti’s family and archival trustees in San José, Costa Rica.'
              : 'La correspondencia es atendida directamente por la familia y albaceas de Cecilia Amighetti en San José, Costa Rica.'}
          </p>
        </div>

        {/* 4 Archival Coordination Areas */}
        <div className="mt-14 space-y-4">
          <h3 className="mb-6 text-center text-xs font-semibold tracking-widest text-[#6B5E57] uppercase dark:text-[#A89B93]">
            {t.inquiries.inquiryTypesTitle}
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {coordinationAreas.map((area, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-2xl border border-[#2C221E]/8 bg-[#F7F3EB]/70 p-5 transition-all hover:border-[#C86D51]/30 dark:border-white/8 dark:bg-[#241E1B]/70"
              >
                <div className="shrink-0 rounded-xl bg-[#FAF7F0] p-2.5 shadow-xs dark:bg-[#1A1614]">
                  {area.icon}
                </div>
                <div>
                  <h4 className="font-editorial text-lg leading-snug text-[#2C221E] dark:text-[#F5EFEB]">
                    {area.title}
                  </h4>
                  <p className="font-sans-human mt-1 text-xs leading-relaxed text-[#6B5E57] dark:text-[#A89B93]">
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
