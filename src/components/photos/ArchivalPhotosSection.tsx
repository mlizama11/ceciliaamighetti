import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  Tag,
  BookOpen,
  Music,
  Heart,
  Palette
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { archivalPhotos, ArchivalPhoto } from '../../data/photos';

type PhotoCategory = 'all' | 'youth' | 'academy' | 'social' | 'nature' | 'music' | 'publication';

export const ArchivalPhotosSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>('all');
  const [activePhoto, setActivePhoto] = useState<ArchivalPhoto | null>(null);

  // Filter photos
  const filteredPhotos = archivalPhotos.filter((photo) => {
    if (selectedCategory === 'all') return true;
    return photo.category === selectedCategory;
  });

  // Handle modal keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === 'Escape') setActivePhoto(null);
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  const handlePrevPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[prevIndex]);
  };

  const handleNextPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIndex]);
  };

  const getCategoryLabel = (cat: ArchivalPhoto['category']) => {
    switch (cat) {
      case 'youth':
        return language === 'en' ? 'Youth & Roots' : 'Infancia y Raíces';
      case 'academy':
        return language === 'en' ? 'Atelier & Fine Arts' : 'Academia y Taller';
      case 'social':
        return language === 'en' ? 'Civic & Social Life' : 'Vida Cívica y Social';
      case 'nature':
        return language === 'en' ? 'Nature & Family' : 'Naturaleza y Familia';
      case 'music':
        return language === 'en' ? 'Music & Song' : 'Música y Canto';
      case 'publication':
        return language === 'en' ? 'Books & Tributes' : 'Libros y Homenajes';
      default:
        return cat;
    }
  };

  const getCategoryIcon = (cat: ArchivalPhoto['category']) => {
    switch (cat) {
      case 'youth':
        return <Heart className="h-3.5 w-3.5" />;
      case 'academy':
        return <Palette className="h-3.5 w-3.5" />;
      case 'social':
        return <Sparkles className="h-3.5 w-3.5" />;
      case 'nature':
        return <Camera className="h-3.5 w-3.5" />;
      case 'music':
        return <Music className="h-3.5 w-3.5" />;
      case 'publication':
        return <BookOpen className="h-3.5 w-3.5" />;
      default:
        return <Tag className="h-3.5 w-3.5" />;
    }
  };

  return (
    <section
      id="album"
      className="relative overflow-hidden border-t border-[#2C221E]/10 bg-[#F7F3EB] py-24 sm:py-32 dark:border-white/10 dark:bg-[#1A1614]"
    >
      {/* Decorative ambient glow */}
      <div className="pointer-events-none absolute top-1/4 right-0 h-96 w-96 rounded-full bg-[#C86D51]/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-[#E09F3E]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C86D51] uppercase">
            <Camera className="h-3.5 w-3.5" />
            <span>
              {t.photos?.tag ||
                (language === 'en' ? 'HISTORIC PHOTO ARCHIVE' : 'ARCHIVO FOTOGRÁFICO HISTÓRICO')}
            </span>
          </div>
          <h2 className="font-editorial text-4xl leading-tight tracking-tight text-[#2C221E] sm:text-5xl lg:text-6xl dark:text-[#F5EFEB]">
            {t.photos?.title ||
              (language === 'en'
                ? 'Memories & Life: Archival Photo Album'
                : 'Álbum de Archivo · Memorias y Vida')}
          </h2>
          <p className="font-sans-human mt-4 text-base leading-relaxed text-[#6B5E57] sm:text-lg dark:text-[#A89B93]">
            {t.photos?.subtitle ||
              (language === 'en'
                ? 'Rare original photographs and official publications documenting Cecilia’s childhood in Barrio Amón, ballet training, fine arts ateliers in UCR and Mexico, civic leadership, and joyful guitar gatherings.'
                : 'Fotografías originales y publicaciones oficiales que atesoran la infancia de Cecilia en Barrio Amón, su temprana pasión por el ballet, los talleres de escultura y pintura en la UCR y México, su liderazgo cívico y sus alegres tertulias con guitarra.')}
          </p>
          <div className="mx-auto mt-6 h-0.5 w-16 bg-[#C86D51]" />
        </div>

        {/* Filter Pills */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {(
            [
              { key: 'all', label: language === 'en' ? 'All (19)' : 'Todas (19)' },
              {
                key: 'youth',
                label: language === 'en' ? 'Childhood & Youth' : 'Infancia y Juventud'
              },
              {
                key: 'academy',
                label: language === 'en' ? 'Atelier & Fine Arts' : 'Academia y Taller'
              },
              { key: 'music', label: language === 'en' ? 'Song & Guitar' : 'Canto y Guitarra' },
              {
                key: 'social',
                label: language === 'en' ? 'Civic & Social Life' : 'Vida Cívica y Social'
              },
              {
                key: 'nature',
                label: language === 'en' ? 'Nature & Family' : 'Naturaleza y Familia'
              },
              {
                key: 'publication',
                label: language === 'en' ? 'Books & Tributes' : 'Libros y Homenajes'
              }
            ] as const
          ).map((filter) => {
            const isActive = selectedCategory === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => setSelectedCategory(filter.key as PhotoCategory)}
                className={`font-sans-human cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#2C221E] text-white shadow-sm dark:bg-[#F5EFEB] dark:text-[#2C221E]'
                    : 'border border-[#2C221E]/10 bg-[#EFE9DC]/80 text-[#6B5E57] hover:text-[#2C221E] dark:border-white/10 dark:bg-[#251E1A] dark:text-[#A89B93] dark:hover:text-[#F5EFEB]'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPhotos.map((photo, index) => {
            const title = language === 'en' ? photo.titleEn : photo.titleEs;
            const desc = language === 'en' ? photo.descEn : photo.descEs;

            return (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                onClick={() => setActivePhoto(photo)}
                className="group relative flex cursor-pointer flex-col justify-between rounded-xl border border-[#2C221E]/12 bg-[#FAF7F0] p-3 shadow-md transition-all duration-300 hover:shadow-xl sm:p-3.5 dark:border-white/10 dark:bg-[#221B18]"
              >
                {/* Photo Frame */}
                <div>
                  <div className="relative aspect-4/5 overflow-hidden rounded-lg bg-[#EFE9DC] dark:bg-[#1A1614]">
                    <img
                      src={photo.image}
                      alt={title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Year Badge */}
                    <div className="absolute top-2.5 left-2.5 rounded-full bg-[#2C221E]/80 px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-wide text-white backdrop-blur-md">
                      {photo.year}
                    </div>

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-[#2C221E]/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="translate-y-2 transform rounded-full bg-white/90 p-2.5 text-[#2C221E] shadow-lg transition-transform duration-300 group-hover:translate-y-0 dark:bg-[#2C221E]/90 dark:text-white">
                        <Maximize2 className="h-4 w-4" />
                      </span>
                    </div>
                  </div>

                  {/* Caption & Category */}
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-[#C86D51] uppercase dark:text-[#EDB45D]">
                      {getCategoryIcon(photo.category)}
                      <span>{getCategoryLabel(photo.category)}</span>
                    </div>

                    <h3 className="font-editorial line-clamp-1 text-lg leading-snug font-medium text-[#2C221E] transition-colors group-hover:text-[#C86D51] dark:text-[#F5EFEB]">
                      {title}
                    </h3>

                    <p className="font-sans-human line-clamp-2 text-xs leading-relaxed text-[#6B5E57] dark:text-[#A89B93]">
                      {desc}
                    </p>
                  </div>
                </div>

                {/* Bottom link indicator */}
                <div className="mt-3 flex items-center justify-between border-t border-[#2C221E]/8 pt-2 text-[10px] text-[#6B5E57] dark:border-white/8 dark:text-[#A89B93]">
                  <span>{photo.id.replace('photo-', '#')}</span>
                  <span className="text-[#C86D51] group-hover:underline">
                    {language === 'en' ? 'View details →' : 'Ver detalle →'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Archival Photo Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="absolute inset-0 bg-[#1A1614]/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#2C221E]/15 bg-[#FAF7F0] shadow-2xl lg:flex-row dark:border-white/15 dark:bg-[#201916]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-20 cursor-pointer rounded-full bg-[#2C221E]/70 p-2 text-white backdrop-blur-sm transition-colors hover:bg-[#2C221E]"
                aria-label="Cerrar modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Prev / Next Nav Buttons on Image */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPhoto();
                }}
                className="absolute top-1/2 left-3 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-[#2C221E]/70 p-2 text-white backdrop-blur-sm transition-colors hover:bg-[#2C221E]"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPhoto();
                }}
                className="absolute top-1/2 right-3 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-[#2C221E]/70 p-2 text-white backdrop-blur-sm transition-colors hover:bg-[#2C221E] lg:right-auto lg:left-[calc(55%-40px)]"
                aria-label="Foto siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Left / Top: High-Res Image Display */}
              <div className="flex min-h-75 items-center justify-center overflow-hidden bg-[#1A1614] p-4 sm:p-6 lg:min-h-125 lg:w-7/12">
                <img
                  src={activePhoto.image}
                  alt={language === 'en' ? activePhoto.titleEn : activePhoto.titleEs}
                  className="max-h-[60vh] w-auto max-w-full rounded-lg object-contain shadow-2xl lg:max-h-[75vh]"
                />
              </div>

              {/* Right / Bottom: Archival Information & Context */}
              <div className="flex max-h-[40vh] flex-col justify-between overflow-y-auto p-6 sm:p-8 lg:max-h-[75vh] lg:w-5/12">
                <div className="space-y-4">
                  {/* Category Pill and Year */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFE9DC] px-3 py-1 text-xs font-semibold tracking-wider text-[#C86D51] uppercase dark:bg-[#281F1A] dark:text-[#EDB45D]">
                      {getCategoryIcon(activePhoto.category)}
                      <span>{getCategoryLabel(activePhoto.category)}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-[#6B5E57] dark:text-[#A89B93]">
                      <Calendar className="h-3.5 w-3.5" />
                      {activePhoto.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-editorial text-2xl leading-tight text-[#2C221E] sm:text-3xl dark:text-[#F5EFEB]">
                    {language === 'en' ? activePhoto.titleEn : activePhoto.titleEs}
                  </h3>

                  {/* Curatorial Story */}
                  <div className="border-t border-[#2C221E]/10 pt-2 dark:border-white/10">
                    <p className="font-sans-human text-sm leading-relaxed text-[#6B5E57] sm:text-base dark:text-[#A89B93]">
                      {language === 'en' ? activePhoto.descEn : activePhoto.descEs}
                    </p>
                  </div>
                </div>

                {/* Bottom Navigation Hint */}
                <div className="mt-8 flex items-center justify-between border-t border-[#2C221E]/10 pt-4 text-xs text-[#6B5E57] dark:border-white/10 dark:text-[#A89B93]">
                  <span>
                    {filteredPhotos.findIndex((p) => p.id === activePhoto.id) + 1} /{' '}
                    {filteredPhotos.length}
                  </span>
                  <span className="font-mono text-[11px]">
                    {language === 'en'
                      ? 'Use ← → keys to browse'
                      : 'Usa las flechas ← → para navegar'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
