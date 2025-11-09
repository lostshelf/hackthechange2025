import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    const [aboutOpacity, setAboutOpacity] = useState(1);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY || 0;
            const next = Math.max(0, 1 - y / 120); // neg linear relationship for opacity to decrease when scrolling
            setAboutOpacity(next);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
        <div className="relative bg-gray-900 text-white w-screen h-[200vh]">
            {/* First screen */}
            <section className="relative h-screen flex flex-col items-center justify-center">
                <h1 className="text-8xl! md:text-7xl font-semibold tracking-wide text-center">
                    FIX-IT-CALGARY
                </h1>
                <button
                    onClick={() => navigate('/login')}
                    className="mt-4 px-5 py-2 border-2"
                    aria-label="Log in"
                >
                    Log In
                </button>



                {/* About at the bottom of the first screen */}
                <div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center transition-opacity duration-200"
                    style={{ opacity: aboutOpacity }}
                >
                    <h2 className="text-xl">↓↓ About ↓↓</h2>
                </div>
            </section>

            <div className="text-gray-400 text-center text-2xl mt-50">
                Our goal is to create a community-driven approach for tracking non-emerency issues within the city, and to help prioritize them by their prevalence. 
            </div>

            <h1 className="mt-10 p-10 text-center">Features</h1>
            <ul className="m-10 text-2xl space-y-5">
                <li>• Describe an issue, take a picture, and submit a ticket.</li>
                <li>• Bump tickets relevant you to help determine how prevalent the issue is, and which issues need to be prioritized.</li>
                <li>• Provide feedback in response to an issue in the form of discussions.</li>
            </ul>
        </div>
    );
}

export default LandingPage;
