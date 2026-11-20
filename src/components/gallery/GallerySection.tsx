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
          const matchTags = [item.tagsEn, item.tagsEs].some((tags) =>
            tags.some((tag) => tag.toLowerCase().includes(q))
          );

          return (
            matchTitleEn || matchTitleEs || matchMedium || matchYear || matchStory || matchTags
          );
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
    <section
      id="obras"
      className="relative border-b border-[#2C221E]/10 bg-[#F7F3EB] py-24 sm:py-32 dark:border-white/10 dark:bg-[#1A1614]"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C86D51] uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t.gallery.tag}</span>
          </div>
          <h2 className="font-editorial text-4xl leading-tight text-[#2C221E] sm:text-5xl lg:text-6xl dark:text-[#F5EFEB]">
            {t.gallery.title}
          </h2>
          <p className="mt-4 font-serif text-base leading-relaxed text-[#6B5E57] sm:text-lg dark:text-[#A89B93]">
            {t.gallery.subtitle}
          </p>
          <div className="mx-auto mt-6 h-0.5 w-16 bg-[#C86D51]" />
        </div>

        {/* Filter Navigation & Search Bar */}
        <div className="mb-12 space-y-6">
          {/* Scrollable Filter Tabs */}
          <div className="no-scrollbar flex scrollbar-none items-center justify-start gap-2 overflow-x-auto pb-2 sm:justify-center">
            {filterTabs.map((tab) => {
              const isActive = activeSeries === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveSeries(tab.key)}
                  className={`font-sans-human cursor-pointer rounded-full px-4 py-2 text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-[#2C221E] text-[#F7F3EB] shadow-md dark:bg-[#F5EFEB] dark:text-[#1A1614]'
                      : 'border border-[#2C221E]/10 bg-[#FAF7F0] text-[#6B5E57] hover:border-[#C86D51] hover:text-[#2C221E] dark:border-white/10 dark:bg-[#241E1B] dark:text-[#A89B93] dark:hover:text-[#F5EFEB]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input & Custom Styled Sort Dropdown */}
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#6B5E57]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.gallery.searchPlaceholder}
                className="w-full rounded-full border border-[#2C221E]/15 bg-[#FAF7F0] py-2.5 pr-4 pl-10 text-xs text-[#2C221E] placeholder-[#6B5E57]/60 shadow-xs transition-colors focus:border-[#C86D51] focus:outline-none dark:border-white/15 dark:bg-[#241E1B] dark:text-[#F5EFEB]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-xs text-[#6B5E57] hover:text-[#C86D51]"
                >
                  ×
                </button>
              )}
            </div>

            {/* Counter & Custom Studio Dropdown */}
            <div className="flex w-full items-center justify-between gap-3 text-xs text-[#6B5E57] sm:w-auto sm:justify-end dark:text-[#A89B93]">
              <span className="font-mono text-[11px] whitespace-nowrap">
                {filteredArtworks.length} {t.gallery.countLabel}
              </span>

              {/* Custom Styled Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className="font-sans-human group flex cursor-pointer items-center gap-2 rounded-full border border-[#2C221E]/15 bg-[#FAF7F0] px-3.5 py-2 text-xs font-medium text-[#2C221E] shadow-xs transition-all hover:border-[#C86D51] dark:border-white/15 dark:bg-[#241E1B] dark:text-[#F5EFEB]"
                  aria-expanded={sortDropdownOpen}
                >
                  <ArrowUpDown className="h-3.5 w-3.5 text-[#C86D51] transition-transform group-hover:scale-110" />
                  <span className="max-w-37.5 truncate">{currentSortLabel}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-[#6B5E57] transition-transform duration-200 dark:text-[#A89B93] ${
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
                      className="absolute top-full right-0 z-30 mt-2 min-w-52.5 overflow-hidden rounded-xl border border-[#2C221E]/15 bg-[#FAF7F0] p-1.5 shadow-xl backdrop-blur-md dark:border-white/15 dark:bg-[#241E1B]"
                    >
                      <div className="mb-1 border-b border-[#2C221E]/8 px-3 py-1.5 font-mono text-[10px] tracking-wider text-[#6B5E57] uppercase dark:border-white/10 dark:text-[#A89B93]">
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
                            className={`font-sans-human flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                              isSelected
                                ? 'bg-[#C86D51]/12 font-semibold text-[#C86D51] dark:text-[#EDB45D]'
                                : 'text-[#2C221E] hover:bg-[#EFE9DC]/70 dark:text-[#F5EFEB] dark:hover:bg-[#1E1815]'
                            }`}
                          >
                            <span>{option.label}</span>
                            {isSelected && <Check className="h-3.5 w-3.5 text-[#C86D51]" />}
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
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-[#2C221E]/20 bg-[#FAF7F0] py-20 text-center dark:border-white/10 dark:bg-[#201916]">
            <p className="font-serif text-lg text-[#6B5E57] dark:text-[#A89B93]">
              {t.gallery.emptySearch}
            </p>
            <button
              onClick={() => {
                setActiveSeries('all');
                setSearchQuery('');
              }}
              className="mt-4 cursor-pointer rounded-full bg-[#C86D51] px-4 py-2 text-xs font-medium text-white"
            >
              {language === 'en' ? 'Reset Filters' : 'Restablecer Filtros'}
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 xl:grid-cols-3"
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
                    className="group flex cursor-pointer flex-col"
                    onClick={() => onSelectArtwork(item)}
                  >
                    {/* Framed Canvas Studio Presentation */}
                    <div className="relative flex flex-1 flex-col justify-between rounded-xl border border-[#2C221E]/10 bg-[#FAF7F0] p-3.5 shadow-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:border-[#C86D51]/40 group-hover:shadow-2xl sm:p-4 dark:border-white/10 dark:bg-[#221B18]">
                      {/* Canvas Surface with golden-hour glow on hover */}
                      <div className="relative flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-lg bg-[#EAE4D7] p-2 dark:bg-[#161211]">
                        <img
                          src={`/artworks/${item.image}`}
                          alt={title}
                          loading="lazy"
                          className="h-full w-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                        />

                        {/* Hover Golden-Hour Glow & Eye Action Icon */}
                        <div className="absolute inset-0 flex items-end justify-between bg-linear-to-t from-[#2C221E]/60 via-transparent to-transparent p-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <span className="max-w-[70%] truncate font-serif text-xs text-white italic">
                            {t.gallery.viewHighRes}
                          </span>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E09F3E] text-white shadow-md">
                            <Eye className="h-4 w-4" />
                          </span>
                        </div>

                        {/* Top-Right Highlight badge */}
                        {item.isHighlight && (
                          <div className="absolute top-2.5 right-2.5 rounded bg-[#C86D51] px-2 py-0.5 font-mono text-[9px] tracking-wider text-white uppercase shadow-xs">
                            {language === 'en' ? 'Highlight' : 'Destacada'}
                          </div>
                        )}
                      </div>

                      {/* Placard / Caption below canvas */}
                      <div className="mt-4 flex flex-col justify-between border-t border-[#2C221E]/8 pt-3 dark:border-white/10">
                        <div className="mb-1 flex items-center justify-between gap-2 font-mono text-[11px] text-[#6B5E57] dark:text-[#A89B93]">
                          <span>{item.year}</span>
                          <span className="capitalize">{item.series}</span>
                        </div>
                        <h3 className="font-editorial mb-1 text-2xl leading-tight text-[#2C221E] transition-colors group-hover:text-[#C86D51] dark:text-[#F5EFEB]">
                          {title}
                        </h3>
                        <p className="font-sans-human mb-2 line-clamp-1 text-xs text-[#6B5E57] dark:text-[#A89B93]">
                          {medium}
                        </p>
                        <p className="line-clamp-2 font-serif text-xs text-[#6B5E57]/80 italic dark:text-[#A89B93]/80">
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
