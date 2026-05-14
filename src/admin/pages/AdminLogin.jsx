import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import adminApi from '../api/adminApi';
import { fetchAdminWorkers } from '../../redux/slices/adminSlice';
import '../styles/admin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    mobile: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.mobile || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await adminApi.login(formData);
      if (response.data?.token) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.user || { name: 'Admin' }));
        dispatch(fetchAdminWorkers());
        toast.success('Login successful');
        navigate('/admin');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-login-logo">
              <div className="admin-logo-icon">
                <Icon icon="solar:shield-user-bold" />
              </div>
            </div>
            <h1 className="admin-login-title">Admin Panel</h1>
            <p className="admin-login-subtitle">Sign in to manage your platform</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="admin-form-group">
              <label className="admin-form-label required">Email Address</label>
              <div className="admin-input-icon">
                <Icon icon="solar:letter-linear" className="input-icon" />
                <input
                  type="number"
                  name="mobile"
                  className="admin-form-input"
                  placeholder="+91"
                  value={formData.mobile}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label required">Password</label>
              <div className="admin-input-icon">
                <Icon icon="solar:lock-linear" className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="admin-form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon icon={showPassword ? 'solar:eye-closed-linear' : 'solar:eye-linear'} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="admin-btn admin-btn-primary admin-btn-lg admin-login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="admin-spinner-sm" />
                  Signing in...
                </>
              ) : (
                <>
                  <Icon icon="solar:login-2-bold" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <p>Protected area. Authorized personnel only.</p>
          </div>
        </div>

        <div className="admin-login-decoration">
          <div className="decoration-circle circle-1" />
          <div className="decoration-circle circle-2" />
          <div className="decoration-circle circle-3" />
        </div>
      </div>

      <style>{`
        .admin-login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          padding: 1rem;
          position: relative;
          overflow: hidden;
        }

        .admin-login-container {
          position: relative;
          z-index: 1;
        }

        .admin-login-card {
          background: white;
          border-radius: 20px;
          padding: 2.5rem;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
        }

        .admin-login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .admin-login-logo {
          display: flex;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .admin-login-logo .admin-logo-icon {
          width: 64px;
          height: 64px;
          font-size: 1.75rem;
        }

        .admin-login-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.5rem 0;
        }

        .admin-login-subtitle {
          font-size: 0.9rem;
          color: #64748b;
          margin: 0;
        }

        .admin-login-form {
          margin-bottom: 1.5rem;
        }

        .admin-input-icon {
          position: relative;
        }

        .admin-input-icon .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          width: 18px;
          height: 18px;
        }

        .admin-input-icon .admin-form-input {
          padding-left: 2.75rem;
          padding-right: 2.75rem;
        }

        .password-toggle {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0.25rem;
        }

        .password-toggle:hover {
          color: #1e293b;
        }

        .admin-login-btn {
          width: 100%;
          margin-top: 0.5rem;
        }

        .admin-spinner-sm {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: admin-spin 0.8s linear infinite;
        }

        .admin-login-footer {
          text-align: center;
        }

        .admin-login-footer p {
          font-size: 0.8rem;
          color: #94a3b8;
          margin: 0;
        }

        .admin-login-decoration {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .decoration-circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%);
        }

        .circle-1 {
          width: 400px;
          height: 400px;
          top: -200px;
          right: -100px;
        }

        .circle-2 {
          width: 300px;
          height: 300px;
          bottom: -150px;
          left: -100px;
        }

        .circle-3 {
          width: 200px;
          height: 200px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        @media (max-width: 480px) {
          .admin-login-card {
            padding: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
