import React, { useState } from 'react';

const About: React.FC = () => {
  const [hover, setHover] = useState(false);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = 'tanguycv.pdf';
    link.download = 'Tanguy_Jonqua_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const styles = {
    section: {
      maxWidth: '64rem', // ~1024px
      margin: '0 auto',
      padding: '4rem 1.5rem',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    containerMd: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    imageWrapper: {
      flexShrink: 0,
    },
    image: {
      width: '300px',
      height: '400px',
      maxWidth: '100%',
      objectFit: 'cover' as const,
      border: '7px solid #747bff',
    },
    text: {
      flex: 1,
      color: '#d1d5db',
      maxWidth: '600px',
    },
    titleWrapper: {
      position: 'relative' as const,
      display: 'inline-block',
      cursor: 'pointer',
      paddingBottom: '0.25rem',
      marginBottom: '1.5rem',
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: '700',
      margin: 0,
    },
    underline: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      height: '4px',
      backgroundColor: '#747bff',
      width: hover ? '100%' : '0%',
      transition: 'width 0.8s ease',
      borderRadius: '2px',
    },
    paragraph: {
      lineHeight: 1.625,
      marginTop: '1rem',
    },
    button: {
      marginTop: '1.5rem',
      padding: '0.5rem 1.5rem',
      backgroundColor: '#4B5563',
      color: 'white',
      fontWeight: '500',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease-in-out',
    }
  };

  return (
    <section id="about" style={styles.section}>
      <div
        style={{
          ...styles.container,
          ...(window.innerWidth >= 768 ? styles.containerMd : {}),
        }}
      >
        <div style={styles.imageWrapper}>
          <img
            src="/tanguy.JPG"
            alt="Photo de Tanguy Jonqua"
            style={styles.image}
          />
        </div>

        <div style={styles.text}>
          <div
            style={styles.titleWrapper}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <h2 style={styles.title}>À propos de moi</h2>
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
    gap: '1rem', // space between image and button
    marginTop: '2rem', // optional spacing from above content
  }}
>
  <img
    src="/cvSnap.png"
    alt="Photo de Tanguy Jonqua"
    style={{
      width: '150px',
      height: '200px',
      maxWidth: '100%',
      objectFit: 'cover',
      border: '2px solid #747bff',
      borderRadius: '4px', // optional for nicer edges
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // optional subtle shadow
    }}
  />
  <button
    onClick={handleDownloadCV}
    style={styles.button}
    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#374151')}
    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4B5563')}
  >
    Télécharger mon CV
  </button>
</div>

     
    </section>
  );
};

export default About;
