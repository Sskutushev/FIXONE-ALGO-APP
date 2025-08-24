import React, { useState } from 'react';

// Placeholder Icons
const BotIcon = () => <span role="img" aria-label="bot">🤖</span>;
const CopyIcon = () => <span role="img" aria-label="copy">👥</span>;
const PammIcon = () => <span role="img" aria-label="pamm">💼</span>;
const MammIcon = () => <span role="img" aria-label="mamm">🏦</span>;

const tabs = [
    { id: 'algobots', title: 'Алго-боты', icon: <BotIcon /> },
    { id: 'copytrading', title: 'Копитрейдинг', icon: <CopyIcon /> },
    { id: 'pamm', title: 'ПАММ', icon: <PammIcon /> },
    { id: 'mamm', title: 'МАММ', icon: <MammIcon /> },
];

const TabContent = ({ title, children }) => (
    <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {children}
        </div>
    </div>
);

const PlaceholderCard = ({ title }) => (
    <div className="bg-gray-50 border rounded-xl p-4 h-48 flex flex-col justify-between">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-500">Карточка продукта в разработке.</p>
        <button className="mt-4 w-full bg-main-dark text-white py-2 rounded-lg hover:bg-main transition-colors">Подробнее</button>
    </div>
);

const MarketplacePage = () => {
    const [activeTab, setActiveTab] = useState('algobots');

    const renderContent = () => {
        switch (activeTab) {
            case 'algobots':
                return <TabContent title="Витрина Алго-ботов">
                    <PlaceholderCard title="Бот #1" />
                    <PlaceholderCard title="Бот #2" />
                    <PlaceholderCard title="Бот #3" />
                    <PlaceholderCard title="Бот #4" />
                </TabContent>;
            case 'copytrading':
                return <TabContent title="Витрина трейдеров для Копитрейдинга">
                    <PlaceholderCard title="Трейдер #1" />
                    <PlaceholderCard title="Трейдер #2" />
                </TabContent>;
            case 'pamm':
                return <TabContent title="ПАММ-счета">
                    <PlaceholderCard title="ПАММ #1" />
                </TabContent>;
            case 'mamm':
                return <TabContent title="МАММ-счета">
                     <PlaceholderCard title="MAММ #1" />
                     <PlaceholderCard title="MAММ #2" />
                     <PlaceholderCard title="MAММ #3" />
                </TabContent>;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-[60px] p-6 sm:p-8 md:p-10 shadow-lg min-h-[calc(100vh-10rem)]">
            <div>
                <div className="flex items-center border-b border-gray-200">
                    {tabs.map(tab => (
                        <button 
                            key={tab.id} 
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-4 py-3 text-base font-semibold transition-colors border-b-4 ` +
                                (activeTab === tab.id 
                                    ? 'border-main text-main' 
                                    : 'border-transparent text-gray-500 hover:text-black')
                            }
                        >
                            {tab.icon}
                            <span>{tab.title}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default MarketplacePage;