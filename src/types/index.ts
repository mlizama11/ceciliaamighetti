export type Language = 'en' | 'es';

export type ArtworkSeries =
  'all' | 'amantes' | 'fabulas' | 'gente' | 'retratos' | 'paisajes' | 'bodegones';

export interface Artwork {
  id: string;
  image: string;
  imagePreview?: string;
  titleEn: string;
  titleEs: string;
  year: string;
  mediumEn: string;
  mediumEs: string;
  dimensions?: string;
  series: ArtworkSeries;
  storyEn: string;
  storyEs: string;
  orientation: 'portrait' | 'landscape' | 'square';
  ratio: number;
  isHighlight?: boolean;
  tagsEn: string[];
  tagsEs: string[];
}

export interface TimelineMilestone {
  year: string;
  periodEn: string;
  periodEs: string;
  titleEn: string;
  titleEs: string;
  descEn: string;
  descEs: string;
  locationEn: string;
  locationEs: string;
  tagEn: string;
  tagEs: string;
  image?: string;
  artworkRef?: string;
}

export interface Exhibition {
  year: string;
  titleEn: string;
  titleEs: string;
  venueEn: string;
  venueEs: string;
  city: string;
  country: string;
  type: 'solo' | 'group' | 'permanent' | 'tribute';
  notesEn: string;
  notesEs: string;
  url?: string;
}

export interface PressArticle {
  year: string;
  source: string;
  titleEn: string;
  titleEs: string;
  excerptEn: string;
  excerptEs: string;
  author?: string;
  url?: string;
  image?: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  institutionOrRole: string;
  inquiryType: 'museum_loan' | 'curatorial_research' | 'acquisition' | 'press' | 'general';
  selectedArtworkId?: string;
  message: string;
}
