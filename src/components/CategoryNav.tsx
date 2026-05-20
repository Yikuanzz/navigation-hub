import { useMemo } from 'react';
import * as Icons from 'lucide-react';
import type { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryNav({ categories, activeCategory, onCategoryChange }: CategoryNavProps) {
  const iconMap = useMemo(() => {
    const map: Record<string, React.ReactNode> = {};
    categories.forEach((cat) => {
      // @ts-expect-error dynamic icon lookup
      const Icon = Icons[cat.icon] as React.ComponentType<{ size?: number }>;
      map[cat.id] = Icon ? <Icon size={18} /> : <Icons.LayoutGrid size={18} />;
    });
    return map;
  }, [categories]);

  return (
    <nav aria-label="分类导航" style={{
      display: 'flex',
      gap: '8px',
      padding: '24px 24px 0',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
      flexWrap: 'wrap',
    }}>
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            aria-pressed={isActive}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '10px',
              border: '1px solid',
              borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border)',
              background: isActive ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
              color: isActive ? 'var(--color-accent)' : 'var(--color-muted-foreground)',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 500,
              cursor: 'pointer',
              transition: 'border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
            }}
            onMouseOver={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'var(--color-muted-foreground)';
                e.currentTarget.style.color = 'var(--color-foreground)';
              }
            }}
            onMouseOut={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.color = 'var(--color-muted-foreground)';
              }
            }}
          >
            {iconMap[cat.id]}
            {cat.name}
          </button>
        );
      })}
    </nav>
  );
}
