import React from 'react';

const PageContent = ({ title, children }) => (
    <div className="bg-white rounded-[60px] p-6 sm:p-8 md:p-10 shadow-lg min-h-[calc(100vh-10rem)]">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{title}</h1>
        <div>{children}</div>
    </div>
);

const FavoritesPage = () => {
  return (
    <PageContent title="Избранное">
      <p>Здесь будут избранные боты, стратегии и т.д.</p>
    </PageContent>
  );
};

export default FavoritesPage;
