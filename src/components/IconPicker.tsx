import { useState } from 'react';
import {
  LayoutGrid, Code2, Palette, Zap, BookOpen, Gamepad2,
  Globe, Star, Heart, Music, Film, ShoppingBag,
  Coffee, Camera, Map, Mail, MessageCircle, Phone,
  Calendar, Clock, Compass, Flag, Home, Image,
  Layers, Link2, Lock, Moon, Sun, Bookmark,
  Briefcase, Cloud, Database, FileText, Folder,
  Monitor, Smartphone, Tablet, Watch, Wifi,
  Shield, AlertCircle, CheckCircle, XCircle, Info,
} from 'lucide-react';

const ICON_LIST = [
  { name: 'LayoutGrid', Component: LayoutGrid },
  { name: 'Code2', Component: Code2 },
  { name: 'Palette', Component: Palette },
  { name: 'Zap', Component: Zap },
  { name: 'BookOpen', Component: BookOpen },
  { name: 'Gamepad2', Component: Gamepad2 },
  { name: 'Globe', Component: Globe },
  { name: 'Star', Component: Star },
  { name: 'Heart', Component: Heart },
  { name: 'Music', Component: Music },
  { name: 'Film', Component: Film },
  { name: 'ShoppingBag', Component: ShoppingBag },
  { name: 'Coffee', Component: Coffee },
  { name: 'Camera', Component: Camera },
  { name: 'Map', Component: Map },
  { name: 'Mail', Component: Mail },
  { name: 'MessageCircle', Component: MessageCircle },
  { name: 'Phone', Component: Phone },
  { name: 'Calendar', Component: Calendar },
  { name: 'Clock', Component: Clock },
  { name: 'Compass', Component: Compass },
  { name: 'Flag', Component: Flag },
  { name: 'Home', Component: Home },
  { name: 'Image', Component: Image },
  { name: 'Layers', Component: Layers },
  { name: 'Link2', Component: Link2 },
  { name: 'Lock', Component: Lock },
  { name: 'Moon', Component: Moon },
  { name: 'Sun', Component: Sun },
  { name: 'Bookmark', Component: Bookmark },
  { name: 'Briefcase', Component: Briefcase },
  { name: 'Cloud', Component: Cloud },
  { name: 'Database', Component: Database },
  { name: 'FileText', Component: FileText },
  { name: 'Folder', Component: Folder },
  { name: 'Monitor', Component: Monitor },
  { name: 'Smartphone', Component: Smartphone },
  { name: 'Tablet', Component: Tablet },
  { name: 'Watch', Component: Watch },
  { name: 'Wifi', Component: Wifi },
  { name: 'Shield', Component: Shield },
  { name: 'AlertCircle', Component: AlertCircle },
  { name: 'CheckCircle', Component: CheckCircle },
  { name: 'XCircle', Component: XCircle },
  { name: 'Info', Component: Info },
];

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="选择图标"
        style={{
          width: '48px',
          height: '40px',
          borderRadius: '10px',
          border: '1px solid var(--color-border)',
          background: 'var(--color-background)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--color-foreground)',
        }}
      >
        {(() => {
          const Icon = ICON_LIST.find(i => i.name === value)?.Component;
          return Icon ? <Icon size={18} /> : <span style={{ fontSize: '12px' }}>?</span>;
        })()}
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            zIndex: 100,
            padding: '12px',
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '6px',
            animation: 'slideIn 0.15s ease-out',
          }}
        >
          {ICON_LIST.map(({ name, Component }) => (
            <button
              key={name}
              type="button"
              role="option"
              aria-selected={value === name}
              aria-label={name}
              onClick={() => {
                onChange(name);
                setOpen(false);
              }}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: `2px solid ${value === name ? 'var(--color-accent)' : 'transparent'}`,
                background: value === name ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-foreground)',
                transition: 'border-color 0.15s ease, background-color 0.15s ease',
              }}
              title={name}
            >
              <Component size={16} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
