import React, { useState, useEffect } from 'react';

const About: React.FC = () => {
  const [hoverTitle, setHoverTitle] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById('about');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setIsVisible(true);
          window.removeEventListener('scroll', onScroll);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = 'tanguycv.pdf';
    link.download = 'Tanguy_Jonqua_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const neonGlow = {
    boxShadow: '0 0 20px 5px #8b5cf6',
    borderColor: '#a78bfa',
    borderRadius: '12px',
    transform: 'translateY(-5px) scale(1.03)',
    transition: 'transform 0.4s ease',
  };

  const styles = {
    section: {
      maxWidth: '64rem',
      margin: '0 auto',
      padding: '4rem 1.5rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
      color: '#d1d5db',
    },
    container: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      gap: '2.5rem',
      alignItems: 'center',
      flexWrap: 'wrap' as 'wrap',
    },
    containerMd: {
      flexDirection: 'row' as 'row',
      flexWrap: 'wrap' as 'wrap',
    },
    imageWrapper: {
      flexShrink: 0,
      cursor: 'default',
      border: '7px solid #747bff',
      ...neonGlow,
    },
    image: {
      width: '300px',
      height: '400px',
      maxWidth: '100%',
      objectFit: 'cover',
      borderRadius: '1px',},
    text: {
      flex: 1,
      maxWidth: '600px',
      fontSize: '1rem',
      lineHeight: 1.6,
      userSelect: 'text' as 'text',
    },
    titleWrapper: {
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',
      paddingBottom: '0.25rem',
      marginBottom: '1.5rem',
      color: '#d1d5db',
      fontWeight: '700',
      fontSize: '1.875rem',
    },
    underline: {
      position: 'absolute' as 'absolute',
      bottom: 0,
      left: 0,
      height: '4px',
      backgroundColor: '#747bff',
      borderRadius: '2px',
      width: hoverTitle ? '100%' : '0%',
      transition: 'width 0.8s ease',
    },
    paragraph: {
      marginTop: '1rem',
    },
    button: {
      marginTop: '2rem',
      padding: '0.75rem 2rem',
      backgroundColor: '#4B5563',
      color: 'white',
      fontWeight: 600,
      borderRadius: '0.75rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      userSelect: 'none' as 'none',
    },
    buttonHover: {
      backgroundColor: '#374151',
    },
    previewCv: {
      width: '150px',
      height: '200px',
      maxWidth: '100%',
      objectFit: 'cover',
      border: '2px solid #747bff',
      borderRadius: '8px',
      ...neonGlow,
    },
  };

  return (
    <section id="about" style={styles.section}>
      <div
        style={{
          ...styles.container,
          ...(typeof window !== 'undefined' && window.innerWidth >= 768 ? styles.containerMd : {}),
        }}
      >
        <div
          style={styles.imageWrapper}
          aria-label="Photo de Tanguy Jonqua"
        >
          <img src="/tanguy.JPG" alt="Photo de Tanguy Jonqua" style={styles.image} />
        </div>

        <div style={styles.text}>
          <div
            style={styles.titleWrapper}
            onMouseEnter={() => setHoverTitle(true)}
            onMouseLeave={() => setHoverTitle(false)}
            aria-label="Section à propos de moi"
          >
            À propos de moi
            <span style={styles.underline} />
          </div>

          <p style={styles.paragraph}>
            Je suis Tanguy Jonqua, développeur web en formation à Ada Tech School.
            J’ai acquis de solides compétences en HTML, CSS, JavaScript, TypeScript, PHP, MySQL,
            ainsi qu’avec des frameworks comme Vue.js et React. J’aime créer des sites web
            réactifs et intuitifs, en apportant des solutions simples et efficaces.
          </p>
          <p style={styles.paragraph}>
            Je recherche actuellement une alternance de 12 mois à partir de septembre 2025,
            avec 4 jours en entreprise et 1 jour en formation. Curieux et adaptable, je suis
            motivé à relever de nouveaux défis pour progresser en développement full-stack,
            prêt à m’investir pleinement dans une équipe dynamique, partout en France.
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        <img
          src="/cvSnap.png"
          alt="Aperçu CV Tanguy Jonqua"
          style={styles.previewCv}
          aria-label="Aperçu du CV de Tanguy Jonqua"
        />
        <button
          onClick={handleDownloadCV}
          style={{
            ...styles.button,
            ...(btnHover ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          Télécharger mon CV
        </button>
      </div>
    </section>
  );
};

export default About;
