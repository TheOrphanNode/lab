import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import './clearable-select.css';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

/**
 * Enhanced SelectTrigger supporting clearable functionality.
 * 
 * Why the Stack Overflow attempt failed:
 * Radix UI's Trigger binds `onPointerDown` to toggle open state and calls `event.preventDefault()`.
 * An `onClick` on a nested element is either blocked or executed after `onPointerDown` has already
 * opened the dropdown. To fix this, we MUST intercept `onPointerDown` with `stopPropagation()`
 * and `preventDefault()`.
 */
const SelectTrigger = React.forwardRef(
  ({ className = '', children, clearable = false, onClear, value, disabled, ...props }, ref) => {
    const showClear = Boolean(clearable && onClear && !disabled);

    const handleClearPointerDown = (e) => {
      // Critical: stop pointerdown from bubbling to Radix's Trigger handler!
      e.stopPropagation();
      e.preventDefault();
    };

    const handleClearClick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onClear?.();
    };

    const handleClearKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.stopPropagation();
        e.preventDefault();
        onClear?.();
      }
    };

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        disabled={disabled}
        className={`shadcn-select-trigger ${className}`}
        {...props}
      >
        <span className="shadcn-select-trigger-content">{children}</span>

        <span className="shadcn-select-trigger-actions">
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
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef(({ className = '', ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={`shadcn-select-scroll-button ${className}`}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef(({ className = '', ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={`shadcn-select-scroll-button ${className}`}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef(
  ({ className = '', children, position = 'popper', ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        className={`shadcn-select-content ${position === 'popper' ? 'popper-position' : ''
          } ${className}`}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={`shadcn-select-viewport ${position === 'popper' ? 'popper-viewport' : ''
            }`}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef(({ className = '', ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={`shadcn-select-label ${className}`}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef(({ className = '', children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={`shadcn-select-item ${className}`}
    {...props}
  >
    <span className="shadcn-select-item-indicator">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef(({ className = '', ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={`shadcn-select-separator ${className}`}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
