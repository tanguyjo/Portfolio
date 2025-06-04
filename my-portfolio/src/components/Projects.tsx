import React, { useState } from "react";

// Type pour un projet
type Project = {
  id: number;
  title: string;
  images: string[];
  description: JSX.Element;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Art Quiz",
    images: ["quiz1.png", "quiz2.png", "quiz3.png", "quiz4.png", "quiz5.png"],
    description: (
      <>
        Développement d’une application web de quiz à choix multiples<br />
        <strong>Front-end</strong> : HTML, CSS, JavaScript<br />
      </>
    ),
  },
  {
    id: 2,
    title: "Ventes de Meubles",
    images: [
      "HomePage.png",
      "HomePageMeubles.png",
      "meuble3.png",
      "meuble4.png",
      "meuble5.png",
      "meuble6.png",
      "Panier.png",
    ],
    description: (
      <>
        Plateforme de gestion d’un magasin de meubles sur lequel des utilisateurs (admin) interagissent avec le stock et des utilisateurs (clients) s'inscrivent et se connectent.<br />
        <strong>Back-end</strong> : Laravel (PHP)<br />
        <strong>Front-end</strong> : Vue.js (JavaScript), Tailwind (CSS)<br />
        <strong>Base de données</strong> : MySQL
      </>
    ),
  },
  {
    id: 3,
    title: "Microblogging Platform",
    images: ["micro1.png", "micro2.png", "micro3.png", "micro4.png", "micro5.png", "micro6.png"],
    description: (
      <>
        Une plateforme de microblogging moderne avec une API RESTful et une interface utilisateur réactive.<br />
        <strong>Back-end</strong> : Laravel 10 (PostgreSQL)<br />
        <strong>Front-end</strong> : Vue 3, TypeScript, Tailwind (CSS)<br />
        <strong>Base de données</strong> : MySQL
      </>
    ),
  },
  {
    id: 4,
    title: "Application Back Office",
    images: ["lito1.png", "lito2.png", "lito3.png", "lito4.png", "lito5.png"],
    description: (
      <>
        Plateforme de gestion d’un magasin de meubles sur lequel des utilisateurs (admin) interagissent avec le stock et des utilisateurs (clients) s'inscrivent et se connectent.<br />
        <strong>Back-end</strong> : PHP<br />
        <strong>Front-end</strong> : HTML, Tailwind (CSS)<br />
        <strong>Base de données</strong> : MySQL
      </>
    ),
  },
];

const styles = {
  section: {
    padding: "120px 20px 40px",
    marginTop: "-80px",
  },
  headingWrapper: {
    position: "relative" as const,
    display: "inline-block",
    cursor: "pointer",
    paddingBottom: "0.25rem",
    marginBottom: "2rem",
    userSelect: "none" as const,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center" as const,
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    margin: 0,
    color: "#ffffff",
    textAlign: "center" as const,
  },
  underline: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    height: "4px",
    backgroundColor: "#747bff",
    borderRadius: "2px",
  },
  grid: {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },
  card: {
    backgroundColor: "rgba(120, 120, 120, 0.4)",
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column" as const,
    position: "relative" as const,
  },
  imageContainer: {
    position: "relative" as const,
    width: "100%",
    height: "12rem",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain" as const,
    display: "block",
  },
  arrow: {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    border: "none",
    padding: "0.3rem",
    cursor: "pointer",
    zIndex: 2,
    borderRadius: "9999px",
    userSelect: "none" as const,
    transition: "background-color 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  leftArrow: {
    left: "0.75rem",
  },
  rightArrow: {
    right: "0.75rem",
  },
  content: {
    padding: "1rem",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
    color: "#747bff",
  },
  description: {
    fontSize: "0.9rem",
    color: "#ffffff",
    whiteSpace: "pre-line" as const,
  },
};

const ProjectCard = ({ project }: { project: Project }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img
          src={project.images[currentImage]}
          alt={project.title}
          style={styles.image}
          onClick={openModal}
        />
        {project.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              style={{ ...styles.arrow, ...styles.leftArrow }}
              aria-label="Previous image"
            >
              <img src="/arrowleft.png" alt="Previous" style={{ width: 32, height: 32 }} />
            </button>
            <button
              onClick={nextImage}
              style={{ ...styles.arrow, ...styles.rightArrow }}
              aria-label="Next image"
            >
              <img src="/arrowright.png" alt="Next" style={{ width: 32, height: 32 }} />
            </button>
          </>
        )}
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{project.title}</h3>
        <div style={styles.description}>{project.description}</div>
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "1rem",
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={project.images[currentImage]}
              alt={project.title}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "1rem",
                objectFit: "contain",
                zIndex: 1000,
                display: "block",
              }}
            />
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "rgba(255, 0, 0, 0.3)",
                border: "none",
                cursor: "pointer",
                borderRadius: "50%",
                width: "2.5rem",
                height: "2.5rem",
                padding: 0,
                zIndex: 1100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.3s ease",
              }}
              aria-label="Close modal"
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255, 255, 255, 0.6)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)")
              }
            >
              <img
                src="/exit.png"
                alt="Close"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const [hover, setHover] = useState(false);

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

      <section style={styles.section} id="projects">
        <div style={{ textAlign: "center" }}>
          <div
            style={styles.headingWrapper}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <h2 style={styles.heading}>Projets</h2>
            <span
              style={{
                ...styles.underline,
                width: hover ? "100%" : "0%",
                transition: "width 0.8s ease",
              }}
            />
          </div>
        </div>
        <div style={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;
