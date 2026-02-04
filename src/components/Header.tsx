import { Search, SlidersHorizontal } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showSold: boolean;
  onShowSoldChange: (value: boolean) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  showSold,
  onShowSoldChange,
  sortBy,
  onSortChange,
}: HeaderProps) {
  return (
    <header className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="mb-8">
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-2">
            Shop
          </p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold">
            Username list
          </h1>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left side - Show Sold Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-violet-200 text-sm font-medium tracking-wider uppercase">
              Show Sold
            </span>
            <Switch
              checked={showSold}
              onCheckedChange={onShowSoldChange}
              className="glass-toggle data-[state=checked]:bg-violet-500"
            />
          </div>

          {/* Right side - Sort and Search */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-violet-200 text-sm font-medium tracking-wider uppercase hidden sm:inline">
                Sort by
              </span>
              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="glass-input w-[180px] text-white border-violet-500/30 focus:ring-violet-500/50">
                  <SlidersHorizontal className="w-4 h-4 text-violet-400 mr-2 flex-shrink-0" />
                  <SelectValue placeholder="Price" className="truncate" />
                </SelectTrigger>
                <SelectContent className="glass-card border-violet-500/30">
                  <SelectItem
                    value="price-desc"
                    className="text-white focus:bg-violet-500/20 focus:text-white"
                  >
                    Price: High to Low
                  </SelectItem>
                  <SelectItem
                    value="price-asc"
                    className="text-white focus:bg-violet-500/20 focus:text-white"
                  >
                    Price: Low to High
                  </SelectItem>
                  <SelectItem
                    value="name-asc"
                    className="text-white focus:bg-violet-500/20 focus:text-white"
                  >
                    Name: A to Z
                  </SelectItem>
                  <SelectItem
                    value="name-desc"
                    className="text-white focus:bg-violet-500/20 focus:text-white"
                  >
                    Name: Z to A
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Search className="w-4 h-4 text-violet-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="glass-input w-full rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-violet-300/50 text-sm focus:outline-none transition-all duration-300 relative z-0"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
