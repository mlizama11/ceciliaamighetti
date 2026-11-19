import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Eye, ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { artworks } from '../../data/artworks';
import { Artwork, ArtworkSeries } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface GallerySectionProps {
  onSelectArtwork: (artwork: Artwork) => void;
}

type SortOption = 'default' | 'newest' | 'oldest' | 'title';

export const GallerySection: React.FC<GallerySectionProps> = ({ onSelectArtwork }) => {
  const { t, language } = useLanguage();
  const [activeSeries, setActiveSeries] = useState<ArtworkSeries>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false);
      }
    };
    if (sortDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [sortDropdownOpen]);

  const sortOptions: { key: SortOption; label: string }[] = [
    {
      key: 'default',
      label: language === 'en' ? 'Curated Selection' : 'Selección Curatorial'
    },
    {
      key: 'newest',
      label: t.gallery.sortNewest
    },
    {
      key: 'oldest',
      label: t.gallery.sortOldest
    },
    {
      key: 'title',
      label: t.gallery.sortTitle
    }
  ];

  const currentSortLabel = sortOptions.find((o) => o.key === sortBy)?.label;

  const filterTabs: { key: ArtworkSeries; label: string }[] = [
    { key: 'all', label: `${t.gallery.filterAll} (${artworks.length})` },
    { key: 'amantes', label: t.gallery.filterAmantes },
    { key: 'fabulas', label: t.gallery.filterFabulas },
    { key: 'gente', label: t.gallery.filterGente },
    { key: 'retratos', label: t.gallery.filterRetratos },
    { key: 'paisajes', label: t.gallery.filterPaisajes },
    { key: 'bodegones', label: t.gallery.filterBodegones }
  ];

  const filteredArtworks = useMemo(() => {
    return artworks
      .filter((item) => {
        if (activeSeries !== 'all' && item.series !== activeSeries) {
          return false;
        }
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitleEn = item.titleEn.toLowerCase().includes(q);
          const matchTitleEs = item.titleEs.toLowerCase().includes(q);
          const matchMedium =
            item.mediumEn.toLowerCase().includes(q) || item.mediumEs.toLowerCase().includes(q);
          const matchYear = item.year.includes(q);
          const matchStory =
            item.storyEn.toLowerCase().includes(q) || item.storyEs.toLowerCase().includes(q);
          const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));

          return matchTitleEn || matchTitleEs || matchMedium || matchYear || matchStory || matchTags;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return b.year.localeCompare(a.year);
        }
        if (sortBy === 'oldest') {
          return a.year.localeCompare(b.year);
        }
        if (sortBy === 'title') {
          const titleA = language === 'en' ? a.titleEn : a.titleEs;
          const titleB = language === 'en' ? b.titleEn : b.titleEs;
          return titleA.localeCompare(titleB);
        }
        if (a.isHighlight && !b.isHighlight) return -1;
        if (!a.isHighlight && b.isHighlight) return 1;
        return 0;
      });
  }, [activeSeries, searchQuery, sortBy, language]);

  return (
    <section id="obras" className="py-24 sm:py-32 relative bg-[#F7F3EB] dark:bg-[#1A1614] border-b border-[#2C221E]/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C86D51] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.gallery.tag}</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#2C221E] dark:text-[#F5EFEB] leading-tight">
            {t.gallery.title}
          </h2>
          <p className="font-serif text-base sm:text-lg text-[#6B5E57] dark:text-[#A89B93] mt-4 leading-relaxed">
            {t.gallery.subtitle}
          </p>
          <div className="w-16 h-0.5 bg-[#C86D51] mx-auto mt-6" />
        </div>

        {/* Filter Navigation & Search Bar */}
        <div className="space-y-6 mb-12">
          {/* Scrollable Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar justify-start sm:justify-center">
            {filterTabs.map((tab) => {
              const isActive = activeSeries === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveSeries(tab.key)}
                  className={`px-4 py-2 rounded-full text-xs font-sans-human font-medium tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#2C221E] dark:bg-[#F5EFEB] text-[#F7F3EB] dark:text-[#1A1614] shadow-md'
                      : 'bg-[#FAF7F0] dark:bg-[#241E1B] text-[#6B5E57] dark:text-[#A89B93] hover:text-[#2C221E] dark:hover:text-[#F5EFEB] border border-[#2C221E]/10 dark:border-white/10 hover:border-[#C86D51]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input & Custom Styled Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#6B5E57] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.gallery.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAF7F0] dark:bg-[#241E1B] border border-[#2C221E]/15 dark:border-white/15 text-xs text-[#2C221E] dark:text-[#F5EFEB] placeholder-[#6B5E57]/60 focus:outline-none focus:border-[#C86D51] shadow-xs transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B5E57] hover:text-[#C86D51] cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>

            {/* Counter & Custom Studio Dropdown */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end text-xs text-[#6B5E57] dark:text-[#A89B93]">
              <span className="font-mono text-[11px] whitespace-nowrap">
                {filteredArtworks.length} {t.gallery.countLabel}
              </span>

              {/* Custom Styled Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FAF7F0] dark:bg-[#241E1B] border border-[#2C221E]/15 dark:border-white/15 hover:border-[#C86D51] text-xs font-sans-human font-medium text-[#2C221E] dark:text-[#F5EFEB] shadow-xs transition-all cursor-pointer group"
                  aria-expanded={sortDropdownOpen}
                >
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#C86D51] group-hover:scale-110 transition-transform" />
                  <span className="truncate max-w-37.5">{currentSortLabel}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#6B5E57] dark:text-[#A89B93] transition-transform duration-200 ${
                      sortDropdownOpen ? 'rotate-180 text-[#C86D51]' : ''
                    }`}
                  />
                </button>

                {/* Animated Dropdown Menu Panel */}
                <AnimatePresence>
                  {sortDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute right-0 top-full mt-2 z-30 min-w-52.5 p-1.5 rounded-xl bg-[#FAF7F0] dark:bg-[#241E1B] border border-[#2C221E]/15 dark:border-white/15 shadow-xl backdrop-blur-md overflow-hidden"
                    >
                      <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-mono text-[#6B5E57] dark:text-[#A89B93] border-b border-[#2C221E]/8 dark:border-white/10 mb-1">
                        {language === 'en' ? 'Sort Collection' : 'Ordenar Colección'}
                      </div>
                      {sortOptions.map((option) => {
                        const isSelected = sortBy === option.key;
                        return (
                          <button
                            key={option.key}
                            onClick={() => {
                              setSortBy(option.key);
                              setSortDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-sans-human text-left transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#C86D51]/12 text-[#C86D51] dark:text-[#EDB45D] font-semibold'
                                : 'text-[#2C221E] dark:text-[#F5EFEB] hover:bg-[#EFE9DC]/70 dark:hover:bg-[#1E1815]'
                            }`}
                          >
                            <span>{option.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#C86D51]" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Artworks Masonry-style Grid */}
        {filteredArtworks.length === 0 ? (
          <div className="text-center py-20 bg-[#FAF7F0] dark:bg-[#201916] rounded-2xl border border-dashed border-[#2C221E]/20 dark:border-white/10 max-w-xl mx-auto">
            <p className="font-serif text-lg text-[#6B5E57] dark:text-[#A89B93]">
              {t.gallery.emptySearch}
            </p>
            <button
              onClick={() => {
                setActiveSeries('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#C86D51] text-white text-xs font-medium cursor-pointer"
            >
              {language === 'en' ? 'Reset Filters' : 'Restablecer Filtros'}
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 sm:gap-10"
          >
            <AnimatePresence>
              {filteredArtworks.map((item, index) => {
                const title = language === 'en' ? item.titleEn : item.titleEs;
                const medium = language === 'en' ? item.mediumEn : item.mediumEs;
                const story = language === 'en' ? item.storyEn : item.storyEs;

                return (
                  <motion.article
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.55,
                      delay: (index % 3) * 0.08,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="group cursor-pointer flex flex-col"
                    onClick={() => onSelectArtwork(item)}
                  >
                    {/* Framed Canvas Studio Presentation */}
                    <div className="relative p-3.5 sm:p-4 rounded-xl bg-[#FAF7F0] dark:bg-[#221B18] border border-[#2C221E]/10 dark:border-white/10 shadow-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:border-[#C86D51]/40 flex-1 flex flex-col justify-between">
                      {/* Canvas Surface with golden-hour glow on hover */}
                      <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden bg-[#EAE4D7] dark:bg-[#161211] flex items-center justify-center p-2">
                        <img
                          src={`/artworks/${item.image}`}
                          alt={title}
                          loading="lazy"
                          className="w-full h-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                        />

                        {/* Hover Golden-Hour Glow & Eye Action Icon */}
                        <div className="absolute inset-0 bg-linear-to-t from-[#2C221E]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5">
                          <span className="text-white text-xs font-serif italic truncate max-w-[70%]">
                            {t.gallery.viewHighRes}
                          </span>
                          <span className="w-8 h-8 rounded-full bg-[#E09F3E] text-white flex items-center justify-center shadow-md">
                            <Eye className="w-4 h-4" />
                          </span>
                        </div>

                        {/* Top-Right Highlight badge */}
                        {item.isHighlight && (
                          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#C86D51] text-white text-[9px] font-mono uppercase tracking-wider shadow-xs">
                            {language === 'en' ? 'Highlight' : 'Destacada'}
                          </div>
                        )}
                      </div>

                      {/* Placard / Caption below canvas */}
                      <div className="mt-4 pt-3 border-t border-[#2C221E]/8 dark:border-white/10 flex flex-col justify-between">
                        <div className="flex items-center justify-between gap-2 text-[11px] text-[#6B5E57] dark:text-[#A89B93] mb-1 font-mono">
                          <span>{item.year}</span>
                          <span className="capitalize">{item.series}</span>
                        </div>
                        <h3 className="font-editorial text-2xl text-[#2C221E] dark:text-[#F5EFEB] group-hover:text-[#C86D51] transition-colors leading-tight mb-1">
                          {title}
                        </h3>
                        <p className="font-sans-human text-xs text-[#6B5E57] dark:text-[#A89B93] line-clamp-1 mb-2">
                          {medium}
                        </p>
                        <p className="font-serif italic text-xs text-[#6B5E57]/80 dark:text-[#A89B93]/80 line-clamp-2">
                          {story}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
