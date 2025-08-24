
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TradingViewWidget from '../../components/TradingViewWidget'; // Adjusted import path

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
            <div className="flex items-center -mx-2">
                {steps.map((step, index) => (
                    <React.Fragment key={step}>
                        <div className="flex flex-col items-center px-2 w-24">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-gray-700 bg-gray-200 border-2 border-gray-300`}>
                                <span className="font-bold">{index + 1}</span>
                            </div>
                            <p className="text-xs mt-2 text-center font-semibold text-gray-600">{step}</p>
                        </div>
                        {index < steps.length - 1 && <div className={`flex-1 h-1 bg-gray-300`}></div>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

const ToggleSwitch = ({ label, isOn, onToggle }) => {
    return (
        <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium">{label}</span>
            <button onClick={onToggle} className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${isOn ? 'bg-main justify-end' : 'bg-gray-300 justify-start'}`}>
                <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform"></div>
            </button>
        </div>
    );
};

const DropdownControl = ({ label, options }) => (
    <div className="flex-1">
        <label className="text-xs text-gray-500 mb-1 block">{label}</label>
        <div className="relative">
            <select className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-main">
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
        <div className="flex flex-col sm:flex-row items-center gap-2 p-2 border rounded-lg bg-gray-50">
            <span className="font-bold text-sm w-4 text-center mb-2 sm:mb-0 text-gray-500">{number}</span>
            <div className="w-full sm:flex-grow sm:w-1/3"><DropdownControl label="Индикатор" options={indicatorOptions} /></div>
            <div className="w-full sm:flex-grow sm:w-1/4"><DropdownControl label="Интервал" options={intervalOptions} /></div>
            <div className="w-full sm:flex-grow sm:w-1/3"><DropdownControl label="Тип" options={typeOptions} /></div>
            <button onClick={onRemove} className="text-gray-400 hover:text-red-500 ml-auto sm:ml-2 flex-shrink-0"><ICONS.close className="w-5 h-5" /></button>
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

    // This component no longer has its own header or full-page background.
    // It will be rendered inside the DashboardLayout.
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Column - Chart */}
            <div className="lg:col-span-2 bg-white rounded-[60px] shadow-lg p-1 flex flex-col h-96 lg:h-[calc(100vh-10rem)]">
                <TradingViewWidget symbol={selectedPair} />
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-3 bg-white rounded-[60px] shadow-lg p-4 sm:p-6 h-auto lg:h-[calc(100vh-10rem)] lg:overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                    <ProgressBar />

                    <div className="space-y-6">
                        {/* Step 1: Name */}
                        <div className="p-4 border rounded-lg">
                            <label className="font-bold text-lg">Название бота</label>
                            <input type="text" placeholder="Мой супер бот" className="w-full mt-2 p-3 bg-gray-50 border-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-main" />
                        </div>

                        {/* Step 2: Pair */}
                        <div className="p-4 border rounded-lg">
                            <label className="font-bold text-lg">Торговая пара</label>
                            <div className="flex items-center gap-2 mt-2">
                                 <div className="flex-1">
                                    <div className="relative">
                                        <select onChange={handlePairChange} value={selectedPair} className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-main">
                                            {pairOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                        </select>
                                        <ICONS.chevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Deposit */}
                        <div className="p-4 border rounded-lg">
                            <label className="font-bold text-lg">Депозит</label>
                            <div className="flex flex-col sm:flex-row items-end gap-4 mt-2">
                                <div className="flex-1 w-full">
                                    <p className="text-xs text-gray-500 mb-1">Сумма</p>
                                    <input type="number" placeholder="1000" className="w-full p-3 bg-gray-50 border-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-main" />
                                </div>
                                <div className="flex-1 w-full">
                                    <p className="text-xs text-gray-500 mb-1">Баланс на счёте</p>
                                    <p className="p-3 border-b-2">$1737.61</p>
                                </div>
                            </div>
                        </div>

                        {/* Step 4: Entry */}
                        <div className="p-4 border rounded-lg space-y-4">
                            <h4 className="font-bold text-lg">Вход в сделку</h4>
                            
                            <div className="mt-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <h5 className="font-semibold">Режим торговли</h5>
                                    <div className="relative group">
                                        <ICONS.warning className="w-4 h-4 text-gray-400 cursor-pointer" />
                                        <div className="absolute bottom-full mb-2 w-64 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                            Это готовые наборы параметров для входа в сделку, которые помогут вам быстрее принять решение.
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {tradingModes.map(mode => (
                                        <div 
                                            key={mode.name} 
                                            onClick={() => setTradingMode(mode.name)}
                                            className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${tradingMode === mode.name ? 'border-main shadow-md' : 'border-gray-200 hover:border-gray-400'}`}>
                                            <h6 className="font-bold text-sm mb-2">{mode.name}</h6>
                                            <div className="text-xs space-y-1 text-gray-600">
                                                {mode.params.map(param => <p key={param}>{param}</p>)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
                                <DropdownControl label="Перекрытие" options={['0.5', '0.75', '1', '1.25']} />
                                <DropdownControl label="Сетка ордеров" options={['2', '3', '4', '5']} />
                                <DropdownControl label="Мартингейл" options={['1%', '5%', '10%']} />
                                <DropdownControl label="Отступ" options={['Market', '0.1%', '0.2%']} />
                            </div>
                            <ToggleSwitch label="Остановить бота после завершения сделок" />
                            <ToggleSwitch label="Включать открытую позицию в сделку" />
                        </div>

                        {/* Step 5: Entry Conditions */}
                        <div className="p-4 border rounded-lg space-y-4">
                            <h4 className="font-bold text-lg">Условия открытия сделки</h4>
                            <div className="space-y-3">
                                {filters.map((filter, index) => (
                                    <FilterRow key={filter.id} number={index + 1} onRemove={() => removeFilter(filter.id)} />
                                ))}
                            </div>
                            <button 
                                onClick={addFilter} 
                                className="text-sm font-semibold text-blue-600 hover:underline disabled:text-gray-400 disabled:no-underline mt-2"
                                disabled={filters.length >= 5}
                            >
                                + Добавить фильтр
                            </button>
                        </div>

                        {/* Step 6: Exit */}
                        <div className="p-4 border rounded-lg space-y-4">
                            <h4 className="font-bold text-lg">Выход из сделки</h4>
                            <div className="flex items-end gap-4">
                                <DropdownControl label="Профит" options={['0.2%', '0.5%', '1%', '5%', '10%', '15%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%']} />
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Валюта профита</p>
                                    <p className="p-3 border-b-2">$ USD</p>
                                </div>
                            </div>
                            <ToggleSwitch label="Стоп-лосс" isOn={isStopLossEnabled} onToggle={() => setIsStopLossEnabled(!isStopLossEnabled)} />
                            {isStopLossEnabled && (
                                <div className="pl-4 pt-2 border-l-2 ml-2">
                                    <DropdownControl label="Процент стоп-лосса" options={['-0.1%', '-0.2%', '-0.5%', '-1%', '-2%', '-5%', '-10%']} />
                                </div>
                            )}
                            <ToggleSwitch label="Остановить бота после исполнения стоп-лосса" isOn={false} onToggle={() => {}}/>
                        </div>

                        {/* Final Button */}
                        <div className="relative group mt-6">
                            <button className="w-full bg-main hover:bg-main-dark text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                <ICONS.plus className="w-6 h-6" />
                                <span>Создать бота</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBotPage;
