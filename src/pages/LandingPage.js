import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation

import AlgoBotShowcase from '../components/AlgoBotShowcase';
import BotDetailModal from '../components/BotDetailModal';
import FaqSection from '../components/FaqSection';
import StartBotSection from '../components/StartBotSection';
import BotConstructorSection from '../components/BotConstructorSection';
import Animated from '../components/Animated';
import { ICONS } from '../components/ui/Icons';
import Button from '../components/ui/Button';
import PartnersCarousel from '../components/landing/PartnersCarousel';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import TerminalSection from '../components/landing/TerminalSection';
import AdvantagesSection from '../components/landing/AdvantagesSection';
import SecuritySection from '../components/landing/SecuritySection';
import LanguageSwitcher from '../components/LanguageSwitcher'; // Import LanguageSwitcher

//=========== MOCK DATA ===========//
const botImages = [
  `${process.env.PUBLIC_URL}/images (7).jpg`,
  `${process.env.PUBLIC_URL}/images_chart2.jpg`,
  `${process.env.PUBLIC_URL}/images_chart3.jpg`,
  `${process.env.PUBLIC_URL}/images_chart4.jpg`,
];

//=========== LANDING PAGE ===========//
const LandingPage = () => {
  const { t } = useTranslation(); // Initialize translation hook
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

  // Define data inside the component to use the t() function
  const strategyCards = [
      { title: t('strategy_long_term_title'), description: t('strategy_long_term_desc'), imageSrc: botImages[0] },
      { title: t('strategy_mid_term_title'), description: t('strategy_mid_term_desc'), imageSrc: botImages[1] },
      { title: t('strategy_intraday_title'), description: t('strategy_intraday_desc'), imageSrc: botImages[2] },
      { title: t('strategy_scalping_title'), description: t('strategy_scalping_desc'), imageSrc: botImages[3] },
  ];

  const sections = [
      { id: 'partners', title: t('partners_title'), component: <PartnersCarousel /> },
      { id: 'how-it-works', title: t('how_it_works_title'), component: <HowItWorksSection /> },
      { id: 'showcase', title: t('showcase_title'), component: <AlgoBotShowcase botsData={strategyCards} onOpenModal={handleOpenModal} /> },
      { id: 'builder', title: t('builder_title'), component: <BotConstructorSection /> },
      { id: 'terminal', title: t('terminal_title'), component: <TerminalSection /> },
      { id: 'advantages', title: t('advantages_title'), component: <AdvantagesSection /> },
      { id: 'security', title: t('security_title'), component: <SecuritySection /> },
      { id: 'about', title: t('about_title') },
      { id: 'faq', title: t('faq_title'), component: <FaqSection /> },
      { id: 'start-bot', title: t('start_bot_title'), component: <StartBotSection /> },
  ];

  const navLinks = [
      { id: 'partners', title: t('nav_partners') },
      { id: 'how-it-works', title: t('nav_how_it_works') },
      { id: 'showcase', title: t('nav_showcase') },
      { id: 'about', title: t('nav_about') },
      { id: 'faq', title: t('nav_faq') },
  ];

  const achievements = [
    {
        year: t('achievement1_year'),
        logo: 'profitway.1c6e10dc.svg',
        items: t('achievement1_items', { returnObjects: true }),
    },
    {
        year: t('achievement2_year'),
        logo: 'profixone.25e89bb0.svg',
        items: t('achievement2_items', { returnObjects: true }),
    },
    {
        year: t('achievement3_year'),
        logo: 'fixone.e30be817.svg',
        items: t('achievement3_items', { returnObjects: true }),
    },
  ];

  return (
    <div className="bg-white font-open-sans text-text-black">
      {/* Header */}
      <header className="sticky top-0 w-full bg-white shadow-md z-50">
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
            <LanguageSwitcher />
            <Button variant="text" className="!border-[#25DE85] !text-[#25DE85] !border-2 !px-8 !py-3" disabled>{t('login_button')}</Button>
            <Link to="/auth"><Button variant="big-classic">{t('signup_button')}</Button></Link>
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
                <div className="px-4 mb-4">
                    <LanguageSwitcher />
                </div>
                <Button variant="big-outline" className="w-full !border-[#FF2B00] !text-[#FF2B00]" disabled>{t('login_button')}</Button>
                <Link to="/auth" className="w-full" onClick={() => setMobileMenuOpen(false)}><Button variant="big-classic" className="w-full">{t('signup_button')}</Button></Link>
            </div>
        </div>
      </header>

      {/* Hero Section */}
        <section id="hero" className="bg-bg-light" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/backgroundImage.svg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 flex items-center justify-center">
                <div className="max-w-7xl text-center">
                    <h1 className="font-tt-travels text-4xl sm:text-5xl font-bold mb-6">{t('hero_title')}</h1>
                    <p className="text-lg sm:text-xl text-text-grey max-w-6xl mx-auto mb-6">{t('hero_subtitle1')}</p>
                    <p className="text-lg sm:text-xl text-text-grey max-w-6xl mx-auto mb-10">{t('hero_subtitle2')}</p>
                    <Link to="/auth"><Button variant="big-with-arrow">{t('hero_join_button')}</Button></Link>
                </div>
            </div>
        </section>
      
      {/* Sections */} 
      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className={`py-20 ${section.id === 'start-bot' ? 'px-0' : (section.id === 'terminal' || section.id === 'advantages' || section.id === 'security' ? 'px-16' : 'px-4 sm:px-10')} ${index % 2 === 0 ? 'bg-white' : 'bg-bg-light'}`}>
            {section.id === 'about' ? (
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-left mb-4">{t('about_title')}</h2>
                    <p className="text-base md:text-lg text-gray-700 mb-4">{t('about_text1')}</p>
                    <p className="text-base md:text-lg text-gray-700 mb-4">{t('about_text2')}</p>
                    <p className="text-lg md:text-xl font-bold text-gray-700 mb-12">{t('about_text3')}</p>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Left Block - Igor Botnari Photo */}
                        <div className="relative w-full lg:w-1/2 rounded-lg overflow-hidden shadow-lg h-96 lg:h-auto">
                            <img
                                src={`${process.env.PUBLIC_URL}/igor.cbc61e98.webp`}
                                alt={t('ceo_name')}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4">
                                <p className="text-white text-xl font-semibold">{t('ceo_name')}</p>
                                <p className="text-white text-sm">{t('ceo_title')}</p>
                            </div>
                        </div>

                        {/* Right Block - Achievement Cards */}
                        <div className="w-full lg:w-1/2 grid grid-cols-1 gap-8">
                            {achievements.map((achievement, achIndex) => (
                                <div key={achIndex} className="bg-white p-6 rounded-[30px] shadow-md relative">
                                    <img
                                        src={`${process.env.PUBLIC_URL}/${achievement.logo}`}
                                        alt="Company Logo"
                                        className={`absolute ${achIndex === 0 ? 'top-4' : 'top-[-1rem]'} left-4 object-contain ${achIndex === 0 ? 'w-12 h-12' : 'w-24 h-24'}`}
                                    />
                                    <div className="absolute top-4 right-4 bg-[#EFA46F] text-white text-sm font-bold px-3 py-1 rounded-full">
                                        {achievement.year}
                                    </div>
                                    <ul className="mt-12 space-y-2">
                                        {Array.isArray(achievement.items) && achievement.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start text-gray-700">
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
                    <a href="https://www.fixoneglobal.com/TERMS_AND_CONDITIONS_FIXONE_GLOBAL_TRADING.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-black">{t('footer_terms')}</a>
                    <span className="text-gray-400">|</span>
                    <a href="https://www.fixoneglobal.com/PRIVACY_POLICY_FIXONE_GLOBAL_TRADING_.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-black">{t('footer_privacy')}</a>
                    <span className="text-gray-400">|</span>
                    <a href="https://www.fixoneglobal.com/documents/" target="_blank" rel="noopener noreferrer" className="hover:text-black">{t('footer_legal')}</a>
                </div>
                <a href="mailto:support@fixoneglobal.com" className="text-main hover:text-main-dark font-semibold">support@fixoneglobal.com</a>
            </div>
        </div>
      </footer>
      {isModalOpen && <BotDetailModal isOpen={isModalOpen} onClose={handleCloseModal} bot={selectedBot} />}
    </div>
  );
};

export default LandingPage;
