'use client';

import React from 'react';

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
    const pairedRows = menuData.leftColumn.slice(0, 3).map((leftItem, index) => ({
        left: leftItem,
        right: menuData.rightColumn[index],
    }));
    const lastLeft = menuData.leftColumn[3]!;

    const RowItem = ({ item }: { item: { title: string; description: string } }) => (
        <div className="grid grid-cols-[238px_1fr] items-end gap-x-[2%] pb-0">
            <h2 className="font-display font-normal text-5xl text-brand-brown whitespace-nowrap leading-none -mb-[6px]">
                {item.title}
            </h2>
            <p className="font-mono text-x1 text-brand-brown/90 uppercase hidden lg:block leading-[1.2] mt-0 -mb-[2px]">
                {item.description}
            </p>
        </div>
    );

    return (
        <section className="section bg-[#F9E0A4] relative overflow-hidden h-screen w-screen flex items-center justify-center px-2 md:px-3">
            <div className="w-full h-full max-w-[1800px] flex flex-col relative py-6 md:py-8 -translate-y-[2%]">

                {/* Header - Top Right */}
                <div className="relative mb-8 md:mb-10 pt-24 md:pt-28 border-b-2 border-[#E35A2A]">
                    <h1 className="absolute right-0 -bottom-1 font-display font-normal italic text-5x1 text-brand-brown whitespace-nowrap leading-none">
                        Sanguchitos
                    </h1>
                </div>

                <div className="flex flex-col flex-1 items-stretch gap-y-2 md:gap-y-3">
                    {pairedRows.map((row) => (
                        <div
                            key={row.left.title}
                            className="relative grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 min-h-[76px] md:min-h-[104px] items-end"
                        >
                            <RowItem item={row.left} />
                            <RowItem item={row.right} />
                            <div className="absolute left-0 right-0 bottom-0 h-px bg-[#7A3E2B] z-30" />
                        </div>
                    ))}

                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 min-h-[360px] md:min-h-[410px]">
                        <div className="pt-8 md:pt-10">
                            <RowItem item={lastLeft} />
                        </div>
                        <div className="pt-10 md:pt-11">
                            <div className="bg-white/80 border border-[#E9E5DB] relative z-10 px-5 py-6 md:px-8 md:py-7 backdrop-blur-[2px] translate-y-[10%]">
                                <div className="flex justify-end">
                                    <h3 className="font-mono text-x1 text-brand-brown uppercase pb-1">
                                        BEBIDAS & SNACKS
                                    </h3>
                                </div>
                                <div className="mt-2 space-y-1">
                                    {drinks.slice(0, 3).map((drink, i) => (
                                        <div
                                            key={i}
                                            className="w-full border-b-2 border-brand-brown/60 last:border-b-0"
                                            style={{ borderBottomStyle: 'dotted' }}
                                        >
                                            <div className="grid grid-cols-2 items-center py-[2px] px-1">
                                                <span className="font-mono text-x1 text-brand-brown uppercase">
                                                    {drink.name}
                                                </span>
                                                <span className="font-mono text-x1 text-brand-brown uppercase">
                                                    {drink.pair}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="grid grid-cols-2 items-center pt-5">
                                        <span className="font-mono text-x1 text-brand-brown uppercase">
                                            CHIPS TIYAPUY
                                        </span>
                                        <span className="font-mono text-x1 text-brand-brown uppercase">
                                            COOKIE REPUBLIC
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute left-0 right-0 top-[102px] md:top-[120px] h-px bg-[#7A3E2B] z-30" />
                    </div>
                </div>
            </div>

        </section>
    );
}
