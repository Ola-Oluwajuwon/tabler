import { useState } from 'react';
import {
  Home,
  LayoutGrid,
  Box,
  File,
  CheckSquare,
  Image,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Interface', icon: LayoutGrid, href: '/interface' },
  { label: 'Components', icon: Box, href: '/components' },
  { label: 'Pages', icon: File, href: '/pages' },
  { label: 'Forms', icon: CheckSquare, href: '/forms' },
  { label: 'Gallery', icon: Image, href: '/gallery' },
  { label: 'Documentation', icon: BookOpen, href: '/documentation' },
];

/**
 * SubNav — Level 2 of the two-tier header.
 * Horizontal nav items with icons. The active item has a blue
 * bottom border that overlaps the container's gray bottom border.
 */
const SubNav = () => {
  const [activeItem, setActiveItem] = useState('Home');

  return (
    <div className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none -mb-px">
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = activeItem === label;
            return (
              <a
                key={label}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(label);
                }}
                className={`
                  inline-flex items-center gap-2 px-3 py-3 text-sm font-medium
                  whitespace-nowrap border-b-2 transition-colors duration-150
                  ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon className="w-4 h-4" strokeWidth={1.75} />
                {label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default SubNav;
