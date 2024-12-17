import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Home = () => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const subtitleRef = useRef<HTMLParagraphElement | null>(null);
    const buttonsRef = useRef<HTMLDivElement | null>(null);

    // GSAP animations
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo(
            titleRef.current,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1 }
        )
            .fromTo(
                subtitleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.6' // Overlap animations
            )
            .fromTo(
                buttonsRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.8, stagger: 0.2 },
                '-=0.4'
            );
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            {/* Title */}
            <h1
                ref={titleRef}
                className="text-5xl md:text-7xl font-extrabold text-center drop-shadow-lg"
            >
                Step Into The Game Zone!
            </h1>

            {/* Subtitle */}
            <p
                ref={subtitleRef}
                className="text-lg md:text-2xl mt-5 mb-12 text-center max-w-2xl leading-relaxed"
            >
                Challenge your skills with our exciting games. Whether it’s testing your vision with 
                <span className="font-bold"> Kuku Cube</span> or strategizing to victory in 
                <span className="font-bold"> Tic Tac Toe</span>, fun is just a click away!
            </p>

            {/* Buttons */}
            <div
                ref={buttonsRef}
                className="flex flex-col md:flex-row gap-6 items-center"
            >
                <Link
                    to="/kuku-cube"
                    className="px-8 py-4 text-lg font-semibold bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                    🟦 Play Kuku Cube
                </Link>
                <Link
                    to="/tic-tac-toe"
                    className="px-8 py-4 text-lg font-semibold bg-green-500 rounded-full shadow-md hover:bg-green-600 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                    ❌ Play Tic Tac Toe
                </Link>
            </div>
        </div>
    );
};

export default Home;
