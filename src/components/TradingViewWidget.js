import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({ symbol }) {
    const containerRef = useRef();

    useEffect(() => {
        // If no symbol is selected, do nothing.
        if (!symbol) {
            if(containerRef.current) containerRef.current.innerHTML = '';
            return;
        }

        // Clear the container on every symbol change to ensure a fresh start.
        if(containerRef.current) containerRef.current.innerHTML = '';

        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        script.onload = () => {
            if (window.TradingView) {
                new window.TradingView.widget({
                    autosize: true,
                    symbol: symbol,
                    interval: "D",
                    timezone: "Etc/UTC",
                    theme: "light",
                    style: "1",
                    locale: "ru",
                    toolbar_bg: "#f1f3f6",
                    enable_publishing: false,
                    allow_symbol_change: false,
                    container_id: containerRef.current.id,
                });
            }
        };

        // Append the script to the container itself to keep it self-contained.
        containerRef.current.appendChild(script);

        // No cleanup function to avoid race conditions and errors on unmount.
        // React will remove the container div, and the script tag with it.

    }, [symbol]); // Re-run the entire effect when the symbol changes.

    // Give the container a unique ID to avoid conflicts if multiple widgets exist.
    const widgetId = `tradingview_widget_${symbol || 'default'}`;

    return (
        <div ref={containerRef} id={widgetId} className="h-full" />
    );
}

export default memo(TradingViewWidget);