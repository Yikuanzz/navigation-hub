export interface NavItem {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  icon?: string;
  color?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  builtin?: boolean;
}
