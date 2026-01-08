import GradientBlinds from '../GradientBlinds';
import DecryptedText from '../DecryptedText';
import PillNav from '../PillNav';
import logo from '/src/assets/logo.png';
import RotatingText from '../RotatingText';
import './hero.css'

export default function Hero({ onNavClick }) {
  return (
    <div className="hero-container">
        <GradientBlinds
            gradientColors={['#f4c430', '#2d3461']}
            angle={160}
            noise={0.8}
            blindCount={12}
            blindMinWidth={50}
            spotlightRadius={0.65}
            spotlightSoftness={1}
            spotlightOpacity={1}
            mouseDampening={0.15}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="lighten"
        />
        <nav>
                <PillNav
                logo={logo}
                logoAlt="Company Logo"
                items={[
                    { label: 'Home', href: '/hero' },
                    { label: 'Problem', href: '/problem' },
                    { label: 'Innovation', href: '/innovation' },
                    { label: 'Team', href: '/team' },
                    { label: 'Gallery', href: '/gallery' },
                    { label: 'Contact', href: '/contact' }
                ]}
                activeHref="/hero"
                className="custom-nav"
                ease="elastic3.easeOut"
                baseColor="#1a1f3a "
                pillColor="#f4c430"
                hoveredPillTextColor="#ffffff"
                pillTextColor="#ffffff"
                onNavClick={onNavClick}
                />
        </nav>
        <div className="cont">
            <h1>
                <div style={{ marginTop: '4rem' }}>
                    <DecryptedText
                    text="Welcome to The Future Of"
                    speed={75}
                    maxIterations={10}
                    sequential = {true}
                    characters="ABCD1234!?"
                    className="revealed"
                    parentClassName="all-letters"
                    encryptedClassName="encrypted"
                    animateOn = "view"
                    revealDirection = "start"
                    />
                </div>
                <div className="rotate">
                <RotatingText
                    texts={['Food Intelligence', 'Smart Eating', 'Dietetics', 'Personalized Nutrition']}
                    mainClassName="px-2 sm:px-2 md:px-3 bg-[#f4c430] text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                />
            </div>
            </h1>
        </div>
    </div>
  );
}