
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TradingViewWidget from '../components/TradingViewWidget'; // Import the widget

// ICONS PLACEHOLDER
const ICONS = {
  close: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  check: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  warning: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 9v2m0 4h.01"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    </svg>
  ),
  chevronDown: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  plus: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
  )
};

const ProgressBar = () => {
    const steps = ["Название", "Пара", "Депозит", "Ордера", "Фильтры", "Выход из сделки"];

    return (
        <div className="w-full mb-8">
            <div className="flex items-start">
                {steps.map((step, index) => (
                    <React.Fragment key={step}>
                        <div className="flex flex-col items-center w-20">
                            <div className={`w-12 h-8 rounded-full flex items-center justify-center text-gray-700 bg-gray-200 border-2 border-gray-300`}>
                                <span className="font-bold">{index + 1}</span>
                            </div>
                            <p className="text-xs mt-2 text-center font-semibold text-gray-600">{step}</p>
                        </div>
                        {index < steps.length - 1 && <div className={`flex-1 h-0.5 bg-gray-300`}></div>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

const ToggleSwitch = ({ label, isOn, onToggle }) => {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm">{label}</span>
            <button onClick={onToggle} className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${isOn ? 'bg-[#25DE85] justify-end' : 'bg-gray-300 justify-start'}`}>
                <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
            </button>
        </div>
    );
};

const DropdownControl = ({ label, options }) => (
    <div className="flex-1">
        <label className="text-xs text-gray-500">{label}</label>
        <div className="relative">
            <select className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 appearance-none">
                {options.map(opt => <option key={opt}>{opt}</option>)}
            </select>
            <ICONS.chevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
    </div>
);

const FilterRow = ({ number, onRemove }) => {
    const indicatorOptions = [
        "Accumulation/Distribution", "Arnaud Legoux Moving Average", "Average Directional Index (ADX)",
        "Average True Range (ATR)", "Awesome Oscillator", "Bollinger Bands", "Bollinger Bands %B",
        "Bollinger Bands Width", "Chaikin Money Flow (CMF)", "Chaikin Oscillator", "Chande Kroll Stop",
        "Chande Momentum Oscillator", "Commodity Channel Index (CCI)", "ConnorsRSI", "Coppock Curve",
        "Correlation Coefficient", "Detrended Price Oscillator (DPO)", "Donchian Channels",
        "Double EMA", "Ease of Movement (EOM)", "Elder's Force Index (EFI)", "Envelopes",
        "Fisher Transform", "Historical Volatility", "Hull Moving Average (HMA)", "Ichimoku Cloud",
        "Keltner Channels", "Klinger Oscillator", "Know Sure Thing (KST)", "Linear Regression",
        "MACD", "Momentum", "Money Flow Index (MFI)", "Moving Average (MA)", "Moving Average Convergence/Divergence",
        "Moving Average Exponential (EMA)", "On-Balance Volume (OBV)", "Parabolic SAR",
        "Pivot Points Standard", "Price Oscillator", "Rate of Change (ROC)", "Relative Strength Index (RSI)",
        "Relative Vigor Index (RVI)", "Standard Deviation", "Stochastic", "Stochastic RSI",
        "Triple EMA (TRIX)", "Ultimate Oscillator", "Volume", "Vortex Indicator", "Williams %R"
    ];

    const intervalOptions = ['5 минут', '15 минут', '1 час', '6 часов', '12 часов', '1 день'];
    const typeOptions = ['На закрытии бара', 'Раз в минуту'];

    return (
        <div className="flex items-center gap-2 p-2 border rounded-md">
            <span className="font-bold text-sm w-4 text-center">{number}</span>
            <div className="flex-grow w-1/3"><DropdownControl label="Индикатор" options={indicatorOptions} /></div>
            <div className="flex-grow w-1/4"><DropdownControl label="Интервал" options={intervalOptions} /></div>
            <div className="flex-grow w-1/3"><DropdownControl label="Тип" options={typeOptions} /></div>
            <button onClick={onRemove} className="text-gray-400 hover:text-red-500"><ICONS.close className="w-5 h-5" /></button>
        </div>
    );
};

const CreateBotPage = () => {
    const [selectedPair, setSelectedPair] = useState('BTCUSD');
    const [tradingMode, setTradingMode] = useState(null); // State for the new section
    const [isStopLossEnabled, setIsStopLossEnabled] = useState(false);
    const [filters, setFilters] = useState([{id: 1}]); // State for filters

    const addFilter = () => {
        if (filters.length < 5) {
            setFilters([...filters, { id: Date.now() }]);
        }
    };

    const removeFilter = (id) => {
        setFilters(filters.filter(f => f.id !== id));
    };

    const pairOptions = [
        { value: 'EURUSD', label: 'EUR/USD' },
        { value: 'GBPUSD', label: 'GBP/USD' },
        { value: 'BTCUSD', label: 'BTC/USD' },
        { value: 'ETHUSD', label: 'ETH/USD' },
        { value: 'COINBASE:USDTUSD', label: 'USDT/USD' },
        { value: 'LTCUSD', label: 'LTC/USD' },
        { value: 'NASDAQ:AAPL', label: 'Apple (AAPL)' },
        { value: 'NASDAQ:NVDA', label: 'Nvidia (NVDA)' },
        { value: 'NASDAQ:INTC', label: 'Intel (INTC)' },
        { value: 'NASDAQ:NFLX', label: 'Netflix (NFLX)' },
        { value: 'NASDAQ:NDX', label: 'NASDAQ' },
    ];

    const tradingModes = [
        {
            name: 'Консервативный',
            params: ['Перекрытие - 40%', 'Мартингейл - 5%', 'Сетка ордеров - 20']
        },
        {
            name: 'Умеренный',
            params: ['Перекрытие - 25%', 'Мартингейл - 5%', 'Сетка ордеров - 15']
        },
        {
            name: 'Агрессивный',
            params: ['Перекрытие - 15%', 'Мартингейл - 5%', 'Сетка ордеров - 10']
        },
    ];

    const handlePairChange = (e) => {
        setSelectedPair(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-20">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img src={`${process.env.PUBLIC_URL}/Frame 7462.svg`} alt="FIXONE ALGO Logo" className="h-10 w-10"/>
                        <span className="font-bold text-xl">Создание бота</span>
                    </div>
                    <Link to="/" className="text-gray-500 hover:text-black">
                        <ICONS.close className="w-8 h-8" />
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Chart */}
                <div className="bg-white rounded-lg shadow-md p-1 flex flex-col h-[calc(100vh-120px)]">
                    <TradingViewWidget symbol={selectedPair} />
                </div>

                {/* Right Column - Form */}
                <div className="bg-white rounded-lg shadow-md p-6 h-[calc(100vh-120px)] overflow-y-auto">
                    <ProgressBar />

                    <div className="space-y-6">
                        {/* Step 1: Name */}
                        <div>
                            <label className="font-bold">Название бота</label>
                            <input type="text" placeholder="Мой супер бот" className="w-full mt-1 p-2 border rounded-md" />
                        </div>

                        {/* Step 2: Pair */}
                        <div>
                            <label className="font-bold">Торговая пара</label>
                            <div className="flex items-center gap-2 mt-1">
                                 <div className="flex-1">
                                    <div className="relative">
                                        <select onChange={handlePairChange} value={selectedPair} className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 appearance-none">
                                            {pairOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                        </select>
                                        <ICONS.chevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                    </div>
                                </div>
                                {selectedPair && <div className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2 text-sm">{pairOptions.find(p => p.value === selectedPair)?.label} <button onClick={() => setSelectedPair(null)}><ICONS.close className="w-3 h-3"/></button></div>}
                            </div>
                        </div>

                        {/* Step 3: Deposit */}
                        <div>
                            <label className="font-bold">Депозит</label>
                            <div className="flex items-end gap-4 mt-1">
                                <div className="flex-1">
                                    <input type="number" placeholder="1000" className="w-full p-2 border rounded-md" />
                                    <p className="text-xs text-gray-500">Депозит</p>
                                </div>
                                <div className="flex-1">
                                    <p className="p-2 border-b">$1737.61</p>
                                    <p className="text-xs text-gray-500">Баланс на счёте</p>
                                </div>
                            </div>
                        </div>

                        {/* Step 4: Entry */}
                        <div className="p-4 border rounded-md space-y-4">
                            <h4 className="font-bold">Вход в сделку</h4>
                            
                            {/* Trading Mode Section */}
                            <div className="mt-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <h5 className="font-semibold">Режим торговли</h5>
                                    <div className="relative group">
                                        <ICONS.warning className="w-4 h-4 text-gray-400 cursor-pointer" />
                                        <div className="absolute bottom-full mb-2 w-64 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                            Это готовые наборы параметров для входа в сделку, которые помогут вам быстрее принять решение.
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {tradingModes.map(mode => (
                                        <div 
                                            key={mode.name} 
                                            onClick={() => setTradingMode(mode.name)}
                                            className={`p-3 border rounded-lg cursor-pointer ${tradingMode === mode.name ? 'border-[#FF2B00] ring-2 ring-[#FF2B00]' : 'border-gray-300'}`}>
                                            <h6 className="font-bold text-sm mb-2">{mode.name}</h6>
                                            <div className="text-xs space-y-1">
                                                {mode.params.map(param => <p key={param}>{param}</p>)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <DropdownControl label="Перекрытие" options={['0.5', '0.75', '1', '1.25']} />
                                <DropdownControl label="Сетка ордеров" options={['2', '3', '4', '5']} />
                                <DropdownControl label="Мартингейл" options={['1%', '5%', '10%']} />
                                <DropdownControl label="Отступ" options={['Market', '0.1%', '0.2%']} />
                            </div>
                            <ToggleSwitch label="Остановить бота после завершения сделок" />
                            <ToggleSwitch label="Включать открытую позицию в сделку" />
                        </div>

                        {/* Step 5: Entry Conditions */}
                        <div className="p-4 border rounded-md space-y-4">
                            <h4 className="font-bold">Условия открытия сделки</h4>
                            <div className="space-y-2">
                                {filters.map((filter, index) => (
                                    <FilterRow key={filter.id} number={index + 1} onRemove={() => removeFilter(filter.id)} />
                                ))}
                            </div>
                            <button 
                                onClick={addFilter} 
                                className="text-sm text-blue-600 hover:underline disabled:text-gray-400 disabled:no-underline"
                                disabled={filters.length >= 5}
                            >
                                + Добавить фильтр
                            </button>
                        </div>

                        {/* Step 6: Exit */}
                        <div className="p-4 border rounded-md space-y-4">
                            <h4 className="font-bold">Выход из сделки</h4>
                            <div className="flex items-end gap-4">
                                <DropdownControl label="Профит" options={['0.2%', '0.5%', '1%', '5%', '10%', '15%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%']} />
                                <div>
                                    <p className="p-2 border-b text-gray-500">$ USD</p>
                                    <p className="text-xs text-gray-500">Валюта профита</p>
                                </div>
                            </div>
                            <ToggleSwitch label="Стоп-лосс" isOn={isStopLossEnabled} onToggle={() => setIsStopLossEnabled(!isStopLossEnabled)} />
                            {isStopLossEnabled && (
                                <div className="pl-4 pt-2">
                                    <DropdownControl label="Процент стоп-лосса" options={['-0.1%', '-0.2%', '-0.5%', '-1%', '-2%', '-5%', '-10%']} />
                                </div>
                            )}
                            <ToggleSwitch label="Остановить бота после исполнения стоп-лосса" isOn={false} onToggle={() => {}}/>
                        </div>

                        {/* Final Button */}
                        <div className="relative group">
                            <button className="w-full bg-gray-300 text-gray-500 font-bold py-4 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed">
                                <ICONS.plus className="w-6 h-6" />
                                <span>Создать бота</span>
                            </button>
                            <div className="absolute bottom-full mb-2 w-max bg-black text-white text-xs rounded py-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none left-1/2 -translate-x-1/2">
                                В данный момент находится в разработке
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateBotPage;
