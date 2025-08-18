
import React, { useState } from 'react';

const faqData = [
  {
    question: 'Какие варианты безопасности предлагает наша биржа?',
    answer: 'Безопасность ваших средств — наш главный приоритет. Мы обеспечиваем двухфакторную аутентификацию (2FA), шифрование данных и безопасное хранение в холодных кошельках.',
  },
  {
    question: 'Какие цифровые валюты доступны для торговли на нашей бирже?',
    answer: 'Мы предлагаем широкий спектр популярных криптовалют для торговли, включая Bitcoin (BTC), Ethereum (ETH) и многие другие.',
  },
  {
    question: 'Какая информация необходима для проверки аккаунта?',
    answer: 'Процесс верификации обычно включает предоставление личной информации, фотографий документов и подтверждение адреса. Это помогает нам поддерживать стандарты безопасности и соблюдать нормативные требования.',
  },
  {
    question: 'Как выбрать подходящего алго-бота под мой стиль и риск-профиль?',
    answer: 'Ориентируйтесь на горизонт и волатильность: “Долгосрочный” — для спокойных портфелей, “Среднесрочный” — для трендовых движений на сырьевых/FX, “Внутридневной” — если вы у монитора днём, “Скальперский” — для максимальной ликвидности и частых сделок. В любом случае начните с демо/бэктеста и постепенно масштабируйте объём.',
  },
  {
    question: 'Можно ли протестировать стратегию и собственного бота перед запуском на реале?',
    answer: 'Да. В конструкторе доступен бэктест на истории, форвард-тест и демо-среда. После проверки логики запускайте на своём счёте прямо из платформы и отслеживайте метрики исполнения.',
  },
];

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-semibold"
        onClick={onClick}
      >
        <span>{question}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-3xl mx-auto">
        {faqData.map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
