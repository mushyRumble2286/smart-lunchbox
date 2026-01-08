import ColorBends from '../ColorBends';
import logo from '/src/assets/logo.png';
import PillNav from '../PillNav';
import './team.css';

const teamMembers = [
    {
        name: "Nifemi Ogunsoto",
        role: "Software Engineer/Hardware Engineer",
        image: "/nife.jpeg",
        bio: "Builds the brains and the backbone—coding, wiring, and making smart tech actually work."
    },
    {
        name: "Jayden Chinedu-Okeke",
        role: "Product Designer",
        image: "/jayden.jpeg",
        bio: "Turns real-world problems into elegant, user-first designs that make innovation intuitive."
    },
    {
        name: "Favour Bernard-Ekwe",
        role: "Website Developer/Hardware Engineer",
        image: "/4.jpg",
        bio: "Builds both the user-facing experience and the engineering that makes it function seamlessly."
    },
    {
        name: "Emmanuel Chidiebere",
        role: "Mentor",
        image: "/emmanuel.jpeg",
        bio: "Guides the team with experience, insight, and strategic direction from idea to execution."
    }
];

function TeamCard({ member }) {
    const isFavour = member.name === "Favour Bernard-Ekwe";
    return (
        <div className={`team-card${isFavour ? ' favour-card' : ''}`}>
            <div className="team-card-inner">
                <div className={`team-image-container${isFavour ? ' favour-image-container' : ''}`}>
                    <img 
                        src={member.image} 
                        alt={member.name}
                        className={`team-image${isFavour ? ' favour-image' : ''}`}
                    />
                    <div className="team-image-overlay"></div>
                </div>
                <div className="team-info">
                    <h3 className="team-name">{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                    <div className="team-bio">
                        <p>{member.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Team({ onNavClick }) {
    return (
        <div className="team-container">
            <div className="team-background">
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
            </div>
            <nav className="team-nav">
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
                    activeHref="/team"
                    className="custom-nav"
                    ease="elastic3.easeOut"
                    baseColor="#1a1f3a"
                    pillColor="#f4c430"
                    hoveredPillTextColor="#ffffff"
                    pillTextColor="#ffffff"
                    onNavClick={onNavClick}
                />
            </nav>
            <div className="team-content">
                <div className="team-header">
                    <h1 className="team-title">Meet Our Team</h1>
                    <p className="team-subtitle">The passionate minds behind the FNJ SmartBox</p>
                </div>
                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <TeamCard key={index} member={member} />
                    ))}
                </div>
            </div>
        </div>
    );
}
