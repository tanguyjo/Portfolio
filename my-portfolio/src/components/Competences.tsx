import React, { useState, useEffect, useRef } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Tilt from "react-parallax-tilt";

interface Skill {
  name: string;
  icon: string;
  proficiency?: number;
  description?: string;
}

interface CompetenceCategory {
  category: string;
  skills: Skill[];
}

interface Langue {
  nom: string;
  niveau: string;
}

const competences: CompetenceCategory[] = [
  {
    category: "FrontEnd",
    skills: [
      { name: "JS", icon: "js.png", proficiency: 75, description: "JavaScript" },
      { name: "TS", icon: "ts.png", proficiency: 45, description: "TypeScript" },
      { name: "HTML", icon: "html.png", proficiency: 90, description: "HTML5" },
      { name: "CSS", icon: "css.png", proficiency: 80, description: "CSS3" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.JS", icon: "nodejs.png", proficiency: 80, description: "Node.js" },
      { name: "SQL", icon: "sql.png", proficiency: 75, description: "SQL" },
      { name: "MySQL", icon: "mysql.png", proficiency: 70, description: "MySQL" },
      { name: "PostgreSQL", icon: "postgresql.png", proficiency: 70, description: "PostgreSQL" },
      { name: "SQLite", icon: "sqlite.png", proficiency: 60, description: "SQLite" },
      { name: "PHP", icon: "php.png", proficiency: 75, description: "PHP" },
      { name: "Java", icon: "java.png", proficiency: 40, description: "Java" },
      { name: "Go", icon: "go.png", proficiency: 60, description: "Go" },
    ],
  },
  {
    category: "Frameworks",
    skills: [
      { name: "Vue.JS", icon: "vuejs.png", proficiency: 80, description: "Vue.js" },
      { name: "React", icon: "react.png", proficiency: 30, description: "React" },
      { name: "Laravel", icon: "laravel.png", proficiency: 70, description: "Laravel" },
      { name: "Tailwind", icon: "tailwind.png", proficiency: 45, description: "Tailwind" },
    ],
  },
];

const langues: Langue[] = [
  { nom: "Français", niveau: "Langue maternelle" },
  { nom: "Anglais", niveau: "Langue maternelle" },
  { nom: "Portugais", niveau: "Intermédiaire – compréhension et expression orale" },
  { nom: "Espagnol", niveau: "Débutant avancé – bases solides, lecture et expression simple" },
  { nom: "Arabe", niveau: "Débutant – bases, lecture et écriture" },
];

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    padding: "120px 20px 40px",
    marginTop: "-80px",
    maxWidth: 1100,
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexWrap: "wrap",
    gap: 60,
    justifyContent: "center",
  },
  leftColumn: {
    flex: "1 1 60%",
    minWidth: 300,
  },
  rightColumn: {
    flex: "1 1 30%",
    minWidth: 250,
    color: "#ffffff",
  },
  headingWrapper: {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
    paddingBottom: "0.25rem",
    marginBottom: "2rem",
    userSelect: "none",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    margin: 0,
    color: "#ffffff",
  },
  underline: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "4px",
    backgroundColor: "#747bff",
    borderRadius: "2px",
  },
  categoryTabs: {
    display: "flex",
    gap: 12,
    marginBottom: 20,
  },
  tabButton: (active: boolean): React.CSSProperties => ({
    cursor: "pointer",
    padding: "8px 20px",
    fontWeight: active ? "700" : "500",
    backgroundColor: active ? "#747bff" : "transparent",
    color: active ? "#fff" : "#ccc",
    borderRadius: 8,
    border: "none",
    userSelect: "none",
    transition: "background-color 0.3s ease",
  }),
  categoryContainer: {
    marginBottom: 32,
  },
  categoryTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: 12,
    color: "#ffffff",
  },
  skillsList: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
  },
  skillItem: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f5f7ff",
    padding: "8px 12px",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 500,
    color: "#222",
    boxShadow: "0 2px 6px rgba(116, 123, 255, 0.2)",
    cursor: "default",
    userSelect: "none",
    transformStyle: "preserve-3d",
    perspective: 1000,
  },
  skillIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    objectFit: "contain",
  },
  langueList: {
    listStyle: "none",
    padding: 0,
    marginTop: 16,
    fontSize: 16,
    color: "#ddd",
    lineHeight: "1.8",
  },
  progressBarBackground: {
    width: 100,
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    marginLeft: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#747bff",
    borderRadius: 8,
  },
};

const Competences: React.FC = () => {
  const [hoverComp, setHoverComp] = useState(false);
  const [hoverLangue, setHoverLangue] = useState(false);
  const [inView, setInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState(competences[0].category);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const currentCompetence = competences.find((c) => c.category === activeCategory);

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
        .skill-animate {
          animation: fadeSlideUp 0.6s ease forwards;
        }
        .skill-item:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
          z-index: 1;
        }
      `}</style>

      <section id="competences" ref={sectionRef} style={styles.wrapper}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          <div
            style={styles.headingWrapper}
            onMouseEnter={() => setHoverComp(true)}
            onMouseLeave={() => setHoverComp(false)}
          >
            <h2 style={styles.heading}>Compétences</h2>
            <span
              style={{
                ...styles.underline,
                width: hoverComp ? "100%" : "0%",
                transition: "width 0.8s ease",
              }}
            />
          </div>

          {/* Category filter tabs */}
          <div style={styles.categoryTabs}>
            {competences.map(({ category }) => (
              <button
                key={category}
                style={styles.tabButton(category === activeCategory)}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {currentCompetence && (
            <div style={styles.categoryContainer}>
              <h3 style={styles.categoryTitle}>{currentCompetence.category}</h3>
              <ul style={styles.skillsList}>
                {currentCompetence.skills.map(({ name, icon, proficiency, description }, index) => (
                  <Tippy key={name} content={description || ""} delay={200} placement="top" arrow={true}>
  <div style={{ display: "inline-block" }}>
    <Tilt
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      glareEnable={true}
      glareMaxOpacity={0.2}
      scale={1.05}
      transitionSpeed={400}
      style={{ borderRadius: 8, display: "inline-block" }}
    >
      <li
        style={{
          ...styles.skillItem,
          animationDelay: `${index * 0.1}s`,
        }}
        className={`skill-item ${inView ? "skill-animate" : ""}`}
        tabIndex={0}
      >
        <img src={icon} alt={name} style={styles.skillIcon} />
        {name}
        {proficiency !== undefined && (
          <div style={styles.progressBarBackground}>
            <div
              style={{
                ...styles.progressBarFill,
                width: `${proficiency}%`,
                transition: "width 1s ease",
              }}
            />
          </div>
        )}
      </li>
    </Tilt>
  </div>
</Tippy>

                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          <div
            style={styles.headingWrapper}
            onMouseEnter={() => setHoverLangue(true)}
            onMouseLeave={() => setHoverLangue(false)}
          >
            <h2 style={styles.heading}>Langues parlées</h2>
            <span
              style={{
                ...styles.underline,
                width: hoverLangue ? "100%" : "0%",
                transition: "width 0.8s ease",
              }}
            />
          </div>
              
          <ul style={styles.langueList}>
            {langues.map((langue) => (
              <li key={langue.nom}>
                <strong>{langue.nom}</strong> — {langue.niveau}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Competences;
