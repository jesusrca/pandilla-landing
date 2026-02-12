'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface ScrollContainerProps {
    children: React.ReactNode[];
}

export default function ScrollContainer({ children }: ScrollContainerProps) {
    const [currentSection, setCurrentSection] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [frameIndex, setFrameIndex] = useState(0);
    const [isMobileViewport, setIsMobileViewport] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchStartTarget = useRef<EventTarget | null>(null);
    const animationFrames = [
        '/content/animacion/pandilla-animacion-01.svg',
        '/content/animacion/pandilla-animacion-02.svg',
        '/content/animacion/pandilla-animacion-03.svg',
        '/content/animacion/pandilla-animacion-04.svg',
    ];
    const sessionCursors = [
        '/content/gato-cursor-small.svg',
        '/content/ave-cursor-small.svg',
        '/oso-cursor-small.svg',
    ];
    const [sessionCursor, setSessionCursor] = useState<string>(sessionCursors[0]);
    const footstepsAudioRef = useRef<HTMLAudioElement | null>(null);
    const lastFootstepAtRef = useRef(0);

    const goToSection = useCallback((index: number) => {
        if (index < 0 || index >= children.length || index === currentSection || isScrolling) return;

        setIsScrolling(true);
        setCurrentSection(index);

        setTimeout(() => {
            setIsScrolling(false);
        }, 800);
    }, [children.length, currentSection, isScrolling]);

    const handleWheel = useCallback((e: WheelEvent) => {
        if (isScrolling) return;

        // Check if horizontal scrolling is already happening or if it's mostly vertical
        const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        if (Math.abs(delta) < 10) return;

        // If the cursor is over the slide-4 carousel, keep wheel focus there
        // until the user reaches the first/last image.
        if (currentSection === 3) {
            const target = e.target as HTMLElement | null;
            const carouselHost = target?.closest('[data-power-carousel="true"]') as HTMLElement | null;
            if (carouselHost) {
                const index = Number(carouselHost.dataset.carouselIndex ?? '0');
                const lastIndex = Number(carouselHost.dataset.carouselLastIndex ?? '0');
                const canAdvanceDown = delta > 0 && index < lastIndex;
                const canAdvanceUp = delta < 0 && index > 0;
                if (canAdvanceDown || canAdvanceUp) {
                    return;
                }
            }
        }

        if (delta > 0) {
            goToSection(currentSection + 1);
        } else {
            goToSection(currentSection - 1);
        }
    }, [currentSection, goToSection, isScrolling]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (isScrolling) return;

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                goToSection(currentSection + 1);
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                goToSection(currentSection - 1);
                break;
            case 'Home':
                goToSection(0);
                break;
            case 'End':
                goToSection(children.length - 1);
                break;
        }
    }, [children.length, currentSection, goToSection, isScrolling]);

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.changedTouches[0].screenX;
            touchStartY.current = e.changedTouches[0].screenY;
            touchStartTarget.current = e.target;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (isScrolling) return;
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            const diff = touchStartX.current - touchEndX;
            const diffY = touchStartY.current - touchEndY;

            if (currentSection === 3) {
                const startEl = touchStartTarget.current as HTMLElement | null;
                const endEl = e.target as HTMLElement | null;
                const carouselHost =
                    startEl?.closest('[data-power-carousel-mobile="true"]') as HTMLElement | null ||
                    endEl?.closest('[data-power-carousel-mobile="true"]') as HTMLElement | null;

                if (carouselHost && Math.abs(diffY) > Math.abs(diff) && Math.abs(diffY) > 35) {
                    const index = Number(carouselHost.dataset.carouselIndexMobile ?? '0');
                    const lastIndex = Number(carouselHost.dataset.carouselLastIndexMobile ?? '0');

                    if (diffY > 0 && index >= lastIndex) {
                        goToSection(currentSection + 1);
                    } else if (diffY < 0 && index <= 0) {
                        goToSection(currentSection - 1);
                    }
                    return;
                }
            }

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToSection(currentSection + 1);
                } else {
                    goToSection(currentSection - 1);
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [currentSection, handleKeyDown, handleWheel, goToSection, isScrolling]);

    useEffect(() => {
        const interval = window.setInterval(() => {
            setFrameIndex((prev) => (prev + 1) % animationFrames.length);
        }, 520);
        return () => window.clearInterval(interval);
    }, [animationFrames.length]);

    useEffect(() => {
        const updateViewport = () => {
            setIsMobileViewport(window.innerWidth < 768);
        };
        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    useEffect(() => {
        setSessionCursor(sessionCursors[Math.floor(Math.random() * sessionCursors.length)]);
    }, []);

    useEffect(() => {
        const audio = new Audio('/content/universfield-cartoon-running-footsteps-250962.mp3');
        audio.preload = 'auto';
        audio.volume = 0.55;
        footstepsAudioRef.current = audio;

        return () => {
            audio.pause();
            footstepsAudioRef.current = null;
        };
    }, []);

    const playFootsteps = useCallback(() => {
        const now = Date.now();
        if (now - lastFootstepAtRef.current < 260) return;
        lastFootstepAtRef.current = now;

        const audio = footstepsAudioRef.current;
        if (!audio) return;

        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise) {
            playPromise.catch(() => {
                // Ignore autoplay blocking errors; next direct interaction will retry.
            });
        }
    }, []);

    // Character variants for animation between slides
    const baseVariant = {
        scale: 0.6,
        opacity: 1,
        x: '-50%',
        y: '-50%',
    };

    const characterVariants = {
        0: {
            ...baseVariant,
            top: '18%',
            left: '50%',
            scale: 0.5,
        },
        heroMobile: {
            ...baseVariant,
            top: '18%',
            left: '50%',
            scale: 0.62,
        },
        1: {
            ...baseVariant,
            top: '50%',
            left: '50%',
            scale: 0.86,
        },
        2: {
            ...baseVariant,
            top: '89%',
            left: '9%',
            scale: 0.34,
        },
        menuMobile: {
            ...baseVariant,
            top: '9%',
            left: '13%',
            scale: 0.34,
        },
        default: {
            ...baseVariant,
            opacity: 0,
            scale: 0.5,
            top: '50%',
            left: '50%',
        }
    };

    const getActiveVariant = () => {
        if (currentSection === 0) {
            return isMobileViewport ? characterVariants.heroMobile : characterVariants[0];
        }
        if (currentSection === 1) return characterVariants[1];
        if (currentSection === 2) {
            return isMobileViewport ? characterVariants.menuMobile : characterVariants[2];
        }
        return {
            ...(isMobileViewport ? characterVariants.menuMobile : characterVariants[2]),
            opacity: 0,
        };
    };

    const characterTransition = currentSection >= 3
        ? { duration: 0.45, ease: 'easeOut' as const }
        : { type: 'spring' as const, damping: 35, stiffness: 60 };

    const activeCursor = `url('${sessionCursor}') 10 10, auto`;

        return (
        <div className="relative app-viewport w-screen overflow-hidden bg-[#F9E0A4]" style={{ cursor: activeCursor }}>
            {/* Moving Characters Overlay */}
            <div className="absolute inset-0 pointer-events-none z-[500]">
            <motion.div
                initial={characterVariants[0]}
                animate={getActiveVariant()}
                transition={characterTransition}
                className="absolute"
                style={{ pointerEvents: currentSection <= 2 ? 'auto' : 'none' }}
            >
                <button
                    type="button"
                    aria-label="Reproducir pasos de personajes"
                    onPointerEnter={playFootsteps}
                    onPointerDown={playFootsteps}
                    onTouchStart={playFootsteps}
                    className="block w-[220px] h-[130px] md:w-[250px] md:h-[140px] bg-transparent border-0 p-0 cursor-pointer"
                />
            </motion.div>
            <motion.div
                initial={characterVariants[0]}
                animate={getActiveVariant()}
                transition={characterTransition}
                className="absolute"
            >
                <div className="relative w-[99vw] max-w-[1100px] aspect-[1080/470] origin-bottom-left scale-[1.1]">
                    {animationFrames.map((frame, index) => (
                        <img
                            key={frame}
                            src={frame}
                            alt="Personajes Pandilla"
                            className={`absolute inset-0 w-full h-full object-contain ${
                                index === frameIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    ))}
                </div>
            </motion.div>
            </div>

            {/* Main Container */}
            <div
                ref={containerRef}
                className="flex h-full w-full transition-transform duration-800 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ transform: `translateX(-${currentSection * 100}vw)` }}
            >
                {children.map((child, index) => (
                    <div key={index} className="min-w-[100vw] h-full flex items-center justify-center relative overflow-hidden">
                        {React.isValidElement(child)
                            ? React.cloneElement(child as React.ReactElement<any>, {
                                isActive: index === currentSection,
                            })
                            : child}
                    </div>
                ))}
            </div>
        </div>
    );
}
