import React from 'react';
import { Link } from 'react-router-dom';

// Re-defining a simple Button component for this page, as the main one might be in the file we are about to change.
const Button = ({ children, variant = 'big-classic', className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full";
  const variantStyles = {
    'big-classic': 'px-8 py-3 bg-main text-white hover:bg-main-light active:bg-main-dark',
    'big-outline': 'px-8 py-3 bg-transparent border-2 border-main text-main hover:bg-main hover:text-white',
  };
  const effectiveClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;
  return <button className={effectiveClassName} {...props}>{children}</button>;
};

const AuthPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-open-sans p-4">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md">
                <Link to="/" className="flex items-center gap-4 mb-8 justify-center">
                    <img src={`${process.env.PUBLIC_URL}/Frame 7462.svg`} alt="FIXONE ALGO Logo" className="h-10 w-10 sm:h-12 sm:w-12"/>
                    <span className="font-tt-travels text-2xl sm:text-3xl font-bold">FIXONE ALGO</span>
                </Link>
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Вход или Регистрация</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Ваш Email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Пароль
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4">
                        <Button variant="big-classic">Войти</Button>
                        <Button variant="big-outline">Зарегистрироваться</Button>
                    </div>
                     <div className="text-center mt-6">
                        <Link to="/" className="inline-block align-baseline font-bold text-sm text-main hover:text-main-dark">
                            &larr; Вернуться на главную
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;
