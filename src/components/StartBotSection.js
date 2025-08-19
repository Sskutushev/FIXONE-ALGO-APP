import React from 'react';
import { Link } from 'react-router-dom';
import Animated from './Animated';

const ICONS = {
  check: (props) => (
    <svg {...props} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
};

const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const StartBotSection = () => {

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const gradientColors = [
      '#E28AA4',
      '#E19B97',
      '#9797B1',
      '#BBC7CD',
      '#ABBCC7'
  ];

  const gradientString = `linear-gradient(to bottom, ${gradientColors.map(color => hexToRgba(color, 0.7)).join(', ')})`;

  return (
    <div 
      className="w-full py-24 px-4 text-white bg-center bg-cover relative" 
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/backgroundImage.svg)` }}
    >
      <div 
        className="absolute inset-0"
        style={{backgroundImage: gradientString}}
      ></div>
      <div className="container mx-auto text-center relative z-10">
        <Animated>
            <h2 className="text-5xl font-bold font-tt-travels mb-4">ЗАпусти первого бота уже сегодня</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              От идеи до работающей стратегии — всего несколько кликов. Начни с готового шаблона или создай своего уникального бота с нуля.
            </p>
        </Animated>
        <div className="flex justify-center items-center gap-4 mb-8">
            <Animated animation="fadeInLeft" delay={200}>
                <Link to="/auth">
                    <button className="px-8 py-4 bg-[#FF2B00] text-white font-bold rounded-full text-lg hover:bg-orange-700 transition-transform transform hover:scale-105">
                        Открыть счёт
                    </button>
                </Link>
            </Animated>
            <Animated animation="fadeInRight" delay={200}>
                <a href="#showcase" onClick={(e) => handleScrollTo(e, 'showcase')}>
                    <button className="px-8 py-4 bg-white text-[#25DE85] border-2 border-[#25DE85] font-bold rounded-full text-lg hover:bg-[#25DE85] hover:text-white transition-colors">
                        Посмотреть шаблоны
                    </button>
                </a>
            </Animated>
        </div>
        <Animated delay={400}>
            <div className="flex justify-center items-center gap-6 text-gray-300 text-sm">
                <div className="flex items-center gap-2">
                    <ICONS.check className="w-5 h-5 text-green-400" />
                    <span>Быстрый онбординг</span>
                </div>
                <div className="flex items-center gap-2">
                    <ICONS.check className="w-5 h-5 text-green-400" />
                    <span>Упрощенный KYC</span>
                </div>
                <div className="flex items-center gap-2">
                    <ICONS.check className="w-5 h-5 text-green-400" />
                    <span>Безопасный демо-режим</span>
                </div>
            </div>
        </Animated>
      </div>
    </div>
  );
};

export default StartBotSection;