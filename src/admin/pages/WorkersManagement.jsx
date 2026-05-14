import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import adminApi from '../api/adminApi';
import { fetchAdminWorkers, removeWorkerFromList } from '../../redux/slices/adminSlice';

const WorkersManagement = () => {
  const dispatch = useDispatch();
  const { workers: allWorkers, loading: reduxLoading, lastFetched } = useSelector((state) => state.admin);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    // User fields
    name: '',
    phone: '',
    email: '',
    whatsapp: '',
    gender: 'male',
    is_active: true,
    // Worker profile fields
    title: '',
    age: '',
    education: '',
    language: '',
    religion: '',
    marital_status: '',
    description: '',
    experience: '',
    hourly_rate: '',
    monthly_rate: '',
    is_part_time_available: false,
    is_full_time_available: false,
    is_available: true,
    city: '',
    location: ''
  });
  const [formLoading, setFormLoading] = useState(false);

  // Import states
  const [importFile, setImportFile] = useState(null);
  const [importLoading, setImportLoading] = useState(false);
  const [importPreview, setImportPreview] = useState([]);
  const fileInputRef = useRef(null);

  // Profile photo states
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const profilePhotoRef = useRef(null);

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
    'AC Technician',
    'Other'
  ];

  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'create') {
      setShowCreateModal(true);
      setSearchParams({});
    } else if (action === 'import') {
      setShowImportModal(true);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (!lastFetched) {
      dispatch(fetchAdminWorkers());
    }
  }, [dispatch, lastFetched]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredWorkers = useMemo(() => {
    if (!search.trim()) return allWorkers;
    const searchLower = search.toLowerCase();
    return allWorkers.filter(
      (worker) =>
        worker.name?.toLowerCase().includes(searchLower) ||
        worker.phone?.includes(search)
    );
  }, [allWorkers, search]);

  const paginatedWorkers = useMemo(() => {
    const startIndex = (currentPage - 1) * limit;
    return filteredWorkers.slice(startIndex, startIndex + limit);
  }, [filteredWorkers, currentPage, limit]);

  const pagination = useMemo(() => ({
    page: currentPage,
    limit,
    total: filteredWorkers.length,
    pages: Math.ceil(filteredWorkers.length / limit) || 1,
  }), [filteredWorkers.length, currentPage, limit]);

  const loading = reduxLoading;
  const workers = paginatedWorkers;

  const refreshWorkers = () => {
    dispatch(fetchAdminWorkers());
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      whatsapp: '',
      gender: 'male',
      is_active: true,
      title: '',
      age: '',
      education: '',
      language: '',
      religion: '',
      marital_status: '',
      description: '',
      experience: '',
      hourly_rate: '',
      monthly_rate: '',
      is_part_time_available: false,
      is_full_time_available: false,
      is_available: true,
      city: '',
      location: ''
    });
    setProfilePhoto(null);
    setProfilePhotoPreview(null);
  };

  const handleProfilePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setProfilePhoto(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfilePhotoPreview(e.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const removeProfilePhoto = () => {
    setProfilePhoto(null);
    setProfilePhotoPreview(null);
    if (profilePhotoRef.current) {
      profilePhotoRef.current.value = '';
    }
  };

  const handleCreateWorker = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.title) {
      toast.error('Please fill in required fields');
      return;
    }

    setFormLoading(true);
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '' && formData[key] !== null) {
          submitData.append(key, formData[key]);
        }
      });
      if (profilePhoto) {
        submitData.append('profile_photo', profilePhoto);
      }

      await adminApi.createWorker(submitData);
      toast.success('Worker created successfully');
      setShowCreateModal(false);
      resetForm();
      refreshWorkers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create worker');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditWorker = async (e) => {
    e.preventDefault();

    setFormLoading(true);
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '' && formData[key] !== null) {
          submitData.append(key, formData[key]);
        }
      });
      if (profilePhoto) {
        submitData.append('profile_photo', profilePhoto);
      }

      await adminApi.updateWorker(selectedWorker.id, submitData);
      toast.success('Worker updated successfully');
      setShowEditModal(false);
      setSelectedWorker(null);
      resetForm();
      refreshWorkers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update worker');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteWorker = async () => {
    setFormLoading(true);
    try {
      await adminApi.deleteWorker(selectedWorker.id);
      toast.success('Worker deleted successfully');
      dispatch(removeWorkerFromList(selectedWorker.id));
      setShowDeleteModal(false);
      setSelectedWorker(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete worker');
    } finally {
      setFormLoading(false);
    }
  };

  const openEditModal = (worker) => {
    const profile = worker.workerProfile;
    setSelectedWorker(worker);
    setFormData({
      name: worker.name || '',
      phone: worker.phone || '',
      email: worker.email || '',
      whatsapp: worker.whatsapp || '',
      gender: worker.gender || 'male',
      is_active: worker.is_active === 1,
      title: profile?.title || '',
      age: profile?.age || '',
      education: profile?.education || '',
      language: profile?.language || '',
      religion: profile?.religion || '',
      marital_status: profile?.marital_status || '',
      description: profile?.description || '',
      experience: profile?.experience || '',
      hourly_rate: profile?.hourly_rate || '',
      monthly_rate: profile?.monthly_rate || '',
      is_part_time_available: profile?.is_part_time_available === 1,
      is_full_time_available: profile?.is_full_time_available === 1,
      is_available: profile?.is_available === 1,
      city: profile?.city || '',
      location: profile?.location || ''
    });
    setProfilePhoto(null);
    setProfilePhotoPreview(worker.profile_photo || null);
    setShowEditModal(true);
  };

  const openDeleteModal = (worker) => {
    setSelectedWorker(worker);
    setShowDeleteModal(true);
  };

  // Import functionality
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(csv|xlsx|xls)$/i)) {
      toast.error('Please select a CSV or Excel file');
      return;
    }

    setImportFile(file);
    parseImportFile(file);
  };

  const parseImportFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const preview = lines.slice(1, 6).map(line => {
          const values = line.split(',');
          const row = {};
          headers.forEach((header, index) => {
            row[header] = values[index]?.trim() || '';
          });
          return row;
        });
        setImportPreview(preview);
      }
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!importFile) {
      toast.error('Please select a file to import');
      return;
    }

    setImportLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', importFile);

      await adminApi.importWorkers(formData);
      toast.success('Workers imported successfully');
      setShowImportModal(false);
      setImportFile(null);
      setImportPreview([]);
      refreshWorkers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to import workers');
    } finally {
      setImportLoading(false);
    }
  };

  const downloadTemplate = () => {
    const headers = ['name', 'phone', 'email', 'whatsapp', 'gender', 'age', 'title', 'experience', 'education', 'language', 'religion', 'marital_status', 'hourly_rate', 'monthly_rate', 'city', 'location'];
    const sampleData = ['John Doe', '9876543210', 'john@example.com', '9876543210', 'male', '30', 'Maid', '3', '10th Pass', 'Hindi', 'Hindu', 'married', '300', '8000', 'New Delhi', '123 Street, Delhi'];

    const csvContent = [headers.join(','), sampleData.join(',')].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workers_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-workers">
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="admin-page-title">Workers Management</h1>
          <p className="admin-page-subtitle">Create, manage, and import workers for your platform.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="admin-btn admin-btn-secondary"
            onClick={() => setShowImportModal(true)}
          >
            <Icon icon="solar:upload-bold" />
            Import
          </button>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <Icon icon="solar:add-circle-bold" />
            Add Worker
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <div className="admin-card-body" style={{ padding: '1rem 1.5rem' }}>
          <div className="admin-search" style={{ maxWidth: '400px' }}>
            <Icon icon="solar:magnifer-linear" className="admin-search-icon" />
            <input
              type="text"
              className="admin-form-input admin-search-input"
              placeholder="Search workers by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Workers Table */}
      <div className="admin-card">
        <div className="admin-table-container">
          {loading ? (
            <div className="admin-loading">
              <div className="admin-spinner" />
            </div>
          ) : workers.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Worker</th>
                  <th>Service</th>
                  <th>City</th>
                  <th>Experience</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker) => {
                  const profile = worker.workerProfile;
                  const profilePhoto = worker.profile_photo ?? null;

                  return (
                    <tr key={worker.id}>
                      <td>
                        <div className="admin-table-user">
                          {profilePhoto ? (
                            <img
                              src={profilePhoto}
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
                      <td>
                        <span className="admin-badge primary">{profile?.title || 'N/A'}</span>
                      </td>
                      <td>{profile?.city || 'N/A'}</td>
                      <td>{profile?.experience ? `${profile.experience} years` : 'N/A'}</td>
                      <td>
                        <span className={`admin-badge ${worker.is_active ? 'success' : 'secondary'}`}>
                          {worker.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            className="admin-btn admin-btn-sm admin-btn-outline admin-btn-icon"
                            onClick={() => openEditModal(worker)}
                            title="Edit"
                          >
                            <Icon icon="solar:pen-linear" />
                          </button>
                          <button
                            className="admin-btn admin-btn-sm admin-btn-outline admin-btn-icon"
                            onClick={() => openDeleteModal(worker)}
                            title="Delete"
                            style={{ color: 'var(--admin-danger)' }}
                          >
                            <Icon icon="solar:trash-bin-minimalistic-linear" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="admin-empty-state">
              <Icon icon="solar:users-group-rounded-linear" className="admin-empty-icon" />
              <div className="admin-empty-title">No workers found</div>
              <div className="admin-empty-text">
                {search ? 'Try a different search term' : 'Start by adding your first worker'}
              </div>
              {!search && (
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Icon icon="solar:add-circle-bold" />
                  Add Worker
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {workers.length > 0 && (
          <div className="admin-pagination">
            <div className="admin-pagination-info">
              Showing {(currentPage - 1) * limit + 1} to{' '}
              {Math.min(currentPage * limit, pagination.total)} of{' '}
              {pagination.total} workers
            </div>
            <div className="admin-pagination-controls">
              <button
                className="admin-pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <Icon icon="solar:alt-arrow-left-linear" />
              </button>
              {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    className={`admin-pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                className="admin-pagination-btn"
                disabled={currentPage === pagination.pages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <Icon icon="solar:alt-arrow-right-linear" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Worker Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="admin-modal-overlay" onClick={() => {
          setShowCreateModal(false);
          setShowEditModal(false);
          setSelectedWorker(null);
          resetForm();
        }}>
          <div className="admin-modal large" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {showEditModal ? 'Edit Worker' : 'Add New Worker'}
              </h3>
              <button
                className="admin-modal-close"
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  setSelectedWorker(null);
                  resetForm();
                }}
              >
                <Icon icon="solar:close-circle-linear" />
              </button>
            </div>
            <form onSubmit={showEditModal ? handleEditWorker : handleCreateWorker}>
              <div className="admin-modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                {/* Password Note for Create Modal */}
                {showCreateModal && (
                  <div className="admin-alert info" style={{ marginBottom: '1.5rem' }}>
                    <Icon icon="solar:info-circle-bold" />
                    <div>
                      <strong>Note:</strong> The default password for the worker will be <strong>121212</strong>. They can update it later.
                    </div>
                  </div>
                )}

                {/* Basic Info Section */}
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--admin-primary)' }}>
                  Basic Information
                </h4>

                {/* Profile Photo Upload */}
                <div className="admin-form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="admin-form-label">Profile Photo</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: profilePhotoPreview ? `url(${profilePhotoPreview}) center/cover` : 'var(--admin-gray-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px dashed var(--admin-gray)',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}
                      onClick={() => profilePhotoRef.current?.click()}
                    >
                      {!profilePhotoPreview && (
                        <Icon icon="solar:camera-linear" style={{ fontSize: '1.5rem', color: 'var(--admin-gray)' }} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <input
                        type="file"
                        ref={profilePhotoRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleProfilePhotoSelect}
                      />
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          className="admin-btn admin-btn-sm admin-btn-outline"
                          onClick={() => profilePhotoRef.current?.click()}
                        >
                          <Icon icon="solar:upload-linear" />
                          {profilePhotoPreview ? 'Change Photo' : 'Upload Photo'}
                        </button>
                        {profilePhotoPreview && (
                          <button
                            type="button"
                            className="admin-btn admin-btn-sm admin-btn-outline"
                            onClick={removeProfilePhoto}
                            style={{ color: 'var(--admin-danger)' }}
                          >
                            <Icon icon="solar:trash-bin-minimalistic-linear" />
                            Remove
                          </button>
                        )}
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--admin-gray)', margin: '0.5rem 0 0' }}>
                        JPG, PNG or GIF. Max 5MB.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="admin-grid admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label required">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="admin-form-input"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label required">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="admin-form-input"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="admin-form-input"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">WhatsApp</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      className="admin-form-input"
                      placeholder="Enter WhatsApp number"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Gender</label>
                    <select
                      name="gender"
                      className="admin-form-select"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Age</label>
                    <input
                      type="number"
                      name="age"
                      className="admin-form-input"
                      placeholder="Enter age"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="18"
                      max="70"
                    />
                  </div>
                </div>

                {/* Professional Info Section */}
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '1.5rem 0 1rem', color: 'var(--admin-primary)' }}>
                  Professional Details
                </h4>
                <div className="admin-grid admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label required">Service Title</label>
                    <select
                      name="title"
                      className="admin-form-select"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select service type</option>
                      {serviceTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Experience (years)</label>
                    <input
                      type="number"
                      name="experience"
                      className="admin-form-input"
                      placeholder="Years of experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Education</label>
                    <input
                      type="text"
                      name="education"
                      className="admin-form-input"
                      placeholder="e.g., BA, 10th Pass"
                      value={formData.education}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Language</label>
                    <input
                      type="text"
                      name="language"
                      className="admin-form-input"
                      placeholder="e.g., Hindi, English"
                      value={formData.language}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                    <label className="admin-form-label">Description</label>
                    <textarea
                      name="description"
                      className="admin-form-input"
                      placeholder="Brief description about the worker"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                </div>

                {/* Personal Info Section */}
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '1.5rem 0 1rem', color: 'var(--admin-primary)' }}>
                  Personal Details
                </h4>
                <div className="admin-grid admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Religion</label>
                    <select
                      name="religion"
                      className="admin-form-select"
                      value={formData.religion}
                      onChange={handleInputChange}
                    >
                      <option value="">Select religion</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Muslim">Muslim</option>
                      <option value="Christian">Christian</option>
                      <option value="Sikh">Sikh</option>
                      <option value="Buddhist">Buddhist</option>
                      <option value="Jain">Jain</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Marital Status</label>
                    <select
                      name="marital_status"
                      className="admin-form-select"
                      value={formData.marital_status}
                      onChange={handleInputChange}
                    >
                      <option value="">Select status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                </div>

                {/* Pricing Section */}
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '1.5rem 0 1rem', color: 'var(--admin-primary)' }}>
                  Pricing & Availability
                </h4>
                <div className="admin-grid admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Hourly Rate (₹)</label>
                    <input
                      type="number"
                      name="hourly_rate"
                      className="admin-form-input"
                      placeholder="Hourly rate in rupees"
                      value={formData.hourly_rate}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Monthly Rate (₹)</label>
                    <input
                      type="number"
                      name="monthly_rate"
                      className="admin-form-input"
                      placeholder="Monthly rate in rupees"
                      value={formData.monthly_rate}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </div>
                  <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <label className="admin-checkbox">
                      <input
                        type="checkbox"
                        name="is_part_time_available"
                        checked={formData.is_part_time_available}
                        onChange={handleInputChange}
                      />
                      <span className="admin-checkbox-label">Part-time Available</span>
                    </label>
                    <label className="admin-checkbox">
                      <input
                        type="checkbox"
                        name="is_full_time_available"
                        checked={formData.is_full_time_available}
                        onChange={handleInputChange}
                      />
                      <span className="admin-checkbox-label">Full-time Available</span>
                    </label>
                  </div>
                </div>

                {/* Location Section */}
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '1.5rem 0 1rem', color: 'var(--admin-primary)' }}>
                  Location
                </h4>
                <div className="admin-grid admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      className="admin-form-input"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                    <label className="admin-form-label">Full Address</label>
                    <input
                      type="text"
                      name="location"
                      className="admin-form-input"
                      placeholder="Enter complete address"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Status Section */}
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '1.5rem 0 1rem', color: 'var(--admin-primary)' }}>
                  Status
                </h4>
                <div className="admin-grid admin-grid-2">
                  <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <label className="admin-checkbox">
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleInputChange}
                      />
                      <span className="admin-checkbox-label">Active Account</span>
                    </label>
                    <label className="admin-checkbox">
                      <input
                        type="checkbox"
                        name="is_available"
                        checked={formData.is_available}
                        onChange={handleInputChange}
                      />
                      <span className="admin-checkbox-label">Available for Work</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    setSelectedWorker(null);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={formLoading}
                >
                  {formLoading ? (
                    <>
                      <span className="admin-spinner" style={{ width: 18, height: 18 }} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Icon icon="solar:check-circle-bold" />
                      {showEditModal ? 'Update Worker' : 'Create Worker'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="admin-modal-overlay" onClick={() => {
          setShowImportModal(false);
          setImportFile(null);
          setImportPreview([]);
        }}>
          <div className="admin-modal large" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Import Workers</h3>
              <button
                className="admin-modal-close"
                onClick={() => {
                  setShowImportModal(false);
                  setImportFile(null);
                  setImportPreview([]);
                }}
              >
                <Icon icon="solar:close-circle-linear" />
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-alert info">
                <Icon icon="solar:info-circle-bold" />
                <div>
                  <strong>Supported formats:</strong> CSV, XLS, XLSX<br />
                  <small>Required columns: name, phone, title. Optional: email, whatsapp, gender, age, experience, education, language, religion, marital_status, hourly_rate, monthly_rate, city, location</small>
                </div>
              </div>

              <div
                className={`admin-file-upload ${importFile ? 'has-file' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('dragover');
                }}
                onDragLeave={(e) => {
                  e.currentTarget.classList.remove('dragover');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('dragover');
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    handleFileSelect({ target: { files: [file] } });
                  }
                }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileSelect}
                />
                {importFile ? (
                  <>
                    <Icon icon="solar:file-check-bold" className="admin-file-upload-icon" style={{ color: 'var(--admin-success)' }} />
                    <div className="admin-file-upload-text">{importFile.name}</div>
                    <div className="admin-file-upload-hint">Click to change file</div>
                  </>
                ) : (
                  <>
                    <Icon icon="solar:upload-bold" className="admin-file-upload-icon" />
                    <div className="admin-file-upload-text">
                      <span>Click to upload</span> or drag and drop
                    </div>
                    <div className="admin-file-upload-hint">CSV, XLS, or XLSX (max 5MB)</div>
                  </>
                )}
              </div>

              {importPreview.length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    Preview (first 5 rows)
                  </h4>
                  <div className="admin-table-container" style={{ border: '1px solid var(--admin-gray-light)', borderRadius: '8px' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Service</th>
                          <th>City</th>
                          <th>Experience</th>
                        </tr>
                      </thead>
                      <tbody>
                        {importPreview.map((row, index) => (
                          <tr key={index}>
                            <td>{row.name || '-'}</td>
                            <td>{row.phone || '-'}</td>
                            <td>{row.title || '-'}</td>
                            <td>{row.city || '-'}</td>
                            <td>{row.experience ? `${row.experience} yrs` : '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <button
                  type="button"
                  className="admin-btn admin-btn-outline admin-btn-sm"
                  onClick={downloadTemplate}
                >
                  <Icon icon="solar:download-bold" />
                  Download Template
                </button>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => {
                  setShowImportModal(false);
                  setImportFile(null);
                  setImportPreview([]);
                }}
              >
                Cancel
              </button>
              <button
                className="admin-btn admin-btn-success"
                onClick={handleImport}
                disabled={!importFile || importLoading}
              >
                {importLoading ? (
                  <>
                    <span className="admin-spinner" style={{ width: 18, height: 18 }} />
                    Importing...
                  </>
                ) : (
                  <>
                    <Icon icon="solar:upload-bold" />
                    Import Workers
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedWorker && (
        <div className="admin-modal-overlay" onClick={() => {
          setShowDeleteModal(false);
          setSelectedWorker(null);
        }}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Delete Worker</h3>
              <button
                className="admin-modal-close"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedWorker(null);
                }}
              >
                <Icon icon="solar:close-circle-linear" />
              </button>
            </div>
            <div className="admin-modal-body">
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{
                  width: 64,
                  height: 64,
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <Icon icon="solar:trash-bin-minimalistic-bold" style={{ fontSize: '2rem', color: 'var(--admin-danger)' }} />
                </div>
                <h4 style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>Are you sure?</h4>
                <p style={{ color: 'var(--admin-gray)', margin: 0 }}>
                  You are about to delete <strong>{selectedWorker.name}</strong>.<br />
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedWorker(null);
                }}
              >
                Cancel
              </button>
              <button
                className="admin-btn admin-btn-danger"
                onClick={handleDeleteWorker}
                disabled={formLoading}
              >
                {formLoading ? (
                  <>
                    <span className="admin-spinner" style={{ width: 18, height: 18 }} />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Icon icon="solar:trash-bin-minimalistic-bold" />
                    Delete Worker
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkersManagement;
