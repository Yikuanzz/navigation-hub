import { useState, useMemo, useCallback, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import TagFilter from './components/TagFilter';
import CardGrid from './components/CardGrid';
import KeyModal from './components/KeyModal';
import EditModal from './components/EditModal';
import CategoryManager from './components/CategoryManager';
import TagManager from './components/TagManager';
import { itemApi } from './api/items';
import { categoryApi } from './api/categories';
import { authApi } from './api/auth';
import type { NavItem, Category } from './types';

function App() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Load data from API
  const loadData = useCallback(async () => {
    try {
      const [itemsData, catsData] = await Promise.all([
        itemApi.getAll(),
        categoryApi.getAll(),
      ]);
      setItems(itemsData);
      setCategories(catsData);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : '加载数据失败');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // Auto-enter edit mode if previously verified in this browser
    if (localStorage.getItem('navhub_auth') === '1') {
      setIsEditMode(true);
    }
  }, [loadData]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    items.forEach((item) => item.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [items]);

  // Filter items
  const filteredItems = useMemo(() => {
    let result = items;

    if (activeCategory !== 'all') {
      result = result.filter((item) => item.category === activeCategory);
    }

    if (selectedTags.length > 0) {
      result = result.filter((item) =>
        selectedTags.some((tag) => item.tags.includes(tag))
      );
    }

    return result;
  }, [items, activeCategory, selectedTags]);

  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleKeyConfirm = useCallback(async (key: string) => {
    try {
      const res = await authApi.verify(key);
      if (res.valid) {
        localStorage.setItem('navhub_auth', '1');
        setIsEditMode(true);
        setIsKeyModalOpen(false);
        toast.success('编辑模式已开启');
      } else {
        toast.error('密钥错误');
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : '验证失败');
    }
  }, []);

  const handleExitEditMode = useCallback(() => {
    localStorage.removeItem('navhub_auth');
    setIsEditMode(false);
    toast.info('已退出编辑模式');
  }, []);

  const handleRequestEditMode = useCallback(() => {
    if (localStorage.getItem('navhub_auth') === '1') {
      setIsEditMode(true);
    } else {
      setIsKeyModalOpen(true);
    }
  }, []);

  const handleAdd = useCallback(() => {
    setEditingItem(null);
    setIsEditModalOpen(true);
  }, []);

  const handleEdit = useCallback((item: NavItem) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!window.confirm('确定要删除这个导航项吗？')) return;
    try {
      await itemApi.delete(id);
      await loadData();
      toast.success('已删除');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : '删除失败');
    }
  }, [loadData]);

  const handleSave = useCallback(
    async (itemData: Omit<NavItem, 'id'> & { id?: string }) => {
      try {
        if (itemData.id) {
          await itemApi.update(itemData.id, itemData);
          toast.success('已更新');
        } else {
          await itemApi.create(itemData);
          toast.success('已添加');
        }
        await loadData();
        setIsEditModalOpen(false);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : '保存失败');
      }
    },
    [loadData]
  );

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-background)',
        color: 'var(--color-muted-foreground)',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--color-border)',
            borderTopColor: 'var(--color-accent)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <span style={{ fontSize: '14px' }}>加载中…</span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-background)',
      }}
    >
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--color-card)',
            color: 'var(--color-foreground)',
            border: '1px solid var(--color-border)',
          },
        }}
      />

      <Header
        isEditMode={isEditMode}
        onToggleEditMode={handleExitEditMode}
        onRequestEditMode={handleRequestEditMode}
      />

      <main style={{ flex: 1 }}>
        <CategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <TagFilter
          allTags={allTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
        />

        <CardGrid
          items={filteredItems}
          isEditMode={isEditMode}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />

        {isEditMode && (
          <>
            <div style={{
              maxWidth: '1400px',
              margin: '0 auto',
              width: '100%',
              padding: '0 24px',
            }}>
              <div style={{
                height: '1px',
                background: 'var(--color-border)',
                margin: '24px 0',
              }} />
            </div>
            <CategoryManager categories={categories} onUpdate={loadData} />
            <TagManager tags={allTags} onUpdate={loadData} />
          </>
        )}
      </main>

      <footer
        style={{
          padding: '24px',
          textAlign: 'center',
          borderTop: '1px solid var(--color-border)',
          color: 'var(--color-muted-foreground)',
          fontSize: '13px',
        }}
      >
        <p>NavHub - 智能导航中心 · 让访问更高效</p>
      </footer>

      <KeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onConfirm={handleKeyConfirm}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
        item={editingItem}
        categories={categories}
      />
    </div>
  );
}

export default App;
