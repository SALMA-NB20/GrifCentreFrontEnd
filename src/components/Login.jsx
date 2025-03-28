import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock database for demonstration
  const mockDatabase = {
    students: [
      { email: 'student@grif.com', password: 'student123' },
      { email: 'mohamed@grif.com', password: 'mohamed123' }
    ],
    professors: [
      { email: 'professor@grif.com', password: 'professor123' },
      { email: 'abdeali@grif.com', password: 'abdeali123' }
    ]
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Check if user is a student
    const student = mockDatabase.students.find(
      user => user.email === email && user.password === password
    );

    // Check if user is a professor
    const professor = mockDatabase.professors.find(
      user => user.email === email && user.password === password
    );

    if (student) {
      // Redirect to student dashboard
      navigate('/dashboard');
    } else if (professor) {
      // Redirect to professor dashboard
      navigate('/professor-dashboard');
    } else {
      // Show error message
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-container">
          <h1 className="grif-text">GRIF</h1>
          <div className="centre-box">CENTRE</div>
        </div>
      </div>
      <div className="login-right">
        <div className="login-form-container">
          <h2 className="lets-connect">
            LET'S <span className="connect-text">connect</span>
          </h2>
          <div className="avatar-icon">
            <div className="avatar-circle"></div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Email" 
                className="form-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Password" 
                className="form-input" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

