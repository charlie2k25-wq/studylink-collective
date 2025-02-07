
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface SearchAndFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const SearchAndFilters = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
}: SearchAndFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-4 items-center">
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="PDF">PDF</SelectItem>
            <SelectItem value="MP3">MP3</SelectItem>
            <SelectItem value="Software">Software</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Price Range</span>
            <span>${priceRange[0]} - ${priceRange[1]}</span>
          </div>
          <Slider
            defaultValue={[0, 100]}
            max={100}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
