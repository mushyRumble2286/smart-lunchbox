import ColorBends from '../ColorBends';
import './problem.css';
import { useEffect, useRef, useState } from 'react';

function PercentageCounter() {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const countRef = useRef(0);
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        countRef.current = 0;
        const ctx = canvas.getContext('2d');
        const radius = 95;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const targetPercentage = 25;

        const animate = () => {
            if (countRef.current < targetPercentage) {
                countRef.current += 0.5;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw background circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 14;
            ctx.stroke();

            // Draw progress circle
            const progress = Math.min(countRef.current / 100, 1);
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
            ctx.strokeStyle = '#f4c430';
            ctx.lineWidth = 14;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Draw percentage text
            ctx.fillStyle = '#f4c430';
            ctx.font = 'bold 48px "Google Sans", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(Math.round(countRef.current) + '%', centerX, centerY);

            if (countRef.current < targetPercentage) {
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isVisible]);

    return <div ref={containerRef}><canvas ref={canvasRef} width={260} height={260} /></div>;
}

function RollingDigit({ targetDigit, delay, duration, isVisible }) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isRolling, setIsRolling] = useState(false);
    const animationRef = useRef(null);
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const [digitHeight, setDigitHeight] = useState(72); // Default, will be measured

    // Measure actual digit height
    useEffect(() => {
        if (itemRef.current) {
            const height = itemRef.current.offsetHeight;
            if (height > 0) {
                setDigitHeight(height);
            }
        }
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible || digitHeight === 0) return;

        setIsRolling(true);
        const startTime = Date.now() + delay;
        const targetPosition = targetDigit * digitHeight;
        // Start at 0
        setScrollPosition(0);

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;

            if (elapsed < 0) {
                // Before delay, stay at 0
                animationRef.current = requestAnimationFrame(animate);
            } else if (elapsed < duration) {
                // During rolling phase - smooth easing to target
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic for smooth deceleration
                const eased = 1 - Math.pow(1 - progress, 3);
                const currentPosition = eased * targetPosition;
                setScrollPosition(currentPosition);
                animationRef.current = requestAnimationFrame(animate);
            } else {
                // Animation complete, settle on target
                setScrollPosition(targetPosition);
                setIsRolling(false);
            }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isVisible, targetDigit, delay, duration, digitHeight]);

    // Create array of digits 0-9, repeated for smooth scrolling
    const digits = [...Array(20)].map((_, i) => i % 10);

    return (
        <div ref={containerRef} className="rolling-digit-container">
            <div 
                className={`rolling-digit-wrapper ${isRolling ? 'rolling' : ''}`}
                style={{ transform: `translateY(-${scrollPosition}px)` }}
            >
                {digits.map((digit, index) => (
                    <div 
                        key={index} 
                        ref={index === 0 ? itemRef : null}
                        className="rolling-digit-item"
                    >
                        {digit}
                    </div>
                ))}
            </div>
        </div>
    );
}

function MillionCounter() {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const targetNumber = 600;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    // Convert target number to array of digits
    const digits = targetNumber.toString().split('').map(Number);
    const totalDuration = 2000; // 2 seconds total
    const baseDelay = 0;

    return (
        <div ref={containerRef} className="million-counter">
            <div className="million-number">
                {digits.map((digit, index) => (
                    <RollingDigit
                        key={index}
                        targetDigit={digit}
                        delay={baseDelay + index * 100} // Stagger each digit
                        duration={totalDuration - index * 100}
                        isVisible={isVisible}
                    />
                ))}
            </div>
            <div className="million-label">million</div>
        </div>
    );
}

export default function Problem({ onNavClick }){
    const [isContentVisible, setIsContentVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsContentVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
    <div ref={containerRef} className="problem-container">
        <ColorBends
        colors={["#f4c430","#d4a017"]}
        rotation={77}
        autoRotate={3}
        speed={0.52}
        scale={2.5}
        frequency={2.7}
        warpStrength={1.}
        mouseInfluence={0.05}
        parallax={0.1}
        noise={0.1}
        />
        <h1 className="page-heading">Our Problem</h1>
        <div className="problem-content">
            <div className="bento-grid">
                <div className="bento-box bento-box-small food-waste-box">
                    <div className="food-waste-content">
                        <div className="counter-wrapper">
                            <PercentageCounter />
                        </div>
                        <div className={`food-waste-text ${isContentVisible ? 'fade-in-text' : ''}`}>
                            <p className="food-waste-main"><strong>Of the food bought by American families get thrown away every year.</strong></p>
                            <p className="food-waste-secondary"><strong>That's a quarter of your grocery bill going straight into the trash.</strong></p>
                            <p className="food-waste-tertiary"><strong>Not because you don't want it - because you can't tell when it's actually gone bad.</strong></p>
                        </div>
                    </div>
                </div>
                <div className="bento-box bento-box-small food-contamination-box">
                    <div className="food-contamination-content">
                        <div className="million-counter-wrapper">
                            <MillionCounter />
                        </div>
                        <div className={`food-contamination-text ${isContentVisible ? 'fade-in-text' : ''}`}>
                            <p className="food-contamination-main"><strong> People worldwide get sick from contaminated food each year.</strong></p>
                            <p className="food-contamination-secondary"><strong>That's 1 in 10 people falling ill - and 420,000 of them don't survive.</strong></p>
                            <p className="food-contamination-tertiary"><strong>Most never see it coming until it's too late.</strong></p>
                        </div>
                    </div>
                </div>
                <div className="bento-box bento-box-large">
                    <div className="bento-description large-bento-text">
                        <p className={`fly-in-paragraph ${isContentVisible ? 'animate' : ''}`} style={{ animationDelay: '0.1s' }}>
                            Every school day, millions of parents carefully pack nutritious lunches for their children, hoping these meals will fuel learning and growth. However, traditional lunchboxes lack any ability to maintain safe food temperatures throughout the day. Once a lunch leaves the refrigerator, it quickly enters the bacterial <span className="highlight">"danger zone" between 40-140°F</span>, where harmful pathogens like <span className="highlight">E. coli, Salmonella, and Listeria</span> can multiply rapidly.
                        </p>
                        <p className={`fly-in-paragraph ${isContentVisible ? 'animate' : ''}`} style={{ animationDelay: '0.3s' }}>
                            Studies show that perishable foods left at room temperature for <span className="highlight">more than two hours</span> become unsafe to consume, yet most students don't eat lunch until <span className="highlight">4-6 hours after leaving home</span>. Parents have <span className="highlight">no visibility</span> into the actual temperature of their child's food, <span className="highlight">no way to verify</span> it remained safe, and <span className="highlight">no alerts</span> if something goes wrong. This invisible risk affects not just food safety, but also nutrition, as parents may avoid packing healthy proteins and dairy products out of fear they'll spoil.
                        </p>
                        <p className={`fly-in-paragraph ${isContentVisible ? 'animate' : ''}`} style={{ animationDelay: '0.5s' }}>
                            Beyond safety concerns, there's also significant <span className="highlight">food waste</span>. When children forget to eat parts of their lunch or when food spoils, parents have <span className="highlight">no way to track eating patterns</span> or adjust future meals accordingly. The lack of data and control creates a <span className="highlight">daily gamble with children's health and nutrition</span>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}





  
