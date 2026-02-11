'use client';

import React, { useEffect, useRef, useState } from 'react';

export function HeroSection() {
    const [bearOffsetX, setBearOffsetX] = useState(0);
    const [bearOffsetY, setBearOffsetY] = useState(0);
    const [bearRotation, setBearRotation] = useState(0);

    useEffect(() => {
        const interval = window.setInterval(() => {
            const shouldMove = Math.random() < 0.35;
            if (!shouldMove) {
                setBearOffsetX(0);
                setBearOffsetY(0);
                setBearRotation(0);
                return;
            }
            const offsetX = Math.floor(Math.random() * 5) - 2; // -2..2 px
            const offsetY = Math.floor(Math.random() * 5) - 2; // -2..2 px
            const rotation = (Math.random() * 4) - 2; // -2..2 deg
            setBearOffsetX(offsetX);
            setBearOffsetY(offsetY);
            setBearRotation(rotation);
        }, 2200);
        return () => window.clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#F9E0A4] relative p-8">
            <div className="flex flex-col items-center animate-fadeInUp">
                <img src="/Brand/logo-pandilla.svg" alt="Pandilla Logo" className="w-[85vw] max-w-[850px] h-auto mb-8" />

                <h2 className="font-display italic text-3xl md:text-5xl text-brand-brown mb-12">
                    Taller de Sanguchitos
                </h2>

                <div className="relative w-[32vw] max-w-[215px] min-w-[140px]">
                    <img src="/content/est-age.svg" alt="EST 2024" className="w-full h-auto" />
                    <img
                        src="/oso.svg"
                        alt="Oso Pandilla"
                        className="absolute left-[50%] top-[50%] w-[18%] h-auto transition-transform duration-900 ease-out will-change-transform"
                        style={{ transform: `translate(-50%, -50%) translate(${bearOffsetX}px, ${bearOffsetY}px) rotate(${bearRotation}deg)` }}
                    />
                </div>
            </div>

            {/* Footer Info */}
            <div className="absolute bottom-12 left-0 w-full px-12 flex flex-col md:flex-row justify-between items-center font-mono text-xl text-brand-brown gap-4">
                <div className="text-center md:text-left">
                    ELÍAS AGUIRRE 277, MIRAFLORES
                </div>
                <div className="text-center md:text-center">
                    LUN-DOM DE 9:30AM A 9:30PM
                </div>
                <div className="text-center md:text-right">
                    INSTAGRAM: @PANDILLA.PE
                </div>
            </div>
        </div>
    );
}

export function CharacterSection({ isActive = false }: { isActive?: boolean }) {
    return (
        <div className="w-full h-full relative overflow-hidden bg-[#f9e0a4]">
            <img
                src="/content/fondo-slide2.svg"
                alt="Fondo Slide 2"
                className={`absolute inset-0 w-full h-full object-cover pointer-events-none scale-[1.08] -translate-y-[6%] origin-top transition-opacity duration-700 ease-out ${isActive ? 'opacity-100' : 'opacity-0'
                    }`}
            />
        </div>
    );
}

export function PowerSection() {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const lastWheelAtRef = useRef(0);
    const powerCarouselImages = [
        '/content/slide-carrusel.jpg',
        '/content/slide-carrusel2.jpg',
        '/content/slide-carrusel3.jpg',
        '/content/slide-carrusel4.jpg',
        '/content/slide-carrusel5.jpg',
    ];

    const stepCarousel = (direction: 1 | -1) => {
        setCarouselIndex((prev) => {
            const next = prev + direction;
            if (next < 0) return 0;
            if (next >= powerCarouselImages.length) return powerCarouselImages.length - 1;
            return next;
        });
    };

    const handleCarouselWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const now = Date.now();
        if (now - lastWheelAtRef.current < 320) return;
        lastWheelAtRef.current = now;

        if (e.deltaY > 0) {
            if (carouselIndex >= powerCarouselImages.length - 1) return;
            e.preventDefault();
            e.stopPropagation();
            stepCarousel(1);
        } else if (e.deltaY < 0) {
            if (carouselIndex <= 0) return;
            e.preventDefault();
            e.stopPropagation();
            stepCarousel(-1);
        }
    };

    return (
        <div className="w-full h-full bg-[#F9E0A4]">
            <div className="h-full w-full grid grid-cols-1 md:grid-cols-2">
                <div className="h-full w-full">
                    <img
                        src="/content/Group 1.png"
                        alt="The Power of Pandilla"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="hidden md:block h-full w-full overflow-hidden" onWheel={handleCarouselWheel}>
                    <div
                        className="flex flex-col h-full w-full transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateY(-${carouselIndex * 100}%)` }}
                    >
                        {powerCarouselImages.map((image) => (
                            <img
                                key={image}
                                src={image}
                                alt="Pandilla slide"
                                className="block h-full w-full object-cover"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function TeamSection() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-[#F9E0A4] p-8">
            <div className="relative w-[90vw] max-w-[900px] rounded-[20px] overflow-hidden shadow-2xl group animate-slideInLeft">
                <img src="/content/1 6.jpg" alt="Equipo Pandilla" className="w-full h-auto transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brown/90 to-transparent p-16 translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-white">
                    <h2 className="font-display text-4xl md:text-5xl mb-2">Nuestro Equipo</h2>
                    <p className="text-xl md:text-2xl text-cream font-mono">Trabajando con pasión cada día</p>
                </div>
            </div>
        </div>
    );
}

export function DeliciousSection() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-[#F9E0A4] text-center p-8">
            <div className="flex flex-col gap-4">
                <h1 className="font-display text-[clamp(3rem,8vw,6rem)] text-brown font-bold tracking-tight shadow-sm animate-slideInDown">Los Deliciosos</h1>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-orange font-bold tracking-tight animate-[slideInUp_1s_ease-out_0.2s_forwards] opacity-0">Sanguchitos</h2>
                <h3 className="font-mono text-[clamp(1.5rem,3vw,2.5rem)] text-dark-brown font-medium opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">del Barrio</h3>
            </div>
        </div>
    );
}

export function FinalSection() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-[#F9E0A4] relative p-8">
            <div className="flex flex-col items-center gap-8 relative z-10 text-center">
                <img src="/Brand/logo-pandilla.svg" alt="Pandilla Logo" className="w-[70vw] max-w-[400px] h-auto drop-shadow-lg animate-float" />
                <div className="text-brand-brown">
                    <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold mb-4 drop-shadow-sm">Visítanos</h2>
                    <p className="text-[clamp(1.2rem,2.5vw,2rem)] text-brand-brown font-medium drop-shadow-sm font-mono">En tu barrio de siempre</p>
                </div>
            </div>
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img src="/content/Trama.svg" alt="Trama" className="w-full h-full object-cover" />
            </div>
        </div>
    );
}
