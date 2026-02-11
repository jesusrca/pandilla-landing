'use client';

import React, { useRef, useState } from 'react';

export function HeroSection() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#F9E0A4] relative px-5 pt-12 pb-36 md:p-8">
            <div className="flex flex-col items-center animate-fadeInUp w-full -translate-y-4 md:translate-y-0">
                <img src="/Brand/logo-pandilla.svg" alt="Pandilla Logo" className="w-[92vw] max-w-[850px] h-auto mb-6 md:mb-8" />

                <h2 className="font-display italic text-[2.45rem] leading-[0.95] md:text-5xl text-brand-brown mb-8 md:mb-12 text-center">
                    Taller de Sanguchitos
                </h2>

                <img src="/Brand/age-pandilla.svg" alt="EST 2024" className="w-[42vw] max-w-[215px] min-w-[148px] h-auto" />
            </div>

            <div className="absolute bottom-[21%] left-1/2 -translate-x-1/2 md:hidden pointer-events-none">
                <img
                    src="/content/swipe.svg"
                    alt="Swipe hint"
                    className="w-[46px] h-auto animate-swipe-hint opacity-50"
                />
            </div>

            {/* Footer Info */}
            <div className="absolute bottom-7 md:bottom-12 left-0 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center font-mono text-[17px] md:text-[19px] leading-[1.12] text-brand-brown gap-2 md:gap-4">
                <div className="text-center md:text-left">
                    <a
                        href="https://www.google.com/maps/search/?api=1&query=Elias+Aguirre+277%2C+Miraflores%2C+Lima"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline hover:opacity-85 transition-opacity"
                    >
                        ELÍAS AGUIRRE 277, MIRAFLORES
                    </a>
                </div>
                <div className="text-center md:text-center">
                    LUN-DOM DE 9:30AM A 9:30PM
                </div>
                <div className="text-center md:text-right">
                    INSTAGRAM:{' '}
                    <a
                        href="https://instagram.com/pandilla.pe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                    >
                        @PANDILLA.PE
                    </a>
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
    const [mobileCarouselIndex, setMobileCarouselIndex] = useState(0);
    const lastWheelAtRef = useRef(0);
    const mobileTouchStartY = useRef(0);
    const mobileTouchCurrentY = useRef(0);
    const lastMobileSwipeAtRef = useRef(0);
    const powerHeroSlide = {
        desktopSrc: '/content/Group 1.png',
        mobileSrc: '/content/pandilla-sllide1-movil.jpg',
    };
    const powerCarouselSlides: Array<{ desktopSrc: string; mobileSrc?: string }> = [
        { desktopSrc: '/content/slide-carrusel.jpg' },
        { desktopSrc: '/content/slide-carrusel2.jpg' },
        { desktopSrc: '/content/slide-carrusel3.jpg' },
        { desktopSrc: '/content/slide-carrusel4.jpg' },
        { desktopSrc: '/content/slide-carrusel5.jpg' },
    ];
    const mobileCarouselSlides = [powerHeroSlide, ...powerCarouselSlides];

    const stepCarousel = (direction: 1 | -1) => {
        setCarouselIndex((prev) => {
            const next = prev + direction;
            if (next < 0) return 0;
            if (next >= powerCarouselSlides.length) return powerCarouselSlides.length - 1;
            return next;
        });
    };

    const handleCarouselWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const now = Date.now();
        if (now - lastWheelAtRef.current < 320) return;
        lastWheelAtRef.current = now;

        if (e.deltaY > 0) {
            if (carouselIndex >= powerCarouselSlides.length - 1) return;
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

    const stepMobileCarousel = (direction: 1 | -1) => {
        setMobileCarouselIndex((prev) => {
            const next = prev + direction;
            if (next < 0) return 0;
            if (next >= mobileCarouselSlides.length) return mobileCarouselSlides.length - 1;
            return next;
        });
    };

    const handleMobileTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        mobileTouchStartY.current = e.changedTouches[0].clientY;
        mobileTouchCurrentY.current = e.changedTouches[0].clientY;
    };

    const handleMobileTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        mobileTouchCurrentY.current = e.changedTouches[0].clientY;
        if (Math.abs(mobileTouchStartY.current - mobileTouchCurrentY.current) > 10) {
            e.preventDefault();
        }
    };

    const handleMobileTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        const now = Date.now();
        if (now - lastMobileSwipeAtRef.current < 320) return;
        const touchEndY = mobileTouchCurrentY.current || e.changedTouches[0].clientY;
        const diffY = mobileTouchStartY.current - touchEndY;
        if (Math.abs(diffY) < 34) return;
        lastMobileSwipeAtRef.current = now;

        if (diffY > 0) {
            stepMobileCarousel(1);
        } else {
            stepMobileCarousel(-1);
        }
    };

    return (
        <div className="w-full h-full bg-[#F9E0A4]">
            <div
                className="md:hidden h-full w-full overflow-hidden relative"
                onTouchStart={handleMobileTouchStart}
                onTouchMove={handleMobileTouchMove}
                onTouchEnd={handleMobileTouchEnd}
                style={{ touchAction: 'none' }}
                data-power-carousel-mobile="true"
                data-carousel-index-mobile={mobileCarouselIndex}
                data-carousel-last-index-mobile={mobileCarouselSlides.length - 1}
            >
                <div
                    className="flex flex-col h-full w-full transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateY(-${mobileCarouselIndex * 100}%)` }}
                >
                    {mobileCarouselSlides.map((slide) => (
                        <img
                            key={slide.desktopSrc}
                            src={slide.mobileSrc ?? slide.desktopSrc}
                            alt="Pandilla slide"
                            className="block flex-none h-full min-h-full w-full object-cover scale-[1.03]"
                        />
                    ))}
                </div>

                <div className="absolute bottom-[6.5%] left-1/2 -translate-x-1/2 pointer-events-none">
                    <img
                        src="/content/Swipe-up.svg"
                        alt="Swipe up hint"
                        className="w-[46px] h-auto animate-swipe-down-hint"
                    />
                </div>
            </div>

            <div className="hidden md:grid h-full w-full grid-cols-2">
                <div className="h-full w-full">
                    <img
                        src={powerHeroSlide.desktopSrc}
                        alt="The Power of Pandilla"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div
                    className="hidden md:block h-full w-full overflow-hidden"
                    onWheel={handleCarouselWheel}
                    data-power-carousel="true"
                    data-carousel-index={carouselIndex}
                    data-carousel-last-index={powerCarouselSlides.length - 1}
                >
                    <div
                        className="flex flex-col h-full w-full transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateY(-${carouselIndex * 100}%)` }}
                    >
                        {powerCarouselSlides.map((slide) => (
                            <img
                                key={slide.desktopSrc}
                                src={slide.desktopSrc}
                                alt="Pandilla slide"
                                className="block flex-none h-full min-h-full w-full object-cover scale-[1.03]"
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
        <div className="w-full h-full bg-[#F9E0A4] relative overflow-hidden">
            <div className="absolute inset-x-0 top-[8%] md:top-[9%]">
                <div className="relative h-[14.2vh] md:h-[16vh] border-b border-brand-brown/65">
                    <h1 className="absolute left-1/2 md:left-[18%] -translate-x-1/2 md:translate-x-0 bottom-[-8px] md:bottom-[-14px] font-display text-brand-brown leading-none whitespace-nowrap text-[clamp(3.35rem,12.6vw,9rem)] md:text-[clamp(4.8rem,9.4vw,9rem)]">
                        Los Deliciosos
                    </h1>
                    <img
                        src="/Brand/ave.svg"
                        alt="Ave Pandilla"
                        className="absolute right-[7%] md:right-[14%] bottom-[44%] md:bottom-[18%] w-[92px] md:w-[clamp(90px,12vw,195px)] h-auto animate-float-soft-1"
                    />
                </div>

                <div className="relative h-[14.2vh] md:h-[16vh] border-b border-brand-brown/65">
                    <h2 className="absolute left-1/2 md:left-[24%] -translate-x-1/2 md:translate-x-0 bottom-[-8px] md:bottom-[-14px] font-display text-brand-brown leading-none whitespace-nowrap text-[clamp(3.35rem,12.6vw,9rem)] md:text-[clamp(4.8rem,9.4vw,9rem)]">
                        Sanguchitos
                    </h2>
                    <img
                        src="/Brand/gato.svg"
                        alt="Gato Pandilla"
                        className="absolute right-[8%] md:right-[12%] bottom-[16%] md:bottom-[-3%] w-[108px] md:w-[clamp(92px,12vw,205px)] h-auto animate-float-soft-2"
                    />
                </div>

                <div className="relative h-[14.2vh] md:h-[16vh] border-b border-brand-brown/65">
                    <h3 className="absolute left-1/2 md:left-[46%] -translate-x-1/2 md:translate-x-0 bottom-[-8px] md:bottom-[-14px] font-display text-brand-brown leading-none whitespace-nowrap text-[clamp(3.35rem,12.6vw,9rem)] md:text-[clamp(4.8rem,9.4vw,9rem)]">
                        del Barrio
                    </h3>
                    <img
                        src="/Brand/oso.svg"
                        alt="Oso Pandilla"
                        className="absolute left-[8%] md:left-[20%] bottom-[-32%] md:bottom-[-45%] w-[116px] md:w-[clamp(100px,13vw,230px)] h-auto animate-float-soft-3"
                    />
                </div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 top-[63%] md:top-[64%]">
                <button
                    type="button"
                    className="font-mono text-[14px] md:text-x1 leading-none text-brand-brown px-10 md:px-7 py-3 md:py-4 min-w-[320px] md:min-w-0 bg-white/68 border border-[#E9E5DB]/70 uppercase hover-shake"
                >
                    QUIERO UNIRME AL EQUIPO DE PANDILLA
                </button>
            </div>

            <div className="absolute bottom-12 left-0 w-full px-12 flex flex-col md:flex-row justify-between items-center font-mono text-xl text-brand-brown gap-4">
                <div className="text-center md:text-left">
                    <a
                        href="https://www.google.com/maps/search/?api=1&query=Elias+Aguirre+277%2C+Miraflores%2C+Lima"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline hover:opacity-85 transition-opacity"
                    >
                        ELÍAS AGUIRRE 277, MIRAFLORES
                    </a>
                </div>
                <div className="text-center md:text-center">
                    LUN-DOM DE 9:30AM A 9:30PM
                </div>
                <div className="text-center md:text-right">
                    INSTAGRAM:{' '}
                    <a
                        href="https://instagram.com/pandilla.pe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                    >
                        @PANDILLA.PE
                    </a>
                </div>
            </div>
        </div>
    );
}
