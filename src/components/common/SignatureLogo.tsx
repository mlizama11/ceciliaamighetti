import React, { useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SignatureLogoProps {
  className?: string;
  isLight?: boolean;
  animated?: boolean;
}

export const SignatureLogo: React.FC<SignatureLogoProps> = ({
  className = '',
  isLight = false,
  animated = true
}) => {
  const uniqueId = useId().replace(/:/g, '');
  const maskId = `sig-mask-${uniqueId}`;
  const gradId = `sig-grad-${uniqueId}`;
  const shouldReduceMotion = useReducedMotion();

  const isAnimated = animated && !shouldReduceMotion;

  return (
    <a
      href="#top"
      className={`inline-flex items-center group transition-opacity hover:opacity-90 cursor-pointer ${className}`}
      aria-label="Cecilia Amighetti — Inicio"
      title="Cecilia Amighetti"
    >
      <div className="relative shrink-0 py-1 w-40 sm:w-52.5 lg:w-61.25 h-14.5 sm:h-14.5">
        <svg
          viewBox="0 0 340 76"
          className="w-full h-full overflow-visible select-none"
          role="img"
          aria-label="Firma de Cecilia Amighetti"
        >
          {isAnimated && (
            <defs>
              {/* Soft horizontal feathering at the leading edge of the ink reveal */}
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              {/* Mask that glides across smoothly with an organic soft edge */}
              <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="360" height="76">
                <motion.g
                  initial={{ x: -350 }}
                  animate={{ x: 0 }}
                  transition={{
                    duration: 2.1,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  {/* Solid reveal block */}
                  <rect x="0" y="0" width="340" height="76" fill="#ffffff" />
                  {/* 26px soft feathered lead edge */}
                  <rect x="340" y="0" width="26" height="76" fill={`url(#${gradId})`} />
                </motion.g>
              </mask>
            </defs>
          )}

          {/* Script Text rendered in cursive ink with soft reveal mask */}
          <g mask={isAnimated ? `url(#${maskId})` : undefined}>
            <text
              x="8"
              y="50"
              className={`font-script text-[46px] tracking-[0.02em] font-normal fill-current ${
                isLight ? 'text-white' : 'text-[#2C221E] dark:text-[#F5EFEB]'
              }`}
              style={{
                fontFamily: "'Pinyon Script', cursive",
                letterSpacing: '0.01em'
              }}
            >
              Cecilia Amighetti
            </text>
          </g>

          {/* Hand-drawn energetic terracotta brush underline flourish */}
          {isAnimated ? (
            <motion.path
              d="M 16,63 C 65,58, 115,68, 175,61 S 270,62, 328,55"
              fill="none"
              stroke="#C86D51"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.15,
                delay: 1.25,
                ease: [0.22, 1, 0.36, 1]
              }}
            />
          ) : (
            <path
              d="M 16,63 C 65,58, 115,68, 175,61 S 270,62, 328,55"
              fill="none"
              stroke="#C86D51"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Tiny accent dot at the end of the stroke */}
          {isAnimated ? (
            <motion.circle
              cx="331"
              cy="54"
              r="2"
              fill="#C86D51"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 2.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            />
          ) : (
            <circle cx="331" cy="54" r="2" fill="#C86D51" />
          )}
        </svg>
      </div>
    </a>
  );
};
