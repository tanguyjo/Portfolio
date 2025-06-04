import React, { useState, useEffect } from "react";

const socials = [
  {
    name: "Instagram",
    url: "https://instagram.com/tanguyjo",
    icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
  },
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

  // Listen to screen width changes
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
        style={{ flex: 1, minWidth: 300 }}
        noValidate
      >
        <h2>Contactez-moi</h2>
        {/* Inputs and button same as before */}
        {/* ... */}
        <input
          type="text"
          name="name"
          placeholder="Votre nom"
          required
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 12,
            borderRadius: 4,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Votre email"
          required
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 12,
            borderRadius: 4,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />
        <textarea
          name="message"
          placeholder="Votre message"
          required
          rows={5}
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 12,
            borderRadius: 4,
            border: "1px solid #ccc",
            fontSize: 16,
            resize: "vertical",
          }}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            width: "100%",
            padding: 12,
            backgroundColor: "#747bff",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: 4,
            cursor: status === "sending" ? "not-allowed" : "pointer",
            fontSize: 16,
          }}
        >
          {status === "sending" ? "Envoi..." : "Envoyer"}
        </button>

        {status === "success" && (
          <p style={{ color: "green", marginTop: 12 }}>
            Merci pour votre message !
          </p>
        )}
        {status === "error" && (
          <p style={{ color: "red", marginTop: 12 }}>
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
          gap: 20,
          fontSize: 16,
          color: "#fff",
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
            gap: 16,
          }}
        >
          {socials.map(({ name, url, icon }) => (
            <li key={name}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "#747bff",
                  fontWeight: "600",
                  gap: 12,
                }}
              >
                <img
                  src={icon}
                  alt={name}
                  style={{ width: 28, height: 28, objectFit: "contain" }}
                />
                {name}
              </a>
            </li>
          ))}
        </ul>

        <div>
          <h3>Contact direct</h3>
          <p>
            📧{" "}
            <a
              href="mailto:jonquatanguy@gmail.com"
              style={{ color: "#747bff", textDecoration: "none" }}
            >
              jonquatanguy@gmail.com
            </a>
          </p>
          <p>
            📞{" "}
            <a
              href="tel:+33769125198"
              style={{ color: "#747bff", textDecoration: "none" }}
            >
              +33 7 69 12 51 98
            </a>
          </p>
        </div>
      </aside>
    </div>
  );
};

export default ContactForm;
