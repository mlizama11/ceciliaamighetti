import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Send,
  Share2,
  Maximize2
} from 'lucide-react';
import {
  BlueskyIcon,
  BlueskyShareButton,
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share';
import { Artwork } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface ArtworkLightboxProps {
  artwork: Artwork | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onInquire: (artworkId: string) => void;
}

export const ArtworkLightbox: React.FC<ArtworkLightboxProps> = ({
  artwork,
  onClose,
  onPrevious,
  onNext,
  onInquire
}) => {
  const { t, language } = useLanguage();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

  // Reset zoom on artwork change
  useEffect(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, [artwork]);

  // Keyboard navigation & lock scroll
  useEffect(() => {
    if (!artwork) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-') handleZoomOut();
      if (e.key === '0') handleResetZoom();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [artwork]);

  if (!artwork) return null;

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const title = language === 'en' ? artwork.titleEn : artwork.titleEs;
  const medium = language === 'en' ? artwork.mediumEn : artwork.mediumEs;
  const story = language === 'en' ? artwork.storyEn : artwork.storyEs;
  const shareOrigin = import.meta.env.VITE_SITE_URL || window.location.origin;
  const shareUrl = new URL(
    `/share/${encodeURIComponent(artwork.id)}/`,
    shareOrigin
  ).href;
  const shareTitle = `${title} (${artwork.year}) — Cecilia Amighetti Prieto`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-hidden bg-[#1A1614]/95 backdrop-blur-xl">
        {/* Backdrop click to close */}
        <div className="absolute inset-0 -z-10" onClick={onClose} />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-6xl max-h-[92vh] bg-[#F7F3EB] dark:bg-[#201916] rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 flex flex-col lg:flex-row overflow-hidden"
        >
          {/* Top Bar on Mobile & Controls Bar */}
          <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setIsShareMenuOpen((isOpen) => !isOpen)}
                className="p-2.5 rounded-full bg-[#EFE9DC]/90 dark:bg-[#2C221E]/90 text-[#2C221E] dark:text-[#F5EFEB] hover:bg-[#C86D51] hover:text-white transition-all shadow-sm cursor-pointer"
                title={t.lightbox.shareBtn}
                aria-label={t.lightbox.shareBtn}
                aria-expanded={isShareMenuOpen}
                aria-haspopup="true"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {isShareMenuOpen && (
                <div className="absolute right-0 top-full mt-2 grid w-44 grid-cols-3 gap-3 rounded-xl border border-[#2C221E]/10 dark:border-white/10 bg-[#F7F3EB] dark:bg-[#201916] p-3 shadow-xl">
                  <EmailShareButton
                    url={shareUrl}
                    subject={shareTitle}
                    body={shareTitle}
                    aria-label="Share by email"
                    title="Email"
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                  <FacebookShareButton url={shareUrl} aria-label="Share on Facebook">
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <WhatsappShareButton url={shareUrl} title={shareTitle} aria-label="Share on WhatsApp">
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <LinkedinShareButton url={shareUrl} title={shareTitle} aria-label="Share on LinkedIn">
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <BlueskyShareButton url={shareUrl} title={shareTitle} aria-label="Share on Bluesky">
                    <BlueskyIcon size={32} round />
                  </BlueskyShareButton>
                  <TelegramShareButton url={shareUrl} title={shareTitle} aria-label="Share on Telegram">
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#EFE9DC]/90 dark:bg-[#2C221E]/90 text-[#2C221E] dark:text-[#F5EFEB] hover:bg-[#C86D51] hover:text-white transition-all shadow-sm cursor-pointer"
              aria-label={t.lightbox.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Left / Center: Interactive Canvas Viewer */}
          <div className="lg:w-7/12 xl:w-2/3 bg-[#E9E3D5] dark:bg-[#141110] relative flex items-center justify-center min-h-95 lg:min-h-145 p-4 sm:p-8 select-none overflow-hidden">
            {/* Previous & Next Arrow Controls */}
            <button
              onClick={onPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#F7F3EB]/80 dark:bg-[#2C221E]/80 text-[#2C221E] dark:text-[#F5EFEB] hover:bg-[#C86D51] hover:text-white transition-all shadow-md cursor-pointer"
              aria-label={t.lightbox.previous}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#F7F3EB]/80 dark:bg-[#2C221E]/80 text-[#2C221E] dark:text-[#F5EFEB] hover:bg-[#C86D51] hover:text-white transition-all shadow-md cursor-pointer"
              aria-label={t.lightbox.next}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Draggable & Zoomable Canvas Image */}
            <div
              className={`w-full h-full flex items-center justify-center transition-all ${
                zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <motion.img
                key={artwork.id}
                src={`/artworks/${artwork.image}`}
                alt={title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                  transformOrigin: 'center center'
                }}
                className="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-sm transition-transform duration-200"
                draggable={false}
              />
            </div>

            {/* Zoom Control Bar Bottom-Center */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F7F3EB]/90 dark:bg-[#2C221E]/90 backdrop-blur-md border border-[#2C221E]/10 dark:border-white/10 shadow-lg text-xs">
              <button
                onClick={handleZoomIn}
                className="p-1.5 text-[#2C221E] dark:text-[#F5EFEB] hover:text-[#C86D51] transition-colors"
                title={t.lightbox.zoomIn}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <span className="font-mono text-[11px] text-[#6B5E57] dark:text-[#A89B93] px-1">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-1.5 text-[#2C221E] dark:text-[#F5EFEB] hover:text-[#C86D51] disabled:opacity-30 transition-colors"
                title={t.lightbox.zoomOut}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              {zoomLevel > 1 && (
                <button
                  onClick={handleResetZoom}
                  className="p-1.5 text-[#C86D51] hover:underline text-[10px] uppercase font-semibold ml-1"
                  title={t.lightbox.resetZoom}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Curatorial Story & Metadata Sidebar */}
          <div className="lg:w-5/12 xl:w-1/3 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[75vh] lg:max-h-[85vh]">
            <div className="space-y-6">
              {/* Collection Pill */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EFE9DC] dark:bg-[#2C221E] text-[#C86D51] dark:text-[#EDB45D] text-[10px] font-semibold uppercase tracking-widest">
                  <Sparkles className="w-3 h-3" />
                  <span>{artwork.year}</span>
                </span>
                {/* <span className="text-xs text-[#6B5E57] dark:text-[#A89B93] font-mono">
                  {artwork.id}
                </span> */}
              </div>

              {/* Title */}
              <div>
                <h3 className="font-editorial text-3xl sm:text-4xl text-[#2C221E] dark:text-[#F5EFEB] leading-tight">
                  {title}
                </h3>
                <p className="font-serif italic text-sm text-[#C86D51] dark:text-[#EDB45D] mt-1">
                  {medium}
                </p>
              </div>

              {/* Artwork Specifications Table */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#2C221E]/10 dark:border-white/10 text-xs">
                {artwork.dimensions && (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#6B5E57] dark:text-[#A89B93] block">
                      {t.lightbox.dimensions}
                    </span>
                    <span className="font-medium text-[#2C221E] dark:text-[#F5EFEB]">
                      {artwork.dimensions}
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#6B5E57] dark:text-[#A89B93] block">
                    {t.lightbox.series}
                  </span>
                  <span className="font-medium text-[#2C221E] dark:text-[#F5EFEB] capitalize">
                    {artwork.series}
                  </span>
                </div>
                {artwork.signedNote && (
                  <div className="col-span-2 pt-1 text-[11px] text-[#6B5E57] dark:text-[#A89B93] italic">
                    {artwork.signedNote}
                  </div>
                )}
              </div>

              {/* Curated Story Narrative */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#2D5A43] dark:text-[#4E8A6B] font-semibold mb-2">
                  {t.lightbox.storyHeader}
                </h4>
                <p className="font-serif text-sm sm:text-base leading-relaxed text-[#6B5E57] dark:text-[#A89B93]">
                  {story}
                </p>
              </div>

              {/* Tags */}
              {artwork.tags && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {artwork.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] bg-[#EFE9DC]/60 dark:bg-[#251E1A] text-[#6B5E57] dark:text-[#A89B93]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions: Inquire Directly about this work */}
            <div className="mt-8 pt-4 border-t border-[#2C221E]/10 dark:border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  onClose();
                  onInquire(artwork.id);
                }}
                className="w-full py-3 px-4 rounded-lg bg-[#C86D51] hover:bg-[#B3593F] text-white font-sans-human font-medium text-xs tracking-wider uppercase transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.lightbox.inquireBtn}</span>
              </button>
              <p className="text-[10px] text-center text-[#6B5E57] dark:text-[#A89B93]">
                {language === 'en'
                  ? 'Inquiries are received by the Cecilia Amighetti Estate Archive.'
                  : 'Las consultas son atendidas por el Archivo Familiar de Cecilia Amighetti.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
