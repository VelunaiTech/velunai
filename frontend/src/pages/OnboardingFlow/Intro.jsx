import React, { useEffect, useState } from 'react';


export default function Intro({ onComplete }) {
    const [phase, setPhase] = useState('start'); // 'start' -> 'logo' -> 'caption' -> 'lift' -> 'done'

    useEffect(() => {
        console.log("Intro mounted, starting sequence");
        const t1 = setTimeout(() => {
            document.body.classList.add('stars-on');
        }, 300);

        const t2 = setTimeout(() => {
            setPhase('logo');
        }, 1600);

        const t3 = setTimeout(() => {
            setPhase('caption');
        }, 4600);

        const t4 = setTimeout(() => {
            setPhase('lift');
            document.body.classList.add('rocket-fly');
        }, 7600);

        const t5 = setTimeout(() => {
            document.body.classList.remove('rocket-fly');
            setPhase('done');
            if (onComplete) onComplete();
        }, 10300);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            clearTimeout(t5);
            document.body.classList.remove('stars-on', 'rocket-fly');
        };
    }, [onComplete]);

    if (phase === 'done') return null;

    return (
        <>
            {/* phase: logo */}
            <div className={`phase ${phase === 'logo' ? 'visible' : ''}`} id="phase-logo">
                <svg className="bu-mark" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="g1" cx="40%" cy="35%">
                            <stop offset="0%" stopColor="#f6d488"/>
                            <stop offset="100%" stopColor="#c9791f"/>
                        </radialGradient>
                    </defs>
                    <path d="M50 10 C 70 10 88 28 88 50 C 88 60 84 68 78 74" fill="none" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M50 90 C 30 90 12 72 12 50 C 12 40 16 32 22 26" fill="none" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="50" cy="50" r="9" fill="url(#g1)"/>
                    <circle cx="78" cy="74" r="2.4" fill="#f6d488"/>
                    <circle cx="22" cy="26" r="2.4" fill="#f6d488"/>
                </svg>
                <div className="bu-title">BUSINESS UNIVERSE</div>
                <div className="bu-tagline">Build <b>·</b> Grow <b>·</b> Succeed</div>
            </div>

            {/* phase: caption */}
            <div className={`phase ${(phase === 'caption' || phase === 'lift') ? 'visible' : ''} ${phase === 'lift' ? 'lift-away' : ''}`} id="phase-caption">
                <div className="caption-text">Every successful venture<br />was once just a dream<br /><span className="hi">waiting for its world.</span></div>
                <div className="rule"></div>
            </div>

            {/* rocket */}
            <svg id="rocket" viewBox="0 0 60 140" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="hullGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#c7cdd6"/>
                        <stop offset="18%" stopColor="#f4f7fb"/>
                        <stop offset="40%" stopColor="#eef1f6"/>
                        <stop offset="72%" stopColor="#c2c8d1"/>
                        <stop offset="100%" stopColor="#8d94a1"/>
                    </linearGradient>
                    <linearGradient id="noseGrad" x1="0" y1="0" x2="1" y2="0.15">
                        <stop offset="0%" stopColor="#fff6df"/>
                        <stop offset="35%" stopColor="#f6e2b0"/>
                        <stop offset="70%" stopColor="#dcb567"/>
                        <stop offset="100%" stopColor="#a8792f"/>
                    </linearGradient>
                    <linearGradient id="finGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#f6d488"/>
                        <stop offset="55%" stopColor="#dc9f3f"/>
                        <stop offset="100%" stopColor="#93601c"/>
                    </linearGradient>
                    <radialGradient id="windowGlass" cx="35%" cy="30%" r="75%">
                        <stop offset="0%" stopColor="#e9fbff"/>
                        <stop offset="35%" stopColor="#8fd6f2"/>
                        <stop offset="75%" stopColor="#2f7ea8"/>
                        <stop offset="100%" stopColor="#123246"/>
                    </radialGradient>
                    <linearGradient id="windowRim" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fff6df"/>
                        <stop offset="100%" stopColor="#a8792f"/>
                    </linearGradient>
                    <linearGradient id="flameCore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff"/>
                        <stop offset="35%" stopColor="#fff2c9"/>
                        <stop offset="100%" stopColor="#fff2c9" stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="flameMid" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fff2c9"/>
                        <stop offset="45%" stopColor="#f6b545"/>
                        <stop offset="100%" stopColor="#e2543a" stopOpacity="0"/>
                    </linearGradient>
                    <radialGradient id="flameGlow" cx="50%" cy="10%" r="65%">
                        <stop offset="0%" stopColor="#ffcf7a" stopOpacity="0.55"/>
                        <stop offset="100%" stopColor="#ffcf7a" stopOpacity="0"/>
                    </radialGradient>
                    <filter id="rocketGlow" x="-60%" y="-30%" width="220%" height="180%">
                        <feGaussianBlur stdDeviation="2.2" result="blur"/>
                        <feMerge>
                            <feMergeNode in="blur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* soft outer thruster glow */}
                <ellipse className="rocket-flame-glow" cx="30" cy="112" rx="22" ry="34" fill="url(#flameGlow)"/>

                {/* flame — mid + white-hot core */}
                <g className="rocket-flame">
                    <ellipse cx="30" cy="118" rx="10" ry="26" fill="url(#flameMid)"/>
                    <ellipse cx="30" cy="112" rx="4.5" ry="16" fill="url(#flameCore)"/>
                </g>

                {/* fins */}
                <path d="M14 96 L2 118 L14 108 Z" fill="url(#finGrad)" stroke="#7a4e14" strokeWidth="0.6"/>
                <path d="M46 96 L58 118 L46 108 Z" fill="url(#finGrad)" stroke="#7a4e14" strokeWidth="0.6"/>

                {/* body */}
                <path d="M30 4 C 42 22 46 46 46 70 L46 96 L14 96 L14 70 C14 46 18 22 30 4 Z" fill="url(#hullGrad)" stroke="#9aa1ad" strokeWidth="0.5"/>
                {/* nose cone accent */}
                <path d="M30 4 C 38 16 42 30 44 44 L34 44 C 33 30 31.5 16 30 4 Z" fill="url(#noseGrad)" opacity="0.9"/>
                {/* panel seam lines */}
                <line x1="14" y1="70" x2="46" y2="70" stroke="#9aa1ad" strokeWidth="0.6" opacity="0.6"/>
                <line x1="14" y1="82" x2="46" y2="82" stroke="#9aa1ad" strokeWidth="0.6" opacity="0.4"/>
                <line x1="30" y1="4" x2="30" y2="96" stroke="#ffffff" strokeWidth="0.6" opacity="0.35"/>

                {/* window */}
                <circle cx="30" cy="46" r="8.6" fill="url(#windowRim)"/>
                <circle cx="30" cy="46" r="7" fill="url(#windowGlass)" filter="url(#rocketGlow)"/>
                <path d="M25.5 41.5 a7 7 0 0 1 8 -1.5" fill="none" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" opacity="0.75"/>
            </svg>
        </>
    );
}
