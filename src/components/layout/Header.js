import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Placeholder icons - will replace with actual SVGs
const SearchIcon = () => <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>;
const BellIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>;
const PlusIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>;

// Placeholder icons for dropdowns
const SettingsIcon = () => <span role="img" aria-label="settings">⚙️</span>;
const WalletIcon = () => <span role="img" aria-label="wallet">💼</span>;
const AffiliateIcon = () => <span role="img" aria-label="affiliate">🤝</span>;
const LanguageIcon = () => <span role="img" aria-label="language">🌐</span>;
const LogoutIcon = () => <span role="img" aria-label="logout">🚪</span>;

const useDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return { ref, isOpen, setIsOpen };
};


const Header = () => {
    const userDropdown = useDropdown();
    const notificationsDropdown = useDropdown();

    const mockNotifications = [
        { id: 1, text: "Ваш бот 'Super Scalper' совершил 5 сделок.", time: "5 минут назад" },
        { id: 2, text: "Верификация успешно пройдена!", time: "1 час назад" },
        { id: 3, text: "Новый пост в ленте от 'CryptoAnalyst'.", time: "3 часа назад" },
        { id: 4, text: "Обновление системы безопасности.", time: "вчера" },
        { id: 5, text: "Ваш бот 'Super Scalper' совершил 5 сделок.", time: "5 минут назад" },
        { id: 6, text: "Верификация успешно пройдена!", time: "1 час назад" },
        { id: 7, text: "Новый пост в ленте от 'CryptoAnalyst'.", time: "3 часа назад" },
        { id: 8, text: "Обновление системы безопасности.", time: "вчера" },
    ];

  return (
    <header className="bg-white shadow-md h-20 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 md:px-8 z-40">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link to="/dashboard" className="flex items-center gap-2 sm:gap-4">
          <img src={`${process.env.PUBLIC_URL}/Frame 7462.svg`} alt="FIXONE ALGO Logo" className="h-10 w-10"/>
          <span className="hidden md:block font-tt-travels text-2xl font-bold text-black">FIXONE</span>
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-xl mx-4 sm:mx-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Поиск..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-main"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Create Bot Button */}
        <Link to="/dashboard/create-bot" className="hidden sm:flex">
            <button className="flex items-center gap-2 bg-main hover:bg-main-dark text-white font-bold py-3 px-5 rounded-full transition-colors">
                <PlusIcon />
                <span className="hidden lg:block">Создать бота</span>
            </button>
        </Link>

        {/* Notifications */}
        <div className="relative" ref={notificationsDropdown.ref}>
            <button onClick={() => notificationsDropdown.setIsOpen(!notificationsDropdown.isOpen)} className="relative text-gray-600 hover:text-black">
              <BellIcon />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            {notificationsDropdown.isOpen && (
                <div className="absolute right-0 mt-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden border">
                    <div className="p-4">
                        <h4 className="font-bold text-lg">Уведомления</h4>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                        {mockNotifications.map(n => (
                            <div key={n.id} className="px-4 py-3 border-b hover:bg-gray-50">
                                <p className="text-sm text-gray-800">{n.text}</p>
                                <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                            </div>
                        ))}
                    </div>
                    <div className="p-2 bg-gray-50 border-t">
                        <button className="w-full text-center text-sm font-semibold text-main hover:underline">
                            Смотреть все уведомления
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* User Avatar Dropdown */}
        <div className="relative" ref={userDropdown.ref}>
          <button onClick={() => userDropdown.setIsOpen(!userDropdown.isOpen)} className="flex items-center gap-3">
            <img
              src={`${process.env.PUBLIC_URL}/images (1).jpg`} // Placeholder avatar
              alt="User Avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-main"
            />
            <div className="hidden xl:flex flex-col items-start">
                <span className="font-semibold text-sm text-black">Ибрагим И.</span>
            </div>
          </button>
          {userDropdown.isOpen && (
            <div className="absolute right-0 mt-4 w-64 bg-white rounded-lg shadow-xl overflow-hidden border">
                <div className="p-4 border-b">
                    <h5 className="font-bold">Ибрагим Иосифович</h5>
                    <p className="text-sm text-gray-500">Баланс: $1737.61</p>
                </div>
                <nav className="p-2">
                    <Link to="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"><SettingsIcon /> Настройка аккаунта</Link>
                    <Link to="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"><WalletIcon /> Кошелек</Link>
                    <Link to="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"><AffiliateIcon /> Партнерская программа</Link>
                    <Link to="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"><LanguageIcon /> Выбор языка</Link>
                </nav>
                <div className="p-2 border-t">
                    <Link to="/" className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"><LogoutIcon /> Выйти из аккаунта</Link>
                </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
