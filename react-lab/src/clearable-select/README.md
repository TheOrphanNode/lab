# Shadcn / Radix UI Clearable Select (Remove Selected Value)

This documentation covers the root cause analysis, event lifecycle breakdown, and a production-ready solution for the problem described in [Stack Overflow #79189982](https://stackoverflow.com/questions/79189982/remove-selected-value-shadcn).

---

## 1. Root Cause Analysis (Why didn't it work?)

The developer in the Stack Overflow question placed an `X` (close/clear) icon inside `SelectTrigger` and only attached an `onClick` listener:

```tsx
// ❌ BROKEN APPROACH
const handleClear = useCallback((e: React.MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();
  onChange?.('');
}, [onChange]);

<Trigger {...props}>
  {children}
  <X onClick={handleClear} />
</Trigger>
```

### Why does this fail?

1. **Radix UI relies on `onPointerDown`**: Radix UI's `<SelectPrimitive.Trigger>` manages menu toggle behavior via the `onPointerDown` event (fired the instant the mouse button is pressed down), not `onClick`, and calls `event.preventDefault()`.
2. **Browser Event Dispatch Order**: During a mouse click, the browser dispatches events in this sequence:
   `pointerdown` ➔ `mousedown` ➔ `pointerup` ➔ `mouseup` ➔ `click`
   Because `onPointerDown` was not intercepted (`stopPropagation` was never called on pointerdown), the event bubbles straight up to the parent `Trigger` button, immediately opening the dropdown. The subsequent `click` event is either suppressed or arrives after the dropdown has already opened.
3. **HTML Button Nesting Violation**: Radix UI's `Trigger` renders an HTML `<button>` by default. Nesting an interactive `<button>` inside another `<button>` (or inside Radix's `SelectPrimitive.Icon`) is invalid HTML and causes focus and accessibility issues.

---

## 2. The Solution (The Fix)

To properly clear the selection without opening the menu, intercept both `onPointerDown`, `onClick`, and keyboard events, calling `e.stopPropagation()` and `e.preventDefault()`:

```tsx
const handleClearPointerDown = (e: React.PointerEvent) => {
  // Critical: prevents the Radix UI Trigger from opening the dropdown menu!
  e.stopPropagation();
  e.preventDefault();
};

const handleClearClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();
  onClear?.();
};

const handleClearKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.stopPropagation();
    e.preventDefault();
    onClear?.();
  }
};
```

And the clear button element:

```tsx
{showClear && (
  <span
    role="button"
    tabIndex={0}
    aria-label="Clear selection"
    title="Clear selection"
    className="shadcn-select-clear-btn"
    onPointerDown={handleClearPointerDown}
    onClick={handleClearClick}
    onKeyDown={handleClearKeyDown}
  >
    <X className="h-4 w-4" />
  </span>
)}
```

---

## 3. Resetting Values in Radix UI (`value=""`)

From the internal Radix UI Select source code:
```js
function shouldShowPlaceholder(value) {
  return value === "" || value === void 0;
}
```
Setting a controlled `value` prop to `""` (empty string) automatically restores and displays the placeholder text.

---

## 4. Usage Example

```tsx
import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from './select';

export function Example() {
  const [selectedValue, setSelectedValue] = useState('option-1');

  return (
    <Select value={selectedValue} onValueChange={setSelectedValue}>
      <SelectTrigger
        clearable={Boolean(selectedValue)}
        onClear={() => setSelectedValue('')}
      >
        <SelectValue placeholder="Select an option..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option-1">Option 1</SelectItem>
        <SelectItem value="option-2">Option 2</SelectItem>
        <SelectItem value="option-3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}
```
