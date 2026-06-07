import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
    children,
    scrollContainerRef,
    containerClassName = '',
    textClassName = '',
    animationDuration = 1,
    ease = 'back.inOut(2)',
    scrollStart = 'center bottom+=50%',
    scrollEnd = 'bottom bottom-=40%',
    stagger = 0.03
}) => {
    const containerRef = useRef(null);

    const splitText = useMemo(() => {
        const text = typeof children === 'string' ? children : '';
        // Split by whitespace to preserve natural line breaks without merging words
        return text.split(/(\s+)/).map((part, index) => {
            if (part.match(/^\s+$/)) {
                // Render exact whitespace for correct browser text-wrapping
                return <span key={index} className="whitespace-pre-wrap">{part}</span>;
            }
            return (
                // Word wrapper prevents characters splitting mid-word
                <span key={index} className="inline-block whitespace-nowrap">
                    {part.split('').map((char, charIndex) => (
                        <span className="inline-block word" key={charIndex}>
                            {char}
                        </span>
                    ))}
                </span>
            );
        });
    }, [children]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

        // React 18 strict mode fix: use gsap.context
        let ctx = gsap.context(() => {
            const charElements = el.querySelectorAll('.inline-block.word');

            gsap.fromTo(
                charElements,
                {
                    willChange: 'opacity, transform',
                    opacity: 0,
                    yPercent: 120,
                    scaleY: 2.3,
                    scaleX: 0.7,
                    transformOrigin: '50% 0%'
                },
                {
                    duration: animationDuration,
                    ease: ease,
                    opacity: 1,
                    yPercent: 0,
                    scaleY: 1,
                    scaleX: 1,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: el,
                        scroller,
                        start: scrollStart,
                        end: scrollEnd,
                        scrub: true
                    }
                }
            );
        }, el);

        return () => ctx.revert();
    }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

    return (
        <h2 ref={containerRef} className={`my-5 overflow-hidden ${containerClassName}`}>
            <span className={`inline-block pb-2 ${textClassName}`}>{splitText}</span>
        </h2>
    );
};

export default ScrollFloat;
