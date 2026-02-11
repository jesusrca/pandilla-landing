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
        <div className="grid grid-cols-[330px_1fr] items-end gap-4 md:gap-6 pb-[2px]">
            <h2 className="font-display font-normal text-4xl md:text-5xl lg:text-6xl text-brand-brown whitespace-nowrap leading-[0.92]">
                {item.title}
            </h2>
            <p className="font-mono text-[20px] text-brand-brown/90 uppercase tracking-[0.08em] hidden lg:block leading-[1.05]">
                {item.description}
            </p>
        </div>
    );

    return (
        <section className="section bg-[#F9E0A4] relative overflow-hidden h-screen w-screen flex items-center justify-center px-2 md:px-3">
            <div className="w-full h-full max-w-[1800px] flex flex-col relative py-6 md:py-8">

                {/* Header - Top Right */}
                <div className="relative mb-8 md:mb-10 pt-24 md:pt-28 border-b-2 border-[#E35A2A]">
                    <h1 className="absolute right-0 -bottom-1 font-display font-normal italic text-5xl md:text-7xl lg:text-8xl text-brand-brown whitespace-nowrap leading-none">
                        Sanguchitos
                    </h1>
                </div>

                <div className="flex flex-col flex-1 items-stretch">
                    {pairedRows.map((row) => (
                        <div
                            key={row.left.title}
                            className="relative grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 min-h-[92px] md:min-h-[120px]"
                        >
                            <RowItem item={row.left} />
                            <RowItem item={row.right} />
                            <div className="absolute left-0 right-0 bottom-0 h-px bg-[#7A3E2B] z-30" />
                        </div>
                    ))}

                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 min-h-[360px] md:min-h-[410px]">
                        <div className="pt-12 md:pt-14">
                            <RowItem item={lastLeft} />
                        </div>
                        <div className="pt-2 md:pt-3">
                            <div className="bg-[#F5F3EE] p-6 md:p-8 border border-[#E9E5DB] relative z-10">
                                <h3 className="font-mono text-[30px] text-brand-brown mb-6 md:mb-8 tracking-[0.08em] text-right uppercase border-b-2 border-[#E35A2A] pb-1">
                                    BEBIDAS & SNACKS
                                </h3>
                                <div className="grid grid-cols-1 gap-3 md:gap-4 font-mono text-[15px] md:text-[16px] text-brand-brown tracking-[0.06em]">
                                    {drinks.slice(0, 3).map((drink, i) => (
                                        <div key={i} className="flex justify-between items-center relative gap-2">
                                            <span className="bg-transparent z-10 pr-2 whitespace-nowrap">{drink.name}</span>
                                            <div className="flex-1 border-b border-dotted border-brand-brown/60 h-[8px]" />
                                            <span className="bg-transparent z-10 pl-2 whitespace-nowrap">{drink.pair}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between mt-8 md:mt-10 font-bold text-[17px] md:text-[18px]">
                                        <span className="uppercase tracking-widest">CHIPS TIYAPUY</span>
                                        <span className="uppercase tracking-widest">COOKIE REPUBLIC</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute left-0 right-0 top-[130px] md:top-[152px] h-px bg-[#7A3E2B] z-30" />
                    </div>
                </div>
            </div>

        </section>
    );
}
