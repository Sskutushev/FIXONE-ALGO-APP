// UNIQUE_TEST_COMMENT_20250817_1
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AlgoBotShowcase from './components/AlgoBotShowcase';
import BotDetailModal from './components/BotDetailModal';
import AuthPage from './pages/AuthPage';
import CreateBotPage from './pages/CreateBotPage';
import FaqSection from './components/FaqSection';
import StartBotSection from './components/StartBotSection';
import BotConstructorSection from './components/BotConstructorSection';
import AnimatedSection from './components/AnimatedSection';

//=========== ICONS (SVG) ===========//
const ICONS = {
  star: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  messages: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  arrowRight: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  arrowLeft: (props) => (
     <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  burger: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  close: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="18" y1="6" x2="6" y2="18" stroke={props.color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="6" y1="6" x2="18" y2="18" stroke={props.color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  twitter: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  check: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

//=========== MOCK DATA ===========//
const botImages = [
  `${process.env.PUBLIC_URL}/images (7).jpg`,
  `${process.env.PUBLIC_URL}/images_chart2.jpg`,
  `${process.env.PUBLIC_URL}/images_chart3.jpg`,
  `${process.env.PUBLIC_URL}/images_chart4.jpg`,
];

//=========== UI COMPONENTS ===========//
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

const PartnersCarousel = () => {
    const partnerLogos = [
        'amts.svg', 'b2broker.svg', 'binance.svg', 'bybit.svg', 'dexnet.svg', 
        'kraken.svg', 'metaquotes.svg', 'profixone.svg', 'stmt.svg'
    ];

    return (
        <div 
            className="relative w-full overflow-hidden"
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
            }}
        >
            <div className="flex animate-scroll">
                {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                    <div key={index} className="flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/4 p-4 sm:p-8">
                        <img src={`${process.env.PUBLIC_URL}/${logo}`} alt={`partner logo ${index + 1}`} className="h-10 sm:h-12 mx-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
};

const HowItWorksSection = () => {
    const steps = [
        { 
            step: 1, 
            title: 'Регистрация и KYC', 
            explanation: 'Создаёте аккаунт и проходите быструю верификацию личности.' 
        },
        { 
            step: 2, 
            title: 'Пополнение', 
            explanation: 'Вносите депозит удобным способом (карта, криптовалюта, перевод).' 
        },
        { 
            step: 3, 
            title: 'Выбор/Создание бота', 
            explanation: 'Подбираете готового алгоритмического бота или настраиваете собственную стратегию.' 
        },
        { 
            step: 4, 
            title: 'Запуск и мониторинг', 
            explanation: 'Запускаете торговлю и контролируете результат в терминале Fixone MetaTrader 5, либо прямо на платформе.' 
        },
    ];

    return (
        <div className="container mx-auto px-4">
            
            <div className="relative md:mb-[-100px]">
                <img src={`${process.env.PUBLIC_URL}/roadmap.svg`} alt="Roadmap" className="w-full h-auto hidden md:block" style={{ filter: 'brightness(1.5)' }} />
            </div>
            <div className="relative md:mt-[100px]">
                <div className="relative grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-x-8">
                    {steps.map((item, index) => (
                        <div key={item.step} className={`flex flex-col items-center md:${index === 0 ? 'mt-[-150px]' : index === 1 ? 'mt-[-100px]' : index === 2 ? 'mt-[-150px]' : index === 3 ? 'mt-[-100px]' : ''}`}>
                            <div className={`relative p-6 rounded-[30px] w-full ${item.step === 4 ? 'bg-[#FF7255]' : 'bg-white'}`}>
                                <img src={`${process.env.PUBLIC_URL}/${item.step === 4 ? 'flag_green.svg' : 'flag.svg'}`} alt="Flag" className="absolute -top-10 left-4 h-24 w-24" />
                                <div className="absolute top-4 right-4 bg-black text-white text-sm font-bold px-3 py-1 rounded-full">
                                    Шаг {item.step}
                                </div>
                                <h3 className="font-bold text-xl mt-8 text-left">{item.title}</h3>
                            </div>
                            <div className="mt-4 p-4 bg-gray-700 text-white rounded-[30px] w-full text-left">
                                <p className="text-sm sm:text-base">{item.explanation}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

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
          <div className="p-6 rounded-lg mt-12 text-white" style={{backgroundImage: 'linear-gradient(to bottom, #E28AA4, #ABBCC7)'}}>
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
      <h2 className="font-tt-travels text-3xl md:text-4xl font-bold text-center mb-12">Наши преимущества</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advantages.map((advantage, index) => {
          const isHighlighted = !nonHighlightedCards.includes(advantage.title);
          return (
            <div 
              key={index} 
              className={`p-4 rounded-lg shadow-lg flex items-start space-x-4 ${isHighlighted ? '' : 'bg-white'}`}
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
          );
        })}
      </div>
    </div>
  );
};

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
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left mb-12">
        <div>
          <h2 className="font-tt-travels text-3xl md:text-4xl font-bold">Безопасность и доверие</h2>
          <p className="text-lg text-text-grey mt-4 max-w-3xl">Ваши средства и данные защищены на всех уровнях: от входа до хранения и транзакций</p>
        </div>
        <div className="mt-8 md:mt-0 p-4 rounded-[50px] text-white font-bold bg-gradient-to-r from-[#ABBCC7] via-[#BBC7CD] via-[#9797B1] via-[#E19C96] to-[#E28AA4]">
          Безопасность средств — приоритет №1
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {securityCards.map((card, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-300 shadow-lg flex flex-col items-start text-left h-full">
              <div className="flex items-center mb-4">
                <img src={`${process.env.PUBLIC_URL}/${card.imageSrc}`} alt={card.title} className="w-12 h-12 mr-4 flex-shrink-0" />
                <h3 className="text-xl font-bold">{card.title}</h3>
              </div>
              <p className="text-text-grey">{card.description}</p>
            </div>
        ))}
      </div>
    </div>
  );
};


//=========== LANDING PAGE ===========//
const LandingPage = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBot, setSelectedBot] = useState(null);

  const handleOpenModal = (bot) => {
    setSelectedBot(bot);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBot(null);
  };

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const strategyCards = [
      { title: 'Долгосрок', description: 'Стратегии, ориентированные на длительное удержание позиций и глобальные тренды. Минимальное количество сделок, фокус на фундаментальном анализе.', imageSrc: botImages[0] },
      { title: 'Среднесрок', description: 'Сбалансированный подход с удержанием позиций от нескольких дней до недель. Использует комбинацию технического и новостного анализа.', imageSrc: botImages[1] },
      { title: 'Внутридневной', description: 'Набор сигналов на средних тайм-фреймах: 15-30-минутный. Можно торговать небольшим количеством сделок внутри дня, со средним периодом реализации.', imageSrc: botImages[2] },
      { title: 'Скальперский', description: 'Высокочастотные стратегии для извлечения прибыли из минимальных колебаний цен. Требует быстрой реакции и минимальных задержек.', imageSrc: botImages[3] },
  ];

  const sections = [
      { id: 'partners', title: 'Наши партнёры', component: <PartnersCarousel /> },
      { id: 'how-it-works', title: 'Как это работает?', component: <HowItWorksSection /> },
      { id: 'showcase', title: 'Витрина алго-ботов', component: <AlgoBotShowcase botsData={strategyCards} onOpenModal={handleOpenModal} /> },
      { id: 'builder', title: 'Конструктор ботов', component: <BotConstructorSection /> },
      { id: 'terminal', title: 'Все рынки-один терминал', component: <TerminalSection /> },
      { id: 'advantages', title: 'Наши преимущества', component: <AdvantagesSection /> },
      { id: 'security', title: 'Безопасность и соответствие', component: <SecuritySection /> },
      { id: 'about', title: 'О нас' },
      { id: 'faq', title: 'FAQ', component: <FaqSection /> },
      { id: 'start-bot', title: 'Запустите первого бота сегодня', component: <StartBotSection /> },
  ];

  const navLinks = [
      { id: 'partners', title: 'Партнёры' },
      { id: 'how-it-works', title: 'Как это работает?' },
      { id: 'showcase', title: 'Витрина' },
      { id: 'about', title: 'О нас' },
      { id: 'faq', title: 'FAQ' },
  ];

  return (
    <div className="bg-white font-open-sans text-text-black">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-md z-20">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 sm:gap-4" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={`${process.env.PUBLIC_URL}/Frame 7462.svg`} alt="FIXONE ALGO Logo" className="h-8 w-8 sm:h-10 sm:w-10"/>
            <span className="font-tt-travels text-xl sm:text-2xl font-bold">FIXONE ALGO</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
                <a key={link.id} href={`#${link.id}`} onClick={(e) => handleScrollTo(e, link.id)} className="hover:text-main">{link.title}</a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/auth"><Button variant="text" className="!border-[#25DE85] !text-[#25DE85] !border-2 !px-8 !py-3">Войти</Button></Link>
            <Link to="/auth"><Button variant="big-classic">Открыть счёт</Button></Link>
          </div>
          <div className="md:hidden">
            <Button variant="icon" onClick={() => setMobileMenuOpen(true)}><ICONS.burger className="w-8 h-8 text-black" /></Button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-50 bg-white p-6 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
            <div className="flex justify-between items-center mb-8">
                <Link to="/" className="flex items-center gap-4" onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    <img src={`${process.env.PUBLIC_URL}/Frame 7462.svg`} alt="FIXONE ALGO Logo" className="h-10 w-10"/>
                    <span className="font-tt-travels text-2xl font-bold">FIXONE ALGO</span>
                </Link>
                <Button variant="icon" onClick={() => setMobileMenuOpen(false)}><ICONS.close color="black" className="w-8 h-8" /></Button>
            </div>
            <nav className="flex flex-col gap-6 text-lg">
                {navLinks.map(link => (
                    <a key={link.id} href={`#${link.id}`} onClick={(e) => handleScrollTo(e, link.id)}>{link.title}</a>
                ))}
            </nav>
            <div className="mt-8 pt-6 border-t border-grey-2 flex flex-col gap-4">
                <Link to="/auth" className="w-full" onClick={() => setMobileMenuOpen(false)}><Button variant="big-outline" className="w-full !border-[#FF2B00] !text-[#FF2B00]">Войти</Button></Link>
                <Link to="/auth" className="w-full" onClick={() => setMobileMenuOpen(false)}><Button variant="big-classic" className="w-full">Открыть счёт</Button></Link>
            </div>
        </div>
      </header>

      {/* Hero Section */}
        <section id="hero" className="bg-bg-light" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/backgroundImage.svg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 flex items-center justify-center">
                {/* Centered & Left-Aligned Content */}
                <div className="max-w-7xl text-center">
                    <h1 className="font-tt-travels text-4xl sm:text-5xl font-bold mb-6">Создавай. Запускай. Зарабатывай.</h1>
                    <p className="text-lg sm:text-xl text-text-grey max-w-6xl mx-auto mb-6">Платформа, где ваши алгоритмы превращаются в живую силу, способную зарабатывать 24/7. Гибкий инструментарий, автоматизация, мгновенное развертывание — всё, чтобы вы могли сосредоточиться на стратегии, а не на рутине.</p>
                    <p className="text-lg sm:text-xl text-text-grey max-w-6xl mx-auto mb-10">Своя биржа, терминал на базе MetaTrader 5, низкие комиссии и готовые алго-боты — от долгосрока до скальпинга.</p>
                    <Link to="/auth"><Button variant="big-with-arrow">Присоединиться</Button></Link>
                </div>
            </div>
        </section>
      
      {/* Sections */} 
      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className={`py-20 ${section.id === 'start-bot' ? 'px-0' : (section.id === 'terminal' || section.id === 'advantages' || section.id === 'security' ? 'px-16' : 'px-4 sm:px-10')} ${index % 2 === 0 ? 'bg-white' : 'bg-bg-light'}`}>
          <AnimatedSection>
            {section.id === 'about' ? (
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-left mb-4">О нас</h2>
                    <p className="text-base md:text-lg text-gray-700 mb-4">
                        Мы создаём комфортную среду для алготрейдинга и автоматических стратегий. Компания Fixone Global Trading основана для того, чтобы каждый трейдер и инвестор мог зарабатывать на международных рынках без препятствий и лишних барьеров. Опираясь на опыт работы с 2019 года и десятки успешно реализованных стратегий, мы сделали ставку на автоматизацию и алго-ботов, которые позволяют стабильно работать в любых рыночных условиях.
                    </p>
                    <p className="text-base md:text-lg text-gray-700 mb-4">
                        Наши решения подходят для скальперов, арбитражёров, криптотрейдеров, алготрейдеров, управляющих и частных инвесторов. В торговом терминале Fixone MetaTrader 5 доступны все стратегии — от классических тактик до продвинутых алгоритмических моделей, полностью готовых к интеграции с ботами.
                    </p>
                    <p className="text-lg md:text-xl font-bold text-gray-700 mb-12">
                        Fixone — это надёжная экосистема, где идеи превращаются в алгоритмы, а алгоритмы — в прибыль.
                    </p>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Left Block - Igor Botnari Photo */}
                        <div className="relative w-full lg:w-1/2 rounded-lg overflow-hidden shadow-lg h-96 lg:h-auto">
                            <img
                                src={`${process.env.PUBLIC_URL}/igor.cbc61e98.webp`}
                                alt="Игорь Ботнари"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4">
                                <p className="text-white text-xl font-semibold">Игорь Ботнари</p>
                                <p className="text-white text-sm">Генеральный директор и основатель</p>
                            </div>
                        </div>

                        {/* Right Block - Achievement Cards */}
                        <div className="w-full lg:w-1/2 grid grid-cols-1 gap-8">
                            {[
                                {
                                    year: 2019,
                                    logo: 'profitway.1c6e10dc.svg',
                                    items: [
                                        "Запуск первых инвестиционных продуктов",
                                        "Начало пути к созданию собственной экосистемы",
                                    ],
                                },
                                {
                                    year: 2021,
                                    logo: 'profixone.25e89bb0.svg',
                                    items: [
                                        "Создана компания с инновационными инвестиционными решениями",
                                        "Выпуск собственных криптотокенов и NFT",
                                        "Запуск брокерской компании на базе White Label",
                                        "Миллионные прибыли партнёров и международные награды",
                                        "Объединение трейдеров во главе с Игорем Ботнари",
                                    ],
                                },
                                {
                                    year: 2023,
                                    logo: 'fixone.e30be817.svg',
                                    items: [
                                        "Внедрение собственного торгового терминала Fixone MetaTrader 5",
                                        "Интеграция криптобиржи и поставщиков ликвидности",
                                        "Поддержка всех типов инструментов: от классических до криптографических",
                                    ],
                                },
                            ].map((achievement, achIndex) => (
                                <div key={achIndex} className="bg-white p-6 rounded-[30px] shadow-md relative">
                                    {/* Logo */}
                                    <img
                                        src={`${process.env.PUBLIC_URL}/${achievement.logo}`}
                                        alt="Company Logo"
                                        className={`absolute ${achIndex === 0 ? 'top-4' : 'top-[-1rem]'} left-4 object-contain ${achIndex === 0 ? 'w-12 h-12' : 'w-24 h-24'}`}
                                    />
                                    {/* Year Plaque */}
                                    <div className="absolute top-4 right-4 bg-[#EFA46F] text-white text-sm font-bold px-3 py-1 rounded-full">
                                        {achievement.year}
                                    </div>
                                    <ul className="mt-12 space-y-2">
                                        {achievement.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start text-gray-700">
                                                {/* Green Checkmark Icon */}
                                                <svg className="w-5 h-5 text-[#25DE85] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                section.component ?
                    (section.id === 'terminal' || section.id === 'advantages' || section.id === 'security' || section.id === 'builder' || section.id === 'start-bot' ? section.component : <div className="container mx-auto"><h2 className="font-tt-travels text-4xl font-bold text-center mb-4">{section.title}</h2>{section.component}</div>) :
                    (
                        <div className="container mx-auto">
                            <h2 className="font-tt-travels text-4xl font-bold text-center mb-12">{section.title}</h2>
                            <p className="text-center text-text-grey">Содержимое этого раздела будет добавлено позже.</p>
                        </div>
                    )
            )}
          </AnimatedSection>
        </section>
      ))}

      {/* Footer */}
      <footer className="bg-white py-8 px-4 sm:px-6 text-text-grey">
        <div className="container mx-auto px-4 sm:px-[25px]">
            <hr className="border-gray-300" />
            <div className="flex justify-center items-center gap-4 sm:gap-6 my-6">
                <a href="https://x.com/FixoneExchange" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-[35px] sm:h-[35px] text-gray-500 hover:text-black"><ICONS.twitter /></a>
                <a href="https://www.instagram.com/fixoneglobal/?igshid=MWZjMTM2ODFkZg%3D%3D" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-[35px] sm:h-[35px] text-gray-500 hover:text-black">
                    <img src={`${process.env.PUBLIC_URL}/inst.svg`} alt="Instagram" className="w-full h-full" />
                </a>
                <a href="https://t.me/fixone_exchange" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-[35px] sm:h-[35px] text-gray-500 hover:text-black">
                    <img src={`${process.env.PUBLIC_URL}/teleg.svg`} alt="Telegram" className="w-full h-full" />
                </a>
                <a href="https://www.facebook.com/people/Fixone-Global-Exchange/100090337835479/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-[35px] sm:h-[35px] text-gray-500 hover:text-black">
                    <img src={`${process.env.PUBLIC_URL}/face.svg`} alt="Facebook" className="w-full h-full" />
                </a>
                <a href="https://www.youtube.com/@FIXONEGlobalTrading" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-[35px] sm:h-[35px] text-gray-500 hover:text-black">
                    <img src={`${process.env.PUBLIC_URL}/ytub.svg`} alt="YouTube" className="w-full h-full" />
                </a>
            </div>
            <hr className="border-gray-300" />
            <div className="my-6 text-xs text-gray-500 text-left">
                <p className="mb-4">Fixone — торговое название, представляющее группу компаний Fixone, которая контролирует и управляет веб-сайтом fixoneglobal.com. Группа Fixone состоит из нескольких организаций, каждая из которых имеет свою регистрацию и местоположение: FIXONE GLOBAL TRADING SP. ZOO официально зарегистрирована в Польше и имеет разрешение и надзор со стороны Польского органа финансового надзора (UKNF), регулируемое Сертификатом № 2401-CKRDST.4060.1242.2022. Зарегистрированный офис находится по адресу: U. HOZA, 86, офис/офис 210, в ВАРШАВЕ, ПОЛЬША. Кроме того, у компании есть зарегистрированный офис в Украине по адресу: 03150 Киев, ул. Святошинская, 34-Л, офис № 2, а также контактный офис в Дубае по адресу: Conrad Office Tower № 1008, Sheikh Zayed Road, Дубай, ОАЭ; Profixone Capital LLC — юридическое лицо, зарегистрированное в Сент-Винсенте и Гренадинах, действующее с разрешения и под надзором Управления по финансовым услугам Сент-Винсента и Гренадин, на основании профессиональной лицензии № 834LLC. Юридический адрес компании: Suite 305, Griffith Corporate Centre, POBox 1510, Beachmont, Kingstown, St. Vincent and the Grenadines; Dexnet Information Technology co зарегистрирована в Дубае и действует на основании профессиональной лицензии № 1207881, также выданной правительством Дубая. Юридический адрес компании: 1008 Conrad Business Tower, Sheikh Zayed Road, Dubai, UAE; Profixone FZE имеет зарегистрированный офис в Dubai World Trade Center в Дубае, ОАЭ, и действует на основании профессиональной лицензии № L-1492, выданной правительством Дубая.</p>
                <p className="mb-4">Пользователи, желающие воспользоваться услугами Fixone, должны быть в возрасте не менее 18 лет или в возрасте, установленном местным законодательством.</p>
                <p className="mb-4">Предупреждение о рисках: Если вы решите воспользоваться услугами Fixone, вы должны сделать это добровольно и на свой страх и риск, полностью осознавая, что участие в бизнесе, связанном с виртуальной валютой, сопряжено с определенными рисками. Стоимость инвестиций может колебаться, что может привести к снижению доходности по сравнению с первоначальной инвестицией или даже к полной потере основного капитала. Прошлые результаты не являются показателем будущих результатов. Для более полного понимания рисков, связанных с бизнесом, связанным с виртуальной валютой, ознакомьтесь с нашим документом «Раскрытие рисков». Крайне важно полностью понимать эти риски и принимать соответствующие меры предосторожности при управлении ими.</p>
                <p className="mb-4">Ссылки на сторонние сайты: Сайт содержит ссылки на сторонние сайты, которые Fixone не контролирует. Следовательно, мы не несем ответственности за информацию или материалы, размещенные на этих сайтах. Размещая ссылки на сторонние сайты, Fixone не одобряет и не рекомендует какие-либо продукты или услуги, предлагаемые на этих сайтах. Информация, представленная на этом сайте, предназначена исключительно для информационных целей. Поэтому она не должна рассматриваться как предложение или просьба к какому-либо лицу в любой юрисдикции, где такие предложения или просьбы являются несанкционированными или незаконными. Кроме того, ее не следует толковать как рекомендацию покупать, продавать или заниматься какой-либо конкретной торговлей валютой или драгоценными металлами. Если вы не уверены в правилах ведения бизнеса с виртуальной валютой в вашем регионе, мы настоятельно рекомендуем вам немедленно покинуть этот сайт.</p>
                <p className="mb-4">Ограничение ответственности: В максимально допустимой применимым законодательством степени Услуги Fixone и любая информация, предоставляемая Fixone или от ее имени, предоставляются «как есть» и «как имеется в наличии». Настоятельно рекомендуется получить независимую финансовую, юридическую и налоговую консультацию, прежде чем приступать к любым операциям с виртуальной валютой. Ничто на этом сайте не должно толковаться как консультация со стороны Fixone или любого из ее аффилированных лиц, директоров, должностных лиц или сотрудников.</p>
                <p>Обратите внимание, что услуги, предоставляемые Fixone, и информация на этом сайте не предназначены для граждан/резидентов США, Японии, Канады, Австралии, Корейской Народно-Демократической Республики, Ирана, Сирии, Судана, Кубы и Мьянмы. Распространение или использование этих услуг любым лицом в любой стране или юрисдикции, где такое распространение или использование противоречит местному законодательству или нормативным актам, строго запрещено.</p>
            </div>
            <div className="flex flex-wrap items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                    <img src={`${process.env.PUBLIC_URL}/Frame 7462.svg`} alt="FIXONE ALGO Logo" className="h-8 w-8"/>
                    <span>FIXONE ALGO</span>
                    <span className="text-gray-400">Авторские права © 2023</span>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                    <a href="https://www.fixoneglobal.com/TERMS_AND_CONDITIONS_FIXONE_GLOBAL_TRADING.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-black">Условия и положения</a>
                    <span className="text-gray-400">|</span>
                    <a href="https://www.fixoneglobal.com/PRIVACY_POLICY_FIXONE_GLOBAL_TRADING_.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-black">Политика конфиденциальности</a>
                    <span className="text-gray-400">|</span>
                    <a href="https://www.fixoneglobal.com/documents/" target="_blank" rel="noopener noreferrer" className="hover:text-black">Юридические документы</a>
                </div>
                <a href="mailto:support@fixoneglobal.com" className="text-main hover:text-main-dark font-semibold">support@fixoneglobal.com</a>
            </div>
        </div>
      </footer>
      {isModalOpen && <BotDetailModal isOpen={isModalOpen} onClose={handleCloseModal} bot={selectedBot} />}
    </div>
  );
};

//=========== APP ROUTER ===========//
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/create-bot" element={<CreateBotPage />} />
      </Routes>
    </Router>
  );
}

export default App;