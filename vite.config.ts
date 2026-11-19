import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { loadEnv } from 'vite';
import { artworks } from './src/data/artworks.ts';

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return entities[character];
  });

const artworkSharePages = (configuredSiteUrl?: string): Plugin => ({
  name: 'artwork-share-pages',
  apply: 'build',
  generateBundle() {
    if (!configuredSiteUrl) {
      throw new Error(
        'VITE_SITE_URL is required to generate artwork share pages. Set it to the canonical site origin, such as https://example.com.'
      );
    }

    let siteUrl: URL;
    try {
      siteUrl = new URL(configuredSiteUrl);
    } catch {
      throw new Error('VITE_SITE_URL must be an absolute http(s) URL.');
    }

    if (
      !['http:', 'https:'].includes(siteUrl.protocol) ||
      siteUrl.pathname !== '/' ||
      siteUrl.search ||
      siteUrl.hash ||
      (siteUrl.protocol === 'http:' &&
        !['localhost', '127.0.0.1', '::1'].includes(siteUrl.hostname))
    ) {
      throw new Error(
        'VITE_SITE_URL must be an HTTPS site origin (HTTP is allowed for localhost), such as https://example.com.'
      );
    }

    const siteOrigin = siteUrl.origin;

    for (const artwork of artworks) {
      const artworkPath = `/share/${encodeURIComponent(artwork.id)}/`;
      const artworkUrl = new URL(artworkPath, siteOrigin).href;
      const imageUrl = new URL(`/artworks/${encodeURIComponent(artwork.image)}`, siteOrigin).href;
      const appUrl = new URL(
        `/?artwork=${encodeURIComponent(artwork.id)}`,
        siteOrigin
      ).href;
      const title = `${artwork.titleEn} (${artwork.year}) | Cecilia Amighetti Prieto`;
      const description = `${artwork.mediumEn}. ${artwork.storyEn}`
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 200);
      const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${escapeHtml(artworkUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Cecilia Amighetti Prieto — Artistic Archive" />
    <meta property="og:url" content="${escapeHtml(artworkUrl)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta property="og:image:alt" content="${escapeHtml(artwork.titleEn)}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(artwork.titleEn)}" />
    <style>
      :root { color-scheme: light; font-family: Georgia, serif; color: #2c221e; background: #f7f3eb; }
      body { box-sizing: border-box; display: grid; min-height: 100vh; margin: 0; padding: 2rem; place-items: center; }
      main { width: min(100%, 48rem); text-align: center; }
      img { display: block; width: 100%; max-height: 70vh; margin: 0 auto 1.5rem; object-fit: contain; }
      h1 { margin: 0 0 .5rem; font-size: clamp(1.75rem, 5vw, 3rem); }
      p { color: #6b5e57; line-height: 1.6; }
      a { display: inline-block; margin-top: 1rem; padding: .8rem 1.2rem; border-radius: .4rem; color: white; background: #c86d51; text-decoration: none; }
    </style>
  </head>
  <body>
    <main>
      <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(artwork.titleEn)}" />
      <h1>${escapeHtml(artwork.titleEn)}</h1>
      <p>${escapeHtml(artwork.year)} · ${escapeHtml(artwork.mediumEn)}</p>
      <p>${escapeHtml(description)}</p>
      <a href="${escapeHtml(appUrl)}">View artwork in the archive</a>
    </main>
  </body>
</html>
`;

      this.emitFile({
        type: 'asset',
        fileName: `share/${encodeURIComponent(artwork.id)}/index.html`,
        source: html
      });
    }
  }
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = env.VITE_SITE_URL || 'https://ceciliaamighetti.com';
  return {
    plugins: [react(), tailwindcss(), artworkSharePages(siteUrl)],
    resolve: { alias: { '@': path.resolve(process.cwd(), 'src') } }
  };
});
