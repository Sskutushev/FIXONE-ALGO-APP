import React from 'react';
import Animated from '../Animated';

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
            <Animated>
                <div className="relative md:mb-[-150px] px-8">
                    <img src={`${process.env.PUBLIC_URL}/roadmap.svg`} alt="Roadmap" className="w-full h-auto hidden md:block filter brightness-150" />
                </div>
            </Animated>
            <div className="relative md:mt-[100px]">
                <div className="relative grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-x-8">
                    {steps.map((item, index) => (
                        <Animated key={item.step} delay={index * 200}>
                            <div className={`flex flex-col items-center h-full md:${index === 0 ? 'mt-[-80px]' : index === 1 ? 'mt-[-130px]' : index === 2 ? 'mt-[-150px]' : index === 3 ? 'mt-[-100px]' : ''}`}>
                                <div className={`relative p-6 rounded-[30px] w-full ${item.step === 4 ? 'bg-[#FF7255]' : 'bg-white'}`}>
                                    <img src={`${process.env.PUBLIC_URL}/${item.step === 4 ? 'flag_green.svg' : 'flag.svg'}`} alt="Flag" className="absolute -top-10 left-4 h-24 w-24" />
                                    <div className="absolute top-4 right-4 bg-black text-white text-sm font-bold px-3 py-1 rounded-full">
                                        Шаг {item.step}
                                    </div>
                                    <h3 className="font-bold text-xl mt-8 text-left">{item.title}</h3>
                                </div>
                                <div className="mt-4 p-4 bg-gray-700 text-white rounded-[30px] w-full text-left flex-grow">
                                    <p className="text-sm sm:text-base">{item.explanation}</p>
                                </div>
                            </div>
                        </Animated>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorksSection;
