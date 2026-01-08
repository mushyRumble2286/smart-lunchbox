import ColorBends from '../ColorBends';
import logo from '/src/assets/logo.png';
import PillNav from '../PillNav';

export default function Contact({ onNavClick }) {
  return (
    <div className="contact-container" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
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
      <nav style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000 }}>
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
          activeHref="/contact"
          className="custom-nav"
          ease="elastic3.easeOut"
          baseColor="#1a1f3a"
          pillColor="#f4c430"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#ffffff"
          onNavClick={onNavClick}
        />
      </nav>
      <div className="contact-content" style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        zIndex: 10,
        textAlign: 'center',
        color: 'white',
        fontFamily: "'Google Sans', sans-serif"
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#f4c430' }}>Contact Us</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', lineHeight: '1.6' }}>
          Get in touch with us for more information about SmartBox.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <p>Email: info@smartbox.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
}
