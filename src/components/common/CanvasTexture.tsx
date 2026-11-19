import React from 'react';

export const CanvasTexture: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle organic linen/canvas texture overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.055] mix-blend-overlay">
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
      <div className="absolute -top-32 -left-32 w-162.5 h-162.5 bg-linear-to-br from-[#E09F3E]/12 via-[#C86D51]/8 to-transparent rounded-full blur-3xl animate-sunlight-drift pointer-events-none" />
      <div className="absolute top-[40vh] -right-40 w-137.5 h-137.5 bg-linear-to-bl from-[#E09F3E]/8 via-[#2D5A43]/5 to-transparent rounded-full blur-3xl animate-sunlight-drift pointer-events-none delay-1000" />
    </div>
  );
};
