import React, { useState } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import './clearable-select.css';

/**
 * The BUGGY Trigger from the Stack Overflow question:
 * - Only listens to onClick
 * - Does not intercept onPointerDown
 * - Drops event because Radix handles onPointerDown and opens the dropdown
 */
const BuggySelectTrigger = React.forwardRef(
  ({ children, value, onClear, ...props }, ref) => {
    const handleClear = (e) => {
      // In the SO question, the user wrote this with only onClick
      console.log('SO Buggy clear clicked');
      e.stopPropagation();
      e.preventDefault();
      onClear?.();
    };

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className="shadcn-select-trigger"
        {...props}
      >
        <span className="shadcn-select-trigger-content">{children}</span>
        <span className="shadcn-select-trigger-actions">
          {value && (
            <span
              className="shadcn-select-clear-btn"
              onClick={handleClear}
              title="Buggy clear attempt (onClick only)"
            >
              <X className="shadcn-select-clear-icon" />
            </span>
          )}
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="shadcn-select-chevron-icon" />
          </SelectPrimitive.Icon>
        </span>
      </SelectPrimitive.Trigger>
    );
  }
);
BuggySelectTrigger.displayName = 'BuggySelectTrigger';

export function ClearableSelectDemo() {
  // Working Select State
  const [framework, setFramework] = useState('react');
  // Second example (e.g. fruit selection)
  const [fruit, setFruit] = useState('');
  // Buggy demonstration state
  const [buggyFramework, setBuggyFramework] = useState('nextjs');
  // Log message to show what happened
  const [eventLog, setEventLog] = useState([]);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setEventLog((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 4)]);
  };

  return (
    <div className="clearable-demo-container">
      {/* Header */}
      <div className="clearable-demo-header">
        <h2>Shadcn / Radix UI Clearable Select</h2>
        <p>
          Root cause analysis and complete solution for the &quot;Remove selected value in shadcn Select&quot;
          problem from Stack Overflow question (<strong>#79189982</strong>).
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="clearable-demo-grid">
        {/* WORKING SOLUTION */}
        <div className="demo-card success-border">
          <div className="demo-card-title">
            <h3>Working Solution</h3>
            <span className="status-tag working">Fix Active ✓</span>
          </div>
          <p className="demo-card-desc">
            Calling <code>e.stopPropagation()</code> and <code>e.preventDefault()</code> on{' '}
            <code>onPointerDown</code> prevents the menu from opening and cleanly clears the selection.
          </p>

          <div className="demo-field-group">
            <label className="demo-label">Framework Selection (Clearable)</label>
            <Select
              value={framework}
              onValueChange={(val) => {
                setFramework(val);
                addLog(`Selection changed: "${val}"`);
              }}
            >
              <SelectTrigger
                clearable={Boolean(framework)}
                onClear={() => {
                  setFramework('');
                  addLog('Clear (X) clicked -> Value reset, menu prevented from opening.');
                }}
              >
                <SelectValue placeholder="Select a framework..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React.js</SelectItem>
                <SelectItem value="nextjs">Next.js</SelectItem>
                <SelectItem value="vue">Vue.js</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
                <SelectItem value="svelte">Svelte</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="demo-state-box">
            <span>Current Value:</span>
            <span className="demo-state-val">
              {framework ? `"${framework}"` : 'Empty (Showing placeholder)'}
            </span>
          </div>

          <div className="demo-actions">
            <button
              type="button"
              className="reset-btn"
              onClick={() => {
                setFramework('react');
                addLog('Framework reset to "react".');
              }}
            >
              Reset to Default
            </button>
          </div>
        </div>

        {/* BUGGY STACK OVERFLOW REPRODUCTION */}
        <div className="demo-card error-border">
          <div className="demo-card-title">
            <h3>Buggy Code (Stack Overflow Reproduction)</h3>
            <span className="status-tag broken">Bug Simulation ⚠</span>
          </div>
          <p className="demo-card-desc">
            When only <code>onClick</code> is listened to, Radix UI opens the dropdown the moment the mouse is pressed down (<code>pointerdown</code>).
            Clicking the <code>(X)</code> button still opens the menu!
          </p>

          <div className="demo-field-group">
            <label className="demo-label">Buggy Clear (Try clicking the X button)</label>
            <Select
              value={buggyFramework}
              onValueChange={(val) => setBuggyFramework(val)}
            >
              <BuggySelectTrigger
                value={buggyFramework}
                onClear={() => {
                  setBuggyFramework('');
                  addLog('Buggy code: X triggered BUT menu opened anyway!');
                }}
              >
                <SelectValue placeholder="Select a framework..." />
              </BuggySelectTrigger>
              <SelectContent>
                <SelectItem value="react">React.js</SelectItem>
                <SelectItem value="nextjs">Next.js</SelectItem>
                <SelectItem value="vue">Vue.js</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="demo-state-box">
            <span>Current Value:</span>
            <span className="demo-state-val">
              {buggyFramework ? `"${buggyFramework}"` : 'Empty'}
            </span>
          </div>

          <div className="demo-actions">
            <button
              type="button"
              className="reset-btn"
              onClick={() => setBuggyFramework('nextjs')}
            >
              Reset to Default
            </button>
          </div>
        </div>
      </div>

      {/* Second example: Fruit with empty start */}
      <div className="demo-card">
        <div className="demo-card-title">
          <h3>Second Example: Starts Empty with Keyboard Accessibility</h3>
          <span className="status-tag working">A11y Support</span>
        </div>
        <p className="demo-card-desc">
          The (X) button is fully keyboard accessible (<code>tabIndex={0}</code>,{' '}
          <code>role="button"</code>, <code>Enter</code> and <code>Space</code> keys).
        </p>

        <div className="demo-field-group">
          <label className="demo-label">Fruit Selection</label>
          <Select
            value={fruit}
            onValueChange={(val) => {
              setFruit(val);
              addLog(`Fruit selected: "${val}"`);
            }}
          >
            <SelectTrigger
              clearable={Boolean(fruit)}
              onClear={() => {
                setFruit('');
                addLog('Fruit selection cleared.');
              }}
            >
              <SelectValue placeholder="Select a fruit..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">🍎 Apple</SelectItem>
              <SelectItem value="banana">🍌 Banana</SelectItem>
              <SelectItem value="strawberry">🍓 Strawberry</SelectItem>
              <SelectItem value="orange">🍊 Orange</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="demo-state-box">
          <span>Event Log:</span>
          <span style={{ fontSize: '0.75rem', color: '#a5b4fc' }}>
            {eventLog[0] || 'No activity yet'}
          </span>
        </div>
      </div>

      {/* Technical Explanation */}
      <div className="explanation-card">
        <h3>Why Did It Fail &amp; How Was It Fixed?</h3>

        <div className="explanation-list">
          <div className="explanation-item">
            <span className="explanation-bullet">1</span>
            <div className="explanation-text">
              <h4>Radix UI Listens to `onPointerDown`</h4>
              <p>
                Radix UI&apos;s <code>SelectPrimitive.Trigger</code> component opens the menu on{' '}
                <code>onPointerDown</code> (the instant the mouse button is pressed), not on <code>onClick</code>,
                and immediately calls <code>event.preventDefault()</code>. Therefore, attaching only an{' '}
                <code>onClick</code> handler cannot prevent the menu from opening.
              </p>
            </div>
          </div>

          <div className="explanation-item">
            <span className="explanation-bullet">2</span>
            <div className="explanation-text">
              <h4>Solution: Intercept the `onPointerDown` Event</h4>
              <p>
                Both <code>e.stopPropagation()</code> and <code>e.preventDefault()</code> must be added to the
                clear icon&apos;s <code>onPointerDown</code> handler. This stops the event from bubbling up to
                the Trigger, clearing the selection directly without opening the menu.
              </p>
              <div className="code-snippet-box">
                <div>// ❌ BROKEN (Stack Overflow code):</div>
                <div className="code-hl-err">&lt;X onClick=&#123;handleClear&#125; /&gt;</div>
                <br />
                <div>// ✅ WORKING SOLUTION:</div>
                <div className="code-hl-fix">
                  &lt;span
                  <br />
                  &nbsp;&nbsp;role=&quot;button&quot;
                  <br />
                  &nbsp;&nbsp;tabIndex=&#123;0&#125;
                  <br />
                  &nbsp;&nbsp;onPointerDown=&#123;(e) =&gt; &#123; e.stopPropagation(); e.preventDefault(); &#125;&#125;
                  <br />
                  &nbsp;&nbsp;onClick=&#123;(e) =&gt; &#123; e.stopPropagation(); e.preventDefault(); onClear?.(); &#125;&#125;
                  <br />
                  &nbsp;&nbsp;onKeyDown=&#123;(e) =&gt; &#123; if (e.key === &apos;Enter&apos; || e.key === &apos; &apos;) &#123; e.stopPropagation(); onClear?.(); &#125; &#125;&#125;
                  <br />
                  &gt;
                  <br />
                  &nbsp;&nbsp;&lt;X className=&quot;h-4 w-4&quot; /&gt;
                  <br />
                  &lt;/span&gt;
                </div>
              </div>
            </div>
          </div>

          <div className="explanation-item">
            <span className="explanation-bullet">3</span>
            <div className="explanation-text">
              <h4>HTML Standards Compliance (No Button Inside Button)</h4>
              <p>
                <code>SelectTrigger</code> renders as a <code>&lt;button&gt;</code> in HTML. Per the HTML specification,
                a button cannot be nested inside another button. For this reason, the clear element should be a{' '}
                <code>&lt;span&gt;</code> with <code>role=&quot;button&quot;</code> and <code>tabIndex=&#123;0&#125;</code>,
                handling both pointer and keyboard events.
              </p>
            </div>
          </div>

          <div className="explanation-item">
            <span className="explanation-bullet">4</span>
            <div className="explanation-text">
              <h4>Resetting the Value (Restoring Placeholder)</h4>
              <p>
                In Radix UI&apos;s internal source code, <code>shouldShowPlaceholder(value)</code> automatically displays
                the placeholder whenever <code>value === &quot;&quot; || value === undefined</code>. Calling{' '}
                <code>{'onClear={() => setValue("")}'}</code> cleanly resets the component back to its default placeholder state.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
