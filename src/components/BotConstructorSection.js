import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Animated from './Animated';

// ICONS PLACEHOLDER - Re-using from CreateBotPage for consistency
const ICONS = {
  person: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
    </svg>
  ),
  polygon: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  close: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  rocket: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.2 18.8L3.4 21.6m14.4-14.4L20.6 4.4M6.2 6.2L3.4 3.4M18.8 18.8l2.8 2.8M12 2v4m0 12v4M2 12h4m12 0h4M12 8a4 4 0 100 8 4 4 0 000-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  stop: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  trash: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  search: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  chevronDown: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const Dropdown = ({ title, options, multiSelect = false, onClear, header }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(multiSelect ? [] : null);

    const handleSelect = (option) => {
        if (multiSelect) {
            setSelected(prev => 
                prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
            );
        } else {
            setSelected(option);
            setIsOpen(false);
        }
    };

    const isSelected = (option) => {
        if (multiSelect) {
            return selected.includes(option);
        }
        return selected === option;
    }

    return (
        <div className="relative w-full">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 flex justify-between items-center text-sm">
                <span>{selected ? (options.find(o => o.value === selected) || {}).label : title}</span>
                <ICONS.chevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute z-10 top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
                    <div className="p-2 flex justify-between items-center border-b">
                        <h4 className="font-bold text-sm">{header}</h4>
                        <button onClick={onClear} className="text-xs text-gray-500 hover:text-black">Очистить</button>
                    </div>
                    <div className="p-2 max-h-48 overflow-y-auto">
                        {options.map(opt => (
                            <div 
                                key={opt.value} 
                                onClick={() => handleSelect(opt.value)}
                                className={`p-2 rounded-md cursor-pointer flex items-center justify-between text-sm ${isSelected(opt.value) ? 'ring-2 ring-[#FF2B00]' : ''}`}
                            >
                                <span style={{ color: opt.color }}>{opt.label}</span>
                                {isSelected(opt.value) && <ICONS.close className="w-4 h-4 text-[#FF2B00]" />}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const BotConstructorSection = () => {
  const algorithmOptions = [
    { value: 'long', label: 'Long', color: 'green' },
    { value: 'short', label: 'Short', color: 'red' },
  ];

  const statusOptions = [
    { value: 'waiting_signal', label: 'Ожидает сигнала' },
    { value: 'in_trade', label: 'В сделке' },
    { value: 'stopped', label: 'Остановлен' },
    { value: 'waiting_stop', label: 'Ожидает остановки' },
    { value: 'error', label: 'Ошибка' },
  ];

  const sortOptions = [
    { value: 'name_asc', label: 'Название (от А до Я)' },
    { value: 'date_created', label: 'Дата создания' },
    { value: 'last_updated', label: 'Последнее обновление' },
  ];

  const selectedFilters = ['Long', 'В сделке'];

  const completedTrades = Array.from({length: 15}).map((_, i) => ({
      id: i,
      pair: 'BTC/USDT',
      algo: i % 2 === 0 ? 'Long' : 'Short',
      status: 'Completed',
      date: `18.07.2025`,
      result: (Math.random() * 200 - 100).toFixed(2)
  }));

  const marketPrices = [
      { name: 'BTC/USD', price: '68,123.45', change: '+1.25%', positive: true },
      { name: 'ETH/USD', price: '3,567.89', change: '-0.58%', positive: false },
      { name: 'EUR/USD', price: '1.0856', change: '+0.12%', positive: true },
      { name: 'USD/JPY', price: '157.23', change: '-0.21%', positive: false },
      { name: 'S&P 500', price: '5,432.10', change: '+0.89%', positive: true },
      { name: 'NASDAQ', price: '17,890.54', change: '-0.05%', positive: false },
  ];

  return (
    <div className="w-full bg-gray-50 py-20">
        <Animated>
            <div className="container mx-auto text-center mb-12 px-4">
                <h2 className="text-3xl md:text-4xl font-bold">Вы можете попробовать создать бота прямо сейчас</h2>
                <p className="text-base md:text-lg text-gray-600 mt-2">Попробуйте собрать своего торгового бота в пару кликов — бесплатно и без регистрации</p>
            </div>
        </Animated>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 items-stretch">
            {/* Left Container */}
            <Animated animation="fadeInLeft">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg flex flex-col h-full">
                    <h3 className="font-bold text-xl mb-4">Мои боты</h3>
                    <div className="relative mb-4">
                        <input type="text" placeholder="Поиск..." className="w-full pl-10 pr-4 py-2 border rounded-md"/>
                        <ICONS.search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
                        <Dropdown title="Алгоритм" header="Алгоритмы" options={algorithmOptions} onClear={() => {}} />
                        <Dropdown title="Статус" header="Статус" options={statusOptions} multiSelect onClear={() => {}} />
                        <Dropdown title="Последнее обновление" header="Сортировка" options={sortOptions} onClear={() => {}} />
                    </div>

                    <hr className="my-4" />

                    <div className="flex items-center gap-4 mb-4">
                        <button className="p-2 text-gray-500 hover:text-red-500">
                            <ICONS.trash className="w-6 h-6" />
                        </button>
                        <div className="flex flex-wrap gap-2 items-center">
                            <div className="w-px h-6 bg-gray-300 mx-2"></div> {/* Separator */}
                            {selectedFilters.map(filter => (
                                <div key={filter} className="bg-[#C2C2C2] text-black text-sm px-3 py-1 rounded-full flex items-center gap-2">
                                    <span>{filter}</span>
                                    <button><ICONS.close className="w-3 h-3" /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="w-full bg-[#E3E3E3] border border-[#868686] text-black font-bold py-2 rounded-md mb-4 hover:bg-gray-300 active:bg-gray-400 transition-colors">
                        Обновить
                    </button>

                    <div className="border rounded-lg p-4 flex-grow">
                        <div className="flex">
                            <div className="pr-4 font-bold text-gray-500">
                                {Array.from({ length: 10 }).map((_, i) => <div key={i} className="h-8 flex items-center">{i + 1}</div>)}
                            </div>
                            <div className="border-l border-gray-300 pl-4 flex-1">
                                {Array.from({ length: 10 }).map((_, i) => <div key={i} className="h-8 border-b flex items-center text-sm">Bot Name {i+1} - Running</div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </Animated>

            {/* Right Container */}
            <Animated animation="fadeInRight">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                        <img src={`${process.env.PUBLIC_URL}/person.svg`} alt="User" className="w-12 h-12" />
                        <div>
                            <p className="font-semibold">test@gmail.com</p>
                            <p className="font-bold text-xl md:text-2xl">$1737.61</p>
                        </div>
                    </div>
                    
                    <hr className="my-4" />

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-3">
                            <img src={`${process.env.PUBLIC_URL}/Polygon 4.svg`} alt="In trade" className="w-6 h-6" />
                            <span className="font-semibold text-sm">В сделке</span>
                            <span className="ml-auto font-bold">0</span>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-3">
                            <img src={`${process.env.PUBLIC_URL}/close.svg`} alt="Error" className="w-6 h-6" />
                            <span className="font-semibold text-sm">Ошибка</span>
                            <span className="ml-auto font-bold">0</span>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-3">
                            <img src={`${process.env.PUBLIC_URL}/rocket.svg`} alt="Running" className="w-6 h-6" />
                            <span className="font-semibold text-sm">Запущен</span>
                            <span className="ml-auto font-bold">0</span>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-3">
                            <img src={`${process.env.PUBLIC_URL}/stop.svg`} alt="Stopped" className="w-6 h-6" />
                            <span className="font-semibold text-sm">Остановлен</span>
                            <span className="ml-auto font-bold">0</span>
                        </div>
                    </div>

                    <Link to="/create-bot" className="w-full">
                        <button className="w-full bg-[#FF7255] text-white font-bold py-3 rounded-[90px] text-lg mb-4 hover:bg-orange-600 active:bg-orange-700 transition-colors">
                            Создать бота
                        </button>
                    </Link>

                    <div className="relative mb-4">
                        <button className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 flex justify-between items-center text-sm">
                            <span>18.07.2025–18.08.2025</span>
                            <ICONS.chevronDown className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="border rounded-lg p-4 mb-4 text-xs flex-grow overflow-y-auto h-48">
                        <h4 className="font-bold mb-2 text-sm">Сделок завершено</h4>
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="text-left text-gray-500">
                                    <th className="py-1">Пара</th>
                                    <th className="py-1">Алгоритм</th>
                                    <th className="py-1">Результат</th>
                                </tr>
                            </thead>
                            <tbody>
                            {completedTrades.map(trade => (
                                <tr key={trade.id} className="border-b">
                                    <td className="py-1">{trade.pair}</td>
                                    <td className={`py-1 ${trade.algo === 'Long' ? 'text-green-500' : 'text-red-500'}`}>{trade.algo}</td>
                                    <td className={`py-1 ${trade.result > 0 ? 'text-green-500' : 'text-red-500'}`}>{trade.result > 0 ? '+' : ''}${trade.result}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <hr className="my-4" />

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {marketPrices.map(item => (
                            <div key={item.name} className="text-left">
                                <p className="font-bold text-sm">{item.name}</p>
                                <p className="text-xs">{item.price}</p>
                                <p className={`text-xs ${item.positive ? 'text-green-500' : 'text-red-500'}`}>{item.change}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Animated>
        </div>
    </div>
  );
};

export default BotConstructorSection;