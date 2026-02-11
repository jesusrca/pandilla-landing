'use client';

import React, { useEffect, useState } from 'react';

type MenuItem = {
    title: string;
    description: string;
    image: string;
};

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

function RowItem({
    item,
    onTitleHover,
    compact = false,
}: {
    item: MenuItem;
    onTitleHover: (item: MenuItem | null) => void;
    compact?: boolean;
}) {
    return (
        <div
            className={`grid items-end gap-x-[2%] pb-0 ${
                compact
                    ? 'grid-cols-[minmax(188px,220px)_1fr] lg:grid-cols-[minmax(200px,232px)_1fr]'
                    : 'grid-cols-[238px_1fr]'
            }`}
            onMouseEnter={() => onTitleHover(item)}
            onMouseLeave={() => onTitleHover(null)}
            onFocusCapture={() => onTitleHover(item)}
            onBlurCapture={() => onTitleHover(null)}
        >
            <button
                type="button"
                className={`font-display font-normal text-brand-brown whitespace-nowrap leading-none text-left bg-transparent border-0 p-0 cursor-pointer ${
                    compact ? 'text-[clamp(2.35rem,2.8vw,2.9rem)] -mb-[4px]' : 'text-5xl -mb-[6px]'
                }`}
            >
                {item.title}
            </button>
            <p
                className={`font-mono text-brand-brown/90 uppercase hidden lg:block mt-0 ${
                    compact
                        ? 'text-[clamp(0.95rem,1.06vw,1.08rem)] leading-[1.08] -mb-[1px]'
                        : 'text-x1 leading-[1.2] -mb-[2px]'
                }`}
            >
                {item.description}
            </p>
        </div>
    );
}

export default function MenuSection() {
    const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
    const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);
    const [isCompactDesktop, setIsCompactDesktop] = useState(false);
    const pairedRows = menuData.leftColumn.slice(0, 3).map((leftItem, index) => ({
        left: leftItem,
        right: menuData.rightColumn[index],
    }));
    const lastLeft = menuData.leftColumn[3]!;
    const mobileMenuItems: MenuItem[] = [
        menuData.leftColumn[0]!,
        menuData.rightColumn[0]!,
        menuData.leftColumn[1]!,
        menuData.rightColumn[1]!,
        menuData.leftColumn[2]!,
        menuData.rightColumn[2]!,
        lastLeft,
    ];
    const previewOffsets: Record<string, string> = {
        'Roast Beef': '-translate-x-[54%] -translate-y-[52%]',
        'Rubén': '-translate-x-[48%] -translate-y-[49%]',
        'Panchito Villa': '-translate-x-[51%] -translate-y-[55%]',
        'Tricolore': '-translate-x-[46%] -translate-y-[50%]',
        'Rey Misterio': '-translate-x-[53%] -translate-y-[48%]',
        'Buti de Lima': '-translate-x-[47%] -translate-y-[54%]',
        'Italian Deli': '-translate-x-[50%] -translate-y-[50%]',
    };
    const previewOffsetClass = hoveredItem ? previewOffsets[hoveredItem.title] ?? '-translate-x-1/2 -translate-y-1/2' : '-translate-x-1/2 -translate-y-1/2';
    const previewSizeClass = isCompactDesktop ? 'w-[min(27vw,33vh,360px)]' : 'w-[min(34vw,460px)]';
    const rowHeightClass = isCompactDesktop ? 'min-h-[70px] lg:min-h-[82px]' : 'min-h-[76px] md:min-h-[104px]';
    const lastRowHeightClass = isCompactDesktop ? 'min-h-[260px] lg:min-h-[300px]' : 'min-h-[360px] md:min-h-[410px]';
    const lastRowLineTopClass = isCompactDesktop ? 'top-[86px] lg:top-[98px]' : 'top-[102px] md:top-[120px]';

    useEffect(() => {
        const checkCompact = () => {
            setIsCompactDesktop(window.innerWidth >= 768 && window.innerWidth < 1400);
        };
        checkCompact();
        window.addEventListener('resize', checkCompact);
        return () => window.removeEventListener('resize', checkCompact);
    }, []);

    return (
        <section className="section bg-[#F9E0A4] relative overflow-hidden h-screen w-screen flex items-center justify-center px-2 md:px-3">
            {hoveredItem && (
                <div className="pointer-events-none absolute inset-0 z-40 hidden md:flex items-center justify-center">
                    <div
                        key={hoveredItem.title}
                        className={`absolute left-1/2 top-1/2 ${previewSizeClass} aspect-[4/5] ${previewOffsetClass} animate-[fadeIn_240ms_ease-out]`}
                    >
                        <div className="w-full h-full menu-preview-float">
                            <img
                                src={hoveredItem.image}
                                alt={hoveredItem.title}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className="md:hidden w-full h-full overflow-y-auto px-4 pt-16 pb-24" style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}>
                <div className="relative mb-5 border-b border-[#E35A2A]">
                    <h1 className="font-display font-normal italic text-[2.5rem] leading-none text-brand-brown text-right pb-1">
                        Sanguchitos
                    </h1>
                </div>

                <div className="space-y-1">
                    {mobileMenuItems.map((item) => {
                        const isOpen = openMobileItem === item.title;
                        return (
                            <div key={item.title} className="border-b border-[#7A3E2B]">
                                <button
                                    type="button"
                                    onClick={() => setOpenMobileItem(isOpen ? null : item.title)}
                                    className="w-full text-left font-display font-normal text-[2.8rem] leading-none text-brand-brown py-2"
                                >
                                    {item.title}
                                </button>
                                <div
                                    className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                                        isOpen ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0 mt-0'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div
                                            className={`pb-3 transition-transform duration-300 ease-out ${
                                                isOpen ? 'translate-y-0' : '-translate-y-1'
                                            }`}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-[160px] object-cover rounded-[8px] mb-2"
                                            />
                                            <p className="font-mono text-[18px] leading-[1.22] text-brand-brown/90 uppercase">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 bg-white/72 border border-[#E9E5DB] px-4 py-4">
                    <h3 className="font-mono text-[18px] text-brand-brown uppercase text-right pb-2">
                        BEBIDAS & SNACKS
                    </h3>
                    <div className="space-y-1">
                        {drinks.slice(0, 3).map((drink) => (
                            <div
                                key={drink.name}
                                className="w-full border-b border-brand-brown/60"
                                style={{ borderBottomStyle: 'dotted' }}
                            >
                                <div className="grid grid-cols-2 items-start py-[3px]">
                                    <span className="font-mono text-[18px] leading-[1.15] text-brand-brown uppercase">
                                        {drink.name}
                                    </span>
                                    <span className="font-mono text-[18px] leading-[1.15] text-brand-brown uppercase text-left">
                                        {drink.pair}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="grid grid-cols-2 items-start pt-4">
                            <span className="font-mono text-[18px] leading-[1.15] text-brand-brown uppercase">
                                CHIPS TIYAPUY
                            </span>
                            <span className="font-mono text-[18px] leading-[1.15] text-brand-brown uppercase text-left">
                                COOKIE REPUBLIC
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`hidden md:flex w-full h-full max-w-[1800px] flex-col relative ${isCompactDesktop ? 'py-1' : 'py-6 md:py-8'} -translate-y-[2%]`}>

                {/* Header - Top Right */}
                <div className={`relative border-b-2 border-[#E35A2A] ${isCompactDesktop ? 'mb-5 pt-16 lg:pt-20' : 'mb-8 md:mb-10 pt-24 md:pt-28'}`}>
                    <h1 className={`absolute right-0 font-display font-normal italic text-brand-brown whitespace-nowrap leading-none ${isCompactDesktop ? '-bottom-0.5 text-[clamp(2.55rem,3.2vw,3.05rem)]' : '-bottom-1 text-5x1'}`}>
                        Sanguchitos
                    </h1>
                </div>

                <div className={`flex flex-col flex-1 items-stretch ${isCompactDesktop ? 'gap-y-1.5' : 'gap-y-2 md:gap-y-3'}`}>
                    {pairedRows.map((row) => (
                        <div
                            key={row.left.title}
                            className={`relative grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 ${rowHeightClass} items-end`}
                        >
                            <RowItem item={row.left} onTitleHover={setHoveredItem} compact={isCompactDesktop} />
                            <RowItem item={row.right} onTitleHover={setHoveredItem} compact={isCompactDesktop} />
                            <div className="absolute left-0 right-0 bottom-0 h-px bg-[#7A3E2B] z-30" />
                        </div>
                    ))}

                    <div className={`relative grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 ${lastRowHeightClass}`}>
                        <div className={isCompactDesktop ? 'pt-3 lg:pt-4' : 'pt-8 md:pt-10'}>
                            <RowItem item={lastLeft} onTitleHover={setHoveredItem} compact={isCompactDesktop} />
                        </div>
                        <div className={isCompactDesktop ? 'pt-4 lg:pt-5' : 'pt-10 md:pt-11'}>
                            <div className={`bg-white/80 border border-[#E9E5DB] relative z-10 backdrop-blur-[2px] ${isCompactDesktop ? 'px-4 py-3 lg:px-6 lg:py-4 translate-y-[4%]' : 'px-5 py-6 md:px-8 md:py-7 translate-y-[10%]'}`}>
                                <div className="flex justify-end">
                                    <h3 className={`font-mono text-brand-brown uppercase ${isCompactDesktop ? 'text-[clamp(0.95rem,1.05vw,1.08rem)] pb-0.5' : 'text-x1 pb-1'}`}>
                                        BEBIDAS & SNACKS
                                    </h3>
                                </div>
                                <div className={isCompactDesktop ? 'mt-1.5 space-y-0.5' : 'mt-2 space-y-1'}>
                                    {drinks.slice(0, 3).map((drink, i) => (
                                        <div
                                            key={i}
                                            className="w-full border-b-2 border-brand-brown/60 last:border-b-0"
                                            style={{ borderBottomStyle: 'dotted' }}
                                        >
                                            <div className={`grid grid-cols-2 items-center ${isCompactDesktop ? 'py-[1px] px-0.5' : 'py-[2px] px-1'}`}>
                                                <span className={`font-mono text-brand-brown uppercase ${isCompactDesktop ? 'text-[clamp(0.95rem,1.05vw,1.08rem)]' : 'text-x1'}`}>
                                                    {drink.name}
                                                </span>
                                                <span className={`font-mono text-brand-brown uppercase ${isCompactDesktop ? 'text-[clamp(0.95rem,1.05vw,1.08rem)]' : 'text-x1'}`}>
                                                    {drink.pair}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    <div className={`grid grid-cols-2 items-center ${isCompactDesktop ? 'pt-3' : 'pt-5'}`}>
                                        <span className={`font-mono text-brand-brown uppercase ${isCompactDesktop ? 'text-[clamp(0.95rem,1.05vw,1.08rem)]' : 'text-x1'}`}>
                                            CHIPS TIYAPUY
                                        </span>
                                        <span className={`font-mono text-brand-brown uppercase ${isCompactDesktop ? 'text-[clamp(0.95rem,1.05vw,1.08rem)]' : 'text-x1'}`}>
                                            COOKIE REPUBLIC
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`absolute left-0 right-0 ${lastRowLineTopClass} h-px bg-[#7A3E2B] z-30`} />
                        <div className={`hidden md:block absolute md:left-[calc(50%+1.5rem)] lg:left-[calc(50%+3rem)] right-0 ${lastRowLineTopClass} h-px bg-[#E35A2A] z-40`} />
                    </div>
                </div>
            </div>

        </section>
    );
}
