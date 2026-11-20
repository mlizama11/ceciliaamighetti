import React from 'react';

export const CanvasTexture: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Subtle organic linen/canvas texture overlay */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-overlay dark:opacity-[0.055]">
        <filter id="canvas-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#canvas-grain)" />
      </svg>

      {/* Gentle drifting sunbeam / dappled light effect for top hero */}
      <div className="animate-sunlight-drift pointer-events-none absolute -top-32 -left-32 h-162.5 w-162.5 rounded-full bg-linear-to-br from-[#E09F3E]/12 via-[#C86D51]/8 to-transparent blur-3xl" />
      <div className="animate-sunlight-drift pointer-events-none absolute top-[40vh] -right-40 h-137.5 w-137.5 rounded-full bg-linear-to-bl from-[#E09F3E]/8 via-[#2D5A43]/5 to-transparent blur-3xl delay-1000" />
    </div>
  );
};
