import { useState, useEffect } from 'react';

/**
 * EditUserDialog
 * 
 * Represents the Dialog / Modal Form opened when a table row is clicked.
 * 
 * Core pattern addressing the Stack Overflow question:
 * - Instead of navigating away via routing (useNavigate('/edit/...')),
 *   a modal opens directly over the table to keep page context intact.
 * - Selected row data (selectedUser) is passed down via props.
 * - Saving updates the parent table state and closes the dialog.
 */
export function EditUserDialog({ user, isOpen, onClose, onSave }) {
  // Local state for the form inputs within the dialog
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'Active',
    location: '',
    bio: '',
  });

  // Re-sync form state when selected user changes
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        department: user.department || '',
        status: user.status || 'Active',
        location: user.location || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  // Accessibility (a11y): Close dialog on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div
      className="trd-dialog-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      {/* e.stopPropagation() prevents backdrop click handler from closing when clicking inside the panel */}
      <div
        className="trd-dialog-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="trd-dialog-header">
          <div className="trd-dialog-title-wrap">
            <h2 id="dialog-title" className="trd-dialog-title">
              Edit User Details
            </h2>
            <p className="trd-dialog-subtitle">
              ID #{user.id} &bull; Triggered by row click
            </p>
          </div>
          <button
            type="button"
            className="trd-dialog-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="trd-form">
          <div className="trd-form-row">
            <div className="trd-field">
              <label className="trd-label" htmlFor="user-name">Full Name</label>
              <input
                id="user-name"
                name="name"
                type="text"
                className="trd-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="trd-field">
              <label className="trd-label" htmlFor="user-email">Email Address</label>
              <input
                id="user-email"
                name="email"
                type="email"
                className="trd-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="trd-form-row">
            <div className="trd-field">
              <label className="trd-label" htmlFor="user-role">Role / Title</label>
              <input
                id="user-role"
                name="role"
                type="text"
                className="trd-input"
                value={formData.role}
                onChange={handleChange}
              />
            </div>

            <div className="trd-field">
              <label className="trd-label" htmlFor="user-dept">Department</label>
              <input
                id="user-dept"
                name="department"
                type="text"
                className="trd-input"
                value={formData.department}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="trd-form-row">
            <div className="trd-field">
              <label className="trd-label" htmlFor="user-status">Status</label>
              <select
                id="user-status"
                name="status"
                className="trd-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="trd-field">
              <label className="trd-label" htmlFor="user-location">Location</label>
              <input
                id="user-location"
                name="location"
                type="text"
                className="trd-input"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="trd-field">
            <label className="trd-label" htmlFor="user-bio">Bio / Notes</label>
            <textarea
              id="user-bio"
              name="bio"
              rows={3}
              className="trd-textarea"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          <div className="trd-dialog-actions">
            <button
              type="button"
              className="trd-btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="trd-btn-save"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
