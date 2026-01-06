import DomeGallery from '../DomeGallery';
import PillNav from '../PillNav';
import logo from '/src/assets/logo.png';
export default function Gallery({ onNavClick }) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <nav style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000 }}>
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
          activeHref="/gallery"
          className="custom-nav"
          ease="elastic3.easeOut"
          baseColor="#1a1f3a"
          pillColor="#f4c430"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#ffffff"
          onNavClick={onNavClick}
        />
      </nav>
      <DomeGallery
        fit={1}
        minRadius={1000}
        maxVerticalRotationDeg={4}
        dragDampening={1}
        grayscale={false}
        segments={25}
      />
    </div>
  );
}