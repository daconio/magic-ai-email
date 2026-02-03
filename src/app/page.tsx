export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome back, Creator</h1>
        <p className="text-gray-400">Here's what's happening with your campaigns today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Contacts', value: '1,234', change: '+12% this week', color: 'from-purple-500 to-indigo-500' },
          { label: 'Emails Sent', value: '8,540', change: '+5% this week', color: 'from-pink-500 to-rose-500' },
          { label: 'Open Rate', value: '24.8%', change: '+2% this week', color: 'from-amber-400 to-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 blur-2xl rounded-full group-hover:opacity-20 transition-opacity`} />
            <h3 className="text-gray-400 text-sm font-medium mb-2">{stat.label}</h3>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-emerald-400 text-xs font-medium">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                  AI
                </div>
                <div>
                  <p className="font-medium">Generated "Winter Promo" campaign</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all">
              <span className="block text-2xl mb-2">✨</span>
              <span className="font-medium">New Campaign</span>
            </button>
            <button className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all">
              <span className="block text-2xl mb-2">👥</span>
              <span className="font-medium">Add Contacts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
