import React, { useState } from "react";

interface Skill {
  name: string;
  icon: string;
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
      { name: "JS", icon: "js.png" },
      { name: "TS", icon: "ts.png" },
      { name: "HTML", icon: "html.png" },
      { name: "CSS", icon: "css.png" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.JS", icon: "nodejs.png" },
      { name: "SQL", icon: "sql.png" },
      { name: "MySQL", icon: "mysql.png" },
      { name: "PostgreSQL", icon: "postgresql.png" },
      { name: "SQLite", icon: "sqlite.png" },
      { name: "PHP", icon: "php.png" },
      { name: "Java", icon: "java.png" },
      { name: "Go", icon: "go.png" },
      { name: "C#", icon: "csharp.png" },
    ],
  },
  {
    category: "Frameworks",
    skills: [
      { name: "Vue.JS", icon: "vuejs.png" },
      { name: "React", icon: "react.png" },
      { name: "Laravel", icon: "laravel.png" },
      { name: "Tailwind", icon: "tailwind.png" },
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
};

const Competences: React.FC = () => {
  const [hoverComp, setHoverComp] = useState(false);
  const [hoverLangue, setHoverLangue] = useState(false);

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
      `}</style>

      <section id="competences" style={styles.wrapper}>
        {/* Colonne gauche : Compétences */}
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

          {competences.map(({ category, skills }) => (
            <div key={category} style={styles.categoryContainer}>
              <h3 style={styles.categoryTitle}>{category}</h3>
              <ul style={styles.skillsList}>
                {skills.map(({ name, icon }) => (
                  <li key={name} style={styles.skillItem}>
                    <img src={icon} alt={name} style={styles.skillIcon} />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Colonne droite : Langues */}
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
