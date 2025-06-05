import React, { useState, useEffect } from "react";

const socials = [
  // {
  //   name: "Instagram",
  //   url: "https://instagram.com/tanguyjo",
  //   icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
  // },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/tanguyjonqua",
    icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
  },
  {
    name: "GitHub",
    url: "https://github.com/tanguyjo",
    icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
  },
];

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mgvyvvgj", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && (data.ok || data.success)) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      id="contact"
      style={{
        maxWidth: 900,
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 40,
        padding: "2rem",
        color: "#fff",
      }}
    >
      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          flex: 1,
          minWidth: 300,
          backgroundColor: "rgba(255, 255, 255, 0.1)", // subtle white transparent
          padding: 24,
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // lighter shadow
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
      >
        <h2 style={{ marginBottom: 24 }}>Contactez-moi</h2>
        <input
          type="text"
          name="name"
          placeholder="Votre nom"
          required
          style={inputStyle}
          disabled={status === "sending"}
        />
        <input
          type="email"
          name="email"
          placeholder="Votre email"
          required
          style={inputStyle}
          disabled={status === "sending"}
        />
        <textarea
          name="message"
          placeholder="Votre message"
          required
          rows={5}
          style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
          disabled={status === "sending"}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            ...buttonStyle,
            cursor: status === "sending" ? "not-allowed" : "pointer",
            backgroundColor: status === "sending" ? "#9999ff" : "#747bff",
          }}
        >
          {status === "sending" ? "Envoi..." : "Envoyer"}
        </button>

        {status === "success" && (
          <p style={{ color: "lightgreen", marginTop: 16, fontWeight: "600" }}>
            Merci pour votre message !
          </p>
        )}
        {status === "error" && (
          <p style={{ color: "tomato", marginTop: 16, fontWeight: "600" }}>
            Une erreur est survenue, veuillez réessayer.
          </p>
        )}
      </form>

      {/* Social / Contact Section */}
      <aside
        style={{
          flexBasis: 300,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          fontSize: 16,
          color: "#fff",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: 24,
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3>Retrouvez-moi sur</h3>
  <ul
  style={{
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  }}
>
  {socials.map(({ name, url, icon }) => (
    <li key={name}>
      <a href={url} target="_blank" rel="noopener noreferrer" style={socialLinkStyle}>
        <img
          src={icon}
          alt={name}
          style={{
            width: 28,
            height: 28,
            objectFit: "contain",
            animation: "floatIcon 3s ease-in-out infinite",
          }}
        />
        <span style={{ animation: "floatText 3s ease-in-out infinite" }}>{name}</span>
      </a>
    </li>
  ))}
</ul>

        <div>
          <h3>Contact direct</h3>
          <p>
            📧{" "}
            <a href="mailto:jonquatanguy@gmail.com" style={linkStyle}>
              jonquatanguy@gmail.com
            </a>
          </p>
          <p>
            📞{" "}
            <a href="tel:+33769125198" style={linkStyle}>
              +33 7 69 12 51 98
            </a>
          </p>
        </div>
      </aside>

      {/* Floating text keyframes */}
<style>{`
  @keyframes floatText {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  @keyframes floatIcon {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
`}</style>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 12,
  marginBottom: 16,
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 16,
  boxSizing: "border-box",
  transition: "border-color 0.3s ease",
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: 14,
  backgroundColor: "#747bff",
  color: "white",
  fontWeight: "bold",
  border: "none",
  borderRadius: 6,
  fontSize: 16,
  transition: "background-color 0.3s ease",
};

const socialLinkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "#747bff",
  fontWeight: "600",
  gap: 14,
  transition: "transform 0.3s ease, color 0.3s ease",
  cursor: "pointer",
};

const linkStyle: React.CSSProperties = {
  color: "#747bff",
  textDecoration: "none",
  transition: "color 0.3s ease",
};

export default ContactForm;
