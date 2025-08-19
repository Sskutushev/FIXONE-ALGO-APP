import React from 'react';
import { Link } from 'react-router-dom';

// Mock data for algo bots


const Button = ({ children, variant = 'big-classic', icon: Icon, iconPosition = 'left', className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles = {
    'big-classic': 'px-8 py-3 bg-main text-white hover:bg-main-light active:bg-main-dark',
    'big-outline': 'px-8 py-3 bg-transparent border-2 border-main text-main hover:bg-main hover:text-white',
    'big-with-arrow': 'px-8 py-3 bg-main text-white hover:bg-main-light active:bg-main-dark',
    'text': 'text-main hover:text-main-dark font-semibold',
    'icon': 'p-2 rounded-full hover:bg-grey-2/50 active:bg-grey-2',
  };
  const effectiveClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;
  return <button className={effectiveClassName} {...props}>{Icon && iconPosition === 'left' && <Icon className="mr-2" />}{children}{Icon && iconPosition === 'right' && <Icon className="ml-2" />}</button>;
};


const ShowcaseBotCard = ({ title, description, imageSrc, onOpenModal, botData }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col border border-gray-700 h-[440px] flex-shrink-0 transition-transform duration-300 hover:scale-105 relative pb-[60px]">
    <div className="relative">
      <img src={imageSrc} alt={title} className="w-full h-[200px] object-cover object-top" />
      <div className="absolute top-0 left-0 bg-[#66A1BF] text-white font-bold text-sm px-3 py-1 m-2 rounded-full">
        Алго-бот
      </div>
    </div>
    <div className="p-3 flex flex-col mt-[17px] flex-grow">
      <h3 className="font-bold text-lg mb-[5px]">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="absolute bottom-0 left-0 right-0 p-3">
          <Button
            variant="small-outline"
            className="w-full !border-[#868686] !bg-[#E3E3E3] !text-black hover:!bg-[#25DE85] hover:!text-white hover:!border-[#25DE85] active:!bg-[#1f9d6d] active:!border-[#1f9d6d] !py-4"
            onClick={() => onOpenModal(botData)}
          >
            Подробнее
          </Button>
      </div>
    </div>
  </div>
);

const AlgoBotShowcase = ({ botsData, onOpenModal }) => {
    return (
        <>
            <p className="text-text-grey text-sm mb-4 px-4 sm:px-8 md:px-[75px] text-left">
                4 универсальных алгоритмических бота покрывают все типы стратегий — от долгосрочных инвестиций до высокочастотного скальпинга. Каждый бот уже оптимизирован под конкретные рынки, таймфреймы и риск-профиль, чтобы вы могли быстро стартовать и протестировать стратегию без сложной настройки.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-x-[15px]">
                {botsData.map(bot => (
                    <ShowcaseBotCard
                        key={bot.title}
                        title={bot.title}
                        description={bot.description}
                        imageSrc={bot.imageSrc}
                        onOpenModal={onOpenModal}
                        botData={bot}
                    />
                ))}
            </div>

            <div className="flex items-center justify-center mt-12 p-4 rounded-[50px] max-w-4xl mx-auto text-white bg-gradient-to-r from-[#ABBCC7] to-[#E28AA4]">
                <img src={`${process.env.PUBLIC_URL}/warning 1.svg`} alt="Warning" className="w-8 h-8 sm:w-[50px] sm:h-[50px] mr-4 flex-shrink-0" />
                <p className="text-xs sm:text-sm">
                    Алготрейдинг — это инструмент с потенциальной доходностью, но и с рисками. Данный материал не является инвестсоветом.
                </p>
            </div>
        </>
    );
};

export default AlgoBotShowcase;