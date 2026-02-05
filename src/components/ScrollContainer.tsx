'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollContainerProps {
    children: React.ReactNode[];
}

export default function ScrollContainer({ children }: ScrollContainerProps) {
    const [currentSection, setCurrentSection] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);

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
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (isScrolling) return;
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX.current - touchEndX;

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

    // Character variants for animation between slides
    const characterVariants = {
        0: {
            top: '18%',
            left: '50%',
            scale: 0.22,
            opacity: 1,
            x: '-50%',
            y: '-50%',
        },
        1: {
            top: '50%',
            left: '50%',
            scale: 0.8,
            opacity: 1,
            x: '-50%',
            y: '-50%',
        },
        2: {
            top: '85%',
            left: '12%',
            scale: 0.14,
            opacity: 1,
            x: '-50%',
            y: '-50%',
        },
        default: {
            opacity: 0,
            scale: 0.5,
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
        }
    };

    const getActiveVariant = () => {
        if (currentSection === 0) return characterVariants[0];
        if (currentSection === 1) return characterVariants[1];
        if (currentSection === 2) return characterVariants[2];
        return characterVariants.default;
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-[#F9E0A4]">
            {/* Moving Characters Overlay */}
            <div className="absolute inset-0 pointer-events-none z-[500]">
                <motion.div
                    initial={characterVariants[0]}
                    animate={getActiveVariant()}
                    transition={{ type: 'spring', damping: 25, stiffness: 80 }}
                    className="absolute"
                >
                    <img
                        src="/Brand/animacion.svg"
                        alt="Personajes Pandilla"
                        className="w-[90vw] max-w-[900px] h-auto origin-bottom-left"
                    />
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
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
}


