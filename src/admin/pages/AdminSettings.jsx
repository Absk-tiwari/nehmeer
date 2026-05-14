import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import adminApi from '../api/adminApi';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    general: {
      platformName: 'Nehmeer',
      supportEmail: '',
      supportPhone: '',
      maintenanceMode: false
    },
    notifications: {
      fcmServerKey: '',
      enablePushNotifications: true,
      enableEmailNotifications: true,
      enableSmsNotifications: false
    },
    workers: {
      autoApproveWorkers: false,
      requireVerification: true,
      maxServicesPerWorker: 5,
      commissionPercentage: 10
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getSettings();
      if (response.data) {
        setSettings(prev => ({
          ...prev,
          ...response.data
        }));
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSaveSettings = async (category) => {
    setSaving(true);
    try {
      await adminApi.updateSettings({ [category]: settings[category] });
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
      </div>
    );
  }

  return (
    <div className="admin-settings">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Settings</h1>
        <p className="admin-page-subtitle">Configure your platform settings and preferences.</p>
      </div>

      <div className="settings-layout">
        {/* Settings Navigation */}
        <div className="settings-nav">
          <div className="admin-card">
            <div className="admin-card-body" style={{ padding: '0.5rem' }}>
              <button
                className={`settings-nav-item ${activeTab === 'general' ? 'active' : ''}`}
                onClick={() => setActiveTab('general')}
              >
                <Icon icon="solar:settings-bold-duotone" />
                General
              </button>
              <button
                className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <Icon icon="solar:bell-bold-duotone" />
                Notifications
              </button>
              <button
                className={`settings-nav-item ${activeTab === 'workers' ? 'active' : ''}`}
                onClick={() => setActiveTab('workers')}
              >
                <Icon icon="solar:users-group-rounded-bold-duotone" />
                Workers
              </button>
              <button
                className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <Icon icon="solar:shield-check-bold-duotone" />
                Security
              </button>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">General Settings</h3>
              </div>
              <div className="admin-card-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Platform Name</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={settings.general.platformName}
                    onChange={(e) => handleInputChange('general', 'platformName', e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Support Email</label>
                  <input
                    type="email"
                    className="admin-form-input"
                    placeholder="support@nehmeer.com"
                    value={settings.general.supportEmail}
                    onChange={(e) => handleInputChange('general', 'supportEmail', e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Support Phone</label>
                  <input
                    type="tel"
                    className="admin-form-input"
                    placeholder="+91 98765 43210"
                    value={settings.general.supportPhone}
                    onChange={(e) => handleInputChange('general', 'supportPhone', e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-checkbox">
                    <input
                      type="checkbox"
                      checked={settings.general.maintenanceMode}
                      onChange={(e) => handleInputChange('general', 'maintenanceMode', e.target.checked)}
                    />
                    <span className="admin-checkbox-label">
                      Enable Maintenance Mode
                    </span>
                  </label>
                  <div className="admin-form-helper">
                    When enabled, users will see a maintenance message instead of the app
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <button
                    className="admin-btn admin-btn-primary"
                    onClick={() => handleSaveSettings('general')}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">Notification Settings</h3>
              </div>
              <div className="admin-card-body">
                <div className="admin-alert info" style={{ marginBottom: '1.5rem' }}>
                  <Icon icon="solar:info-circle-bold" />
                  <div>
                    Configure your Firebase Cloud Messaging (FCM) settings to enable push notifications.
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">FCM Server Key</label>
                  <input
                    type="password"
                    className="admin-form-input"
                    placeholder="Enter your FCM server key"
                    value={settings.notifications.fcmServerKey}
                    onChange={(e) => handleInputChange('notifications', 'fcmServerKey', e.target.value)}
                  />
                  <div className="admin-form-helper">
                    Find this in your Firebase Console under Project Settings → Cloud Messaging
                  </div>
                </div>

                <div className="settings-toggles">
                  <div className="settings-toggle-item">
                    <div className="settings-toggle-info">
                      <div className="settings-toggle-title">Push Notifications</div>
                      <div className="settings-toggle-desc">Send push notifications to mobile app users</div>
                    </div>
                    <label className="admin-switch">
                      <input
                        type="checkbox"
                        checked={settings.notifications.enablePushNotifications}
                        onChange={(e) => handleInputChange('notifications', 'enablePushNotifications', e.target.checked)}
                      />
                      <span className="admin-switch-slider" />
                    </label>
                  </div>

                  <div className="settings-toggle-item">
                    <div className="settings-toggle-info">
                      <div className="settings-toggle-title">Email Notifications</div>
                      <div className="settings-toggle-desc">Send email notifications to users</div>
                    </div>
                    <label className="admin-switch">
                      <input
                        type="checkbox"
                        checked={settings.notifications.enableEmailNotifications}
                        onChange={(e) => handleInputChange('notifications', 'enableEmailNotifications', e.target.checked)}
                      />
                      <span className="admin-switch-slider" />
                    </label>
                  </div>

                  <div className="settings-toggle-item">
                    <div className="settings-toggle-info">
                      <div className="settings-toggle-title">SMS Notifications</div>
                      <div className="settings-toggle-desc">Send SMS notifications to users</div>
                    </div>
                    <label className="admin-switch">
                      <input
                        type="checkbox"
                        checked={settings.notifications.enableSmsNotifications}
                        onChange={(e) => handleInputChange('notifications', 'enableSmsNotifications', e.target.checked)}
                      />
                      <span className="admin-switch-slider" />
                    </label>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <button
                    className="admin-btn admin-btn-primary"
                    onClick={() => handleSaveSettings('notifications')}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Worker Settings */}
          {activeTab === 'workers' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">Worker Settings</h3>
              </div>
              <div className="admin-card-body">
                <div className="settings-toggles" style={{ marginBottom: '1.5rem' }}>
                  <div className="settings-toggle-item">
                    <div className="settings-toggle-info">
                      <div className="settings-toggle-title">Auto-Approve Workers</div>
                      <div className="settings-toggle-desc">Automatically approve new worker registrations</div>
                    </div>
                    <label className="admin-switch">
                      <input
                        type="checkbox"
                        checked={settings.workers.autoApproveWorkers}
                        onChange={(e) => handleInputChange('workers', 'autoApproveWorkers', e.target.checked)}
                      />
                      <span className="admin-switch-slider" />
                    </label>
                  </div>

                  <div className="settings-toggle-item">
                    <div className="settings-toggle-info">
                      <div className="settings-toggle-title">Require Verification</div>
                      <div className="settings-toggle-desc">Workers must verify their identity before activation</div>
                    </div>
                    <label className="admin-switch">
                      <input
                        type="checkbox"
                        checked={settings.workers.requireVerification}
                        onChange={(e) => handleInputChange('workers', 'requireVerification', e.target.checked)}
                      />
                      <span className="admin-switch-slider" />
                    </label>
                  </div>
                </div>

                <div className="admin-grid admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Max Services Per Worker</label>
                    <input
                      type="number"
                      className="admin-form-input"
                      value={settings.workers.maxServicesPerWorker}
                      onChange={(e) => handleInputChange('workers', 'maxServicesPerWorker', parseInt(e.target.value))}
                      min="1"
                      max="10"
                    />
                    <div className="admin-form-helper">Maximum number of services a worker can offer</div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Commission Percentage</label>
                    <input
                      type="number"
                      className="admin-form-input"
                      value={settings.workers.commissionPercentage}
                      onChange={(e) => handleInputChange('workers', 'commissionPercentage', parseInt(e.target.value))}
                      min="0"
                      max="50"
                    />
                    <div className="admin-form-helper">Platform commission from each booking</div>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <button
                    className="admin-btn admin-btn-primary"
                    onClick={() => handleSaveSettings('workers')}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">Security Settings</h3>
              </div>
              <div className="admin-card-body">
                <div className="admin-alert warning" style={{ marginBottom: '1.5rem' }}>
                  <Icon icon="solar:shield-warning-bold" />
                  <div>
                    Security settings affect how your platform handles authentication and data protection.
                  </div>
                </div>

                <div className="security-actions">
                  <div className="security-action-card">
                    <div className="security-action-icon">
                      <Icon icon="solar:password-bold-duotone" />
                    </div>
                    <div className="security-action-content">
                      <h4>Change Password</h4>
                      <p>Update your admin account password</p>
                    </div>
                    <button className="admin-btn admin-btn-outline">
                      Change
                    </button>
                  </div>

                  <div className="security-action-card">
                    <div className="security-action-icon">
                      <Icon icon="solar:devices-bold-duotone" />
                    </div>
                    <div className="security-action-content">
                      <h4>Active Sessions</h4>
                      <p>View and manage your active login sessions</p>
                    </div>
                    <button className="admin-btn admin-btn-outline">
                      View
                    </button>
                  </div>

                  <div className="security-action-card">
                    <div className="security-action-icon danger">
                      <Icon icon="solar:logout-3-bold-duotone" />
                    </div>
                    <div className="security-action-content">
                      <h4>Logout All Devices</h4>
                      <p>Sign out from all devices except this one</p>
                    </div>
                    <button className="admin-btn admin-btn-danger">
                      Logout All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .settings-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 1.5rem;
        }

        .settings-nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.875rem 1rem;
          border: none;
          background: transparent;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--admin-gray);
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .settings-nav-item:hover {
          background: var(--admin-light);
          color: var(--admin-dark);
        }

        .settings-nav-item.active {
          background: rgba(99, 102, 241, 0.1);
          color: var(--admin-primary);
        }

        .settings-nav-item svg {
          width: 20px;
          height: 20px;
        }

        .settings-toggles {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .settings-toggle-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: var(--admin-light);
          border-radius: 10px;
        }

        .settings-toggle-title {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--admin-dark);
          margin-bottom: 0.25rem;
        }

        .settings-toggle-desc {
          font-size: 0.8rem;
          color: var(--admin-gray);
        }

        .admin-switch {
          position: relative;
          width: 48px;
          height: 26px;
          flex-shrink: 0;
        }

        .admin-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .admin-switch-slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background: var(--admin-gray-light);
          border-radius: 26px;
          transition: 0.3s;
        }

        .admin-switch-slider::before {
          position: absolute;
          content: '';
          width: 20px;
          height: 20px;
          left: 3px;
          bottom: 3px;
          background: white;
          border-radius: 50%;
          transition: 0.3s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .admin-switch input:checked + .admin-switch-slider {
          background: var(--admin-primary);
        }

        .admin-switch input:checked + .admin-switch-slider::before {
          transform: translateX(22px);
        }

        .security-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .security-action-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          border: 1px solid var(--admin-gray-light);
          border-radius: 12px;
        }

        .security-action-icon {
          width: 48px;
          height: 48px;
          background: rgba(99, 102, 241, 0.1);
          color: var(--admin-primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .security-action-icon.danger {
          background: rgba(239, 68, 68, 0.1);
          color: var(--admin-danger);
        }

        .security-action-content {
          flex: 1;
        }

        .security-action-content h4 {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--admin-dark);
          margin: 0 0 0.25rem;
        }

        .security-action-content p {
          font-size: 0.85rem;
          color: var(--admin-gray);
          margin: 0;
        }

        @media (max-width: 991px) {
          .settings-layout {
            grid-template-columns: 1fr;
          }

          .settings-nav .admin-card-body {
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            padding: 0.5rem !important;
          }

          .settings-nav-item {
            white-space: nowrap;
            padding: 0.625rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminSettings;
