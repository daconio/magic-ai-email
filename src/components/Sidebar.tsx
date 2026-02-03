'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, PenTool, Sparkles, Send, LayoutDashboard } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useSettings } from '@/context/SettingsContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

const icons = {
  dashboard: LayoutDashboard,
  contacts: Users,
  writer: PenTool,
  create: Sparkles,
  send: Send,
};

export default function Sidebar() {
  const pathname = usePathname();
  const { t, theme } = useSettings();

  const navItems = [
    { name: t.nav.dashboard, href: '/', key: 'dashboard', icon: icons.dashboard },
    { name: t.nav.contacts, href: '/contacts', key: 'contacts', icon: icons.contacts },
    { name: t.nav.writer, href: '/writer', key: 'writer', icon: icons.writer },
    { name: t.nav.create, href: '/create', key: 'create', icon: icons.create },
    { name: t.nav.send, href: '/send', key: 'send', icon: icons.send },
  ];

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold magic-text">MagicMail</h1>
        </div>

        {/* Switchers Row */}
        <div className="flex gap-2 px-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>

      <nav className="flex flex-col gap-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.key}
              href={item.href}
              className="relative"
            >
              <div
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive
                    ? (theme === 'daker' ? "bg-black text-white border-2 border-black" : "text-white bg-white/10")
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon size={20} className={clsx(
                  isActive
                    ? (theme === 'daker' ? "text-white" : "text-purple-400")
                    : ""
                )} />
                <span className="font-medium">{item.name}</span>

                {isActive && theme !== 'daker' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-8 bg-purple-500 rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Credits */}
      <div className={clsx(
        "mt-auto p-4 rounded-xl",
        theme === 'daker' ? "border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "glass-panel"
      )}>
        <p className="text-xs text-gray-400 mb-2">Magic Credits</p>
        <div className={clsx(
          "w-full h-2 rounded-full overflow-hidden",
          theme === 'daker' ? "bg-gray-200 border border-black h-3" : "bg-gray-800"
        )}>
          <div className={clsx(
            "h-full w-[70%]",
            theme === 'daker' ? "bg-green-500 border-r border-black" : "bg-gradient-to-r from-purple-500 to-pink-500"
          )} />
        </div>
        <p className="text-xs text-right mt-1 text-gray-500">350 / 500</p>
      </div>
    </aside>
  );
}
