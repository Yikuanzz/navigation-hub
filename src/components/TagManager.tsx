import { useState } from 'react';
import { Tags, Trash2, Pencil, Check, X } from 'lucide-react';
import { tagApi } from '../api/tags';
import { toast } from 'sonner';

interface TagManagerProps {
  tags: string[];
  onUpdate: () => void;
}

export default function TagManager({ tags, onUpdate }: TagManagerProps) {
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleDelete = async (tag: string) => {
    if (!window.confirm(`确定删除标签「${tag}」吗？`)) return;
    try {
      await tagApi.delete(tag);
      onUpdate();
      toast.success('标签已删除');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : '删除失败');
    }
  };

  const handleRename = async (oldName: string) => {
    if (!editValue.trim() || editValue.trim() === oldName) {
      setEditingTag(null);
      return;
    }
    try {
      await tagApi.rename(oldName, editValue.trim());
      setEditingTag(null);
      onUpdate();
      toast.success('标签已重命名');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : '重命名失败');
    }
  };

  return (
    <div style={{
      padding: '24px',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
    }}>
      <h2 style={{
        fontSize: '18px',
        fontWeight: 600,
        color: 'var(--color-foreground)',
        margin: '0 0 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <Tags size={20} />
        标签管理
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        {tags.map(tag => (
          <div key={tag} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--color-accent)',
              flexShrink: 0,
            }} />

            {editingTag === tag ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-accent)',
                    background: 'var(--color-background)',
                    color: 'var(--color-foreground)',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleRename(tag);
                    if (e.key === 'Escape') setEditingTag(null);
                  }}
                />
                <button
                  onClick={() => handleRename(tag)}
                  aria-label="保存"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-muted)',
                    color: 'var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(37, 99, 235, 0.15)';
                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'var(--color-muted)';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={() => setEditingTag(null)}
                  aria-label="取消"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-muted)',
                    color: 'var(--color-muted-foreground)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--color-destructive-bg)';
                    e.currentTarget.style.borderColor = 'var(--color-destructive)';
                    e.currentTarget.style.color = 'var(--color-destructive)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'var(--color-muted)';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.color = 'var(--color-muted-foreground)';
                  }}
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <>
                <span style={{
                  flex: 1,
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--color-foreground)',
                }}>
                  {tag}
                </span>
                <button
                  onClick={() => {
                    setEditingTag(tag);
                    setEditValue(tag);
                  }}
                  aria-label="编辑"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-muted)',
                    color: 'var(--color-muted-foreground)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(37, 99, 235, 0.12)';
                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                    e.currentTarget.style.color = 'var(--color-accent)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'var(--color-muted)';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.color = 'var(--color-muted-foreground)';
                  }}
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(tag)}
                  aria-label="删除"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-muted)',
                    color: 'var(--color-muted-foreground)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--color-destructive-bg)';
                    e.currentTarget.style.borderColor = 'var(--color-destructive)';
                    e.currentTarget.style.color = 'var(--color-destructive)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'var(--color-muted)';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.color = 'var(--color-muted-foreground)';
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        ))}
        {tags.length === 0 && (
          <p style={{
            textAlign: 'center',
            color: 'var(--color-muted-foreground)',
            fontSize: '14px',
            padding: '24px',
          }}>
            暂无标签
          </p>
        )}
      </div>
    </div>
  );
}
