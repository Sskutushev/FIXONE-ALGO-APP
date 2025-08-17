// UNIQUE_TEST_COMMENT_20250817_1
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AlgoBotShowcase from './components/AlgoBotShowcase';
import BotDetailModal from './components/BotDetailModal';
import AuthPage from './pages/AuthPage';

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
  instagram: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  telegram: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.9,2.1A1,1,0,0,0,20.5,.2L.9,8.8A1,1,0,0,0,1.8,11l8.1,2.9,2.9,8.1a1,1,0,0,0,1.9-.9L23.8,3.5A1,1,0,0,0,21.9,2.1Z"/>
    </svg>
  ),
  facebook: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.23v2.355H7.079v3.209h3.002v8.196h3.316z"/>
    </svg>
  ),
  youtube: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.58 7.19C21.35 6.45 20.82 5.92 20.08 5.7C18.34 5.25 12 5.25 12 5.25s-6.34 0-8.08.45C3.18 5.92 2.65 6.45 2.42 7.19C1.98 8.93 1.98 12 1.98 12s0 3.07.44 4.81c.23.74.76 1.27 1.5 1.49C5.66 18.75 12 18.75 12 18.75s6.34 0 8.08-.45c.74-.22 1.27-.75 1.5-1.49.44-1.74.44-4.81.44-4.81s0-3.07-.44-4.81zM9.75 15.5V8.5l6.5 3.5-6.5 3.5z"/>
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

const StrategyCard = ({ title, description, imageSrc }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col border border-gray-700 my-[10px]">
    <div className="relative flex justify-center items-start">
      <img src={imageSrc} alt={title} className="w-full h-24 object-cover" />
      <div className="absolute top-0 left-0 bg-[#66A1BF] text-white font-bold text-sm px-3 py-1 m-2 rounded-full">
        Алго-бот
      </div>
    </div>
    <div className="p-3 flex flex-col pb-5">
      <h3 className="font-bold text-base mb-1">{title}</h3>
      <p className="text-xs text-gray-600 flex-grow">{description}</p>
    </div>
  </div>
);

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
                    <div key={index} className="flex-shrink-0 w-1/4 p-8">
                        <img src={`${process.env.PUBLIC_URL}/${logo}`} alt={`partner logo ${index + 1}`} className="h-12 mx-auto" />
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
        <div className="container mx-auto">
            
            <div className="relative mb-[-100px]">
                <img src={`${process.env.PUBLIC_URL}/roadmap.svg`} alt="Roadmap" className="w-full h-auto hidden md:block" style={{ filter: 'brightness(1.5)' }} />
            </div>
            <div className="relative mt-[100px]">
                <div className="relative grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-x-8">
                    {steps.map((item, index) => (
                        <div key={item.step} className={`flex flex-col items-center ${index === 0 ? 'mt-[-150px]' : index === 1 ? 'mt-[-100px]' : index === 2 ? 'mt-[-150px]' : index === 3 ? 'mt-[-100px]' : ''}`}>
                            <div className={`relative p-6 rounded-[30px] w-full ${item.step === 4 ? 'bg-[#FF7255]' : 'bg-white'}`}>
                                <img src={`${process.env.PUBLIC_URL}/${item.step === 4 ? 'flag_green.svg' : 'flag.svg'}`} alt="Flag" className="absolute -top-10 left-4 h-24 w-24" />
                                {item.step === 1 && <img src={`${process.env.PUBLIC_URL}/registration&KYC.svg`} alt="Registration Icon" className="absolute -top-4 left-1/2 transform -translate-x-1/2 ml-0 w-16 h-16" />}
                                {item.step === 2 && <img src={`${process.env.PUBLIC_URL}/transaction.svg`} alt="Transaction Icon" className="absolute -top-4 left-1/2 transform -translate-x-1/2 ml-0 w-16 h-16" />}
                                {item.step === 3 && <img src={`${process.env.PUBLIC_URL}/Submit.svg`} alt="Submit Icon" className="absolute -top-4 left-1/2 transform -translate-x-1/2 ml-0 w-16 h-16" />}
                                {item.step === 4 && <img src={`${process.env.PUBLIC_URL}/analytics_set.svg`} alt="Analytics Icon" className="absolute -top-4 left-1/2 transform -translate-x-1/2 ml-0 w-16 h-16" />}
                                <div className="absolute top-4 right-4 bg-black text-white text-sm font-bold px-3 py-1 rounded-full">
                                    Шаг {item.step}
                                </div>
                                <h3 className="font-bold text-xl mt-8 text-left">{item.title}</h3>
                            </div>
                            <div className="mt-4 p-4 bg-gray-700 text-white rounded-[30px] w-full text-left">
                                <p className="text-xs">{item.explanation}</p>
                            </div>
                        </div>
                    ))}
                </div>
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
      { id: 'builder', title: 'Конструктор ботов' },
      { id: 'terminal', title: 'Все рынки-один терминал' },
      { id: 'advantages', title: 'Наши преимущества' },
      { id: 'security', title: 'Безопасность и соответствие' },
      { id: 'about', title: 'О нас' },
      { id: 'faq', title: 'FAQ' },
      { id: 'start-bot', title: 'Запустите первого бота сегодня' },
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
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-4">
            <img src={`${process.env.PUBLIC_URL}/Frame 7462.svg`} alt="FIXONE ALGO Logo" className="h-10 w-10"/>
            <span className="font-tt-travels text-2xl font-bold">FIXONE ALGO</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
                <a key={link.id} href={`#${link.id}`} onClick={(e) => handleScrollTo(e, link.id)} className="hover:text-main">{link.title}</a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/auth"><Button variant="text" className="!border-[#FF2B00] !text-[#FF2B00] !border-2 !px-8 !py-3">Войти</Button></Link>
            <Link to="/auth"><Button variant="big-classic">Открыть счёт</Button></Link>
          </div>
          <div className="md:hidden">
            <Button variant="icon" onClick={() => setMobileMenuOpen(true)}><ICONS.burger className="w-8 h-8 text-black" /></Button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-50 bg-white p-6 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
            <div className="flex justify-between items-center mb-8">
                <Link to="/" className="flex items-center gap-4" onClick={() => setMobileMenuOpen(false)}>
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
            <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-start gap-8">
                {/* Left Column */}
                <div className="md:w-1/2 text-center md:text-left pt-8">
                    <h1 className="font-tt-travels text-5xl font-bold mb-4">Создавай. Запускай. Зарабатывай.</h1>
                    <p className="text-xl text-text-grey max-w-2xl mx-auto md:mx-0 mb-6">Платформа, где ваши алгоритмы превращаются в живую силу, способную зарабатывать 24/7. Гибкий инструментарий, автоматизация, мгновенное развертывание — всё, чтобы вы могли сосредоточиться на стратегии, а не на рутине.</p>
                    <p className="text-xl text-text-grey max-w-2xl mx-auto md:mx-0 mb-8">Своя биржа, терминал на базе MetaTrader 5, низкие комиссии и готовые алго-боты — от долгосрока до скальпинга.</p>
                    <div className="md:text-left">
                        <Link to="/auth"><Button variant="big-with-arrow">Присоединиться</Button></Link>
                    </div>
                </div>
                {/* Right Column */}
                <div className="md:w-1/2 w-full mt-8 md:mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {strategyCards.map((card, index) => (
                            <StrategyCard key={index} {...card} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
      
      {/* Sections */} 
      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className={`py-20 px-[10px] ${index % 2 === 0 ? 'bg-white' : 'bg-bg-light'}`}>
            {section.component ? 
                <div className="container mx-auto"><h2 className="font-tt-travels text-4xl font-bold text-center mb-4">{section.title}</h2>{section.component}</div> : 
                (
                <div className="container mx-auto">
                    <h2 className="font-tt-travels text-4xl font-bold text-center mb-12">{section.title}</h2>
                    <p className="text-center text-text-grey">Содержимое этого раздела будет добавлено позже.</p>
                </div>
            )}
        </section>
      ))}

      {/* Footer */}
      <footer className="bg-white py-8 px-6 text-text-grey">
        <div className="container mx-auto px-[25px]">
            <hr className="border-gray-300" />
            <div className="flex justify-center items-center gap-6 my-6">
                <a href="https://x.com/FixoneExchange" target="_blank" rel="noopener noreferrer" className="w-[35px] h-[35px] text-gray-500 hover:text-black"><ICONS.twitter /></a>
                <a href="https://www.instagram.com/fixoneglobal/?igshid=MWZjMTM2ODFkZg%3D%3D" target="_blank" rel="noopener noreferrer" className="w-[35px] h-[35px] text-gray-500 hover:text-black"><ICONS.instagram /></a>
                <a href="https://t.me/fixone_exchange" target="_blank" rel="noopener noreferrer" className="w-[35px] h-[35px] text-gray-500 hover:text-black"><ICONS.telegram /></a>
                <a href="https://www.facebook.com/people/Fixone-Global-Exchange/100090337835479/" target="_blank" rel="noopener noreferrer" className="w-[35px] h-[35px] text-gray-500 hover:text-black"><ICONS.facebook /></a>
                <a href="https://www.youtube.com/@FIXONEGlobalTrading" target="_blank" rel="noopener noreferrer" className="w-[35px] h-[35px] text-gray-500 hover:text-black"><ICONS.youtube /></a>
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
      </Routes>
    </Router>
  );
}

export default App;