import ColorBends from '../ColorBends';
import picnicImg from '/picnic.png';
import { useEffect, useRef, useState } from 'react';

// Custom animation styles for rotating broken circle
const rotationAnimation = `
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
`;

const impactCards = [
  {
    id: 'safety',
    icon: '🛡️',
    title: 'Food Safety Awareness',
    description: 'Monitor food temperatures and freshness to prevent bacterial growth',
    gradient: 'from-amber-500/20 to-yellow-600/10'
  },
  {
    id: 'choices',
    icon: '🎯',
    title: 'Informed Student Choices',
    description: 'Visual indicators in the app help users make informed decisions about food consumption',
    gradient: 'from-blue-500/20 to-cyan-600/10'
  },
  {
    id: 'waste',
    icon: '♻️',
    title: 'Waste Reduction',
    description: 'Early detection of spoilage reduces food waste and promotes sustainability',
    gradient: 'from-green-500/20 to-emerald-600/10'
  },
  {
    id: 'visibility',
    icon: '📊',
    title: 'Parental Visibility',
    description: 'Parents can monitor food status and history through the mobile app',
    gradient: 'from-purple-500/20 to-pink-600/10'
  }
];

const coreFeatureCards = [
  {
    id: 'temperature-holding',
    title: 'Temperature Holding',
    description: 'Maintain desired temperature for hours using advanced insulation and minimal power',
    icon: '🌡️'
  },
  {
    id: 'food-safety-monitoring',
    title: 'Food Safety Monitoring',
    description: 'Monitor internal temperatures and alert if food enters the bacterial danger zone',
    icon: '🛡️'
  },
  {
    id: 'rechargeable-power',
    title: 'Rechargeable Power',
    description: 'Built-in long-lasting battery for autonomous operation',
    icon: '🔋'
  },
  {
    id: 'secure-design',
    title: 'Secure & Leak-Proof Design',
    description: 'Completely sealed containers prevent spills during transport',
    icon: '🔒'
  },
  {
    id: 'modular-clean',
    title: 'Modular & Easy to Clean',
    description: 'Removable food-grade containers that are dishwasher-safe',
    icon: '🧽'
  },
  {
    id: 'mobile-app-control',
    title: 'Mobile App Control',
    description: 'Wireless connection for remote control and status monitoring',
    icon: '📱'
  },
  {
    id: 'battery-indication',
    title: 'Clear Battery Indication',
    description: 'Visible display of remaining battery charge',
    icon: '⚡'
  },
  {
    id: 'freshness-monitoring',
    title: 'Freshness Monitoring',
    description: 'Gas and humidity sensors detect food spoilage and alert users',
    icon: '🍎'
  }
];

const appFeatureCards = [
  {
    id: 'pairing-setup',
    title: 'Device Pairing & Setup',
    description: 'Easy Bluetooth/Wi-Fi pairing with setup wizard for compartments and sensors',
    icon: '🔗'
  },
  {
    id: 'temperature-control',
    title: 'Temperature Control & Monitoring',
    description: 'Real-time temperature display with presets and safety alerts',
    icon: '🌡️'
  },
  {
    id: 'freshness-alerts',
    title: 'Freshness & Spoilage Alerts',
    description: 'Sensors detect spoilage with push notifications and visual indicators',
    icon: '🚨'
  }
];


function FeatureCard({ card }) {
  return (
    <div className="group relative bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 hover:scale-105 font-['Google_Sans'] h-28 sm:h-32 flex flex-col justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-500/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-[1px] bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-xl sm:rounded-2xl" />
      
      <div className="relative z-10 flex items-start gap-3 sm:gap-4 w-full">
        <div className="text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 flex-shrink-0 mt-0.5">{card.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors duration-300">{card.title}</h3>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300 line-clamp-3">{card.description}</p>
        </div>
      </div>
      
      <div className="absolute top-3 right-3 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-br from-amber-500/60 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

// Radial layout helper for feature cards
const getRadialPosition = (index, total, radius, centerX = 50, centerY = 50) => {
  const angle = (index * 360 / total) - 90; // -90 to start from top
  const radians = (angle * Math.PI) / 180;
  const x = centerX + radius * Math.cos(radians);
  const y = centerY + radius * Math.sin(radians);
  return { x, y, angle };
};

export default function Innovation({ onNavClick }) {
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

  return (
    <>
      <style>{rotationAnimation}</style>
      <div ref={containerRef} className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden bg-black font-['Google_Sans']">
      <div className="absolute inset-0 z-0">
        <ColorBends
          colors={["#f4c430", "#d4a017"]}
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
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto font-['Google_Sans'] py-12">
          <h1 className="page-heading mt-20 mb-16 text-center">Our Solution</h1>
          {/* Mobile stacked layout for small devices (laptops and below) */}
          <div className="lg:hidden flex flex-col items-center gap-6 px-4 py-12 pb-24">
            {/* Center Image with Broken Rotating Circle - smaller for mobile */}
            <div className="w-48 h-48 mb-8">
              {/* Broken Rotating Circle - Smaller radius for mobile */}
              <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] animate-spin-slow pointer-events-none z-10"
                   viewBox="0 0 200 200"
                   style={{ animationDuration: '20s' }}>
                <defs>
                  <linearGradient id="brokenCircleGradMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f4c430" stopOpacity="1" />
                    <stop offset="50%" stopColor="#d4a017" stopOpacity="1" />
                    <stop offset="100%" stopColor="#b8860b" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <circle 
                  cx="100" 
                  cy="100" 
                  r="95" 
                  fill="none" 
                  stroke="url(#brokenCircleGradMobile)" 
                  strokeWidth="2"
                  strokeDasharray="20 15"
                  strokeLinecap="round"
                  className="opacity-80"
                />
              </svg>
              {/* Central Image */}
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-yellow-500/20 to-orange-500/30 rounded-full blur-3xl opacity-75" />
                <img 
                  src={picnicImg} 
                  alt="SmartBox Product" 
                  className="relative w-full h-full object-cover rounded-full shadow-2xl shadow-amber-500/30 border-2 border-white/20"
                  style={{ objectPosition: 'center 30%' }}
                />
              </div>
            </div>

            {/* Stacked cards for mobile */}
            <div className="w-full max-w-md">
              <FeatureCard card={coreFeatureCards[0]} />
            </div>
            <div className="w-full max-w-md">
              <FeatureCard card={coreFeatureCards[1]} />
            </div>
            <div className="w-full max-w-md">
              <FeatureCard card={coreFeatureCards[2]} />
            </div>
            <div className="w-full max-w-md">
              <FeatureCard card={coreFeatureCards[3]} />
            </div>
            <div className="w-full max-w-md">
              <FeatureCard card={coreFeatureCards[4]} />
            </div>
            <div className="w-full max-w-md">
              <FeatureCard card={coreFeatureCards[5]} />
            </div>
            <div className="w-full max-w-md">
              <FeatureCard card={coreFeatureCards[6]} />
            </div>
            <div className="w-full max-w-md">
              <FeatureCard card={coreFeatureCards[7]} />
            </div>
          </div>

          {/* Desktop Zig-Zag Layout */}
          <div className="hidden lg:flex lg:flex-row lg:items-center justify-center relative w-full min-h-screen overflow-x-visible px-8">
            <h1 className="page-heading lg:absolute lg:top-8 z-20 text-center">Our Solution</h1>
            
            {/* Left side cards - 4 cards in zig-zag pattern - pull left */}
            <div className="flex flex-col gap-8 lg:gap-20 w-80 lg:ml-0">
              {coreFeatureCards.slice(0, 4).map((card, index) => (
                <div 
                  key={card.id}
                  className={`w-full transition-all duration-500 hover:scale-105 ${index % 2 === 0 ? 'lg:-ml-28' : 'lg:ml-0'}`}
                  style={{ 
                    marginTop: index % 2 === 0 ? '0' : '-60px',
                    marginLeft: index % 2 === 1 ? '180px' : '0'
                  }}
                >
                  <FeatureCard card={card} />
                </div>
              ))}
            </div>

            {/* Center Image */}
            <div className="relative z-20 w-64 h-64 lg:w-72 lg:h-72 mx-8 lg:mx-16">
              {/* Broken Rotating Circle */}
              <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] animate-spin-slow pointer-events-none z-10"
                   viewBox="0 0 200 200"
                   style={{ animationDuration: '20s' }}>
                <defs>
                  <linearGradient id="brokenCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f4c430" stopOpacity="1" />
                    <stop offset="50%" stopColor="#d4a017" stopOpacity="1" />
                    <stop offset="100%" stopColor="#b8860b" stopOpacity="1" />
                  </linearGradient>
                </defs>
                {/* Radial dashed circle */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="95" 
                  fill="none" 
                  stroke="url(#brokenCircleGrad)" 
                  strokeWidth="2"
                  strokeDasharray="20 15"
                  strokeLinecap="round"
                  className="opacity-80"
                />
              </svg>
              {/* Central Image */}
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-yellow-500/20 to-orange-500/30 rounded-full blur-3xl opacity-75" />
                <img 
                  src={picnicImg} 
                  alt="SmartBox Product" 
                  className="relative w-full h-full object-cover rounded-full shadow-2xl shadow-amber-500/30 border-2 border-white/20"
                  style={{ objectPosition: 'center 30%' }}
                />
              </div>
            </div>

            {/* Right side cards - 4 cards in zig-zag pattern - MIRRORED, pull toward center */}
            <div className="flex flex-col gap-8 lg:gap-20 w-80 lg:mr-0">
              {coreFeatureCards.slice(4, 8).map((card, index) => (
                <div 
                  key={card.id}
                  className={`w-full transition-all duration-500 hover:scale-105 ${index % 2 === 1 ? 'lg:-ml-28' : 'lg:ml-0'}`}
                  style={{ 
                    marginTop: index % 2 === 0 ? '0' : '-60px',
                    marginRight: index % 2 === 1 ? '0' : '180px'
                  }}
                >
                  <FeatureCard card={card} />
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
    </>
  );
}
