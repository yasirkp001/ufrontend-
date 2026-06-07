import React from 'react';

const StoresSection = () => {
    const locations = [
        {
            city: "London",
            address: "14 Golden Square, Soho, London W1F 9JG",
            hours: "Mon-Sat: 10am-7pm, Sun: 12pm-6pm",
            image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=2670&auto=format&fit=crop"
        },
        {
            city: "Paris",
            address: "42 Rue de Sévigné, 75003 Paris",
            hours: "Mon-Sat: 11am-7.30pm, Sun: Closed",
            image: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?q=80&w=2574&auto=format&fit=crop"
        },
        {
            city: "New York",
            address: "107 Mercer St, SoHo, NY 10012",
            hours: "Mon-Sat: 11am-8pm, Sun: 11am-6pm",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop"
        }
    ];

    return (
        <section className="bg-white text-black py-20 md:py-32 px-6 md:px-14 lg:px-20 border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto">
                <div className="reveal mb-20 text-center">
                    <h2 className="text-5xl md:text-7xl font-medium tracking-tighter leading-none mb-4">Stores.</h2>
                    <p className="text-gray-400 text-sm uppercase tracking-widest">Our Global Flagships</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {locations.map((loc, index) => (
                        <div key={index} className="reveal flex flex-col gap-6">
                            <div className="overflow-hidden bg-gray-100 aspect-[4/5]">
                                <img
                                    src={loc.image}
                                    alt={loc.city}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-2xl font-medium tracking-tight">{loc.city}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{loc.address}</p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-2">{loc.hours}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StoresSection;
