import React, { useState } from 'react';

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
  const navStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    backgroundColor: '#1f2937', // gris foncé
    color: 'white',
    padding: '0.5rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between', // logo à gauche, nav à droite
    alignItems: 'center',
    height: '70px', // hauteur fixe pour ne pas grandir
    boxSizing: 'border-box',
  };

  const ulStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1.5rem',
    padding: 0,
    margin: 0,
    listStyle: 'none',
    fontSize: '1.2rem',
    alignItems: 'center',
  };

  return (
    <nav style={navStyle}>
      {/* Logo à gauche */}
      <img
        src="logoTJ.png"
        alt="Tanguy Jonqua"
        style={{
          height: '300px', // logo taille raisonnable
          width: 'auto',
          objectFit: 'contain',
          cursor: 'pointer',
        }}
      />

      {/* Navigation à droite */}
      <ul style={ulStyle}>
        {/* <li><NavLink href="#home">Home</NavLink></li> */}
        <li><NavLink href="#home">Home</NavLink></li>
        <li><NavLink href="#about">About</NavLink></li>
         <li><NavLink href="#parcours">Parcours</NavLink></li>
         <li><NavLink href='#competences'>Competences</NavLink></li>
        <li><NavLink href="#projects">Projects</NavLink></li>
        <li><NavLink href="#contact">Contact</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
