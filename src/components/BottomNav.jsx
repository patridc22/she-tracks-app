import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', icon: '🏠', label: 'Home', key: 'home' },
  { path: '/track', icon: '📝', label: 'Track', key: 'track' },
  { path: '/cycle', icon: '🌙', label: 'Cycle', key: 'cycle' },
  { path: '/insights', icon: '✨', label: 'Insights', key: 'insights' },
  { path: '/me', icon: '👤', label: 'Me', key: 'me' },
];

export default function BottomNav({ active }) {
  const location = useLocation();

  const isActive = (item) => {
    if (active) return active === item.key;
    return location.pathname === item.path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-warm-white border-t border-deep/10 shadow-lg z-40">
      <div className="max-w-4xl mx-auto px-2 py-3 flex justify-around items-center">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.key}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                active ? 'bg-rose/10' : 'hover:bg-deep/5'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span
                className={`text-[10px] font-medium ${
                  active ? 'text-rose' : 'text-muted'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
