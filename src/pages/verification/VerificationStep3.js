import React from 'react';

const SuccessIcon = () => <svg className="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;

const VerificationStep3 = ({ onFinish }) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="my-8">
                <SuccessIcon />
            </div>

            <h2 className="text-2xl font-bold mb-2">Данные отправлены</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">Ваши документы и биометрические данные были успешно отправлены на проверку. Обычно это занимает несколько минут. Мы сообщим вам о результате.</p>

            <button 
                onClick={onFinish} 
                className="w-full max-w-xs mx-auto bg-main text-white font-bold py-3 rounded-lg hover:bg-main-dark transition-colors"
            >
                Вернуться на главную
            </button>
        </div>
    );
};

export default VerificationStep3;
