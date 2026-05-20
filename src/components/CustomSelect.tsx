import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomSelect({ value, options, onChange, placeholder = '请选择...' }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    const idx = options.findIndex(o => o.value === value);
    if (idx >= 0) setHighlighted(idx);
  }, [value, options]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlighted(i => (i + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlighted(i => (i - 1 + options.length) % options.length);
        break;
      case 'Enter':
        e.preventDefault();
        onChange(options[highlighted].value);
        setOpen(false);
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: '10px',
          border: `1px solid ${open ? 'var(--color-accent)' : 'var(--color-border)'}`,
          background: 'var(--color-background)',
          color: selected ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
          fontSize: '14px',
          fontFamily: 'inherit',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'border-color 0.15s ease',
        }}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDown size={16} style={{
          color: 'var(--color-muted-foreground)',
          transition: 'transform 0.15s ease',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }} />
      </button>

      {open && (
        <div role="listbox" style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          background: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          zIndex: 50,
          maxHeight: '240px',
          overflow: 'auto',
          animation: 'slideIn 0.15s ease-out',
        }}>
          {options.map((opt, idx) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              onMouseEnter={() => setHighlighted(idx)}
              style={{
                width: '100%',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: idx === highlighted ? 'var(--color-muted)' : 'transparent',
                color: 'var(--color-foreground)',
                fontSize: '14px',
                fontFamily: 'inherit',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                borderRadius: idx === 0 ? '10px 10px 0 0' : idx === options.length - 1 ? '0 0 10px 10px' : 0,
                transition: 'background 0.1s ease',
              }}
            >
              <span>{opt.label}</span>
              {opt.value === value && <Check size={16} color="var(--color-accent)" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
