import React, { useState, useEffect } from 'react';

interface Experience {
  date: string;
  title: string;
  location: string;
  note?: string;
}

const experiences: Experience[] = [
  {
    date: 'Octobre 2008 - Janvier 2021',
    title: 'Scolarité complète (primaire à seconde)',
    location: 'Lycée Français international Georges Pompidou, Dubaï',
  },
  {
    date: 'Janvier 2021 - Juin 2022',
    title: 'Bac spécialité physique-chimie, maths',
    location: 'Lycée Français international Gustave Eiffel, Maputo',
    note: 'Mention assez bien',
  },
  {
    date: 'Septembre 2022 - Avril 2023',
    title: 'Licence informatique',
    location: 'Université Claude Bernard Lyon 1',
  },
  {
    date: 'Octobre 2024 - Aujourd’hui',
    title: 'Formation développeur full stack',
    location: 'Ada Tech School, Lyon',
  },
];

const Parcours: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes growConnector {
          0% {
            height: 0;
          }
          100% {
            height: 30px;
          }
        }

        @keyframes pulseCircle {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(116, 123, 255, 0.7);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 8px 6px rgba(116, 123, 255, 0);
          }
        }
      `}</style>

      <div id='parcours' style={styles.wrapper}>
        {/* Wrapper centré */}
        <div style={{ width: '100%', textAlign: 'center' }}>
          <div
            style={styles.titleWrapper}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <h2 style={styles.title}>Mon Parcours</h2>
            <span
              style={{
                ...styles.underline,
                width: hover ? '100%' : '0%',
                transition: 'width 0.8s ease',
              }}
            />
          </div>
        </div>

        <div style={styles.timelineContainer}>
          <div style={styles.line} />
          {experiences.map((exp, i) => (
            <TimelineCard key={i} experience={exp} index={i} mounted={mounted} />
          ))}
        </div>
      </div>
    </>
  );
};

interface TimelineCardProps {
  experience: Experience;
  index: number;
  mounted: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ experience, index, mounted }) => {
  return (
    <div
      style={{
        ...styles.cardContainer,
        animation: mounted ? `fadeSlideUp 0.6s ease forwards` : undefined,
        animationDelay: mounted ? `${index * 0.25}s` : undefined,
        opacity: 0,
      }}
    >
      <div style={styles.card}>
        <p style={styles.date}>{experience.date}</p>
        <h3 style={styles.cardTitle}>{experience.title}</h3>
        <p style={styles.location}>{experience.location}</p>
        {experience.note && <p style={styles.note}>🎓 {experience.note}</p>}
      </div>
      <div
        style={{
          ...styles.connector,
          animation: mounted ? 'growConnector 0.5s ease forwards' : undefined,
          animationDelay: mounted ? `${0.6 + index * 0.25}s` : undefined,
          height: 0,
        }}
      />
      <div
        style={{
          ...styles.circle,
          animation: 'pulseCircle 2.5s ease-in-out infinite',
        }}
      />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
       padding: '120px 20px 40px',
    marginTop: '-80px',
    fontFamily: 'Arial, sans-serif',
    overflowX: 'auto',
    minHeight: '40vh',
  },
  titleWrapper: {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    paddingBottom: '0.25rem',
    marginBottom: '2rem',
    userSelect: 'none',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: '700',
    margin: 0,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '4px',
    backgroundColor: '#747bff',
    borderRadius: '2px',
  },
  timelineContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    minHeight: 280,
    paddingBottom: 20,
  },
  line: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#747bff',
    zIndex: 0,
    borderRadius: 2,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 180,
    marginRight: 40,
    textAlign: 'center',
    zIndex: 1,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
    padding: '14px 18px',
    minHeight: 90,
    boxSizing: 'border-box',
    marginBottom: 8,
  },
  connector: {
    width: 2,
    backgroundColor: '#747bff',
    zIndex: 1,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: '50%',
    backgroundColor: '#747bff',
    border: '2px solid white',
    marginTop: 2,
    zIndex: 2,
  },
  date: {
    fontSize: 13,
    color: '#222',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 6,
    color: '#111',
  },
  location: {
    fontSize: 15,
    color: '#222',
  },
  note: {
    fontStyle: 'italic',
    fontSize: 14,
    color: '#222',
    marginTop: 6,
  },
};

export default Parcours;
