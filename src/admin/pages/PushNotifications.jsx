import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import adminApi from '../api/adminApi';

const PushNotifications = () => {
  const [activeTab, setActiveTab] = useState('send');
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [notificationHistory, setNotificationHistory] = useState([]);

  // Form state for sending notifications
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    targetAudience: 'all',
    serviceType: '',
    city: '',
    imageUrl: '',
    actionUrl: '',
    scheduledAt: ''
  });

  const serviceTypes = [
    'Maid',
    'Cook',
    'Driver',
    'Babysitter',
    'Elder Care',
    'Gardener',
    'Security Guard',
    'Electrician',
    'Plumber',
    'Carpenter',
    'Painter',
    'AC Technician'
  ];

  useEffect(() => {
    if (activeTab === 'history') {
      fetchNotificationHistory();
    }
  }, [activeTab]);

  const fetchNotificationHistory = async () => {
    setHistoryLoading(true);
    try {
      const response = await adminApi.getNotificationHistory();
      if (response.data?.notifications) {
        setNotificationHistory(response.data.notifications);
      }
    } catch (error) {
      console.error('Failed to fetch notification history:', error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendNotification = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.body) {
      toast.error('Please fill in title and message');
      return;
    }

    setLoading(true);
    try {
      await adminApi.sendPushNotification(formData);
      toast.success('Notification sent successfully!');
      setFormData({
        title: '',
        body: '',
        targetAudience: 'all',
        serviceType: '',
        city: '',
        imageUrl: '',
        actionUrl: '',
        scheduledAt: ''
      });
      fetchNotificationHistory();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send notification');
    } finally {
      setLoading(false);
    }
  };

  const getAudienceLabel = (audience) => {
    switch (audience) {
      case 'all': return 'All Users';
      case 'workers': return 'Workers Only';
      case 'customers': return 'Customers Only';
      case 'specific': return 'Specific Segment';
      default: return audience;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-notifications">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Push Notifications</h1>
        <p className="admin-page-subtitle">Send push notifications to your mobile app users.</p>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'send' ? 'active' : ''}`}
          onClick={() => setActiveTab('send')}
        >
          <Icon icon="solar:letter-bold" style={{ marginRight: '0.5rem' }} />
          Send Notification
        </button>
        <button
          className={`admin-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <Icon icon="solar:history-bold" style={{ marginRight: '0.5rem' }} />
          History
        </button>
        <button
          className={`admin-tab ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          <Icon icon="solar:document-text-bold" style={{ marginRight: '0.5rem' }} />
          Templates
        </button>
      </div>

      {/* Send Notification Tab */}
      {activeTab === 'send' && (
        <div className="admin-grid admin-grid-2">
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Compose Notification</h3>
            </div>
            <form onSubmit={handleSendNotification}>
              <div className="admin-card-body">
                <div className="admin-form-group">
                  <label className="admin-form-label required">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="admin-form-input"
                    placeholder="Enter notification title"
                    value={formData.title}
                    onChange={handleInputChange}
                    maxLength={100}
                  />
                  <div className="admin-form-helper">{formData.title.length}/100 characters</div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label required">Message</label>
                  <textarea
                    name="body"
                    className="admin-form-textarea"
                    placeholder="Enter notification message"
                    value={formData.body}
                    onChange={handleInputChange}
                    maxLength={500}
                    rows={4}
                  />
                  <div className="admin-form-helper">{formData.body.length}/500 characters</div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Target Audience</label>
                  <select
                    name="targetAudience"
                    className="admin-form-select"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                  >
                    <option value="all">All Users</option>
                    <option value="workers">Workers Only</option>
                    <option value="customers">Customers Only</option>
                    <option value="specific">Specific Segment</option>
                  </select>
                </div>

                {formData.targetAudience === 'specific' && (
                  <>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Filter by Service Type</label>
                      <select
                        name="serviceType"
                        className="admin-form-select"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                      >
                        <option value="">All Service Types</option>
                        {serviceTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">Filter by City</label>
                      <input
                        type="text"
                        name="city"
                        className="admin-form-input"
                        placeholder="Enter city name"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}

                <div className="admin-form-group">
                  <label className="admin-form-label">Image URL (Optional)</label>
                  <input
                    type="url"
                    name="imageUrl"
                    className="admin-form-input"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                  />
                  <div className="admin-form-helper">Add an image to make your notification more engaging</div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Action URL (Optional)</label>
                  <input
                    type="text"
                    name="actionUrl"
                    className="admin-form-input"
                    placeholder="/dashboard or https://example.com"
                    value={formData.actionUrl}
                    onChange={handleInputChange}
                  />
                  <div className="admin-form-helper">Deep link or URL to open when notification is tapped</div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Schedule (Optional)</label>
                  <input
                    type="datetime-local"
                    name="scheduledAt"
                    className="admin-form-input"
                    value={formData.scheduledAt}
                    onChange={handleInputChange}
                    min={new Date().toISOString().slice(0, 16)}
                  />
                  <div className="admin-form-helper">Leave empty to send immediately</div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setFormData({
                    title: '',
                    body: '',
                    targetAudience: 'all',
                    serviceType: '',
                    city: '',
                    imageUrl: '',
                    actionUrl: '',
                    scheduledAt: ''
                  })}
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="admin-spinner" style={{ width: 18, height: 18 }} />
                      Sending...
                    </>
                  ) : formData.scheduledAt ? (
                    <>
                      <Icon icon="solar:clock-circle-bold" />
                      Schedule Notification
                    </>
                  ) : (
                    <>
                      <Icon icon="solar:plain-bold" />
                      Send Now
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Preview Card */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Preview</h3>
            </div>
            <div className="admin-card-body">
              <div className="notification-preview">
                <div className="preview-phone">
                  <div className="preview-notch" />
                  <div className="preview-screen">
                    <div className="preview-status-bar">
                      <span>9:41</span>
                      <span>
                        <Icon icon="solar:battery-full-bold" />
                      </span>
                    </div>
                    <div className="preview-notification">
                      <div className="preview-notification-header">
                        <div className="preview-app-icon">
                          <Icon icon="solar:home-2-bold" />
                        </div>
                        <span className="preview-app-name">Nehmeer</span>
                        <span className="preview-time">now</span>
                      </div>
                      <div className="preview-notification-content">
                        <h4 className="preview-title">{formData.title || 'Notification Title'}</h4>
                        <p className="preview-body">{formData.body || 'Your notification message will appear here...'}</p>
                        {formData.imageUrl && (
                          <div className="preview-image">
                            <img src={formData.imageUrl} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="preview-info">
                <div className="preview-info-item">
                  <Icon icon="solar:users-group-rounded-bold" />
                  <span>Audience: {getAudienceLabel(formData.targetAudience)}</span>
                </div>
                {formData.scheduledAt && (
                  <div className="preview-info-item">
                    <Icon icon="solar:clock-circle-bold" />
                    <span>Scheduled: {new Date(formData.scheduledAt).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="admin-card">
          <div className="admin-table-container">
            {historyLoading ? (
              <div className="admin-loading">
                <div className="admin-spinner" />
              </div>
            ) : notificationHistory.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Message</th>
                    <th>Audience</th>
                    <th>Sent To</th>
                    <th>Status</th>
                    <th>Sent At</th>
                  </tr>
                </thead>
                <tbody>
                  {notificationHistory.map((notification) => (
                    <tr key={notification._id}>
                      <td style={{ fontWeight: 500 }}>{notification.title}</td>
                      <td style={{ maxWidth: '200px' }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {notification.body}
                        </div>
                      </td>
                      <td>
                        <span className="admin-badge primary">
                          {getAudienceLabel(notification.targetAudience)}
                        </span>
                      </td>
                      <td>{notification.sentCount || 0} users</td>
                      <td>
                        <span className={`admin-badge ${notification.status === 'sent' ? 'success' : notification.status === 'scheduled' ? 'warning' : 'secondary'}`}>
                          {notification.status}
                        </span>
                      </td>
                      <td>{formatDate(notification.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="admin-empty-state">
                <Icon icon="solar:bell-off-linear" className="admin-empty-icon" />
                <div className="admin-empty-title">No notifications sent yet</div>
                <div className="admin-empty-text">Your notification history will appear here</div>
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => setActiveTab('send')}
                >
                  <Icon icon="solar:plain-bold" />
                  Send First Notification
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Quick Templates</h3>
          </div>
          <div className="admin-card-body">
            <div className="template-grid">
              {[
                {
                  icon: 'solar:bell-bing-bold',
                  color: 'primary',
                  title: 'Welcome Message',
                  notification: {
                    title: 'Welcome to Nehmeer! 🎉',
                    body: 'Thank you for joining us! Start exploring services near you.'
                  }
                },
                {
                  icon: 'solar:tag-price-bold',
                  color: 'success',
                  title: 'Promotional Offer',
                  notification: {
                    title: 'Special Offer Just for You! 💰',
                    body: 'Get 20% off on your first booking. Use code FIRST20 at checkout!'
                  }
                },
                {
                  icon: 'solar:calendar-bold',
                  color: 'warning',
                  title: 'Booking Reminder',
                  notification: {
                    title: 'Booking Reminder 📅',
                    body: 'Don\'t forget! You have an upcoming service scheduled tomorrow.'
                  }
                },
                {
                  icon: 'solar:star-bold',
                  color: 'danger',
                  title: 'Feedback Request',
                  notification: {
                    title: 'How was your experience? ⭐',
                    body: 'We\'d love to hear your feedback. Rate your recent service now!'
                  }
                }
              ].map((template, index) => (
                <div key={index} className="template-card">
                  <div className={`template-icon ${template.color}`}>
                    <Icon icon={template.icon} />
                  </div>
                  <div className="template-content">
                    <h4 className="template-title">{template.title}</h4>
                    <p className="template-preview">{template.notification.title}</p>
                  </div>
                  <button
                    className="admin-btn admin-btn-outline admin-btn-sm"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        title: template.notification.title,
                        body: template.notification.body
                      }));
                      setActiveTab('send');
                      toast.success('Template loaded');
                    }}
                  >
                    Use Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .notification-preview {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .preview-phone {
          width: 280px;
          height: 500px;
          background: #1a1a1a;
          border-radius: 40px;
          padding: 12px;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .preview-notch {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 28px;
          background: #1a1a1a;
          border-radius: 0 0 16px 16px;
          z-index: 10;
        }

        .preview-screen {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
          border-radius: 32px;
          overflow: hidden;
          padding: 40px 16px 16px;
        }

        .preview-status-bar {
          display: flex;
          justify-content: space-between;
          color: white;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .preview-notification {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .preview-notification-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .preview-app-icon {
          width: 20px;
          height: 20px;
          background: var(--admin-primary);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
        }

        .preview-app-name {
          font-size: 12px;
          font-weight: 600;
          color: #666;
          flex: 1;
        }

        .preview-time {
          font-size: 11px;
          color: #999;
        }

        .preview-notification-content {
          padding-left: 28px;
        }

        .preview-title {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 4px;
          line-height: 1.3;
        }

        .preview-body {
          font-size: 13px;
          color: #666;
          margin: 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .preview-image {
          margin-top: 8px;
          border-radius: 8px;
          overflow: hidden;
        }

        .preview-image img {
          width: 100%;
          height: auto;
          display: block;
        }

        .preview-info {
          background: var(--admin-light);
          border-radius: 8px;
          padding: 1rem;
        }

        .preview-info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--admin-gray);
        }

        .preview-info-item + .preview-info-item {
          margin-top: 0.5rem;
        }

        .template-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .template-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid var(--admin-gray-light);
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .template-card:hover {
          border-color: var(--admin-primary);
          background: rgba(99, 102, 241, 0.02);
        }

        .template-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .template-icon.primary {
          background: rgba(99, 102, 241, 0.1);
          color: var(--admin-primary);
        }

        .template-icon.success {
          background: rgba(34, 197, 94, 0.1);
          color: var(--admin-success);
        }

        .template-icon.warning {
          background: rgba(245, 158, 11, 0.1);
          color: var(--admin-warning);
        }

        .template-icon.danger {
          background: rgba(239, 68, 68, 0.1);
          color: var(--admin-danger);
        }

        .template-content {
          flex: 1;
          min-width: 0;
        }

        .template-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--admin-dark);
          margin: 0 0 0.25rem;
        }

        .template-preview {
          font-size: 0.8rem;
          color: var(--admin-gray);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 768px) {
          .template-grid {
            grid-template-columns: 1fr;
          }

          .preview-phone {
            width: 240px;
            height: 420px;
          }
        }
      `}</style>
    </div>
  );
};

export default PushNotifications;
