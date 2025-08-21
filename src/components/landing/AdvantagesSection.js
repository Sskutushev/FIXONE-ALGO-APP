import React from 'react';
import Animated from '../Animated';

const AdvantagesSection = () => {
  const advantages = [
    {
      imageSrc: 'im1.svg',
      title: 'Всё в одном месте',
      description: 'Управляйте активами, торговлей и ботами в едином интерфейсе. Полный контроль без переключения между платформами.'
    },
    {
      imageSrc: 'im2.svg',
      title: 'MT5-терминал',
      description: 'Используйте мощь MetaTrader 5: проверенная стабильность, высокая скорость и привычные инструменты для профессионального трейдинга.'
    },
    {
      imageSrc: 'im3.svg',
      title: 'Ликвидность и скорость',
      description: 'Получайте лучшие цены благодаря высокой ликвидности и моментальному исполнению ордеров с минимальным проскальзыванием.'
    },
    {
      imageSrc: 'im4.svg',
      title: 'Алгоритмы и автоторговля 24/7',
      description: 'Автоматизируйте свою торговлю. Наши алгоритмы и торговые роботы работают для вас круглосуточно, 24/7.'
    },
    {
      imageSrc: 'im5.svg',
      title: 'Мониторинг и алерты',
      description: 'Мгновенные оповещения об изменениях баланса и сделок. Держите руку на пульсе вашего портфеля.'
    },
    {
      imageSrc: 'im6.svg',
      title: 'API и интеграции',
      description: 'Расширяйте функционал и автоматизируйте процессы с помощью нашего открытого и гибкого API для разработчиков.'
    },
  ];

  const nonHighlightedCards = ['Алгоритмы и автоторговля 24/7', 'MT5-терминал', 'API и интеграции'];

  return (
    <div className="container mx-auto px-4 sm:px-16">
      <Animated>
        <h2 className="font-tt-travels text-3xl md:text-4xl font-bold text-center mb-12">Наши преимущества</h2>
      </Animated>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advantages.map((advantage, index) => {
          const isHighlighted = !nonHighlightedCards.includes(advantage.title);
          return (
            <Animated key={index} delay={isHighlighted ? 300 : 0}>
                <div 
                  className={`p-4 rounded-lg shadow-lg flex items-start space-x-4 h-full ${isHighlighted ? '' : 'bg-white'}`}
                  style={isHighlighted ? { backgroundColor: '#C2C2C2' } : {}}
                >
                  <div className="flex-shrink-0">
                    <img src={`${process.env.PUBLIC_URL}/${advantage.imageSrc}`} alt="" className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                    <p className={isHighlighted ? 'text-gray-800' : 'text-text-grey'}>{advantage.description}</p>
                  </div>
                </div>
            </Animated>
          );
        })}
      </div>
    </div>
  );
};

export default AdvantagesSection;
