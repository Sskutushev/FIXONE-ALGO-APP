import React from 'react';
import { Link } from 'react-router-dom';
import Animated from './Animated';
import { ICONS } from './ui/Icons';

const StartBotSection = () => {

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="w-full py-24 px-4 text-white bg-center bg-cover relative" 
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/backgroundImage.svg)` }}
    >
      <div 
        className="absolute inset-0 bg-start-bot-gradient"
      ></div>
      <div className="container mx-auto text-center relative z-10">
        <Animated>
            <h2 className="text-5xl font-bold font-tt-travels mb-4">Запусти первого бота уже сегодня</h2>
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