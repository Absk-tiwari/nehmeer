import { useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import { fetchAdminWorkers } from '../../redux/slices/adminSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { workers, loading, lastFetched } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!lastFetched) {
      dispatch(fetchAdminWorkers());
    }
  }, [dispatch, lastFetched]);

  const stats = useMemo(() => {
    const totalWorkers = workers.length;
    const activeWorkers = workers.filter((w) => w.is_active === 1 || w.is_active === true).length;
    const pendingApprovals = workers.filter((w) => !w.is_active).length;
    return {
      totalWorkers,
      activeWorkers,
      pendingApprovals,
      notificationsSent: 0,
    };
  }, [workers]);

  const recentWorkers = useMemo(() => {
    return [...workers]
      .sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt))
      .slice(0, 5);
  }, [workers]);

  const statCards = [
    {
      label: 'Total Workers',
      value: stats.totalWorkers,
      icon: 'solar:users-group-rounded-bold',
      color: 'primary',
      change: '+12%',
      positive: true
    },
    {
      label: 'Active Workers',
      value: stats.activeWorkers,
      icon: 'solar:user-check-rounded-bold',
      color: 'success',
      change: '+8%',
      positive: true
    },
    {
      label: 'Pending Approvals',
      value: stats.pendingApprovals,
      icon: 'solar:clock-circle-bold',
      color: 'warning',
      change: '-3%',
      positive: false
    },
    {
      label: 'Notifications Sent',
      value: stats.notificationsSent,
      icon: 'solar:bell-bing-bold',
      color: 'danger',
      change: '+24%',
      positive: true
    }
  ];

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Welcome back! Here's an overview of your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="admin-stat-card">
            <div className={`admin-stat-icon ${stat.color}`}>
              <Icon icon={stat.icon} />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-value">{stat.value.toLocaleString()}</div>
              <div className="admin-stat-label">{stat.label}</div>
              <div className={`admin-stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                {stat.change} from last month
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-grid admin-grid-2">
        {/* Recent Workers */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Recent Workers</h3>
            <NavLink to="/admin/workers" className="admin-btn admin-btn-sm admin-btn-outline">
              View All
            </NavLink>
          </div>
          <div className="admin-table-container">
            {recentWorkers.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Worker</th>
                    <th>Service</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentWorkers.map((worker) => {
                    const profile = worker.workerProfile;
                    return (
                      <tr key={worker.id}>
                        <td>
                          <div className="admin-table-user">
                            {worker.profile_photo ? (
                              <img
                                src={worker.profile_photo}
                                alt={worker.name}
                                className="admin-table-avatar"
                              />
                            ) : (
                              <div className="admin-table-avatar" style={{
                                background: '#6366f1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 600
                              }}>
                                {worker.name?.charAt(0)?.toUpperCase()}
                              </div>
                            )}
                            <div className="admin-table-user-info">
                              <div className="admin-table-user-name">{worker.name}</div>
                              <div className="admin-table-user-email">{worker.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td>{profile?.title || 'N/A'}</td>
                        <td>
                          <span className={`admin-badge ${worker.is_active ? 'success' : 'secondary'}`}>
                            {worker.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="admin-empty-state">
                <Icon icon="solar:users-group-rounded-linear" className="admin-empty-icon" />
                <div className="admin-empty-title">No workers yet</div>
                <div className="admin-empty-text">Start by adding your first worker</div>
                <NavLink to="/admin/workers" className="admin-btn admin-btn-primary">
                  <Icon icon="solar:add-circle-bold" />
                  Add Worker
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Quick Actions</h3>
          </div>
          <div className="admin-card-body">
            <div className="admin-quick-actions">
              <NavLink to="/admin/workers?action=create" className="admin-quick-action">
                <div className="admin-quick-action-icon primary">
                  <Icon icon="solar:user-plus-bold" />
                </div>
                <div className="admin-quick-action-content">
                  <div className="admin-quick-action-title">Add New Worker</div>
                  <div className="admin-quick-action-desc">Create a new worker profile</div>
                </div>
                <Icon icon="solar:alt-arrow-right-linear" className="admin-quick-action-arrow" />
              </NavLink>

              <NavLink to="/admin/workers?action=import" className="admin-quick-action">
                <div className="admin-quick-action-icon success">
                  <Icon icon="solar:upload-bold" />
                </div>
                <div className="admin-quick-action-content">
                  <div className="admin-quick-action-title">Import Workers</div>
                  <div className="admin-quick-action-desc">Bulk import from CSV/Excel</div>
                </div>
                <Icon icon="solar:alt-arrow-right-linear" className="admin-quick-action-arrow" />
              </NavLink>

              <NavLink to="/admin/notifications" className="admin-quick-action">
                <div className="admin-quick-action-icon warning">
                  <Icon icon="solar:bell-bing-bold" />
                </div>
                <div className="admin-quick-action-content">
                  <div className="admin-quick-action-title">Send Notification</div>
                  <div className="admin-quick-action-desc">Push notification to users</div>
                </div>
                <Icon icon="solar:alt-arrow-right-linear" className="admin-quick-action-arrow" />
              </NavLink>

              <NavLink to="/admin/settings" className="admin-quick-action">
                <div className="admin-quick-action-icon danger">
                  <Icon icon="solar:settings-bold" />
                </div>
                <div className="admin-quick-action-content">
                  <div className="admin-quick-action-title">Settings</div>
                  <div className="admin-quick-action-desc">Configure platform settings</div>
                </div>
                <Icon icon="solar:alt-arrow-right-linear" className="admin-quick-action-arrow" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-quick-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .admin-quick-action {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid var(--admin-gray-light);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .admin-quick-action:hover {
          border-color: var(--admin-primary);
          background: rgba(99, 102, 241, 0.02);
        }

        .admin-quick-action-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .admin-quick-action-icon.primary {
          background: rgba(99, 102, 241, 0.1);
          color: var(--admin-primary);
        }

        .admin-quick-action-icon.success {
          background: rgba(34, 197, 94, 0.1);
          color: var(--admin-success);
        }

        .admin-quick-action-icon.warning {
          background: rgba(245, 158, 11, 0.1);
          color: var(--admin-warning);
        }

        .admin-quick-action-icon.danger {
          background: rgba(239, 68, 68, 0.1);
          color: var(--admin-danger);
        }

        .admin-quick-action-content {
          flex: 1;
          min-width: 0;
        }

        .admin-quick-action-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--admin-dark);
          margin-bottom: 0.125rem;
        }

        .admin-quick-action-desc {
          font-size: 0.8rem;
          color: var(--admin-gray);
        }

        .admin-quick-action-arrow {
          color: var(--admin-gray-light);
          font-size: 1.25rem;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .admin-quick-action:hover .admin-quick-action-arrow {
          color: var(--admin-primary);
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
