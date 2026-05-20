import { useState, useRef, useEffect } from 'react';
import { X, KeyRound, AlertCircle } from 'lucide-react';

interface KeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (key: string) => void;
}

export default function KeyModal({ isOpen, onClose, onConfirm }: KeyModalProps) {
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setKey('');
      setError(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      onConfirm(key.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.2s ease-out',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="key-modal-title"
        style={{
          background: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '20px',
          padding: '32px',
          width: '100%',
          maxWidth: '400px',
          animation: 'slideIn 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(37, 99, 235, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-accent)',
            }}>
              <KeyRound size={20} />
            </div>
            <div>
              <h2 id="key-modal-title" style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--color-foreground)',
                margin: 0,
              }}>
                输入密钥
              </h2>
              <p style={{
                fontSize: '13px',
                color: 'var(--color-muted-foreground)',
                margin: '4px 0 0',
              }}>
                输入密钥以开启编辑模式
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="关闭"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: 'none',
              background: 'transparent',
              color: 'var(--color-muted-foreground)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease, color 0.15s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--color-muted)';
              e.currentTarget.style.color = 'var(--color-foreground)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <input
              ref={inputRef}
              type="password"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                setError(false);
              }}
              placeholder="请输入密钥..."
              aria-describedby={error ? 'key-modal-error' : undefined}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: `2px solid ${error ? 'var(--color-destructive)' : 'var(--color-border)'}`,
                background: 'var(--color-background)',
                color: 'var(--color-foreground)',
                fontSize: '15px',
                fontFamily: 'inherit',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = 'var(--color-accent)';
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = 'var(--color-border)';
              }}
            />
            {error && (
              <div id="key-modal-error" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '8px',
                color: 'var(--color-destructive)',
                fontSize: '13px',
                animation: 'shake 0.3s ease-in-out',
              }}>
                <AlertCircle size={14} />
                密钥错误，请重试
              </div>
            )}
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid var(--color-border)',
                background: 'transparent',
                color: 'var(--color-foreground)',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
                fontFamily: 'inherit',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--color-muted)';
              }}
            >
              取消
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                background: 'var(--color-accent)',
                color: 'var(--color-on-accent)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
                fontFamily: 'inherit',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#1d4ed8';
              }}
            >
              确认
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
