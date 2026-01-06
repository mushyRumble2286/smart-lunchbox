import ColorBends from '../ColorBends';
import logo from '/src/assets/logo.png';
import PillNav from '../PillNav';
import { useEffect, useRef, useState } from 'react';

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
    <div className="group relative bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-3 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-1 font-['Google_Sans']">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-[1px] bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl" />
      
      <div className="relative z-10">
        <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">{card.icon}</div>
        <h3 className="text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2 group-hover:text-amber-300 transition-colors duration-300">{card.title}</h3>
        <p className="text-xs text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">{card.description}</p>
      </div>
      
      <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-amber-500/60 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

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
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
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

      <nav className="relative z-30 flex justify-center">
        <PillNav
          logo={logo}
          logoAlt="Company Logo"
          items={[
            { label: 'Home', href: '/hero' },
            { label: 'Problem', href: '/problem' },
            { label: 'Innovation', href: '/innovation' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Contact', href: '/contact' }
          ]}
          activeHref="/innovation"
          className="custom-nav"
          ease="elastic3.easeOut"
          baseColor="#1a1f3a "
          pillColor="#f4c430"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#ffffff"
          onNavClick={onNavClick}
        />
      </nav>

      <div className="relative z-10 flex flex-col items-center px-2 sm:px-4 pt-20 sm:pt-24 pb-8 space-y-8 overflow-hidden font-['Google_Sans']">
        <div className="max-w-6xl w-full">
          <h2 className="text-lg sm:text-xl font-bold text-center text-white mb-4">Core Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {coreFeatureCards.map((card) => (
              <FeatureCard key={card.id} card={card} />
            ))}
          </div>
        </div>

        <div className="max-w-4xl w-full">
          <h2 className="text-lg sm:text-xl font-bold text-center text-white mb-4">App Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
            {appFeatureCards.map((card) => (
              <FeatureCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}