import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Re-using Button component definition for self-containment
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

// ICONS (SVG) - Re-using close icon
const ICONS = {
  close: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="18" y1="6" x2="6" y2="18" stroke={props.color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="6" y1="6" x2="18" y2="18" stroke={props.color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  warning: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

const BotDetailModal = ({ isOpen, onClose, bot }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay(); 

  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear(prevYear => (currentMonth === 0 ? prevYear - 1 : prevYear));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear(prevYear => (currentMonth === 11 ? prevYear + 1 : prevYear));
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(clickedDate);
      setSelectedEndDate(null);
    } else if (clickedDate < selectedStartDate) {
      setSelectedEndDate(selectedStartDate);
      setSelectedStartDate(clickedDate);
    } else {
      setSelectedEndDate(clickedDate);
    }
  };

  const isSelected = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return (selectedStartDate && date.toDateString() === selectedStartDate.toDateString()) ||
           (selectedEndDate && date.toDateString() === selectedEndDate.toDateString()) ||
           (selectedStartDate && selectedEndDate && date > selectedStartDate && date < selectedEndDate);
  };

  const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  const weekdayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const days = [];
  const numDays = daysInMonth(currentMonth, currentYear);
  const firstDay = firstDayOfMonth(currentMonth, currentYear);

  const adjustedFirstDay = (firstDay === 0) ? 6 : firstDay - 1;

  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(null); 
  }
  for (let i = 1; i <= numDays; i++) {
    days.push(i);
  }

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Mock data for pairs (text only, no logos)
  const tradingPairs = [
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD', 'NZD/USD',
    'BTC/USD', 'ETH/USD', 'XRP/USD', 'LTC/USD', 'ADA/USD',
    'XAU/USD (Gold)', 'XAG/USD (Silver)', 'CL/USD (Crude Oil)', 'NG/USD (Natural Gas)',
    'SPX500/USD (S&P 500)', 'NDX100/USD (Nasdaq 100)', 'DJI30/USD (Dow Jones)',
    'AAPL/USD', 'GOOGL/USD', 'MSFT/USD', 'AMZN/USD', 'TSLA/USD',
    'CORN/USD', 'WHEAT/USD', 'SOYBEAN/USD',
    'PLATINUM/USD', 'PALLADIUM/USD',
    'COFFEE/USD', 'SUGAR/USD',
  ];

  const renderDescriptionTab = () => (
    <div className="p-6">
      <p className="text-sm text-gray-700 mb-4">
        Для принятия осознанного решения о покупке предлагаем вам ознакомиться с полной информацией о продукте по ссылке. В представленных материалах содержится:
      </p>
      <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
        <li>Детальное описание принципов работы сигналов</li>
        <li>Примеры торговых ситуаций с анализом эффективности</li>
        <li>Обзор возможных стратегий применения</li>
        <li>Ответы на часто задаваемые вопросы</li>
      </ul>
      <p className="text-sm text-gray-700 mb-4">
        Оформите подписку на сигналы и начните применять проверенные торговые решения уже сегодня. Для старта торговли пользователю достаточно скопировать готовых ботов в свой аккаунт FIXONE ALGO без необходимости создавать каждый вручную. В дальнейшем торговля не требует ручного вмешательства в автоматическую торговлю. Поддержка и помощь в настройке постоянно оказывается автором в Telegram чате.
      </p>
      <div className="flex items-center p-3 bg-yellow-100 rounded-lg text-yellow-800 text-xs mb-4">
        <ICONS.warning className="w-5 h-5 mr-2" />
        Алготрейдинг — это инструмент с потенциальной доходностью, но и с рисками. Данный материал не является инвестсоветом.
      </div>

      <div className="mb-4">
        <label htmlFor="pair-select" className="block text-sm font-medium text-gray-700 mb-2">Поддерживаемые пары</label>
        <select id="pair-select" name="pair-select" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-main focus:border-main sm:text-sm rounded-md">
          {tradingPairs.map((pair, index) => (
            <option key={index}>{pair}</option>
          ))}
        </select>
      </div>

      <Button variant="big-classic" className="w-full !bg-[#FF2B00]">Купить за $500</Button>
    </div>
  );

  const renderStatisticsTab = ({ showCalendar, setShowCalendar, currentMonth, setCurrentMonth, currentYear, setCurrentYear, selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate, handlePrevMonth, handleNextMonth, handleDateClick, isSelected, monthNames, weekdayNames, days, tradingPairs }) => (
    <div className="p-6">
      <div className="flex space-x-4 mb-4"> 
        <div className="flex-1"> 
          <label htmlFor="pair-select-stats" className="block text-sm font-medium text-gray-700 mb-2">Пара</label>
          <select id="pair-select-stats" name="pair-select-stats" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-main focus:border-main sm:text-sm rounded-md">
            {tradingPairs.map((pair, index) => (
              <option key={index}>{pair}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 relative"> 
          <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-2">Период</label>
          <input
            type="text"
            id="date-range"
            name="date-range"
            placeholder="Выберите период"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-main focus:border-main sm:text-sm rounded-md cursor-pointer"
            onClick={() => setShowCalendar(!showCalendar)}
            value={selectedStartDate && selectedEndDate ? `${selectedStartDate.toLocaleDateString()} - ${selectedEndDate.toLocaleDateString()}` : ''}
            readOnly
          />
          {showCalendar && (
            <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 p-2"> 
              <div className="flex justify-between items-center mb-2">
                <button onClick={handlePrevMonth} className="px-2 py-1 rounded-md hover:bg-gray-100">&lt;</button>
                <span className="font-medium">{monthNames[currentMonth]} {currentYear}</span>
                <button onClick={handleNextMonth} className="px-2 py-1 rounded-md hover:bg-gray-100">&gt;</button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {weekdayNames.map(day => <div key={day} className="font-bold">{day}</div>)}
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`p-1 rounded-md cursor-pointer ${day ? (isSelected(day) ? 'bg-blue-500 text-white' : 'hover:bg-blue-100') : ''}`}
                    onClick={() => day && handleDateClick(day)}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center mb-4"> 
        <div className="relative flex-grow h-64 bg-gray-50 border border-gray-300 rounded-md"> 
            <span className="absolute top-2 right-2 text-xs text-gray-400">Результат</span>
            <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-0.5 p-2">
              {Array(25).fill().map((_, i) => <div key={i} className="border border-gray-200"></div>)}
            </div>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,80 C25,20 75,90 100,30" fill="none" stroke="#FF7255" strokeWidth="2" />
            </svg>
            <span className="absolute bottom-2 left-2 text-xs text-gray-400">Дата</span>
          </div>
          <div className="flex flex-col justify-between h-64 py-0 pr-1 text-xs text-gray-400 space-y-2"> 
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
          </div>
        </div>

      <div className="flex justify-between text-xs text-gray-400 mt-2 px-2">
        <span>Май</span>
        <span>Июнь</span>
        <span>Июль</span>
        <span>Август</span>
        <span>Сентябрь</span>
      </div>

      <p className="text-xs text-gray-500 mb-4">Результаты ботов отображаются с задержкой 24часа.</p>

      <Button variant="big-classic" className="w-full !bg-[#FF2B00]">Купить за $500</Button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <div className="bg-white rounded-[25px] border border-gray-300 w-[800px] max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-black z-10">
          <ICONS.close className="w-6 h-6" />
        </button>

        {/* Top Bar */}
        <div className="bg-blue-200 text-white text-lg font-bold p-4 rounded-t-[25px] flex items-center justify-center">
          <img src={`${process.env.PUBLIC_URL}/Frame 7462.svg`} alt="Алго-бот" className="h-8 w-8 mr-2" />
          Алго-бот
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{bot.title}</h2>
          <p className="text-sm text-gray-600 mb-4">{bot.description}</p>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`py-2 px-4 text-sm font-medium ${activeTab === 'description' ? 'border-b-2 border-main text-main' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('description')}
            >
              Описание
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium ${activeTab === 'statistics' ? 'border-b-2 border-main text-main' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('statistics')}
            >
              Статистика
            </button>
          </div>

          {activeTab === 'description' ? renderDescriptionTab() : renderStatisticsTab({
            showCalendar, setShowCalendar, currentMonth, setCurrentMonth, currentYear, setCurrentYear,
            selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate,
            handlePrevMonth, handleNextMonth, handleDateClick, isSelected,
            monthNames, weekdayNames, days, tradingPairs
          })}
        </div>
      </div>
    </div>
  );
};

export default BotDetailModal;