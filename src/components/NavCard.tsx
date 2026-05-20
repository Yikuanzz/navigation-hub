import { ExternalLink, Pencil, Trash2 } from 'lucide-react';
import type { NavItem } from '../types';

interface NavCardProps {
  item: NavItem;
  isEditMode: boolean;
  onEdit: (item: NavItem) => void;
  onDelete: (id: string) => void;
}

// Determine if a color is dark (needs white text) or light (needs dark text)
function isDarkColor(hex: string): boolean {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

export default function NavCard({ item, isEditMode, onEdit, onDelete }: NavCardProps) {
  const iconBg = item.color || '#6B7280';
  const iconTextColor = isDarkColor(iconBg) ? '#FFFFFF' : '#111827';

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    background: 'var(--color-card)',
    border: '1px solid var(--color-border)',
    borderRadius: '16px',
    padding: '20px',
    cursor: isEditMode ? 'default' : 'pointer',
    transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
    animation: 'fadeIn 0.3s ease-out',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    textDecoration: 'none',
    color: 'inherit',
  };

  const handleCardMouseOver = (e: React.MouseEvent<HTMLElement>) => {
    if (!isEditMode) {
      e.currentTarget.style.borderColor = 'var(--color-accent)';
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.1)';
    }
  };

  const handleCardMouseOut = (e: React.MouseEvent<HTMLElement>) => {
    if (!isEditMode) {
      e.currentTarget.style.borderColor = 'var(--color-border)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }
  };

  const cardContent = (
    <>
      {/* Edit Mode Actions */}
      {isEditMode && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          gap: '6px',
          zIndex: 10,
        }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(item); }}
            aria-label="编辑"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-secondary)',
              color: 'var(--color-on-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.background = '#DBEAFE';
              e.currentTarget.style.color = 'var(--color-accent)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.background = 'var(--color-secondary)';
              e.currentTarget.style.color = 'var(--color-on-secondary)';
            }}
            title="编辑"
          >
            <Pencil size={14} strokeWidth={2.5} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
            aria-label="删除"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-secondary)',
              color: 'var(--color-on-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-destructive)';
              e.currentTarget.style.background = 'var(--color-destructive-bg)';
              e.currentTarget.style.color = 'var(--color-destructive)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.background = 'var(--color-secondary)';
              e.currentTarget.style.color = 'var(--color-on-secondary)';
            }}
            title="删除"
          >
            <Trash2 size={14} strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* Card Content */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
      }}
      >
        {/* Icon */}
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: '20px',
            fontWeight: 700,
            color: iconTextColor,
            textTransform: 'uppercase',
            transition: 'transform 0.2s ease',
          }}
        >
          {item.name.charAt(0)}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '4px',
          }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-foreground)',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {item.name}
            </h3>
            {!isEditMode && (
              <ExternalLink
                size={14}
                style={{
                  color: 'var(--color-muted-foreground)',
                  flexShrink: 0,
                }}
              />
            )}
          </div>
          <p style={{
            fontSize: '13px',
            color: 'var(--color-muted-foreground)',
            lineHeight: 1.5,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
          >
            {item.description}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div style={{
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
      }}
      >
        {item.tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              background: '#EFF6FF',
              color: '#1E40AF',
              fontSize: '12px',
              fontWeight: 600,
              border: '1px solid #DBEAFE',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );

  if (isEditMode) {
    return (
      <div style={cardStyle}>
        {cardContent}
      </div>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      style={cardStyle}
      onMouseOver={handleCardMouseOver}
      onMouseOut={handleCardMouseOut}
    >
      {cardContent}
    </a>
  );
}
