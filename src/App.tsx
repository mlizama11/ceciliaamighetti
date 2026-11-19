import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AudioProvider } from './context/AudioContext';
import { CanvasTexture } from './components/common/CanvasTexture';
import { Navbar } from './components/layout/Navbar';
import { HeroTribute } from './components/hero/HeroTribute';
import { BiographySection } from './components/biography/BiographySection';
import { GallerySection } from './components/gallery/GallerySection';
import { ArchivalPhotosSection } from './components/photos/ArchivalPhotosSection';
import { TimelineSection } from './components/timeline/TimelineSection';
import { ExhibitionsSection } from './components/exhibitions/ExhibitionsSection';
import { EstateInquiriesSection } from './components/inquiries/EstateInquiriesSection';
import { Footer } from './components/layout/Footer';
import { ArtworkLightbox } from './components/gallery/ArtworkLightbox';
import { StudioAudioPlayer } from './components/audio/StudioAudioPlayer';
import { artworks } from './data/artworks';
import { Artwork } from './types';

export const MainApp: React.FC = () => {
  const { isDark } = useLanguage();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(() => {
    if (typeof window === 'undefined') return null;
    const artworkId = new URLSearchParams(window.location.search).get('artwork');
    return artworks.find((artwork) => artwork.id === artworkId) ?? null;
  });
  const [preselectedArtworkId, setPreselectedArtworkId] = useState<string>('');

  const clearArtworkQuery = () => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has('artwork')) return;
    url.searchParams.delete('artwork');
    window.history.replaceState(window.history.state, '', url);
  };

  const handleCloseArtwork = () => {
    setSelectedArtwork(null);
    clearArtworkQuery();
  };

  const handleOpenArtworkById = (artworkId: string) => {
    const found = artworks.find((a) => a.id === artworkId);
    if (found) {
      setSelectedArtwork(found);
    }
  };

  const handlePreviousArtwork = () => {
    if (!selectedArtwork) return;
    const currentIndex = artworks.findIndex((a) => a.id === selectedArtwork.id);
    const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    setSelectedArtwork(artworks[prevIndex]);
  };

  const handleNextArtwork = () => {
    if (!selectedArtwork) return;
    const currentIndex = artworks.findIndex((a) => a.id === selectedArtwork.id);
    const nextIndex = (currentIndex + 1) % artworks.length;
    setSelectedArtwork(artworks[nextIndex]);
  };

  const handleInquireFromLightbox = (artworkId: string) => {
    setPreselectedArtworkId(artworkId);
    setSelectedArtwork(null);
    clearArtworkQuery();
    const target = document.querySelector('#consultas');
    if (target) {
      const topOffset = 84;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className={`min-h-screen overflow-x-hidden ${
        isDark ? 'dark bg-[#1A1614] text-[#F5EFEB]' : 'bg-[#F7F3EB] text-[#2C221E]'
      } transition-colors duration-300`}
    >
      {/* Tactile Studio Canvas Grain & Sunlight Overlay */}
      <CanvasTexture />

      {/* Editorial Navigation with Audio & Language Controls */}
      <Navbar />

      <main>
        {/* 1. Hero Tribute Section */}
        <HeroTribute onOpenArtworkModal={handleOpenArtworkById} />

        {/* 2. Her Life & Legacy (Biography) */}
        <BiographySection onOpenArtworkModal={handleOpenArtworkById} />

        {/* 3. Curated Retrospective Gallery (Filterable, 36 original works) */}
        <GallerySection onSelectArtwork={(art) => setSelectedArtwork(art)} />

        {/* 4. Archival Photography & Life Album (19 historic photos & publications) */}
        <ArchivalPhotosSection />

        {/* 5. Interactive Life & Career Timeline */}
        <TimelineSection onOpenArtworkModal={handleOpenArtworkById} />

        {/* 5. Exhibitions, Press & Archives */}
        <ExhibitionsSection />

        {/* 6. Estate & Collector Contact (Email placeholder) */}
        <EstateInquiriesSection
          preselectedArtworkId={preselectedArtworkId}
          onClearPreselectedArtwork={() => setPreselectedArtworkId('')}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* High-Resolution Artwork Lightbox */}
      <ArtworkLightbox
        artwork={selectedArtwork}
        onClose={handleCloseArtwork}
        onPrevious={handlePreviousArtwork}
        onNext={handleNextArtwork}
        onInquire={handleInquireFromLightbox}
      />

      {/* Ambient Archival Audio Player (Singing & Guitar) - Off by default */}
      <StudioAudioPlayer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AudioProvider>
        <MainApp />
      </AudioProvider>
    </LanguageProvider>
  );
};

export default App;
