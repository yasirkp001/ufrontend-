import React from 'react';
import heroImg from '../assets/account_hero.png';

const AccountHero = () => {
    return (
        <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
            <img
                src={heroImg}
                alt="Account hero background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 drop-shadow-lg">
                    My Account.
                </h1>
                <p className="text-4xl md:text-5xl font-bold text-white italic drop-shadow-md">
                    Welcome back! Here's an overview of your recent account activity.
                </p>
            </div>
        </section>
    );
};

export default AccountHero;
