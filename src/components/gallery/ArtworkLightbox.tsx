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
  const tags = language === 'en' ? artwork.tagsEn : artwork.tagsEs;
  const shareOrigin = import.meta.env.VITE_SITE_URL || window.location.origin;
  const shareUrl = new URL(`/share/${encodeURIComponent(artwork.id)}/`, shareOrigin).href;
  const shareTitle = `${title} (${artwork.year}) — Cecilia Amighetti Prieto`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#1A1614]/95 p-3 backdrop-blur-xl sm:p-6 lg:p-8">
        {/* Backdrop click to close */}
        <div className="absolute inset-0 -z-10" onClick={onClose} />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#F7F3EB] shadow-2xl lg:flex-row dark:border-white/10 dark:bg-[#201916]"
        >
          {/* Top Bar on Mobile & Controls Bar */}
          <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setIsShareMenuOpen((isOpen) => !isOpen)}
                className="cursor-pointer rounded-full bg-[#EFE9DC]/90 p-2.5 text-[#2C221E] shadow-sm transition-all hover:bg-[#C86D51] hover:text-white dark:bg-[#2C221E]/90 dark:text-[#F5EFEB]"
                title={t.lightbox.shareBtn}
                aria-label={t.lightbox.shareBtn}
                aria-expanded={isShareMenuOpen}
                aria-haspopup="true"
              >
                <Share2 className="h-4 w-4" />
              </button>
              {isShareMenuOpen && (
                <div className="absolute top-full right-0 mt-2 grid w-44 grid-cols-3 gap-3 rounded-xl border border-[#2C221E]/10 bg-[#F7F3EB] p-3 shadow-xl dark:border-white/10 dark:bg-[#201916]">
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
                  <WhatsappShareButton
                    url={shareUrl}
                    title={shareTitle}
                    aria-label="Share on WhatsApp"
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <LinkedinShareButton
                    url={shareUrl}
                    title={shareTitle}
                    aria-label="Share on LinkedIn"
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <BlueskyShareButton
                    url={shareUrl}
                    title={shareTitle}
                    aria-label="Share on Bluesky"
                  >
                    <BlueskyIcon size={32} round />
                  </BlueskyShareButton>
                  <TelegramShareButton
                    url={shareUrl}
                    title={shareTitle}
                    aria-label="Share on Telegram"
                  >
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer rounded-full bg-[#EFE9DC]/90 p-2.5 text-[#2C221E] shadow-sm transition-all hover:bg-[#C86D51] hover:text-white dark:bg-[#2C221E]/90 dark:text-[#F5EFEB]"
              aria-label={t.lightbox.close}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Left / Center: Interactive Canvas Viewer */}
          <div className="relative flex min-h-95 items-center justify-center overflow-hidden bg-[#E9E3D5] p-4 select-none sm:p-8 lg:min-h-145 lg:w-7/12 xl:w-2/3 dark:bg-[#141110]">
            {/* Previous & Next Arrow Controls */}
            <button
              onClick={onPrevious}
              className="absolute top-1/2 left-3 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-[#F7F3EB]/80 p-3 text-[#2C221E] shadow-md transition-all hover:bg-[#C86D51] hover:text-white dark:bg-[#2C221E]/80 dark:text-[#F5EFEB]"
              aria-label={t.lightbox.previous}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={onNext}
              className="absolute top-1/2 right-3 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-[#F7F3EB]/80 p-3 text-[#2C221E] shadow-md transition-all hover:bg-[#C86D51] hover:text-white dark:bg-[#2C221E]/80 dark:text-[#F5EFEB]"
              aria-label={t.lightbox.next}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Draggable & Zoomable Canvas Image */}
            <div
              className={`flex h-full w-full items-center justify-center transition-all ${
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
                className="max-h-[75vh] max-w-full rounded-sm object-contain shadow-2xl transition-transform duration-200"
                draggable={false}
              />
            </div>

            {/* Zoom Control Bar Bottom-Center */}
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#2C221E]/10 bg-[#F7F3EB]/90 px-3 py-1.5 text-xs shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-[#2C221E]/90">
              <button
                onClick={handleZoomIn}
                className="p-1.5 text-[#2C221E] transition-colors hover:text-[#C86D51] dark:text-[#F5EFEB]"
                title={t.lightbox.zoomIn}
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <span className="px-1 font-mono text-[11px] text-[#6B5E57] dark:text-[#A89B93]">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-1.5 text-[#2C221E] transition-colors hover:text-[#C86D51] disabled:opacity-30 dark:text-[#F5EFEB]"
                title={t.lightbox.zoomOut}
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              {zoomLevel > 1 && (
                <button
                  onClick={handleResetZoom}
                  className="ml-1 p-1.5 text-[10px] font-semibold text-[#C86D51] uppercase hover:underline"
                  title={t.lightbox.resetZoom}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Curatorial Story & Metadata Sidebar */}
          <div className="flex max-h-[75vh] flex-col justify-between overflow-y-auto p-6 sm:p-8 lg:max-h-[85vh] lg:w-5/12 xl:w-1/3">
            <div className="space-y-6">
              {/* Collection Pill */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#EFE9DC] px-2.5 py-1 text-[10px] font-semibold tracking-widest text-[#C86D51] uppercase dark:bg-[#2C221E] dark:text-[#EDB45D]">
                  <Sparkles className="h-3 w-3" />
                  <span>{artwork.year}</span>
                </span>
                {/* <span className="text-xs text-[#6B5E57] dark:text-[#A89B93] font-mono">
                  {artwork.id}
                </span> */}
              </div>

              {/* Title */}
              <div>
                <h3 className="font-editorial text-3xl leading-tight text-[#2C221E] sm:text-4xl dark:text-[#F5EFEB]">
                  {title}
                </h3>
                <p className="mt-1 font-serif text-sm text-[#C86D51] italic dark:text-[#EDB45D]">
                  {medium}
                </p>
              </div>

              {/* Artwork Specifications Table */}
              <div className="grid grid-cols-2 gap-3 border-y border-[#2C221E]/10 py-3 text-xs dark:border-white/10">
                {artwork.dimensions && (
                  <div>
                    <span className="block text-[10px] tracking-wider text-[#6B5E57] uppercase dark:text-[#A89B93]">
                      {t.lightbox.dimensions}
                    </span>
                    <span className="font-medium text-[#2C221E] dark:text-[#F5EFEB]">
                      {artwork.dimensions}
                    </span>
                  </div>
                )}
                <div>
                  <span className="block text-[10px] tracking-wider text-[#6B5E57] uppercase dark:text-[#A89B93]">
                    {t.lightbox.series}
                  </span>
                  <span className="font-medium text-[#2C221E] capitalize dark:text-[#F5EFEB]">
                    {artwork.series}
                  </span>
                </div>
              </div>

              {/* Curated Story Narrative */}
              <div>
                <h4 className="mb-2 text-xs font-semibold tracking-widest text-[#2D5A43] uppercase dark:text-[#4E8A6B]">
                  {t.lightbox.storyHeader}
                </h4>
                <p className="font-serif text-sm leading-relaxed text-[#6B5E57] sm:text-base dark:text-[#A89B93]">
                  {story}
                </p>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-[#EFE9DC]/60 px-2 py-0.5 text-[10px] text-[#6B5E57] dark:bg-[#251E1A] dark:text-[#A89B93]"
                    >
                      #{tag.toLowerCase().replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions: Inquire Directly about this work */}
            <div className="mt-8 flex flex-col gap-2 border-t border-[#2C221E]/10 pt-4 dark:border-white/10">
              <button
                onClick={() => {
                  onClose();
                  onInquire(artwork.id);
                }}
                className="font-sans-human flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#C86D51] px-4 py-3 text-xs font-medium tracking-wider text-white uppercase shadow-md transition-colors hover:bg-[#B3593F]"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{t.lightbox.inquireBtn}</span>
              </button>
              <p className="text-center text-[10px] text-[#6B5E57] dark:text-[#A89B93]">
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
