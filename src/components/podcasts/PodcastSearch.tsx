
import { Search } from "lucide-react";

interface PodcastSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const PodcastSearch = ({ searchTerm, onSearchChange }: PodcastSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search podcasts..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-transparent"
      />
    </div>
  );
};

export default PodcastSearch;
