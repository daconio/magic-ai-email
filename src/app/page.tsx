'use client';

import { useSettings } from '@/context/SettingsContext';
import { useRouter } from 'next/navigation';
import { Sparkles, Users } from 'lucide-react';
import clsx from 'clsx';

export default function Home() {
  const { t, theme } = useSettings();
  const router = useRouter();

  const stats = [
    { label: t.dashboard.stats.totalContacts, value: '1,234', change: '+12%', color: 'from-purple-500 to-indigo-500' },
    { label: t.dashboard.stats.emailsSent, value: '8,540', change: '+5%', color: 'from-pink-500 to-rose-500' },
    { label: t.dashboard.stats.openRate, value: '24.8%', change: '+2%', color: 'from-amber-400 to-orange-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">{t.dashboard.welcome}</h1>
        <p className="text-gray-400">{t.dashboard.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel p-6 relative overflow-hidden group">
            {theme !== 'daker' && (
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 blur-2xl rounded-full group-hover:opacity-20 transition-opacity`} />
            )}
            <h3 className="text-gray-400 text-sm font-medium mb-2">{stat.label}</h3>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className={clsx("text-xs font-medium", theme === 'daker' ? "text-blue-600" : "text-emerald-400")}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold mb-4">{t.dashboard.activity.title}</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className={clsx(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  theme === 'daker' ? "bg-black text-white" : "bg-purple-500/20 text-purple-400"
                )}>
                  AI
                </div>
                <div>
                  <p className="font-medium">{t.dashboard.activity.sample}</p>
                  <p className="text-xs text-gray-500">{t.dashboard.activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={clsx(
          "glass-panel p-6",
          theme === 'magic' && "bg-gradient-to-br from-purple-900/20 to-pink-900/20"
        )}>
          <h2 className="text-xl font-bold mb-4">{t.dashboard.actions.title}</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => router.push('/writer')}
              className={clsx(
                "p-4 rounded-xl text-left transition-all",
                theme === 'daker'
                  ? "border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
              )}
            >
              <div className="mb-2">
                <Sparkles size={24} className={theme === 'daker' ? "text-orange-500" : "text-purple-400"} />
              </div>
              <span className="font-medium">{t.dashboard.actions.newCampaign}</span>
            </button>
            <button
              onClick={() => router.push('/contacts')}
              className={clsx(
                "p-4 rounded-xl text-left transition-all",
                theme === 'daker'
                  ? "border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
              )}
            >
              <div className="mb-2">
                <Users size={24} className={theme === 'daker' ? "text-blue-500" : "text-purple-400"} />
              </div>
              <span className="font-medium">{t.dashboard.actions.addContacts}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
