import React, { useState, useEffect } from 'react';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  const [hover, setHover] = useState(false);

  const linkStyle: React.CSSProperties = {
    color: 'white',
    textDecoration: 'none',
    position: 'relative',
    paddingBottom: '4px',
    cursor: 'pointer',
    display: 'inline-block',
  };

  const underlineStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: hover ? '100%' : '0',
    height: '3px',
    backgroundColor: '#747bff',
    transform: 'translateX(-50%)',
    transition: 'width 0.3s ease',
    borderRadius: '2px',
  };

  return (
    <a
      href={href}
      style={linkStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      <span style={underlineStyle} />
    </a>
  );
};

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // breakpoint at 768px
      if (window.innerWidth >= 768) setMenuOpen(false); // close menu if resizing to desktop
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    backgroundColor: '#2d2d2d',
    color: 'white',
    padding: '0.5rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px',
    boxSizing: 'border-box',
  };

const ulStyle: React.CSSProperties = {
  display: isMobile ? 'flex' : 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  gap: isMobile ? '1rem' : '1.5rem',
  padding: 0,
  margin: 0,
  listStyle: 'none',
  fontSize: '1.2rem',
  alignItems: 'center',
  position: isMobile ? 'absolute' : 'static',
  top: isMobile ? '70px' : undefined,
  right: isMobile ? '0' : undefined,
  backgroundColor: isMobile ? '#2d2d2d' : undefined,
  width: isMobile ? '100%' : undefined,

  maxHeight: isMobile ? (menuOpen ? '300px' : '0') : 'none', // adjust maxHeight for full menu height
  overflow: 'hidden',
  transition: 'max-height 0.3s ease',
};

  const hamburgerStyle: React.CSSProperties = {
    display: isMobile ? 'block' : 'none',
    cursor: 'pointer',
    width: '30px',
    height: '25px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const barStyle: React.CSSProperties = {
    height: '4px',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '2px',
  };

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <img
        src="logoTJ.png"
        alt="Tanguy Jonqua"
        style={{
          height: '250px', // smaller on mobile
          width: 'auto',
          objectFit: 'contain',
          cursor: 'pointer',
        }}
      />

      {/* Hamburger menu button */}
 <div
  style={hamburgerStyle}
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label="Toggle menu"
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter') setMenuOpen(!menuOpen);
  }}
>
  <img
    src="list.png"  // your icon image path here
    alt="Menu"
    style={{ width: '30px', height: '25px', objectFit: 'contain', pointerEvents: 'none' }}
  />
</div>

      {/* Navigation links */}
      <ul style={ulStyle}>
        <li><NavLink href="#home">Home</NavLink></li>
        <li><NavLink href="#about">About</NavLink></li>
        <li><NavLink href="#parcours">Parcours</NavLink></li>
        <li><NavLink href="#competences">Competences</NavLink></li>
        <li><NavLink href="#projects">Projets</NavLink></li>
        <li><NavLink href="#contact">Contact</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
