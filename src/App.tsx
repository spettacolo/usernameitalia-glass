import { useState, useMemo } from 'react';
import { useHandles } from '@/hooks/useHandles';
import { Header } from '@/components/Header';
import { GlassCard } from '@/components/GlassCard';
import { Loader2, AlertCircle } from 'lucide-react';
import type { Handle } from '@/types';

function App() {
  const { handles, loading, error } = useHandles();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSold, setShowSold] = useState(false);
  const [sortBy, setSortBy] = useState('price-desc');

  const filteredAndSortedHandles = useMemo(() => {
    let result = [...handles];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (handle) =>
          handle.username.toLowerCase().includes(query) ||
          handle.type.toLowerCase().includes(query)
      );
    }

    // Filter by sold status
    if (!showSold) {
      result = result.filter((handle) => !handle.sold);
    }

    // Sort
    result.sort((a: Handle, b: Handle) => {
      switch (sortBy) {
        case 'price-desc':
          return b.price - a.price;
        case 'price-asc':
          return a.price - b.price;
        case 'name-asc':
          return a.username.localeCompare(b.username);
        case 'name-desc':
          return b.username.localeCompare(a.username);
        default:
          return 0;
      }
    });

    return result;
  }, [handles, searchQuery, showSold, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-2xl p-8 flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-violet-400 animate-spin" />
          <p className="text-violet-200 text-sm font-medium">Loading handles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card rounded-2xl p-8 flex flex-col items-center gap-4 max-w-md">
          <AlertCircle className="w-10 h-10 text-red-400" />
          <p className="text-white text-lg font-medium text-center">
            Failed to load handles
          </p>
          <p className="text-violet-300 text-sm text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-violet-800/15 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showSold={showSold}
          onShowSoldChange={setShowSold}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <main className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {filteredAndSortedHandles.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center">
                <p className="text-violet-300 text-lg">
                  No handles found matching your criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredAndSortedHandles.map((handle, index) => (
                  <GlassCard key={handle.id} handle={handle} index={index} />
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="text-violet-300 text-sm">
                To add new handles, edit the{' '}
                <code className="bg-violet-500/20 px-2 py-0.5 rounded text-violet-200">
                  handles.json
                </code>{' '}
                file in the public folder
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
