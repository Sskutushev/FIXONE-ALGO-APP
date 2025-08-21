import React from 'react';
import Animated from '../Animated';

const SecuritySection = () => {
  const securityCards = [
    {
      imageSrc: 'defens.svg',
      title: 'Защита доступа',
      description: '2FA аутентификация и персонализированные уровни доступа'
    },
    {
      imageSrc: 'moni.svg',
      title: 'Шифрование и мониторинг',
      description: 'Шифрование всех операций и автоматическое выявление подозрительных действий'
    },
    {
      imageSrc: 'save.svg',
      title: 'Надёжное хранение',
      description: 'Большая часть средств хранится офлайн для максимальной безопасности'
    },
    {
      imageSrc: 'reg.svg',
      title: 'Соответствие стандартам',
      description: 'Полное соответствие международным стандартам и требованиям регуляторов'
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-16">
      <Animated>
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left mb-12">
          <div>
            <h2 className="font-tt-travels text-3xl md:text-4xl font-bold">Безопасность и доверие</h2>
            <p className="text-lg text-text-grey mt-4 max-w-3xl">Ваши средства и данные защищены на всех уровнях: от входа до хранения и транзакций</p>
          </div>
          <div className="mt-8 md:mt-0 p-4 rounded-[50px] text-white font-bold bg-gradient-to-r from-[#ABBCC7] via-[#BBC7CD] via-[#9797B1] via-[#E19C96] to-[#E28AA4]">
            Безопасность средств — приоритет №1
          </div>
        </div>
      </Animated>
      <div className="flex flex-col md:flex-row gap-4">
        {securityCards.map((card, index) => (
            <Animated key={index} delay={index * 150}>
                <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-lg flex flex-col items-start text-left h-full">
                  <div className="flex items-center mb-4">
                    <img src={`${process.env.PUBLIC_URL}/${card.imageSrc}`} alt={card.title} className="w-12 h-12 mr-4 flex-shrink-0" />
                    <h3 className="text-xl font-bold">{card.title}</h3>
                  </div>
                  <p className="text-text-grey">{card.description}</p>
                </div>
            </Animated>
        ))}
      </div>
    </div>
  );
};

export default SecuritySection;
