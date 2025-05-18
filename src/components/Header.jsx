import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Import the CSS file

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setMenuOpen(false); // Close menu on logout
    navigate('/');
  };

  const handleLinkClick = () => {
    setMenuOpen(false); // Close menu when a link is clicked
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToJgDtjN7434osGkwuutM0nIw5KjZHkfIKJQ&s"
            alt="Diamond Salon Logo"
            className="logo-img"
          />
          <Link to="/" className="logo-text" onClick={handleLinkClick}>
          Diamond Saloon
          </Link>
        </div>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
            <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
            <li><Link to="/services" onClick={handleLinkClick}>Services</Link></li>
            <li><Link to="/booking" onClick={handleLinkClick}>Booking</Link></li>
            <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <li><Link to="/admin" onClick={handleLinkClick}>Admin</Link></li>
                )}
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/login" className="login-link" onClick={handleLinkClick}>Login</Link></li>
            )}
          </ul>
        </nav>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;