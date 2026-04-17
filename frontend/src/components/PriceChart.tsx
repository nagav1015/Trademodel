import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

interface PriceChartProps {
    data: any[];
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: '#161b22' },
                textColor: '#d1d5db',
            },
            grid: {
                vertLines: { color: '#232931' },
                horzLines: { color: '#232931' },
            },
            width: chartContainerRef.current.clientWidth,
            height: 500,
        });

        const candlestickSeries = chart.addCandlestickSeries({
            upColor: '#26a69a', downColor: '#ef5350', 
            borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350',
        });

        candlestickSeries.setData(data);
        chart.timeScale().fitContent();

        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data]);

    return <div ref={chartContainerRef} className="w-full h-full" />;
};

export default PriceChart;