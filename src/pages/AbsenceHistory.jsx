import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfessorDashboard.css'; // Reuse existing styles
import { FaBars } from 'react-icons/fa';

const AbsenceHistory = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const absenceData = [
    {
      date: 'LUNDI 09 MARS 2024',
      class: '2Bac',
      subject: 'Developpment',
      description: '',
      absences: ['MOHAMED LABJAOUI', 'AMINA GHIBA', 'HAMZA CNTOUF', 'SALMA NBIGA', 'AHMED MOUSSIF'],
    },
    {
      date: 'MARDI 10 MARS 2024',
      class: '2BAC',
      subject: 'RESEAU INFORMATIQUE',
      description: '',
      absences: ['MOHAMED LABJAOUI', 'AMINA GHIBA', 'HAMZA CNTOUF'],
    },
  ];

  return (
    <div className="professor-dashboard">
      <header className="dashboard-header">
        <div className="logo">GrifCentre</div>
        <div className="user-info">
          <span>prof. Grif Abdeali</span>
          <FaBars className="menu-icon" onClick={toggleMenu} />
        </div>
      </header>

      {showMenu && (
        <div className="dropdown-menu">
          <ul>
            <li onClick={() => navigate('/professor-dashboard')}>Mes classes</li>
            <li onClick={() => navigate('/absence-history')}>Historique d'absences</li>
            <li onClick={() => navigate('/upload-files')}>Upload files</li>
            <li onClick={() => navigate('/')}>Deconnection</li>
          </ul>
        </div>
      )}

      <div className="dashboard-content">
        <h2 className="section-title">HISTORIQUE D'ABSENCES:</h2>
        <div className="absence-table">
          <div className="table-header">
            <div className="header-cell">Date</div>
            <div className="header-cell">Classes</div>
            <div className="header-cell">Matier</div>
            <div className="header-cell">Description</div>
            <div className="header-cell">Liste d'absences</div>
          </div>
          {absenceData.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-cell date-cell">{item.date}</div>
              <div className="table-cell class-cell">{item.class}</div>
              <div className="table-cell subject-cell">{item.subject}</div>
              <div className="table-cell description-cell">{item.description}</div>
              <div className="table-cell absences-cell">
                {item.absences.map((name, i) => (
                  <div key={i}>{name}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="back-button" onClick={() => navigate('/professor-dashboard')}>Retour</button>
      </div>
    </div>
  );
};

export default AbsenceHistory;