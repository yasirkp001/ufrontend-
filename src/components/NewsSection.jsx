import React from 'react';

const NewsSection = () => {
    const newsItems = [
        {
            image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop",
            title: "Spring 2025 Essentials",
            description: "Polos and relaxed tailoring for the new season.",
            id: 1
        },
        {
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2570&auto=format&fit=crop",
            title: "Uclose Co. Pop-up Experience",
            description: "A temporary space dedicated to craftsmanship.",
            id: 2
        },
        {
            image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2548&auto=format&fit=crop",
            title: "Responsible Fabric & Design",
            description: "Our sourcing process, from field to form.",
            id: 3
        }
    ];

    return (
        <section className="bg-white text-black py-20 md:py-32 px-6 md:px-10 lg:px-14 border-t border-gray-300" id="news">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-start mb-16 gap-8 reveal">
                <h2 className="text-4xl md:text-[55px] font-medium tracking-tight leading-tight max-w-lg">
                    What's New at<br />Uclose Co.
                </h2>
                <div className="max-w-xs md:mt-4 text-right md:text-left">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-normal">
                        From new product drops to style tips — read our latest features, editorials, and brand announcements.
                    </p>
                </div>
            </div>

            {/* News Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {newsItems.map((item) => (
                    <div key={item.id} className="group cursor-pointer flex flex-col reveal">
                        <div className="overflow-hidden bg-[#f4f4f4] aspect-[4/5] relative w-full mb-6">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
                            <p className="text-sm text-gray-500 font-normal">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewsSection;
