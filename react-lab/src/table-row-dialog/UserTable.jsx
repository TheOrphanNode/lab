/**
 * UserTable
 * 
 * Attaches row click handlers (onClick) to trigger the dialog form.
 * Independent action buttons inside the row (e.g. quick status toggle, delete)
 * employ `e.stopPropagation()` to prevent unwanted dialog openings.
 */
export function UserTable({ users, onRowClick, onToggleStatus, onDeleteUser }) {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      Active: { label: 'Active', className: 'trd-badge-active' },
      Pending: { label: 'Pending', className: 'trd-badge-pending' },
      Inactive: { label: 'Inactive', className: 'trd-badge-inactive' },
    };
    const current = statusMap[status] || { label: status, className: 'trd-badge-active' };

    return (
      <span className={`trd-badge ${current.className}`}>
        ● {current.label}
      </span>
    );
  };

  return (
    <div className="trd-table-card">
      <table className="trd-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role & Department</th>
            <th>Location</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Quick Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="trd-row-clickable"
              onClick={() => onRowClick(user)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onRowClick(user);
                }
              }}
              title="Click to open form"
            >
              <td>
                <div className="trd-user-cell">
                  <div className="trd-avatar">{getInitials(user.name)}</div>
                  <div className="trd-user-info">
                    <span className="trd-user-name">
                      {user.name}
                      <span className="trd-row-arrow">↗ edit</span>
                    </span>
                    <span className="trd-user-email">{user.email}</span>
                  </div>
                </div>
              </td>

              <td>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 500, color: 'var(--trd-text-primary)' }}>
                    {user.role}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--trd-text-muted)' }}>
                    {user.department}
                  </span>
                </div>
              </td>

              <td>{user.location || '-'}</td>

              <td>{getStatusBadge(user.status)}</td>

              <td className="trd-actions-cell">
                {/* 
                  NOTE: e.stopPropagation() prevents the row's onClick event 
                  from firing, ensuring this button does not trigger the dialog!
                */}
                <button
                  type="button"
                  className="trd-btn-icon"
                  title="Quickly toggle status (demonstrates stopPropagation)"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStatus(user.id);
                  }}
                >
                  ⚡ Status
                </button>
                <span style={{ margin: '0 4px' }} />
                <button
                  type="button"
                  className="trd-btn-icon trd-btn-danger"
                  title="Delete user (demonstrates stopPropagation)"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteUser(user.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
