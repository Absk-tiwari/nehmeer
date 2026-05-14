import { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import '../styles/admin.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/workers')) return 'Workers';
    if (path.includes('/notifications')) return 'Push Notifications';
    if (path.includes('/settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <div className="admin-wrapper">
      {/* Overlay for mobile */}
      <div
        className={`admin-overlay ${sidebarOpen ? 'show' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <NavLink to="/admin" className="admin-logo">
            <div className="admin-logo-icon">
              <Icon icon="solar:shield-user-bold" />
            </div>
            <div className="admin-logo-text">
              Nehmeer <span>Admin</span>
            </div>
          </NavLink>
        </div>

        <nav className="admin-nav">
          <div className="admin-nav-section">
            <div className="admin-nav-title">Main</div>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon icon="solar:chart-2-bold-duotone" />
              Dashboard
            </NavLink>
          </div>

          <div className="admin-nav-section">
            <div className="admin-nav-title">Management</div>
            <NavLink
              to="/admin/workers"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon icon="solar:users-group-rounded-bold-duotone" />
              Workers
            </NavLink>
            <NavLink
              to="/admin/notifications"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon icon="solar:bell-bing-bold-duotone" />
              Push Notifications
            </NavLink>
          </div>

          <div className="admin-nav-section">
            <div className="admin-nav-title">System</div>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon icon="solar:settings-bold-duotone" />
              Settings
            </NavLink>
          </div>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-user-avatar">
              {adminUser.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="admin-user-details">
              <div className="admin-user-name">{adminUser.name || 'Admin'}</div>
              <div className="admin-user-role">Administrator</div>
            </div>
            <button
              className="admin-btn admin-btn-icon admin-btn-outline"
              onClick={handleLogout}
              title="Logout"
            >
              <Icon icon="solar:logout-2-outline" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header-left">
            <button
              className="admin-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Icon icon="solar:hamburger-menu-linear" width={24} />
            </button>
            <div className="admin-breadcrumb">
              <NavLink to="/admin">Admin</NavLink>
              <Icon icon="solar:alt-arrow-right-linear" />
              <span className="admin-breadcrumb-current">{getPageTitle()}</span>
            </div>
          </div>
          <div className="admin-header-right">
            <button className="admin-header-btn">
              <Icon icon="solar:bell-linear" width={20} />
              <span className="badge" />
            </button>
            <button className="admin-header-btn" onClick={handleLogout}>
              <Icon icon="solar:logout-2-linear" width={20} />
            </button>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
