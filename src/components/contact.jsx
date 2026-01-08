import ColorBends from '../ColorBends';

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
          Get in touch with us for more information about the FNJ SmartBox.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <p>Email: <a href="mailto:conradteamfjn@gmail.com" style={{ color: '#f4c430', textDecoration: 'none' }}>conradteamfjn@gmail.com</a></p>
          <p>Youtube Channel: <a href="https://youtu.be/rN--1ADAwNk" target="_blank" rel="noopener noreferrer" style={{ color: '#f4c430', textDecoration: 'none' }}>https://youtu.be/rN--1ADAwNk</a></p>
        </div>
      </div>
    </div>
  );
}
