import { useState } from 'react';
import { Compass, Settings, Check, X } from 'lucide-react';

interface HeaderProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onRequestEditMode: () => void;
}

export default function Header({ isEditMode, onToggleEditMode, onRequestEditMode }: HeaderProps) {
  const [, setShowHint] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #2563EB, #1d4ed8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
          }}>
            <Compass size={22} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--color-foreground)',
              letterSpacing: '-0.5px',
              lineHeight: 1.2,
            }}>
              NavHub
            </h1>
            <p style={{
              fontSize: '12px',
              color: 'var(--color-muted-foreground)',
              lineHeight: 1.2,
            }}>
              智能导航中心
            </p>
          </div>
        </div>

        {/* Edit Mode Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          {isEditMode && (
            <span style={{
              fontSize: '13px',
              color: 'var(--color-accent)',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              animation: 'fadeIn 0.2s ease-out',
            }}>
              <Check size={14} />
              编辑模式
            </span>
          )}
          <button
            onClick={isEditMode ? onToggleEditMode : onRequestEditMode}
            onMouseEnter={() => setShowHint(true)}
            onMouseLeave={() => setShowHint(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '10px',
              border: '1px solid',
              borderColor: isEditMode ? 'var(--color-destructive)' : 'var(--color-border)',
              background: isEditMode ? 'rgba(239, 68, 68, 0.1)' : 'var(--color-card)',
              color: isEditMode ? 'var(--color-destructive)' : 'var(--color-foreground)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'border-color 0.15s ease, background-color 0.15s ease',
              fontFamily: 'inherit',
            }}
            onMouseOver={(e) => {
              if (!isEditMode) {
                e.currentTarget.style.borderColor = 'var(--color-accent)';
                e.currentTarget.style.background = 'rgba(37, 99, 235, 0.1)';
              }
            }}
            onMouseOut={(e) => {
              if (!isEditMode) {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.background = 'var(--color-card)';
              }
            }}
          >
            {isEditMode ? (
              <>
                <X size={16} />
                退出编辑
              </>
            ) : (
              <>
                <Settings size={16} />
                编辑模式
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
