import { Plus } from 'lucide-react';
import type { NavItem } from '../types';
import NavCard from './NavCard';

interface CardGridProps {
  items: NavItem[];
  isEditMode: boolean;
  onEdit: (item: NavItem) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export default function CardGrid({ items, isEditMode, onEdit, onDelete, onAdd }: CardGridProps) {
  if (items.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        gap: '16px',
      }}>
        <p style={{
          fontSize: '16px',
          color: 'var(--color-muted-foreground)',
        }}>
          没有找到匹配的导航项
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '16px',
      padding: '24px',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
    }}>
      {items.map((item) => (
        <NavCard
          key={item.id}
          item={item}
          isEditMode={isEditMode}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      {/* Add Button in Edit Mode */}
      {isEditMode && (
        <button
          onClick={onAdd}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '20px',
            borderRadius: '16px',
            border: '2px dashed var(--color-border)',
            background: 'transparent',
            color: 'var(--color-muted-foreground)',
            cursor: 'pointer',
            transition: 'border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease',
            minHeight: '140px',
            fontFamily: 'inherit',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent)';
            e.currentTarget.style.color = 'var(--color-accent)';
            e.currentTarget.style.background = 'rgba(37, 99, 235, 0.06)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)';
            e.currentTarget.style.color = 'var(--color-muted-foreground)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            border: '2px dashed currentColor',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Plus size={24} />
          </div>
          <span style={{
            fontSize: '14px',
            fontWeight: 500,
          }}>
            添加导航
          </span>
        </button>
      )}
    </div>
  );
}
