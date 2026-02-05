'use client';

import React from 'react';

export function HeroSection() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-start bg-[#F9E0A4] relative p-8 pt-[15vh]">
            {/* Space for characters overlay */}
            <div className="h-[6vh] shrink-0" />

            <div className="flex flex-col items-center animate-fadeInUp">
                <img src="/Brand/logo-pandilla.svg" alt="Pandilla Logo" className="w-[85vw] max-w-[850px] h-auto mb-8" />

                <h2 className="font-display italic text-3xl md:text-5xl text-brand-brown mb-12">
                    Taller de Sanguchitos
                </h2>

                <div>
                    <img src="/Brand/age-pandilla.svg" alt="EST 2024" className="w-[28vw] max-w-[180px] h-auto" />
                </div>
            </div>

            {/* Footer Info */}
            <div className="absolute bottom-12 left-0 w-full px-12 flex flex-col md:flex-row justify-between items-center font-mono text-[11px] md:text-[13px] text-brand-brown tracking-[0.2em] gap-4">
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

export function CharacterSection() {
    return (
        <div className="w-full h-full bg-[#f9e0a4] relative overflow-hidden flex items-center justify-center">
            <div
                className="absolute inset-0 pointer-events-none opacity-100 z-0"
                style={{
                    backgroundImage: 'url("/content/Trama.svg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
        </div>
    );
}

export function PowerSection() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-[#F9E0A4] p-8">
            <div className="w-[90vw] max-w-[600px] animate-rotateIn">
                <img src="/content/Group 1.png" alt="The Power of Pandilla" className="w-full h-auto rounded-[20px] shadow-3xl transition-transform duration-300 hover:scale-105 hover:-rotate-2" />
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
