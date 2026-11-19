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
        return <Heart className="w-3.5 h-3.5" />;
      case 'academy':
        return <Palette className="w-3.5 h-3.5" />;
      case 'social':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'nature':
        return <Camera className="w-3.5 h-3.5" />;
      case 'music':
        return <Music className="w-3.5 h-3.5" />;
      case 'publication':
        return <BookOpen className="w-3.5 h-3.5" />;
      default:
        return <Tag className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="album" className="py-24 sm:py-32 relative overflow-hidden bg-[#F7F3EB] dark:bg-[#1A1614] border-t border-[#2C221E]/10 dark:border-white/10">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C86D51]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#E09F3E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C86D51] font-semibold mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>{t.photos?.tag || (language === 'en' ? 'HISTORIC PHOTO ARCHIVE' : 'ARCHIVO FOTOGRÁFICO HISTÓRICO')}</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#2C221E] dark:text-[#F5EFEB] leading-tight tracking-tight">
            {t.photos?.title || (language === 'en' ? 'Memories & Life: Archival Photo Album' : 'Álbum de Archivo · Memorias y Vida')}
          </h2>
          <p className="font-sans-human text-base sm:text-lg text-[#6B5E57] dark:text-[#A89B93] mt-4 leading-relaxed">
            {t.photos?.subtitle || (language === 'en'
              ? 'Rare original photographs and official publications documenting Cecilia’s childhood in Barrio Amón, ballet training, fine arts ateliers in UCR and Mexico, civic leadership, and joyful guitar gatherings.'
              : 'Fotografías originales y publicaciones oficiales que atesoran la infancia de Cecilia en Barrio Amón, su temprana pasión por el ballet, los talleres de escultura y pintura en la UCR y México, su liderazgo cívico y sus alegres tertulias con guitarra.')}
          </p>
          <div className="w-16 h-0.5 bg-[#C86D51] mx-auto mt-6" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(
            [
              { key: 'all', label: language === 'en' ? 'All (19)' : 'Todas (19)' },
              { key: 'youth', label: language === 'en' ? 'Childhood & Youth' : 'Infancia y Juventud' },
              { key: 'academy', label: language === 'en' ? 'Atelier & Fine Arts' : 'Academia y Taller' },
              { key: 'music', label: language === 'en' ? 'Song & Guitar' : 'Canto y Guitarra' },
              { key: 'social', label: language === 'en' ? 'Civic & Social Life' : 'Vida Cívica y Social' },
              { key: 'nature', label: language === 'en' ? 'Nature & Family' : 'Naturaleza y Familia' },
              { key: 'publication', label: language === 'en' ? 'Books & Tributes' : 'Libros y Homenajes' }
            ] as const
          ).map((filter) => {
            const isActive = selectedCategory === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => setSelectedCategory(filter.key as PhotoCategory)}
                className={`px-4 py-2 rounded-full text-xs font-sans-human font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2C221E] text-white dark:bg-[#F5EFEB] dark:text-[#2C221E] shadow-sm'
                    : 'bg-[#EFE9DC]/80 dark:bg-[#251E1A] text-[#6B5E57] dark:text-[#A89B93] hover:text-[#2C221E] dark:hover:text-[#F5EFEB] border border-[#2C221E]/10 dark:border-white/10'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                className="group relative rounded-xl p-3 sm:p-3.5 bg-[#FAF7F0] dark:bg-[#221B18] border border-[#2C221E]/12 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Photo Frame */}
                <div>
                  <div className="relative overflow-hidden rounded-lg bg-[#EFE9DC] dark:bg-[#1A1614] aspect-4/5">
                    <img
                      src={photo.image}
                      alt={title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Year Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#2C221E]/80 backdrop-blur-md text-white text-[10px] font-mono font-medium tracking-wide">
                      {photo.year}
                    </div>

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 bg-[#2C221E]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="p-2.5 rounded-full bg-white/90 dark:bg-[#2C221E]/90 text-[#2C221E] dark:text-white shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Caption & Category */}
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-semibold text-[#C86D51] dark:text-[#EDB45D] tracking-wider">
                      {getCategoryIcon(photo.category)}
                      <span>{getCategoryLabel(photo.category)}</span>
                    </div>

                    <h3 className="font-editorial text-lg text-[#2C221E] dark:text-[#F5EFEB] leading-snug font-medium line-clamp-1 group-hover:text-[#C86D51] transition-colors">
                      {title}
                    </h3>

                    <p className="font-sans-human text-xs text-[#6B5E57] dark:text-[#A89B93] line-clamp-2 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>

                {/* Bottom link indicator */}
                <div className="mt-3 pt-2 border-t border-[#2C221E]/8 dark:border-white/8 flex items-center justify-between text-[10px] text-[#6B5E57] dark:text-[#A89B93]">
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
              className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[#FAF7F0] dark:bg-[#201916] rounded-2xl border border-[#2C221E]/15 dark:border-white/15 shadow-2xl overflow-hidden flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#2C221E]/70 hover:bg-[#2C221E] text-white backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Nav Buttons on Image */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPhoto();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#2C221E]/70 hover:bg-[#2C221E] text-white backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPhoto();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 lg:right-auto lg:left-[calc(55%-40px)] p-2 rounded-full bg-[#2C221E]/70 hover:bg-[#2C221E] text-white backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="Foto siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Left / Top: High-Res Image Display */}
              <div className="lg:w-7/12 bg-[#1A1614] flex items-center justify-center p-4 sm:p-6 overflow-hidden min-h-75 lg:min-h-125">
                <img
                  src={activePhoto.image}
                  alt={language === 'en' ? activePhoto.titleEn : activePhoto.titleEs}
                  className="max-h-[60vh] lg:max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Right / Bottom: Archival Information & Context */}
              <div className="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[40vh] lg:max-h-[75vh]">
                <div className="space-y-4">
                  {/* Category Pill and Year */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE9DC] dark:bg-[#281F1A] text-[#C86D51] dark:text-[#EDB45D] text-xs font-semibold uppercase tracking-wider">
                      {getCategoryIcon(activePhoto.category)}
                      <span>{getCategoryLabel(activePhoto.category)}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-[#6B5E57] dark:text-[#A89B93]">
                      <Calendar className="w-3.5 h-3.5" />
                      {activePhoto.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#2C221E] dark:text-[#F5EFEB] leading-tight">
                    {language === 'en' ? activePhoto.titleEn : activePhoto.titleEs}
                  </h3>

                  {/* Curatorial Story */}
                  <div className="pt-2 border-t border-[#2C221E]/10 dark:border-white/10">
                    <p className="font-sans-human text-sm sm:text-base leading-relaxed text-[#6B5E57] dark:text-[#A89B93]">
                      {language === 'en' ? activePhoto.descEn : activePhoto.descEs}
                    </p>
                  </div>
                </div>

                {/* Bottom Navigation Hint */}
                <div className="mt-8 pt-4 border-t border-[#2C221E]/10 dark:border-white/10 flex items-center justify-between text-xs text-[#6B5E57] dark:text-[#A89B93]">
                  <span>
                    {filteredPhotos.findIndex((p) => p.id === activePhoto.id) + 1} / {filteredPhotos.length}
                  </span>
                  <span className="font-mono text-[11px]">
                    {language === 'en' ? 'Use ← → keys to browse' : 'Usa las flechas ← → para navegar'}
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
