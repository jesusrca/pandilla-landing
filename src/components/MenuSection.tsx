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

    const handleMouseEnter = (image: string) => {
        setHoveredImage(image);
    };

    const handleMouseLeave = () => {
        setHoveredImage(null);
    };

    return (
        <section className="section bg-[#F9E0A4] relative overflow-hidden h-screen w-screen flex items-center justify-center p-4 md:p-8">
            <div className="w-full h-full max-w-[1400px] flex flex-col relative">

                {/* Header - Top Right */}
                <div className="absolute top-8 right-0 md:right-8 flex items-center gap-4 z-10">
                    <div className="w-[30vw] h-[2px] bg-brand-brown/40 absolute right-full mr-4" />
                    <h1 className="font-display italic text-5xl md:text-7xl text-brand-brown whitespace-nowrap">
                        Sanguchitos
                    </h1>
                </div>

                <div className="w-full flex-1 mt-24 md:mt-32 grid grid-cols-12 gap-8 relative h-[calc(100vh-200px)]">

                    {/* Left Column - Menu Items */}
                    <div className="col-span-12 md:col-span-4 flex flex-col justify-start">
                        {menuData.leftColumn.map((item, i) => (
                            <div
                                key={i}
                                className="group relative py-6 md:py-8 border-b border-brand-brown/40 cursor-pointer flex flex-col transition-all duration-300"
                                onMouseEnter={() => handleMouseEnter(item.image)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <h2 className="font-display text-4xl md:text-6xl text-brand-brown group-hover:text-orange transition-colors">
                                    {item.title}
                                </h2>
                                {item.title === "Tricolore" && (
                                    <p className="font-mono text-[9px] md:text-[11px] text-brand-brown/80 mt-2 uppercase tracking-widest max-w-[280px]">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        ))}

                        {/* Space for characters (handled in ScrollContainer) */}
                        <div className="mt-auto h-32 w-48" />
                    </div>

                    {/* Middle Column - Large Image */}
                    <div className="col-span-12 md:col-span-4 h-full relative flex items-center justify-center">
                        <div className="w-full h-full max-h-[700px] relative rounded-lg overflow-hidden border-8 border-[#f3e1b9] shadow-2xl">
                            <Image
                                src={hoveredImage || "/content/roast-beef.jpg"}
                                alt="Menu Preview"
                                fill
                                className="object-cover transition-all duration-700 ease-in-out"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Column - Menu Items & Drinks */}
                    <div className="col-span-12 md:col-span-4 flex flex-col h-full">
                        {menuData.rightColumn.map((item, i) => (
                            <div
                                key={i}
                                className="group py-6 md:py-8 border-b border-brand-brown/40 cursor-pointer flex flex-col transition-all duration-300 text-right md:text-left"
                                onMouseEnter={() => handleMouseEnter(item.image)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <h2 className="font-display text-4xl md:text-6xl text-brand-brown group-hover:text-orange transition-colors">
                                    {item.title}
                                </h2>
                                <p className="font-mono text-[9px] md:text-[11px] text-brand-brown/80 mt-2 uppercase tracking-widest md:max-w-[280px]">
                                    {item.description}
                                </p>
                            </div>
                        ))}

                        {/* Drinks Section */}
                        <div className="mt-auto bg-[#F7F1E8] p-8 md:p-12 shadow-sm relative mr-[-32px] md:mr-0 z-20">
                            <h3 className="font-mono text-xs text-brand-brown/60 mb-8 tracking-[0.3em] text-right">
                                BEBIDAS & SNACKS
                            </h3>
                            <div className="grid grid-cols-1 gap-4 font-mono text-[10px] md:text-[12px] text-brand-brown">
                                {drinks.slice(0, 3).map((drink, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center relative gap-4">
                                            <span className="bg-[#F7F1E8] z-10 pr-2">{drink.name}</span>
                                            <div className="flex-1 border-b border-dotted border-brand-brown/30 h-1 mb-1" />
                                            {drink.pair && <span className="bg-[#F7F1E8] z-10 pl-2">{drink.pair}</span>}
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-between mt-8">
                                    <span className="text-orange font-bold uppercase tracking-widest">CHIPS TIYAPUY</span>
                                    <span className="text-orange font-bold uppercase tracking-widest">COOKIE REPUBLIC</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
