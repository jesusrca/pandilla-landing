'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const menuData = {
    leftColumn: [
        {
            title: 'Roast Beef',
            description: 'ROAST BEEF HECHO EN CASA, ARÚGULA, PICKLES Y DIJONESA EN PAN CIABATTA RÚSTICO',
            image: '/content/roast-beef.jpg',
        },
        {
            title: 'Rubén',
            description: 'JAMÓN DE PAVO HECHO EN CASA, QUESO EMMENTAL, CHUCRUT Y SALSA MIL ISLAS EN PAN CAMPESINO',
            image: '/content/ruben.jpg',
        },
        {
            title: 'Panchito Villa',
            description: 'POLLO DESHILACHADO MEZCLADO CON MAYONESA CASERA, QUESO EDAM, TOCINO Y PALTA EN CIABATTA RÚSTICO',
            image: '/content/panchito-villa.jpg',
        },
        {
            title: 'Tricolore',
            description: 'MORTADELLA CON PISTACHO, STRACCIATELLA, PESTO, ARÚGULA EN PAN CIABATTA',
            image: '/content/tricolore.jpg',
        },
    ],
    rightColumn: [
        {
            title: 'Rey Misterio',
            description: 'JAMÓN HECHO EN CASA, QUESO GOUDA Y BECHAMEL EN PAN CAMPESINO',
            image: '/content/rey-misterio.jpg',
        },
        {
            title: 'Buti de Lima',
            description: 'JAMÓN DEL PAÍS HECHO EN CASA, LECHUGA, SARZA CRIOLLA, MAYONESA CASERA EN PAN FRANCÉS',
            image: '/content/buti-de-lima.jpg',
        },
        {
            title: 'Italian Deli',
            description: 'JAMÓN HECHO EN CASA, SALAME MILANO, PROSCIUTTO TIPO PARMA, PROVOLONE, LECHUGA, CEBOLLA, TOMATE Y MAYONESA EN PAN CIABATTA RÚSTICO',
            image: '/content/italian-deli.jpg',
        },
    ],
};

const drinks = [
    { name: 'COQUITA DE VIDRIO', pair: 'STELLA' },
    { name: 'INKA DE VIDRIO', pair: 'AGUA DE VIDRIO' },
    { name: 'PILSEN', pair: 'CAFÉ AMERICANO' },
    { name: 'CHIPS TIYAPUY', pair: 'COOKIE REPUBLIC', isSnack: true },
];

export default function MenuSection() {
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleMouseEnter = (image: string) => {
        setHoveredImage(image);
    };

    const handleMouseLeave = () => {
        setHoveredImage(null);
    };

    const MenuItem = ({ item }: { item: any }) => (
        <div
            className="group relative py-3 md:py-4 border-b border-brand-brown/40 cursor-pointer flex items-baseline gap-4 md:gap-8 transition-all duration-300"
            onMouseEnter={() => handleMouseEnter(item.image)}
            onMouseLeave={handleMouseLeave}
        >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-brown whitespace-nowrap leading-none transition-none">
                {item.title}
            </h2>
            <p className="font-mono text-[9px] md:text-[10px] text-brand-brown/80 uppercase tracking-widest hidden lg:block leading-tight">
                {item.description}
            </p>
        </div>
    );

    return (
        <section className="section bg-[#F9E0A4] relative overflow-hidden h-screen w-screen flex items-center justify-center px-6 md:px-12">
            <div className="w-full h-full max-w-[1500px] flex flex-col relative py-12 md:py-20">

                {/* Header - Top Right */}
                <div className="flex justify-end items-center gap-6 mb-12 md:mb-16">
                    <div className="flex-1 h-[2px] bg-brand-brown/40 max-w-[60vw]" />
                    <h1 className="font-display italic text-5xl md:text-7xl lg:text-8xl text-brand-brown whitespace-nowrap">
                        Sanguchitos
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-2 flex-1 items-start">
                    {/* Left Column */}
                    <div className="flex flex-col">
                        {menuData.leftColumn.map((item, i) => (
                            <MenuItem key={i} item={item} />
                        ))}
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col">
                        {menuData.rightColumn.map((item, i) => (
                            <MenuItem key={i} item={item} />
                        ))}

                        {/* Drinks Section */}
                        <div className="mt-8 md:mt-12 bg-white/40 p-6 md:p-8 border border-brand-brown/10 relative z-20">
                            <h3 className="font-mono text-[10px] md:text-xs text-brand-brown mb-6 md:mb-8 tracking-[0.3em] text-right font-bold uppercase">
                                BEBIDAS & SNACKS
                            </h3>
                            <div className="grid grid-cols-1 gap-3 md:gap-4 font-mono text-[9px] md:text-[11px] text-brand-brown">
                                {drinks.slice(0, 3).map((drink, i) => (
                                    <div key={i} className="flex justify-between items-center relative gap-2">
                                        <span className="bg-transparent z-10 pr-2 whitespace-nowrap">{drink.name}</span>
                                        <div className="flex-1 border-b border-dotted border-brand-brown/40 h-[8px]" />
                                        <span className="bg-transparent z-10 pl-2 whitespace-nowrap">{drink.pair}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between mt-6 md:mt-8 font-bold">
                                    <span className="uppercase tracking-widest">CHIPS TIYAPUY</span>
                                    <span className="uppercase tracking-widest">COOKIE REPUBLIC</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Image Preview */}
            {hoveredImage && (
                <div
                    className="fixed pointer-events-none z-[1000] transition-opacity duration-300 opacity-100"
                    style={{
                        left: mousePos.x + 20,
                        top: mousePos.y - 120,
                    }}
                >
                    <div className="animate-float">
                        <img
                            src={hoveredImage}
                            alt="Plato"
                            className="w-56 md:w-80 h-auto rounded-xl shadow-2xl border-4 md:border-8 border-white -rotate-2"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
