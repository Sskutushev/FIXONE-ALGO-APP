import React from 'react';

const PartnersCarousel = () => {
    const partnerLogos = [
        'amts.svg', 'b2broker.svg', 'binance.svg', 'bybit.svg', 'dexnet.svg', 
        'kraken.svg', 'metaquotes.svg', 'profixone.svg', 'stmt.svg'
    ];

    return (
        <div 
            className="relative w-full overflow-hidden"
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
            }}
        >
            <div className="flex animate-scroll">
                {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                    <div key={index} className="flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/4 p-4 sm:p-8">
                        <img src={`${process.env.PUBLIC_URL}/${logo}`} alt={`partner logo ${index + 1}`} className="h-10 sm:h-12 mx-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartnersCarousel;
