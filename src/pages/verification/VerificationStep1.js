import React, { useState } from 'react';

const DocumentIcon = () => <svg className="w-16 h-16 mx-auto text-gray-300" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

const VerificationStep1 = ({ onNext }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Верификация личности</h2>
            <p className="text-gray-600 mb-6">Шаг 1: Загрузите документ</p>

            <div className="space-y-4 text-left">
                <div>
                    <label className="font-medium">Страна</label>
                    <select className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-main">
                        <option>Российская Федерация</option>
                        <option>Украина</option>
                        <option>Республика Беларусь</option>
                        <option>Казахстан</option>
                    </select>
                </div>
                <div>
                    <label className="font-medium">Тип документа</label>
                    <select className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-main">
                        <option>Паспорт</option>
                        <option>Водительское удостоверение</option>
                        <option>ID-карта</option>
                        <option>Вид на жительство</option>
                        <option>Счет за коммунальные услуги</option>
                    </select>
                </div>
                <div>
                    <label className="font-medium">Загрузка файла</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <DocumentIcon />
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-main hover:text-main-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-main">
                                    <span>{file ? 'Файл выбран' : 'Выберите файл для загрузки'}</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                </label>
                                <p className="pl-1">или перетащите его сюда</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, PDF до 10MB</p>
                            {file && <p className="text-sm text-green-600 font-semibold mt-2">{file.name}</p>}
                        </div>
                    </div>
                </div>
            </div>

            <button 
                onClick={onNext} 
                disabled={!file}
                className="w-full mt-8 bg-main text-white font-bold py-3 rounded-lg hover:bg-main-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Продолжить
            </button>
        </div>
    );
};

export default VerificationStep1;
