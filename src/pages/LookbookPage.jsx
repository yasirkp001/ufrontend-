import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';
import { api } from '../services/api';

const LookbookPage = () => {
    useScrollReveal();
    const [activeSeason, setActiveSeason] = useState('SS26');
    const [hoveredLook, setHoveredLook] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await api.getProducts();
                setProducts(data);
            } catch (err) {
                console.error('Failed to fetch products for lookbook:', err);
            }
        };
        fetchProducts();
    }, []);

    const looks = [
        {
            id: 1,
            title: "Urban Minimalist",
            season: "SS26",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2640&auto=format&fit=crop",
            description: "An exploration of architecture through structured knitwear and raw denim.",
            products: [4, 6],
            layout: "md:col-span-2 aspect-[21/9]"
        },
        {
            id: 2,
            title: "Soft Tailoring",
            season: "SS26",
            image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop",
            description: "Fluid silhouettes meet heavy textures. A balance of contrasts.",
            products: [3, 7],
            layout: "aspect-[4/5]"
        },
        {
            id: 3,
            title: "The Weekend Narrative",
            season: "SS26",
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop",
            description: "Versatility redefined for the modern wanderer.",
            products: [1, 9],
            layout: "aspect-[4/5]"
        },
        {
            id: 4,
            title: "Evening Noir",
            season: "FW25",
            image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2576&auto=format&fit=crop",
            description: "Deep tones and midnight textures for the hours after dark.",
            products: [8, 3],
            layout: "aspect-[4/5]"
        },
        {
            id: 5,
            title: "Canvas & Cord",
            season: "FW25",
            image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2574&auto=format&fit=crop",
            description: "Earth-toned essentials made for rugged elegance.",
            products: [5, 9],
            layout: "aspect-[4/5]"
        },
        {
            id: 6,
            title: "Monochrome Study",
            season: "FW25",
            image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=2670&auto=format&fit=crop",
            description: "Shadows and highlights defining the modern silhouette.",
            products: [2, 6],
            layout: "md:col-span-2 aspect-[21/9]"
        }
    ];

    const filteredLooks = looks.filter(l => l.season === activeSeason);

    return (
        <div className="bg-white min-h-screen font-sans text-black">
            <div className="pt-32 pb-24 px-6 md:px-14 lg:px-20 max-w-[1400px] mx-auto text-black">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10 reveal">
                    <div className="max-w-2xl text-black">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 mb-6">Editorial Series</h4>
                        <h1 className="text-7xl md:text-9xl font-medium tracking-tighter leading-none mb-10">Lookbook.</h1>
                        <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
                            A curated visual narrative exploring the intersection of modern design and timeless craft. Each frame is a study in form and atmosphere.
                        </p>
                    </div>

                    {/* Season Toggle */}
                    <div className="flex bg-[#f8f8f8] p-1 rounded-sm">
                        {['SS26', 'FW25'].map(s => (
                            <button
                                key={s}
                                onClick={() => setActiveSeason(s)}
                                className={`px-8 py-3 text-[10px] uppercase tracking-widest font-black transition-all ${activeSeason === s ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Clean Aligned Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24 mb-40">
                    {filteredLooks.map((look) => (
                        <div
                            key={look.id}
                            className={`reveal group flex flex-col ${look.layout}`}
                            onMouseEnter={() => setHoveredLook(look.id)}
                            onMouseLeave={() => setHoveredLook(null)}
                        >
                            <div className="w-full h-full overflow-hidden bg-gray-50 relative rounded-sm">
                                <img
                                    src={look.image}
                                    alt={look.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                                />

                                {/* Shop the Look Interaction */}
                                <div className={`absolute inset-0 bg-black/20 flex flex-col items-center justify-center transition-opacity duration-500 ${hoveredLook === look.id ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className="flex flex-col items-center gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <p className="text-white text-[10px] uppercase tracking-[0.2em] font-bold">Featured Pieces</p>
                                        <div className="flex gap-3">
                                            {look.products.map(pid => {
                                                const p = products.find(pr => pr.id === pid);
                                                return p ? (
                                                    <Link
                                                        key={pid}
                                                        to={`/product/${pid}`}
                                                        className="bg-white text-black px-4 py-2 text-[10px] uppercase tracking-widest font-black hover:bg-black hover:text-white transition-colors"
                                                    >
                                                        {p.name}
                                                    </Link>
                                                ) : null;
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Look Caption - Fixed distance from Image */}
                            <div className="mt-6 flex justify-between items-start">
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest mb-1">{look.title}</h3>
                                    <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">{look.season} Collection</p>
                                    <p className="text-gray-500 text-sm italic max-w-sm">{look.description}</p>
                                </div>
                                <span className="text-[10px] uppercase tracking-widest font-black text-gray-300">#{String(look.id).padStart(2, '0')}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Credits Information */}
                <div className="max-w-4xl mx-auto text-center reveal border-t pt-32 mb-20">
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 italic">"Style is a language that needs no interpreter."</h2>
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                        <p>Photography: <span className="text-black ml-2">Studio 45</span></p>
                        <p>Styling: <span className="text-black ml-2">Uclose Creative</span></p>
                        <p>Location: <span className="text-black ml-2">Bengaluru, IN</span></p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LookbookPage;
