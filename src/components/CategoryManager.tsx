import { useState } from 'react';
import { Plus, Trash2, Pencil, Check, X, FolderOpen } from 'lucide-react';
import type { Category } from '../types';
import IconPicker from './IconPicker';
import { categoryApi } from '../api/categories';
import { toast } from 'sonner';

interface CategoryManagerProps {
  categories: Category[];
  onUpdate: () => void;
}

export default function CategoryManager({ categories, onUpdate }: CategoryManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('FolderOpen');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAdd = async () => {
    if (!newName.trim()) return;
    try {
      await categoryApi.create({ name: newName.trim(), icon: newIcon, builtin: false });
      setNewName('');
      setNewIcon('FolderOpen');
      setIsAdding(false);
      onUpdate();
      toast.success('类别已添加');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : '添加失败');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`确定删除类别「${name}」吗？`)) return;
    try {
      await categoryApi.delete(id);
      onUpdate();
      toast.success('类别已删除');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : '删除失败');
    }
  };

  const handleEdit = async (id: string) => {
    if (!editName.trim()) return;
    try {
      await categoryApi.update(id, { name: editName.trim() });
      setEditingId(null);
      onUpdate();
      toast.success('类别已更新');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : '更新失败');
    }
  };

  const userCategories = categories.filter(c => !c.builtin);

  return (
    <div style={{
      padding: '24px',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 600,
          color: 'var(--color-foreground)',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <FolderOpen size={20} />
          类别管理
        </h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            border: '1px solid var(--color-border)',
            background: 'var(--color-card)',
            color: 'var(--color-foreground)',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'inherit',
            transition: 'border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent)';
            e.currentTarget.style.background = 'rgba(37, 99, 235, 0.08)';
            e.currentTarget.style.color = 'var(--color-accent)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)';
            e.currentTarget.style.background = 'var(--color-card)';
            e.currentTarget.style.color = 'var(--color-foreground)';
          }}
        >
          <Plus size={16} />
          {isAdding ? '取消' : '添加类别'}
        </button>
      </div>

      {isAdding && (
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          marginBottom: '16px',
          padding: '16px',
          background: 'var(--color-muted)',
          borderRadius: '12px',
          animation: 'fadeIn 0.2s ease-out',
        }}>
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="类别名称"
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-background)',
              color: 'var(--color-foreground)',
              fontSize: '14px',
              fontFamily: 'inherit',
            }}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
          <IconPicker value={newIcon} onChange={setNewIcon} />
          <button
            onClick={handleAdd}
            aria-label="添加"
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: 'none',
              background: 'var(--color-accent)',
              color: 'var(--color-on-accent)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#1d4ed8';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'var(--color-accent)';
            }}
          >
            <Check size={16} />
          </button>
        </div>
      )}

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        {userCategories.map(cat => (
          <div key={cat.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
          }}>
            {(() => {
              const icons: Record<string, React.ReactNode> = {
                LayoutGrid: <FolderOpen size={18} />,
                Code2: <FolderOpen size={18} />,
                Palette: <FolderOpen size={18} />,
                Zap: <FolderOpen size={18} />,
                BookOpen: <FolderOpen size={18} />,
                Gamepad2: <FolderOpen size={18} />,
                FolderOpen: <FolderOpen size={18} />,
              };
              return <div style={{ color: 'var(--color-muted-foreground)' }}>{icons[cat.icon] || <FolderOpen size={18} />}</div>;
            })()}

            {editingId === cat.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
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
                    if (e.key === 'Enter') handleEdit(cat.id);
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                />
                <button
                  onClick={() => handleEdit(cat.id)}
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
                  onClick={() => setEditingId(null)}
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
                  {cat.name}
                </span>
                <button
                  onClick={() => {
                    setEditingId(cat.id);
                    setEditName(cat.name);
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
                  onClick={() => handleDelete(cat.id, cat.name)}
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
        {userCategories.length === 0 && (
          <p style={{
            textAlign: 'center',
            color: 'var(--color-muted-foreground)',
            fontSize: '14px',
            padding: '24px',
          }}>
            暂无自定义类别
          </p>
        )}
      </div>
    </div>
  );
}
