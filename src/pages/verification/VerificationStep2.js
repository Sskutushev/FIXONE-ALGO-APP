import React from 'react';

const QrCodeIcon = () => <svg className="w-48 h-48 mx-auto text-gray-800" viewBox="0 0 256 256"><path fill="currentColor" d="M140 140h28v28h-28v-28Zm-28-28v28H84v-28h28Zm0 28h28v28h-28v-28Zm-28 28H84v28H56v-28Zm28 0v28H84v-28h28Zm56-56h28v28h-28v-28Zm56-56v144H40V40h144m8-8H32v160h160V32Z"/><path fill="currentColor" d="M68 68h40v40H68V68Zm88 0h40v40h-40V68ZM68 156h40v40H68v-40Z"/></svg>;

const VerificationStep2 = ({ onNext }) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">3D Сканирование лица</h2>
            <p className="text-gray-600 mb-6">Шаг 2: Подтвердите, что вы реальный человек</p>

            <div className="my-8">
                <p className="mb-4">Отсканируйте QR-код с помощью камеры вашего телефона, чтобы безопасно завершить сканирование на мобильном устройстве.</p>
                <QrCodeIcon />
            </div>

            <div className="space-y-4">
                 <button 
                    onClick={onNext} 
                    className="w-full bg-main text-white font-bold py-3 rounded-lg hover:bg-main-dark transition-colors"
                >
                    QR-код отсканирован, продолжить
                </button>
                <button className="w-full text-main font-semibold">
                    Продолжить на этом устройстве
                </button>
            </div>
        </div>
    );
};

export default VerificationStep2;
