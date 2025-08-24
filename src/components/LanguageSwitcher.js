import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { RussianFlag, BritishFlag, GermanFlag, SpanishFlag, FrenchFlag, ChineseFlag } from './ui/Flags';

const Flag = ({ code }) => {
    switch (code) {
        case 'ru': return <RussianFlag />;
        case 'en': return <BritishFlag />;
        case 'de': return <GermanFlag />;
        case 'es': return <SpanishFlag />;
        case 'fr': return <FrenchFlag />;
        case 'zh': return <ChineseFlag />;
        default: return null;
    }
};

const languages = [
    { code: 'ru', name: 'Русский', flag: 'ru' },
    { code: 'en', name: 'English', flag: 'gb' },
    { code: 'de', name: 'Deutsch', flag: 'de' },
    { code: 'es', name: 'Español', flag: 'es' },
    { code: 'fr', name: 'Français', flag: 'fr' },
    { code: 'zh', name: '中文', flag: 'cn' },
];

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setIsOpen(!isOpen)} className="relative w-12 h-12 border border-gray-200 rounded-full overflow-hidden hover:opacity-90 transition-opacity">
                <Flag code={currentLanguage.code} className="w-full h-full" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
                    <ul>
                        {languages.map(lang => (
                            <li key={lang.code}>
                                <button 
                                    onClick={() => changeLanguage(lang.code)} 
                                    className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                >
                                    <div className="w-6 h-4 overflow-hidden">
                                        <Flag code={lang.code} className="w-full h-full object-cover" />
                                    </div>
                                    <span>{lang.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
