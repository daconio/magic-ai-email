'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, PenTool, Sparkles, Send, LayoutDashboard } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Address Book', href: '/contacts', icon: Users },
  { name: 'AI Writer', href: '/writer', icon: PenTool },
  { name: 'Creative Studio', href: '/create', icon: Sparkles },
  { name: 'Mass Sender', href: '/send', icon: Send },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="flex items-center gap-3 px-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Sparkles className="text-white w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold magic-text">MagicMail</h1>
      </div>

      <nav className="flex flex-col gap-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className="relative"
            >
              <div
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive 
                    ? "text-white bg-white/10" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon size={20} className={clsx(isActive ? "text-purple-400" : "")} />
                <span className="font-medium">{item.name}</span>
                
                {isActive && (
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

      <div className="mt-auto p-4 glass-panel rounded-xl">
        <p className="text-xs text-gray-400 mb-2">Magic Credits</p>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full w-[70%] bg-gradient-to-r from-purple-500 to-pink-500" />
        </div>
        <p className="text-xs text-right mt-1 text-white">350 / 500</p>
      </div>
    </aside>
  );
}
