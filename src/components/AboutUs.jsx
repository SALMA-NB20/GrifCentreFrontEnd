import React from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <h2 className="about-title">À PROPOS DE NOUS</h2>
        <div className="about-content">
          <p>
            Bienvenue à GrifCentre, votre partenaire de confiance pour la formation professionnelle et 
            le développement des compétences. Notre centre s'engage à offrir une éducation de qualité et une 
            formation pratique dans divers domaines afin d'aider les individus et les professionnels à atteindre leurs 
            objectifs de carrière.
          </p>
          <p>
            Avec une équipe de formateurs expérimentés et un environnement d'apprentissage dynamique, nous 
            proposons des programmes adaptés aux exigences du marché du travail en constante évolution. Que 
            vous souhaitiez acquérir de nouvelles compétences, démarrer une nouvelle carrière ou évoluer dans 
            votre domaine, nous sommes là pour vous accompagner à chaque étape.
          </p>
          <p>
            Rejoignez-nous et préparez-vous à un avenir prometteur !
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;