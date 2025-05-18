import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { login, register } from '../lib/api.js';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = isLogin ? await login(formData) : await register(formData);
      localStorage.setItem('token', data.token);
      const decoded = jwtDecode(data.token);
      setUser(decoded);
      toast.success(isLogin ? 'Logged in successfully' : 'Registered successfully');
      navigate(decoded.role === 'admin' ? '/admin' : '/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: 20,
    },
    box: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      background: 'white',
      borderRadius: 12,
      overflow: 'hidden',
      maxWidth: 1000,
      width: '100%',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    },
    left: {
      width: isMobile ? '100%' : '50%',
      padding: 40,
      backgroundColor: '#f2f2f2',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    right: {
      width: isMobile ? '100%' : '50%',
      padding: 40,
      backgroundColor: '#fff',
    },
    header: {
      textAlign: 'center',
      marginBottom: 20,
    },
    logo: {
      height: 40,
      marginBottom: 10,
    },
    h2: {
      fontSize: 22,
      fontWeight: 'bold',
      margin: 0,
    },
    subtext: {
      color: '#666',
      fontSize: 14,
    },
    formGroup: {
      marginBottom: 15,
    },
    label: {
      display: 'block',
      marginBottom: 6,
      fontSize: 14,
      fontWeight: 500,
    },
    input: {
      width: '100%',
      padding: 10,
      border: '1px solid #ccc',
      borderRadius: 6,
      fontSize: 14,
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 13,
      color: '#666',
      marginBottom: 20,
    },
    forgot: {
      color: '#666',
      cursor: 'pointer',
    },
    button: {
      width: '100%',
      backgroundColor: '#6c5ce7',
      color: 'white',
      padding: 12,
      fontWeight: 'bold',
      border: 'none',
      borderRadius: 6,
      cursor: 'pointer',
      fontSize: 15,
    },
    toggle: {
      textAlign: 'center',
      fontSize: 13,
      marginTop: 16,
    },
    toggleBtn: {
      background: 'none',
      border: 'none',
      color: '#666',
      cursor: 'pointer',
      fontWeight: 600,
      marginLeft: 6,
    },
    benefitBox: {
      background: 'white',
      padding: 16,
      borderRadius: 8,
      border: '1px solid #ddd',
      fontSize: 13,
      color: '#333',
    },
    benefitTitle: {
      display: 'inline-block',
      backgroundColor: '#fff2b3',
      padding: '5px 10px',
      borderRadius: 20,
      fontWeight: 'bold',
      fontSize: 12,
      marginBottom: 10,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.left}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 15 }}>
            Welcome Back to <br /> Diamond Salon
          </h2>
          <p style={{ fontSize: 14, color: '#555', marginBottom: 25 }}>
            Sign in to your account to book appointments, view your appointment history, and manage your profile.
            Experience luxury at its finest.
          </p>
          <div style={styles.benefitBox}>
            <span style={styles.benefitTitle}>MEMBER BENEFITS</span>
            <ul style={{ paddingLeft: 20 }}>
              <li>✔ Easy online booking 24/7</li>
              <li>✔ Access to exclusive deals</li>
              <li>✔ Earn loyalty points for discounts</li>
              <li>✔ Appointment reminders via email</li>
            </ul>
          </div>
        </div>

        <div style={styles.right}>
          <div style={styles.header}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsan5_l_0wxznXJBfi2KNPSzFaXIntBu1R3w&s"
              alt="Logo"
              style={styles.logo}
            />
            <h2 style={styles.h2}>{isLogin ? 'Welcome Back' : 'Create Your Account'}</h2>
            <p style={styles.subtext}>
              {isLogin ? 'Sign in to access your account' : 'Register to start booking appointments'}
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            )}
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.footer}>
             
              {isLogin && <span style={styles.forgot}>Forgot password?</span>}
            </div>
            <button type="submit" style={styles.button}>
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
          <p style={styles.toggle}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={() => setIsLogin(!isLogin)} style={styles.toggleBtn}>
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
