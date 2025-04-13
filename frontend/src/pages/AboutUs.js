import React from "react";

const AboutUs = () => {
  const styles = {
    container: {
      padding: "2rem",
      maxWidth: "800px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      fontSize: "2.5rem",
      marginBottom: "1rem",
      color: "#333",
    },
    paragraph: {
      fontSize: "1.1rem",
      lineHeight: "1.8",
      color: "#555",
    },
  };
  return (
    <div>
      <header>
        <h1>About Us</h1>
        <p>Learn more about who we are and what we do</p>
      </header>
      <section className="about">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            We aim to provide the best services to our customers by delivering
            high-quality products and excellent customer support. Our journey
            started with a simple idea and has grown into a passion-driven
            organization.
          </p>
        </div>
      </section>
      <section className="team">
        <div className="container">
          <h2>Meet the Team</h2>
          <div className="team-members">
            <div className="card">
              <img src="https://via.placeholder.com/150" alt="Team Member" />
              <h3>Jane Doe</h3>
              <p>Founder &amp; CEO</p>
            </div>
            <div className="card">
              <img src="https://via.placeholder.com/150" alt="Team Member" />
              <h3>John Smith</h3>
              <p>Lead Developer</p>
            </div>
            <div className="card">
              <img src="https://via.placeholder.com/150" alt="Team Member" />
              <h3>Emily Rose</h3>
              <p>Marketing Head</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
