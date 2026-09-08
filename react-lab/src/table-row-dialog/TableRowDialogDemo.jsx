import { useState } from 'react';
import { initialUsers } from './data';
import { UserTable } from './UserTable';
import { EditUserDialog } from './EditUserDialog';
import './table-row-dialog.css';

/**
 * TableRowDialogDemo
 * 
 * Stack Overflow Question:
 * "How do I trigger a dialog Form by clicking a table row?"
 * https://stackoverflow.com/questions/80000947/how-do-i-trigger-a-dialog-form-by-clicking-a-table-row
 * 
 * Architecture & Solution:
 * 1. Instead of navigating away via a router, `selectedUser` and `isDialogOpen`
 *    state are managed at the table container level.
 * 2. When a row is clicked, `handleRowClick(user)` is executed:
 *    - setSelectedUser(user)
 *    - setIsDialogOpen(true)
 * 3. A single `<EditUserDialog />` component is rendered overlaying the table.
 *    (Embedding modals inside every row bloats the DOM; a single lifted modal is optimal.)
 * 4. Dedicated row action buttons apply `e.stopPropagation()` so clicking them
 *    does not trigger the parent row's dialog.
 */
export function TableRowDialogDemo() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // 1. Trigger dialog form when row is clicked
  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  // 2. Close dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  // 3. Update row data on form save
  const handleSaveUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((item) => (item.id === updatedUser.id ? { ...item, ...updatedUser } : item))
    );
    showToast(`✓ "${updatedUser.name}" details successfully updated.`);
  };

  // Quick status toggle (demonstrates stopPropagation)
  const handleToggleStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus =
            u.status === 'Active' ? 'Pending' : u.status === 'Pending' ? 'Inactive' : 'Active';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
    showToast('⚡ User status toggled (row click prevented via stopPropagation).');
  };

  // Delete row
  const handleDeleteUser = (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    showToast('🗑️ User removed from list.');
  };

  // Reset sample data
  const handleReset = () => {
    setUsers(initialUsers);
    showToast('↺ Sample data reset to default.');
  };

  return (
    <div className="trd-container">
      {/* Header & Context */}
      <header className="trd-header">
        <span className="trd-pill-badge">Problem Solution &bull; Lab Exercise</span>
        <h1 className="trd-title">Triggering a Dialog Form from a Table Row</h1>
        <p className="trd-description">
          Clicking any row in the table opens an interactive Dialog / Modal form pre-populated
          with that record’s details without losing the table view in the background.
        </p>

        {/* Stack Overflow Reference Box */}
        <div className="trd-callout">
          <div className="trd-callout-header">
            <span>📌 Stack Overflow Case Study</span>
            <a
              href="https://stackoverflow.com/questions/80000947/how-do-i-trigger-a-dialog-form-by-clicking-a-table-row"
              target="_blank"
              rel="noreferrer"
              className="trd-callout-link"
            >
              Open Original Question ↗
            </a>
          </div>
          <p className="trd-callout-body">
            <strong>Common Pitfall:</strong> Triggering <code>useNavigate()</code> to a new URL
            route unmounts the background table. Instead, a modal overlay is desired.
            <br />
            <strong>Recommended Solution:</strong> Maintain <code>selectedUser</code> and{' '}
            <code>isDialogOpen</code> state in the parent container, populate them on row click,
            and render a single reusable modal overlay.
          </p>
        </div>
      </header>

      {/* Toolbar */}
      <div className="trd-toolbar">
        <div className="trd-stats">
          Showing <span>{users.length}</span> records &bull;{' '}
          <span className="trd-hint">💡 Click any row to edit</span>
        </div>
        <div>
          <button type="button" className="trd-btn-icon" onClick={handleReset}>
            ↺ Reset Data
          </button>
        </div>
      </div>

      {/* Table Component */}
      <UserTable
        users={users}
        onRowClick={handleRowClick}
        onToggleStatus={handleToggleStatus}
        onDeleteUser={handleDeleteUser}
      />

      {/* Dialog Form Triggered by Row Click */}
      <EditUserDialog
        user={selectedUser}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveUser}
      />

      {/* Notification Toast */}
      {toastMessage && <div className="trd-toast">{toastMessage}</div>}
    </div>
  );
}

export default TableRowDialogDemo;
