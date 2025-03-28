import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfessorDashboard.css'; // Reuse existing styles
import { FaBars } from 'react-icons/fa'; // Import menu icon

const UploadFiles = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="professor-dashboard">
      <header className="dashboard-student-header">
        <div className="logo">GrifCentre</div>
        <div className="user-info">
          <span>prof. Grif Abdeali</span>
          <FaBars className="menu-icon" onClick={toggleMenu} /> {/* Menu icon */}
        </div>
      </header>

      {showMenu && (
        <div className="dropdown-menu">
          <ul>
            <li onClick={() => navigate('/professor-dashboard')}>Mes classes</li>
            <li onClick={() => navigate('/absence-history')}>Historique d'absences</li>
            <li onClick={() => navigate('/upload-files')}>Upload files</li>
          </ul>
        </div>
      )}

      <div className="dashboard-content">
        <div className="upload-container">
          <h2 className="section-title">UPLOAD FILES:</h2>
          <form className="upload-form">
            <div className="form-group">
              <label htmlFor="class-name">Nom classe :</label>
              <input type="text" id="class-name" name="class-name" />
            </div>
            <div className="form-group">
              <label htmlFor="file-upload">Upload File :</label>
              <input type="file" id="file-upload" name="file-upload" />
            </div>
            <button type="submit" className="save-button">Envoyer</button>
          </form>
        </div>
      </div>
      <button className="back-button" onClick={() => window.history.back()}>Retour</button>
    </div>
  );
};

export default UploadFiles;
