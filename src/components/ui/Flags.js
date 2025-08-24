import React from 'react';

export const RussianFlag = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" className={className} preserveAspectRatio="none">
    <rect fill="#fff" width="9" height="3"/>
    <rect fill="#d52b1e" y="3" width="9" height="3"/>
    <rect fill="#0039a6" y="2" width="9" height="2"/>
  </svg>
);

export const BritishFlag = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 36" className={className} preserveAspectRatio="none">
        <rect fill="#00247d" width="60" height="36"/>
        <path d="M0,0 L60,36 M60,0 L0,36" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,36 M60,0 L0,36" stroke="#cf142b" strokeWidth="4"/>
        <path d="M30,0 V36 M0,18 H60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 V36 M0,18 H60" stroke="#cf142b" strokeWidth="6"/>
    </svg>
);

export const GermanFlag = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className={className} preserveAspectRatio="none">
    <rect width="5" height="3" fill="#FFCE00"/>
    <rect width="5" height="2" fill="#DD0000"/>
    <rect width="5" height="1" fill="#000"/>
  </svg>
);

export const SpanishFlag = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" className={className} preserveAspectRatio="none">
        <rect fill="#c60b1e" width="600" height="400"/>
        <rect y="100" width="600" height="200" fill="#ffc400"/>
    </svg>
);

export const FrenchFlag = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={className} preserveAspectRatio="none">
        <rect width="1" height="2" fill="#002395"/>
        <rect x="1" width="1" height="2" fill="#fff"/>
        <rect x="2" width="1" height="2" fill="#ed2939"/>
    </svg>
);

export const ChineseFlag = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" className={className} preserveAspectRatio="none">
        <rect fill="#de2910" width="600" height="400"/>
        <path fill="#ffde00" d="M100 100l-38.27-28.82-38.27 28.82L48.27 61.76 10 33.06h47.28L100 0l14.72 33.06H162l-38.27 28.7L138.27 100z" transform="scale(1.5)"/>
        <g transform="translate(250 50) scale(0.5)">
            <path id="s" fill="#ffde00" d="M100 100l-38.27-28.82-38.27 28.82L48.27 61.76 10 33.06h47.28L100 0l14.72 33.06H162l-38.27 28.7L138.27 100z"/>
        </g>
        <use href="#s" transform="translate(320 100) scale(0.5) rotate(20)"/>
        <use href="#s" transform="translate(320 160) scale(0.5) rotate(45)"/>
        <use href="#s" transform="translate(250 200) scale(0.5) rotate(70)"/>
    </svg>
);
