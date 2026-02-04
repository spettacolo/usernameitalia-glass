import { ShoppingCart } from 'lucide-react';
import type { Handle } from '@/types';

interface GlassCardProps {
  handle: Handle;
  index: number;
}

export function GlassCard({ handle, index }: GlassCardProps) {
  const getInitial = (username: string) => {
    const cleanUsername = username.replace(/[@+]/g, '').trim();
    return cleanUsername.charAt(0).toUpperCase();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatUsername = (username: string) => {
    if (username.startsWith('+')) {
      return username;
    }
    return `@${username}`;
  };

  const staggerClass = `stagger-${(index % 8) + 1}`;

  return (
    <div
      className={`glass-card glass-shimmer rounded-2xl p-5 transition-all duration-300 animate-fade-in-up ${staggerClass} opacity-0`}
    >
      {/* Header with Avatar and Price */}
      <div className="flex items-start justify-between mb-4">
        <div className="glass-avatar w-12 h-12 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">
            {getInitial(handle.username)}
          </span>
        </div>
        <span className="text-white font-semibold text-lg">
          {formatPrice(handle.price)}
        </span>
      </div>

      {/* Type Label */}
      <p className="text-violet-300 text-xs font-medium tracking-wider uppercase mb-1">
        {handle.type}
      </p>

      {/* Username */}
      <h3 className="text-white font-bold text-xl mb-5 truncate">
        {formatUsername(handle.username)}
      </h3>

      {/* Purchase Button */}
      <button
        className="w-full glass-input rounded-xl py-3 px-4 flex items-center justify-between group transition-all duration-300 hover:bg-violet-500/20 hover:border-violet-400/50"
        onClick={() => {
          const telegramUrl = `https://t.me/${handle.username.replace('@', '')}`;
          window.open(telegramUrl, '_blank');
        }}
      >
        <span className="text-violet-200 text-sm font-medium tracking-wider uppercase group-hover:text-violet-100">
          Purchase
        </span>
        <ShoppingCart className="w-4 h-4 text-violet-300 group-hover:text-violet-100 transition-colors" />
      </button>
    </div>
  );
}
