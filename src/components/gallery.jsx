import DomeGallery from '../DomeGallery';
export default function Gallery({ onNavClick }) {
  return (
    <div style={{ width: '100vw', height: '100vh' }} className="font-['Google_Sans']">
      <h1 className="page-heading">Photos</h1>
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