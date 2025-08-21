import React from 'react';
import { ICONS } from '../ui/Icons';

const TerminalSection = () => {
  const features = [
    "Удобный и современный интерфейс",
    "Полностью настраиваемые диаграммы",
    "Поддержка торговых консультантов (алгоботов)",
    "Встроенный экономический календарь",
    "DOM (глубина рынка)",
    "Доступно для Windows и Mac",
    "38+ предустановленных технических индикаторов",
    "44 аналитических инструмента",
    "3 типа графиков и 21 таймфрейм",
    "Дополнительные типы отложенных ордеров (стоп-лимит на продажу и покупку)",
    "Отсоединение диаграмм",
    "Торговля в один клик прямо на графике",
    "Трейлинг-стоп",
  ];

  const downloadButtons = [
    { imageSrc: 'win.svg', label: 'Windows', href: `${process.env.PUBLIC_URL}/fixoneglobaltrading5setup.exe`, download: true },
    { imageSrc: 'mac.svg', label: 'macOS', href: `${process.env.PUBLIC_URL}/MetaTrader5.pkg.zip`, download: true },
    { imageSrc: 'andr.svg', label: 'Android', href: 'https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5&hl=ru&referrer=ref_id%3d5059843646823681542%26server%3dFixoneGlobalTrading-Live', download: false },
    { imageSrc: 'ios.svg', label: 'iOS', href: 'https://apps.apple.com/ru/app/metatrader-5/id413251709', download: false },
    { imageSrc: 'web.svg', label: 'Webtrader', href: 'https://mt5.fixoneglobal.com/terminal', download: false },
  ];

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center mb-12">
        <h2 className="font-tt-travels text-3xl md:text-4xl font-bold text-center md:text-left flex-shrink-0">Торговый терминал Fixone MetaTrader 5</h2>
        <p className="text-text-grey text-center md:text-left text-lg font-semibold mt-4 md:mt-0 md:ml-[35px]">Все инструменты для алгоритмической и ручной торговли в одном месте — быстро, удобно и без ограничений.</p>
      </div>

      {/* Image for Mobile/Tablet */}
      <div className="flex items-center justify-center h-full mb-8 lg:hidden">
          <img src={`${process.env.PUBLIC_URL}/device 1.svg`} alt="Fixone MetaTrader 5 on multiple devices" className="w-full max-w-lg h-auto"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column */}
        <div>
          <ul className="space-y-4 mb-8 columns-1 md:columns-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center mb-2">
                <ICONS.check className="w-5 h-5 text-[#25DE85] mr-3 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="p-6 rounded-lg mt-12 text-white bg-terminal-gradient">
            <h3 className="font-bold text-xl mb-4 text-black">Скачайте приложение</h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 place-items-center">
              {downloadButtons.map(btn => (
                  <a 
                    href={btn.href} 
                    key={btn.label} 
                    className="flex flex-col items-center text-center text-gray-800 hover:text-black transition-transform duration-200 hover:scale-110 active:scale-100"
                    target={!btn.download ? "_blank" : "_self"}
                    rel={!btn.download ? "noopener noreferrer" : ""}
                    download={btn.download}
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center overflow-hidden">
                       <img src={`${process.env.PUBLIC_URL}/${btn.imageSrc}`} alt={btn.label} className="w-7 h-7 sm:w-8 sm:h-8 filter grayscale brightness-50" />
                    </div>
                    <span className="text-xs sm:text-sm mt-2 font-bold">{btn.label}</span>
                  </a>
              ))}
            </div>
          </div>
        </div>
        {/* Right Column (Desktop Image) */}
        <div className="hidden lg:flex items-center justify-center h-full">
          <img src={`${process.env.PUBLIC_URL}/device 1.svg`} alt="Fixone MetaTrader 5 on multiple devices" className="w-full h-auto"/>
        </div>
      </div>
    </div>
  );
};

export default TerminalSection;
