import { useState } from 'react';
import './App.css';
import { TableRowDialogDemo } from './table-row-dialog/TableRowDialogDemo';
import { ClearableSelectDemo } from './clearable-select/ClearableSelectDemo';

function App() {
  const [activeTab, setActiveTab] = useState('clearable-select');
  const [count, setCount] = useState(0);

  return (
    <div className="app-shell">
      {/* Navigation / Tabs */}
      <nav className="app-nav">
        <div className="app-nav-brand">
          <span className="brand-dot">⚛️</span>
          <strong>React Lab</strong>
        </div>
        <div className="app-nav-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'clearable-select' ? 'active' : ''}`}
            onClick={() => setActiveTab('clearable-select')}
          >
            🗑️ Shadcn Clearable Select
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'table-dialog' ? 'active' : ''}`}
            onClick={() => setActiveTab('table-dialog')}
          >
            📋 Table Row & Dialog Form
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'starter' ? 'active' : ''}`}
            onClick={() => setActiveTab('starter')}
          >
            ⚡ Starter Card
          </button>
        </div>
      </nav>

      {/* Active Tab View */}
      <main className="app-main">
        {activeTab === 'clearable-select' && <ClearableSelectDemo />}
        {activeTab === 'table-dialog' && <TableRowDialogDemo />}

        {activeTab === 'starter' && (
          <div className="container">
            <div className="card">
              <span className="badge">React 18 + Vite</span>
              <h1>⚛️ React Lab</h1>
              <p className="subtitle">
                A clean starting point for your experimental React components and explorations.
              </p>

              <div className="counter-box">
                <button type="button" onClick={() => setCount((prev) => prev + 1)}>
                  Count: {count}
                </button>
                <button
                  type="button"
                  className="reset-btn"
                  onClick={() => setCount(0)}
                >
                  Reset
                </button>
              </div>

              <p className="read-the-docs">
                To test the new implementation, switch to the <strong>Table Row & Dialog Form</strong> tab above or inspect the <code>src/table-row-dialog/</code> directory.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
