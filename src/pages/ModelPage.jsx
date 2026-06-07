import React from "react";
import "../index.css"; // pulls in the animation CSS

/**
 * ModelPage – shows a model image with a smooth entrance animation.
 * Feel free to replace the image source with any other asset you prefer.
 */
export default function ModelPage() {
    return (
        <section className="relative min-h-screen bg-gray-900 flex items-center justify-center p-8">
            {/* Background overlay for a premium look */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800/70 to-black/90 pointer-events-none" />

            <div className="relative z-10 text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                    Our Signature Model
                </h1>
                {/* The animated image – you can swap the src for any other model picture */}
                <img
                    src="/src/assets/hero-bg-2.jpg"
                    alt="Model"
                    className="model-image rounded-lg shadow-2xl"
                />
                <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
                    Experience the elegance of our latest collection, captured in this high‑resolution visual. Scroll down to explore more.
                </p>
                {/* Next button */}
                <a href="/next" className="inline-block mt-8 px-6 py-3 bg-white text-gray-900 rounded-md hover:bg-gray-200 transition">
                    Next Page
                </a>
            </div>
        </section>
    );
}
