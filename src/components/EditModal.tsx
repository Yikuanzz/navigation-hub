import { useState, useEffect } from 'react';
import { X, Globe, Type, FileText, Tag, Link2, Palette } from 'lucide-react';
import type { NavItem, Category } from '../types';
import CustomSelect from './CustomSelect';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<NavItem, 'id'> & { id?: string }) => void;
  item?: NavItem | null;
  categories: Category[];
}

export default function EditModal({ isOpen, onClose, onSave, item, categories }: EditModalProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('dev');
  const [tags, setTags] = useState('');
  const [color, setColor] = useState('#1E293B');

  const isEditing = !!item;
  const categoryOptions = categories
    .filter(c => c.id !== 'all')
    .map(c => ({ value: c.id, label: c.name }));

  useEffect(() => {
    if (isOpen) {
      if (item) {
        setName(item.name);
        setUrl(item.url);
        setDescription(item.description);
        setCategory(item.category);
        setTags(item.tags.join(', '));
        setColor(item.color || '#1E293B');
      } else {
        setName('');
        setUrl('');
        setDescription('');
        setCategory(categories.find(c => c.id !== 'all')?.id || 'dev');
        setTags('');
        setColor('#1E293B');
      }
    }
  }, [isOpen, item, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;

    const tagList = tags.split(/[,，]/).map(t => t.trim()).filter(Boolean);

    onSave({
      id: item?.id,
      name: name.trim(),
      url: url.trim(),
      description: description.trim(),
      category,
      tags: tagList,
      color,
    });
  };

  const presetColors = [
    '#1E293B', '#0F172A', '#181717', '#F24E1E', '#EA4C89',
    '#5E6AD2', '#0056D2', '#FF0000', '#1DB954', '#F48024',
    '#1769FF', '#7C3AED', '#0891B2', '#DC2626', '#D97706',
  ];

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
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.2s ease-out',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-modal-title"
        style={{
          background: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '20px',
          padding: '32px',
          width: '100%',
          maxWidth: '480px',
          maxHeight: '90vh',
          overflow: 'auto',
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
          <h2 id="edit-modal-title" style={{
            fontSize: '20px',
            fontWeight: 600,
            color: 'var(--color-foreground)',
            margin: 0,
          }}>
            {isEditing ? '编辑导航' : '添加导航'}
          </h2>
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
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {/* Name */}
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--color-muted-foreground)',
              marginBottom: '6px',
            }}>
              <Type size={14} />
              名称 *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：GitHub"
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-background)',
                color: 'var(--color-foreground)',
                fontSize: '14px',
                fontFamily: 'inherit',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-accent)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-border)';
              }}
            />
          </div>

          {/* URL */}
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--color-muted-foreground)',
              marginBottom: '6px',
            }}>
              <Link2 size={14} />
              链接 *
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-background)',
                color: 'var(--color-foreground)',
                fontSize: '14px',
                fontFamily: 'inherit',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-accent)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-border)';
              }}
            />
          </div>

          {/* Description */}
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--color-muted-foreground)',
              marginBottom: '6px',
            }}>
              <FileText size={14} />
              描述
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="简短描述..."
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-background)',
                color: 'var(--color-foreground)',
                fontSize: '14px',
                fontFamily: 'inherit',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-accent)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-border)';
              }}
            />
          </div>

          {/* Category */}
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--color-muted-foreground)',
              marginBottom: '6px',
            }}>
              <Globe size={14} />
              类别
            </label>
            <CustomSelect
              value={category}
              options={categoryOptions}
              onChange={setCategory}
            />
          </div>

          {/* Tags */}
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--color-muted-foreground)',
              marginBottom: '6px',
            }}>
              <Tag size={14} />
              标签（用逗号分隔）
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="开发, 工具, 效率"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-background)',
                color: 'var(--color-foreground)',
                fontSize: '14px',
                fontFamily: 'inherit',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-accent)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-border)';
              }}
            />
          </div>

          {/* Color */}
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--color-muted-foreground)',
              marginBottom: '6px',
            }}>
              <Palette size={14} />
              图标颜色
            </label>
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
            }}>
              {presetColors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-label={`选择颜色 ${c}`}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: `2px solid ${color === c ? 'var(--color-accent)' : 'transparent'}`,
                    background: c,
                    cursor: 'pointer',
                    transition: 'box-shadow 0.15s ease',
                    boxShadow: color === c ? '0 0 0 2px var(--color-card), 0 0 0 4px var(--color-accent)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '8px',
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
              {isEditing ? '保存' : '添加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
