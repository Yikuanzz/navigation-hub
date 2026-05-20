import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

const DATA_FILE = resolve(import.meta.dirname, '../data/nav-data.json');

export interface NavItem {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  color?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  builtin?: boolean;
}

interface DataStore {
  items: NavItem[];
  categories: Category[];
}

let cache: DataStore | null = null;

export async function loadData(): Promise<DataStore> {
  if (cache) return cache;
  try {
    const raw = await readFile(DATA_FILE, 'utf-8');
    cache = JSON.parse(raw) as DataStore;
  } catch {
    cache = { items: [], categories: [] };
  }
  return cache;
}

export async function saveData(data: DataStore): Promise<void> {
  cache = data;
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getItems(): Promise<NavItem[]> {
  const data = await loadData();
  return data.items;
}

export async function addItem(item: Omit<NavItem, 'id'>): Promise<NavItem> {
  const data = await loadData();
  const newItem: NavItem = { ...item, id: Date.now().toString() };
  data.items.push(newItem);
  await saveData(data);
  return newItem;
}

export async function updateItem(id: string, updates: Partial<Omit<NavItem, 'id'>>): Promise<NavItem | null> {
  const data = await loadData();
  const idx = data.items.findIndex(i => i.id === id);
  if (idx === -1) return null;
  data.items[idx] = { ...data.items[idx], ...updates };
  await saveData(data);
  return data.items[idx];
}

export async function deleteItem(id: string): Promise<boolean> {
  const data = await loadData();
  const len = data.items.length;
  data.items = data.items.filter(i => i.id !== id);
  await saveData(data);
  return data.items.length < len;
}

export async function getCategories(): Promise<Category[]> {
  const data = await loadData();
  return data.categories;
}

export async function addCategory(cat: Omit<Category, 'id'>): Promise<Category> {
  const data = await loadData();
  const newCat: Category = { ...cat, id: Date.now().toString() };
  data.categories.push(newCat);
  await saveData(data);
  return newCat;
}

export async function updateCategory(id: string, updates: Partial<Omit<Category, 'id'>>): Promise<Category | null> {
  const data = await loadData();
  const idx = data.categories.findIndex(c => c.id === id);
  if (idx === -1) return null;
  data.categories[idx] = { ...data.categories[idx], ...updates };
  await saveData(data);
  return data.categories[idx];
}

export async function deleteCategory(id: string): Promise<boolean> {
  const data = await loadData();
  const len = data.categories.length;
  data.categories = data.categories.filter(c => c.id !== id);
  await saveData(data);
  return data.categories.length < len;
}

export async function getTags(): Promise<string[]> {
  const data = await loadData();
  const tagSet = new Set<string>();
  data.items.forEach(i => i.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export async function deleteTag(tagName: string): Promise<void> {
  const data = await loadData();
  data.items.forEach(i => {
    i.tags = i.tags.filter(t => t !== tagName);
  });
  await saveData(data);
}

export async function renameTag(oldName: string, newName: string): Promise<void> {
  const data = await loadData();
  data.items.forEach(i => {
    i.tags = i.tags.map(t => t === oldName ? newName : t);
  });
  await saveData(data);
}
